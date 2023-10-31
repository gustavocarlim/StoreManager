const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

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

describe('Testes das funções em ProductService', function () {
  afterEach(async function () {
    sinon.restore();
  });
  it('Ao buscar todos os produtos deve retornar status 200 e os dados dos produtos', async function () {
    sinon.stub(connection, 'execute').resolves([AllproductsDb]);
  
    const result = await productsService.getAllProducts();
    expect(result).to.have.property('codeStatus', 200);
    expect(result).to.have.property('data').to.be.an('array');
    expect(result.data).to.be.deep.equal(AllproductsDb);
  });

  it('Ao buscar por id deve retornar status 200 e dados do produto', async function () {
    sinon.stub(connection, 'execute').resolves([AllproductsDb]);

    const id = 1;
    const result = await productsService.getProductById(id);
    expect(result).to.have.property('codeStatus', 200);
    expect(result).to.have.property('data').to.be.an('object');
    expect(result.data).to.be.deep.equal(returnPorId);
  });
  it('Testing insertProduct', async function () {
    sinon.stub(productModel, 'insertProduct').resolves(4);

    const product = await productsService.insertProduct({ name: 'Mjolnir' });

    expect(product.codeStatus).to.be.equal(201);
  });

  it('teste deleteService', async function () {
    sinon.stub(connection, 'execute').resolves([AllproductsDb]);
    const result = await productsService.deleteProductById(1);
    expect(result).to.have.property('codeStatus', 204);
  });
});