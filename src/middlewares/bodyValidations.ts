import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const bodyValidation = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // if (!req.body || JSON.stringify(req.body) === '{}') return res.status(400).end();
    // const parsed = schema.safeParse({ ...req.body });
    // if (!parsed.success) return res.status(404).json({ message: 'Body invalid' });
    try {
      await schema.parseAsync({ ...req.body });
      return next();
    } catch (error) {
      return res.status(400).end();
    }
  };

export default bodyValidation;