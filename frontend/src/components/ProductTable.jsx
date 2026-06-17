import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableSortLabel, IconButton, Chip, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "quantity", label: "Quantity" },
  { key: "minStock", label: "Min Stock" },
];

function ProductTable({ products, onEdit, onDelete }) {
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (typeof valA === "string") return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    return sortDir === "asc" ? valA - valB : valB - valA;
  });

  return (
    <>
      <TableContainer component={Paper} elevation={2}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <TableSortLabel active={sortKey === col.key} direction={sortKey === col.key ? sortDir : "asc"} onClick={() => handleSort(col.key)}>
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts.length === 0 && (
              <TableRow><TableCell colSpan={7} align="center"><Typography color="text.secondary">No products found</Typography></TableCell></TableRow>
            )}
            {sortedProducts.map((p) => {
              const isLowStock = p.quantity <= p.minStock;
              return (
                <TableRow key={p._id} sx={{ backgroundColor: isLowStock ? "#fdecea" : "inherit" }}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>₹{p.price}</TableCell>
                  <TableCell>{p.quantity}</TableCell>
                  <TableCell>{p.minStock}</TableCell>
                  <TableCell>{isLowStock && <Chip label="Low Stock" color="error" size="small" />}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => onEdit(p)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => setDeleteTarget(p)}><DeleteIcon fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>Are you sure you want to delete "{deleteTarget?.name}"?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => { onDelete(deleteTarget._id); setDeleteTarget(null); }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductTable;