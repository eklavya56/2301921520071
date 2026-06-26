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


# Stage 3

## Database Query Analysis

### Given Query:
```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt ASC;
```

### Is this query accurate?
No. Issues:
- `SELECT *` fetches unnecessary columns — wasteful
- No `LIMIT` — fetches all unread notifications at once
- `createdAt ASC` — oldest first, but users want newest first (should be DESC)

### Why is it slow?
- No indexes on `studentID`, `isRead`, `createdAt`
- Full table scan on 5,000,000 rows

### Fixed Query:
```sql
SELECT id, type, message, created_at 
FROM notifications
WHERE student_id = 1042 AND is_read = false
ORDER BY created_at DESC
LIMIT 20;
```

### Should we add indexes on every column?
No. Indexes speed up reads but slow down writes (INSERT/UPDATE). Only index frequently queried columns: `student_id`, `is_read`, `created_at`.

### Recommended Indexes:
```sql
CREATE INDEX idx_notifications_student_id ON notifications(student_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

### Find students with Placement notification in last 7 days:
```sql
SELECT DISTINCT student_id 
FROM notifications
WHERE type = 'Placement'
AND created_at >= NOW() - INTERVAL '7 days';
```



# Stage 4

## Performance Optimization — Caching Strategy

### Problem
Notifications fetch ho rahi hain har page load pe — DB overwhelmed ho raha hai.

### Solutions

#### 1. In-Memory Caching (Redis)
- Cache notifications per student for 30-60 seconds
- On new notification → invalidate that student's cache
- **Tradeoff:** Slightly stale data possible, but massively reduced DB load

#### 2. Pagination
- Fetch only 20 notifications at a time instead of all
- **Tradeoff:** More API calls but each call is fast

#### 3. WebSocket / Server-Sent Events
- Instead of polling DB on every page load, push new notifications to client in real-time
- **Tradeoff:** Persistent connection needed, but no unnecessary DB hits

#### 4. Read Replicas
- Route all GET queries to a read replica of DB
- **Tradeoff:** Small replication lag possible

### Recommended Approach
Combine **Redis caching + Pagination + WebSockets** for best performance.