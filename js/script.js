var $ = function(id){
    "use strict";
    return window.document.getElementById(id);
}
// CREATE AN ARRAY OF EMPLOYEES
let employees = [
    [38579632, "Ritik", 4574, "ritik12@gmail.com", "Engineering"],
    [37856395, "Nikhil", 8538, "nikhil23@gmail.com", "Engineering"],
    [46884523, "Riya", 7505, "riya34@gmail.com", "Quality Assurance"],
    [46384585, "Soumya", 8479, "soumya45@gmail.com", "Quality Assurance"],
    [76934975, "Yusha", 4507, "yusha56@gmail.com", "Marketing"]
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if (localStorage.getItem('employeeData') !== null) {
    employees = JSON.parse(localStorage.getItem('employeeData'))
};

// GET DOM ELEMENTS
let form = $('addForm');
let table = $('empTable');
let count = $('empCount');
let id = $('id');
// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS

buildGrid();

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    let eid = $('id').value;
    let name = $('name').value;
    let extension= $('extension').value;
    let email= $('email').value;
    let department= $('department').value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    temp = [eid,name,extension,email,department];

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(temp);

    // BUILD THE GRID
    buildGrid();
    // RESET THE FORM
    form.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    id.focus();

});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (e.target.id=='delete'){
        console.log("yolo")
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        let ind = e.target.parentNode.parentNode.rowIndex;
        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(ind-1,1)
        // BUILD THE GRID
        buildGrid();
    };
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    table.removeChild(table.getElementsByTagName("tbody")[0]);

    // REBUILD THE TBODY FROM SCRATCH
    let tbody = window.document.createElement("TBODY");

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for(emp of employees){
        tbody.innerHTML+= '<tr><td>'+String(emp[0])+'</td><td>'+emp[1]+'</td><td>'+String(emp[2])+'</td><td>'+emp[3]+'</td><td>'+emp[4]+'</td><td><button id="delete" class="btn-danger">X</button></td></tr>';
    };
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    table.appendChild(tbody);
    // UPDATE EMPLOYEE COUNT
    count.innerText = '(' + String(employees.length)+')';
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employeeData', JSON.stringify(employees));

};