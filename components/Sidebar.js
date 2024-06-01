import React, {useState} from "react";
import {styled, useTheme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import LocalShipping from "@mui/icons-material/LocalShipping";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import Inventory from "@mui/icons-material/Inventory";
import Build from "@mui/icons-material/Build";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Person from "@mui/icons-material/Person";

const Sidebar = ({
  handleDrawerOpen,
  drawerWidth,
  openedMixin,
  closedMixin,
  open,
  theme,
}) => {
  const [dropdowns, setDropdowns] = useState({});

  const handleDropdownClick = (name) => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [name]: !prevDropdowns[name],
    }));
  };

  const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const menuItems = [
    {
      text: "Procurement",
      icon: <DirectionsBoatIcon />,
      dropdown: true,
      options: [
        {name: "Suppliers", path: "/procurement/suppliers"},
        {name: "Purchase Orders", path: "/procurement/purchase"},
      ],
    },
    {
      text: "Inventory",
      icon: <Inventory />,
      dropdown: true,
      options: [
        {name: "Tinplate Suppliers", path: "/inventory/tinplate-suppliers"},
        {name: "Receipts", path: "/inventory/receipt-records"},
        {name: "Tinplate Coils", path: "/inventory/tinplate-coils"},
        {name: "Cutting", path: "/inventory/coil-cutting"},
        {name: "Consumption", path: "/inventory/tinplate-consumption"},
        {name: "Coil Usage", path: "/inventory/coil-consumption"},
      ],
    },
    {
      text: "Production",
      icon: <Build />,
      dropdown: true,
      options: [
        {name: "Job Orders", path: "/production/job-orders"},
        {name: "Customers", path: "/production/job-order-customers"},
        {name: "Products", path: "/production/job-order-products"},
        {name: "Classification", path: "/production/product-classification"},
        {name: "Prod-Customers", path: "/production/product-customers"},
        {name: "Prod Details", path: "/production/product-details"},
        {name: "Salesmen", path: "/production/product-salesmen"},
        {name: "Inventory Org", path: "/production/inventory-organization"},
      ],
    },
    {
      text: "Quality",
      icon: <CheckCircle />,
      dropdown: true,
      options: [
        {
          name: "Specifications",
          path: "/quality-control/product-specifications",
        },
        {name: "Spec Details", path: "/quality-control/specification-details"},
        {name: "Rejected Items", path: "/quality-control/rejected-items"},
        {name: "Logs", path: "/quality-control/quality-logs"},
      ],
    },
    {
      text: "Sales & Delivery",
      icon: <LocalShipping />,
      dropdown: true,
      options: [
        {name: "Customers", path: "/sales/customer-information"},
        {name: "Invoices", path: "/sales/invoices"},
        {name: "Deliveries", path: "/sales/delivery-details"},
      ],
    },
    {
      text: "Users",
      icon: <Person />,
      dropdown: true,
      options: [{name: "Manage", path: "/user-management/users"}],
    },
    {
      text: "Reference",
      icon: "",
      dropdown: true,
      options: [
        {name: "Customer Profile", path: "/delivery/customer"},
        {name: "Deliver Receipt", path: "/delivery/receipt"},
        {name: "Job Order", path: "/delivery/job-order"},
      ],
    },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            flexGrow: 1,
            padding: "6px",
          }}
        >
          {open && "QCCIMS"}
        </Typography>
        <IconButton onClick={handleDrawerOpen}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List aria-labelledby="nested-list-subheader">
        {menuItems.map((item) => (
          <div key={item.text} style={{width: "100%"}}>
            <ListItem disablePadding sx={{display: "block", width: "100%"}}>
              {item.dropdown ? (
                <ListItemButton
                  onClick={() => handleDropdownClick(item.text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    width: "100%",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{opacity: open ? 1 : 0}}
                  />
                  {item.dropdown &&
                    (open ? (
                      dropdowns[item.text] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : null)}
                </ListItemButton>
              ) : (
                <Link href={item.path} passHref>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      width: "100%",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{opacity: open ? 1 : 0}}
                    />
                  </ListItemButton>
                </Link>
              )}
              {item.dropdown && (
                <Collapse
                  in={dropdowns[item.text]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding sx={{width: "100%"}}>
                    {item.options.map((option, index) => (
                      <Link
                        href={option.path}
                        component={NextLink}
                        color="inherit"
                        variant="body2"
                        key={index}
                        style={{textDecoration: "none"}}
                        passHref
                      >
                        <ListItemButton sx={{pl: 8, width: "100%"}}>
                          <ListItemText
                            primary={<Typography>{option.name}</Typography>}
                          />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              )}
            </ListItem>
          </div>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
