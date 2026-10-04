import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  getPendingTasks, getTaskTitles, getTaskStats,
  addTask, setTaskCompleted, renameTask, removeTask,
} from "./task-service.js";

// Один сценарий применяется к двум наборам. Состояние принадлежит запуску,
// а расчёты и изменение записей выполняются функциями сервиса.
function runScenario(label, initialTasks, newId, newTitle, priority, completedId, renamedId, removedId) {
  console.log("\n" + label);
  const original = JSON.stringify(initialTasks);
  let currentTasks = initialTasks;

  function show(stage) {
    const { total, completed, pending, progress } = getTaskStats(currentTasks);
    console.log(stage);
    console.log(JSON.stringify(currentTasks));
    console.log("Названия:", JSON.stringify(getTaskTitles(currentTasks)));
    console.log("Невыполненные id:", JSON.stringify(getPendingTasks(currentTasks).map((task) => task.id)));
    console.log(`Всего: ${total}; выполнено: ${completed}; осталось: ${pending}; прогресс: ${progress.toFixed(1)}%`);
    if (total === 0) console.log("Задач пока нет");
  }

  function applyResult(result, stage) {
    if (result.ok) {
      currentTasks = result.tasks;
    } else {
      console.log("Ошибка:", result.error);
    }
    show(stage);
  }

  show("Исходный набор");
  applyResult(addTask(currentTasks, newId, newTitle, priority), "После добавления");
  applyResult(setTaskCompleted(currentTasks, completedId, true), "После установки completed = true");
  applyResult(renameTask(currentTasks, renamedId, "  Подготовить инструкцию запуска  "), "После переименования");
  applyResult(removeTask(currentTasks, removedId), "После удаления");
  applyResult(addTask(currentTasks, newId, "Повторная задача", priority), "После отказа повторного добавления");
  console.log("Итоговые id:", JSON.stringify(currentTasks.map((task) => task.id)));
  console.log("Исходный набор сохранён:", JSON.stringify(initialTasks) === original);
}

runScenario("Общий сценарий", demoTasks, 20, "Добавить проверку", "high", 4, 10, 7);
runScenario(`Индивидуальный вариант ${variantNumber}`, variantTasks, 80, "Проверить демонстрацию релиза", "high", 11, 23, 37);
