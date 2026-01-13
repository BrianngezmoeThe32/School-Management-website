// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainMenu = document.getElementById('mainMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mainMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mainMenu a').forEach(link => {
        link.addEventListener('click', () => {
            mainMenu.classList.remove('active');
        });
    });
    
    // Set active navigation based on current page
    setActiveNav();
    
    // Initialize cart if on store page
    if (document.querySelector('.store-section')) {
        initializeCart();
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        const loginModal = document.getElementById('loginModal');
        const donationModal = document.getElementById('donationModal');
        
        if (loginModal && e.target === loginModal) {
            closeLoginModal();
        }
        
        if (donationModal && e.target === donationModal) {
            closeDonationModal();
        }
    });
});

// Set active navigation link
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('#mainMenu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
        
        // Handle dropdown active state
        if (link.parentElement.classList.contains('dropdown')) {
            const dropdownLinks = link.nextElementSibling.querySelectorAll('a');
            dropdownLinks.forEach(dropdownLink => {
                if (currentPage === dropdownLink.getAttribute('href')) {
                    link.classList.add('active');
                    dropdownLink.classList.add('active');
                }
            });
        }
    });
}

// Shopping cart functionality
let cart = [];
let cartTotal = 0;

// Initialize shopping cart
function initializeCart() {
    cart = JSON.parse(localStorage.getItem('mafuCart')) || [];
    updateCartDisplay();
}

// Add item to cart
function addToCart(itemName, price, image = '') {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.name === itemName);
    
    if (existingItemIndex !== -1) {
        // Increase quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item
        cart.push({
            name: itemName,
            price: price,
            quantity: 1,
            image: image
        });
    }
    
    localStorage.setItem('mafuCart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification(`${itemName} added to cart!`);
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const totalAmount = document.getElementById('totalAmount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    }
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
            if (cartTotalElement) cartTotalElement.style.display = 'none';
            if (checkoutBtn) checkoutBtn.style.display = 'none';
        } else {
            let itemsHTML = '<div class="cart-items">';
            cartTotal = 0;
            
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                cartTotal += itemTotal;
                
                itemsHTML += `
                    <div class="cart-item">
                        <div>
                            <h4>${item.name}</h4>
                            <p>R ${item.price} each</p>
                        </div>
                        <div class="item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                        <div>
                            <p>R ${itemTotal}</p>
                            <button class="remove-btn" onclick="removeFromCart(${index})" style="background: none; border: none; color: var(--error-red); cursor: pointer;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
            
            itemsHTML += '</div>';
            cartItems.innerHTML = itemsHTML;
            
            if (cartTotalElement && totalAmount) {
                totalAmount.textContent = cartTotal.toFixed(2);
                cartTotalElement.style.display = 'block';
            }
            
            if (checkoutBtn) {
                checkoutBtn.style.display = 'block';
            }
        }
    }
}

// Update item quantity
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        // Remove item if quantity is 0 or less
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('mafuCart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

// Remove item from cart
function removeFromCart(index) {
    if (cart[index]) {
        const itemName = cart[index].name;
        cart.splice(index, 1);
        localStorage.setItem('mafuCart', JSON.stringify(cart));
        updateCartDisplay();
        showNotification(`${itemName} removed from cart`);
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty.', 'error');
        return;
    }
    
    // Simulate payment processing
    showNotification('Processing payment...', 'info');
    
    setTimeout(() => {
        // Clear cart after successful "payment"
        localStorage.removeItem('mafuCart');
        cart = [];
        updateCartDisplay();
        showNotification(`Payment successful! Total: R ${cartTotal.toFixed(2)}. Thank you for your purchase!`, 'success');
        
        // In a real implementation, this would redirect to a payment gateway
        // window.location.href = 'payment-gateway.html';
    }, 2000);
}

// Show notification (compatible with both pages)
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = 'var(--success-green)';
    } else if (type === 'error') {
        notification.style.backgroundColor = 'var(--error-red)';
    } else {
        notification.style.backgroundColor = 'var(--navy-blue)';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification styles if not already added
if (!document.querySelector('#notification-styles')) {
    const notificationStyle = document.createElement('style');
    notificationStyle.id = 'notification-styles';
    notificationStyle.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    `;
    document.head.appendChild(notificationStyle);
}