const STORAGE_KEY = "stockify_products";

// 1. جلب البيانات
export const getStoredProducts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("خطأ في قراءة البيانات:", error);
    return [];
  }
};

// 2. حفظ البيانات
export const saveProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("خطأ في حفظ البيانات:", error);
  }
};

// 3. تصدير نسخة احتياطية JSON
export const exportBackupJSON = () => {
  const products = getStoredProducts();
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(products, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute(
    "download",
    `stockify_backup_${new Date().toISOString().slice(0, 10)}.json`,
  );
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

// 4. استيراد نسخة احتياطية JSON
export const importBackupJSON = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const importedData = JSON.parse(event.target.result);
      if (Array.isArray(importedData)) {
        saveProducts(importedData);
        callback(importedData);
        alert("تم استرجاع النسخة الاحتياطية بنجاح!");
      } else {
        alert("ملف الـ JSON غير صالح!");
      }
    } catch (error) {
      alert("حدث خطأ أثناء قراءة الملف!");
    }
  };
  reader.readAsText(file);
};

// كائن الخدمات الشامل ليدعم useSales و useProducts معاً
export const storageService = {
  getStoredProducts,
  getProducts: getStoredProducts, // تفادي خطأ useSales
  saveProducts,
  exportBackupJSON,
  importBackupJSON,
};

export default storageService;
