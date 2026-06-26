# Campus Notification System – Stage 7 (Frontend)

A React + Vite based notification platform developed as part of the **AffordMed Campus Hiring Evaluation**.

The application fetches notifications from the provided protected API, displays them in a clean Material UI interface, supports notification type filtering, pagination, and integrates the mandatory logging middleware.

---

## 🚀 Features

- 📢 Fetch notifications from protected REST API
- 🔐 JWT Authentication
- 🔍 Filter notifications by:
  - All
  - Placement
  - Result
  - Event
- 📄 Pagination support
- 🎨 Material UI based responsive interface
- 📦 Axios API integration
- 📝 Logging middleware integration
- ⚡ Built using React + Vite

---

## 🛠 Tech Stack

- React 19
- Vite
- Material UI
- Axios
- JavaScript (ES6)
- CSS

---

## 📂 Project Structure

```text
notification-app-fe/
│
├── src/
│   ├── api/
│   │     notifications.js
│   │
│   ├── components/
│   │     NotificationCard.jsx
│   │     NotificationFilter.jsx
│   │
│   ├── hooks/
│   │     useNotifications.js
│   │
│   ├── pages/
│   │     NotificationsPage.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── package.json
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Go inside project

```bash
cd notification-app-fe
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Application runs at

```
http://localhost:5173
```

---

## API Configuration

The application consumes the notification API using Axios.

Example:

```javascript
const API = axios.create({
    baseURL: "http://4.224.186.213/evaluation-service",
    headers:{
        Authorization:`Bearer <JWT_TOKEN>`
    }
});
```

---

## Supported Notification Types

- Placement
- Result
- Event

---

# Screenshots

## All Notifications

![All Notifications](screenshots/output-1.png)

---

## Placement Notifications

![Placement Notifications](screenshots/output-2.png)

---

## Event & Result Notifications

![Event Notifications](screenshots/Screenshot%202026-06-26%20114750.png)

---

## Functionalities Implemented

✔ Notification Listing

✔ JWT Protected API Integration

✔ Material UI Components

✔ Dynamic Notification Cards

✔ Notification Type Filtering

✔ Pagination

✔ Logging Middleware Integration

✔ Responsive Layout

---

## Future Improvements

- Infinite Scrolling
- Dark Mode
- Search Notifications
- Read/Unread Status
- Real-time Updates using WebSockets
- Notification Count API
- Better Error Handling
- Loading Skeletons

---

## Author

**Eklavya Verma**

GitHub: https://github.com/eklavya56

LinkedIn: https://www.linkedin.com/in/eklavyaverma18/

---

## License

This project was developed solely for the AffordMed Campus Hiring Evaluation.
