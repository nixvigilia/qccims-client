"use client";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Stack from "@mui/material/Stack";
import {usePathname} from "next/navigation";

const MAX_LENGTH = 50;

function capitalizeFirstLetter(string) {
  return string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}

export default function PageBreadCrumbs({lastPathName}) {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  const breadcrumbs = [
    ...pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;
      const text = capitalizeFirstLetter(value).replace(/[^\w\s]/gi, " ");

      if (index === 0 && text.toLowerCase() !== "dashboard") {
        return (
          <Typography key={to} color="inherit" sx={{fontSize: "0.9rem"}}>
            {text}
          </Typography>
        );
      }

      if (value.toLowerCase() === "edit" || value.toLowerCase() === "item") {
        return (
          <Typography key={to} color="inherit" sx={{fontSize: "0.9rem"}}>
            {text}
          </Typography>
        );
      }

      return isLast ? (
        <Typography key={to} color="default" sx={{fontSize: "0.9rem"}}>
          {lastPathName ? truncateString(lastPathName, MAX_LENGTH) : text}
        </Typography>
      ) : (
        <Link
          underline="hover"
          key={to}
          color="primary"
          component={NextLink}
          href={to}
          sx={{fontSize: "0.9rem"}}
        >
          {text}
        </Link>
      );
    }),
  ];

  return (
    <Stack>
      <Breadcrumbs separator="•" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
