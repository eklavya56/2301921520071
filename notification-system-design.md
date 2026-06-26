# Notification System Design
# Stage 1

## REST API Design for Campus Notification Platform

### Base URL
`http://localhost:3000/api`

### Authentication
All APIs assume pre-authorised users. Include `Authorization: Bearer <token>` in headers.

---

### Endpoints

#### 1. Get All Notifications
`GET /notifications`

**Headers:**
```json
{ "Authorization": "Bearer <token>" }
```

**Response:**
```json
{
  "notifications": [
    {
      "ID": "uuid",
      "Type": "Placement",
      "Message": "Company XYZ hiring",
      "Timestamp": "2026-04-22 17:51:30",
      "isRead": false
    }
  ]
}
```

---

#### 2. Get Notifications by Type
`GET /notifications?type=Placement`

**Query Params:** `type` = Event | Result | Placement

---

#### 3. Mark Notification as Read
`PATCH /notifications/:id/read`

**Response:**
```json
{ "message": "Notification marked as read" }
```

---

#### 4. Get Unread Count
`GET /notifications/unread-count`

**Response:**
```json
{ "unreadCount": 5 }
```

---

### Real-Time Notifications
Use **WebSockets (Socket.io)** for real-time delivery.
- Server emits `new_notification` event when a new notification arrives
- Client listens and updates UI instantly