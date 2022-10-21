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

  read = async (): Promise<ICar[]> => {
    const cars = await this.model.read();
    return cars;
  };

  readOne = async (id: string): Promise<ICar | null> => {
    const car = await this.model.readOne(id);
    return car;
  };

  delete = async (id: string): Promise<ICar | null> => {
    const deleted = await this.model.delete(id);
    return deleted;
  };
}

export default CarsService;