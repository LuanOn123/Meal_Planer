import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, PageHeader, inputClass } from "../../components/ui/Fields";
import { useToast } from "../../components/ui/Toast";
import { authService } from "../../services/authService";
import { userService } from "../../services/userService";

const skill = ["Mới bắt đầu", "Trung cấp", "Nâng cao"];
const diets = ["Bình thường", "Ăn chay", "Thuần chay", "Ít tinh bột", "Giàu đạm", "Ăn lành mạnh"];
const goals = ["Tiết kiệm tiền", "Ăn lành mạnh hơn", "Tăng cơ", "Giảm cân", "Giảm lãng phí thực phẩm", "Lập kế hoạch nhanh hơn"];

export function EditProfilePage() {
  const auth = authService.current();
  const user = userService.get(auth.id);
  const [form, setForm] = useState({
    fullName: user.profile?.fullName || user.name,
    age: user.profile?.age || "",
    gender: user.profile?.gender || "",
    dietaryPreference: user.profile?.dietaryPreference || "Bình thường",
    allergies: user.profile?.allergies || "",
    cookingSkill: user.profile?.cookingSkill || "Mới bắt đầu",
    mainGoal: user.profile?.mainGoal || "Giảm lãng phí thực phẩm",
    avatarUrl: user.profile?.avatarUrl || ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const submit = (event) => {
    event.preventDefault();
    if (!form.fullName.trim()) return setError("Vui lòng nhập họ tên.");
    if (form.age && Number(form.age) <= 0) return setError("Tuổi cần là số hợp lệ.");
    userService.update(auth.id, { name: form.fullName, profile: { ...form, onboarded: true } });
    toast.show("Đã cập nhật hồ sơ.");
    navigate("/profile");
  };

  return (
    <>
      <PageHeader eyebrow="Cập nhật hồ sơ" title="Chỉnh sửa sở thích của bạn" description="Email được giữ chỉ đọc trong bản giao diện mẫu này." />
      <form onSubmit={submit} className="grid gap-5 rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm md:grid-cols-2">
        {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700 md:col-span-2">{error}</p> : null}
        <Field label="Họ và tên"><input className={inputClass} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></Field>
        <Field label="Email"><input className={`${inputClass} bg-slate-50`} value={user.email} disabled /></Field>
        <Field label="Tuổi"><input className={inputClass} type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} /></Field>
        <Field label="Giới tính"><input className={inputClass} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} /></Field>
        <Field label="Chế độ ăn"><select className={inputClass} value={form.dietaryPreference} onChange={(e) => setForm({ ...form, dietaryPreference: e.target.value })}>{diets.map((x) => <option key={x}>{x}</option>)}</select></Field>
        <Field label="Kỹ năng nấu ăn"><select className={inputClass} value={form.cookingSkill} onChange={(e) => setForm({ ...form, cookingSkill: e.target.value })}>{skill.map((x) => <option key={x}>{x}</option>)}</select></Field>
        <Field label="Mục tiêu chính"><select className={inputClass} value={form.mainGoal} onChange={(e) => setForm({ ...form, mainGoal: e.target.value })}>{goals.map((x) => <option key={x}>{x}</option>)}</select></Field>
        <Field label="URL ảnh đại diện"><input className={inputClass} value={form.avatarUrl} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })} /></Field>
        <Field label="Dị ứng"><textarea className={inputClass} value={form.allergies} onChange={(e) => setForm({ ...form, allergies: e.target.value })} /></Field>
        <div className="flex items-end"><button className="w-full rounded-2xl bg-orange-500 px-5 py-3 font-black text-white shadow-lg shadow-orange-200">Lưu hồ sơ</button></div>
      </form>
    </>
  );
}
