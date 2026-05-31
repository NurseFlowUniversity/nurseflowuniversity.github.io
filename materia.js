// =========================
// DISCIPLINA
// =========================

const params=
new URLSearchParams(
window.location.search
);

const subject=
params.get("nome")||
"Disciplina";

document
.getElementById(
"subjectTitle"
)
.innerText=
subject;


// =========================
// ELEMENTOS
// =========================

const aulaInput=
document.getElementById(
"aulaInput"
);

const atividadeInput=
document.getElementById(
"atividadeInput"
);

const aulaList=
document.getElementById(
"aulaList"
);

const atividadeList=
document.getElementById(
"atividadeList"
);


// =========================
// DATABASE
// =========================

let db;

const request=
indexedDB.open(
"NurseFlowDB",
1
);

request.onupgradeneeded=
(event)=>{

db=
event.target.result;

if(
!db.objectStoreNames.contains(
"files"
)
){

db.createObjectStore(
"files",
{
keyPath:"id"
}
);

}

};

request.onsuccess=
(event)=>{

db=
event.target.result;

loadFiles();

};


// =========================
// SALVAR
// =========================

function saveFile(
file,
type
){

const reader=
new FileReader();

reader.onload=
()=>{

const tx=
db.transaction(
["files"],
"readwrite"
);

tx.objectStore(
"files"
).put({

id:
Date.now()+
Math.random(),

subject,

type,

name:
file.name,

mime:
file.type,

data:
reader.result

});

tx.oncomplete=
loadFiles;

};

reader.readAsDataURL(
file
);

}


// =========================
// UPLOAD
// =========================

aulaInput.addEventListener(
"change",
()=>{

Array.from(
aulaInput.files
).forEach(
file=>
saveFile(
file,
"aula"
)
);

aulaInput.value="";

}
);


atividadeInput.addEventListener(
"change",
()=>{

Array.from(
atividadeInput.files
).forEach(
file=>
saveFile(
file,
"atividade"
)
);

atividadeInput.value="";

}
);


// =========================
// ABRIR PDF
// =========================

function openFile(file){

fetch(file.data)

.then(response => response.blob())

.then(blob => {

const url =
URL.createObjectURL(
blob
);

window.open(
url,
"_blank"
);

setTimeout(()=>{

URL.revokeObjectURL(
url
);

},10000);

});

}


// =========================
// RENDER ITEM
// =========================

function renderItem(
file,
container
){

const div=
document.createElement(
"div"
);

div.className=
"pdf-item";

div.innerHTML=

`

<div>

📄 ${file.name}

</div>

<div>

<button class="open">

Abrir

</button>

<button class="delete">

❌

</button>

</div>

`;

div.querySelector(
".open"
).onclick=
()=>{

openFile(
file
);

};

div.querySelector(
".delete"
).onclick=
()=>{

const tx=
db.transaction(
["files"],
"readwrite"
);

tx.objectStore(
"files"
).delete(
file.id
);

tx.oncomplete=
loadFiles;

};

container.appendChild(
div
);

}


// =========================
// CARREGAR
// =========================

function loadFiles(){

aulaList.innerHTML="";

atividadeList.innerHTML="";

const tx=
db.transaction(
["files"],
"readonly"
);

const request=
tx.objectStore(
"files"
).getAll();

request.onsuccess=
()=>{

request.result

.filter(
f=>
f.subject===
subject
)

.forEach(
file=>{

if(
file.type===
"aula"
){

renderItem(
file,
aulaList
);

}else{

renderItem(
file,
atividadeList
);

}

}
);

};

}