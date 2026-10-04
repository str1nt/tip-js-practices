import { getTaskStats } from "./task-service.js";

export function createTaskElement(task) {
  const card = document.createElement("li");
  card.className = "task-card";
  card.dataset.taskId = String(task.id);
  card.classList.toggle("is-completed", task.completed);

  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;

  const status = document.createElement("p");
  status.className = "task-status";
  status.textContent = task.completed ? "Выполнена" : "В работе";

  const priority = document.createElement("p");
  priority.className = "task-priority";
  const captions = { low: "Низкий", medium: "Средний", high: "Высокий" };
  priority.textContent = captions[task.priority];

  const actions = document.createElement("div");
  actions.className = "task-actions";
  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.dataset.action = "toggle";
  toggleButton.setAttribute("aria-pressed", String(task.completed));
  const toggleLabel = document.createElement("span");
  toggleLabel.className = "action-label";
  toggleLabel.textContent = "Выполнена";
  toggleButton.append(toggleLabel);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete";
  const deleteLabel = document.createElement("span");
  deleteLabel.className = "action-label";
  deleteLabel.textContent = "Удалить";
  deleteButton.append(deleteLabel);
  actions.append(toggleButton, deleteButton);
  card.append(title, status, priority, actions);
  return card;
}

export function renderTaskList(listElement, tasks) {
  const cards = tasks.map((task) => createTaskElement(task));
  listElement.replaceChildren(...cards);
}

export function renderSummary(summaryElement, tasks, visibleCount) {
  const { total, completed, pending, progress } = getTaskStats(tasks);
  summaryElement.querySelector('[data-stat="total"]').textContent = total;
  summaryElement.querySelector('[data-stat="completed"]').textContent = completed;
  summaryElement.querySelector('[data-stat="pending"]').textContent = pending;
  summaryElement.querySelector('[data-stat="progress"]').textContent = progress.toFixed(1) + "%";
  summaryElement.querySelector('[data-stat="visible"]').textContent = visibleCount;
}

export function renderEmptyState(messageElement, total, visibleCount) {
  if (visibleCount > 0) {
    messageElement.textContent = "";
    messageElement.hidden = true;
  } else {
    messageElement.textContent = total === 0 ? "Список задач пуст." : "Нет задач по выбранному фильтру.";
    messageElement.hidden = false;
  }
}
