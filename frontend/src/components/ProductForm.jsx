import { useState, useEffect } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

function ProductForm({ onSubmit, editingProduct, onCancelEdit }) {
  const emptyForm = { name: "", category: "", price: "", quantity: "", minStock: "" };
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        category: editingProduct.category,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
        minStock: editingProduct.minStock,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingProduct]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (form.price === "" || Number(form.price) < 0) newErrors.price = "Price must be 0 or more";
    if (form.quantity === "" || Number(form.quantity) < 0) newErrors.quantity = "Quantity must be 0 or more";
    if (form.minStock === "" || Number(form.minStock) < 0) newErrors.minStock = "Min stock must be 0 or more";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      quantity: Number(form.quantity),
      minStock: Number(form.minStock),
    });
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{editingProduct ? "Update Product" : "Add Product"}</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} size="small" />
        <TextField label="Category" name="category" value={form.category} onChange={handleChange} error={!!errors.category} helperText={errors.category} size="small" />
        <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} error={!!errors.price} helperText={errors.price} size="small" />
        <TextField label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} error={!!errors.quantity} helperText={errors.quantity} size="small" />
        <TextField label="Min Stock" name="minStock" type="number" value={form.minStock} onChange={handleChange} error={!!errors.minStock} helperText={errors.minStock} size="small" />
        <Button type="submit" variant="contained">{editingProduct ? "Update" : "Add"}</Button>
        {editingProduct && <Button variant="outlined" onClick={onCancelEdit}>Cancel</Button>}
      </Box>
    </Paper>
  );
}

export default ProductForm;