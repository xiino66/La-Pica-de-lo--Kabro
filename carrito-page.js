let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");

function renderCarrito() {
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p class='text-center'>Carrito vacío</p>";
        totalElemento.textContent = "0";
        return;
    }

    carrito.forEach(p => {
        contenedor.innerHTML += `
        <div class="card mb-3 p-3 d-flex flex-row justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <img src="${p.img}" width="70" class="me-3">
                <div>
                    <h5>${p.nombre}</h5>
                    <p>$${p.precio}</p>
                </div>
            </div>

            <div>
                <button onclick="cambiarCantidad('${p.id}', -1)" class="btn btn-warning btn-sm">-</button>
                <span class="mx-2">${p.cantidad}</span>
                <button onclick="cambiarCantidad('${p.id}', 1)" class="btn btn-warning btn-sm">+</button>
            </div>

            <button onclick="eliminar('${p.id}')" class="btn btn-danger">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        `;
    });

    calcularTotal();
}

function cambiarCantidad(id, cambio) {
    const p = carrito.find(x => x.id === id);
    if (p) {
        p.cantidad += cambio;
        if (p.cantidad <= 0) eliminar(id);
    }
    guardar();
    renderCarrito();
}

function eliminar(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardar();
    renderCarrito();
}

function calcularTotal() {
    const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    totalElemento.textContent = total;
}

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarrito() {
    carrito = [];
    guardar();
    renderCarrito();
}

renderCarrito();