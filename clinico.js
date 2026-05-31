const openFormBtn = document.getElementById("openFormBtn");

const formSection = document.getElementById("formSection");

const addBtn = document.getElementById("addBtn");


// ABRIR FORM

openFormBtn.addEventListener("click", () => {

  formSection.classList.toggle("hidden");

});


// ADICIONAR CASO

addBtn.addEventListener("click", () => {

  const paciente = document.getElementById("paciente").value;

  const diagnostico = document.getElementById("diagnostico").value;

  const sintomas = document.getElementById("sintomas").value;

  const casesGrid = document.getElementById("casesGrid");

  if (
    paciente === "" ||
    diagnostico === "" ||
    sintomas === ""
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  const card = document.createElement("div");

  card.classList.add("case-card");

  card.innerHTML = `

    <h3>🧑 ${paciente}</h3>

    <div class="diagnosis">
      ${diagnostico}
    </div>

    <p>
      ${sintomas}
    </p>

  `;

  casesGrid.prepend(card);

  document.getElementById("paciente").value = "";

  document.getElementById("diagnostico").value = "";

  document.getElementById("sintomas").value = "";

  formSection.classList.add("hidden");

});