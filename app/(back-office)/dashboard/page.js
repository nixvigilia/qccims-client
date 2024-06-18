"use client"
import PageBreadCrumbs from "@/components/Delivery/CustomerProfile/PageBreadCrumbs";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import PrecisionManufacturingTwoToneIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';
import PollTwoToneIcon from '@mui/icons-material/PollTwoTone';
import Button from "@mui/material/Button";
import React, { useContext } from "react";
import { Store } from "@/utils/context/store";

const ShadowBox = styled(Box)({
  boxShadow: '0px 4px 20px rgb(0 0 0 / 7%)',
  padding: '2rem',
  backgroundColor: '#fff',
  height: '100%',
});
const BackgroundBox = styled(Box)({
  backgroundColor: '#c4cfe1',
  padding: '0.2rem',
  display: 'flex'
});
const Page = () => {
  const { state } = useContext(Store);
  const { lastName } = state;
  console.log(lastName);
  return (
    <Box p={4} mt={4}>
      <PageBreadCrumbs />
      <Grid container spacing={2} mt={2} sx={{ flexGrow: 1 }} direction="row"
        alignItems="stretch">
        <Grid item xs={8} sx={{ height: 'inherit' }}>
          <ShadowBox className="card--dashboard">
            <Typography variant="h4">Welcome, {lastName}.</Typography>
            <p>Having trouble with navigating? Read the manual here.</p>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, height: '50px' }}
              >
                Read Manual
              </Button>
              <Button
                type="submit"
                variant="outlined"
                sx={{ mt: 3, mb: 2, height: '50px' }}
              >
                Contact Support
              </Button>
            </Box>

          </ShadowBox>
        </Grid>
        <Grid item xs={4} sx={{ height: 'inherit' }}>
          <ShadowBox sx={{ backgroundColor: "#3D619B", color: "#fff" }}>
            <Typography variant="h4">Lorem Ipsum</Typography>
            <p>Lorem Ipsum</p>
          </ShadowBox>
        </Grid>
        <Grid item xs={4} sx={{ height: '100%' }}>
          <ShadowBox>
            <Typography variant="h7" color="primary" sx={{ textTransform: 'uppercase', fontWeight: '600', display: 'flex', alignItems: 'center', gap: 2 }}>
              <BackgroundBox>
                <PrecisionManufacturingTwoToneIcon color="primary" />
              </BackgroundBox> Total Tinplates in Production
            </Typography>
            <Typography sx={{ fontSize: '4rem', fontWeight: '600' }}>20</Typography>
          </ShadowBox>
        </Grid>
        <Grid item xs={4} sx={{ height: '100%' }}>
          <ShadowBox>
            <Typography variant="h7" color="primary" sx={{ textTransform: 'uppercase', fontWeight: '600', display: 'flex', alignItems: 'center', gap: 2 }}>
              <BackgroundBox>
                <PollTwoToneIcon color="primary" />
              </BackgroundBox> Total Rack(s) Available
            </Typography>
            <Typography sx={{ fontSize: '4rem', fontWeight: '600' }}>20</Typography>
          </ShadowBox>
        </Grid>
        <Grid item xs={4} sx={{ height: '100%' }}>
          <ShadowBox>
            <Typography variant="h7" color="primary" sx={{ textTransform: 'uppercase', fontWeight: '600', display: 'flex', alignItems: 'center', gap: 2 }}>
              <BackgroundBox>
                <PollTwoToneIcon color="primary" />
              </BackgroundBox> Total Rack(s) Available
            </Typography>
            <Typography sx={{ fontSize: '4rem', fontWeight: '600' }}>20</Typography>
          </ShadowBox>
        </Grid>
        <Grid item xs={6} sx={{ height: '100%' }}>
          <ShadowBox>
            <Typography variant="h5" color="primary" sx={{ textTransform: 'uppercase', fontWeight: '600', display: 'flex', alignItems: 'center', gap: 2 }}>Last Updated </Typography>
            <p>Having trouble with navigating? Read the manual here.</p>
          </ShadowBox>
        </Grid>
        <Grid item xs={6} sx={{ height: '100%' }}>
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
