import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {styled} from "@mui/system";
import {usePathname} from "next/navigation";
import Link from "next/link";

const CustomTab = styled(Tab)(({theme}) => ({
  minWidth: 100,
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}));

const ProfileNav = ({customerId}) => {
  const pathname = usePathname();

  const getTabValue = () => {
    const pathSegments = pathname.split("/");
    if (pathSegments.includes("profile")) {
      return 0;
    } else if (pathSegments.includes("orders")) {
      return 1;
    } else if (pathSegments.includes("invoice")) {
      return 2;
    } else if (pathSegments.includes("settings")) {
      return 3;
    } else {
      return 0;
    }
  };

  return (
    <Box mb={4}>
      <Tabs value={getTabValue()} aria-label="profile navigation">
        <CustomTab
          label="Profile"
          component={Link}
          href={`/delivery/customers/profile/${customerId}`}
        />
        {/* <CustomTab
          label="Orders"
          component={Link}
          href={`/delivery/customers/orders/${customerId}`}
        />
        <CustomTab
          label="Invoice"
          component={Link}
          href={`/delivery/customers/invoice/${customerId}`}
        />
        <CustomTab
          label="Settings"
          component={Link}
          href={`/delivery/customers/settings/${customerId}`}
        /> */}
      </Tabs>
      <Divider />
    </Box>
  );
};

export default ProfileNav;
