# Технологии индустриального программирования

Решения практических работ по JavaScript, 3 семестр, РТУ МИРЭА.

**Автор:** Нажев Рустам  
**Группа:** ЭФБО-15-25  
**Номер в журнале:** 23  
**Вариант:** 7, поскольку `((23 - 1) % 8) + 1 = 7`.

## Практические работы

- [ПР1 — окружение, типы, условия и циклы](./practice-01/README.md)
- [ПР2 — функции, объекты, массивы и модули](./practice-02/README.md)
- [ПР3 — DOM и события](./practice-03/README.md)

## Подготовка и запуск

Нужны Node.js 24 LTS, npm и браузер. Сторонних зависимостей нет, `npm install` не требуется.

Команды из корня репозитория:

```bash
node practice-01/js/hello.js
node practice-01/js/types.js
node practice-01/js/progress.js
node practice-01/js/plan.js
node practice-01/js/debug.js
node practice-02/src/main.js
node practice-02/checks.js
node practice-02/own-checks.js
node practice-03/checks/service.checks.js
node practice-03/tools/serve.mjs
```

ПР3: открыть <http://127.0.0.1:5503/>. Свой вариант: <http://127.0.0.1:5503/index.html?dataset=variant>. Браузерные проверки: <http://127.0.0.1:5503/checks.html>. Остановка сервера — `Ctrl+C`.

В Windows при блокировке `npm.ps1` можно использовать `npm.cmd` или прямые команды `node`.

## Пояснения и материалы

- [Разбор кода и ответы для защиты](./docs/DEFENSE.md).
- [Карта учебного репозитория и порядок дальнейших работ](./docs/COURSE_MAP.md).
- Фактические протоколы находятся в папках `practice-XX/results`.
- [Методички преподавателя](https://github.com/adyshkins/TIP-JS).

Проверки выполнялись в отдельном Linux-окружении разработки. Его версии приведены в отчётах; они не описывают личный компьютер автора.
