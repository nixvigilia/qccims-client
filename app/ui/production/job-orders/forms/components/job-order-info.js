import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import formatISODateToReadable from "@/utils/helpers/formatISODateToReadable";

export default function JobOrderInfo({jobOrder}) {
  const {jobNumber, customer, jobDate} = jobOrder;

  return (
    <>
      <Grid item xs={6}>
        <Box>
          <Typography variant="button">JO #: {jobNumber}</Typography>
        </Box>
        <Box>
          <Typography variant="button">
            CUSTOMER: {customer.companyName}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Typography variant="button">
            Date: {formatISODateToReadable(jobDate)}
          </Typography>
        </Box>
      </Grid>
    </>
  );
}
