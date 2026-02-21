"use client";

export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useMemo } from "react";

type Expert = {
  id: string;
  name: string;
  specialtyAr: string;
  specialtyEn: string;
};

const expertsByPath: Record<string, Expert[]> = {
  solh: [
    { id: "exp1", name: "أ. أحمد بن علي", specialtyAr: "وساطة أسرية", specialtyEn: "Family mediation" },
  ],
  aman: [
    { id: "exp2", name: "د. ليلى مراد", specialtyAr: "طب نفس الطفل", specialtyEn: "Child psychology" },
  ],
  // أكمل باقي المسارات كما تريد...
};

function ExpertsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const path = searchParams.get("path") || "solh";
  const detail = searchParams.get("detail") || "";
  const lang = searchParams.get("lang") === "en" ? "en" : "ar";

  const list = useMemo(
    () => expertsByPath[path] ?? expertsByPath["solh"],
    [path]
  );

  const goBack = () => {
    const params = new URLSearchParams();
    params.set("path", path);
    params.set("lang", lang);
    router.push(`/details?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <p className="text-sm font-semibold">
            {lang === "ar" ? "قائمة الخبراء المقترحين" : "Suggested experts"}
          </p>
          <p className="text-[11px] text-slate-300">
            {lang === "ar"
              ? "خطوة 3 من 3 • اختيار الخبير"
              : "Step 3 of 3 • Choose expert"}
          </p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <p className="text-xs text-slate-400 mb-4 text-right">
          {lang === "ar"
            ? `المسار: ${path} • التفصيل: ${detail || "غير محدد"}`
            : `Path: ${path} • Detail: ${detail || "Not specified"}`}
        </p>

        <div className="space-y-3">
          {list.map((exp) => (
            <div
              key={exp.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center"
            >
              <div className="text-right">
                <p className="text-sm font-semibold">{exp.name}</p>
                <p className="text-[12px] text-slate-300">
                  {lang === "ar" ? exp.specialtyAr : exp.specialtyEn}
                </p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs md:text-sm">
                {lang === "ar" ? "اختيار" : "Select"}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={goBack}
          className="mt-6 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs md:text-sm"
        >
          {lang === "ar" ? "← الرجوع لتفاصيل الحالة" : "← Back to details"}
        </button>
      </section>
    </main>
  );
}

export default function ExpertsPage() {
  return (
    <Suspense fallback={null}>
      <ExpertsPageInner />
    </Suspense>
  );
}
