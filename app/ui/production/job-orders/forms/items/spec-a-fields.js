import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useFormContext} from "react-hook-form";

const ProductSpecsA = ({
  bodyFields,
  bottomFields,
  coverFields,
  topRingFields,
}) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  return (
    <>
      {bodyFields.map((label, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <TextField
            fullWidth
            id={`body${index + 1}`}
            label={label}
            size="small"
            InputLabelProps={{shrink: true}}
            {...register(`body${index + 1}`)}
            error={!!errors[`body${index + 1}`]}
            helperText={errors[`body${index + 1}`]?.message}
          />
        </Grid>
      ))}

      {bottomFields.map((label, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <TextField
            fullWidth
            id={`bottom${index + 1}`}
            label={label}
            size="small"
            InputLabelProps={{shrink: true}}
            {...register(`bottom${index + 1}`)}
            error={!!errors[`bottom${index + 1}`]}
            helperText={errors[`bottom${index + 1}`]?.message}
          />
        </Grid>
      ))}

      {coverFields.map((label, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <TextField
            fullWidth
            id={`cover${index + 1}`}
            label={label}
            size="small"
            InputLabelProps={{shrink: true}}
            {...register(`cover${index + 1}`)}
            error={!!errors[`cover${index + 1}`]}
            helperText={errors[`cover${index + 1}`]?.message}
          />
        </Grid>
      ))}

      {topRingFields.map((label, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <TextField
            fullWidth
            id={`topRing${index + 1}`}
            label={label}
            size="small"
            InputLabelProps={{shrink: true}}
            {...register(`topRing${index + 1}`)}
            error={!!errors[`topRing${index + 1}`]}
            helperText={errors[`topRing${index + 1}`]?.message}
          />
        </Grid>
      ))}
    </>
  );
};

export default ProductSpecsA;
