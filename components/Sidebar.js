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
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";
import PrecisionManufacturingTwoToneIcon from "@mui/icons-material/PrecisionManufacturingTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import GroupAddTwoToneIcon from "@mui/icons-material/GroupAddTwoTone";

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
      text: "Delivery",
      icon: <LocalShippingTwoToneIcon />,
      dropdown: true,
      options: [
        {name: "Customer Profile", path: "/delivery/customers"},
        // {name: "Delivery Receipt", path: "/delivery/receipt"},
        {name: "Job Orders", path: "/delivery/job-orders"},
      ],
    },
    {
      text: "Purchasing",
      icon: <ShoppingBasketTwoToneIcon />,
      dropdown: true,
      options: [
        {name: "Supplier", path: "/purchasing/suppliers"},
        {name: "Purchase Orders", path: "/purchasing/purchase"},
        {name: "P.O. Receiving", path: "/purchasing/items"},
      ],
    },

    {
      text: "Production",
      icon: <PrecisionManufacturingTwoToneIcon />,
      dropdown: true,
      options: [
        {name: "Job Orders", path: "/production/job-orders"},
        {name: "Components", path: "/production/components"},
        {name: "Formed Cans", path: "/production/job-order-products"},
        {name: "Classification", path: "/production/product-classification"},
        {name: "Monitoring", path: "/production/product-customers"},
        {name: "Lithography", path: "/production/product-details"},
        {name: "Inventory Status", path: "/production/product-salesmen"},
      ],
    },
    {
      text: "Quality",
      icon: <CheckCircleTwoToneIcon />,
      dropdown: true,
      options: [
        {
          name: "Tin Can Specification",
          path: "/quality/tin-can-specification",
        },
      ],
    },
    {
      text: "Invoice",
      icon: <DescriptionTwoToneIcon />,
      dropdown: true,
      options: [
        {name: "Invoice Entry", path: "/sales/customer-information"},
        {name: "Statement", path: "/sales/invoices"},
      ],
    },
    {
      text: "Users",
      icon: <GroupAddTwoToneIcon />,
      dropdown: true,
      options: [{name: "Manage", path: "/user-management/users"}],
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
