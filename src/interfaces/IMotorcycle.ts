import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

// https://zod.dev/?id=zod-enums

const motorcycleZodSchema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().gt(0).lte(2500).int(),
});

type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

export { IMotorcycle, motorcycleZodSchema };