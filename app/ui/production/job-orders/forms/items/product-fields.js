import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useFormContext} from "react-hook-form";

const ProductDetails = ({product}) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="product"
          label="Product"
          size="small"
          variant="filled"
          defaultValue={product.productName}
          disabled
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#36454F",
              fontWeight: "bold",
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="canSize"
          label="Can Size"
          size="small"
          variant="filled"
          InputLabelProps={{shrink: true}}
          {...register("canSize")}
          error={!!errors.canSize}
          helperText={errors.canSize?.message}
        />
      </Grid>
    </>
  );
};

export default ProductDetails;
