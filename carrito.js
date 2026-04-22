let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.querySelectorAll(".agregar-carrito").forEach(btn => {
    btn.addEventListener("click", () => {

        const producto = {
            id: btn.dataset.id,
            nombre: btn.dataset.nombre,
            precio: parseInt(btn.dataset.precio),
            img: btn.dataset.img,
            cantidad: 1
        };

        const existe = carrito.find(p => p.id === producto.id);

        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push(producto);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContador();
    });
});

function actualizarContador() {
    const contador = document.getElementById("contador-carrito");

    if (contador) {
        const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
        contador.textContent = total;
    }
}

actualizarContador();