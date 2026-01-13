// Top Learners System
let currentGrade = 8;
let currentYear = 2026;
let currentMonth = 'November';
let learnersData = {};
let performanceChart = null;
let comparisonChart = null;

// Sample data for demonstration
const sampleData = {
    2026: {
        November: {
            8: [
                { id: 1, name: "Sarah Johnson", studentId: "MS2026001", average: 96.5, improvement: 12.3, 
                  subjects: { Math: 98, Science: 95, English: 97, History: 96 }, achievements: ["Top Performer", "Math Excellence"] },
                { id: 2, name: "Michael Chen", studentId: "MS2026002", average: 94.2, improvement: 8.7,
                  subjects: { Math: 99, Science: 92, English: 93, History: 91 }, achievements: ["Math Excellence"] },
                { id: 3, name: "Amina Patel", studentId: "MS2026003", average: 93.8, improvement: 15.3,
                  subjects: { Math: 92, Science: 94, English: 95, History: 93 }, achievements: ["Most Improved"] },
                { id: 4, name: "David Wilson", studentId: "MS2026004", average: 92.1, improvement: 7.2,
                  subjects: { Math: 90, Science: 93, English: 94, History: 92 }, achievements: [] },
                { id: 5, name: "Lisa Brown", studentId: "MS2026005", average: 91.5, improvement: 9.8,
                  subjects: { Math: 89, Science: 92, English: 95, History: 91 }, achievements: ["English Excellence"] },
                { id: 6, name: "Robert Kim", studentId: "MS2026006", average: 90.8, improvement: 6.4,
                  subjects: { Math: 91, Science: 90, English: 92, History: 89 }, achievements: [] },
                { id: 7, name: "Emma Davis", studentId: "MS2026007", average: 89.7, improvement: 11.2,
                  subjects: { Math: 88, Science: 91, English: 92, History: 88 }, achievements: [] },
                { id: 8, name: "James Miller", studentId: "MS2026008", average: 88.9, improvement: 5.6,
                  subjects: { Math: 87, Science: 89, English: 91, History: 87 }, achievements: [] },
                { id: 9, name: "Sophia Garcia", studentId: "MS2026009", average: 87.5, improvement: 10.1,
                  subjects: { Math: 86, Science: 88, English: 90, History: 86 }, achievements: [] },
                { id: 10, name: "Daniel Martinez", studentId: "MS2026010", average: 86.2, improvement: 4.3,
                  subjects: { Math: 85, Science: 87, English: 89, History: 85 }, achievements: [] }
            ],
            9: [
                { id: 11, name: "David Williams", studentId: "MS2026011", average: 97.1, improvement: 13.5, 
                  subjects: { Math: 98, Science: 97, English: 96, History: 95 }, achievements: ["Top Performer", "Science Excellence"] },
                { id: 12, name: "Lisa Rodriguez", studentId: "MS2026012", average: 95.4, improvement: 9.2,
                  subjects: { Math: 94, Science: 98, English: 95, History: 93 }, achievements: ["Science Excellence"] },
                { id: 13, name: "James Wilson", studentId: "MS2026013", average: 94.9, improvement: 14.8,
                  subjects: { Math: 95, Science: 93, English: 96, History: 94 }, achievements: ["Leadership"] },
                // Add more sample data for other grades...
            ],
            10: [
                { id: 21, name: "Emma Thompson", studentId: "MS2026021", average: 96.8, improvement: 11.7,
                  subjects: { Math: 97, Science: 96, English: 98, History: 95 }, achievements: ["Top Performer", "English Excellence"] },
                // Add more...
            ],
            11: [
                { id: 31, name: "Daniel Brown", studentId: "MS2026031", average: 97.5, improvement: 12.9,
                  subjects: { Math: 98, Science: 97, English: 97, History: 96 }, achievements: ["Top Performer", "All Subjects"] },
                // Add more...
            ],
            12: [
                { id: 41, name: "Isabella Taylor", studentId: "MS2026041", average: 98.2, improvement: 14.1,
                  subjects: { Math: 99, Science: 98, English: 98, History: 97 }, achievements: ["Dux Scholar", "Top Performer"] },
                // Add more...
            ]
        },
        October: {
            // October data...
        }
        // Add more months...
    },
    2025: {
        // 2025 data...
    },
    2024: {
        // 2024 data...
    }
};

// Initialize the system
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.top-learners-page')) {
        initializeTopLearners();
    }
});

function initializeTopLearners() {
    // Load data from localStorage or use sample data
    loadLearnersData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial data
    loadGradeData(currentGrade);
    
    // Initialize charts
    initializeCharts();
}

function loadLearnersData() {
    // Try to load from localStorage first
    const savedData = localStorage.getItem('mafuLearnersData');
    if (savedData) {
        learnersData = JSON.parse(savedData);
    } else {
        // Use sample data
        learnersData = sampleData;
        saveLearnersData();
    }
}

function saveLearnersData() {
    localStorage.setItem('mafuLearnersData', JSON.stringify(learnersData));
}

function setupEventListeners() {
    // Grade tabs
    document.querySelectorAll('.grade-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const grade = parseInt(this.getAttribute('data-grade'));
            switchGrade(grade);
        });
    });
    
    // Year buttons
    document.querySelectorAll('.year-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const year = parseInt(this.getAttribute('data-year'));
            switchYear(year);
        });
    });
    
    // Month select
    document.getElementById('monthSelect').addEventListener('change', function() {
        switchMonth(this.value);
    });
    
    // Sort select
    document.getElementById('sortBy').addEventListener('change', function() {
        sortLearners(this.value);
    });
    
    // View mode select
    document.getElementById('viewMode').addEventListener('change', function() {
        switchViewMode(this.value);
    });
}

function switchGrade(grade) {
    currentGrade = grade;
    
    // Update active tab
    document.querySelectorAll('.grade-tab').forEach(tab => {
        tab.classList.remove('active');
        if (parseInt(tab.getAttribute('data-grade')) === grade) {
            tab.classList.add('active');
        }
    });
    
    // Update title
    document.getElementById('gradeTitle').textContent = `Grade ${grade} Top 10 Learners`;
    
    // Load data
    loadGradeData(grade);
}

function switchYear(year) {
    currentYear = year;
    
    // Update active year button
    document.querySelectorAll('.year-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.getAttribute('data-year')) === year) {
            btn.classList.add('active');
        }
    });
    
    // Update current period
    updateCurrentPeriod();
    
    // Reload data
    loadGradeData(currentGrade);
}

function switchMonth(month) {
    currentMonth = month;
    updateCurrentPeriod();
    loadGradeData(currentGrade);
}

function updateCurrentPeriod() {
    const periodElement = document.getElementById('currentPeriod');
    periodElement.textContent = `${currentMonth} ${currentYear}`;
}

function loadGradeData(grade) {
    const data = learnersData[currentYear]?.[currentMonth]?.[grade] || [];
    
    // Sort by average (descending)
    data.sort((a, b) => b.average - a.average);
    
    // Add positions
    data.forEach((learner, index) => {
        learner.position = index + 1;
    });
    
    // Update displays
    updateTable(data);
    updateCards(data);
    updateSummary(data);
    updateSubjectPerformance(data);
    updateComparisonData();
}

function updateTable(data) {
    const tableBody = document.getElementById('learnersTableBody');
    tableBody.innerHTML = '';
    
    data.forEach(learner => {
        const row = document.createElement('tr');
        row.className = `position-${learner.position}`;
        
        // Determine best subject
        const subjects = learner.subjects;
        const bestSubject = Object.keys(subjects).reduce((a, b) => subjects[a] > subjects[b] ? a : b);
        const bestScore = subjects[bestSubject];
        
        // Format achievements
        const achievementsHTML = learner.achievements.map(ach => 
            `<span class="badge ${ach.toLowerCase().includes('top') ? 'gold' : 
                                 ach.toLowerCase().includes('excellence') ? 'silver' :
                                 ach.toLowerCase().includes('improved') ? 'improved' : 'bronze'}">${ach}</span>`
        ).join('');
        
        row.innerHTML = `
            <td class="position-cell">${learner.position}</td>
            <td><strong>${learner.name}</strong></td>
            <td>${learner.studentId}</td>
            <td><span class="average-display">${learner.average.toFixed(1)}%</span></td>
            <td><span class="improvement ${learner.improvement >= 0 ? 'positive' : 'negative'}">
                ${learner.improvement >= 0 ? '+' : ''}${learner.improvement.toFixed(1)}%
            </span></td>
            <td>${bestSubject}: ${bestScore}%</td>
            <td class="achievement-badges">${achievementsHTML}</td>
            <td class="table-actions">
                <button class="action-icon" title="View Details" onclick="viewLearnerDetails(${learner.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-icon" title="Print Certificate" onclick="printCertificate(${learner.id})">
                    <i class="fas fa-certificate"></i>
                </button>
                <button class="action-icon" title="Download Report" onclick="downloadLearnerReport(${learner.id})">
                    <i class="fas fa-download"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function updateCards(data) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';
    
    data.forEach(learner => {
        const card = document.createElement('div');
        card.className = `learner-card position-${learner.position}`;
        
        // Determine best subject
        const subjects = learner.subjects;
        const bestSubject = Object.keys(subjects).reduce((a, b) => subjects[a] > subjects[b] ? a : b);
        const bestScore = subjects[bestSubject];
        
        card.innerHTML = `
            <div class="card-header">
                <div class="position-indicator">
                    <div class="position-number">${learner.position}</div>
                    <div class="position-label">Position</div>
                </div>
                <div class="average-display">
                    <div class="average-value">${learner.average.toFixed(1)}%</div>
                    <div class="average-label">Average</div>
                </div>
            </div>
            <div class="card-body">
                <h3 class="learner-name">${learner.name}</h3>
                <p class="learner-id">${learner.studentId}</p>
                <div class="learner-stats">
                    <div class="stat-item">
                        <span class="stat-label">Improvement:</span>
                        <span class="stat-value ${learner.improvement >= 0 ? 'positive' : 'negative'}">
                            ${learner.improvement >= 0 ? '+' : ''}${learner.improvement.toFixed(1)}%
                        </span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Best Subject:</span>
                        <span class="stat-value">${bestSubject}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Best Score:</span>
                        <span class="stat-value">${bestScore}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Achievements:</span>
                        <span class="stat-value">${learner.achievements.length}</span>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button class="card-action" onclick="viewLearnerDetails(${learner.id})">
                    <i class="fas fa-chart-line"></i> Details
                </button>
                <button class="card-action" onclick="printCertificate(${learner.id})">
                    <i class="fas fa-award"></i> Certificate
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function updateSummary(data) {
    if (data.length === 0) return;
    
    const classAverage = data.reduce((sum, learner) => sum + learner.average, 0) / data.length;
    const topAverage = data[0].average;
    const mostImproved = Math.max(...data.map(learner => learner.improvement));
    
    document.getElementById('classAverage').textContent = `${classAverage.toFixed(1)}%`;
    document.getElementById('topAverage').textContent = `${topAverage.toFixed(1)}%`;
    document.getElementById('mostImproved').textContent = `+${mostImproved.toFixed(1)}%`;
}

function updateSubjectPerformance(data) {
    if (data.length === 0) return;
    
    const subjectGrid = document.getElementById('subjectGrid');
    subjectGrid.innerHTML = '';
    
    // Calculate subject averages
    const subjects = ['Math', 'Science', 'English', 'History'];
    const subjectData = {};
    
    subjects.forEach(subject => {
        const scores = data.map(learner => learner.subjects[subject] || 0);
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;
        const topScore = Math.max(...scores);
        const topPerformer = data.find(learner => learner.subjects[subject] === topScore);
        
        subjectData[subject] = {
            average: average,
            topScore: topScore,
            topPerformer: topPerformer
        };
    });
    
    // Create subject cards
    subjects.forEach(subject => {
        const data = subjectData[subject];
        const card = document.createElement('div');
        card.className = 'subject-card';
        
        card.innerHTML = `
            <div class="subject-header">
                <h4 class="subject-name">${subject}</h4>
                <div class="subject-average">${data.average.toFixed(1)}%</div>
            </div>
            <div class="subject-stats">
                <div class="stat-item">
                    <span>Class Average:</span>
                    <span>${data.average.toFixed(1)}%</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${data.average}%"></div>
                </div>
                <div class="top-performer">
                    <i class="fas fa-user-graduate"></i>
                    <div>
                        <div class="performer-name">${data.topPerformer.name}</div>
                        <div class="performer-score">${data.topScore}%</div>
                    </div>
                </div>
            </div>
        `;
        
        subjectGrid.appendChild(card);
    });
}

function initializeCharts() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (performanceChart) {
        performanceChart.destroy();
    }
    
    performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'],
            datasets: [{
                label: 'Average Score (%)',
                data: [96.5, 94.2, 93.8, 92.1, 91.5, 90.8, 89.7, 88.9, 87.5, 86.2],
                backgroundColor: [
                    'rgba(255, 215, 0, 0.8)',
                    'rgba(192, 192, 192, 0.8)',
                    'rgba(205, 127, 50, 0.8)',
                    'rgba(0, 31, 63, 0.6)',
                    'rgba(0, 31, 63, 0.6)',
                    'rgba(0, 31, 63, 0.6)',
                    'rgba(0, 31, 63, 0.6)',
                    'rgba(0, 31, 63, 0.6)',
                    'rgba(0, 31, 63, 0.6)',
                    'rgba(0, 31, 63, 0.6)'
                ],
                borderColor: [
                    'rgb(255, 215, 0)',
                    'rgb(192, 192, 192)',
                    'rgb(205, 127, 50)',
                    'rgb(0, 31, 63)',
                    'rgb(0, 31, 63)',
                    'rgb(0, 31, 63)',
                    'rgb(0, 31, 63)',
                    'rgb(0, 31, 63)',
                    'rgb(0, 31, 63)',
                    'rgb(0, 31, 63)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Top 10 Performance Distribution',
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
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Initialize comparison chart
    const comparisonCtx = document.getElementById('comparisonChart');
    if (comparisonCtx) {
        comparisonChart = new Chart(comparisonCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
                datasets: [{
                    label: 'Top Average',
                    data: [92.1, 92.8, 93.5, 94.2, 94.8, 95.1, 95.6, 96.2, 96.5, 96.8, 97.1],
                    borderColor: 'rgb(255, 215, 0)',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    tension: 0.3,
                    fill: true
                }, {
                    label: 'Class Average',
                    data: [85.2, 85.8, 86.3, 86.9, 87.2, 87.5, 87.9, 88.3, 88.7, 89.1, 89.4],
                    borderColor: 'rgb(0, 31, 63)',
                    backgroundColor: 'rgba(0, 31, 63, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Monthly Performance Trends 2026',
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
}

function updateComparisonData() {
    // Update comparison table
    const tableBody = document.getElementById('comparisonTableBody');
    tableBody.innerHTML = '';
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November'];
    
    // Sample data for comparison
    const comparisonData = [
        { month: 'January', topAvg: 92.1, classAvg: 85.2, distinctions: 35, improvement: 0 },
        { month: 'February', topAvg: 92.8, classAvg: 85.8, distinctions: 38, improvement: 0.7 },
        { month: 'March', topAvg: 93.5, classAvg: 86.3, distinctions: 40, improvement: 1.1 },
        { month: 'April', topAvg: 94.2, classAvg: 86.9, distinctions: 42, improvement: 1.7 },
        { month: 'May', topAvg: 94.8, classAvg: 87.2, distinctions: 45, improvement: 2.0 },
        { month: 'June', topAvg: 95.1, classAvg: 87.5, distinctions: 46, improvement: 2.3 },
        { month: 'July', topAvg: 95.6, classAvg: 87.9, distinctions: 48, improvement: 2.7 },
        { month: 'August', topAvg: 96.2, classAvg: 88.3, distinctions: 50, improvement: 3.1 },
        { month: 'September', topAvg: 96.5, classAvg: 88.7, distinctions: 52, improvement: 3.4 },
        { month: 'October', topAvg: 96.8, classAvg: 89.1, distinctions: 54, improvement: 3.7 },
        { month: 'November', topAvg: 97.1, classAvg: 89.4, distinctions: 55, improvement: 4.0 }
    ];
    
    comparisonData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${data.month}</strong></td>
            <td>${data.topAvg.toFixed(1)}%</td>
            <td>${data.classAvg.toFixed(1)}%</td>
            <td>${data.distinctions}</td>
            <td class="${data.improvement >= 0 ? 'positive' : 'negative'}">
                ${data.improvement >= 0 ? '+' : ''}${data.improvement.toFixed(1)}%
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function sortLearners(criteria) {
    const data = learnersData[currentYear]?.[currentMonth]?.[currentGrade] || [];
    
    switch(criteria) {
        case 'average':
            data.sort((a, b) => b.average - a.average);
            break;
        case 'position':
            data.sort((a, b) => a.position - b.position);
            break;
        case 'name':
            data.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'improvement':
            data.sort((a, b) => b.improvement - a.improvement);
            break;
    }
    
    updateTable(data);
    updateCards(data);
}

function switchViewMode(mode) {
    // Hide all views
    document.getElementById('tableView').style.display = 'none';
    document.getElementById('cardView').style.display = 'none';
    document.getElementById('chartView').style.display = 'none';
    
    // Show selected view
    switch(mode) {
        case 'table':
            document.getElementById('tableView').style.display = 'block';
            break;
        case 'cards':
            document.getElementById('cardView').style.display = 'block';
            break;
        case 'charts':
            document.getElementById('chartView').style.display = 'block';
            if (performanceChart) {
                performanceChart.update();
            }
            break;
    }
}

function changeChartType(type) {
    if (performanceChart) {
        performanceChart.config.type = type;
        performanceChart.update();
    }
}

// Action Functions
function printTopLearners() {
    const printModal = document.getElementById('printModal');
    printModal.style.display = 'flex';
    generatePrintPreview();
}

function closePrintModal() {
    document.getElementById('printModal').style.display = 'none';
}

function generatePrintPreview() {
    const preview = document.getElementById('printPreview');
    const selectedGrades = Array.from(document.querySelectorAll('input[name="printGrade"]:checked'))
        .map(cb => cb.value);
    
    let html = `<div class="print-preview-content">
        <h3>Top Learners Report - ${currentMonth} ${currentYear}</h3>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>`;
    
    selectedGrades.forEach(grade => {
        const data = learnersData[currentYear]?.[currentMonth]?.[grade] || [];
        if (data.length > 0) {
            html += `<div class="grade-report">
                <h4>Grade ${grade} Top 10</h4>
                <table class="preview-table">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                            <th>Average</th>
                            <th>Improvement</th>
                        </tr>
                    </thead>
                    <tbody>`;
            
            data.forEach(learner => {
                html += `<tr>
                    <td>${learner.position}</td>
                    <td>${learner.name}</td>
                    <td>${learner.average.toFixed(1)}%</td>
                    <td>${learner.improvement >= 0 ? '+' : ''}${learner.improvement.toFixed(1)}%</td>
                </tr>`;
            });
            
            html += `</tbody></table></div>`;
        }
    });
    
    html += `</div>`;
    preview.innerHTML = html;
}

function generatePrint() {
    // In a real implementation, this would generate a PDF
    alert('Print report generated successfully! In a real implementation, this would open a print dialog or generate a PDF.');
    closePrintModal();
}

function downloadData() {
    const data = {
        year: currentYear,
        month: currentMonth,
        grade: currentGrade,
        learners: learnersData[currentYear]?.[currentMonth]?.[currentGrade] || []
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `top-learners-${currentGrade}-${currentMonth}-${currentYear}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateAwards() {
    const awardsModal = document.getElementById('awardsModal');
    awardsModal.style.display = 'flex';
    generateAwardsPreview();
}

function closeAwardsModal() {
    document.getElementById('awardsModal').style.display = 'none';
}

function generateAwardsPreview() {
    const preview = document.getElementById('awardsPreview');
    const data = learnersData[currentYear]?.[currentMonth]?.[currentGrade] || [];
    
    let html = `<div class="awards-preview-content">
        <h4>Grade ${currentGrade} Awards Preview</h4>
        <p>Awards to be generated: ${Math.min(data.length, 10)} certificates</p>
        <div class="awards-list">`;
    
    data.slice(0, 5).forEach(learner => {
        html += `<div class="award-item">
            <div class="award-rank">#${learner.position}</div>
            <div class="award-info">
                <strong>${learner.name}</strong>
                <span>${learner.average.toFixed(1)}% Average</span>
            </div>
        </div>`;
    });
    
    if (data.length > 5) {
        html += `<div class="award-more">+ ${data.length - 5} more awards...</div>`;
    }
    
    html += `</div></div>`;
    preview.innerHTML = html;
}

function generateAwardsFinal() {
    // In a real implementation, this would generate award certificates
    alert('Awards generated successfully! Certificates have been created and are ready for printing.');
    closeAwardsModal();
}

// Utility functions
function viewLearnerDetails(id) {
    // Find learner
    const learners = learnersData[currentYear]?.[currentMonth]?.[currentGrade] || [];
    const learner = learners.find(l => l.id === id);
    
    if (learner) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</button>
                <h3>${learner.name} - Details</h3>
                <div class="learner-details">
                    <div class="detail-section">
                        <h4>Basic Information</h4>
                        <p><strong>Student ID:</strong> ${learner.studentId}</p>
                        <p><strong>Grade:</strong> ${currentGrade}</p>
                        <p><strong>Position:</strong> ${learner.position}</p>
                    </div>
                    <div class="detail-section">
                        <h4>Academic Performance</h4>
                        <p><strong>Average:</strong> ${learner.average.toFixed(1)}%</p>
                        <p><strong>Improvement:</strong> ${learner.improvement >= 0 ? '+' : ''}${learner.improvement.toFixed(1)}%</p>
                    </div>
                    <div class="detail-section">
                        <h4>Subject Scores</h4>
                        <div class="subject-scores">
                            ${Object.entries(learner.subjects).map(([subject, score]) => `
                                <div class="subject-score">
                                    <span>${subject}:</span>
                                    <span>${score}%</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="detail-section">
                        <h4>Achievements</h4>
                        <div class="achievements-list">
                            ${learner.achievements.map(ach => `
                                <span class="achievement-badge">${ach}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }
}

function printCertificate(id) {
    // In a real implementation, this would generate and print a certificate
    alert(`Certificate for student ID ${id} is ready for printing. In a real implementation, this would open a certificate template.`);
}

function downloadLearnerReport(id) {
    const learners = learnersData[currentYear]?.[currentMonth]?.[currentGrade] || [];
    const learner = learners.find(l => l.id === id);
    
    if (learner) {
        const report = `
            Mafu Secondary School - Student Performance Report
            ===================================================
            
            Student: ${learner.name}
            Student ID: ${learner.studentId}
            Grade: ${currentGrade}
            Period: ${currentMonth} ${currentYear}
            
            Performance Summary:
            -------------------
            Position: ${learner.position}
            Average Score: ${learner.average.toFixed(1)}%
            Improvement: ${learner.improvement >= 0 ? '+' : ''}${learner.improvement.toFixed(1)}%
            
            Subject Scores:
            ---------------
            ${Object.entries(learner.subjects).map(([subject, score]) => 
                `${subject}: ${score}%`
            ).join('\n')}
            
            Achievements:
            -------------
            ${learner.achievements.length > 0 ? learner.achievements.join(', ') : 'None'}
            
            Report Generated: ${new Date().toLocaleString()}
        `;
        
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report-${learner.studentId}-${currentMonth}-${currentYear}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}