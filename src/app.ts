import express from 'express';
import CarsController from './controllers/cars';
import { carZodSchema } from './interfaces/ICar';
import bodyValidation from './middlewares/bodyValidations';

const app = express();

app.use(express.json());

const car = new CarsController();

app.post('/cars', bodyValidation(carZodSchema), car.create);

export default app;
