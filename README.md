# SportNest - Sports Facility Booking Management System (Server)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

## Purpose
This is the backend REST API for SportNest, a sports facility booking platform. It handles all CRUD operations for facilities and bookings, JWT-based authentication verification, and MongoDB database management.

## Live URL
🌐 [https://l1-a9-sportnest-sports-facility-booking.onrender.com](https://l1-a9-sportnest-sports-facility-booking.onrender.com)

## Features
- REST API for sports facilities CRUD operations
- Booking management with conflict detection
- JWT token verification middleware for protected routes
- Duplicate booking prevention (same facility, date, and time slot)
- CORS configured for client origin
- Environment variable protection for MongoDB credentials
- Auto DNS configuration for deployment compatibility

## API Endpoints
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /all-facilities | Public |
| GET | /features | Public |
| GET | /all-facilities/:id | Private |
| POST | /all-facilities | Private |
| PATCH | /all-facilities/:id | Private |
| GET | /my-bookings/:userID | Private |
| POST | /my-bookings | Private |
| DELETE | /my-bookings/:id | Private |
| GET | /added-facilities | Private |
| GET | /added-facilities/:userID | Private |
| DELETE | /added-facilities/:id | Private |

## NPM Packages Used
- express
- cors
- dotenv
- mongodb
- jose-cjs

## How to Run Locally

**1. Clone the repository**
```bash
git clone https://github.com/Zihad-1883/L1-A9-SportNest-Sports-Facility-Booking-Management-System-Server.git
cd L1-A9-SportNest-Sports-Facility-Booking-Management-System-Server
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file in the root directory**
```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

**4. Start the development server**
```bash
nodemon index.js
```

**5. The server will run at**
```
http://localhost:8080
```
