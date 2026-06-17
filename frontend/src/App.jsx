import { useState, useEffect } from "react";
import { Container, Typography, Snackbar, Alert, CircularProgress, Box } from "@mui/material";
import StatsCards from "./components/StatsCards";
import FilterBar from "./components/FilterBar";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";

const API = "http://localhost:5000/products";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showSnackbar = (message, severity = "success") => setSnackbar({ open: true, message, severity });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = lowStockOnly ? `${API}/low-stock` : API;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      setProducts(await res.json());
    } catch (err) {
      showSnackbar(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [lowStockOnly]);

  const handleAddOrUpdate = async (data) => {
    try {
      const url = editingProduct ? `${API}/${editingProduct._id}` : API;
      const method = editingProduct ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Failed to save product");
      showSnackbar(editingProduct ? "Product updated" : "Product added");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      showSnackbar(err.message, "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      showSnackbar("Product deleted");
      fetchProducts();
    } catch (err) {
      showSnackbar(err.message, "error");
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Inventory Management System</Typography>
      <StatsCards products={products} />
      <ProductForm onSubmit={handleAddOrUpdate} editingProduct={editingProduct} onCancelEdit={() => setEditingProduct(null)} />
      <FilterBar search={search} setSearch={setSearch} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} categories={categories} lowStockOnly={lowStockOnly} onToggleLowStock={() => setLowStockOnly(!lowStockOnly)} />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}><CircularProgress /></Box>
      ) : (
        <ProductTable products={filteredProducts} onEdit={setEditingProduct} onDelete={handleDelete} />
      )}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default App;