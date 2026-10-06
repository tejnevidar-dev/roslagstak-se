import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Bevisar mätningen av formulärstegen (#1da) utan webbläsarpanel: IntersectionObserver ersätts med en
 * styrbar attrapp, så att "formuläret blev synligt" kan utlösas i testet. Kontrollerar form_view, form_start,
 * att varje händelse bara skickas en gång per formulär, att formulär utan telefon/e-post inte räknas, att ett
 * formulär som läggs till efteråt (sidbyte i appen) också observeras, och att inget skickas utan samtycke.
 */

type Entry = { target: Element; isIntersecting: boolean };
const observers: MockIO[] = [];
class MockIO {
  observed = new Set<Element>();
  constructor(private cb: (entries: Entry[]) => void) {
    observers.push(this);
  }
  observe(el: Element) {
    this.observed.add(el);
  }
  unobserve(el: Element) {
    this.observed.delete(el);
  }
  disconnect() {
    this.observed.clear();
  }
  /** Testhjälp: formuläret blir synligt. */
  show(el: Element) {
    this.cb([{ target: el, isIntersecting: true }]);
  }
}

const gtag = vi.fn();
const CONSENT_KEY = "rt_consent_v1";

const addForm = (label: string, withContactField = true) => {
  const form = document.createElement("form");
  form.setAttribute("aria-label", label);
  const input = document.createElement("input");
  input.type = withContactField ? "tel" : "text";
  form.appendChild(input);
  document.body.appendChild(form);
  return { form, input };
};

const events = (name: string, label: string) =>
  gtag.mock.calls.filter((c) => c[0] === "event" && c[1] === name && (c[2] as { form?: string }).form === label);

beforeAll(async () => {
  vi.stubGlobal("IntersectionObserver", MockIO);
  Object.assign(window, { gtag });
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, marketing: false }));
  const { initFormFunnelTracking } = await import("@/lib/analytics");
  initFormFunnelTracking();
});

afterAll(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

beforeEach(() => {
  gtag.mockClear();
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, marketing: false }));
});

describe("formulärstegen (form_view och form_start)", () => {
  it("skickar form_view när ett formulär med telefonfält blir synligt, med formulärnamn, enhet och sidsökväg", async () => {
    const { form } = addForm("Test A");
    await vi.waitFor(() => expect(observers[0].observed.has(form)).toBe(true));
    observers[0].show(form);
    const calls = events("form_view", "Test A");
    expect(calls).toHaveLength(1);
    const params = calls[0][2] as Record<string, unknown>;
    expect(params.form).toBe("Test A");
    expect(params.page_path).toBe(window.location.pathname);
    expect(["mobil", "surfplatta", "dator"]).toContain(params.device);
  });

  it("skickar form_view bara en gång per formulär (observatören släpper formuläret efter första träffen)", async () => {
    const { form } = addForm("Test B");
    await vi.waitFor(() => expect(observers[0].observed.has(form)).toBe(true));
    observers[0].show(form);
    expect(observers[0].observed.has(form)).toBe(false);
    expect(events("form_view", "Test B")).toHaveLength(1);
  });

  it("räknar inte formulär utan telefon- eller e-postfält (t.ex. en sökruta)", async () => {
    const { form } = addForm("Test C", false);
    await new Promise((r) => setTimeout(r, 20));
    expect(observers[0].observed.has(form)).toBe(false);
    form.querySelector("input")!.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    expect(events("form_start", "Test C")).toHaveLength(0);
  });

  it("skickar form_start vid första fokus i formuläret, och bara en gång", () => {
    const { input } = addForm("Test D");
    input.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    input.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    expect(events("form_start", "Test D")).toHaveLength(1);
  });

  it("skickar inga fältvärden", () => {
    const { input } = addForm("Test E");
    input.value = "0701234567";
    input.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    const params = events("form_start", "Test E")[0][2] as Record<string, unknown>;
    expect(JSON.stringify(params)).not.toContain("0701234567");
  });

  it("skickar ingenting utan samtycke till statistik", async () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: false, marketing: false }));
    const { form, input } = addForm("Test F");
    await vi.waitFor(() => expect(observers[0].observed.has(form)).toBe(true));
    observers[0].show(form);
    input.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    expect(events("form_view", "Test F")).toHaveLength(0);
    expect(events("form_start", "Test F")).toHaveLength(0);
  });
});
