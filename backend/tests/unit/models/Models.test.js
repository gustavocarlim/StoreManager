const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
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

describe('Testes das funções em productModel', function () {
  afterEach(async function () {
    connection.execute.restore();
  });
  it('Testa se o model lista todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([AllproductsDb]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(AllproductsDb);
  });
  it('Teste insertProduct', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const product = await productModel.insertProduct({ name: 'Mjolnir' });

    expect(product).to.be.equal(4);
    expect(connection.execute.calledOnce).to.be.equal(true);
  });
  it('Testa o método deleteProductById', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const result = await productModel.deleteProductById('1');

    expect(result).to.be.an('undefined');
  });
  it('lista se productModel busca por id', async function () {
    sinon.stub(connection, 'execute').resolves([[returnPorId]]);

    const result = await productModel.findById(1);

    expect(result).to.be.deep.equal(returnPorId);
  });
});