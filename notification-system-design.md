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


# Stage 2

## Database Design

### Database Choice: PostgreSQL
**Reason:** Structured data with relationships, ACID compliance, good for querying notifications by type/student, supports indexing well.

### DB Schema

```sql
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL CHECK (type IN ('Placement', 'Event', 'Result')),
  message TEXT NOT NULL,
  student_id UUID REFERENCES students(id),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Scaling Problems & Solutions
- **Problem:** 50,000 students × millions of notifications = slow queries
- **Solution 1:** Add indexes on `student_id`, `is_read`, `created_at`
- **Solution 2:** Pagination on all list APIs
- **Solution 3:** Archive old notifications to separate table