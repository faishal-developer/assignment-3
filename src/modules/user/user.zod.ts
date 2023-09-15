import { z } from "zod";
import { role } from "./user.model";


const createUser = z.object({
  body: z.object({
    password: z.string({ required_error: "Password is required" }),
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
    }),
    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: "Role is required",
    }), 
    address: z.string({
      required_error: "Address is required",
    }),
    budget: z.number().optional(),
    income: z.number().optional(),
  })
});


const updateUser = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }).optional(),
    phoneNumber: z.string().optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});



export const userZodValidataion = {
  createUser,
  updateUser,
};