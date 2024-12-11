// Display products on the user page
function displayProducts() {
    const productContainer = document.getElementById('product_list');
    productContainer.innerHTML = '';

    const products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product_card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product_img">
            <h3 class="product_name">${product.name}</h3>
            <p class="product_price">${product.price}</p>
            <button class="add_to_cart" data-id="${product.id}">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });

    document.querySelectorAll('.add_to_cart').forEach((button) => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

// Update cart badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-badge').textContent = totalItems;
}

// Display cart in pop-up
function displayCart() {
    const cartTableBody = document.getElementById('cartTableBody');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartTableBody.innerHTML = '';

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;">
            </td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <button class="decrease" data-index="${index}">-</button>
                ${item.quantity}
                <button class="increase" data-index="${index}">+</button>
            </td>
            <td>
                <button class="remove" data-index="${index}">Remove</button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });

    attachCartActions();
}


// Attach actions to cart buttons
function attachCartActions() {
    document.querySelectorAll('.increase').forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            updateCartQuantity(index, 1);
        });
    });

    document.querySelectorAll('.decrease').forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            updateCartQuantity(index, -1);
        });
    });

    document.querySelectorAll('.remove').forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

// Update cart badge
function updateCartQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartBadge();
}

// Remove product from cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartBadge();
}

// Pop-up Cart
const openPopup = document.getElementById('open_pop_up');
const closePopup = document.getElementById('close_Pop_up');
const popup = document.getElementById('pop_up');

openPopup.addEventListener('click', () => {
    displayCart();
    popup.classList.remove('hidden');
});

closePopup.addEventListener('click', () => popup.classList.add('hidden'));

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartBadge();
});

//check out
const checkOut = document.getElementById('checkOut');

checkOut.addEventListener('click', () => {
     //debug this!!

    if(cart.length === 0){
        alert('Your cart is empty');
    }
    else{
        const cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Products is checked out');
    }


    displayCart();
    updateCartBadge();
});