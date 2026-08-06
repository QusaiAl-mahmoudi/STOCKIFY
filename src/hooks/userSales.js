import { useState } from "react";

export function useSales() {
  const [dataProducts, setDataProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState([]);
  const [prodId, setProdId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [saleCount, setSaleCount] = useState(1);
  const [alert, setAlert] = useState({ message: "", bg: "" });

  const showAlert = (message, bg) => {
    setAlert({ message, bg });
    setTimeout(() => setAlert({ message: "", bg: "" }), 4000);
  };

  const fetchProductData = () => {
    const idValue = parseInt(prodId, 10);
    const index = idValue - 1;

    if (!idValue || index < 0 || index >= dataProducts.length) {
      showAlert("Product ID not found in inventory!", "#ef4444");
      clearForm();
      return;
    }

    const product = dataProducts[index];

    if (parseInt(product.count, 10) <= 0) {
      showAlert("This product is currently out of stock!", "orange");
      clearForm();
      return;
    }

    setSelectedProduct({ ...product, index });
    setSaleCount(1);
  };

  const clearForm = () => {
    setProdId("");
    setSelectedProduct(null);
    setSaleCount(1);
  };

  const addToCart = () => {
    if (!selectedProduct) {
      showAlert("Please enter a valid Product ID first!", "#ef4444");
      return;
    }

    const qty = parseInt(saleCount, 10);
    if (!qty || qty <= 0) {
      showAlert("Quantity must be greater than 0!", "#ef4444");
      return;
    }

    const maxStock = parseInt(selectedProduct.count, 10);
    if (qty > maxStock) {
      showAlert(
        `Insufficient stock! Only ${maxStock} items available.`,
        "#ef4444",
      );
      return;
    }

    const existingIndex = cart.findIndex(
      (item) => item.index === selectedProduct.index,
    );
    if (existingIndex > -1) {
      const existingItem = cart[existingIndex];
      if (existingItem.qty + qty > maxStock) {
        showAlert(
          `Total in cart exceeds available stock (${maxStock}).`,
          "#ef4444",
        );
        return;
      }

      const updatedCart = [...cart];
      updatedCart[existingIndex].qty += qty;
      updatedCart[existingIndex].total = (
        parseFloat(selectedProduct.total) * updatedCart[existingIndex].qty
      ).toFixed(2);
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          id: parseInt(prodId, 10),
          index: selectedProduct.index,
          title: selectedProduct.title,
          price: selectedProduct.price,
          discount: selectedProduct.discount,
          qty,
          total: (parseFloat(selectedProduct.total) * qty).toFixed(2),
        },
      ]);
    }

    showAlert("Added to cart successfully", "#10b981");
    clearForm();
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const processCheckout = () => {
    if (cart.length === 0) {
      showAlert("Cart is empty! Add products before checkout.", "#ef4444");
      return;
    }

    const updatedProducts = [...dataProducts];
    cart.forEach((item) => {
      updatedProducts[item.index].count =
        parseInt(updatedProducts[item.index].count, 10) - item.qty;
    });

    setDataProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setCart([]);
    showAlert("Sale completed successfully! Stock updated.", "#10b981");
  };

  const rowTotal = selectedProduct
    ? (parseFloat(selectedProduct.total) * saleCount).toFixed(2)
    : "0.00";

  const cartGrandTotal = cart
    .reduce((acc, item) => acc + parseFloat(item.total), 0)
    .toFixed(2);

  return {
    prodId,
    setProdId,
    selectedProduct,
    saleCount,
    setSaleCount,
    cart,
    alert,
    rowTotal,
    cartGrandTotal,
    fetchProductData,
    addToCart,
    removeFromCart,
    processCheckout,
  };
}
