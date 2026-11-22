
const { test } = require('node:test');
const assert = require('node:assert/strict');

const Product = require('../src/product.js');
const InventoryService = require('../src/InventoryService');

// Producto de prueba
function createProduct(stock = 10) {
    return new Product(
        'P001',
        'Teclado',
        1500,
        stock
    );
}

// Stub: devuelve datos preparados
class StubRepository {
    constructor(product = null) {
        this.product = product;
    }

    findBySku(sku) {
        return this.product?.sku === sku
            ? this.product
            : null;
    }

    save(product) {
        return product;
    }

    findAll() {
        return this.product ? [this.product] : [];
    }
}

// Mock: registra las llamadas realizadas
class MockRepository extends StubRepository {
    constructor(product = null) {
        super(product);
        this.saveCalls = [];
    }

    save(product) {
        this.saveCalls.push(product);
        this.product = product;
        return product;
    }
}

// PRUEBA 1: Registrar un producto
test('Debe registrar un producto correctamente', () => {
    const repository = new MockRepository();
    const inventory = new InventoryService(repository);

    const product = createProduct();

    inventory.registerProduct(product);

    assert.equal(repository.saveCalls.length, 1);
    assert.equal(repository.product.name, 'Teclado');
});

// PRUEBA 2: No permitir productos duplicados
test('No debe registrar productos con códigos duplicados', () => {
    const product = createProduct();

    const repository = new StubRepository(product);
    const inventory = new InventoryService(repository);

    assert.throws(
        () => inventory.registerProduct(product),
        /ya existe/i
    );
});

// PRUEBA 3: Aumentar las existencias
test('Debe aumentar las existencias del producto', () => {
    const product = createProduct(10);

    const repository = new MockRepository(product);
    const inventory = new InventoryService(repository);

    inventory.receiveStock('P001', 5);

    assert.equal(product.stock, 15);
    assert.equal(repository.saveCalls.length, 1);
});

// PRUEBA 4: Vender productos
test('Debe disminuir las existencias al vender', () => {
    const product = createProduct(10);

    const repository = new MockRepository(product);
    const inventory = new InventoryService(repository);

    inventory.sell('P001', 3);

    assert.equal(product.stock, 7);
});

// PRUEBA 5: No permitir ventas superiores al inventario
test('No debe vender más unidades de las disponibles', () => {
    const product = createProduct(5);

    const repository = new StubRepository(product);
    const inventory = new InventoryService(repository);

    assert.throws(
        () => inventory.sell('P001', 10),
        /existencias insuficientes/i
    );

    assert.equal(product.stock, 5);
});

// PRUEBA 6: Consultar existencias
test('Debe consultar las existencias de un producto', () => {
    const product = createProduct(20);

    const repository = new StubRepository(product);
    const inventory = new InventoryService(repository);

    assert.equal(inventory.getStock('P001'), 20);
});

// PRUEBA 7: Validar cantidades incorrectas
test('No debe permitir cantidades negativas o cero', () => {
    const product = createProduct(10);

    assert.throws(() => product.addStock(-5));
    assert.throws(() => product.removeStock(0));

    assert.equal(product.stock, 10);
});

// PRUEBA 8: Buscar productos inexistentes
test('Debe generar un error si el producto no existe', () => {
    const repository = new StubRepository();
    const inventory = new InventoryService(repository);

    assert.throws(
        () => inventory.getStock('P999'),
        /no encontrado/i
    );
});

