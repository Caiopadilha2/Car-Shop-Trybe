import express from 'express';
import CarsController from './controllers/cars';
import bodyValidation from './middlewares/bodyValidations';
import { carZodSchema } from './interfaces/ICar';
import idValidation from './middlewares/idValidations';
import MotorcycleController from './controllers/motorcycles';
import { motorcycleZodSchema } from './interfaces/IMotorcycle';

const app = express();

app.use(express.json());

const car = new CarsController();
const motorcycle = new MotorcycleController();

app.get('/cars', car.read);
app.put('/cars/:id', idValidation, bodyValidation(carZodSchema), car.update);
app.get('/cars/:id', idValidation, car.readOne);
app.delete('/cars/:id', idValidation, car.delete);
app.post('/cars', bodyValidation(carZodSchema), car.create);

app.post(
  '/motorcycles',
  bodyValidation(motorcycleZodSchema),
  motorcycle.create,
);
app.get('/motorcycles', motorcycle.read);
app.get('/motorcycles/:id', idValidation, motorcycle.readOne);
app.delete('/motorcycles/:id', idValidation, motorcycle.delete);

export default app;
