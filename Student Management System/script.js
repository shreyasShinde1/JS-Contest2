const students= [

];

const studentForm = document.getElementById('form')
const studentTable = document.getElementById('studentTable')
const search = document.getElementById('searchStudent');

function displayInTable(){
    const tbody = studentTable.querySelector('tbody');
    tbody.innerHTML = '';

    students.forEach(student =>{
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.gpa}</td>
        <td>${student.degree}
            <button id="delete">
                <img src="./images/trash-2 1.png" width="17px"">
            </button>
            <button id="edit">
                <img src="./images/edit 1.png" width="17px">
            </button>
        </td>
        `;

        const editBtn = row.querySelector('#edit');
        editBtn.addEventListener('click', ()=> editStudentDetails(student));

        const deleteBtn = row.querySelector('#delete')
        deleteBtn.addEventListener('click', ()=> deleteStudentDtails(student))

        tbody.appendChild(row);
    })
}

function addStudentInTable(event){
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const gpa = document.getElementById('gpa').value;
    const age = document.getElementById('age').value;
    const degree = document.getElementById('degree').value;

    const newStudent = {
        id: students.length + 1,
        name,
        email,
        gpa,
        age,
        degree,
    }

    students.push(newStudent);
    displayInTable();
    studentForm.reset();
}

function editStudentDetails(student){
    const nameInput = document.getElementById('name')
    const emailInput = document.getElementById('email')
    const gpaInput = document.getElementById('gpa')
    const ageInput = document.getElementById('age')
    const degreeInput = document.getElementById('degree')
    const  btn = document.getElementById('btn')

    nameInput.value = student.name
    emailInput.value = student.email;
    gpaInput.value = student.gpa;
    ageInput.value = student.age;
    degreeInput.value = student.degree;

    btn.textContent = 'Edit Student';
    studentForm.removeEventListener('submit', addStudentInTable)
    studentForm.addEventListener('submit', updateStudentDetails.bind(null, student))
}

function updateStudentDetails(student, event){
    event.preventDefault();

    student.name = document.getElementById('name').value;
    student.email = document.getElementById('email').value;
    student.gpa = document.getElementById('gpa').value;
    student.age = document.getElementById('age').value;
    student.degree = document.getElementById('degree').value;
    
    displayInTable()
    studentForm.reset();

    const  btn = document.getElementById('btn')
    btn.textContent = 'Add Student'
    studentForm.removeEventListener('submit', updateStudentDetails)
    studentForm.addEventListener('submit', addStudentInTable)
}

function deleteStudentDtails(student){
    const studentIndex = students.indexOf(student)

    if(studentIndex !== -1){
        students.splice(studentIndex,1)
        displayInTable()
    }
}

function searchStudents(){
    const searching = search.value.toLowerCase();

    const filteredStudents = students.filter(student=>
        student.name.toLowerCase().includes(searching) ||
        student.email.toLowerCase().includes(searching)||
        student.degree.toLowerCase().includes(searching)
    )
    displayFilteredStudents(filteredStudents);
}

function displayFilteredStudents(filteredStudents){
    const tbody = studentTable.querySelector('tbody');
    tbody.innerHTML = '';

    filteredStudents.forEach(student =>{
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.gpa}</td>
        <td>${student.degree}
            <button id="delete">
                <img src="./images/trash-2 1.png" width="17px"">
            </button>
            <button id="edit">
                <img src="./images/edit 1.png" width="17px">
            </button>
        </td>
        `;

        const editBtn = row.querySelector('#edit');
        editBtn.addEventListener('click', ()=> editStudentDetails(student));

        const deleteBtn = row.querySelector('#delete')
        deleteBtn.addEventListener('click', ()=> deleteStudentDtails(student))

        tbody.appendChild(row);
    })
}

studentForm.addEventListener('submit',addStudentInTable)
search.addEventListener('input',searchStudents)

displayInTable();