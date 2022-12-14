import { Schema, Document, model as mongooseCreateModel } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

interface MotorcycleDocument extends IMotorcycle, Document { }

const motorcycleSchema = new Schema<MotorcycleDocument>({
  id: String,
  status: String,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, {
  versionKey: false, 
});

class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycles', motorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;