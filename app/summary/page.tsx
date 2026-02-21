"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
  arrangements: {
    ar: "ترتيب الحضانة والنفقة",
    en: "Custody & alimony arrangements",
  },
} as const;

const expertLabels = {
  "law-1": {
    ar: "مستشار قانوني – قانون الأسرة والميراث",
    en: "Legal consultant – family & inheritance",
  },
  "mediator-1": {
    ar: "وسيط أسري – جلسات صلح",
    en: "Family mediator – reconciliation sessions",
  },
  "psych-1": {
    ar: "أخصائي نفسي للأطفال",
    en: "Child psychologist",
  },
  "coach-1": {
    ar: "مدرّب أسري",
    en: "Family coach",
  },
  "intl-1": {
    ar: "مستشار دولي للجالية",
    en: "International advisor for diaspora",
  },
  "pre-1": {
    ar: "مستشار ما قبل الزواج",
    en: "Pre‑marriage counselor",
  },
  "divorce-1": {
    ar: "محامٍ أسرة (اتفاقيات ما بعد الطلاق)",
    en: "Family lawyer (post‑divorce agreements)",
  },
} as const;

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  cityCountry: string;
  note: string;
};

function SummaryPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const path = searchParams.get("path") || "";
  const detail = searchParams.get("detail") || "";
  const expert = searchParams.get("expert") || "";
  const lang = searchParams.get("lang") === "en" ? "en" : "ar";

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    cityCountry: "",
    note: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const pathLabel =
    pathLabels[path as keyof typeof pathLabels] ?? pathLabels.solh;
  const detailLabel = detailLabels[detail as keyof typeof detailLabels];
  const expertLabel = expertLabels[expert as keyof typeof expertLabels];

  const isValid = useMemo(() => {
    return (
      form.fullName.trim().length >= 3 &&
      form.phone.trim().length >= 6 &&
      form.cityCountry.trim().length >= 2
    );
  }, [form]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    console.log("Booking request:", {
      lang,
      path,
      detail,
      expert,
      form,
    });

    setSubmitted(true);
  };

  const goBackExperts = () => {
    const params = new URLSearchParams();
    params.set("path", path);
    if (detail) params.set("detail", detail);
    params.set("lang", lang);
    router.push(`/experts?${params.toString()}`);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-emerald-900 flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 text-right text-slate-900">
          <h1 className="text-3xl font-bold mb-4">
            {lang === "ar"
              ? "تم استلام طلبك بنجاح"
              : "Your request has been received"}
          </h1>
          <p className="mb-4">
            {lang === "ar"
              ? "شكرًا لثقتك. سيتم التواصل معك لتأكيد الموعد وتفاصيل الجلسة عبر الهاتف أو البريد الإلكتروني."
              : "Thank you for your trust. We will contact you to confirm the appointment and session details by phone or email."}
          </p>
          <div className="border-t pt-4 text-sm text-slate-700 mb-6">
            <p>
              {lang === "ar" ? "المسار:" : "Path:"}{" "}
              {lang === "ar" ? pathLabel.ar : pathLabel.en}
            </p>
            {detailLabel && (
              <p>
                {lang === "ar" ? "التفصيل:" : "Detail:"}{" "}
                {lang === "ar" ? detailLabel.ar : detailLabel.en}
              </p>
            )}
            {expertLabel && (
              <p>
                {lang === "ar" ? "الخبير:" : "Expert:"}{" "}
                {lang === "ar" ? expertLabel.ar : expertLabel.en}
              </p>
            )}
          </div>
          <button
            onClick={() => router.push(`/?lang=${lang}`)}
            className="px-5 py-2 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-400"
          >
            {lang === "ar"
              ? "العودة إلى الصفحة الرئيسية"
              : "Back to home"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid gap-6 md:grid-cols-[1.2fr_1.3fr] text-right">
        {/* ملخص الطلب */}
        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">
            {lang === "ar" ? "ملخص الطلب" : "Request summary"}
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-300">
                {lang === "ar" ? "المسار المختار" : "Selected path"}
              </p>
              <p className="font-semibold">
                {lang === "ar" ? pathLabel.ar : pathLabel.en}
              </p>
            </div>
            {detailLabel && (
              <div>
                <p className="text-slate-300">
                  {lang === "ar" ? "التفصيل" : "Detail"}
                </p>
                <p className="font-semibold">
                  {lang === "ar" ? detailLabel.ar : detailLabel.en}
                </p>
              </div>
            )}
            {expertLabel && (
              <div>
                <p className="text-slate-300">
                  {lang === "ar" ? "الخبير المقترح" : "Suggested expert"}
                </p>
                <p className="font-semibold">
                  {lang === "ar" ? expertLabel.ar : expertLabel.en}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={goBackExperts}
            className="mt-6 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm"
          >
            {lang === "ar"
              ? "تعديل اختيار الخبير"
              : "Edit expert selection"}
          </button>
        </section>

        {/* نموذج البيانات */}
        <section className="bg-white rounded-3xl shadow-2xl p-6 text-slate-900">
          <h2 className="text-2xl font-bold mb-1">
            {lang === "ar" ? "بيانات الحجز" : "Booking details"}
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            {lang === "ar"
              ? "أدخل بياناتك ليتم التواصل معك لتأكيد الموعد المناسب."
              : "Enter your information so we can contact you to confirm the appointment."}
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1">
                {lang === "ar" ? "الاسم الكامل *" : "Full name *"}
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={
                  lang === "ar"
                    ? "مثال: أحمد بن يوسف"
                    : "Example: Ahmed Ben Youssef"
                }
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm mb-1">
                  {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="example@mail.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">
                  {lang === "ar" ? "رقم الهاتف *" : "Phone number *"}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder={
                    lang === "ar"
                      ? "مثال: 0550 00 00 00"
                      : "Example: +213 550 00 00 00"
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">
                {lang === "ar" ? "المدينة / البلد *" : "City / country *"}
              </label>
              <input
                type="text"
                value={form.cityCountry}
                onChange={(e) =>
                  handleChange("cityCountry", e.target.value)
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={
                  lang === "ar"
                    ? "مثال: باتنة، الجزائر / باريس، فرنسا"
                    : "Example: Batna, Algeria / Paris, France"
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                {lang === "ar" ? "ملاحظة إضافية" : "Additional note"}
              </label>
              <textarea
                value={form.note}
                onChange={(e) => handleChange("note", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={
                  lang === "ar"
                    ? "أي تفاصيل تود مشاركتها مع الخبير..."
                    : "Any details you would like to share with the expert..."
                }
              />
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full mt-2 py-2.5 rounded-xl font-semibold ${
                isValid
                  ? "bg-emerald-500 text-white hover:bg-emerald-400"
                  : "bg-slate-400 text-slate-800 cursor-not-allowed"
              }`}
            >
              {lang === "ar"
                ? "إرسال طلب الحجز"
                : "Submit booking request"}
            </button>

            <p className="text-xs text-slate-500 mt-1 text-right">
              {lang === "ar"
                ? "* الحقول الإلزامية. لن يتم مشاركة بياناتك خارج فريق المنصّة."
                : "* Required fields. Your data will not be shared outside the platform team."}
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

export default function SummaryPage() {
  return (
    <Suspense fallback={null}>
      <SummaryPageInner />
    </Suspense>
  );
}
