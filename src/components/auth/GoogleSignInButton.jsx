import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { useToast } from "../ui/Toast";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
const isConfigured = googleClientId && !googleClientId.includes("your-google-oauth-client-id");

export function GoogleSignInButton({ label = "Tiếp tục với Google" }) {
  const toast = useToast();
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    try {
      const session = await authService.loginWithGoogle(response.credential);
      toast.show("Đăng nhập Google thành công.");
      navigate(session.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      toast.show(error.message, "error");
    }
  };

  if (!isConfigured) {
    return (
      <button
        type="button"
        disabled
        className="flex h-12 w-full items-center justify-center rounded-2xl border border-orange-100 bg-slate-50 px-4 text-sm font-black text-slate-400"
        title="Cần cấu hình VITE_GOOGLE_CLIENT_ID trong .env"
      >
        {label}
      </button>
    );
  }

  return (
    <div className="google-login-wrap">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.show("Đăng nhập Google thất bại.", "error")}
        theme="outline"
        shape="pill"
        size="large"
        text="continue_with"
        locale="vi"
        width="100%"
      />
    </div>
  );
}
