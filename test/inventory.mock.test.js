const test = require('node:test');
const assert = require('node:assert/strict');

// Función que representa una operación del sistema
function registrarProducto(repositorio, producto) {
  repositorio.guardar(producto);
}

// PRUEBA MOCK
test('Debe llamar al repositorio para guardar un producto usando mock', () => {

  // MOCK: registra las llamadas recibidas
  let llamadas = 0;
  let productoGuardado = null;

  const repositorioMock = {
    guardar(producto) {
      llamadas++;
      productoGuardado = producto;
    }
  };

  const producto = {
    sku: 'P001',
    name: 'Teclado',
    price: 1500,
    stock: 10
  };

  // Ejecutamos la operación
  registrarProducto(repositorioMock, producto);

  // Verificamos el comportamiento
  assert.strictEqual(llamadas, 1);
  assert.deepStrictEqual(productoGuardado, producto);


 
});

