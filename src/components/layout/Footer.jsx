import { Link } from "react-router-dom";
import { AppLink } from "../ui/AppLink";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand" to="/#top">
            <span className="brand-mark" />
            <span>Z-Pantry</span>
          </Link>
          <p>Nấu thông minh hơn. Lãng phí ít hơn. Lập kế hoạch bằng AI.</p>
        </div>
        <div>
          <h3>Liên kết nhanh</h3>
          <AppLink to="/#features">Tính năng</AppLink>
          <AppLink to="/#how-it-works">Cách hoạt động</AppLink>
          <AppLink to="/#benefits">Lợi ích</AppLink>
          <AppLink to="/download">Tải ứng dụng</AppLink>
        </div>
        <div>
          <h3>Nền tảng</h3>
          <AppLink to="https://www.apple.com/app-store/" external>
            App Store
          </AppLink>
          <AppLink to="https://play.google.com/store" external>
            Google Play
          </AppLink>
          <AppLink to="/#app-preview">Demo web</AppLink>
        </div>
        <div>
          <h3>Liên hệ</h3>
          <a href="mailto:hello@z-pantry.ai">hello@z-pantry.ai</a>
          <p>© 2026 Z-Pantry. Đã đăng ký mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
}
