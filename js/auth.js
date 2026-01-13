// Login functionality
let currentUserType = 'staff';

// Initialize login page
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.login-page')) {
        setupLoginForm();
    }
});

// Show login form
function showLoginForm(userType) {
    currentUserType = userType;
    
    // Update form title and description
    const titles = {
        'staff': 'Staff & Principal Portal',
        'teacher': 'Teacher Portal',
        'parent': 'Parent Portal',
        'learner': 'Learner Portal'
    };
    
    const descriptions = {
        'staff': 'Access administrative tools and student records',
        'teacher': 'Upload materials, record grades, and manage classes',
        'parent': 'Monitor your child\'s progress and communicate with teachers',
        'learner': 'Access learning materials and submit assignments'
    };
    
    const icons = {
        'staff': 'fa-user-tie',
        'teacher': 'fa-chalkboard-teacher',
        'parent': 'fa-users',
        'learner': 'fa-graduation-cap'
    };
    
    // Update display
    document.getElementById('loginFormTitle').textContent = titles[userType];
    document.getElementById('userTypeDisplay').textContent = titles[userType];
    document.getElementById('userTypeDescription').textContent = descriptions[userType];
    document.getElementById('userTypeIcon').className = `fas ${icons[userType]}`;
    
    // Show/hide grade field for learners
    const gradeField = document.getElementById('learnerGradeField');
    if (userType === 'learner') {
        gradeField.style.display = 'block';
    } else {
        gradeField.style.display = 'none';
    }
    
    // Show form section
    document.getElementById('loginFormSection').style.display = 'flex';
    
    // Scroll to form
    document.getElementById('loginFormSection').scrollIntoView({ behavior: 'smooth' });
}

// Hide login form
function hideLoginForm() {
    document.getElementById('loginFormSection').style.display = 'none';
}

// Setup login form
function setupLoginForm() {
    // Toggle password visibility
    const togglePasswordBtn = document.querySelector('.toggle-password');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    }
    
    // Form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', processLogin);
    }
}

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('loginPassword');
    const toggleIcon = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

// Process login
function processLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Basic validation
    if (!email || !password) {
        showNotification('Please enter both email and password', 'error');
        return;
    }
    
    if (currentUserType === 'learner') {
        const grade = document.getElementById('learnerGrade').value;
        if (!grade) {
            showNotification('Please select your grade', 'error');
            return;
        }
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.login-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real implementation, this would validate against a server
        // For demo purposes, simulate successful login
        const userData = {
            type: currentUserType,
            email: email,
            name: email.split('@')[0].replace('.', ' '),
            grade: currentUserType === 'learner' ? document.getElementById('learnerGrade').value : null,
            lastLogin: new Date().toISOString()
        };
        
        // Save user session
        localStorage.setItem('mafuUser', JSON.stringify(userData));
        localStorage.setItem('mafuLoggedIn', 'true');
        
        // Show success message
        showNotification(`Successfully logged in as ${currentUserType}!`, 'success');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Redirect based on user type
        setTimeout(() => {
            switch(currentUserType) {
                case 'staff':
                    window.location.href = 'dashboard-staff.html';
                    break;
                case 'teacher':
                    window.location.href = 'dashboard-teacher.html';
                    break;
                case 'parent':
                    window.location.href = 'dashboard-parent.html';
                    break;
                case 'learner':
                    window.location.href = 'dashboard-learner.html';
                    break;
                default:
                    window.location.href = 'index.html';
            }
        }, 1000);
        
    }, 1500);
}

// Check login status
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('mafuLoggedIn') === 'true';
    
    if (isLoggedIn) {
        const userData = JSON.parse(localStorage.getItem('mafuUser'));
        
        // Update UI for logged in users
        const loginBtn = document.querySelector('.login-nav-btn');
        if (loginBtn) {
            loginBtn.innerHTML = `
                <i class="fas fa-user-circle"></i> ${userData.name}
                <i class="fas fa-chevron-down"></i>
            `;
            loginBtn.href = '#';
            loginBtn.onclick = showUserMenu;
        }
    }
}

// Show user menu
function showUserMenu() {
    // Create user menu
    const userMenu = document.createElement('div');
    userMenu.className = 'user-menu';
    userMenu.style.cssText = `
        position: absolute;
        top: 60px;
        right: 20px;
        background: var(--white);
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        min-width: 200px;
        z-index: 1000;
        overflow: hidden;
    `;
    
    const userData = JSON.parse(localStorage.getItem('mafuUser'));
    
    userMenu.innerHTML = `
        <div class="user-info">
            <div class="user-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div>
                <h4>${userData.name}</h4>
                <p>${userData.type.charAt(0).toUpperCase() + userData.type.slice(1)}</p>
                ${userData.grade ? `<p>Grade ${userData.grade}</p>` : ''}
            </div>
        </div>
        <div class="user-menu-items">
            <a href="#" class="user-menu-item">
                <i class="fas fa-tachometer-alt"></i> Dashboard
            </a>
            <a href="#" class="user-menu-item">
                <i class="fas fa-cog"></i> Settings
            </a>
            <a href="#" class="user-menu-item">
                <i class="fas fa-question-circle"></i> Help
            </a>
            <div class="user-menu-divider"></div>
            <a href="#" class="user-menu-item logout" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        </div>
    `;
    
    // Remove existing menu
    const existingMenu = document.querySelector('.user-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    document.body.appendChild(userMenu);
    
    // Add styles
    const menuStyle = document.createElement('style');
    menuStyle.textContent = `
        .user-info {
            padding: 15px;
            background: var(--navy-blue);
            color: var(--white);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .user-avatar {
            font-size: 30px;
        }
        
        .user-info h4 {
            margin: 0 0 5px 0;
        }
        
        .user-info p {
            margin: 0;
            font-size: 12px;
            opacity: 0.8;
        }
        
        .user-menu-items {
            padding: 10px 0;
        }
        
        .user-menu-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 15px;
            color: var(--navy-blue);
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .user-menu-item:hover {
            background: rgba(255, 215, 0, 0.1);
            color: var(--navy-blue);
        }
        
        .user-menu-item.logout {
            color: var(--error-red);
        }
        
        .user-menu-divider {
            height: 1px;
            background: var(--light-gray);
            margin: 10px 0;
        }
    `;
    document.head.appendChild(menuStyle);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!e.target.closest('.user-menu') && !e.target.closest('.login-nav-btn')) {
                userMenu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

// Logout function
function logout() {
    localStorage.removeItem('mafuUser');
    localStorage.removeItem('mafuLoggedIn');
    
    showNotification('Successfully logged out', 'success');
    
    // Update UI
    const loginBtn = document.querySelector('.login-nav-btn');
    if (loginBtn) {
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        loginBtn.href = 'login.html';
        loginBtn.onclick = null;
    }
    
    // Remove user menu
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.remove();
    }
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Show notification (reused from donation.js)
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

// Check login status on page load
document.addEventListener('DOMContentLoaded', checkLoginStatus);