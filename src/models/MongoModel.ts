import { Model as MongooseModelInterface, Document } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: MongooseModelInterface<T & Document>) { }

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> =>
    this.model.findById(id);
  
  // TODO: data com erro de lint
  update = async (id: string): Promise<T | null> =>
    this.model.findByIdAndUpdate(id, { new: true });

  delete = async (id: string): Promise<T | null> => 
    this.model.findByIdAndDelete(id);
}

export default MongoModel;