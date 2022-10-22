import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModel from '../../../models/cars';
import CarsService from '../../../services/cars';
import { carMock, carMockWithId } from '../mocks/carMock';

describe('Frame Service', () => {
	const carModel = new CarModel();
	const carService = new CarsService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId) 
			.onCall(1).resolves(null); 
	})
	after(() => {
		sinon.restore()
	})
	describe('Create car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});
	});

	describe('ReadOne car', () => {
		it('Success', async () => {
			const carCreated = await carService.readOne(carMockWithId._id);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});
	});
});