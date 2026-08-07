import React, { useRef } from "react";
import PageHeader from "../Components/common/PageHeader";
import Table from "../Components/common/Table";
import Button from "../Components/common/Button";
import Input from "../Components/common/Input";
import ProductForm from "../Components/ProductForm";
import { useProducts } from "../hooks/useProducts";
import { exportBackupJSON, importBackupJSON } from "../services/storageService";

const TABLE_HEADERS = [
  "id",
  "title",
  "price",
  "taxes",
  "ads",
  "discount",
  "category",
  "count",
  "total",
  "update",
  "delete",
];

function StoresPage() {
  const {
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
    setProducts,
  } = useProducts();

  const fileInputRef = useRef(null);

  const handleEditClick = (index) => {
    setMood("Update");
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      importBackupJSON(file, (importedData) => {
        setProducts(importedData);
      });
    }
  };

  return (
    <div className="crud">
      <PageHeader
        title="Stockify"
        subtitle="نظام إدارة المنتجات والمخازن بكل احترافية"
      />

      {/* أزرار استيراد وتصدير النسخ الاحتياطية */}
      <div
        className="backup-actions"
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={exportBackupJSON}>
          📥 تصدير نسخة احتياطية (JSON)
        </Button>

        <Button onClick={() => fileInputRef.current.click()}>
          📤 استرجاع نسخة احتياطية
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          style={{ display: "none" }}
        />
      </div>

      <ProductForm
        onSubmit={addOrUpdateProduct}
        mood={mood}
        editData={editIndex !== null ? products[editIndex] : null}
      />

      <div className="outputs" style={{ marginTop: "25px" }}>
        <div className="searchBlock">
          <Input
            id="search"
            placeholder={`Search By ${searchMode}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="btnSearch">
            <Button onClick={() => setSearchMode("title")}>
              Search By Title
            </Button>
            <Button onClick={() => setSearchMode("category")}>
              Search By Category
            </Button>
          </div>
        </div>

        {products.length > 0 && (
          <div id="deleteAll">
            <Button variant="danger" onClick={deleteAllProducts}>
              Delete All ({products.length})
            </Button>
          </div>
        )}

        <Table headers={TABLE_HEADERS}>
          {filteredProducts.map((prod, i) => (
            <tr key={prod.id || i}>
              <td>{i + 1}</td>
              <td>{prod.title}</td>
              <td>{prod.price}</td>
              <td>{prod.taxes}</td>
              <td>{prod.ads}</td>
              <td>{prod.discount}</td>
              <td>{prod.category}</td>
              <td>{prod.count}</td>
              <td>${prod.total}</td>
              <td>
                <Button onClick={() => handleEditClick(i)}>Update</Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => deleteProduct(i)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default StoresPage;
