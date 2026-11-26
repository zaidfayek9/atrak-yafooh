# عطرك بيفوح | Atrak Yafooh

**تجربة ويب عربية تفاعلية لدار عطور سعودية — RTL، متجاوبة، ومبنية دون أطر عمل.**

[المعاينة الحية](https://zaidfayek9.github.io/atrak-yafooh/) · [المستودع على GitHub](https://github.com/zaidfayek9/atrak-yafooh)

## نبذة عن المشروع

«عطرك بيفوح» واجهة أمامية تجريبية لدار عطور سعودية. صُممت لتقديم هوية الدار ومجموعتها العطرية من خلال تجربة تصفح تجمع بين عرض المنتجات، والسرد البصري، والتفاعلات الصغيرة التي تضيف طابعًا شخصيًا للموقع.

الواجهة باللغة العربية، واتجاهها من اليمين إلى اليسار، وتضم محتوى تعريفيًا عن العطور والباقات ورحلة إعداد العطر، إلى جانب مجلة مصغّرة ونماذج تفاعلية.

## الفكرة وراء المشروع

بدأت الفكرة من أغنية سمعتها لفرقة **جدل**، ومن رغبة شخصية في تقديم شيء مميز للسعودية؛ البلد الذي عشت فيه وأحبه. انعكست هذه الفكرة على هوية الموقع من خلال الألوان والخطوط والزخارف المستوحاة من أجواء المنطقة، وعلى المحتوى الذي يتمحور حول العود والعنبر وورد الطائف.

## أقسام وتجربة الموقع

### المجموعة العطرية
- عرض **ثمانية عطور** ضمن أربع عائلات: العود، والعنبر، والزهري، والمنعش.
- تصفية المنتجات حسب العائلة العطرية.
- بطاقات تفاعلية تكشف تفاصيل كل عطر عند المرور بالمؤشر أو الضغط عليها.
- تعرض التفاصيل الحجم، والافتتاحية، والقلب، والقاعدة، ومدة الثبات، والمناسبة المقترحة.

### محتوى تعريفي وإرشادي
- **رحلة العطر:** أربع مراحل تبدأ بانتقاء الخامات وتنتهي بتعبئة الزجاجة وختمها.
- **هرم العطر:** عرض بصري لمستويات الافتتاحية والقلب والقاعدة وبقاء الأثر.
- **دليل الاختيار:** إرشادات تساعد الزائر على اختيار العطر بحسب المناسبة والعائلة العطرية وتجربته على البشرة.
- **الباقات:** ثلاث باقات معروضة بأحجام ومحتويات وأسعار مختلفة.

### مجلة الدار والمشهد التفاعلي
تضم المجلة ثلاثة موضوعات عن العود والعنبر وورد الطائف. وبجوار المقالات يوجد مشهد بصري متحرك يُرسم برمجيًا على عنصر Canvas، ويعرض ليلًا صحراويًا وكثبانًا وقمرًا وفانوسًا، مع ظهور شخصية الموقع خلال المشهد.

الصوت المصاحب يُولَّد وقت التشغيل باستخدام **Web Audio API**، ولا يعتمد على ملف موسيقي خارجي. يمكن تشغيل الصوت أو إيقافه وإغلاق المشهد.

### شخصية الدار
شخصية مرسومة بأسلوب Pixel Art ترافق الزائر أثناء التصفح، وتعرض تعليقات مرتبطة بأقسام الصفحة. ويمكن الضغط عليها ثم اختيار نقطة في الصفحة لتتحرك إليها.

### تفاعلات إضافية
- رسم قارورة العطر في الواجهة باستخدام SVG، مع حركة تُشغّل عند الضغط عليها.
- قائمة تنقل قابلة للفتح على الشاشات الصغيرة.
- عدّ تنازلي لحملة «جمعة الدار».
- نماذج للتسجيل وطلب عرض عطري، مع التحقق من رقم الجوال السعودي وصحة الحقول المطلوبة.

## الهوية البصرية وإمكانية الاستخدام

- واجهة عربية باستخدام إعدادات اللغة والاتجاه العربية (lang="ar" وdir="rtl").
- لوحة ألوان داكنة مستوحاة من العود، مع درجات الذهب والزعفران والأحمر والرمال.
- خطوط محلية: **Aref Ruqaa Ink** للعناوين و**IBM Plex Sans Arabic** للنصوص.
- تخطيطات متجاوبة تتكيف مع الشاشات الكبيرة والهواتف.
- حالات تركيز واضحة للتنقل بلوحة المفاتيح، وتسميات وخصائص ARIA للعناصر التفاعلية.
- مراعاة إعداد prefers-reduced-motion لتقليل الحركة عند تفعيله في الجهاز.

## التقنيات المستخدمة

| التقنية | الاستخدام |
| --- | --- |
| HTML5 | بناء هيكل الصفحة ومحتواها |
| CSS3 | التخطيطات المتجاوبة، الهوية البصرية، والحركات |
| JavaScript (Vanilla) | التفاعلات وسلوك مكونات الموقع |
| SVG | رسم عناصر بصرية، ومنها قارورة العطر |
| Canvas 2D API | رسم المشهد المتحرك والشخصية بالبكسل |
| Web Audio API | توليد الصوت برمجيًا أثناء تشغيل المشهد |
| Intersection Observer وResize Observer | متابعة مواضع الأقسام وتغيّر أبعاد الصفحة |

المشروع موقع ثابت، ولا يستخدم إطار عمل أو مكتبات خارجية أو أداة بناء. الصور والخطوط محفوظة محليًا داخل المستودع، والمسارات نسبية.

## بنية المشروع

~~~text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── fonts/
│   ├── Aref-700.woff
│   ├── plex400.woff
│   ├── plex500.woff
│   └── plex600.woff
├── image/
│   ├── صور العطور والمنتجات
│   ├── صور أقسام الموقع
│   └── صورة شخصية البكسل
├── .nojekyll
└── README.md
~~~

## التشغيل محليًا

لا يحتاج المشروع إلى تثبيت حزم أو تنفيذ خطوة بناء.

1. استنسخ المستودع:

~~~bash
git clone https://github.com/zaidfayek9/atrak-yafooh.git
~~~

2. انتقل إلى مجلد المشروع:

~~~bash
cd atrak-yafooh
~~~

3. افتح index.html في المتصفح، أو شغّل خادمًا محليًا بسيطًا، مثل:

~~~bash
python -m http.server 8000
~~~

ثم افتح http://localhost:8000.

## نطاق النسخة الحالية

هذه النسخة **واجهة أمامية تجريبية (Front-end Demo)** وليست متجرًا إلكترونيًا متكاملًا. من المهم معرفة حدودها عند تجربة الموقع:

- النماذج تنفّذ التحقق من المدخلات داخل المتصفح وتعرض رسائل توضيحية؛ لكنها لا ترسل البيانات فعليًا إلى واتساب أو البريد الإلكتروني، ولا تحفظها في قاعدة بيانات.
- لا توجد سلة مشتريات أو عملية دفع أو تكامل فعلي مع وسائل الدفع المعروضة في التذييل.
- روابط بعض صفحات الخدمة والسياسات والحسابات الاجتماعية عناصر توضيحية، وليست صفحات أو قنوات مرتبطة بخدمات فعلية.
- موعد العدّ التنازلي محدد حاليًا في ملف js/main.js عند **27 نوفمبر 2026، الساعة 00:00 بتوقيت +03:00**. يجب تحديث قيمة target عند إعادة استخدام الحملة لموعد آخر.
- بيانات المنتجات والأسعار والمقالات مكتوبة داخل ملفات الواجهة، وليست متصلة بنظام إدارة محتوى أو مخزن بيانات.

---

## English

**Atrak Yafooh** is an Arabic-first, RTL front-end concept for a Saudi perfume house. It presents a curated perfume collection through a responsive interface, brand storytelling, interactive product cards, editorial content, and custom browser-based animations.

### Highlights

- Eight perfumes grouped into four scent families, with filtering and interactive product details.
- Brand sections covering the perfume-making journey, a visual scent profile, a selection guide, and three product bundles.
- A three-topic magazine paired with an original desert scene rendered on Canvas.
- Procedurally generated audio using the Web Audio API; no external audio file is required.
- An animated pixel-art mascot that follows the visitor through the page and can be directed to a selected point.
- An animated SVG perfume bottle, a campaign countdown, and forms with Saudi mobile-number validation.
- Arabic typography, RTL layout, responsive styling, keyboard focus states, ARIA attributes, and reduced-motion support.

### Built with

HTML5, CSS3, vanilla JavaScript, SVG, Canvas 2D, and the Web Audio API. Fonts and images are stored locally. The project has no framework, external runtime library, package installation, or build step.

### Run locally

Clone the repository and open index.html, or serve the project with a local static server. No package installation is required.

### Current limitations

This repository contains a front-end demo only. Form submissions are validated in the browser but are not sent to WhatsApp or email and are not persisted. There is no backend, checkout, or payment processing; some footer links are placeholders. The campaign countdown currently targets **November 27, 2026 at 00:00 (UTC+03:00)** and must be changed in js/main.js for a future campaign.
