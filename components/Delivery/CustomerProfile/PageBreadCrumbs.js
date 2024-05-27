"use client";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function PageBreadCrumbs() {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
      sx={{display: "flex", alignItems: "center"}}
    >
      <LocalShippingIcon fontSize="small" sx={{marginRight: 0.5}} />
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/delivery/customer"
      onClick={handleClick}
      sx={{fontSize: "0.9rem"}}
    >
      Customers
    </Link>,
    <Typography key="3" color="primary" sx={{fontSize: "0.9rem"}}>
      All
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
