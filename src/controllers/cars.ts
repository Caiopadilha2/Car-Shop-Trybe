import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import CarsService from '../services/cars';

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
}

export default CarsController;