import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/logo-karakis-gueldogan.png";

export default function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={`inline-flex shrink-0 ${className}`} aria-label="Rechtsanwaltskanzlei Karakis Güldogan — Startseite">
      <Image src={logo} alt="Rechtsanwaltskanzlei Karakış Güldoğan" priority={priority} sizes="220px" className="h-full w-auto" />
    </Link>
  );
}
