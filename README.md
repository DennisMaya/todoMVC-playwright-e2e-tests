# 📝 TodoMVC Playwright Test Suite

## 📌 Overview
This project is an **end‑to‑end UI test suite** for the [TodoMVC React example](https://todomvc.com/examples/react/dist), built with [Playwright](https://playwright.dev/).  
It automates the **core user flows** of the app, ensuring that adding, completing, deleting, and filtering tasks all work as expected.

The goal of this project is to demonstrate:
- **Proficiency in Playwright** for modern web automation
- **Clear, maintainable test code** with stable selectors
- **Real‑world QA thinking** by covering essential user scenarios

---

## ✅ Test Coverage by Workflow

### 🟩 Add Task Workflow
- Adds a single task and verifies it appears
- Clears input after adding a task
- Adds three tasks in order and verifies sequence
- Trims whitespace from input before saving
- Rejects empty string input
- Rejects whitespace-only input
- Adds a task with long paragraph text
- Adds a task with special characters from a `.txt` file and verifies correct rendering

### ✅ Complete Task Workflow
- Adds a task
- Marks it as completed
- Verifies the checkbox is checked

### ❌ Delete Task Workflow
- Adds a task
- Deletes it via the UI
- Verifies the list is empty

### 🔍 Filter Task Workflow
- Adds multiple tasks
- Marks one as completed
- Uses the **Active** filter to show only active tasks
- Verifies that only the correct task is displayed

---

## 🛠 Tech Stack
- **Playwright Test Runner** — for browser automation
- **JavaScript** — test implementation
- **HTML Reporter** — for visual test results
- **Chromium, Firefox, WebKit** — cross‑browser coverage
