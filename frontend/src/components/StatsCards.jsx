import { Card, CardContent, Typography, Box } from "@mui/material";

function StatsCards({ products }) {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const lowStockCount = products.filter((p) => p.quantity <= p.minStock).length;

  const stats = [
    { label: "Total Products", value: totalProducts },
    { label: "Total Inventory Value", value: `₹${totalValue.toFixed(2)}` },
    { label: "Low Stock Items", value: lowStockCount },
  ];

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
      {stats.map((s) => (
        <Card key={s.label} elevation={3} sx={{ flex: "1 1 200px" }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">{s.label}</Typography>
            <Typography variant="h5">{s.value}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default StatsCards;