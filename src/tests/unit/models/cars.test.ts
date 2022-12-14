import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/cars';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { carMock, carMockWithId } from '../mocks/carMock';

describe('car Model', () => {
  const carModel = new CarModel();

  before(() => {
	sinon.stub(Model, 'create').resolves(carMockWithId);
	sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
  });
  // Aqui eu mocko para não conectar ao mongoose. Tenho a certeza que vai me retornar o que quero.
  // Aqui eu uso os métodos do mongoose, ex: findByIdAndUpdate, mas eu testo o meu UPDATE!.

  after(() => {
	sinon.restore();
  });

  describe('creating a car', () => {
   it('successfully created', async () => {
	const newCar = await carModel.create(carMock)
	expect(newCar).to.be.deep.equal(carMockWithId);
	});
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const carFound = await carModel.readOne('valid-ID');
      expect(carFound).to.be.deep.equal(carMockWithId);
      stub.restore();
  });

    it('Wrong id', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);

      try {
        await carModel.readOne('invalid-id')
      } catch (error: any) {
	    expect(error.message).to.be.eq('Id must have 24 hexadecimal characters');
        stub.restore();
	}
  });
 });
   describe('updating a car', () => {
    it('successfully updates', async () => {
      const updated = await carModel.update('4edd40c86762e0fb12000003', carMock);
      expect(updated).to.be.deep.equal(carMockWithId);
  });

//     it('Throws invalid ID ', async () => {
//       try {
//         await carModel.update('4edd40c86762e0fb1200000', carMock)
//       } catch (error: any) {
// 	    expect(error.message).to.be.eq('Id must have 24 hexadecimal characters');
// 	}
//   });
 });
});