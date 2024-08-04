import Button from "@mui/material/Button";

export default function PrintButton({onClick}) {
  return (
    <Button variant="contained" onClick={onClick}>
      Print
    </Button>
  );
}
