<div dir="rtl">

# STOCKIFY 📦

تطبيق React متكامل لإدارة المخازن والمبيعات (SPA)، يتيح متابعة المخزون، تنفيذ الفواتير، تحليل البيانات الإحصائية، وإدارة النسخ الاحتياطية.

---

## ✨ المميزات الرئيسية

- **إدارة المخازن (CRUD):** إضافة، تعديل، وحذف المنتجات مع احتساب الضرائب والإعلانات والخصومات تلقائياً.
- **البحث والتصفية اللحظية:** إمكانية البحث والتصفية المباشرة للمنتجات حسب Title أو Category.
- **النسخ الاحتياطي (JSON Backup):** تصدير بيانات المخزن كملف JSON واكتشاف/استرجاع النسخ السابقة بضغطة زر.
- **الحفظ التلقائي:** ربط وتحديث المبيعات والمنتجات فورياً عبر LocalStorage.
- **كاونتر المبيعات والسلة:** إضافة المنتجات بالـ ID مع خصم الكميات تلقائياً من المخزون.
- **لوحة التحليلات الإحصائية:** عرض قيم المخزون، تنبيهات بالنواقص، ورسم بياني لتوزيع المنتجات.
- **دعم الوضع الداكن:** إمكانية التبديل بين Light/Dark Mode مع حفظ التفضيل محلياً.

---

## 🛠️ التقنيات المستخدمة

`React` | `Context API` | `Custom Hooks` | `Chart.js` | `CSS Variables`

---

## 📂 هيكلية المشروع (Project Structure)

<div dir="ltr">

```text
src/
├── assets/
│   ├── images/
│   └── icons/
├── components/
│   ├── common/
│   │   ├── Alert.jsx
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Icon.jsx
│   │   ├── Input.jsx
│   │   ├── Navbar.jsx
│   │   ├── PageHeader.jsx
│   │   ├── StateItem.jsx
│   │   └── Table.jsx
│   ├── dashboard/
│   │   ├── StatCard.jsx
│   │   └── StockChart.jsx
│   ├── ProductForm.jsx
│   └── SalesForm.jsx
├── context/
│   ├── StockContext.jsx
│   └── ThemeContext.jsx
├── data/
│   ├── products.json
│   └── sales.json
├── hooks/
│   ├── useLocalStorage.js
│   ├── useProducts.js
│   └── useSales.js
├── pages/
│   ├── HomePage.jsx
│   ├── ManagementPage.jsx
│   ├── SalesPage.jsx
│   └── StoresPage.jsx
├── services/
│   └── storageService.js
├── styles/
│   └── main.css
├── App.jsx
└── main.jsx
```


##🚀 التشغيل المحلي
استنساخ المستودع والدخول للمجلد:
```
git clone [https://github.com/QusaiAl-mahmoudi/STOCKIFY.git](https://github.com/YOUR_USERNAME/STOCKIFY.git)
cd STOCKIFY
```
تثبيت الحزم والمكتبات:

```
Bash
npm install
```
تشغيل التطبيق:
```
Bash
npm start
```
