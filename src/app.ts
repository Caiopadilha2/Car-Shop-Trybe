import express from 'express';
import CarsController from './controllers/cars';
import { carZodSchema } from './interfaces/ICar';
import bodyValidation from './middlewares/bodyValidations';
import idValidation from './middlewares/idValidations';

const app = express();

app.use(express.json());

const car = new CarsController();

app.post('/cars', bodyValidation(carZodSchema), car.create);
app.get('/cars', car.read);
app.get('/cars/:id', idValidation, car.readOne);
app.delete('/cars/:id', idValidation, car.delete);

export default app;
