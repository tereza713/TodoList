function editTask() {
  const tasks = document.querySelectorAll("#tasks .task");

  tasks.forEach(tarefa => {
    const editButton = tarefa.querySelector(".editButton");
    const infoTask = tarefa.querySelector(".infoTask");
    const taskActions = tarefa.querySelector(".taskActions");
    const descriptionTask = tarefa.querySelector(".descriptionTask");
    const editTaskForm = tarefa.querySelector(".editTaskForm");
    const editInput = editTaskForm ? editTaskForm.querySelector("input[name='descriptionEditInput']") : null;

    if (!editButton || !editTaskForm || !editInput) return; 

    editButton.addEventListener("click", (event) => {
      event.preventDefault();

      editInput.value = descriptionTask.textContent.trim();
      editTaskForm.hidden = false;
      editInput.focus();
      infoTask.classList.add("hidden");
      taskActions.classList.add("hidden");
    });
  });
}

function doneTask() {
  const checkBoxes = document.querySelectorAll(".progress"); // pega a classe de progressp

  checkBoxes.forEach((checkbox) => { // foreach para percorrer cada checkbox 
    const taskItem = checkbox.closest(".task");
    const description = taskItem.querySelector(".descriptionTask");

    // coloca o risco na tarefa se vier do banco true
    if (checkbox.checked) {
      description.classList.add("doneLine");
    } else {
      description.classList.remove("doneLine");
    }

    // Adiciona o risco para cada checkbox
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        description.classList.add("doneLine");
      } else {
        description.classList.remove("doneLine");
      }

      // dados para enviar
      const taskId = taskItem.dataset.id;
      const completed = checkbox.checked ? 1 : 0;

      // ajax
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/assets/php/updateProgress.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          if (!response.success) {
            alert("Erro ao atualizar no banco!");
          }
        } else {
          alert("Erro na requisição AJAX!");
        }
      };

      xhr.onerror = () => {
        alert("Erro na conexão AJAX!");
      };

      xhr.send(`id=${taskId}&completed=${completed}`);
    });
  });
}

document.addEventListener("DOMContentLoaded", doneTask);
document.addEventListener("DOMContentLoaded", editTask);
