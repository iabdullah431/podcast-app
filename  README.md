# 📦 مشروع البحث في iTunes

---

## ⚙️ الأدوات المستخدمة

- **الواجهة الأمامية (Frontend):**

  - ⚛️ React
  - 🚀 Next.js
  - 🎨 Tailwind CSS

- **الواجهة الخلفية (Backend):**

  - 🟢 Node.js
  - 📡 Express
  - 📊 Prisma

- **قاعدة البيانات:**
  - 🗄️ SQLite (خفيفة وسهلة الاستخدام)

---

## 🚀 طريقة تشغيل المشروع

1. 🔽 نزّل المشروع من Git.
2. 📂 افتح المشروع وادخل مجلد **backend**.
3. 🛠️ شغل الأمر التالي لتوليد عميل Prisma:
4. ▶️ شغل سيرفر الباك اند:
5. 🆕 افتح نافذة طرفية جديدة وادخل مجلد **frontend**.
6. 📦 نزّل الموديلات المطلوبة:
7. ▶️ شغل الواجهة الأمامية:
8. ✅ الآن السيرفرين شغالين والبحث يشتغل بدون مشاكل.
9. 🔍 لتصفح قاعدة البيانات بسهولة، ادخل مجلد **backend** وشغل:

## 📝 شرح المشروع

- تم بناء REST API endpoint في الباك اند يستقبل كلمة البحث كمدخل، ويستخدم **iTunes Search API** للبحث عن النتائج.
- يتم تخزين النتائج في قاعدة البيانات SQLite.
- يعيد API النتائج كاستجابة (Response).
- الواجهة الأمامية تعرض نتائج البحث بشكل مرتب باستخدام React وNext.js.
