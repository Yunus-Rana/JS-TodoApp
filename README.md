# Todo Simple

A lightweight role-based todo application built with vanilla JavaScript, HTML, and CSS. Users sign in with DummyJSON credentials, then manage todos from a dashboard where access is determined by their role.

## Features

- Login screen with DummyJSON authentication
- Role-based access for user, moderator, and admin accounts
- View todo lists from the dashboard
- Add new todo items
- Toggle todo completion status
- Delete todo items
- Persistent session using browser localStorage
- Responsive, single-page front-end design

## Roles and Permissions

- User: can view and manage their own todos
- Moderator: can view all todos, but cannot edit them
- Admin: can view all todos and edit/delete todos

## Tech Stack

- HTML
- CSS
- JavaScript
- DummyJSON API for authentication and todo data

## Project Structure

```text
todo-simple/
├── index.html         # Login page
├── dashboard.html     # Todo dashboard page
├── login.js           # Authentication logic
├── dashboard.js       # Todo fetching and actions
├── style.css          # Styling
└── README.md          # Project documentation
```

## Getting Started

1. Clone or download the project.
2. Open `index.html` in your browser.
3. Log in with one of the demo DummyJSON accounts, for example:
   - `emilys / emilyspass`
   - `michaelw / michaelwpass`
   - `jacksone / jacksonepass`
   - `madisonc / madisoncpass`
   - `williamg / williamgpass`
   - `charlottem / charlottempass`

## Usage

- After login, you are redirected to the dashboard.
- The app loads todo data from the DummyJSON API.
- Based on your role, you can:
  - add new tasks,
  - mark tasks as complete,
  - delete tasks,
  - or view tasks in a read-only mode.

## Notes

This project is a front-end demonstration and uses a public mock API. Changes are not permanently stored on your local machine; they are simulated through the DummyJSON service.

## License

This project is provided for educational and demonstration purposes.
