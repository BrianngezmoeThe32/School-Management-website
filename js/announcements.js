// Announcements data
const announcements = [
    {
        id: 1,
        title: "Term 4 Examination Schedule",
        content: "The examination timetable for all grades has been published. Please check your portal for detailed schedules. Examinations will begin on November 20th and conclude on December 8th. Students are advised to prepare adequately and ensure they have all necessary materials.",
        category: "academic",
        date: "2023-11-15",
        author: "Academic Office"
    },
    {
        id: 2,
        title: "Parent-Teacher Meeting",
        content: "The quarterly parent-teacher meeting is scheduled for December 20, 2023 at the school hall. Meetings will be conducted from 2:00 PM to 6:00 PM. Parents are requested to book their time slots through the school portal. This is an important opportunity to discuss your child's progress.",
        category: "events",
        date: "2023-11-10",
        author: "Principal's Office"
    },
    {
        id: 3,
        title: "Matric Results Celebration",
        content: "Join us as we celebrate the outstanding achievements of our 2023 matric class on January 5th, 2024. The ceremony will take place at the school hall starting at 10:00 AM. All parents, students, and community members are welcome to attend this special occasion.",
        category: "events",
        date: "2023-11-05",
        author: "Events Committee"
    },
    {
        id: 4,
        title: "Sports Day 2023",
        content: "Annual Sports Day will be held on November 25th. All students are expected to participate. Events include athletics, soccer, netball, and various track events. Parents are welcome to attend and support our athletes. Please ensure students have appropriate sports attire.",
        category: "sports",
        date: "2023-10-28",
        author: "Sports Department"
    },
    {
        id: 5,
        title: "School Fees Payment Reminder",
        content: "This is a reminder that the final installment of school fees for 2023 is due by November 30th. Payments can be made through the school portal, bank transfer, or at the finance office. Please ensure timely payment to avoid inconvenience.",
        category: "important",
        date: "2023-10-25",
        author: "Finance Department"
    },
    {
        id: 6,
        title: "New Computer Lab Opening",
        content: "We are pleased to announce the opening of our new computer lab on December 1st. The lab features 50 new computers with the latest software. This facility will enhance our digital literacy program and provide students with better learning resources.",
        category: "academic",
        date: "2023-10-20",
        author: "IT Department"
    },
    {
        id: 7,
        title: "Career Guidance Workshop",
        content: "A career guidance workshop for Grade 11 and 12 students will be held on November 30th. Representatives from various universities and colleges will be present. Students will have the opportunity to learn about different career paths and application processes.",
        category: "academic",
        date: "2023-10-15",
        author: "Guidance Department"
    },
    {
        id: 8,
        title: "Library Renovation Complete",
        content: "The school library renovation has been completed. The library now features a new reading area, increased seating capacity, and additional books. Students are encouraged to make use of this improved facility for their studies and research.",
        category: "general",
        date: "2023-10-10",
        author: "Library Department"
    }
];

// Load announcements on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.announcements-container')) {
        loadAnnouncements('all');
        setupAnnouncementFilters();
    }
});

// Load announcements
function loadAnnouncements(category = 'all') {
    const container = document.getElementById('announcementsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const filteredAnnouncements = category === 'all' 
        ? announcements 
        : announcements.filter(a => a.category === category);
    
    if (filteredAnnouncements.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px;">No announcements found in this category.</p>';
        return;
    }
    
    filteredAnnouncements.forEach(announcement => {
        const announcementElement = createAnnouncementElement(announcement);
        container.appendChild(announcementElement);
    });
}

// Create announcement element
function createAnnouncementElement(announcement) {
    const div = document.createElement('div');
    div.className = 'announcement-item';
    
    const categoryColors = {
        academic: '#001f3f',
        events: '#FFD700',
        sports: '#28a745',
        important: '#dc3545',
        general: '#6c757d'
    };
    
    const formattedDate = new Date(announcement.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    div.innerHTML = `
        <div class="announcement-category" style="background-color: ${categoryColors[announcement.category] || '#001f3f'}">
            ${announcement.category.toUpperCase()}
        </div>
        <h3>${announcement.title}</h3>
        <p class="announcement-date"><i class="far fa-calendar"></i> ${formattedDate} | <i class="far fa-user"></i> ${announcement.author}</p>
        <p>${announcement.content}</p>
    `;
    
    return div;
}

// Filter announcements
function filterAnnouncements(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Load announcements for selected category
    loadAnnouncements(category);
}

// Setup filter buttons
function setupAnnouncementFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterAnnouncements(this.textContent.toLowerCase().replace(' announcements', '').trim());
        });
    });
}

// Load more announcements
function loadMoreAnnouncements() {
    // In a real implementation, this would load more announcements from a server
    // For demo purposes, we'll just show a message
    showNotification('Loading more announcements...', 'info');
    
    setTimeout(() => {
        showNotification('All announcements are currently displayed.', 'info');
    }, 1000);
}

// Submit new announcement (for staff only)
function submitAnnouncement() {
    const title = document.getElementById('announcementTitle').value;
    const category = document.getElementById('announcementCategory').value;
    const content = document.getElementById('announcementContent').value;
    
    if (!title || !content) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Get user info
    const userType = localStorage.getItem('mafuUserType');
    const userEmail = localStorage.getItem('mafuUserEmail');
    
    if (userType !== 'staff' && userType !== 'teacher') {
        showNotification('Only staff members can submit announcements.', 'error');
        return;
    }
    
    // Create new announcement
    const newAnnouncement = {
        id: announcements.length + 1,
        title: title,
        content: content,
        category: category,
        date: new Date().toISOString().split('T')[0],
        author: userEmail || 'Staff Member'
    };
    
    // Add to beginning of announcements array
    announcements.unshift(newAnnouncement);
    
    // Clear form
    document.getElementById('announcementTitle').value = '';
    document.getElementById('announcementContent').value = '';
    
    // Reload announcements
    loadAnnouncements('all');
    
    showNotification('Announcement submitted successfully!', 'success');
}