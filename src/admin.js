
function removeProduct(productId) {
    console.log(`Attempting to remove product with ID: ${productId}`); // Debug log

    let products = JSON.parse(localStorage.getItem('products')) || [];

    const updatedProducts = products.filter((product) => {
        console.log(`Checking product with ID: ${product.id}`);
        return product.id !== productId; 
    });

    if (updatedProducts.length === products.length) {
        console.error(`Product with ID ${productId} not found!`);
    } else {
        console.log(`Product with ID ${productId} removed!`);
    }

    localStorage.setItem('products', JSON.stringify(updatedProducts));
    displayProducts();
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();


    document.getElementById('addProductForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const productName = document.getElementById('product-name').value;
        const price = document.getElementById('price').value;
        const imageFile = document.getElementById('image').files[0];

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageBase64 = event.target.result;

            const product = {
                id: `${Date.now()}`, // Use string for consistency
                name: productName,
                price: `₱${parseInt(price).toLocaleString()}`,
                image: imageBase64
            };

            const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
            existingProducts.push(product);
            localStorage.setItem('products', JSON.stringify(existingProducts));


            document.getElementById('addProductForm').reset();
            displayProducts();
        };
        reader.readAsDataURL(imageFile);
    });
});


function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = '';

    products.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" width="50"></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <button class="remove-btn">Remove</button>
            </td>
        `;
        productTableBody.appendChild(row);

        row.querySelector('.remove-btn').addEventListener('click', () => {
            removeProduct(product.id);
        });
    });
}
