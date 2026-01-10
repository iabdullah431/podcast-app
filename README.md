# 📦 مشروع البحث في iTunes

مشروع للبحث في بودكاستات iTunes باستخدام Next.js و Express

## ⚙️ الأدوات المستخدمة

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

## 🚀 طريقة تشغيل المشروع

### Backend

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

الآن افتح المتصفح على [http://localhost:3000](http://localhost:3000)

### تصفح قاعدة البيانات

```bash
cd backend
npx prisma studio
```

## 📝 شرح المشروع

- REST API endpoint يستقبل كلمة البحث ويستخدم iTunes Search API
- تخزين النتائج في قاعدة بيانات SQLite
- عرض النتائج بواجهة عربية مع دعم RTL
