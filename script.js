// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "High-quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Feature-rich smartwatch with health monitoring."
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        category: "clothing",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Comfortable 100% cotton t-shirt available in multiple colors."
    },
    {
        id: 4,
        name: "Denim Jeans",
        category: "clothing",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Classic fit denim jeans with stretch technology."
    },
    {
        id: 5,
        name: "Coffee Maker",
        category: "home",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Programmable coffee maker with 12-cup capacity."
    },
    {
        id: 6,
        name: "Blender",
        category: "home",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "High-powered blender for smoothies and food preparation."
    },
    {
        id: 7,
        name: "Wireless Earbuds",
        category: "electronics",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "True wireless earbuds with 24-hour battery life."
    },
    {
        id: 8,
        name: "Running Shoes",
        category: "clothing",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Lightweight running shoes with cushioned soles."
    },
    {
        id: 9,
        name: "Desk Lamp",
        category: "home",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Adjustable LED desk lamp with multiple brightness levels."
    },
    {
        id: 10,
        name: "Backpack",
        category: "clothing",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Durable backpack with laptop compartment and multiple pockets."
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const sortBy = document.getElementById('sort-by');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartCount = document.querySelector('.cart-count');

// Display Products
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
        return;
    }
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <span class="product-category">${product.category}</span>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Filter Products
function filterProducts() {
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Filter by price
    if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }
    
    // Sort products
    sortProducts(filteredProducts);
}

// Sort Products
function sortProducts(productsToSort) {
    const sortValue = sortBy.value;
    
    switch (sortValue) {
        case 'price-asc':
            productsToSort.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            productsToSort.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            productsToSort.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            productsToSort.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Default sorting (by ID)
            productsToSort.sort((a, b) => a.id - b.id);
    }
    
    displayProducts(productsToSort);
}

// Add to Cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification();
}

// Update Cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalAmount.textContent = totalAmount.toFixed(2);
    
    // Update cart items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
            </div>
            <span class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Increase Quantity
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

// Decrease Quantity
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCart();
    }
}

// Remove Item
function removeItem(e) {
    const productId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Show Cart Notification
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Item added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Initialize the Page
function init() {
    // Display all products initially
    displayProducts(products);
    
    // Event listeners for filters
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    sortBy.addEventListener('change', filterProducts);
    
    // Cart modal
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Thank you for your purchase! Your order has been placed.');
            cart = [];
            updateCart();
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            alert('Your cart is empty. Please add some items before checking out.');
        }
    });
    
    // Newsletter form
    document.querySelector('.newsletter form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        if (email) {
            alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
            e.target.querySelector('input').value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Initialize the page when loaded
document.addEventListener('DOMContentLoaded', init);