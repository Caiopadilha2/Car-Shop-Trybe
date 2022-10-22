import { IMotorcycle, motorcycleZodSchema } from '../interfaces/IMotorcycle';
import MotorcycleModel from '../models/motorcycle';

class MotorcycleService {
  constructor(private model = new MotorcycleModel()) {}

  create = async (obj: IMotorcycle): Promise<IMotorcycle> => {
    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const newMotorcycle = await this.model.create(obj);

    return newMotorcycle;
  };

  read = async (): Promise<IMotorcycle[]> => {
    const motorcycles = await this.model.read();

    return motorcycles;
  };

  readOne = async (id: string): Promise<IMotorcycle | null> => {
    const motorcycle = await this.model.readOne(id);
    
    return motorcycle;
  };

  update = async (id: string, data: IMotorcycle): Promise<IMotorcycle | null> => {
    const updated = await this.model.update(id, data);
    return updated;
  };

  delete = async (id: string): Promise<IMotorcycle | null> => {
    const deleted = await this.model.delete(id);
    return deleted;
  };
}

export default MotorcycleService;