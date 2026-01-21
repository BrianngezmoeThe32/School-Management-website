// Learning Materials System
let currentGrade = 8;
let materialsData = {};

// Sample data for demonstration
const sampleData = {
  8:
      [
        {
          id: 1,
          name: "Introduction to Algebra",
          subject: "Mathematics",
          year: 2022,
          type: "Study Guide"
        },
        {
          id: 2,
          name: "Natural Sciences Term 4 Notes",
          subject: "Natural Sciences",
          year: 2021,
          type: "Notes"
        },
        {
          id: 3,
          name: "English Language Basics",
          subject: "English",
          year: 2020,
          type: "Textbook"
        },
        {
          id: 4,
          name: "Math Practice – Fractions",
          subject: "Mathematics",
          year: 2021,
          type: "Practice Tutorial Questions"
        },
        {
          id: 5,
          name: "Grade 8 Final Exam 2025",
          subject: "Natural Sciences",
          year: 2025,
          type: "Past Question Paper"
        }
      ],

    9:
      [
        {
          id: 6,
          name: "Linear Equations Explained",
          subject: "Mathematics",
          year: 2023,
          type: "Study Guide"
        },
        {
          id: 7,
          name: "EMS Term 4 Notes",
          subject: "EMS",
          year: 2025,
          type: "Notes"
        },
        {
          id: 8,
          name: "English Comprehension Skills",
          subject: "English",
          year: 2022,
          type: "Textbook"
        },
        {
          id: 9,
          name: "Math Practice – Algebra",
          subject: "Mathematics",
          year: 2024,
          type: "Practice Tutorial Questions"
        },
        {
          id: 10,
          name: "Grade 9 November Exam 2025",
          subject: "English",
          year: 2025,
          type: "Past Question Paper"
        }
      ],

      10:[
        {
          id: 11,
          name: "Quadratic Equations Mastery",
          subject: "Mathematics",
          year: 2019,
          type: "Study Guide"
        },
        {
          id: 12,
          name: "Physical Sciences Mechanics Notes",
          subject: "Physical Sciences",
          year: 2025,
          type: "Notes"
        },
        {
          id: 13,
          name: "Life Sciences Core Concepts",
          subject: "Life Sciences",
          year: 2022,
          type: "Textbook"
        },
        {
          id: 14,
          name: "Physics Calculations Practice",
          subject: "Physical Sciences",
          year: 2022,
          type: "Practice Tutorial Questions"
        },
        {
          id: 15,
          name: "Grade 10 Final Exam 2025",
          subject: "Mathematics",
          year: 2025,
          type: "Past Question Paper"
        }
      ],

      11: [
        {
          id: 16,
          name: "Trigonometry Simplified",
          subject: "Mathematics",
          year: 2019,
          type: "Study Guide"
        },
        {
          id: 17,
          name: "Life Sciences Genetics Notes",
          subject: "Life Sciences",
          year: 2019,
          type: "Notes"
        },
        {
          id: 18,
          name: "English Literature Setworks",
          subject: "English",
          year: 2018,
          type: "Textbook"
        },
        {
          id: 19,
          name: "Chemistry Stoichiometry Practice",
          subject: "Physical Sciences",
          year: 2023,
          type: "Practice Tutorial Questions"
        },
        {
          id: 20,
          name: "Grade 11 November Exam 2025",
          subject: "Life Sciences",
          year: 2025,
          type: "Past Question Paper"
        }
      ],

      12: [
        {
          id: 21,
          name: "Calculus Exam Preparation",
          subject: "Mathematics",
          year: 2022,
          type: "Study Guide"
        },
        {
          id: 22,
          name: "Physics Electricity Notes",
          subject: "Physical Sciences",
          year: 2021,
          type: "Notes"
        },
        {
          id: 23,
          name: "Life Sciences Exam Textbook",
          subject: "Life Sciences",
          year: 2021,
          type: "Textbook"
        },
        {
          id: 24,
          name: "Math Final Revision Questions",
          subject: "Mathematics",
          year: 2025,
          type: "Practice Tutorial Questions"
        },
        {
          id: 25,
          name: "NSC Final Exam 2024",
          subject: "Mathematics",
          year: 2024,
          type: "Past Question Paper"
        },
        {
          id: 26,
          name: "Mathematics Paper 1 NSC",
          subject: "Mathematics",
          year: 2019,
          type: "Past Question Paper"
        },
        {
          id: 27,
          name: "Physical Sciences Mechanics Study Material",
          subject: "Physical Sciences",
          year: 2020,
          type: "Study Material"
        },
        {
          id: 28,
          name: "Accounting Final Exam Preparation",
          subject: "Accounting",
          year: 2021,
          type: "Study Material"
        },
        {
          id: 29,
          name: "Business Studies Grade 12 TextBook",
          subject: "Business Studies",
          year: 2018,
          type: "TextBook"
        },
        {
          id: 30,
          name: "Life Orientation Term 2 Tutorial Questions",
          subject: "Life Orientation",
          year: 2022,
          type: "Tutorial Questions"
        },
        {
          id: 31,
          name: "Mathematics Literacy Exam Practice",
          subject: "Mathematics Literacy",
          year: 2023,
          type: "Practice Questions"
        },
        {
          id: 32,
          name: "Agricultural Sciences Final Exam",
          subject: "Agricultural Sciences",
          year: 2024,
          type: "Past Question Paper"
        },
        {
          id: 33,
          name: "Life Sciences Genetics Study Material",
          subject: "Life Sciences",
          year: 2020,
          type: "Study Material"
        },
        {
          id: 34,
          name: "Physical Sciences Electricity Tutorial",
          subject: "Physical Sciences",
          year: 2019,
          type: "Tutorial Questions"
        },
        {
          id: 35,
          name: "Home Language Comprehension Practice",
          subject: "Home Language",
          year: 2021,
          type: "Practice Questions"
        },
        {
          id: 36,
          name: "First Additional Language Grammar Guide",
          subject: "First Additional Language",
          year: 2018,
          type: "Study Material"
        },
        {
          id: 37,
          name: "Accounting Trial Balance Questions",
          subject: "Accounting",
          year: 2022,
          type: "Practice Questions"
        },
        {
          id: 38,
          name: "Business Studies Term 4 Revision",
          subject: "Business Studies",
          year: 2023,
          type: "Study Material"
        },
        {
          id: 39,
          name: "Mathematics Paper 2 Trigonometry",
          subject: "Mathematics",
          year: 2020,
          type: "Tutorial Questions"
        },
        {
          id: 40,
          name: "Life Sciences Ecology TextBook",
          subject: "Life Sciences",
          year: 2019,
          type: "TextBook"
        },
        {
          id: 41,
          name: "Physical Sciences NSC Final Exam",
          subject: "Physical Sciences",
          year: 2025,
          type: "Past Question Paper"
        },
        {
          id: 42,
          name: "Agricultural Sciences Soil Study Material",
          subject: "Agricultural Sciences",
          year: 2021,
          type: "Study Material"
        },
        {
          id: 43,
          name: "Home Language Literature Exam",
          subject: "Home Language",
          year: 2024,
          type: "Past Question Paper"
        },
        {
          id: 44,
          name: "First Additional Language Essay Practice",
          subject: "First Additional Language",
          year: 2022,
          type: "Practice Questions"
        },
        {
          id: 45,
          name: "Life Orientation Grade 12 TextBook",
          subject: "Life Orientation",
          year: 2020,
          type: "TextBook"
        }
      ]
    }


// Initialize the system
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.learning-materials-page')) {
        initializeLearningMaterials();
    }
});

function initializeLearningMaterials() {
    // Load data from localStorage or use sample data
    loadMaterialsData();
    
    // Setup event listeners
    setupEventListeners();

    // Load initial data
    loadGradeData(currentGrade);
}

function loadMaterialsData() {
    // Try to load from localStorage first
    const savedData = localStorage.getItem('learningMaterialsData');
    if (savedData) {
        materialsData = JSON.parse(savedData);
    } else {
        // Use sample data
        materialsData = sampleData;
        saveMaterialsData(materialsData);
    }
}

function saveMaterialsData(data) {
  if (localStorage.getItem('learningMaterialsData') != null){
    localStorage.removeItem('learningMaterialsData');
  }
  localStorage.setItem('learningMaterialsData', JSON.stringify(data));
}

function setupEventListeners() {
    // Grade tabs
    document.querySelectorAll('.grade-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const grade = parseInt(this.getAttribute('data-grade'));
            switchGrade(grade);
        });
    });
    
    //filter select
    const yearFilter = document.getElementById('yearFilter');
    const typeFilter = document.getElementById('typeFilter');
    const subjectFilter = document.getElementById('subjectFilter');

    filterData(
    yearFilter.value ? parseInt(yearFilter.value) : null, // convert year to number
    typeFilter.value || null,
    subjectFilter.value || null
    );
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
    document.getElementById('gradeTitle').textContent = `Grade ${grade} Learning Material`;
    
    // Load data
    loadGradeData(grade);
}

function loadGradeData(grade) {
    const data = materialsData[grade] || [];
    
    // Update displays
    updateTable(data);
}

function updateTable(data) {
    const tableBody = document.getElementById('learningMaterialsTableBody');
    tableBody.innerHTML = '';
    
    data.forEach(material => {
        const row = document.createElement('tr');
        row.className = `position-${material.id}`;
        
        row.innerHTML = `
            <td><strong>${material.name}</strong></td>
            <td>${material.subject}</td>
            <td>${material.year}</td>
            <td>${material.type}</td>
            <td class="table-actions">
                <button class="action-icon" title="Download Report" onclick="downloadLearningMaterial('${material.name}')">
                    <i class="fas fa-download"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filterData(year, type, subject) {
  const data = (materialsData[currentGrade]).filter(material => {
      return (!year || material.year === "All Years") &&
             (!type || material.type === "All Types") &&
             (!subject || material.subject === "All Subjects")
  });

  //update table
  updateTable(data)
}