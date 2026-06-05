import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../data/landingContent";
import { AppLink } from "../ui/AppLink";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Điều hướng chính">
        <Link className="brand" to="/#top" aria-label="Về trang chủ Z-Pantry">
          <span className="brand-mark" />
          <span>Z-Pantry</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? "Đóng điều hướng" : "Mở điều hướng"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="nav-links">
          {navItems.map((item) => (
            <AppLink key={item.label} to={item.to}>
              {item.label}
            </AppLink>
          ))}
          <AppLink className="nav-cta" to="/download">
            Tải ứng dụng
          </AppLink>
        </div>
      </nav>
    </header>
  );
}
