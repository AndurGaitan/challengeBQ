function addToCart(productId) {
  // Enviar una solicitud POST al servidor para agregar el producto al carrito
  fetch(`/api/carts/${cartId}/products`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId }) // Enviar el ID del producto en el cuerpo de la solicitud
  })
  .then(response => response.json()) // Convertir la respuesta a JSON
  .then(data => {
      if (data.status === 'success') {
          // Si el producto se agregó correctamente, mostrar un mensaje de éxito
          alert('Producto agregado al carrito');
      } else {
          // Si hubo un error al agregar el producto, mostrar un mensaje de error
          alert('Hubo un error al agregar el producto al carrito');
      }
  })
  .catch(error => {
      // Capturar y manejar errores en caso de problemas con la solicitud
      console.error('Error:', error);
      alert('Hubo un error al agregar el producto al carrito');
  });
}