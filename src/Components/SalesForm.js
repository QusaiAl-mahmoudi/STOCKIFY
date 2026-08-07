import React from "react";
import Input from "./common/Input";
import Button from "./common/Button";
import Alert from "./common/Alert";

function SalesForm({
  prodId,
  setProdId,
  selectedProduct,
  saleCount,
  setSaleCount,
  fetchProductData,
  addToCart,
  rowTotal,
  alert,
}) {
  return (
    <div
      className="inputs"
      style={{
        background: "var(--input-bg)",
        padding: "25px",
        borderRadius: "12px",
        border: "1px solid var(--table-border)",
        boxShadow: "0 4px 15px var(--shadow)",
      }}
    >
      <Alert message={alert.message} bg={alert.bg} />

      <div className="sales-grid">
        <Input
          type="number"
          id="prodId"
          placeholder="Enter Product ID"
          value={prodId}
          onChange={(e) => setProdId(e.target.value)}
          onBlur={fetchProductData}
        />
        <Input
          type="text"
          placeholder="Product Title"
          value={selectedProduct ? selectedProduct.title : ""}
          readOnly
        />
      </div>

      <div className="price-qty-grid">
        <Input
          type="text"
          placeholder="Original Price"
          value={selectedProduct ? selectedProduct.price : ""}
          readOnly
        />
        <Input
          type="text"
          placeholder="Discount"
          value={selectedProduct ? selectedProduct.discount : ""}
          readOnly
        />
        <Input
          type="number"
          placeholder="Qty to Sell"
          min="1"
          value={saleCount}
          onChange={(e) => setSaleCount(parseInt(e.target.value, 10) || 1)}
        />
      </div>

      <div
        className="action-row"
        style={{ display: "flex", gap: "10px", marginTop: "10px" }}
      >
        <Button onClick={addToCart} style={{ margin: 0, padding: "14px" }}>
          Add To Cart
        </Button>
        <small
          style={{
            background: "#040",
            color: "#fff",
            padding: "14px",
            minWidth: "100px",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          {rowTotal}
        </small>
      </div>
    </div>
  );
}

export default SalesForm;
