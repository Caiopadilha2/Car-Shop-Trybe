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

const CARS_ID_URL = '/cars/:id';
const MOTORCYCLE_ID_URL = '/motorcycles/:id';

app.get('/cars', car.read);
app.get(CARS_ID_URL, idValidation, car.readOne);
app.post('/cars', bodyValidation(carZodSchema), car.create);
app.put(CARS_ID_URL, idValidation, bodyValidation(carZodSchema), car.update);
app.delete(CARS_ID_URL, idValidation, car.delete);

app.get('/motorcycles', motorcycle.read);
app.get(MOTORCYCLE_ID_URL, idValidation, motorcycle.readOne);
app.post('/motorcycles', bodyValidation(motorcycleZodSchema), motorcycle.create);
app.put(MOTORCYCLE_ID_URL, idValidation, bodyValidation(motorcycleZodSchema), motorcycle.updated);
app.delete(MOTORCYCLE_ID_URL, idValidation, motorcycle.delete);

export default app;
