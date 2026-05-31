// ============================
// ELEMENTOS
// ============================

const semesterGrid=document.getElementById("semesterGrid");
const subjectsGrid=document.getElementById("subjectsGrid");

const addSemesterBtn=document.getElementById("addSemesterBtn");
const addSubjectBtn=document.getElementById("addSubjectBtn");

const semesterTitle=document.getElementById("semesterTitle");

const graduationBar=document.getElementById("graduationBar");
const graduationText=document.getElementById("graduationText");

const semesterBar=document.getElementById("semesterBar");
const semesterText=document.getElementById("semesterText");

const startDateInput=document.getElementById("startDateInput");
const endDateInput=document.getElementById("endDateInput");

const examList=document.getElementById("examList");
const workList=document.getElementById("workList");

const addExamBtn=document.getElementById("addExamBtn");
const addWorkBtn=document.getElementById("addWorkBtn");


// ============================
// DADOS
// ============================

let semesters=
JSON.parse(
localStorage.getItem(
"nurseflow_semesters"
)
)||[];

let currentSemester=0;


// ============================
// SALVAR
// ============================

function save(){

localStorage.setItem(
"nurseflow_semesters",
JSON.stringify(semesters)
);

}


// ============================
// GARANTIR ESTRUTURA
// ============================

function ensureSemesterData(){

if(!semesters[currentSemester])
return;

const s=
semesters[currentSemester];

if(!s.subjects)
s.subjects=[];

if(!s.exams)
s.exams=[];

if(!s.works)
s.works=[];

if(!s.startDate)
s.startDate="";

if(!s.endDate)
s.endDate="";

}


// ============================
// SEMESTRES
// ============================

function renderSemesters(){

semesterGrid.innerHTML="";

semesters.forEach(
(semester,index)=>{

const wrapper=
document.createElement("div");

wrapper.className=
"semester-wrapper";

const btn=
document.createElement("button");

btn.className=
"semester-btn";

if(index===currentSemester)
btn.classList.add("active");

btn.innerText=
semester.name;

btn.onclick=()=>{

currentSemester=index;

renderAll();

};

const del=
document.createElement("button");

del.className=
"delete-semester";

del.innerText="❌";

del.onclick=()=>{

if(
!confirm(
`Remover ${semester.name}?`
)
)return;

semesters.splice(
index,
1
);

if(
currentSemester>=
semesters.length
){

currentSemester=
semesters.length-1;

}

if(currentSemester<0)
currentSemester=0;

save();

renderAll();

};

wrapper.append(
btn,
del
);

semesterGrid.appendChild(
wrapper
);

}

);

}


// ============================
// DISCIPLINAS
// ============================

function renderSubjects(){

subjectsGrid.innerHTML="";

if(!semesters[currentSemester]){

semesterTitle.innerText=
"Semestre";

return;

}

ensureSemesterData();

const s=
semesters[currentSemester];

semesterTitle.innerText=
s.name;

s.subjects.forEach(
(subject,index)=>{

const wrapper=
document.createElement("div");

wrapper.className=
"subject-wrapper";

const card=
document.createElement("a");

card.className=
"subject-card";

card.href=
`materia.html?nome=${encodeURIComponent(subject)}`;

card.innerText=
subject;

const del=
document.createElement("button");

del.className=
"delete-subject";

del.innerText="❌";

del.onclick=()=>{

s.subjects.splice(
index,
1
);

save();

renderSubjects();

};

wrapper.append(
card,
del
);

subjectsGrid.appendChild(
wrapper
);

}

);

}


// ============================
// PROGRESSO GRADUAÇÃO
// ============================

function updateGraduation(){

if(
semesters.length===0
){

graduationBar.style.width=
"0%";

graduationText.innerText=
"0%";

return;

}

const progress=
Math.floor(

((currentSemester+1)
/ semesters.length)
*100

);

graduationBar.style.width=
progress+"%";

graduationText.innerText=
progress+"%";

}


// ============================
// SEMESTRE
// ============================

function updateSemesterProgress(){

if(!semesters[currentSemester])
return;

ensureSemesterData();

const s=
semesters[currentSemester];

s.startDate=
startDateInput.value;

s.endDate=
endDateInput.value;

save();

if(
!s.startDate||
!s.endDate
){

semesterBar.style.width=
"0%";

semesterText.innerText=
"0%";

return;

}

const start=
new Date(
s.startDate
);

const end=
new Date(
s.endDate
);

const now=
new Date();

let progress=

((now-start)
/(end-start))
*100;

progress=
Math.max(
0,
Math.min(
100,
Math.floor(progress)
)
);

semesterBar.style.width=
progress+"%";

semesterText.innerText=
progress+"%";

}


// ============================
// TAREFAS
// ============================

function renderTasks(){

examList.innerHTML="";
workList.innerHTML="";

if(!semesters[currentSemester])
return;

ensureSemesterData();

const s=
semesters[currentSemester];

startDateInput.value=
s.startDate;

endDateInput.value=
s.endDate;

s.exams.forEach(
task=>
createTask(
examList,
task,
"exam"
)
);

s.works.forEach(
task=>
createTask(
workList,
task,
"work"
)
);

}


function createTask(
container,
task,
type
){

const div=
document.createElement("div");

div.className=
"task-item";

div.innerHTML=

`

<div>

<strong>

${task.name}

</strong>

<p>

📅 ${task.date}

</p>

</div>

<button>

❌

</button>

`;

div.querySelector(
"button"
).onclick=()=>{

const s=
semesters[currentSemester];

if(type==="exam"){

s.exams=
s.exams.filter(
t=>t.id!==task.id
);

}else{

s.works=
s.works.filter(
t=>t.id!==task.id
);

}

save();

renderTasks();

};

container.appendChild(
div
);

}


// ============================
// ADICIONAR
// ============================

addSemesterBtn.onclick=()=>{

const name=
prompt(
"Nome semestre:"
);

if(!name)
return;

semesters.push({

name,

subjects:[],

exams:[],

works:[],

startDate:"",

endDate:""

});

save();

renderAll();

};


addSubjectBtn.onclick=()=>{

if(!semesters[currentSemester]){

alert(
"Crie semestre"
);

return;

}

const name=
prompt(
"Nome disciplina:"
);

if(!name)
return;

semesters[currentSemester]
.subjects
.push(name);

save();

renderSubjects();

};


addExamBtn.onclick=()=>{

const name=
prompt(
"Nome prova:"
);

const date=
prompt(
"Data:"
);

if(!name||!date)
return;

semesters[currentSemester]
.exams
.push({

id:Date.now(),

name,

date

});

save();

renderTasks();

};


addWorkBtn.onclick=()=>{

const name=
prompt(
"Nome trabalho:"
);

const date=
prompt(
"Data:"
);

if(!name||!date)
return;

semesters[currentSemester]
.works
.push({

id:Date.now(),

name,

date

});

save();

renderTasks();

};


// ============================
// EVENTOS
// ============================

startDateInput.addEventListener(
"change",
updateSemesterProgress
);

endDateInput.addEventListener(
"change",
updateSemesterProgress
);


// ============================
// RENDER GERAL
// ============================

function renderAll(){

renderSemesters();

renderSubjects();

renderTasks();

updateGraduation();

updateSemesterProgress();

}

renderAll();