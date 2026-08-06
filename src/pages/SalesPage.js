import React from "react";
import PageHeader from "../Components/PageHeader";
import Table from "../Components/Table";
import Button from "../Components/Button";
import SalesForm from "../Components/SalesForm";
import { useSales } from "../hooks/userSales";

const CART_HEADERS = [
  "ID",
  "Title",
  "Price",
  "Discount",
  "Qty",
  "Total",
  "Action",
];

function SalesPage() {
  const {
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
  } = useSales();

  return (
    <div className="crud">
      <PageHeader
        title="Sales Invoice"
        subtitle="إدخال المنتجات بالـ ID، إضافتها للسلة، ثم الخصم المباشر من المخازن"
      />

      <SalesForm
        prodId={prodId}
        setProdId={setProdId}
        selectedProduct={selectedProduct}
        saleCount={saleCount}
        setSaleCount={setSaleCount}
        fetchProductData={fetchProductData}
        addToCart={addToCart}
        rowTotal={rowTotal}
        alert={alert}
      />

      <div className="outputs" style={{ marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h3 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            Shopping Cart (السلة الحالية)
          </h3>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span
              style={{
                background: "var(--primary-color)",
                color: "white",
                padding: "8px 15px",
                whiteSpace: "nowrap",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Total: ${cartGrandTotal}
            </span>
            <Button
              onClick={processCheckout}
              style={{
                width: "auto",
                padding: "10px 20px",
                background: "#040",
                whiteSpace: "nowrap",
              }}
            >
              Confirm & Checkout (بيع)
            </Button>
          </div>
        </div>

        <Table headers={CART_HEADERS}>
          {cart.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{ opacity: 0.6, padding: "20px", textAlign: "center" }}
              >
                Cart is empty. Enter Product ID above to start.
              </td>
            </tr>
          ) : (
            cart.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.discount}</td>
                <td>{item.qty}</td>
                <td>${item.total}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(i)}
                    style={{ padding: "5px 10px" }}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          )}
        </Table>
      </div>
    </div>
  );
}

export default SalesPage;
