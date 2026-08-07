import React, { useState, useEffect } from "react";
import Input from "./common/Input";
import Button from "./common/Button";

const initialForm = {
  title: "",
  price: "",
  taxes: "",
  ads: "",
  discount: "",
  count: "",
  category: "",
};

function ProductForm({ onSubmit, mood, editData }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (mood === "Update" && editData) {
      setFormData(editData);
    } else {
      setFormData(initialForm);
    }
  }, [mood, editData]);

  const calculateTotal = () => {
    const { price, taxes, ads, discount } = formData;
    if (price && price !== "") {
      return (+price + +taxes + +ads - +discount).toFixed(2);
    }
    return "";
  };

  const total = calculateTotal();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!formData.title || !formData.price || !formData.category) return;

    onSubmit({
      ...formData,
      title: formData.title.toLowerCase(),
      category: formData.category.toLowerCase(),
      taxes: formData.taxes || "0",
      ads: formData.ads || "0",
      discount: formData.discount || "0",
      count: formData.count || "1",
      total,
    });

    setFormData(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="inputs">
      <Input
        id="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />

      <div className="price">
        <Input
          type="number"
          id="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <Input
          type="number"
          id="taxes"
          placeholder="Taxes"
          value={formData.taxes}
          onChange={handleChange}
        />
        <Input
          type="number"
          id="ads"
          placeholder="Ads"
          value={formData.ads}
          onChange={handleChange}
        />
        <Input
          type="number"
          id="discount"
          placeholder="Discount"
          value={formData.discount}
          onChange={handleChange}
        />
        <small id="total" style={{ background: total ? "#040" : "#9b0101" }}>
          {total}
        </small>
      </div>

      {mood === "Create" && (
        <Input
          type="number"
          id="count"
          placeholder="Count"
          value={formData.count}
          onChange={handleChange}
        />
      )}

      <Input
        id="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <Button type="submit" id="submit">
        {mood}
      </Button>
    </form>
  );
}

export default ProductForm;
