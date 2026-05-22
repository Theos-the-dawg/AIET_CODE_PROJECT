# 📌 Software Development Life Cycle (SDLC) Template

## 🧾 Project Overview

- **Project Name:** Gadget house
- **Project Description:** A express.js E-Commerce application that will allow users to create accounts shop for products and purchase the ,
- **Start Date:** 14 APRIL 2026
- **End Date (Estimated):** 30 APRIL 2026
- **Project Manager:** Motheo Marutla.
- **Team Members:** Master and Gerald
- **Stakeholders:**

---

## 🧠 1. Planning Phase

### Objectives

### Scope

- - In Scope:
- User registration and login
- Session management
- Product display (computers, phones, gadgets)
- Out of Scope:

  - - Online payments
- Advanced security (OAuth, 2FA)
- Admin dashboard


Basic frontend UI

### Feasibility Analysis

- **Technical Feasibility:** Achievable using Express.js, HTML, CSS, and JavaScript
- **Economic Feasibility:** Low cost. Only requires a computer and internet.
- **Operational Feasibility:** Easy to use for basic users

### Risks Identified

- [ ] Risk 1: Weak authentication security if not implemented properly
- [ ] Risk 2: Poor UI design may affect usability
- [ ] Risk 3:Database connection issues
- [ ] Risk 4:Team coordination issues

---

## 📊 2. Requirements Analysis

### Functional Requirements

- [ ] 
- [ ] Users must be able to log in and log out
- [ ] The system must store user data in a database
- [ ] Users must be able to view products by category
- [ ] 

### Non-Functional Requirements

- [ ] Performance:  Pages should load within 2–3 seconds
- [ ] Security: Passwords must be hashed
- [ ] Usability:  Simple and clean UI
- [ ] Scalability:  System should support adding more products

### User Stories:

* As a user, I want to register an account so I can access the system

- As a user, I want to log in so I can browse products
- As a user, I want to view products so I can choose what to buy
- As a user I want to sign out when I finish browsing the website.

### Use Cases

- Use Case 1: User Registration
- Use Case 2: User Login
- Use Case 3: User View Products
- Use Case 4: User purchase products

---

## 🏗️ 3. System Design

### Architecture Overview

Client (Browser) → Express Server → Database

### Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Tools & Frameworks:** Git, VS Code, Obsidian

### Database Design

  **User Login Credentials:**

- Users:
- id
- email
- password

 **Products:**

- id
- name
- timestamp
- stock quantity
- price
- category
- image
- description
  **Orders:**
- order id
- customer name
- order date
- total amount
- status
- quantity
- **Relationships:**

  - Registration/Login Interface
  - Home age with featured products
- Navigation bar with categories
- Simple product cards layout

### UI/UX Design

- Home page with featured products
- Navigation bar with categories
- Simple product cards layout
### Endpoints Explanation
-127.0.0.1:3000/HOME:
Renders the main landing page of Gadget House.
-127.0.0.1:3000/ABOUT:
Displays the About page with Gadget Houses's story and values.
-127.0.0.1:3000/CONTACT:
Shows a contact form for users to send meassges to Gadget-House.
127.0.0.1:3000/SERVICES:
Highlights key services offered, such as techsupport and warranty, and secure checkout.
127.0.0.1:3000/Get_Product_By_Id:
Fetches and displays details of a single products by it's ID.
127.0.0.1:3000/Get_All_Products:
Retrieves and lists all available products in the store.
127.0.0.1:3000/Users/Login:
Renders the login form and handles user aunthentication.
127.0.0.1:3000/Users/Logout:
Logs the current user out and ends their session.
127.0.0.1:3000/Get_user:
Retrieves a specific user's infromation by their ID.
127.0.0.1:3000/Users/My_Data:
Displays the curreently logged in user's own profile and data.
---

## 💻 4. Development Phase

### Modules / Features

- [ ] Authentication System
- [ ] Product Display System
- [ ] Frontend UI

### Coding Standards

- Naming conventions: camelCase for variables
- Documentation standards: Comment important functions

### Version Control

- Repository: GitHub
- Branch Strategy: main + feature branches

---

## 🧪 5. Testing Phase

### Test Cases

- User can register successfully
- User cannot log in with wrong password
- Products display correctly

### Bugs / Issues

- [ ] Fix login errors
- [ ] Fix UI alignment issues

---

## 🚀 6. Deployment Phase

### Deployment Strategy

- Manual deployment

### Environment

- Production: Localhost or hosting platform
- Staging: Development environment

---

## 🔧 7. Maintenance Phase

### Updates & Improvements

- [ ] Add cart system
- [ ] Improve UI design

---

## 📎 Additional Notes

---

## 🔗 Linked Notes (Obsidian)

- [[Requirements Docs]]
- [[API Documentation]]
- [[Meeting Notes]]
- [[Sprint Planning]]

---

## ✅ Checklist Summary

- [ ] Planning Completed
- [ ] Requirements Approved
- [ ] Design Finalized
- [ ] Development Completed
- [ ] Testing Passed
- [ ] Deployment Done
- [ ] Maintenance Ongoing
