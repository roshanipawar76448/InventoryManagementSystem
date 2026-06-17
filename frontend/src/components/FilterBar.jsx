import { Box, TextField, MenuItem, Select, ToggleButton } from "@mui/material";

function FilterBar({ search, setSearch, categoryFilter, setCategoryFilter, categories, lowStockOnly, onToggleLowStock }) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
      <TextField label="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} size="small" />
      <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} size="small" displayEmpty sx={{ minWidth: 160 }}>
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
      </Select>
      <ToggleButton value="lowStock" selected={lowStockOnly} onChange={onToggleLowStock} size="small" color="error">
        {lowStockOnly ? "Showing Low Stock Only" : "Show Low Stock Only"}
      </ToggleButton>
    </Box>
  );
}

export default FilterBar;