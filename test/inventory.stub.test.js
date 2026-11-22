const test = require('node:test');
const assert = require('node:assert');

test('Debe consultar un producto usando un STUB', () => {

  // STUB: devuelve un producto preparado
  const repositorioStub = {
    buscarPorSku(sku) {
      return {
        sku: sku,
        name: 'Teclado',
        stock: 10
      };
    }
  };

  const producto = repositorioStub.buscarPorSku('P001');

  assert.strictEqual(producto.name, 'Teclado');
  assert.strictEqual(producto.stock, 10);

});