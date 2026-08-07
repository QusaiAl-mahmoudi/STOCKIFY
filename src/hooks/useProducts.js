import { useState, useEffect, useMemo } from "react";
import { storageService } from "../services/storageService";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [mood, setMood] = useState("Create");
  const [editIndex, setEditIndex] = useState(null);
  const [searchMode, setSearchMode] = useState("title");
  const [searchValue, setSearchValue] = useState("");

  // تحميل البيانات عند بدء التشغيل
  useEffect(() => {
    const initialProducts = storageService.getStoredProducts();
    setProducts(initialProducts);
  }, []);

  // إضافة أو تحديث منتج (بدون تكرار العنصر)
  const addOrUpdateProduct = (productData) => {
    let updatedProducts = [...products];

    if (mood === "Create") {
      const newProduct = {
        ...productData,
        id: Date.now(),
        count: parseInt(productData.count, 10) || 1,
      };
      updatedProducts.push(newProduct);
    } else {
      updatedProducts[editIndex] = {
        ...productData,
        count: parseInt(productData.count, 10) || 1,
      };
      setMood("Create");
      setEditIndex(null);
    }

    setProducts(updatedProducts);
    storageService.saveProducts(updatedProducts);
  };

  // حذف منتج فردي
  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    storageService.saveProducts(updatedProducts);
  };

  // حذف كافة المنتجات
  const deleteAllProducts = () => {
    if (window.confirm("هل أنت تأكد من رغبتك في حذف جميع المنتجات؟")) {
      setProducts([]);
      storageService.saveProducts([]);
    }
  };

  // تصفية المنتجات للبحث
  const filteredProducts = useMemo(() => {
    if (!searchValue.trim()) return products;
    return products.filter((product) => {
      const targetField = product[searchMode]?.toString().toLowerCase() || "";
      return targetField.includes(searchValue.toLowerCase());
    });
  }, [products, searchMode, searchValue]);

  return {
    products,
    filteredProducts,
    mood,
    editIndex,
    searchMode,
    searchValue,
    setSearchMode,
    setSearchValue,
    setMood,
    setEditIndex,
    setProducts,
    addOrUpdateProduct,
    deleteProduct,
    deleteAllProducts,
  };
}
