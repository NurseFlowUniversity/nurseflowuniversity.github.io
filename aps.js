const openFormBtn = document.getElementById("openFormBtn");

const formSection = document.getElementById("formSection");

const addBtn = document.getElementById("addBtn");


// ABRIR FORMULÁRIO

openFormBtn.addEventListener("click", () => {

  formSection.classList.toggle("hidden");

});


// ADICIONAR APS

addBtn.addEventListener("click", () => {

  const titulo = document.getElementById("titulo").value;

  const materia = document.getElementById("materia").value;

  const data = document.getElementById("data").value;

  const descricao = document.getElementById("descricao").value;

  const apsGrid = document.getElementById("apsGrid");

  if (
    titulo === "" ||
    materia === "" ||
    data === "" ||
    descricao === ""
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  const card = document.createElement("div");

  card.classList.add("aps-card");

  card.innerHTML = `

    <div class="top">
      <h3>${titulo}</h3>
      <span>Pendente</span>
    </div>

    <p>${descricao}</p>

    <div class="info">
      <small>📅 Entrega: ${data}</small>
      <small>📚 ${materia}</small>
    </div>

    <div class="progress-bar">
      <div class="progress-fill w40"></div>
    </div>

    <button>Abrir APS</button>

  `;

  apsGrid.prepend(card);

  document.getElementById("titulo").value = "";
  document.getElementById("materia").value = "";
  document.getElementById("data").value = "";
  document.getElementById("descricao").value = "";

  formSection.classList.add("hidden");

});