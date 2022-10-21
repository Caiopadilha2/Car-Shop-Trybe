import { Model as MongooseModelInterface, Document } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: MongooseModelInterface<T & Document>) { }
  // Aqui seria o mongoose.model, mas já pega só o model do mongoose.
  // https://mongoosejs.com/docs/guide.html
  // Esse model, que vou passar pras classes que estenderem de MongoModel vão receber eses model.

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> =>
    this.model.findById(id);
  
  update = async (id: string, data: Partial<T>): Promise<T | null> =>
    this.model.findByIdAndUpdate(id, data, { new: true });

  delete = async (id: string): Promise<T | null> => 
    this.model.findByIdAndDelete(id);
}

export default MongoModel;