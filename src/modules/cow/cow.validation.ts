import { z } from "zod";
import { breed, category, level, location } from "./cow.constant";


const createCow = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    age: z.number({
      required_error: "Age is required",
    }),
    price: z.number({
      required_error: "Price is required",
    }),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: "Location is required",
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: "Breed is required",
    }),
    label: z.enum([...level] as [string, ...string[]], {
      required_error: "Level is required",
    }),
    category: z.enum([...category] as [string, ...string[]], {
      required_error: "Level is required",
    }),
    weight: z.number({
      required_error: "Weight is required",
    }),
    seller: z.string({
      required_error: "Seller is required",
    }),
  }),
});


const updateCow = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),
    label: z.enum([...level] as [string, ...string[]]).optional(),
    category: z.enum([...category] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    seller: z.string().optional(),
  }),
});


export const cowsZodValidataion={
    createCow,
    updateCow
}