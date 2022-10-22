import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MotorcycleService from '../services/motorcycle';

const objNotFound = 'Object not found';

class MotorcycleController {
  constructor(private service = new MotorcycleService()) {}

  create = async (req: Request, res: Response): Promise<Response> => {
    const motorcycleInfos: IMotorcycle = req.body;
    const created = await this.service.create(motorcycleInfos);
    return res.status(201).json(created);
  };

  read = async (_req: Request, res: Response): Promise<Response> => {
    const motorcycles = await this.service.read();
    return res.status(200).json(motorcycles);
  };

  readOne = async (req: Request, res: Response): Promise<Response> => {
    const motorcycle = await this.service.readOne(req.params.id);
    if (!motorcycle) {
      return res.status(404).json({ error: objNotFound });
    }
    return res.status(200).json(motorcycle);
  };

  updated = async (req: Request, res: Response): Promise<Response> => {
    const updated = await this.service.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: objNotFound });
    return res.status(200).json(updated);
  };

  delete = async (req: Request, res: Response): Promise<Response | void> => {
    const deleteOne = await this.service.delete(req.params.id);
    if (!deleteOne) {
      return res.status(404).json({ error: objNotFound });
    }
    return res.status(204).end();
  };
}

export default MotorcycleController;