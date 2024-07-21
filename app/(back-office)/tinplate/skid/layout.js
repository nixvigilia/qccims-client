import Box from "@mui/material/Box";

export default function SkidLayout({ children }) {
  return (
    <Box p={4} mt={4}>
      {children}
    </Box>
  );
}
