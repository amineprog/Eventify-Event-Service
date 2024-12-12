## **Eventify Event Service**

### **Overview**
This is the Event Service for the Eventify platform. It provides CRUD operations for managing events and uses MongoDB for storage. The service is built with NestJS and supports Docker for containerization.

---

### **Features**
- Create, read, update, and delete events.
- MongoDB integration for persistent storage.
- Dockerized for easy deployment.
- Includes a seeder script to populate the database with dummy data.

---

### **Setup Instructions**

#### **Prerequisites**
1. **Node.js** (v18 or later)
2. **Docker** and **Docker Compose**
3. **MongoDB** (can be run locally or in a container)

---

### **Development Setup**

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:amineprog/Eventify-Event-Service.git
   cd Eventify-Event-Service
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and configure the following variables:

   ```env
   PORT=3002
   MONGO_URI=mongodb://localhost:27017/event-service
   ```

4. **Start the Service**:
   ```bash
   npm run start:dev
   ```

5. **Run Tests**:
   ```bash
   npm test
   ```

---

### **Production Setup**

1. **Build the Project**:
   ```bash
   npm run build
   ```

2. **Run the Service**:
   ```bash
   npm run start
   ```

---

### **Docker Setup**

1. **Build the Docker Image**:
   ```bash
   docker build -t eventify-event-service .
   ```

2. **Run the Container**:
   ```bash
   docker run -d -p 3002:3002 --env-file .env eventify-event-service
   ```

3. **Using Docker Compose**:
   Use the `docker-compose.yml` file to start the service along with MongoDB:

   ```yaml
   version: '3.8'

   services:
     event-service:
       build: .
       ports:
         - "3002:3002"
       environment:
         - MONGO_URI=mongodb://event-mongo:27017/event-service
       depends_on:
         - event-mongo

     event-mongo:
       image: mongo:latest
       ports:
         - "27017:27017"
   ```

   Start the services:
   ```bash
   docker-compose up --build
   ```

---

### **Seeding the Database**

To populate the database with dummy data using Faker.js:

1. **Run the Seeder Script**:
   ```bash
   npm run seed
   ```

2. **What It Does**:
   - Connects to the MongoDB database.
   - Inserts 50 dummy events with random data (name, date, location, description).

3. **Output**:
   You should see a message like:
   ```
   Dummy events inserted!
   ```

4. **Verify the Data**:
   Use MongoDB Compass or a database client to inspect the `events` collection.

---

### **API Endpoints**

| Method | Endpoint      | Description             |
|--------|---------------|-------------------------|
| GET    | `/events`     | Get all events          |
| POST   | `/events`     | Create a new event      |
| GET    | `/events/:id` | Get event by ID         |
| PUT    | `/events/:id` | Update event by ID      |
| DELETE | `/events/:id` | Delete event by ID      |

---


