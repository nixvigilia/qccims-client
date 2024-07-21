import Box from "@mui/material/Box";

export default function RectangularSheetLayout({ children }) {
  return (
    <Box p={4} mt={4}>
      {children}
    </Box>
  );
}
