
let inventario = JSON.parse(localStorage.getItem('inventarioMax')) || [];

function guardarInventario() {
    localStorage.setItem('inventarioMax', JSON.stringify(inventario));
}

function renderInventario() {
    const tbody = document.querySelector('#tabla-inventario tbody');
    tbody.innerHTML = '';
    inventario.forEach((prod, index) => {
        const fila = document.createElement('tr');
        if (prod.stock <= 5) fila.style.backgroundColor = '#400';
        fila.innerHTML = `
            <td>${prod.codigo}</td>
            <td>${prod.nombre}</td>
            <td>${prod.categoria}</td>
            <td>${prod.proveedor}</td>
            <td>${prod.stock}</td>
            <td>${prod.precio}</td>
        `;
        tbody.appendChild(fila);
    });
}

function mostrarFormulario(tipo) {
    let nombre = prompt("Nombre del producto:");
    if (!nombre) return;

    let codigo = prompt("Código:");
    let categoria = prompt("Categoría:");
    let proveedor = prompt("Proveedor:");
    let cantidad = parseInt(prompt("Cantidad:"));
    let precio = parseFloat(prompt("Precio (por unidad):"));

    if (tipo === 'nuevo') {
        inventario.push({ codigo, nombre, categoria, proveedor, stock: cantidad, precio });
    } else {
        let producto = inventario.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
        if (!producto) {
            alert("Producto no encontrado.");
            return;
        }
        if (tipo === 'entrada') {
            producto.stock += cantidad;
        } else if (tipo === 'salida') {
            producto.stock -= cantidad;
            if (producto.stock < 0) producto.stock = 0;
        }
    }

    guardarInventario();
    renderInventario();
}

function filtrarInventario(valor) {
    const tbody = document.querySelector('#tabla-inventario tbody');
    tbody.innerHTML = '';
    inventario
        .filter(prod =>
            prod.nombre.toLowerCase().includes(valor.toLowerCase()) ||
            prod.codigo.toLowerCase().includes(valor.toLowerCase()) ||
            prod.categoria.toLowerCase().includes(valor.toLowerCase()))
        .forEach((prod, index) => {
            const fila = document.createElement('tr');
            if (prod.stock <= 5) fila.style.backgroundColor = '#400';
            fila.innerHTML = `
                <td>${prod.codigo}</td>
                <td>${prod.nombre}</td>
                <td>${prod.categoria}</td>
                <td>${prod.proveedor}</td>
                <td>${prod.stock}</td>
                <td>${prod.precio}</td>
            `;
            tbody.appendChild(fila);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    renderInventario();
    const inputBuscar = document.querySelector('input[type="text"]');
    inputBuscar.addEventListener('input', (e) => filtrarInventario(e.target.value));
});
