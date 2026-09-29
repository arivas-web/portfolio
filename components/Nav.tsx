import Link from "next/link";
import { site } from "@/lib/site";

export function Nav() {
  return (
    <div className="nav-wrap">
      <nav className="nav glass">
        <Link href="/" className="brand">
          <span className="brand-dot" />
          {site.name}
        </Link>
        <div className="nav-links">
          <Link href="/#casos" className="hide-sm">
            Casos
          </Link>
          <Link href="/blog">Blog</Link>
          <Link href="/#sobre-mi" className="hide-sm">
            Sobre mí
          </Link>
          <Link href="/#contacto" className="btn btn-dark">
            Hablemos
          </Link>
        </div>
      </nav>
    </div>
  );
}
