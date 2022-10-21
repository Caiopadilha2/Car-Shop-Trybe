import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const bodyValidation = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const parsed = carZodSchema.safeParse(car)
      await schema.parseAsync({ ...req.body });
      return next();
    } catch (error) { 
      return res.status(400).end();
    }
  };

export default bodyValidation;