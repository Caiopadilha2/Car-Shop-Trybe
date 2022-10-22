import { Schema, Document, model as mongooseCreateModel } from 'mongoose';
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
}, {
  versionKey: false, 
});

class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Cars', carSchema)) {
    super(model);
  }
  // Esse model, que vou passar pra quem estender dessa clase, tem todos os métodos => model.create, model.find, etc.
  // Esse model vem do mongoose, renomeado para mongooseCreateModel.
  // Car é o nome da coleção, o schema é a estrutura.
  // O super passa o model pq é requerido no MongoModel (no construtor), que é de quem estou estendendo.
}

export default CarModel;