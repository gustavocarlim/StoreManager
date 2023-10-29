const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

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
// const response = {
//   codeStatus: 404,
//   data: { err: { code: 'invalid_data', message: 'Wrong id format' } },
// };

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
  
  it('Teste insertProduct', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const product = await productModel.insertProduct({ name: 'Mjolnir' });

    expect(product).to.be.equal(4);
    expect(connection.execute.calledOnce).to.be.equal(true);
  });
});