# SportNest - Sports Facility Booking Management System (Server)

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
