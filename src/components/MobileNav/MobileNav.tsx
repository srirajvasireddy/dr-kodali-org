import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router";
import { getInvolvedPath, navItems } from "../../data/navigation";

type MobileNavProps = {
  /** Closes the menu; the route change itself is handled by React Router. */
  onNavigate: () => void;
};

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "active" : undefined;

export function MobileNav({ onNavigate }: MobileNavProps) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {navItems.map(({ label, to }) => (
        <NavLink className={navClass} key={to} to={to} onClick={onNavigate}>
          {label}
          <ArrowRight size={18} />
        </NavLink>
      ))}
      <NavLink className={navClass} to={getInvolvedPath} onClick={onNavigate}>
        Get involved <ArrowRight size={18} />
      </NavLink>
    </nav>
  );
}
