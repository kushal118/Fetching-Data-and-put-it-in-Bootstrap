// DON'T EDIT THOSE LINES
const dataURLBase = "https://docs.google.com/spreadsheets/d/";
const dataURLEnd = "/gviz/tq?tqx=out:json&tq&gid=";
const id = "1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE";
const gids = ["0", "1574569648", "1605451198"];
let employees = []
// END OF DATA SETUP
async function fetchGoogleData(url){
  const response = await fetch(url);
  const text = await response.text();
  const employeesResponse = JSON.parse(text.slice(47,-2));
  return employeesResponse.table.rows
}
// create table 
function createEmployeeTable(employeesData){
  let table = document.getElementById('employees');
  table.border="1";
  for(let employee of employeesData){
    let tr = document.createElement('tr');
    table.appendChild(tr)
    for(let property in employee ){
      let td =document.createElement('td');
      td.innerHTML=(employee[property]);
      tr.appendChild(td);

    }
  }
}

async function main (){
//calling sheet#1- name endpoint
let url = dataURLBase + id + dataURLEnd + gids[0]
let rows= await fetchGoogleData(url);
console.log(rows);
let i = 0;
for (let row of rows){
if(row.c[0].v=="first"){
  continue;
}
employees[i]={
  'firstName':row.c[0].v,
  'lastName':row.c[1].v
}
++i;
console.log(employees);
}
// calling 2nd sheet ------hire date
url = dataURLBase + id + dataURLEnd + gids[1]
rows = await fetchGoogleData(url);
i = 0
for (let row of rows){
  employees[i]={...employees[i],
  'hireDate':(new Date(row.c[0].f)).toDateString().slice(4,15)
  }
  ++i;
}
url = dataURLBase + id + dataURLEnd + gids[2]
rows = await fetchGoogleData(url);
i = 0
for (let row of rows){
  employees[i]={...employees[i],
  'salary':Intl.NumberFormat('en-US', {style:'currency',currency:'USD',maximumFractionDigits:0}).format(row.c[0].f)
  }
  ++i;
}
createEmployeeTable(employees);

}


  
 main()