import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useFormContext} from "react-hook-form";

const SupersedeFields = () => {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  return (
    <Grid container justifyContent="flex-end">
      <Grid item sm={6}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="supersedeNumber"
              label="Supersede Number"
              size="small"
              InputLabelProps={{shrink: true}}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="supersedeDate"
              label="Supersede Date"
              size="small"
              type="date"
              InputLabelProps={{shrink: true}}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SupersedeFields;
