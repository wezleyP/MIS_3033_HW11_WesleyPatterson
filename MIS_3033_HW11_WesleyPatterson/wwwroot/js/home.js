'use strict';
let addBtn = document.getElementById('addBtn');
let editBtn = document.getElementById('editBtn');
let deleteBtn = document.getElementById('deleteBtn');
let tbl = document.getElementById('tbldiv');
let statusDiv = document.getElementById('status');
let loadTableGlobal = null;



{
    let grid = null;

    async function loadTable() {

        let fd = new FormData();


        let url = rootPath + 'Home/GetPatients';

        let opts = {
            method: 'Post',
            body: fd,
            cache: 'no-store'
        }

        let r = await fetch(url, opts);
        let data = await r.json();

        if (grid != null) {
            grid.destroy();
        }
        tbl.innerHTML = '';

        grid = new gridjs.Grid({
            columns: ['ID', 'Name', 'Age', 'Weight', 'BMI', 'BMILevel'],
            data: data,
            sort: true,
            search: true,
            pagination: {
                limit: 5
            }

        })
        grid.render(tbl);
    }
    loadTableGlobal = loadTable;
    loadTable();
}

{
    async function addPatient() {
        let id = document.getElementById('pid').value;
        let name = document.getElementById('pname').value;
        let age = document.getElementById('page').value;
        let weight = document.getElementById('pweight').value;
        let bmi = document.getElementById('pbmi').value;

        let fd = new FormData();
        fd.append('id', id);
        fd.append('name', name);
        fd.append('age', age);
        fd.append('weight', weight);
        fd.append('bmi', bmi);

        let url = rootPath + 'Home/AddPatient';

        let opts = {
            method: 'Post',
            body: fd,
            cache: 'no-cache'
        }
        let r = await fetch(url, opts);
        let data = await r.json();

        if (data.status == "success") {
            loadTableGlobal();
            statusDiv.innerHTML = "Success";
        } else {
            statusDiv.innerHTML = "Fail";
        }

    }
   
    addBtn.addEventListener('click', addPatient);

}
{
    async function editPatient() {
        let id = document.getElementById('pid').value;
        let name = document.getElementById('pname').value;
        let age = document.getElementById('page').value;
        let weight = document.getElementById('pweight').value;
        let bmi = document.getElementById('pbmi').value;

        let fd = new FormData();
        fd.append('id', id);
        fd.append('name', name);
        fd.append('age', age);
        fd.append('weight', weight);
        fd.append('bmi', bmi);

        let url = rootPath + 'Home/EditPatient';

        let opts = {
            method: 'Post',
            body: fd,
            cache: 'no-cache'
        }
        let r = await fetch(url, opts);
        let data = await r.json();

        if (data.status == "success") {
            loadTableGlobal();
            statusDiv.innerHTML = "Success";
        } else {
            statusDiv.innerHTML = data.mes;
        }

    }
   
    editBtn.addEventListener('click', editPatient);

}

        {
    async function deletePatient() {
        let id = document.getElementById('pid').value;

        let fd = new FormData();
        fd.append('id', id);

        let url = rootPath + 'Home/DeletePatient';

        let opts = {
            method: 'Post',
            body: fd,
            cache: 'no-cache'
        }
        let r = await fetch(url, opts);
        let data = await r.json();

        if (data.status == "success") {
            loadTableGlobal();
            statusDiv.innerHTML = "Success";
        } else {
            statusDiv.innerHTML = data.mes;
        }

    }
   
    deleteBtn.addEventListener('click', deletePatient);

}

