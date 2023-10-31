const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

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

  it('Ao buscar por id deve retornar status 200 e dados do produto', async function () {
    sinon.stub(connection, 'execute').resolves(AllSalesDb);

    const id = 1;
    const result = await salesService.getSaleById(id);
    expect(result).to.have.property('codeStatus', 200);
    expect(result).to.have.property('data').to.be.an('object');
  });

  it('Ao adicionar o id e o quantify, deve retornar 4', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const sale = await salesModel.insertSale({ productId: 1, quantity: 2 });

    expect(sale).to.be.equal(4);
  });
  it('Testing allSales', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(AllSalesDb);

    const sales = await salesService.getAllSales();

    expect(sales).to.have.property('codeStatus');
    expect(sales).to.have.property('data');
    expect(sales.codeStatus).to.be.equal(200);
  });

  it('Testing saleById', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([AllSalesDb]);

    const sale = await salesService.getSaleById(1);

    expect(sale.codeStatus).to.be.equal(200);
  });

  // it('Testing insertSale', async function () {
  //   sinon.stub(salesModel, 'insertSale').resolves(4);

  //   const sale = await salesService.insertSale([
  //     {
  //       productId: 1,
  //       quantity: 1,
  //     },
  //     {
  //       productId: 2,
  //       quantity: 5,
  //     },
  //   ]);

  //   expect(sale.codeStatus).to.be.equal(201);
  // });

  it('Testing insertSale with invalid quantity', async function () {
    sinon.stub(salesModel, 'insertSale').resolves(4);

    const sale = await salesService.insertSale([
      {
        productId: 1,
        quantity: -1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ]);

    expect(sale.codeStatus).to.be.equal(422);
  });

  it('Testing insertSale with zero quantity', async function () {
    sinon.stub(salesModel, 'insertSale').resolves(4);
  
    const sale = await salesService.insertSale([
      {
        productId: 1,
        quantity: 0,
      },
    ]);
  
    expect(sale.codeStatus).to.be.equal(422);
  });
  it('Testing insertSale with negative quantity', async function () {
    sinon.stub(salesModel, 'insertSale').resolves(4);
  
    const sale = await salesService.insertSale([
      {
        productId: 1,
        quantity: -1,
      },
    ]);
  
    expect(sale.codeStatus).to.be.equal(422);
  });
  it('Teste de tratamento de exceção ao inserir venda com dados inválidos', async function () {
    sinon.stub(salesModel, 'insertSale').rejects(new Error('Erro ao inserir venda'));
  
    const sale = await salesService.insertSale([
      {
        productId: 1,
        quantity: -1, // Dados inválidos
      },
    ]);
  
    expect(sale.codeStatus).to.be.equal(422); // Verifique o status de erro interno do servidor
  });
});