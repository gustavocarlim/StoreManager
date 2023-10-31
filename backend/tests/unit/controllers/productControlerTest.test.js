const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const productControler = require('../../../src/controllers/productsController');

const returnPorId = {
  id: 1,
  name: 'Martelo de Thor',
};

const AllproductsDb = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const serviceReturn = { codeStatus: 200, data: AllproductsDb };
const serviceReturnId = { codeStatus: 200, data: returnPorId };
const insertedProduct = { id: 4, name: 'productx' };
const insertReturn = { codeStatus: 201, data: insertedProduct };

describe('Testes das funções em productControler', function () { 
  it('Ao buscar todos os produtos deve retornar status 200 e os dados dos produtos', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAllProducts').resolves(serviceReturn);
    await productControler.getAllProducts(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
  it('retorno por id', async function () {
    const res = {};
    const req = { params: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProductById').resolves(serviceReturnId);
    await productControler.getProductById(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });
  it('insert test', async function () {
    const res = {};
    const req = { body: { name: 'produtox' } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'insertProduct').resolves(insertReturn);
    await productControler.insertProduct(req, res);
    expect(res.status.calledWith(201)).to.be.equal(true);
  });
});