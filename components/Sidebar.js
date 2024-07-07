"use client";
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
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";
import PrecisionManufacturingTwoToneIcon from "@mui/icons-material/PrecisionManufacturingTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import RectangleTwoToneIcon from "@mui/icons-material/RectangleTwoTone";
import GroupAddTwoToneIcon from "@mui/icons-material/GroupAddTwoTone";
import {usePathname} from "next/navigation";

const Sidebar = ({
  handleDrawerOpen,
  drawerWidth,
  openedMixin,
  closedMixin,
  open,
  theme,
}) => {
  const [dropdowns, setDropdowns] = useState({});
  const currentPath = usePathname();

  const getBorderStyle = (path) => {
    const isActive = currentPath === path || currentPath.startsWith(`${path}/`);
    return `2px solid ${isActive ? "gray" : "#E8E8E8"}`;
  };

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
      text: "Dashboard",
      icon: <DashboardTwoToneIcon color="primary" />,
      path: "/dashboard",
    },
    {
      text: "Delivery",
      icon: <LocalShippingTwoToneIcon color="primary" />,
      dropdown: true,
      options: [
        {name: "Customer Profile", path: "/delivery/customers"},
        {name: "Job Order", path: "/delivery/job-orders/new"},
      ],
    },
    {
      text: "Purchasing",
      icon: <ShoppingBasketTwoToneIcon color="primary" />,
      dropdown: true,
      options: [
        {name: "Supplier", path: "/purchasing/suppliers"},
        {name: "Purchase Orders", path: "/purchasing/purchase"},
        {name: "P.O. Receiving", path: "/purchasing/items"},
      ],
    },
    {
      text: "Quality Control",
      icon: <CheckCircleTwoToneIcon color="primary" />,
      dropdown: true,
      options: [
        {name: "Product Entry", path: "/quality/products"},
        {name: "Tin Can Specifications", path: "/quality/specifications"},
      ],
    },
    {
      text: "Production",
      icon: <PrecisionManufacturingTwoToneIcon color="primary" />,
      dropdown: true,
      options: [{name: "Job Order Printing", path: "/production/job-orders"}],
    },
    // {
    //   text: "Tinplates",
    //   icon: <RectangleTwoToneIcon color="primary" />,
    //   dropdown: true,
    //   options: [
    //     {name: "Skid Information", path: "/tinplate/skid"},
    //     {name: "TPI Form", path: "/tinplate/tpi"},
    //     {name: "Coil Whole", path: "/tinplate/coil"},
    //     {name: "Coil Cut", path: "/tinplate/cut-from-coil"},
    //     {name: "Coil Consumed", path: "/tinplate/cut-consumed"},
    //     {name: "Rectangular Sheet", path: "/tinplate/rectangular-sheet"},
    //     {name: "Rectangular Consumed", path: "/tinplate/rectangular-Consumed"},
    //   ],
    // },
    // {
    //   text: "Rack Inventory",
    //   icon: <DashboardTwoToneIcon color="primary" />,
    //   path: "/rack",
    // },
    {
      text: "Users",
      icon: <DashboardTwoToneIcon color="primary" />,
      path: "/users",
    },
  ];

  const logOut = [
    {
      text: "Logout",
      icon: <LogoutTwoToneIcon color="primary" />,
      path: "/rack",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          boxShadow: "0px 4px 20px rgb(0 0 0 / 7%)",
          borderRight: "0",
        },
      }}
    >
      <DrawerHeader sx={{backgroundColor: "#3D619B"}}>
        <Typography
          sx={{
            fontWeight: "bold",
            flexGrow: 1,
            padding: "6px",
            color: "#fff",
          }}
          variant="h5"
        >
          {open && "QCCIMS"}
        </Typography>
        <IconButton onClick={handleDrawerOpen}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon sx={{color: "#fff"}} />
          ) : (
            <ChevronLeftIcon sx={{color: "#fff"}} />
          )}
        </IconButton>
      </DrawerHeader>
      <List aria-labelledby="nested-list-subheader" sx={{height: "100vh"}}>
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
                <Link
                  href={item.path}
                  passHref
                  component={NextLink}
                  sx={{textDecoration: "none"}}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      textDecoration: "none",
                      width: "100%",
                      backgroundColor:
                        currentPath === item.path
                          ? "rgba(0, 0, 0, 0.08)"
                          : "inherit", // Highlight active item
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
                        sx={{fontSize: ".9rem", textDecoration: "none"}}
                      >
                        <ListItemButton
                          sx={{
                            ml: 3,
                            width: "100%",
                            borderLeft: getBorderStyle(option.path),
                            transition: "border-left-color 0.3s ease",
                          }}
                        >
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

        {/* {logOut.map((item) => (
          <div
            key={item.text}
            style={{width: "100%", position: "absolute", bottom: 0}}
          >
            <ListItem disablePadding sx={{display: "block", width: "100%"}}>
              <ListItemButton
                onClick={() => handleDropdownClick(item.text)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  width: "100%",
                  marginTop: "auto",
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
            </ListItem>
          </div>
        ))} */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
