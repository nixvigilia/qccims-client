import {useState, useEffect} from "react";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import {postRequest, updateRequest} from "@/lib/api/requestApi";
import {useRouter} from "next/navigation";
import {useForm, FormProvider, Controller} from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

export default function MainForm({initialData = {}, isUpdate = false}) {
  const router = useRouter();
  const [tempCredentials, setTempCredentials] = useState(null);

  const formatDate = (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "");

  const formattedInitialData = {
    ...initialData,
    dateOfBirth: formatDate(initialData.dateOfBirth),
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm({defaultValues: formattedInitialData});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isUpdate) {
      reset(formattedInitialData);
    }
  }, [isUpdate, initialData, reset, formattedInitialData]);

  async function onSubmit(data) {
    setLoading(true);

    try {
      if (isUpdate) {
        await updateRequest(
          setLoading,
          `api/user/update/${initialData.id}`,
          data,
          "User"
        );
      } else {
        const response = await postRequest(
          setLoading,
          "api/user/new",
          data,
          "User",
          reset
        );

        if (response && response.status === 201) {
          const {password: tempPassword, user} = response.data;
          const {email} = user;
          setTempCredentials({email, tempPassword});
          toast.success(
            "User created successfully. Please copy the temporary credentials below."
          );
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormProvider
      {...{register, handleSubmit, formState: {errors}, reset, control}}
    >
      <Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                {...register("firstName", {required: "First Name is required"})}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                {...register("lastName", {required: "Last Name is required"})}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                {...register("email", {required: "Email is required"})}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel id="user-role-label">Role</InputLabel>
                <Controller
                  name="role"
                  control={control}
                  defaultValue={formattedInitialData.role || ""}
                  rules={{required: "Role is required"}}
                  render={({field}) => (
                    <Select
                      labelId="user-role-label"
                      id="user-role"
                      label="Role"
                      {...field}
                    >
                      <MenuItem value="ADMIN">Admin</MenuItem>
                      <MenuItem value="SALES">Sales</MenuItem>
                      <MenuItem value="PRODUCTION_ENCODER">
                        Production Encoder
                      </MenuItem>
                      <MenuItem value="PRODUCTION_REVIEWER">
                        Production Reviewer
                      </MenuItem>
                      <MenuItem value="ACCOUNTING_ENCODER">
                        Accounting Encoder
                      </MenuItem>
                      <MenuItem value="ACCOUNTING_REVIEWER">
                        Accounting Reviewer
                      </MenuItem>
                    </Select>
                  )}
                />
                {errors.role && (
                  <Typography color="error">{errors.role.message}</Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Divider sx={{mt: 4, mb: 4}} />

          <div
            style={{display: "flex", justifyContent: "flex-end", gap: "10px"}}
          >
            <SubmitButton
              isLoading={loading}
              title={isUpdate ? "Update User" : "Create User"}
            />
          </div>
        </Box>
        {tempCredentials && (
          <Box mt={2}>
            <Typography variant="h6">
              <strong>Username:</strong> {tempCredentials.email}
            </Typography>
            <Typography variant="h6">
              <strong>Temporary Password:</strong>{" "}
              {tempCredentials.tempPassword}
            </Typography>
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                navigator.clipboard.writeText(
                  `Username: ${tempCredentials.email}\nPassword: ${tempCredentials.tempPassword}`
                );
                toast.success(
                  "The username and password have been copied to your clipboard."
                );
              }}
            >
              Copy Credentials
            </Button>
          </Box>
        )}
      </Box>
    </FormProvider>
  );
}
