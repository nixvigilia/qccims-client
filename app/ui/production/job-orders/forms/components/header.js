import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Header() {
  return (
    <>
      <Grid item xs={12}>
        <Box width="100%" sx={{textAlign: "center"}}>
          <Typography variant="button">
            QUALITY CONTAINER CORPORATION
          </Typography>
        </Box>
        <Box width="100%" sx={{textAlign: "center"}}>
          <Typography variant="button">PRODUCTION JOB ORDER</Typography>
        </Box>
      </Grid>
    </>
  );
}
