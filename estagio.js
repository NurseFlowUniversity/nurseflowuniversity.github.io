const openFormBtn = document.getElementById("openFormBtn");

const formSection = document.getElementById("formSection");

const addBtn = document.getElementById("addBtn");


// ABRIR FORM

openFormBtn.addEventListener("click", () => {

  formSection.classList.toggle("hidden");

});


// ADICIONAR REGISTRO

addBtn.addEventListener("click", () => {

  const local = document.getElementById("local").value;

  const setor = document.getElementById("setor").value;

  const horas = document.getElementById("horas").value;

  const observacoes = document.getElementById("observacoes").value;

  const stageGrid = document.getElementById("stageGrid");

  if (
    local === "" ||
    setor === "" ||
    horas === "" ||
    observacoes === ""
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  const card = document.createElement("div");

  card.classList.add("stage-card");

  card.innerHTML = `

    <h3>🏥 ${local}</h3>

    <div class="sector">
      ${setor}
    </div>

    <p>
      ${observacoes}
    </p>

    <div class="hours">
      ⏱️ ${horas} horas
    </div>

  `;

  stageGrid.prepend(card);

  document.getElementById("local").value = "";

  document.getElementById("setor").value = "";

  document.getElementById("horas").value = "";

  document.getElementById("observacoes").value = "";

  formSection.classList.add("hidden");

});