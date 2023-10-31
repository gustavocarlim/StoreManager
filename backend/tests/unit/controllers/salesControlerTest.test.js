const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const salesController = require('../../../src/controllers/salesController');

const returnPorId = {
  saleId: 1,
  date: '2023-10-24T20:32:54.000Z',
  productId: 1,
  quantity: 5,
};

const AllSalesDb = [
  {
    saleId: 1,
    date: '2023-10-24T20:32:54.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-10-24T20:32:54.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-10-24T20:32:54.000Z',
    productId: 3,
    quantity: 15,
  },
];

const serviceReturn = { codeStatus: 200, data: AllSalesDb };
const serviceReturnId = { codeStatus: 200, data: returnPorId };

describe('Testes das funções em productControler', function () { 
  it('Ao buscar todos os produtos deve retornar status 200 e os dados dos produtos', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getAllSales').resolves(serviceReturn);
    await salesController.getAllSales(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
  it('retorno por id', async function () {
    const res = {};
    const req = { params: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getSaleById').resolves(serviceReturnId);
    await salesController.getSaleById(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
});