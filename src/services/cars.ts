import { ICar, carZodSchema } from '../interfaces/ICar';
import CarModel from '../models/cars';

class CarsService {
  constructor(private model = new CarModel()) {}

  create = async (obj: ICar): Promise< ICar | null> => {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      return null;
    }
    const newCar = await this.model.create(obj);

    return newCar;
  };
}

export default CarsService;