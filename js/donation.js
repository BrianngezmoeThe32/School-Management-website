// Donation functionality
let currentDonationAmount = 0;

// Initialize donation page
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.donation-page')) {
        setupFAQ();
        setupDonationButtons();
        updateDonationProgress();
    }
});

// Setup FAQ functionality
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all FAQ answers
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('active');
            });
            
            document.querySelectorAll('.faq-question').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                answer.classList.add('active');
                this.classList.add('active');
            }
        });
    });
}

// Setup donation buttons
function setupDonationButtons() {
    // Tier donation buttons
    document.querySelectorAll('.tier-donate-btn').forEach(button => {
        button.addEventListener('click', function() {
            const amount = parseInt(this.getAttribute('data-amount'));
            donateNow(amount);
        });
    });
    
    // Quick amount buttons
    document.querySelectorAll('.amount-suggestion').forEach(button => {
        button.addEventListener('click', function() {
            const text = this.textContent;
            const amount = parseInt(text.replace('R ', '').replace(',', ''));
            setCustomAmount(amount);
        });
    });
    
    // Custom donation form
    const customAmountInput = document.getElementById('customAmount');
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            validateCustomAmount();
        });
        
        customAmountInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                donateCustom();
            }
        });
    }
}

// Set custom amount
function setCustomAmount(amount) {
    const input = document.getElementById('customAmount');
    if (input) {
        input.value = amount;
        validateCustomAmount();
    }
}

// Validate custom amount
function validateCustomAmount() {
    const input = document.getElementById('customAmount');
    const amount = parseInt(input.value);
    
    if (amount < 50) {
        input.style.borderColor = 'var(--error-red)';
        return false;
    } else {
        input.style.borderColor = 'var(--medium-gray)';
        return true;
    }
}

// Donate now function
function donateNow(amount) {
    currentDonationAmount = amount;
    openDonationModal();
}

// Donate custom amount
function donateCustom() {
    const input = document.getElementById('customAmount');
    const amount = parseInt(input.value);
    
    if (!validateCustomAmount()) {
        showNotification('Minimum donation amount is R 50', 'error');
        return;
    }
    
    if (isNaN(amount) || amount < 50) {
        showNotification('Please enter a valid amount (minimum R 50)', 'error');
        return;
    }
    
    currentDonationAmount = amount;
    openDonationModal();
}

// Open donation modal
function openDonationModal() {
    const modal = document.getElementById('donationModal');
    const amountDisplay = document.getElementById('donationAmountDisplay');
    
    amountDisplay.textContent = `R ${currentDonationAmount.toLocaleString()}`;
    modal.style.display = 'flex';
    
    // Reset form
    document.getElementById('donationForm').reset();
    document.getElementById('donationMessage').value = '';
    
    // Show card details by default
    document.getElementById('creditCard').checked = true;
    showPaymentDetails('credit');
}

// Close donation modal
function closeDonationModal() {
    document.getElementById('donationModal').style.display = 'none';
}

// Show payment details based on selection
function showPaymentDetails(paymentMethod) {
    const cardDetails = document.getElementById('cardDetails');
    
    if (paymentMethod === 'credit') {
        cardDetails.style.display = 'block';
    } else {
        cardDetails.style.display = 'none';
    }
}

// Update donation progress
function updateDonationProgress() {
    // In a real implementation, this would fetch from a server
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    
    // Simulated progress update
    const raised = 85250;
    const goal = 150000;
    const percentage = Math.round((raised / goal) * 100);
    
    progressFill.style.width = `${percentage}%`;
    progressPercentage.textContent = `${percentage}% of goal reached`;
    
    // Update stats
    document.querySelector('.stat-value:first-child').textContent = `R ${raised.toLocaleString()}`;
}

// Process donation form
document.addEventListener('DOMContentLoaded', function() {
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processDonation();
        });
        
        // Setup payment method toggle
        document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
            radio.addEventListener('change', function() {
                showPaymentDetails(this.value);
            });
        });
        
        // Format card number
        const cardNumberInput = document.getElementById('cardNumber');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})/g, '$1 ').trim();
                e.target.value = value.substring(0, 19);
            });
        }
        
        // Format expiry date
        const expiryInput = document.getElementById('cardExpiry');
        if (expiryInput) {
            expiryInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.substring(0, 5);
            });
        }
    }
});

// Process donation
function processDonation() {
    const name = document.getElementById('donorName').value;
    const email = document.getElementById('donorEmail').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Validate form
    if (!name || !email) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (paymentMethod === 'credit') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCVC = document.getElementById('cardCVC').value;
        
        if (!cardNumber || !cardExpiry || !cardCVC) {
            showNotification('Please fill in all card details', 'error');
            return;
        }
        
        if (cardNumber.replace(/\s/g, '').length !== 16) {
            showNotification('Please enter a valid 16-digit card number', 'error');
            return;
        }
    }
    
    // Show processing message
    showNotification('Processing your donation...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        // Save donation record (in real implementation, this would go to a server)
        const donationRecord = {
            amount: currentDonationAmount,
            name: name,
            email: email,
            date: new Date().toISOString(),
            anonymous: document.getElementById('anonymousDonation').checked,
            recurring: document.getElementById('recurringDonation').checked,
            message: document.getElementById('donationMessage').value
        };
        
        // Save to localStorage for demo purposes
        let donations = JSON.parse(localStorage.getItem('mafuDonations')) || [];
        donations.push(donationRecord);
        localStorage.setItem('mafuDonations', JSON.stringify(donations));
        
        // Update progress
        updateDonationProgress();
        
        // Show success message
        showNotification(`Thank you for your donation of R ${currentDonationAmount}! A receipt has been sent to ${email}`, 'success');
        
        // Close modal
        closeDonationModal();
        
        // Reset form
        document.getElementById('donationForm').reset();
        currentDonationAmount = 0;
        
        // Redirect to thank you page (optional)
        // window.location.href = 'thank-you.html';
        
    }, 2000);
}

// Show notification
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

// Add notification styles
const notificationStyle = document.createElement('style');
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