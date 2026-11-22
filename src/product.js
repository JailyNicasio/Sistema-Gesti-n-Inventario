
class Product {

    constructor(sku, name, price, stock = 0) {

        if (!sku || !name) {
            throw new Error('El código y nombre son obligatorios');
        }

        if (!Number.isFinite(price) || price < 0) {
            throw new Error('El precio debe ser válido');
        }

        if (!Number.isInteger(stock) || stock < 0) {
            throw new Error('Las existencias deben ser un entero no negativo');
        }

        this.sku = sku;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    // Aumentar existencias
    addStock(quantity) {

        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error('La cantidad debe ser un entero positivo');
        }

        this.stock += quantity;
    }

    // Disminuir existencias
    removeStock(quantity) {

        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error('La cantidad debe ser un entero positivo');
        }

        if (quantity > this.stock) {
            throw new Error('Existencias insuficientes');
        }

        this.stock -= quantity;
    }
}

module.exports = Product;