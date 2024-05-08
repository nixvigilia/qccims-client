import {z} from "zod";

const RegisterSchema = z.object({
  email: z.string().email({message: "Invalid email format"}),
  password: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long."}),
});

// const validatedFields = RegisterSchema.safeParse({
//   email: formData.email,
//   password: formData.password,
// });

// // If form validation fails, return errors early. Otherwise, continue.
// if (!validatedFields.success) {
//   return {
//     errors: validatedFields.error.flatten().fieldErrors,
//     message: "Validation Failed. Please check your input.",
//   };
// }

// // Data is valid, proceed with registration logic
// const {email, password} = validatedFields.data;

export {RegisterSchema};
