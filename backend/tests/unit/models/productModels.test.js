const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const validateProduct = require('../../../src/middlewares/validateProduct');

describe('Testes das funções em ProductService', function () {
  afterEach(async function () {
    sinon.restore();
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
