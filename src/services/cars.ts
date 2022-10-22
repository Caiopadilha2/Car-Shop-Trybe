import { ICar, carZodSchema } from '../interfaces/ICar';
import CarModel from '../models/cars';

class CarsService {
  constructor(private model = new CarModel()) {}

  create = async (obj: ICar): Promise< ICar> => {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
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

  update = async (id: string, data: ICar): Promise<ICar | null> => {
    const parsed = carZodSchema.safeParse(data);
    if (!parsed.success) {
      return null;
    }
    const updated = await this.model.update(id, parsed.data);

    return updated;
  };

  delete = async (id: string): Promise<ICar | null> => {
    const deleted = await this.model.delete(id);
    return deleted;
  };
}

export default CarsService;