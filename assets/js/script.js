function editTask() {
  const tasks = document.querySelectorAll("#tasks .task");

  tasks.forEach(tarefa => {
    const editButton = tarefa.querySelector(".editButton");
    const taskDescription = tarefa.querySelector(".descriptionTask");
    const editTaskForm = tarefa.querySelector(".editTaskForm");
    const editInput = editTaskForm.querySelector("input[name='descriptionEditInput']");

    editButton.addEventListener("click", (event) => {
      event.preventDefault();

      editInput.value = taskDescription.textContent.trim();
      editTaskForm.hidden = false;
      editInput.focus();
    });

    editTaskForm.onsubmit = (e) => {
      e.preventDefault();

      const newText = editInput.value.trim();
      if (newText !== "") {
        taskDescription.textContent = newText;
      }
      editTaskForm.hidden = true;
      editInput.value = "";
    };
  });
}

document.addEventListener("DOMContentLoaded", editTask);
