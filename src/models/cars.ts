import { Schema, Document, model as createModel } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

interface CarDocument extends ICar, Document { }

const carSchema = new Schema<CarDocument>({
  status: String,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
  id: String,
});

class CarModel extends MongoModel<ICar> {
  constructor(model = createModel('Car', carSchema)) {
    super(model);
  }
}

export default CarModel;