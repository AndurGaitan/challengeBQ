// Obtén una referencia al botón de "Agregar al carrito" y agrega un event listener
const addToCartButton = document.getElementById('addToCartButton'); // Asegúrate de que el botón tenga un ID adecuado en tu plantilla Handlebars

addToCartButton.addEventListener('click', () => {
  const productId = obtenerProductId(); // Implementa la lógica para obtener el ID del producto
  if (productId) {
    addToCart(productId);
  }
});

function obtenerProductId() {
  // Implementa la lógica para obtener el ID del producto (puede ser desde un atributo data en el botón o de alguna otra manera)
    // Supongamos que el botón tiene un atributo data-product-id que contiene el ID del producto
    const addToCartButton = document.getElementById('addToCartButton');
    const productId = addToCartButton.getAttribute('data-product-id');
  
    if (productId) {
      return productId;
    } else {
      console.error('No se pudo obtener el ID del producto');
      return null; // Devuelve null o algún valor que indique que no se pudo obtener el ID
    }
  }
  

function addToCart(productId) {
  // Realiza una solicitud Fetch al servidor para agregar el producto al carrito
  fetch(`/api/addToCart/${productId}`, {
    method: 'POST', // Utiliza el método HTTP adecuado para agregar un producto al carrito
  })
    .then((response) => {
      if (response.ok) {
        // La solicitud se completó con éxito, puedes actualizar la vista del carrito aquí
        actualizarVistaCarrito();
      } else {
        console.error('Error al agregar el producto al carrito');
      }
    })
    .catch((error) => {
      console.error('Error de red:', error);
    });
}

function actualizarVistaCarrito() {
    // Realiza una solicitud Fetch para obtener la información actualizada del carrito desde el servidor
    fetch('/api/getCart')
      .then((response) => {
        if (response.ok) {
          return response.json(); // Suponiendo que el servidor responde con datos del carrito en formato JSON
        } else {
          throw new Error('Error al obtener el carrito del servidor');
        }
      })
      .then((carrito) => {
        // Una vez que obtengas los datos del carrito, actualiza la vista
        const carritoContainer = document.getElementById('carritoContainer'); // Suponiendo que tienes un contenedor en tu HTML para mostrar el carrito
        carritoContainer.innerHTML = ''; // Borra el contenido actual del contenedor
  
        if (carrito.length === 0) {
          carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
          // Si el carrito no está vacío, crea elementos para mostrar los productos en el carrito
          carrito.forEach((producto) => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto-en-carrito');
  
            // Aquí puedes agregar el contenido del producto, como nombre, precio, cantidad, etc., al elemento
            // Ejemplo:
            productoElement.innerHTML = `
              <p>${producto.nombre}</p>
              <p>Precio: $${producto.precio}</p>
              <p>Cantidad: ${producto.cantidad}</p>
            `;
  
            carritoContainer.appendChild(productoElement);
          });
        }
      })
      .catch((error) => {
        console.error('Error al actualizar la vista del carrito:', error);
      });
  }
  