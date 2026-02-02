# 📝 TodoMVC Playwright Test Suite

## 📌 Overview
This project is an **end‑to‑end UI test suite** for the [TodoMVC React example](https://todomvc.com/examples/react/dist), built with [Playwright](https://playwright.dev/).  
It automates the **core user flows** of the app, ensuring that adding, completing, deleting, and filtering tasks all work as expected.

The goal of this project is to demonstrate:
- **Proficiency in Playwright** for modern web automation
- **Clear, maintainable test code** with stable selectors
- **Real‑world QA thinking** by covering essential user scenarios

> ⚠️ This project is still a **work in progress**. Additional test cases and CI enhancements are actively being developed.

---

## ✅ Test Coverage by Workflow

### 🟩 Add Task Workflow
- Verifies a task appears when added
- Verifies input is cleared after adding a task
- Adds three tasks in order and verifies sequence
- Verifies whitespace is trimmed from input before adding
- Verifies an empty string input is rejected
- Verifies a whitespace-only input is rejected
- Verifies a task with long paragraph text is added
- Adds a task with special characters from a `.txt` file and verifies correct rendering

### ✅ Complete Task Workflow
- Verifies a task is marked as completed
- Verifies a task can be unmarked as completed
- Verifies multiple tasks can be marked as completed
- Verifies pressing "Clear completed" button clears the completed tasks
- Verifies that only completed tasks are cleared when "Clear completed" is pressed
- Verifies the item counter is updated when a task is marked as completed

### ❌ Delete Task Workflow
- Verifies a task can be deleted
- Verifies an empty list when all tasks are deleted

### 🔍 Filter Task Workflow
- Verifies only incompleted tasks are displayed when Active filter is toggled
- Verifies only completed tasks are displayed when Completed filter is toggled

---

## 🛠 Tech Stack
- **Playwright Test Runner** — for browser automation
- **JavaScript/TypeScript** — test implementation
- **HTML Reporter** — for visual test results
- **Chromium, Firefox, WebKit** — cross‑browser coverage
- **GitHub Actions** - for CI test runs and report deployment
- **Rimraf** - for cleaning up report folders on Windows
