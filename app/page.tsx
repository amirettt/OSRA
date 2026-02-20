"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const paths = [
  {
    id: "benaa",
    labelAr: "بناء",
    labelEn: "Build",
    subtitleAr: "للمقبلين على الزواج",
    subtitleEn: "For couples before marriage",
    descriptionAr: "تخطيط وقائي للحياة المشتركة، مالياً ونفسياً وأسرياً.",
    descriptionEn: "Preventive planning for shared life: financial, emotional, and family.",
    color: "from-emerald-400/90 to-emerald-600/90",
  },
  {
    id: "solh",
    labelAr: "صلح",
    labelEn: "Reconciliation",
    subtitleAr: "نزاعات أسرية أو ميراث",
    subtitleEn: "Family or inheritance disputes",
    descriptionAr: "مرافقة لحل الخلافات الأسرية والميراث بالطرق الودية والقانونية.",
    descriptionEn: "Support to resolve family and inheritance disputes amicably and legally.",
    color: "from-sky-400/90 to-sky-600/90",
  },
  {
    id: "ittifaq",
    labelAr: "اتفاق",
    labelEn: "Agreement",
    subtitleAr: "ما بعد الطلاق",
    subtitleEn: "Post‑divorce arrangements",
    descriptionAr: "تنظيم الانفصال، الحضانة، والنفقة مع خبراء ومحامين مختصين.",
    descriptionEn: "Organizing separation, custody, and alimony with specialized experts.",
    color: "from-amber-400/90 to-amber-600/90",
  },
  {
    id: "aman",
    labelAr: "أمان",
    labelEn: "Child safety",
    subtitleAr: "مرافقة الطفل",
    subtitleEn: "Child support",
    descriptionAr: "دعم نفسي وسلوكي للأطفال في الظروف الأسرية الحساسة.",
    descriptionEn: "Psychological and behavioral support for children in sensitive situations.",
    color: "from-fuchsia-400/90 to-fuchsia-600/90",
  },
  {
    id: "ubur",
    labelAr: "عُبور",
    labelEn: "Abroad",
    subtitleAr: "الجالية بالخارج",
    subtitleEn: "Algerian diaspora",
    descriptionAr: "حلول قانونية وأسرية للجالية الجزائرية عبر الحدود.",
    descriptionEn: "Legal and family solutions for Algerians living abroad.",
    color: "from-cyan-400/90 to-cyan-600/90",
  },
];

export default function Home() {
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
            <div className="w-11 h-11 rounded-2xl bg-emerald-400/10 border border-emerald-400/60 overflow-hidden flex items-center justify-center">
              <Image
                  src="/logo.png"
                alt="Family Platform Logo"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <div className="text-right">
              <p className="text-base md:text-lg font-semibold leading-snug">
                {lang === "ar" ? "منصّة أسرة" : "Family Platform"}
              </p>
              <p className="text-xs md:text-sm text-slate-300">
                {lang === "ar"
                  ? "مرافقة قانونية ونفسية بأسلوب عصري"
                  : "Modern legal & psychological family support"}
              </p>
            </div>
          </div>
          <button
            onClick={toggleLang}
            className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {lang === "ar" ? "English" : "العربية"}
          </button>
        </div>
      </header>

      {/* الهيرو مع خلفية الأم والطفل */}
      <section className="relative border-b border-white/5 bg-slate-950 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/mother-child.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16 grid gap-10 md:grid-cols-[1.2fr_1fr] items-center">
          <div className="text-right space-y-5">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/40 text-emerald-200 text-xs">
              {lang === "ar"
                ? "مساحة آمنة • سرية • معتمدة"
                : "Safe space • Confidential • Trusted"}
            </p>

            <h1 className="text-3xl md:text-5xl font-black leading-snug">
              {lang === "ar" ? (
                <>
                  مرافقة أسرية{" "}
                  <span className="text-emerald-400">احترافية</span>{" "}
                  من أول سؤال حتى حجز الجلسة.
                </>
              ) : (
                <>
                  Professional{" "}
                  <span className="text-emerald-400">family support</span>{" "}
                  from first question to booking the session.
                </>
              )}
            </h1>

            <p className="text-sm md:text-base text-slate-200 max-w-xl ml-auto">
              {lang === "ar"
                ? "اختر مسارك في أقل من دقيقة، أجب عن أسئلة بسيطة، ثم نوجّهك تلقائياً نحو الخبراء الأنسب لحالتك."
                : "Choose your path in less than a minute, answer a few simple questions, and we guide you to the most relevant experts."}
            </p>

            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() =>
                  document
                    .getElementById("paths-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm transition-transform transition-colors duration-200 hover:bg-emerald-400 hover:-translate-y-0.5"
              >
                {lang === "ar" ? "ابدأ التشخيص الآن" : "Start assessment"}
              </button>
              <button
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("path", "solh");
                  router.push(`/details?${params.toString()}`);
                }}
                className="px-5 py-2.5 rounded-xl border border-white/20 text-sm hover:bg-white/5 transition-colors"
              >
                {lang === "ar" ? "جرّب مسار الصلح" : "Try reconciliation path"}
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              {lang === "ar"
                ? "لا حاجة لتسجيل الدخول في النسخة التجريبية. يمكنك إغلاق الصفحة في أي وقت دون حفظ بيانات."
                : "No login required in this prototype. You can close the page anytime without saving data."}
            </p>
          </div>

          <div className="bg-white/5 rounded-3xl border border-white/10 p-5 space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold text-right">
              {lang === "ar" ? "لماذا منصّة الأسرة؟" : "Why this platform?"}
            </h2>
            <ul className="space-y-3 text-[13px] text-slate-100 text-right">
              <li>
                {lang === "ar"
                  ? "تحويل وضعيتك الأسرية إلى مسار واضح بخطوات محددة."
                  : "Turn your family situation into a clear path with defined steps."}
              </li>
              <li>
                {lang === "ar"
                  ? "اختيار خبراء موثوقين بدل البحث العشوائي في الإنترنت."
                  : "Choose trusted experts instead of random internet search."}
              </li>
              <li>
                {lang === "ar"
                  ? "إمكانية المرافقة عن بُعد للجالية الجزائرية في الخارج."
                  : "Remote support for Algerian diaspora abroad."}
              </li>
            </ul>
            <div className="mt-3 text-xs text-slate-300 text-right">
              <p>
                {lang === "ar"
                  ? "هذه نسخة تجريبية (Prototype) للعرض والتجربة."
                  : "This is a prototype version for demo and testing."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* من نحن + كيف تعمل المنصّة + أزرار التواصل */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-6">
        <div className="rounded-3xl bg-slate-900/70 border border-slate-800 px-5 py-4 text-right">
          <h2 className="text-lg md:text-xl font-semibold mb-2">
            {lang === "ar" ? "من نحن؟" : "Who are we?"}
          </h2>
          <p className="text-sm md:text-[15px] text-slate-200 leading-relaxed">
            {lang === "ar"
              ? "نحن أخصائيون في مجال القانون، نرافق الأسر في تنظيم أوضاعها القانونية والأسرية، مع التركيز على وضوح الحقوق وتخفيف النزاعات داخل العائلة."
              : "We are legal specialists supporting families in organizing their legal and family situations, with a focus on clarity of rights and reducing conflicts within the family."}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] items-start">
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 px-5 py-4 text-right">
            <h3 className="text-base md:text-lg font-semibold mb-3">
              {lang === "ar" ? "كيف تعمل المنصّة؟" : "How does the platform work?"}
            </h3>
            <ol className="space-y-2.5 text-sm text-slate-200">
              <li>
                {lang === "ar"
                  ? "1. اختر المسار الذي يعبّر عن وضعك اليوم (بناء، صلح، اتفاق، أمان، عبور)."
                  : "1. Choose the path that matches your situation (Build, Reconciliation, Agreement, Child safety, Abroad)."}
              </li>
              <li>
                {lang === "ar"
                  ? "2. أجب عن أسئلة تشخيصية بسيطة تساعدنا على فهم حالتك."
                  : "2. Answer a few simple assessment questions that help us understand your case."}
              </li>
              <li>
                {lang === "ar"
                  ? "3. نوجّهك نحو مرافقة قانونية مناسبة، ونوضّح لك الخيارات والخطوات القادمة."
                  : "3. We guide you toward suitable legal support and clarify your options and next steps."}
              </li>
            </ol>
          </div>

          <div className="rounded-3xl bg-emerald-500/5 border border-emerald-500/30 px-5 py-4 text-right space-y-3">
            <h3 className="text-base md:text-lg font-semibold mb-2">
              {lang === "ar" ? "التواصل وحجز الجلسات" : "Contact & session booking"}
            </h3>
            <p className="text-xs md:text-sm text-slate-200">
              {lang === "ar"
                ? "للتواصل معنا أو حجز جلسة مرافقة قانونية أسرية يمكنك استعمال واتساب، أو ملء الاستبيان ثم طلب التواصل."
                : "To contact us or book a legal family support session, you can use WhatsApp or fill out the assessment then request a follow‑up."}
            </p>
            <div className="flex flex-wrap gap-3 justify-end">
              <a
                href="https://wa.me/21366663463"
                target="_blank"
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs md:text-sm font-semibold
                           transition-transform transition-colors duration-200 hover:bg-emerald-400 hover:-translate-y-0.5"
              >
                {lang === "ar" ? "احجز الجلسة عبر واتساب" : "Book a session on WhatsApp"}
              </a>
              <a
                href="https://wa.me/21366663463"
                target="_blank"
                className="px-4 py-2 rounded-xl border border-emerald-400/60 text-emerald-200 text-xs md:text-sm
                           hover:bg-emerald-400/10 transition-colors"
              >
                {lang === "ar" ? "تواصل معنا" : "Contact us"}
              </a>
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === "ar"
                ? "حاليًا النموذج للتجربة فقط، وقد يتم تعديل طرق الحجز والدفع في النسخ القادمة."
                : "Currently, this is a demo prototype. Booking and payment methods may change in future versions."}
            </p>
          </div>
        </div>
      </section>

      {/* المسارات */}
      <section
        id="paths-section"
        className="max-w-6xl mx-auto px-4 py-10 md:py-14"
      >
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 mb-6">
          <div className="text-right">
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              {lang === "ar"
                ? "اختر المسار الذي يعبّر عن حالتك اليوم"
                : "Choose the path that matches your situation"}
            </h2>
            <p className="text-sm text-slate-300">
              {lang === "ar"
                ? "يمكنك تغيير المسار في أي وقت أو تجربة أكثر من مسار."
                : "You can change the path at any time or try multiple paths."}
            </p>
          </div>
          <p className="text-[12px] text-slate-400 text-right max-w-xs">
            {lang === "ar"
              ? "خطوة 1 من 3 • التشخيص الأولي."
              : "Step 1 of 3 • Initial assessment."}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {paths.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPath(p.id)}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${p.color} p-[1px] text-right shadow-lg 
                transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-2xl`}
            >
              <div className="h-full w-full rounded-[1.35rem] bg-slate-950/90 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-300">
                      {lang === "ar" ? `مسار ${p.labelAr}` : `${p.labelEn} path`}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-slate-100">
                      {lang === "ar" ? "تشخيص سريع" : "Quick assessment"}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">
                    {lang === "ar" ? p.subtitleAr : p.subtitleEn}
                  </h3>
                  <p className="text-[13px] text-slate-200 mb-3">
                    {lang === "ar" ? p.descriptionAr : p.descriptionEn}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[12px] text-emerald-200">
                  <span className="group-hover:translate-x-1 transition">
                    {lang === "ar" ? "ابدأ هذا المسار" : "Start this path"}
                  </span>
                  <span className="opacity-80 group-hover:opacity-100">
                    ←
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* الأسئلة الشائعة */}
      <section className="max-w-6xl mx-auto px-4 pb-10 md:pb-14">
        <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-5 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-right">
            {lang === "ar" ? "أسئلة شائعة" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-4 text-right text-sm md:text-[15px] text-slate-100">
            <div>
              <p className="font-semibold mb-1">
                {lang === "ar"
                  ? "هل الجلسات سرّية؟"
                  : "Are the sessions confidential?"}
              </p>
              <p className="text-slate-300">
                {lang === "ar"
                  ? "نعم، أي تواصل يتم بينك وبين الأخصائي القانوني يتم التعامل معه بسرّية واحترام تام، ولا تُشارك تفاصيلك مع أي طرف دون إذنك."
                  : "Yes. Any communication between you and the legal specialist is treated with full confidentiality and respect, and your details are not shared without your permission."}
              </p>
            </div>

            <div>
              <p className="font-semibold mb-1">
                {lang === "ar"
                  ? "هل هذه المنصّة بديل عن المحامي أو الطبيب؟"
                  : "Is this platform a replacement for a lawyer or doctor?"}
              </p>
              <p className="text-slate-300">
                {lang === "ar"
                  ? "المنصّة تساعدك على فهم وضعك القانوني والأسري بشكل أوضح، لكنها لا تغني عن الاستشارة المباشرة مع محامٍ أو طبيب مختص عند الحاجة."
                  : "The platform helps you better understand your legal and family situation, but it does not replace direct consultation with a lawyer or medical professional when needed."}
              </p>
            </div>

            <div>
              <p className="font-semibold mb-1">
                {lang === "ar"
                  ? "كيف يتم الدفع؟"
                  : "How does payment work?"}
              </p>
              <p className="text-slate-300">
                {lang === "ar"
                  ? "حاليًا النموذج للتجربة فقط، ولا يوجد نظام دفع مفعّل داخل المنصّة. في حال إطلاق النسخة الرسمية سيتم توضيح طرق الدفع بشكل شفاف."
                  : "Currently this is a demo prototype and there is no active payment system. When the official version is launched, payment methods will be clearly explained."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>
            {lang === "ar"
              ? "نسخة تجريبية • لا تُعد استشارة قانونية أو طبية نهائية."
              : "Prototype • Not a final legal or medical advice."}
          </p>
          <p>
            © {new Date().getFullYear()}{" "}
            {lang === "ar" ? "منصّة الأسرة – نموذج أولي" : "Family Platform – MVP"}
          </p>
        </div>
      </footer>
    </main>
  );
}
