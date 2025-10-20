const products = [
    { id: 1, name: "Sneakers", price: 250000, image: "assets/shoes.jpg" },
    { id: 2, name: "Hoodie", price: 300000, image: "assets/hoodie.jpg" },
    { id: 3, name: "Topi Keren", price: 150000, image: "assets/hat.jpg" },
    { id: 4, name: "Tas Stylish", price: 400000, image: "assets/bag.jpg" },
  ];
  
  let cart = [];
  
  // Tampilkan produk
  const productList = document.getElementById("product-list");
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Rp${product.price.toLocaleString()}</p>
      <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
    `;
    productList.appendChild(card);
  });
  
  // Tambah ke keranjang
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
  
    if (item) {
      item.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    updateCart();
  }
  
  // Tampilkan isi keranjang
  function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const cartCount = document.getElementById("cart-count");
  
    cartItems.innerHTML = "";
    let total = 0;
    let totalQty = 0;
  
    cart.forEach(item => {
      total += item.price * item.qty;
      totalQty += item.qty;
  
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} x ${item.qty} - Rp${(item.price * item.qty).toLocaleString()}
        <button onclick="removeFromCart(${item.id})">❌</button>
      `;
      cartItems.appendChild(li);
    });
  
    totalPrice.textContent = `Rp${total.toLocaleString()}`;
    cartCount.textContent = totalQty;
  }
  
  // Hapus item
  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
  }
  
  // Tampilkan keranjang
  const cartBtn = document.getElementById("cart-btn");
  const cartOverlay = document.getElementById("cart-overlay");
  const closeCart = document.getElementById("close-cart");
  
  cartBtn.addEventListener("click", () => {
    cartOverlay.style.display = "flex";
  });
  
  closeCart.addEventListener("click", () => {
    cartOverlay.style.display = "none";
  });
  
  // Checkout
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Keranjang kosong!");
      return;
    }
    alert("Checkout berhasil! Terima kasih 😊");
    cart = [];
    updateCart();
    cartOverlay.style.display = "none";
  });
  