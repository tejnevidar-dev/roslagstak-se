import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import roofPoster from "@/assets/roof-build-poster.jpg";

const DURATION_SECONDS = 20.2;

/**
 * Lazy "facade" video player: only the poster image ships on first paint.
 * The <video> element is mounted (and starts downloading) on first user intent,
 * so the 3.5 MB media never blocks LCP. VideoObject schema below feeds Google
 * Video search / rich results.
 */
const RoofBuildVideo = () => {
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const start = () => {
    setActive(true);
    requestAnimationFrame(() => {
      const el = videoRef.current;
      if (!el) return;
      el.load();
      // Playback starts from a user click, so sound is allowed. If a browser
      // still blocks it, fall back to a muted autoplay instead of no video.
      el.muted = false;
      el.volume = 0.55;
      void el.play().catch(() => {
        el.muted = true;
        void el.play().catch(() => undefined);
      });
    });
  };

  // Pause (and thereby mute) the film as soon as it scrolls out of view, so the
  // music never keeps playing while the visitor reads further down the page.
  useEffect(() => {
    if (!active) return;
    const el = videoRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !el.paused) el.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [active]);

  return (
    <figure className="relative m-0 mt-10 overflow-hidden rounded-2xl border border-ink-foreground/15 bg-ink-foreground/[0.04]">
      <figcaption className="flex items-center justify-between gap-4 border-b border-ink-foreground/12 px-5 py-5 sm:px-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink-foreground/50">
          Filmen — takbyte i ett svep
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] tabular-nums text-ink-foreground/35">
          20 sek
        </span>
      </figcaption>

      <div ref={wrapRef} className="relative aspect-[3/2] bg-ink">
        {active ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            poster={roofPoster}
            width={1920}
            height={1280}
            controls
            loop
            playsInline
            preload="auto"
            onError={() => setFailed(true)}
            aria-label="Film: så går ett takbyte till, från råspont till snörasskydd"
          >
            <source src="/takbyte-animation-h264.mp4" type="video/mp4; codecs=avc1.4d4028" />
            <source src="/takbyte-animation-1080p.mp4" type="video/mp4" />
            <source src="/takbyte-animation.webm" type="video/webm" />
            Din webbläsare kan inte spela upp video. Bilderna ovan visar samma arbetsgång steg för steg.
          </video>

        ) : (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 h-full w-full"
            aria-label="Spela filmen: så går ett takbyte till"
          >
            <img
              src={roofPoster}
              alt="Så går ett takbyte till — från råspont till färdigt tak med snörasskydd"
              width={1920}
              height={1280}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/15" aria-hidden="true" />
            <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink-foreground text-ink transition-transform group-hover:scale-105">
              <Play className="h-7 w-7 translate-x-0.5" aria-hidden="true" />
            </span>
          </button>
        )}

        {failed && (
          <p className="absolute inset-x-0 bottom-0 bg-ink/85 px-5 py-3 text-center text-sm text-ink-foreground">
            Filmen kunde inte spelas upp här.{" "}
            <a href="/takbyte-animation-h264.mp4" className="underline" target="_blank" rel="noopener">
              Öppna filmen i ett nytt fönster
            </a>
            .
          </p>
        )}

      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Så går ett takbyte till – från råspont till snörasskydd",
            description:
              "RoslagsTak visar hela arbetsgången vid takbyte i Roslagen: råspont, Mataki Haloten PRO underlagspapp, fotplåt och hängrännor, vindskivor och gavelbeslag, läkt, takpannor, plåtbeslag och snörasskydd.",
            thumbnailUrl: ["https://roslagstak.se/takbyte-animation-thumbnail.jpg"],
            uploadDate: "2026-08-18",
            duration: "PT20S",
            contentUrl: "https://roslagstak.se/takbyte-animation-1080p.mp4",
            embedUrl: "https://roslagstak.se/#hur-det-gar-till",
            inLanguage: "sv-SE",
            isFamilyFriendly: true,
            publisher: {
              "@type": "Organization",
              name: "RoslagsTak",
              logo: {
                "@type": "ImageObject",
                url: "https://roslagstak.se/icon-512.png",
              },
            },
          }),
        }}
      />
      <meta itemProp="duration" content={`PT${Math.round(DURATION_SECONDS)}S`} />
    </figure>
  );
};

export default RoofBuildVideo;
