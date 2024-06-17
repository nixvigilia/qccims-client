"use client"
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import PrecisionManufacturingTwoToneIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';
import PollTwoToneIcon from '@mui/icons-material/PollTwoTone';
const ShadowBox = styled(Box)({
  boxShadow: '0px 4px 20px rgb(0 0 0 / 7%)',
  padding: '2rem'
});
const BackgroundBox = styled(Box)({
  backgroundColor: '#c4cfe1',
  padding: '0.2rem',
  display: 'flex'
});
const Page = () => {
  return (
    <Box p={4} mt={4}>
      <PageBreadCrumbs />
      <Grid container spacing={2} mt={2}>
        <Grid item xs={8} >
          <ShadowBox>
            <Typography variant="h4">Welcome, user.</Typography>
            <p>Having trouble with navigating? Read the manual here.</p>
          </ShadowBox>
        </Grid>
        <Grid item xs={4}>
          <ShadowBox>
            <Typography variant="h4">Welcome, user.</Typography>
            <p>Having trouble with navigating? Read the manual here.</p>
          </ShadowBox>
        </Grid>
        <Grid item xs={4}>
          <ShadowBox>
            <Typography variant="h7" color="primary" sx={{ textTransform: 'uppercase', fontWeight: '600', display: 'flex', alignItems: 'center', gap: 2 }}>
              <BackgroundBox>
                <PrecisionManufacturingTwoToneIcon color="primary" />
              </BackgroundBox> Total Tinplates in Production
            </Typography>
            <Typography sx={{ fontSize: '4rem', fontWeight: '600' }}>20</Typography>
          </ShadowBox>
        </Grid>
        <Grid item xs={4}>
          <ShadowBox>
            <Typography variant="h7" color="primary" sx={{ textTransform: 'uppercase', fontWeight: '600', display: 'flex', alignItems: 'center', gap: 2 }}>
              <BackgroundBox>
                <PollTwoToneIcon color="primary" />
              </BackgroundBox> Total Rack(s) Available
            </Typography>
            <Typography sx={{ fontSize: '4rem', fontWeight: '600' }}>20</Typography>
          </ShadowBox>
        </Grid>
        <Grid item xs={4}>
          <ShadowBox>
            <Typography variant="h7" color="primary" sx={{ textTransform: 'uppercase', fontWeight: '600', display: 'flex', alignItems: 'center', gap: 2 }}>
              <BackgroundBox>
                <PollTwoToneIcon color="primary" />
              </BackgroundBox> Total Rack(s) Available
            </Typography>
            <Typography sx={{ fontSize: '4rem', fontWeight: '600' }}>20</Typography>
          </ShadowBox>
        </Grid>
        <Grid item xs={6} >
          <ShadowBox>
            <Typography variant="h5" color="primary" sx={{ textTransform: 'uppercase', fontWeight: '600', display: 'flex', alignItems: 'center', gap: 2 }}>Last Updated </Typography>
            <p>Having trouble with navigating? Read the manual here.</p>
          </ShadowBox>
        </Grid>
        <Grid item xs={6} >
          <ShadowBox>
            <Typography variant="h5" color="primary" sx={{ textTransform: 'uppercase', fontWeight: '600', display: 'flex', alignItems: 'center', gap: 2 }}>Last Updated </Typography>
            <p>Having trouble with navigating? Read the manual here.</p>
          </ShadowBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
