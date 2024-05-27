"use client";

import useSWR from "swr";
import {useState} from "react";
import {getCustomerInfoById} from "@/lib/actions/data/getData";
import CustomerProfileForm from "@/components/Delivery/CustomerProfile/Forms/CustomerProfileForm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";
import CustomerDetails from "@/components/Delivery/CustomerProfile/CustomerDetails";
import ProfileNav from "@/components/Delivery/CustomerProfile/ProfileNav";
import {styled, alpha} from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NextLink from "next/link";
import Link from "@mui/material/Link";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({theme}) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function Page({params}) {
  const {id} = params;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const fetcher = (url) => getCustomerInfoById(url);
  const {data, error} = useSWR(id ? `/api/customer/${id}` : null, fetcher);

  console.log(data);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Box p={4} mt={4}>
      <PageBreadCrumbs />
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        mt={4}
        mb={4}
      >
        <Grid item>
          <Typography variant="h4" fontWeight="bold" component="div">
            Company Profile
          </Typography>
        </Grid>
        <Grid item>
          <div>
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Options
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <Link
                href={`/delivery/customer/edit/${id}`}
                component={NextLink}
                color="inherit"
                variant="body2"
                style={{textDecoration: "none"}}
                passHref
              >
                <MenuItem disableRipple>
                  <EditIcon />
                  Edit
                </MenuItem>
              </Link>
              <Divider />
              <MenuItem disableRipple>
                <BlockIcon />
                Deactivate
              </MenuItem>
            </StyledMenu>
          </div>
        </Grid>
      </Grid>

      <ProfileNav customerId={data?.id} />
      <CustomerDetails data={data} />

      {/* <CustomerProfileForm initialData={data} isUpdate /> */}
    </Box>
  );
}
