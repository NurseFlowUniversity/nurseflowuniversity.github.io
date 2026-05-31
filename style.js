// ====================================
// ELEMENTOS
// ====================================

const semesterGrid =
  document.getElementById("semesterGrid");

const subjectsGrid =
  document.getElementById("subjectsGrid");

const addSemesterBtn =
  document.getElementById("addSemesterBtn");

const addSubjectBtn =
  document.getElementById("addSubjectBtn");

const semesterTitle =
  document.getElementById("semesterTitle");

const graduationBar =
  document.getElementById("graduationBar");

const graduationText =
  document.getElementById("graduationText");

const semesterBar =
  document.getElementById("semesterBar");

const semesterText =
  document.getElementById("semesterText");

const startDateInput =
  document.getElementById("startDateInput");

const endDateInput =
  document.getElementById("endDateInput");

const examList =
  document.getElementById("examList");

const workList =
  document.getElementById("workList");

const addExamBtn =
  document.getElementById("addExamBtn");

const addWorkBtn =
  document.getElementById("addWorkBtn");


// ====================================
// DADOS
// ====================================

let semesters =
  JSON.parse(
    localStorage.getItem("nurseflow_semesters")
  ) || [];

let currentSemester = 0;


// ====================================
// SALVAR
// ====================================

function saveSemesters() {

  localStorage.setItem(
    "nurseflow_semesters",
    JSON.stringify(semesters)
  );

}


// ====================================
// RENDER SEMESTRES
// ====================================

function renderSemesters() {

  semesterGrid.innerHTML = "";

  semesters.forEach((semester, index) => {

    const wrapper =
      document.createElement("div");

    wrapper.classList.add("semester-wrapper");

    const button =
      document.createElement("button");

    button.classList.add("semester-btn");

    if (index === currentSemester) {
      button.classList.add("active");
    }

    button.innerText =
      semester.name;

    button.addEventListener("click", () => {

      currentSemester = index;

      renderSemesters();

      renderSubjects();

      updateGraduation();

    });

    // BOTÃO REMOVER

    const deleteBtn =
      document.createElement("button");

    deleteBtn.classList.add("delete-semester");

    deleteBtn.innerText = "❌";

    deleteBtn.addEventListener("click", () => {

      const confirmDelete =
        confirm(
          `Remover ${semester.name}?`
        );

      if (!confirmDelete) {
        return;
      }

      semesters.splice(index, 1);

      if (
        currentSemester >= semesters.length
      ) {
        currentSemester =
          semesters.length - 1;
      }

      if (currentSemester < 0) {
        currentSemester = 0;
      }

      saveSemesters();

      renderSemesters();

      renderSubjects();

      updateGraduation();

    });

    wrapper.appendChild(button);

    wrapper.appendChild(deleteBtn);

    semesterGrid.appendChild(wrapper);

  });

}


// ====================================
// RENDER DISCIPLINAS
// ====================================

function renderSubjects() {

  subjectsGrid.innerHTML = "";

  if (!semesters[currentSemester]) {

    semesterTitle.innerText =
      "Semestre Atual";

    return;

  }

  semesterTitle.innerText =
    semesters[currentSemester].name;

  semesters[currentSemester]
    .subjects
    .forEach((subject, subjectIndex) => {

      const wrapper =
        document.createElement("div");

      wrapper.classList.add("subject-wrapper");

      // CARD

      const card =
        document.createElement("a");

      card.classList.add("subject-card");

      card.href =
        `materia.html?nome=${encodeURIComponent(subject)}`;

      card.innerText = subject;

      // REMOVER

      const deleteBtn =
        document.createElement("button");

      deleteBtn.classList.add("delete-subject");

      deleteBtn.innerText = "❌";

      deleteBtn.addEventListener("click", () => {

        const confirmDelete =
          confirm(
            `Remover ${subject}?`
          );

        if (!confirmDelete) {
          return;
        }

        semesters[currentSemester]
          .subjects
          .splice(subjectIndex, 1);

        saveSemesters();

        renderSubjects();

      });

      wrapper.appendChild(card);

      wrapper.appendChild(deleteBtn);

      subjectsGrid.appendChild(wrapper);

    });

}


// ====================================
// ADICIONAR SEMESTRE
// ====================================

addSemesterBtn.addEventListener("click", () => {

  const semesterName =
    prompt("Nome do semestre:");

  if (!semesterName) {
    return;
  }

  semesters.push({

    name: semesterName,

    subjects: []

  });

  saveSemesters();

  renderSemesters();

  updateGraduation();

});


// ====================================
// ADICIONAR DISCIPLINA
// ====================================

addSubjectBtn.addEventListener("click", () => {

  if (!semesters[currentSemester]) {

    alert(
      "Crie um semestre primeiro."
    );

    return;

  }

  const subjectName =
    prompt("Nome da disciplina:");

  if (!subjectName) {
    return;
  }

  semesters[currentSemester]
    .subjects
    .push(subjectName);

  saveSemesters();

  renderSubjects();

});


// ====================================
// PROGRESSO GRADUAÇÃO
// ====================================

function updateGraduation() {

  if (semesters.length === 0) {

    graduationBar.style.width = "0%";

    graduationText.innerText = "0%";

    return;

  }

  const progress =
    Math.floor(
      ((currentSemester + 1)
      / semesters.length) * 100
    );

  graduationBar.style.width =
    progress + "%";

  graduationText.innerText =
    progress + "%";

}


// ====================================
// PROGRESSO SEMESTRE
// ====================================

function updateSemesterProgress() {

  if (
    !startDateInput.value ||
    !endDateInput.value
  ) {

    semesterBar.style.width = "0%";

    semesterText.innerText = "0%";

    return;

  }

  const startDate =
    new Date(startDateInput.value);

  const endDate =
    new Date(endDateInput.value);

  const today =
    new Date();

  const totalTime =
    endDate - startDate;

  const elapsedTime =
    today - startDate;

  let progress =
    Math.floor(
      (elapsedTime / totalTime) * 100
    );

  if (progress < 0) {
    progress = 0;
  }

  if (progress > 100) {
    progress = 100;
  }

  semesterBar.style.width =
    progress + "%";

  semesterText.innerText =
    progress + "%";

}


// ====================================
// DATAS
// ====================================

startDateInput.addEventListener(
  "change",
  updateSemesterProgress
);

endDateInput.addEventListener(
  "change",
  updateSemesterProgress
);


// ====================================
// ORDENAR DATAS
// ====================================

function sortByDate(container) {

  const items =
    Array.from(container.children);

  items.sort((a, b) => {

    const dateA =
      convertDate(a.dataset.date);

    const dateB =
      convertDate(b.dataset.date);

    return dateA - dateB;

  });

  items.forEach((item) => {

    container.appendChild(item);

  });

}


// ====================================
// CONVERTER DATA
// ====================================

function convertDate(dateString) {

  const parts =
    dateString.split("/");

  const day = parts[0];

  const month = parts[1];

  const year = parts[2];

  return new Date(year, month - 1, day);

}


// ====================================
// CRIAR ITEM
// ====================================

function createTaskItem(
  container,
  nome,
  data
) {

  const item =
    document.createElement("div");

  item.classList.add("task-item");

  item.setAttribute("data-date", data);

  item.innerHTML = `

    <div>

      <strong>${nome}</strong>

      <p>📅 ${data}</p>

    </div>

    <button class="delete-btn">
      ❌
    </button>

  `;

  container.appendChild(item);

  sortByDate(container);

  const deleteBtn =
    item.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", () => {

    item.remove();

  });

}


// ====================================
// PROVAS
// ====================================

addExamBtn.addEventListener("click", () => {

  const nome =
    prompt("Nome da prova:");

  const data =
    prompt("Data da prova:");

  if (!nome || !data) {
    return;
  }

  createTaskItem(
    examList,
    nome,
    data
  );

});


// ====================================
// TRABALHOS
// ====================================

addWorkBtn.addEventListener("click", () => {

  const nome =
    prompt("Nome do trabalho:");

  const data =
    prompt("Data do trabalho:");

  if (!nome || !data) {
    return;
  }

  createTaskItem(
    workList,
    nome,
    data
  );

});


// ====================================
// INICIAR
// ====================================

renderSemesters();

renderSubjects();

updateGraduation();

updateSemesterProgress();