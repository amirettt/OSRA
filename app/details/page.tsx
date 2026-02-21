"use client";

export const dynamic = "force-dynamic";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";


type Option = { id: string; labelAr: string; labelEn: string };

const pathMeta = {
  solh: {
    titleAr: "تفاصيل مسار الصلح",
    titleEn: "Reconciliation path details",
    subtitleAr: "لنحدد طبيعة النزاع بدقة أكبر.",
    subtitleEn: "Let us define the type of dispute more precisely.",
  },
  aman: {
    titleAr: "تفاصيل مسار أمان الطفل",
    titleEn: "Child safety path details",
    subtitleAr: "حتى نوجّهك لأخصائي يناسب وضعية الطفل.",
    subtitleEn: "So we can guide you to the right child specialist.",
  },
  ubur: {
    titleAr: "تفاصيل مسار عبور للجالية",
    titleEn: "Abroad / diaspora path details",
    subtitleAr: "اختر نوع المرافقة المطلوبة من الخارج.",
    subtitleEn: "Choose the type of support you need from abroad.",
  },
  benaa: {
    titleAr: "تفاصيل مسار بناء",
    titleEn: "Pre‑marriage path details",
    subtitleAr: "لنضبط ما تحتاجه قبل الزواج.",
    subtitleEn: "Let us define what you need before marriage.",
  },
  ittifaq: {
    titleAr: "تفاصيل مسار اتفاق",
    titleEn: "Post‑divorce path details",
    subtitleAr: "تحديد طبيعة الاتفاق بعد الطلاق.",
    subtitleEn: "Specify the type of agreement after divorce.",
  },
} as const;

const questions: Record<
  string,
  { titleAr: string; titleEn: string; options: Option[] }
> = {
  solh: {
    titleAr: "ما طبيعة النزاع الأساسي؟",
    titleEn: "What is the main dispute about?",
    options: [
      { id: "inheritance", labelAr: "ميراث عقاري", labelEn: "Real‑estate inheritance" },
      { id: "marital", labelAr: "خلاف زوجي", labelEn: "Marital conflict" },
      { id: "custody", labelAr: "حضانة", labelEn: "Child custody" },
    ],
  },
  aman: {
    titleAr: "ما وضعية الطفل الحالية؟",
    titleEn: "What is the child's current situation?",
    options: [
      { id: "family_split", labelAr: "تشتّت أسري", labelEn: "Family split / separation" },
      { id: "divorce_trauma", labelAr: "صدمة طلاق", labelEn: "Divorce‑related trauma" },
      { id: "behavior", labelAr: "مشاكل سلوكية", labelEn: "Behavioral issues" },
    ],
  },
  ubur: {
    titleAr: "ما نوع الخدمة المطلوبة؟",
    titleEn: "What type of service do you need?",
    options: [
      { id: "intl_consult", labelAr: "استشارة دولية", labelEn: "International consultation" },
      { id: "property", labelAr: "إدارة أملاك في الجزائر", labelEn: "Managing property in Algeria" },
    ],
  },
  benaa: {
    titleAr: "ما أكثر ما تحتاجه في مرحلة ما قبل الزواج؟",
    titleEn: "What do you need most before marriage?",
    options: [
      { id: "planning", labelAr: "تخطيط مالي وأسري", labelEn: "Financial & family planning" },
      { id: "training", labelAr: "جلسات تأهيل وتدريب", labelEn: "Preparation & training sessions" },
    ],
  },
  ittifaq: {
    titleAr: "ما طبيعة الاتفاق المطلوب بعد الطلاق؟",
    titleEn: "What kind of post‑divorce agreement do you need?",
    options: [
      { id: "lawyer", labelAr: "تنسيق مع محامين", labelEn: "Coordination with lawyers" },
      { id: "arrangements", labelAr: "ترتيب الحضانة والنفقة", labelEn: "Custody & alimony arrangements" },
    ],
  },
};

export default function DetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = searchParams.get("path") || "solh";
  const lang = searchParams.get("lang") === "en" ? "en" : "ar";

  const cfg = useMemo(() => questions[path] ?? questions["solh"], [path]);
  const meta = useMemo(
    () => pathMeta[path as keyof typeof pathMeta] ?? pathMeta.solh,
    [path]
  );

  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (!selected) return;
    const params = new URLSearchParams();
    params.set("path", path);
    params.set("detail", selected);
    params.set("lang", lang);
    router.push(`/experts?${params.toString()}`);
  };

  const goBack = () => {
    router.push(`/?lang=${lang}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* هيدر */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-emerald-400/10 border border-emerald-400/60 overflow-hidden flex items-center justify-center">
              <Image
                  src="/logo.png"
                alt="Family Platform Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">
                {lang === "ar" ? "أسرة" : "Usra"}
              </p>
              <p className="text-xs md:text-sm text-slate-300">
                {lang === "ar"
                  ? "مسار التشخيص الأسري"
                  : "Family assessment flow"}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-slate-300">
            {lang === "ar"
              ? "خطوة 2 من 3 • تفاصيل الحالة"
              : "Step 2 of 3 • Case details"}
          </p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        {/* شريط التقدّم */}
        <div className="mb-6">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="h-full w-2/3 bg-emerald-400" />
          </div>
          <p className="mt-2 text-[11px] text-slate-400 text-right">
            {lang === "ar"
              ? "أنت الآن في الخطوة الثانية: اختيار تفاصيل الحالة."
              : "You are in step 2: choosing your case details."}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.1fr_1.1fr] items-start">
          {/* نص يمين */}
          <div className="text-right space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold">
              {lang === "ar" ? meta.titleAr : meta.titleEn}
            </h1>
            <p className="text-sm md:text-base text-slate-200">
              {lang === "ar" ? meta.subtitleAr : meta.subtitleEn}
            </p>
            <p className="text-[12px] text-slate-400">
              {lang === "ar"
                ? "اختر الخيار الأقرب لوضعيتك الحالية؛ يمكنك تعديل الاختيار لاحقاً قبل تأكيد الطلب."
                : "Pick the option that best matches your situation. You can adjust it later before confirming."}
            </p>
          </div>

          {/* خيارات يسار */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
            <p className="text-sm font-medium mb-4 text-right">
              {lang === "ar" ? cfg.titleAr : cfg.titleEn}
            </p>
            <div className="space-y-3 mb-6">
              {cfg.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelected(opt.id)}
                  className={`w-full text-right px-4 py-3 rounded-2xl border text-sm transition ${
                    selected === opt.id
                      ? "bg-emerald-400 text-slate-900 border-emerald-300 shadow-lg"
                      : "bg-white/5 border-white/20 hover:bg-white/10"
                  }`}
                >
                  {lang === "ar" ? opt.labelAr : opt.labelEn}
                </button>
              ))}
            </div>
            <div className="flex justify-between gap-3">
              <button
                onClick={goBack}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs md:text-sm"
              >
                {lang === "ar" ? "← العودة لاختيار المسار" : "← Back to paths"}
              </button>
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`px-5 py-2 rounded-xl font-semibold text-xs md:text-sm ${
                  selected
                    ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                    : "bg-slate-500 text-slate-200 cursor-not-allowed"
                }`}
              >
                {lang === "ar"
                  ? "متابعة إلى قائمة الخبراء →"
                  : "Continue to experts →"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
