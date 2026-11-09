"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { firm } from "@/lib/content";

export default function ThumbBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="thumb-bar" data-show={show || undefined} aria-hidden={!show} inert={!show}>
      <a href={firm.phoneHref} className="btn btn-light !min-h-0 !px-3 !text-[0.95rem]">
        <Phone size={17} strokeWidth={1.75} aria-hidden /> Anrufen
      </a>
      <Link href="/kontakt#anfrage" className="btn btn-accent !min-h-0 !px-3 !text-[0.95rem]">
        Erstgespräch anfragen
      </Link>
    </div>
  );
}
