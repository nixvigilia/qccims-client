import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";

const ProductSpecsC = ({ }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          id="bodyBlankLength"
          label="Body Blank Length"
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          {...register("bodyBlankLength")}
          error={!!errors.bodyBlankLength}
          helperText={errors.bodyBlankLength?.message}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          id="bodyBlankWidth"
          label="Body Blank Width"
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          {...register("bodyBlankWidth")}
          error={!!errors.bodyBlankWidth}
          helperText={errors.bodyBlankWidth?.message}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          id="actualCanHeight"
          label="Actual Can Height"
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          {...register("actualCanHeight")}
          error={!!errors.actualCanHeight}
          helperText={errors.actualCanHeight?.message}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          id="coverSpout"
          label="Cover/Spout"
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          {...register("coverSpout")}
          error={!!errors.coverSpout}
          helperText={errors.coverSpout?.message}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          id="jointInterlocking"
          label="Joint Interlocking"
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          {...register("jointInterlocking")}
          error={!!errors.jointInterlocking}
          helperText={errors.jointInterlocking?.message}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          id="handle"
          label="Handle"
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          {...register("handle")}
          error={!!errors.handle}
          helperText={errors.handle?.message}
        />
      </Grid>
    </>
  );
};

export default ProductSpecsC;
