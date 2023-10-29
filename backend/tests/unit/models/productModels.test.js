const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const validateProduct = require('../../../src/middlewares/validateProduct');

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
  afterEach(function () {
    sinon.restore();
  });

  it('Ao buscar todos os produtos deve retornar status 200 e os dados dos produtos', async function () {
    sinon.stub(connection, 'execute').resolves([AllproductsDb]);

    const result = await productsService.getAllProducts();
    expect(result).to.have.property('codeStatus', 200);
    expect(result).to.have.property('data').to.be.an('array');
  });

  it('Ao buscar por id deve retornar status 200 e dados do produto', async function () {
    sinon.stub(connection, 'execute').resolves([AllproductsDb]);

    const id = 1;
    const result = await productsService.getProductById(id);
    expect(result).to.have.property('codeStatus', 200);
    expect(result).to.have.property('data').to.be.an('object');
  });

  it('Testing insertProduct', async function () {
    sinon.stub(productModel, 'insertProduct').resolves(4);

    const product = await productsService.insertProduct({ name: 'Mjolnir' });

    expect(product.codeStatus).to.be.equal(201);
  });
  
  it('Teste insertProduct', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const product = await productModel.insertProduct({ name: 'Mjolnir' });

    expect(product).to.be.equal(4);
    expect(connection.execute.calledOnce).to.be.equal(true);
  });

  it('testa se não é possivel adicionar um produto com name invalido', async function () {
    const next = sinon.spy(validateProduct);
    const req1 = {
      body: {
        name: 'jhds',
      },
    };

    const req2 = {
      body: {
      },
    };

    const res = {
      status: (_e) => ({ json: (_a) => null }),
    };

    validateProduct(req1, res, next);
    validateProduct(req2, res, next);

    expect(next.called).to.be.equal(false);
  });
});