const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const connection = require('../../../src/models/connection');

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

describe('Testes das funções em ProductService', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Ao buscar todos os produtos deve retornar status 200 e os dados dos produtos', async function () {
    sinon.stub(connection, 'execute').resolves([AllSalesDb]);

    const result = await salesService.getAllSales();
    expect(result).to.have.property('codeStatus', 200);
    expect(result).to.have.property('data').to.be.an('array');
  });

  //   it('Ao buscar por id deve retornar status 200 e dados do produto', async function () {
  //     sinon.stub(connection, 'execute').resolves([AllSalesDb]);

//     const id = 1;
//     const result = await salesService.getSaleById(id);
//     expect(result).to.have.property('codeStatus', 200);
//     expect(result).to.have.property('data').to.be.an('object');
//   });
});