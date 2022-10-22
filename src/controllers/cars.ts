import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import CarsService from '../services/cars';

const objNotFound = 'Object not found';

class CarsController {
  constructor(private service = new CarsService()) {}

  create = async (req: Request, res: Response): Promise<Response> => {
    const carInfos: ICar = req.body;
    const created = await this.service.create(carInfos);
    return res.status(201).json(created);
  };

  read = async (_req: Request, res: Response): Promise<Response> => {
    const listAll = await this.service.read();
    return res.status(200).json(listAll);
  };

  readOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const listOne = await this.service.readOne(id);
    if (!listOne) {
      return res.status(404).json({ error: objNotFound });
    }
    return res.status(200).json(listOne);
  };

  update = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const data: ICar = req.body;
    const updated = await this.service.update(id, data);

    if (!updated) {
      return res.status(404).json({ error: objNotFound });
    }
    
    return res.status(200).json(updated);
  };

  delete = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const deleteOne = await this.service.delete(id);
    if (!deleteOne) {
      return res.status(404).json({ error: objNotFound });
    }
    return res.status(204).end();
  };
}

export default CarsController;