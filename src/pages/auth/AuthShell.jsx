import { ChefHat, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const foodImages = [
  {
    src: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=700&q=80",
    label: "Phở bò"
  },
  {
    src: "https://gastrofun.net/wp-content/uploads/2025/06/Banh-mi-1-2048x1152.jpeg",
    label: "Bánh mì"
  },
  {
    src: "https://i1-giadinh.vnecdn.net/2023/09/16/Buoc-4-Thanh-pham-1-1-1411-1694856861.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=nYLgavSGbDEeMyiUX5o8Cw",
    label: "Cá kho tộ"
  },
  {
    src: "https://i1-giadinh.vnecdn.net/2025/12/09/Goi-cuon-tom-thit-6-vnexpress-5204-4845-1765272698.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=NicT2wFPIXdI3MQZnXvExQ",
    label: "Gỏi cuốn"
  },
  {
    src: "https://i1-giadinh.vnecdn.net/2021/03/19/ca2-1616122035-2163-1616122469.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=8PTOflZJZdwzP68MSUhLhg",
    label: "Canh chua"
  }
];

export function AuthShell({ title, subtitle, children }) {
  return (
   <main className="auth-page min-h-screen bg-[radial-gradient(circle_at_14%_10%,#fed7aa,transparent_30%),linear-gradient(135deg,#fff7ed,#ffffff_48%,#f0fdf4)] px-4 py-4">
      <Link to="/" className="mx-auto mb-6 flex w-fit items-center gap-3 font-heading text-lg font-black">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-500 text-white">
          <ChefHat size={21} />
        </span>
        Z-Pantry
      </Link> 
      <section className="auth-card mx-auto grid max-w-[820px] overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-xl shadow-orange-300 lg:grid-cols-[0.78fr_1fr]">
        <aside className="auth-visual hidden bg-[#24170f] p-6 text-white lg:block">
          <div className="flex h-full flex-col justify-between rounded-[22px] border border-white/12 bg-[linear-gradient(145deg,rgba(249,115,22,.24),rgba(22,163,74,.18))] p-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-100">
                <Sparkles size={14} />
                Bếp Việt thông minh
              </span>
              <h1 className="mt-4 max-w-md font-heading text-[26px] font-black leading-tight">
                Lên thực đơn từ nguyên liệu có sẵn.
              </h1>
              <p className="mt-3 max-w-sm text-xs leading-5 text-white/72">
                Gợi ý món ăn gần gũi, quản lý tủ bếp rõ ràng và giảm lãng phí mỗi ngày.
              </p>
            </div>

            <div className="auth-food-grid my-4 grid grid-cols-2 gap-2">
              {foodImages.map((image, index) => (
                <figure className={`auth-dish-card ${index === 0 ? "row-span-2" : ""}`} key={image.label}>
                  <img src={image.src} alt="" />
                  <figcaption>{image.label}</figcaption>
                </figure>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs font-black">
              <span className="rounded-2xl bg-white/12 p-3 backdrop-blur">Ít lãng phí</span>
              <span className="rounded-2xl bg-white/12 p-3 backdrop-blur">Nấu nhanh</span>
              <span className="rounded-2xl bg-white/12 p-3 backdrop-blur">Hợp vị</span>
            </div>
          </div>
        </aside>

        <div className="auth-form-panel p-5 sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">Chào mừng đến Z-Pantry</p>
          <h2 className="mt-2 font-heading text-2xl font-black leading-tight text-slate-950 sm:text-[28px]">
  {title}
</h2>
          <p className="mt-2 max-w-xl text-sm leading-5 text-slate-600">{subtitle}</p>
          <div className="mt-4">{children}</div>
        </div>
      </section>
    </main>
  );
}
