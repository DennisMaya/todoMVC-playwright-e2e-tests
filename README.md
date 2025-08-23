# 📝 TodoMVC Playwright Test Suite

## 📌 Overview
This project is an **end‑to‑end UI test suite** for the [TodoMVC React example](https://todomvc.com/examples/react/dist), built with [Playwright](https://playwright.dev/).  
It automates the **core user flows** of the app, ensuring that adding, completing, deleting, and filtering tasks all work as expected.

The goal of this project is to demonstrate:
- **Proficiency in Playwright** for modern web automation
- **Clear, maintainable test code** with stable selectors
- **Real‑world QA thinking** by covering essential user scenarios

---

## ✅ Test Coverage

### **1. Add a New Task**
- Navigates to the TodoMVC app
- Adds a single task
- Verifies it appears in the list

### **2. Complete a Task**
- Adds a task
- Marks it as completed
- Verifies the checkbox is checked

### **3. Delete a Task**
- Adds a task
- Deletes it via the UI
- Verifies the list is empty

### **4. Filter Tasks**
- Adds multiple tasks
- Marks one as completed
- Uses the **Active** filter to show only active tasks
- Verifies the correct task is displayed

---

## 🛠 Tech Stack
- **Playwright Test Runner** — for browser automation
- **JavaScript** — test implementation
- **HTML Reporter** — for visual test results
- **Chromium, Firefox, WebKit** — cross‑browser coverage
