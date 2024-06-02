import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {styled} from "@mui/system";
import {useSearchParams} from "next/navigation";
import Link from "next/link";

const CustomTab = styled(Tab)(({theme}) => ({
  minWidth: 100,
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}));

const HorizontalNav = ({totalCount, pendingCount, receivedCount}) => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const getTabValue = () => {
    if (status === "pending") {
      return 1;
    } else if (status === "received") {
      return 2;
    } else {
      return 0;
    }
  };

  return (
    <Box mb={4}>
      <Tabs value={getTabValue()} aria-label="profile navigation">
        <CustomTab
          label="all"
          component={Link}
          href={`items`}
          iconPosition="end"
        />
        <CustomTab
          label="Pending"
          component={Link}
          href={`items?count=${pendingCount}&status=pending`}
        />
        <CustomTab
          label="Received"
          component={Link}
          href={`items?count=${receivedCount}&status=received`}
        />
      </Tabs>
      <Divider />
    </Box>
  );
};

export default HorizontalNav;
