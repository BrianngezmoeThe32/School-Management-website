// Awards System 2026
let awardsData = {};
let currentCertificate = null;

// Sample awards data
const sampleAwards = {
    2026: {
        categories: {
            academic: [
                { id: '2026-dux', name: 'Dux Scholar', recipient: 'Isabella Taylor', grade: 12, 
                  achievement: 'Highest overall average', score: 98.2, prize: 'Trophy + R5000' },
                { id: '2026-g8-top', name: 'Top Grade 8', recipient: 'Sarah Johnson', grade: 8,
                  achievement: 'Top academic performer', score: 96.5, prize: 'Trophy + R2000' },
                { id: '2026-g9-top', name: 'Top Grade 9', recipient: 'David Williams', grade: 9,
                  achievement: 'Top academic performer', score: 97.1, prize: 'Trophy + R2000' },
                { id: '2026-g10-top', name: 'Top Grade 10', recipient: 'Emma Thompson', grade: 10,
                  achievement: 'Top academic performer', score: 96.8, prize: 'Trophy + R2000' },
                { id: '2026-g11-top', name: 'Top Grade 11', recipient: 'Daniel Brown', grade: 11,
                  achievement: 'Top academic performer', score: 97.5, prize: 'Trophy + R2000' }
            ],
            improved: [
                { id: '2026-most-improved', name: 'Most Improved', recipient: 'Amina Patel', grade: 8,
                  achievement: 'Greatest academic improvement', improvement: 15.3, prize: 'Medal + R1000' }
            ],
            leadership: [
                { id: '2026-leadership', name: 'Leadership Award', recipient: 'Mia Anderson', grade: 12,
                  achievement: 'Student Council President', score: 96.9, prize: 'Plaque + R1500' }
            ]
        }
    }
};

// Initialize awards system
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.awards-page') || document.querySelector('.archive-page')) {
        initializeAwards();
    }
});

function initializeAwards() {
    // Load awards data
    loadAwardsData();
    
    // Setup event listeners for awards page
    if (document.querySelector('.awards-page')) {
        setupAwardsPage();
        loadAwardsTable();
        initializeAwardsChart();
    }
    
    // Setup event listeners for archive page
    if (document.querySelector('.archive-page')) {
        setupArchivePage();
        initializeHistoricalChart();
    }
}

function loadAwardsData() {
    const savedData = localStorage.getItem('mafuAwardsData');
    if (savedData) {
        awardsData = JSON.parse(savedData);
    } else {
        awardsData = sampleAwards;
        saveAwardsData();
    }
}

function saveAwardsData() {
    localStorage.setItem('mafuAwardsData', JSON.stringify(awardsData));
}

function setupAwardsPage() {
    // Grade filter buttons
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const grade = this.getAttribute('data-grade');
            filterAwardsByGrade(grade);
        });
    });
    
    // Certificate view buttons
    document.querySelectorAll('.view-certificate').forEach(btn => {
        btn.addEventListener('click', function() {
            const certId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            viewCertificate(certId);
        });
    });
}

function loadAwardsTable() {
    const tableBody = document.getElementById('awardsTableBody');
    tableBody.innerHTML = '';
    
    // Combine all awards
    const allAwards = [];
    Object.values(awardsData[2026].categories).forEach(category => {
        allAwards.push(...category);
    });
    
    // Sort by grade then by award type
    allAwards.sort((a, b) => {
        if (a.grade !== b.grade) return a.grade - b.grade;
        return a.name.localeCompare(b.name);
    });
    
    // Add to table
    allAwards.forEach(award => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${award.name}</strong></td>
            <td>${award.recipient}</td>
            <td>Grade ${award.grade}</td>
            <td>${award.achievement}</td>
            <td>${award.score ? `${award.score}%` : award.improvement ? `+${award.improvement}%` : 'N/A'}</td>
            <td>${award.prize}</td>
            <td>
                <button class="certificate-btn" onclick="viewCertificate('${award.id}')">
                    <i class="fas fa-certificate"></i> View
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filterAwardsByGrade(grade) {
    const tableBody = document.getElementById('awardsTableBody');
    const rows = tableBody.querySelectorAll('tr');
    
    // Update active button
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-grade') === grade) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide rows based on grade
    rows.forEach(row => {
        const gradeCell = row.cells[2];
        if (grade === 'all' || (gradeCell && gradeCell.textContent.includes(`Grade ${grade}`))) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    // Show/hide grade performers sections
    document.querySelectorAll('.grade-performers').forEach(section => {
        if (grade === 'all' || section.getAttribute('data-grade') === grade) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

function initializeAwardsChart() {
    const ctx = document.getElementById('awardsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Academic Excellence', 'Most Improved', 'Leadership', 'Community Service', 'Sports', 'Arts', 'Attendance'],
            datasets: [{
                data: [25, 5, 5, 5, 5, 5, 10],
                backgroundColor: [
                    'rgba(255, 215, 0, 0.8)',
                    'rgba(40, 167, 69, 0.8)',
                    'rgba(0, 31, 63, 0.8)',
                    'rgba(23, 162, 184, 0.8)',
                    'rgba(220, 53, 69, 0.8)',
                    'rgba(111, 66, 193, 0.8)',
                    'rgba(253, 126, 20, 0.8)'
                ],
                borderColor: [
                    'rgb(255, 215, 0)',
                    'rgb(40, 167, 69)',
                    'rgb(0, 31, 63)',
                    'rgb(23, 162, 184)',
                    'rgb(220, 53, 69)',
                    'rgb(111, 66, 193)',
                    'rgb(253, 126, 20)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: '2026 Awards Distribution by Category',
                    color: 'var(--navy-blue)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

function viewCertificate(certId) {
    currentCertificate = certId;
    
    const modal = document.getElementById('certificateModal');
    const viewer = document.getElementById('certificateViewer');
    
    // Find the award
    let award = null;
    Object.values(awardsData[2026].categories).forEach(category => {
        const found = category.find(a => a.id === certId);
        if (found) award = found;
    });
    
    if (award) {
        viewer.innerHTML = `
            <div class="certificate-template">
                <div class="certificate-border">
                    <div class="certificate-header">
                        <img src="images/logo.png" alt="School Logo" class="certificate-logo">
                        <h2>Mafu Secondary School</h2>
                        <p>Certificate of Achievement</p>
                    </div>
                    <div class="certificate-body">
                        <div class="certificate-title">
                            <h1>${award.name}</h1>
                            <p>2026 Academic Year</p>
                        </div>
                        <div class="certificate-content">
                            <p>This certificate is proudly presented to</p>
                            <h3>${award.recipient}</h3>
                            <p>Grade ${award.grade}</p>
                            <p>${award.achievement}</p>
                            <div class="certificate-score">
                                ${award.score ? `Average Score: ${award.score}%` : ''}
                                ${award.improvement ? `Improvement: +${award.improvement}%` : ''}
                            </div>
                        </div>
                        <div class="certificate-signatures">
                            <div class="signature">
                                <p>_________________________</p>
                                <p>Mr. James Moloi</p>
                                <p>Principal</p>
                            </div>
                            <div class="signature">
                                <p>_________________________</p>
                                <p>Mrs. N. Mokoena</p>
                                <p>Awards Coordinator</p>
                            </div>
                        </div>
                        <div class="certificate-footer">
                            <p>Awarded on: November 25, 2026</p>
                            <p>Mafu Secondary School | Excellence in Education Since 1995</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    modal.style.display = 'flex';
}

function closeCertificateModal() {
    document.getElementById('certificateModal').style.display = 'none';
}

function printCertificate() {
    if (currentCertificate) {
        alert(`Printing certificate: ${currentCertificate}`);
        // In real implementation, this would trigger print dialog
    }
}

function downloadCurrentCertificate() {
    if (currentCertificate) {
        const award = Object.values(awardsData[2026].categories)
            .flat()
            .find(a => a.id === currentCertificate);
        
        if (award) {
            const content = `
                Mafu Secondary School - Certificate of Achievement
                
                Award: ${award.name}
                Recipient: ${award.recipient}
                Grade: ${award.grade}
                Achievement: ${award.achievement}
                ${award.score ? `Score: ${award.score}%` : ''}
                ${award.improvement ? `Improvement: +${award.improvement}%` : ''}
                
                Awarded: November 25, 2026
                Principal: Mr. James Moloi
                
                ---
                This is a digital certificate from Mafu Secondary School.
                For verification, contact: awards@mafusecondary.edu
            `;
            
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `certificate-${award.recipient.replace(/\s+/g, '-')}-2026.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
}

function shareCertificate() {
    if (currentCertificate) {
        if (navigator.share) {
            navigator.share({
                title: 'Mafu Secondary School Certificate',
                text: 'Check out my achievement certificate!',
                url: window.location.href
            });
        } else {
            alert('Share functionality is not available in your browser. You can copy the link manually.');
        }
    }
}

function printAllAwards() {
    alert('Printing all 2026 awards... In a real implementation, this would generate a print-ready document.');
}

function downloadAwardsPackage() {
    const package = {
        year: 2026,
        generated: new Date().toISOString(),
        awards: awardsData[2026]
    };
    
    const blob = new Blob([JSON.stringify(package, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mafu-awards-2026-package.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function downloadCertificate(templateId) {
    alert(`Downloading certificate template: ${templateId}`);
}

// Archive functions
function setupArchivePage() {
    // Year timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            showYearDetails(year);
        });
    });
}

function showYearDetails(year) {
    // Hide all year sections
    document.querySelectorAll('.year-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('current');
    });
    
    // Show selected year
    const yearSection = document.getElementById(year);
    if (yearSection) {
        yearSection.style.display = 'block';
        yearSection.classList.add('current');
        
        // Update timeline
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.classList.remove('current');
            if (item.getAttribute('data-year') === year) {
                item.classList.add('current');
            }
        });
        
        // Initialize chart for this year if needed
        if (year === '2026') {
            initializeYearChart(year);
        }
    }
}

function searchYear() {
    const yearInput = document.getElementById('yearSearch');
    const year = parseInt(yearInput.value);
    
    if (year >= 1995 && year <= 2026) {
        showYearDetails(year.toString());
    } else {
        alert('Please enter a year between 1995 and 2026');
    }
}

function initializeYearChart(year) {
    const ctx = document.getElementById(`chart${year}`);
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
            datasets: [{
                label: 'Top Average',
                data: [96.5, 97.1, 96.8, 97.5, 98.2],
                backgroundColor: 'rgba(255, 215, 0, 0.8)',
                borderColor: 'rgb(255, 215, 0)',
                borderWidth: 2
            }, {
                label: 'Grade Average',
                data: [89.4, 88.9, 88.3, 87.8, 87.2],
                backgroundColor: 'rgba(0, 31, 63, 0.8)',
                borderColor: 'rgb(0, 31, 63)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `${year} Performance by Grade`,
                    color: 'var(--navy-blue)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initializeHistoricalChart() {
    const ctx = document.getElementById('historicalChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
            datasets: [{
                label: 'Dux Scholar Average',
                data: [94.2, 94.8, 95.1, 95.5, 95.8, 96.2, 96.5, 96.8, 97.1, 97.4, 97.8, 98.2],
                borderColor: 'rgb(255, 215, 0)',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                tension: 0.3,
                fill: true
            }, {
                label: 'School Average',
                data: [85.1, 85.4, 85.8, 86.2, 86.5, 86.9, 87.2, 87.6, 87.9, 88.3, 88.7, 89.4],
                borderColor: 'rgb(0, 31, 63)',
                backgroundColor: 'rgba(0, 31, 63, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Historical Performance Trends (2015-2026)',
                    color: 'var(--navy-blue)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function downloadYearData(year) {
    const data = {
        year: year,
        summary: `Mafu Secondary School ${year} Awards Data`,
        generated: new Date().toISOString(),
        note: 'This is sample data for demonstration purposes'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mafu-awards-${year}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function searchArchive() {
    alert('Archive search functionality would be implemented with a backend database in a real application.');
}

function resetSearch() {
    document.getElementById('searchName').value = '';
    document.getElementById('searchYear').value = '';
    document.getElementById('searchGrade').value = '';
    document.getElementById('searchAward').value = '';
    document.getElementById('searchResults').innerHTML = '';
}

function exportPDF() {
    alert('PDF export would generate a comprehensive report of all awards data.');
}

function exportExcel() {
    alert('Excel export would provide raw data for analysis in spreadsheet format.');
}

function createCustomReport() {
    alert('Custom report generator would allow filtering and formatting of specific data.');
}