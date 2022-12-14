import { z } from 'zod';

// https://www.npmjs.com/package/zod#numbers
const vehicleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().gte(1900).lte(2022).int(),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

type IVehicle = z.infer<typeof vehicleZodSchema>;

export { vehicleZodSchema, IVehicle };