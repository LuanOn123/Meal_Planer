import { Pencil, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Field, PageHeader, inputClass } from "../../components/ui/Fields";
import { useToast } from "../../components/ui/Toast";
import { authService } from "../../services/authService";
import { categories, ingredientService, storageLocations, units } from "../../services/ingredientService";

const empty = { name: "", category: "Rau củ", quantity: "", unit: "gram", expirationDate: "", storage: "Tủ lạnh", note: "" };

export function IngredientPage() {
  const auth = authService.current();
  const [items, setItems] = useState(ingredientService.all(auth.id));
  const [form, setForm] = useState(empty);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [error, setError] = useState("");
  const toast = useToast();
  const filtered = useMemo(() => items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) && (category === "all" || item.category === category)), [items, query, category]);

  const save = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.quantity || !form.expirationDate) return setError("Vui lòng nhập tên, số lượng và hạn dùng.");
    setItems(ingredientService.save({ ...form, userId: auth.id }));
    setForm(empty);
    setError("");
    toast.show(form.id ? "Đã cập nhật nguyên liệu." : "Đã thêm nguyên liệu.");
  };

  const remove = (id) => {
    if (!confirm("Bạn muốn xóa nguyên liệu này?")) return;
    setItems(ingredientService.remove(id, auth.id));
    toast.show("Đã xóa nguyên liệu.");
  };

  const isNear = (date) => (new Date(date) - new Date()) / 86400000 <= 3;

  return (
    <>
      <PageHeader eyebrow="Tủ bếp" title="Quản lý nguyên liệu" description="Theo dõi nguyên liệu đang có, nơi lưu trữ và món nào cần dùng sớm." />
      <section className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <form onSubmit={save} className="grid gap-4 rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
          <h3 className="font-heading text-2xl font-black">{form.id ? "Cập nhật nguyên liệu" : "Thêm nguyên liệu"}</h3>
          {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
          <Field label="Tên nguyên liệu"><input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Danh mục"><select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((x) => <option key={x}>{x}</option>)}</select></Field>
            <Field label="Nơi lưu trữ"><select className={inputClass} value={form.storage} onChange={(e) => setForm({ ...form, storage: e.target.value })}>{storageLocations.map((x) => <option key={x}>{x}</option>)}</select></Field>
            <Field label="Số lượng"><input className={inputClass} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} /></Field>
            <Field label="Đơn vị"><select className={inputClass} value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>{units.map((x) => <option key={x}>{x}</option>)}</select></Field>
          </div>
          <Field label="Hạn dùng"><input className={inputClass} type="date" value={form.expirationDate} onChange={(e) => setForm({ ...form, expirationDate: e.target.value })} /></Field>
          <Field label="Ghi chú"><textarea className={inputClass} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></Field>
          <button className="rounded-2xl bg-orange-500 px-5 py-3 font-black text-white shadow-lg shadow-orange-200">{form.id ? "Lưu cập nhật" : "Thêm nguyên liệu"}</button>
        </form>
        <div>
          <div className="mb-4 grid gap-3 rounded-[24px] border border-orange-100 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px]">
            <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input className={`${inputClass} pl-11`} placeholder="Tìm nguyên liệu" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
            <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">Tất cả danh mục</option>{categories.map((x) => <option key={x}>{x}</option>)}</select>
          </div>
          <div className="grid gap-3">
            {filtered.length === 0 ? <div className="rounded-[24px] border border-dashed border-orange-200 bg-white p-8 text-center font-bold text-slate-500">Chưa có nguyên liệu. Hãy thêm món đầu tiên.</div> : null}
            {filtered.map((item) => (
              <article key={item.id} className="rounded-[24px] border border-orange-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div><h3 className="font-heading text-xl font-black">{item.name}</h3><p className="text-sm text-slate-600">{item.quantity} {item.unit} • {item.storage}</p></div>
                  {isNear(item.expirationDate) ? <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-700">Sắp hết hạn</span> : null}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{item.category} • {item.expirationDate}</span>
                  <div className="flex gap-2"><button type="button" onClick={() => setForm(item)} className="rounded-xl bg-slate-100 p-2" aria-label="Sửa nguyên liệu"><Pencil size={18} /></button><button type="button" onClick={() => remove(item.id)} className="rounded-xl bg-red-50 p-2 text-red-600" aria-label="Xóa nguyên liệu"><Trash2 size={18} /></button></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
