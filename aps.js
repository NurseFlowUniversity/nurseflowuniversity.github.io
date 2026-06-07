const openFormBtn =
document.getElementById(
"openFormBtn"
);

const formSection =
document.getElementById(
"formSection"
);

const addBtn =
document.getElementById(
"addBtn"
);

const apsGrid =
document.getElementById(
"apsGrid"
);


// =====================
// STORAGE
// =====================

let apsList =

JSON.parse(
localStorage.getItem(
"nurseflow_aps"
)
) || [];


// =====================
// FORM
// =====================

openFormBtn.addEventListener(
"click",
()=>{

formSection.classList.toggle(
"hidden"
);

}
);


// =====================
// RENDER
// =====================

function renderAPS(){

apsGrid.innerHTML="";

apsList.forEach(
aps=>{

const card =
document.createElement(
"div"
);

card.className=
"aps-card";

card.innerHTML=`

<div class="top">

<h3>

${aps.titulo}

</h3>

<span>

Pendente

</span>

</div>

<p>

${aps.descricao}

</p>

<div class="info">

<small>

📅 Entrega:
${aps.data}

</small>

<small>

📚 ${aps.materia}

</small>

</div>

<div class="progress-bar">

<div class="progress-fill w40">

</div>

</div>

<button>

Abrir APS

</button>

`;

card
.querySelector(
"button"
)
.onclick=()=>{

alert(

`APS:

${aps.titulo}

Disciplina:

${aps.materia}

Entrega:

${aps.data}

${aps.descricao}`

);

};

apsGrid.appendChild(
card
);

}

);

}


// =====================
// ADD APS
// =====================

addBtn.addEventListener(
"click",
()=>{

const titulo=
document.getElementById(
"titulo"
).value;

const materia=
document.getElementById(
"materia"
).value;

const data=
document.getElementById(
"data"
).value;

const descricao=
document.getElementById(
"descricao"
).value;

if(

!titulo||
!materia||
!data||
!descricao

){

alert(
"Preencha todos os campos"
);

return;

}

apsList.unshift({

id:
Date.now(),

titulo,

materia,

data,

descricao

});

localStorage.setItem(

"nurseflow_aps",

JSON.stringify(
apsList
)

);

renderAPS();

document.getElementById(
"titulo"
).value="";

document.getElementById(
"materia"
).value="";

document.getElementById(
"data"
).value="";

document.getElementById(
"descricao"
).value="";

formSection.classList.add(
"hidden"
);

}

);


// =====================
// START
// =====================

renderAPS();