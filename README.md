# 🦈 Team Sharks — Student Team Members Management Application

> A full-stack **MERN** application built for **SRM Institute of Science & Technology**  
> to manage student team member profiles with photo uploads, edit support, and a  
> professional **Yellow & Blue** SRM-themed UI.

**Course:** Full Stack Development (FSD) · CT2 Group Task Online Assessment  
**Institution:** SRM Institute of Science & Technology · *Learn · Leap · Lead*

---

## 🛠️ Tech Stack

### 🔵 Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^18.2.0 | UI library — component-based frontend |
| **React DOM** | ^18.2.0 | Renders React into the browser |
| **React Router DOM** | ^6.18.0 | Client-side routing (5 pages) |
| **Axios** | ^1.6.0 | HTTP client — API calls to backend |
| **React Scripts (CRA)** | 5.0.1 | Build toolchain (webpack, Babel) |
| **Montserrat** | Google Fonts | Heading font — matches srmist.edu.in |
| **Open Sans** | Google Fonts | Body font — matches srmist.edu.in |
| **Vanilla CSS** | — | Custom design system (no Tailwind/Bootstrap) |

### 🟢 Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | ≥ 16.x | JavaScript runtime |
| **Express** | ^4.18.2 | REST API web framework |
| **Mongoose** | ^7.6.3 | MongoDB ODM — schema & queries |
| **Multer** | ^1.4.5-lts.1 | Multipart file upload (profile photos) |
| **CORS** | ^2.8.5 | Cross-origin requests between ports |
| **Nodemon** | ^3.0.1 | Auto-restart server on file changes (dev) |

### 🍃 Database

| Technology | Details |
|------------|---------|
| **MongoDB** | NoSQL document database |
| **Database name** | `teamManagement` |
| **Connection** | `mongodb://localhost:27017/teamManagement` |

### 🎨 Design & UI

| Feature | Implementation |
|---------|---------------|
| **Theme** | Dark navy blue `#050c24` + Gold `#fbbf24` |
| **Background** | SRM campus photo with blue overlay (`campus.jfif`) |
| **Logo** | SRM Institute circular badge (`srm-logo.webp`) |
| **Cards** | Glassmorphism — `backdrop-filter: blur(18px)` |
| **Animations** | CSS transitions on hover (translateY, box-shadow) |
| **Photo display** | `object-fit: cover` + `object-position: center 15%` for portrait alignment |
| **Responsive** | CSS Grid with `auto-fill / minmax` |

---

## 📸 Pages Overview

| Route | Page | Key Features |
|-------|------|-------------|
| `/` | **Home** | Hero heading, campus background, Manage Team section, feature cards |
| `/add-member` | **Add Member** | Two-column form, live photo preview, client-side validation |
| `/view-members` | **Team Directory** | Searchable 3-column card grid with View & Edit buttons |
| `/member/:id` | **Member Details** | Full profile, chip badges, Edit Profile button, timestamps |
| `/edit-member/:id` | **Edit Member** | Pre-filled form, replace photo, PUT request to backend |

---

## 🗂️ Project Structure

```
Team-Sharks/
├── backend/
│   ├── models/
│   │   └── Member.js              # Mongoose schema — 10 fields
│   ├── routes/
│   │   └── memberRoutes.js        # POST · GET all · GET by ID · PUT by ID
│   ├── uploads/                   # Profile photos (auto-served as static)
│   ├── server.js                  # Express entry point — port 5000
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html             # Montserrat + Open Sans · SRM favicon
│   │   ├── campus.jfif            # SRM campus background
│   │   └── srm-logo.webp          # SRM circular badge logo
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── AddMember.js
│   │   │   ├── ViewMembers.js
│   │   │   ├── MemberDetails.js
│   │   │   └── EditMember.js
│   │   ├── App.js                 # Router + Navbar + Footer
│   │   ├── index.css              # Global design system
│   │   └── index.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Node.js | v16 or higher |
| npm | v8 or higher |
| MongoDB | Running locally on port `27017` |

---

## 🚀 Installation & Setup

### 1 — Backend
```bash
cd backend
npm install
npm run dev
```
> Server starts at **http://localhost:5000**  
> Expected: `✅ Connected to MongoDB` · `🚀 Server running on http://localhost:5000`

### 2 — Frontend *(new terminal)*
```bash
cd frontend
npm install
npm start
```
> App opens at **http://localhost:3000**

---

## 🌐 API Endpoints

**Base URL:** `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/api/members` | Add new member (multipart/form-data) |
| `GET` | `/api/members` | Get all members (newest first) |
| `GET` | `/api/members/:id` | Get single member by ID |
| `PUT` | `/api/members/:id` | Update member details and/or photo |

### Request Fields (POST / PUT)

| Field | Required | Type |
|-------|----------|------|
| `name` | ✅ | string |
| `rollNumber` | ✅ | string |
| `year` | ✅ | string (`1st Year` – `4th Year`) |
| `degree` | ✅ | string |
| `project` | ✅ | string |
| `hobbies` | ❌ | string (comma-separated) |
| `certificate` | ❌ | string |
| `internship` | ❌ | string |
| `aboutYourAim` | ❌ | string |
| `image` | ❌ | file (JPEG/PNG/WEBP · max 5 MB) |

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| `MongoDB connection failed` | Run `mongod` in a separate terminal |
| `Cannot POST /api/members` | Backend not running — `cd backend && npm run dev` |
| Images not loading | Ensure `backend/uploads/` folder exists |
| CORS error | Backend on port `5000`, frontend on port `3000` |
| Frontend blank page | `cd frontend && npm install && npm start` |

---

## 👥 Team Sharks

Built as part of the **Full Stack Development (FSD)** course — CT2 Group Task Online Assessment.  
**SRM Institute of Science & Technology** · *Learn · Leap · Lead*
