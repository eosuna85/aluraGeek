document.addEventListener('DOMContentLoaded', () => {
    let contenedorProducto = document.querySelector('.contenedor__productos');
    let btnEnviar = document.querySelector('.btn__enviar');
    let btnLimpiar = document.querySelector('.btn__limpiar');

    const cargarProductos = () => {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.forEach(producto => {
            agregarProductoAlDOM(producto);
        });
    };

    const agregarProductoAlDOM = (producto) => {
        let productoDiv = document.createElement('div');
        productoDiv.classList.add('contenedor__card');
        productoDiv.innerHTML = `
          <img class="img__producto" src="${producto.imagen}" alt="producto">
          <p class="nombre__producto">${producto.nombre}</p>
          <div class="contenedor__card-contenido">
            <p class="precio__producto">$ ${producto.precio}</p>
            <img class="img__eliminar" src="img/vector.png" alt="img eliminar">
          </div>
        `;

        productoDiv.querySelector('.img__eliminar').addEventListener('click', () => {
            eliminarProducto(producto, productoDiv);
        });

        let contenedorCardJs = document.querySelector('.contenedor__card-js');
        if (!contenedorCardJs) {
            contenedorCardJs = document.createElement('div');
            contenedorCardJs.classList.add('contenedor__card-js');
            contenedorProducto.appendChild(contenedorCardJs);
        }
        contenedorCardJs.appendChild(productoDiv);
    };

    const eliminarProducto = (producto, productoDiv) => {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos = productos.filter(p => p.nombre !== producto.nombre || p.precio !== producto.precio || p.imagen !== producto.imagen);
        localStorage.setItem('productos', JSON.stringify(productos));
        productoDiv.remove();
    };

    const AgregarProductos = (e) => {
        e.preventDefault();

        let inputNombre = document.querySelector('.input__nombre').value;
        let inputPrecio = document.querySelector('.input__precio').value;
        let inputImagen = document.querySelector('.input__imagen').value;

        let nuevoProducto = {
            nombre: inputNombre,
            precio: inputPrecio,
            imagen: inputImagen
        };

        agregarProductoAlDOM(nuevoProducto);

        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.push(nuevoProducto);
        localStorage.setItem('productos', JSON.stringify(productos));

        // Limpiar los campos del formulario después de agregar el producto
        document.querySelector('.input__nombre').value = '';
        document.querySelector('.input__precio').value = '';
        document.querySelector('.input__imagen').value = '';
    };

    const limpiarProductos = () => {
        localStorage.removeItem('productos');
        contenedorProducto.innerHTML = '';
    };

    btnEnviar.addEventListener('click', AgregarProductos);
    btnLimpiar.addEventListener('click', limpiarProductos);

    // Cargar productos al iniciar la página
    cargarProductos();
});
