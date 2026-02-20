"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Expert = {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  priceAr: string;
  priceEn: string;
  tagsAr: string[];
  tagsEn: string[];
};

const expertsByPath: Record<string, Expert[]> = {
  solh: [
    {
      id: "law-1",
      nameAr: "مستشار قانوني",
      nameEn: "Legal consultant",
      roleAr: "قانون الأسرة والميراث",
      roleEn: "Family & inheritance law",
      descriptionAr:
        "خبرة في حل النزاعات الأسرية والميراث بالطرق الودية والقانونية.",
      descriptionEn:
        "Experienced in resolving family and inheritance disputes amicably and legally.",
      priceAr: "ابتداءً من 4,000 دج للجلسة",
      priceEn: "From 4,000 DZD per session",
      tagsAr: ["ميراث", "نزاعات زوجية", "حضانة"],
      tagsEn: ["inheritance", "marital disputes", "custody"],
    },
    {
      id: "mediator-1",
      nameAr: "وسيط أسري",
      nameEn: "Family mediator",
      roleAr: "وساطة وحوار",
      roleEn: "Mediation & dialogue",
      descriptionAr:
        "متخصص في إدارة جلسات الصلح والحوار بين أطراف النزاع.",
      descriptionEn:
        "Specialized in running mediation and dialogue sessions between parties.",
      priceAr: "ابتداءً من 3,500 دج للجلسة",
      priceEn: "From 3,500 DZD per session",
      tagsAr: ["وساطة", "جلسات صلح"],
      tagsEn: ["mediation", "settlement sessions"],
    },
  ],
  aman: [
    {
      id: "psych-1",
      nameAr: "أخصائي نفسي للأطفال",
      nameEn: "Child psychologist",
      roleAr: "دعم نفسي وسلوكي",
      roleEn: "Psychological & behavioral support",
      descriptionAr:
        "مرافقة الأطفال في حالات الطلاق، الصدمات، والمشاكل السلوكية.",
      descriptionEn:
        "Supports children facing divorce, trauma, and behavioral issues.",
      priceAr: "ابتداءً من 5,000 دج للجلسة",
      priceEn: "From 5,000 DZD per session",
      tagsAr: ["أطفال", "سلوك", "طلاق"],
      tagsEn: ["children", "behavior", "divorce"],
    },
    {
      id: "coach-1",
      nameAr: "مدرّب أسري",
      nameEn: "Family coach",
      roleAr: "تربية إيجابية",
      roleEn: "Positive parenting",
      descriptionAr:
        "توجيه الوالدين في التعامل اليومي مع الأطفال وتخفيف التوتر الأسري.",
      descriptionEn:
        "Guides parents in daily interactions and reducing family stress.",
      priceAr: "ابتداءً من 3,000 دج للجلسة",
      priceEn: "From 3,000 DZD per session",
      tagsAr: ["تربية", "أسرة"],
      tagsEn: ["parenting", "family"],
    },
  ],
  ubur: [
    {
      id: "intl-1",
      nameAr: "مستشار دولي",
      nameEn: "International advisor",
      roleAr: "شؤون الجالية بالخارج",
      roleEn: "Diaspora affairs",
      descriptionAr:
        "مرافقة قانونية وإجرائية للجالية الجزائرية في الخارج.",
      descriptionEn:
        "Legal and procedural support for Algerians living abroad.",
      priceAr: "ابتداءً من 80 € للجلسة",
      priceEn: "From 80 € per session",
      tagsAr: ["جالية", "استشارة دولية"],
      tagsEn: ["diaspora", "international consult"],
    },
  ],
  benaa: [
    {
      id: "pre-1",
      nameAr: "مستشار ما قبل الزواج",
      nameEn: "Pre‑marriage counselor",
      roleAr: "تخطيط أسري",
      roleEn: "Family planning",
      descriptionAr:
        "جلسات إعداد نفسي ومالي للمقبلين على الزواج.",
      descriptionEn:
        "Psychological and financial preparation sessions for couples.",
      priceAr: "ابتداءً من 3,500 دج للجلسة",
      priceEn: "From 3,500 DZD per session",
      tagsAr: ["ما قبل الزواج", "تخطيط"],
      tagsEn: ["pre‑marriage", "planning"],
    },
  ],
  ittifaq: [
    {
      id: "divorce-1",
      nameAr: "محامٍ أسرة",
      nameEn: "Family lawyer",
      roleAr: "اتفاقيات ما بعد الطلاق",
      roleEn: "Post‑divorce agreements",
      descriptionAr:
        "صياغة اتفاقيات الحضانة والنفقة وزيارات الأطفال.",
      descriptionEn:
        "Drafts custody, alimony, and visitation agreements.",
      priceAr: "ابتداءً من 6,000 دج للجلسة",
      priceEn: "From 6,000 DZD per session",
      tagsAr: ["طلاق", "اتفاق"],
      tagsEn: ["divorce", "agreement"],
    },
  ],
};

const pathLabels = {
  solh: {
    ar: "مسار الصلح",
    en: "Reconciliation path",
  },
  aman: {
    ar: "مسار أمان الطفل",
    en: "Child safety path",
  },
  ubur: {
    ar: "مسار عبور (الجالية)",
    en: "Abroad / diaspora path",
  },
  benaa: {
    ar: "مسار بناء (قبل الزواج)",
    en: "Pre‑marriage path",
  },
  ittifaq: {
    ar: "مسار اتفاق (بعد الطلاق)",
    en: "Post‑divorce agreement path",
  },
} as const;

const detailLabels = {
  inheritance: { ar: "ميراث عقاري", en: "Real‑estate inheritance" },
  marital: { ar: "خلاف زوجي", en: "Marital conflict" },
  custody: { ar: "حضانة", en: "Child custody" },
  family_split: { ar: "تشتّت أسري", en: "Family split" },
  divorce_trauma: { ar: "صدمة طلاق", en: "Divorce‑related trauma" },
  behavior: { ar: "مشاكل سلوكية", en: "Behavioral issues" },
  intl_consult: { ar: "استشارة دولية", en: "International consultation" },
  property: { ar: "إدارة أملاك في الجزائر", en: "Managing property in Algeria" },
  planning: { ar: "تخطيط مالي وأسري", en: "Financial & family planning" },
  training: { ar: "جلسات تأهيل وتدريب", en: "Preparation & training sessions" },
  lawyer: { ar: "تنسيق مع محامين", en: "Coordination with lawyers" },
  arrangements: { ar: "ترتيب الحضانة والنفقة", en: "Custody & alimony arrangements" },
} as const;

export default function ExpertsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = searchParams.get("path") || "solh";
  const detail = searchParams.get("detail") || "";
  const lang = searchParams.get("lang") === "en" ? "en" : "ar";

  const [query, setQuery] = useState("");

  const allExperts = useMemo(
    () => expertsByPath[path] ?? expertsByPath["solh"],
    [path]
  );

  const filteredExperts = useMemo(() => {
    if (!query.trim()) return allExperts;
    const q = query.trim().toLowerCase();
    return allExperts.filter((e) => {
      const text =
        `${e.nameAr} ${e.nameEn} ${e.roleAr} ${e.roleEn} ${e.descriptionAr} ${e.descriptionEn} ${e.tagsAr.join(
          " "
        )} ${e.tagsEn.join(" ")}`.toLowerCase();
      return text.includes(q);
    });
  }, [allExperts, query]);

  const pathLabel =
    pathLabels[path as keyof typeof pathLabels] ??
    pathLabels.solh;
  const detailLabel =
    detailLabels[detail as keyof typeof detailLabels];

  const goBackDetails = () => {
    const params = new URLSearchParams();
    params.set("path", path);
    params.set("lang", lang);
    router.push(`/details?${params.toString()}`);
  };

  const handleSelectExpert = (expert: Expert) => {
    const params = new URLSearchParams();
    params.set("path", path);
    if (detail) params.set("detail", detail);
    params.set("expert", expert.id);
    params.set("lang", lang);
    router.push(`/summary?${params.toString()}`);
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
                  ? "اختيار الخبير المناسب"
                  : "Choose the right expert"}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-slate-300">
            {lang === "ar"
              ? "خطوة 3 من 3 • اختيار الخبير"
              : "Step 3 of 3 • Expert selection"}
          </p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        {/* شريط التقدّم */}
        <div className="mb-6">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="h-full w-full bg-emerald-400" />
          </div>
          <p className="mt-2 text-[11px] text-slate-400 text-right">
            {lang === "ar"
              ? "هذه الخطوة الأخيرة قبل إرسال طلب الحجز."
              : "This is the final step before sending your booking request."}
          </p>
        </div>

        {/* عنوان + بحث */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
          <div className="flex-1 text-right space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              {lang === "ar"
                ? "اختر الخبير الأنسب لحالتك"
                : "Select the expert who best fits your case"}
            </h1>
            <p className="text-sm text-slate-200">
              {lang === "ar"
                ? pathLabel.ar
                : pathLabel.en}
              {detailLabel &&
                " • " +
                  (lang === "ar"
                    ? detailLabel.ar
                    : detailLabel.en)}
            </p>
            <p className="text-[12px] text-slate-400">
              {lang === "ar"
                ? "يمكنك البحث باسم الخبير أو التخصص أو كلمات مثل: أطفال، قانون، جالية."
                : "Search by expert name, specialty, or keywords such as: children, law, diaspora."}
            </p>
          </div>

          <div className="w-full md:w-72">
            <label className="block text-[12px] mb-1 text-right">
              {lang === "ar"
                ? "بحث داخل قائمة الخبراء"
                : "Search within experts"}
            </label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  lang === "ar"
                    ? "مثال: أطفال، قانون، جالية..."
                    : "e.g. children, law, diaspora..."
                }
                className="w-full rounded-2xl bg-white/5 border border-white/20 px-3 py-2 pr-4 text-sm text-right focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-300">
                🔍
              </span>
            </div>
          </div>
        </div>

        {/* زر تعديل التفاصيل */}
        <div className="flex justify-end mb-4">
          <button
            onClick={goBackDetails}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs md:text-sm"
          >
            {lang === "ar"
              ? "تعديل تفاصيل الحالة"
              : "Edit case details"}
          </button>
        </div>

        {/* قائمة الخبراء */}
        {filteredExperts.length === 0 ? (
          <p className="text-right text-sm text-slate-300">
            {lang === "ar"
              ? "لا يوجد خبراء يطابقون عبارة البحث الحالية. جرّب كلمات أبسط."
              : "No experts match your current search. Try simpler keywords."}
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredExperts.map((expert) => (
              <div
                key={expert.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    {lang === "ar" ? expert.nameAr : expert.nameEn}
                  </h2>
                  <p className="text-sm text-emerald-300 mb-2">
                    {lang === "ar" ? expert.roleAr : expert.roleEn}
                  </p>
                  <p className="text-sm text-slate-100 mb-3">
                    {lang === "ar"
                      ? expert.descriptionAr
                      : expert.descriptionEn}
                  </p>
                  <p className="text-sm font-medium mb-3">
                    {lang === "ar"
                      ? expert.priceAr
                      : expert.priceEn}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(lang === "ar"
                      ? expert.tagsAr
                      : expert.tagsEn
                    ).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-white/10 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleSelectExpert(expert)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 text-sm"
                  >
                    {lang === "ar"
                      ? "اختيار هذا الخبير →"
                      : "Choose this expert →"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
