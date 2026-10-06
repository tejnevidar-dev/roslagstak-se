import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ankareMal } from "@/lib/takkontroll-ankare";

/** Fångar klick på länkar till /takkontroll (före React Routers egen hantering) och går till formuläret på sidan. */
const TakkontrollAnkare = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const mal = ankareMal(a.getAttribute("href"), pathRef.current);
      if (!mal) return;
      e.preventDefault();
      navigate(mal);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  return null;
};

export default TakkontrollAnkare;
