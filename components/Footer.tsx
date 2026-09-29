import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <div className="container footer-row">
        <span>
          © {new Date().getFullYear()} {site.fullName}
        </span>
        <nav>
          <Link href="/#casos">Casos</Link>
          <Link href="/blog">Blog</Link>
          {site.linkedin && <a href={site.linkedin}>LinkedIn</a>}
          {site.github && <a href={site.github}>GitHub</a>}
          {site.email && <a href={`mailto:${site.email}`}>Email</a>}
        </nav>
      </div>
    </footer>
  );
}
