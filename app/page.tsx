"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const paths = [
  {
    id: "benaa",
    labelAr: "بناء",
    labelEn: "Build",
    subtitleAr: "للمقبلين على الزواج",
    subtitleEn: "For couples before marriage",
    descriptionAr:
      "تخطيط وقائي للحياة المشتركة، مالياً ونفسياً وأسرياً.",
    descriptionEn:
      "Preventive planning for shared life: financial, emotional, and family.",
    color: "from-emerald-400/90 to-emerald-600/90",
  },
  {
    id: "solh",
    labelAr: "صلح",
    labelEn: "Reconciliation",
    subtitleAr: "نزاعات أسرية أو ميراث",
    subtitleEn: "Family or inheritance disputes",
    descriptionAr:
      "مرافقة لحل الخلافات الأسرية والميراث بالطرق الودية والقانونية.",
    descriptionEn:
      "Support to resolve family and inheritance disputes amicably and legally.",
    color: "from-sky-400/90 to-sky-600/90",
  },
  {
    id: "ittifaq",
    labelAr: "اتفاق",
    labelEn: "Agreement",
    subtitleAr: "ما بعد الطلاق",
    subtitleEn: "Post‑divorce arrangements",
    descriptionAr:
      "تنظيم الانفصال، الحضانة، والنفقة مع خبراء ومحامين مختصين.",
    descriptionEn:
      "Organizing separation, custody, and alimony with specialized experts.",
    color: "from-amber-400/90 to-amber-600/90",
  },
  {
    id: "aman",
    labelAr: "أمان",
    labelEn: "Child safety",
    subtitleAr: "مرافقة الطفل",
    subtitleEn: "Child support",
    descriptionAr:
      "دعم نفسي وسلوكي للأطفال في الظروف الأسرية الحساسة.",
    descriptionEn:
      "Psychological and behavioral support for children in sensitive situations.",
    color: "from-fuchsia-400/90 to-fuchsia-600/90",
  },
  {
    id: "ubur",
    labelAr: "عُبور",
    labelEn: "Abroad",
    subtitleAr: "الجالية بالخارج",
    subtitleEn: "Algerian diaspora",
    descriptionAr:
      "حلول قانونية وأسرية للجالية الجزائرية عبر الحدود.",
    descriptionEn:
      "Legal and family solutions for Algerians living abroad.",
    color: "from-cyan-400/90 to-cyan-600/90",
  },
];

function HomeInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "en" ? "en" : "ar";

  const handleSelectPath = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("path", id);
    router.push(`/details?${params.toString()}`);
  };

  const toggleLang = () => {
    const params = new URLSearchParams(searchParams.toString());
    const nextLang = lang === "ar" ? "en" : "ar";
    params.set("lang", nextLang);
    router.push(`/?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* الهيدر */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-semibold">
                {lang === "ar" ? "أسرة" : "Usra"}
              </p>
              <p className="text-xs md:text-sm text-slate-300">
                {lang === "ar"
                  ? "منصّة للمرافقة القانونية الأسرية"
                  : "Family legal support platform"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-xl border border-white/20 text-[11px] hover:bg-white/5"
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>
      </header>

      {/* باقي الصفحة كما هي عندك (الهيرو، من نحن، المسارات، FAQ، الفوتر) */}
      {/* الصق هنا نفس المحتوى اللي كان داخل <main> بدون تغيير */}
      {/* ... نفس الكود السابق من قسم الهيرو إلى الفوتر ... */}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeInner />
    </Suspense>
  );
}
