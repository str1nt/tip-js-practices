import assert from "node:assert/strict";
import { demoTasks, variantTasks } from "./src/data.js";
import { addTask, removeTask, renameTask, setTaskCompleted, getTaskStats } from "./src/task-service.js";

// Собственные последовательности действий дополняют 35 проверок преподавателя.
const snapshot = JSON.stringify(demoTasks);

{
  const deleted = removeTask(demoTasks, 4);
  assert.equal(deleted.ok, true);
  const added = addTask(deleted.tasks, 4, "Возвращённая задача", "low");
  assert.equal(added.ok, true);
  assert.deepEqual(added.tasks.map((task) => task.id), [1, 7, 10, 4]);
  assert.equal(added.tasks[3].completed, false);
  assert.equal(added.tasks[3].priority, "low");
  console.log("OK: Удаление и добавление того же id: [1, 7, 10, 4], новая запись последняя.");
}

{
  const first = renameTask(demoTasks, 1, "Первая задача");
  assert.equal(first.ok, true);
  const last = setTaskCompleted(first.tasks, 10, false);
  assert.equal(last.ok, true);
  assert.equal(last.tasks[0].title, "Первая задача");
  assert.equal(last.tasks[3].completed, false);
  assert.equal(first.tasks[3].completed, true);
  assert.equal(demoTasks[0].title, "Изучить функции");
  assert.deepEqual(getTaskStats(last.tasks), { total: 4, completed: 1, pending: 3, progress: 25 });
  console.log("OK: Переименование первой и изменение последней записи: 4 / 1 / 3 / 25%; прежние состояния сохранены.");
}

{
  const added = addTask(variantTasks, 80, "Проверить демонстрацию релиза", "high");
  assert.equal(added.ok, true);
  const changed = setTaskCompleted(added.tasks, 11, true);
  assert.equal(changed.ok, true);
  const renamed = renameTask(changed.tasks, 23, "Подготовить инструкцию запуска");
  assert.equal(renamed.ok, true);
  const deleted = removeTask(renamed.tasks, 37);
  assert.equal(deleted.ok, true);
  const repeated = addTask(deleted.tasks, 80, "Повтор", "high");
  assert.equal(repeated.ok, false);
  assert.deepEqual(deleted.tasks.map((task) => task.id), [11, 23, 41, 58, 64, 80]);
  assert.equal(getTaskStats(deleted.tasks).completed, 5);
  assert.equal(getTaskStats(deleted.tasks).progress.toFixed(1), "83.3");
  assert.equal(variantTasks.length, 6);
  assert.equal(variantTasks.every((task) => task.completed), true);
  console.log("OK: Вариант 7: [11, 23, 41, 58, 64, 80], 6 / 5 / 1 / 83.3%, повторный id отклонён.");
}

assert.equal(JSON.stringify(demoTasks), snapshot);
console.log("Собственных проверок пройдено: 3; ошибок: 0.");
