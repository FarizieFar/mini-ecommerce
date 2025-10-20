const USERNAME = "admin";
const PASSWORD = "12345";

function loginAdmin() {
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;
  const errorText = document.getElementById('login-error');

  if (username === USERNAME && password === PASSWORD) {
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-dashboard').classList.remove('hidden');
    loadProducts();
  } else {
    errorText.textContent = "Username atau password salah!";
  }
}

function logoutAdmin() {
  document.getElementById('admin-login').classList.remove('hidden');
  document.getElementById('admin-dashboard').classList.add('hidden');
}

function addProduct() {
  const name = document.getElementById('new-product-name').value;
  const price = document.getElementById('new-product-price').value;
  const image = document.getElementById('new-product-image').value;

  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.push({ name, price, image });
  localStorage.setItem('products', JSON.stringify(products));

  document.getElementById('new-product-name').value = '';
  document.getElementById('new-product-price').value = '';
  document.getElementById('new-product-image').value = '';

  loadProducts();
}

function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  loadProducts();
}

function loadProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const tableBody = document.getElementById('product-list-admin');
  tableBody.innerHTML = '';

  products.forEach((product, index) => {
    const row = `
      <tr>
        <td>${product.name}</td>
        <td>Rp ${product.price}</td>
        <td><img src="${product.image}" alt="${product.name}" width="50"></td>
        <td><button onclick="deleteProduct(${index})">Hapus</button></td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}
