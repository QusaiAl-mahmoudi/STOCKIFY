import { useState, useEffect } from "react";

export function useProducts() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved && saved !== "undefined" ? JSON.parse(saved) : [];
  });

  const [mood, setMood] = useState("Create");
  const [editIndex, setEditIndex] = useState(null);
  const [searchMode, setSearchMode] = useState("title");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addOrUpdateProduct = (productData) => {
    if (mood === "Create") {
      // التعامل مع إضافة المنتج بناءً على العدد (count)
      const countNum = parseInt(productData.count, 10) || 1;
      const newItems = Array.from({ length: countNum }, () => productData);
      setProducts((prev) => [...prev, ...newItems]);
    } else {
      const updated = [...products];
      updated[editIndex] = productData;
      setProducts(updated);
      setMood("Create");
      setEditIndex(null);
    }
  };

  const deleteProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteAllProducts = () => {
    setProducts([]);
    localStorage.removeItem("products");
  };

  const filteredProducts = products.filter((prod) => {
    const term = searchValue.toLowerCase();
    return searchMode === "title"
      ? prod.title.includes(term)
      : prod.category.includes(term);
  });

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
    addOrUpdateProduct,
    deleteProduct,
    deleteAllProducts,
  };
}
