const Product = require('./src/product');

const InventoryRepository =
    require('./src/InventoryRepository');

const InventoryService =
    require('./src/InventoryService');

// Crear el repositorio
const repository = new InventoryRepository();

// Crear el servicio
const inventory = new InventoryService(repository);

// Registrar un producto
const keyboard = new Product(
    'P001',
    'Teclado',
    1500,
    10
);

inventory.registerProduct(keyboard);

// Registrar otro producto
const mouse = new Product(
    'P002',
    'Mouse',
    800,
    20
);

inventory.registerProduct(mouse);

// Recibir mercancía
inventory.receiveStock('P001', 5);

// Realizar una venta
inventory.sell('P002', 3);

// Consultar inventario
console.log('INVENTARIO ACTUAL');

console.log(inventory.getAllProducts());

// Consultar existencias
console.log(
    'Teclados disponibles:',
    inventory.getStock('P001')
);

console.log(
    'Mouse disponibles:',
    inventory.getStock('P002')
);