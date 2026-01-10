<div align="right">

# 📦 مشروع البحث في iTunes

مشروع للبحث في بودكاستات iTunes باستخدام Next.js و Express

</div>

---

<div align="right">

## ⚙️ الأدوات المستخدمة

</div>

<div align="right" dir="rtl">

**الواجهة الأمامية (Frontend):**
- ⚛️ React
- 🚀 Next.js
- 🎨 Tailwind CSS

**الواجهة الخلفية (Backend):**
- 🟢 Node.js
- 📡 Express
- 📊 Prisma

**قاعدة البيانات:**
- 🗄️ SQLite

</div>

---

<div align="right">

## 🚀 طريقة تشغيل المشروع

### Backend

</div>

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

<div align="right">

### Frontend

</div>

```bash
cd frontend
npm install
npm run dev
```

<div align="right">

الآن افتح المتصفح على [http://localhost:3000](http://localhost:3000)

### تصفح قاعدة البيانات

</div>

```bash
cd backend
npx prisma studio
```

---

<div align="right" dir="rtl">

## 📝 شرح المشروع

- REST API endpoint يستقبل كلمة البحث ويستخدم iTunes Search API
- تخزين النتائج في قاعدة بيانات SQLite
- عرض النتائج بواجهة عربية مع دعم RTL

</div>
