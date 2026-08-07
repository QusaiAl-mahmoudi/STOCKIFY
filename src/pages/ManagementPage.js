import React, { useMemo } from "react";
import PageHeader from "../Components/common/PageHeader";
import Table from "../Components/common/Table";
import Badge from "../Components/common/Badge";
import StatCard from "../Components/dashboard/StatCard";
import StockChart from "../Components/dashboard/StockChart";
import { storageService } from "../services/storageService";

const ALERT_TABLE_HEADERS = [
  "اسم المنتج",
  "التصنيف",
  "الكمية المتبقية",
  "حالة المخزون",
];

function ManagementPage() {
  const dataProducts = storageService.getProducts();

  const { totalStock, totalValue, criticalProducts } = useMemo(() => {
    let stockSum = 0;
    let valueSum = 0;
    const criticalList = [];

    dataProducts.forEach((product) => {
      const count = parseInt(product.count, 10) || 0;
      const price = parseFloat(product.price) || 0;

      stockSum += count;
      valueSum += count * price;

      if (count <= 5) {
        criticalList.push(product);
      }
    });

    return {
      totalStock: stockSum,
      totalValue: valueSum,
      criticalProducts: criticalList,
    };
  }, [dataProducts]);

  return (
    <div className="crud">
      <PageHeader
        title="Management Dashboard"
        subtitle="نسبة توزيع المنتجات الإجمالية داخل المخازن"
      />

      <div
        className="stats-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <StatCard
          title="إجمالي أنواع المنتجات"
          value={dataProducts.length}
          iconClass="fas fa-boxes"
        />
        <StatCard
          title="القطع المتوفرة بالمخزن"
          value={totalStock}
          iconClass="fas fa-dolly"
        />
        <StatCard
          title="القيمة المالية للمخزون"
          value={`$${totalValue.toFixed(2)}`}
          iconClass="fas fa-wallet"
        />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <StockChart products={dataProducts} totalStock={totalStock} />
      </div>

      <div className="alert-box mb-30">
        <h3
          style={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i
            className="fas fa-exclamation-triangle"
            style={{ color: "#eab308" }}
          ></i>
          نظام تنبيهات المخزون (نواقص وتحذيرات)
        </h3>

        <Table headers={ALERT_TABLE_HEADERS}>
          {criticalProducts.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  opacity: 0.8,
                  padding: "15px",
                  color: "#00e676",
                  textAlign: "center",
                }}
              >
                <i
                  className="fas fa-check-circle"
                  style={{ marginLeft: "5px" }}
                ></i>
                جميع مستويات المخزون ممتازة وآمنة!
              </td>
            </tr>
          ) : (
            criticalProducts.map((product, index) => {
              const count = parseInt(product.count, 10) || 0;
              const isOutOfStock = count === 0;

              return (
                <tr key={index}>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td className="font-bold">{count}</td>
                  <td>
                    <Badge
                      text={isOutOfStock ? "نفذت الكمية" : "كمية حرجة"}
                      type={isOutOfStock ? "danger" : "warning"}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </Table>
      </div>
    </div>
  );
}

export default ManagementPage;
