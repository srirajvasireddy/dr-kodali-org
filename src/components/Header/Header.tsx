import { ArrowRight, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import { getInvolvedPath, navItems } from "../../data/navigation";

type HeaderProps = {
  /** Solid header treatment: always on for inner pages, on scroll for home. */
  scrolled: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
};

// NavLink already sets aria-current="page" on the active link, so the only
// thing left to do here is hand the existing `.active` class back to the CSS.
const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "active" : undefined;

const ctaClass = ({ isActive }: { isActive: boolean }) =>
  `header-cta${isActive ? " active" : ""}`;

export function Header({ scrolled, menuOpen, onToggleMenu }: HeaderProps) {
  return (
    <header className={`site-header${scrolled ? " header-scrolled" : ""}`}>
      <Link
        className="brand"
        to="/"
        aria-label="Dr Kodali Veeriah Educational Academy home"
      >
        <span className="brand-mark">DK</span>
        <span className="brand-copy">
          <strong>Dr. Kodali Veeriah</strong>
          <small>Educational Academy</small>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map(({ label, to }) => (
          <NavLink className={navClass} key={to} to={to}>
            {label}
          </NavLink>
        ))}
      </nav>
      <NavLink className={ctaClass} to={getInvolvedPath}>
        Get involved <ArrowRight size={17} />
      </NavLink>
      <button
        className="menu-button"
        type="button"
        onClick={onToggleMenu}
        aria-expanded={menuOpen}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}
