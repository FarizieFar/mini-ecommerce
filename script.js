const products = [
    // Fashion
    { id: 1, name: "Sneakers Putih", price: 250000, image: "assets/shoes.jpg", category: "Fashion" },
    { id: 2, name: "Hoodie Hitam", price: 300000, image: "assets/hoodie.jpeg", category: "Fashion" },
    { id: 3, name: "Topi Baseball", price: 150000, image: "assets/hat.jpeg", category: "Fashion" },
    { id: 4, name: "Tas Stylish", price: 400000, image: "assets/bag.jpeg", category: "Fashion" },
    { id: 5, name: "Jaket Denim", price: 350000, image: "assets/jacket.jpeg", category: "Fashion" },
  
    // Elektronik
    { id: 6, name: "Laptop Pro", price: 8500000, image: "assets/laptop.jpeg", category: "Elektronik" },
    { id: 7, name: "Smartphone X", price: 3500000, image: "assets/phone.jpeg", category: "Elektronik" },
    { id: 8, name: "Earbuds Bluetooth", price: 300000, image: "assets/earbuds.jpeg", category: "Elektronik" },
    { id: 9, name: "Keyboard Mechanical", price: 750000, image: "assets/keyboard.jpeg", category: "Elektronik" },
    { id: 10, name: "Mouse Gaming", price: 350000, image: "assets/mouse.jpeg", category: "Elektronik" },
  
    // Buku
    { id: 11, name: "Buku Pemrograman", price: 120000, image: "assets/book.jpeg", category: "Buku" },
    { id: 12, name: "Novel Inspiratif", price: 90000, image: "assets/novel.jpeg", category: "Buku" },
    { id: 13, name: "Komik Lucu", price: 75000, image: "assets/comic.jpeg", category: "Buku" },
    { id: 14, name: "Ensiklopedia Mini", price: 200000, image: "assets/encyclopedia.jpeg", category: "Buku" },
    { id: 15, name: "Majalah Tekno", price: 50000, image: "assets/magazine.jpeg", category: "Buku" },
  
    // Aksesoris
    { id: 16, name: "Jam Tangan Sport", price: 500000, image: "assets/watch.jpeg", category: "Aksesoris" },
    { id: 17, name: "Kacamata Hitam", price: 200000, image: "assets/glasses.jpeg", category: "Aksesoris" },
    { id: 18, name: "Cincin Titanium", price: 175000, image: "assets/ring.jpeg", category: "Aksesoris" },
    { id: 19, name: "Gelang Kulit", price: 150000, image: "assets/bracelet.jpeg", category: "Aksesoris" },
    { id: 20, name: "Dompet Kulit", price: 300000, image: "assets/wallet.jpeg", category: "Aksesoris" }
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
  