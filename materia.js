// =========================
// PEGAR DISCIPLINA
// =========================

const params =
new URLSearchParams(
window.location.search
);

const subject =
params.get("nome") || "Disciplina";

document
.getElementById("subjectTitle")
.innerText =
subject;


// =========================
// ELEMENTOS
// =========================

const aulaInput =
document.getElementById(
"aulaInput"
);

const atividadeInput =
document.getElementById(
"atividadeInput"
);

const aulaList =
document.getElementById(
"aulaList"
);

const atividadeList =
document.getElementById(
"atividadeList"
);


// =========================
// ABRIR DATABASE
// =========================

let db;

const request =
indexedDB.open(
"NurseFlowDB",
1
);

request.onupgradeneeded =
(event)=>{

db =
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

request.onsuccess =
(event)=>{

db =
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

const reader =
new FileReader();

reader.onload =
()=>{

const transaction =
db.transaction(
["files"],
"readwrite"
);

const store =
transaction.objectStore(
"files"
);

store.put({

id:
Date.now()+
Math.random(),

subject,

type,

name:
file.name,

data:
reader.result

});

transaction.oncomplete=
()=>{

loadFiles();

};

};

reader.readAsDataURL(
file
);

}


// =========================
// UPLOADS
// =========================

aulaInput.addEventListener(
"change",
()=>{

Array.from(
aulaInput.files
).forEach(
file=>saveFile(
file,
"aula"
)
);

});

atividadeInput.addEventListener(
"change",
()=>{

Array.from(
atividadeInput.files
).forEach(
file=>saveFile(
file,
"atividade"
)
);

});



// =========================
// RENDER
// =========================

function renderItem(
file,
container
){

const div =
document.createElement(
"div"
);

div.className =
"pdf-item";

div.innerHTML =

`

<a
href="${file.data}"
target="_blank">

📄 ${file.name}

</a>

<button>

❌

</button>

`;

const btn =
div.querySelector(
"button"
);

btn.onclick=
()=>{

const tx=
db.transaction(
["files"],
"readwrite"
);

tx.objectStore(
"files"
)
.delete(
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

const tx =
db.transaction(
["files"],
"readonly"
);

const store =
tx.objectStore(
"files"
);

const request =
store.getAll();

request.onsuccess=
()=>{

request.result
.filter(
f=>
f.subject===subject
)
.forEach(
file=>{

if(
file.type==="aula"
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