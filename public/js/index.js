(function () {
  const socket = io();
  document.getElementById("addProduct").addEventListener("submit", (event) => {
    event.preventDefault();
    const newProduct = {
      title: document.getElementById("input-title").value,
      description: document.getElementById("input-description").value,
      code: document.getElementById("input-code").value,
      price: document.getElementById("input-price").value,
      stock: document.getElementById("input-stock").value,
      category: document.getElementById("input-category").value,
    };
    socket.emit("addProduct", newProduct);
  });
  socket.on("listProducts", (products) => {
    const divProducts = document.getElementById("divRealTimeProducts");
    console.log(divProducts);
    console.log(products);
    divProducts.innerText = "";
    console.log(products);
    products.forEach((p) => {
      const productElement = document.createElement("div");
      productElement.innerHTML = `
        <h3>${p.title}</h3>
        <p>Description: ${p.description}</p>
        <p>Price: ${p.price}</p>
        <p>Stock: ${p.stock}</p>
        <p id="idProd">Id:${p.id}</p>
        `;
      divProducts.appendChild(productElement);
    });
  });
})();
console.log("hola desde el real time products");
