# 🦈 Team Sharks — Student Team Members Management Application

> A full-stack **MERN** application built for **SRM Institute of Science & Technology** to manage student team member profiles with photo uploads, edit support, and a professional yellow & blue campus-themed UI.

---

## 📸 Preview

| Page | Description |
|------|-------------|
| **Home** | Campus background, hero with "TEAM SHARKS" heading, Manage Team section |
| **Add Member** | Two-column form with live photo preview and validation |
| **Team Directory** | Searchable 3-column card grid with View & Edit buttons |
| **Member Details** | Full profile with badges, detail rows, and Edit Profile button |
| **Edit Member** | Pre-filled form, replace photo, save changes via PUT API |

---

## 🗂️ Project Structure

```
FSD AM/
├── backend/
│   ├── models/
│   │   └── Member.js              # Mongoose Member schema (10 fields)
│   ├── routes/
│   │   └── memberRoutes.js        # POST, GET all, GET by ID, PUT by ID
│   ├── uploads/                   # Uploaded profile photos (auto-served)
│   ├── server.js                  # Express entry point (port 5000)
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html             # Montserrat + Open Sans fonts, SRM favicon
│   │   ├── campus.jfif            # SRM campus background photo
│   │   └── srm-logo.webp          # SRM circular badge logo (navbar)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.js            # Landing page — hero + Manage Team section
│   │   │   ├── AddMember.js       # Form with image upload + validation
│   │   │   ├── ViewMembers.js     # Searchable card grid with Edit button
│   │   │   ├── MemberDetails.js   # Full profile view + Edit Profile button
│   │   │   └── EditMember.js      # Pre-filled edit form with image replace
│   │   ├── App.js                 # Router + Navbar (SRM logo) + Footer
│   │   ├── index.css              # Global design system (yellow & blue theme)
│   │   └── index.js               # React entry point
│   └── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

| Tool | Version |
|------|---------|
| Node.js | v16 or higher |
| npm | v8 or higher |
| MongoDB | Running locally on port `27017` |

> Make sure MongoDB service is running before starting the backend.  
> Start it with: `mongod` (in a separate terminal if needed)

---

## 🚀 Installation & Setup

### Step 1 — Navigate to the project folder
```bash
cd "FSD AM"
```

### Step 2 — Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3 — Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Application

Open **two terminal windows** simultaneously.

### Terminal 1 — Backend (Port 5000)
```bash
cd backend
npm run dev
```
Expected output:
```
✅ Connected to MongoDB: mongodb://localhost:27017/teamManagement
🚀 Server running on http://localhost:5000
```

### Terminal 2 — Frontend (Port 3000)
```bash
cd frontend
npm start
```
Browser opens automatically at **http://localhost:3000**

---

## 🌐 API Endpoints

**Base URL:** `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/` | Health check |
| `POST` | `/api/members` | Add new member (multipart/form-data) |
| `GET`  | `/api/members` | Get all members (sorted newest first) |
| `GET`  | `/api/members/:id` | Get single member by MongoDB ID |
| `PUT`  | `/api/members/:id` | Update member details and/or photo |

### POST / PUT — Form Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | ✅ | Full name |
| `rollNumber` | string | ✅ | e.g. `RA2311027010131` |
| `year` | string | ✅ | `1st Year` – `4th Year` |
| `degree` | string | ✅ | e.g. `B.Tech CSE` |
| `project` | string | ✅ | Project description |
| `hobbies` | string | ❌ | Comma-separated |
| `certificate` | string | ❌ | Certificate name |
| `internship` | string | ❌ | Internship details |
| `aboutYourAim` | string | ❌ | Career goal |
| `image` | file | ❌ | JPEG/PNG/WEBP/GIF · Max 5 MB |

> **PUT** — if no new image is uploaded, the existing photo is kept automatically.

---

## 🎨 Frontend Pages & Routes

| Route | Page | Key Features |
|-------|------|-------------|
| `/` | Home | Hero, campus background, Add/View buttons |
| `/add-member` | Add Member | Form with live image preview, validation |
| `/view-members` | Team Directory | Search, 3-col grid, View Details + Edit buttons |
| `/member/:id` | Member Details | Full profile, chip badges, Edit Profile button |
| `/edit-member/:id` | Edit Member | Pre-filled form, photo replace, PUT request |

---

## 🛠️ Tech Stack

### Backend
| Package | Purpose |
|---------|---------|
| **Express** | REST API server |
| **Mongoose** | MongoDB ODM |
| **Multer** | Multipart image upload handler |
| **CORS** | Cross-origin requests from frontend |
| **Nodemon** | Auto-restart on file changes (dev) |

### Frontend
| Package | Purpose |
|---------|---------|
| **React 18** | UI library |
| **React Router v6** | Client-side navigation |
| **Axios** | HTTP client for API calls |
| **Montserrat** | Heading font (matches srmist.edu.in) |
| **Open Sans** | Body font (matches srmist.edu.in) |

---

## 🎨 Design System

- **Theme:** Dark navy blue + gold/yellow accents — matching SRM branding
- **Background:** SRM campus photo with deep blue overlay
- **Logo:** SRM Institute circular badge (Learn · Leap · Lead)
- **Typography:** Montserrat (headings) + Open Sans (body) — same as `srmist.edu.in`
- **Cards:** Glassmorphism with gold border on hover
- **Buttons:** Gold (primary CTA) + Blue (secondary actions)

---

## 📸 Image Uploads

- Stored in `backend/uploads/`
- Served statically at `http://localhost:5000/uploads/<filename>`
- Allowed formats: **JPEG, JPG, PNG, GIF, WEBP**
- Max file size: **5 MB**
- Portrait photos display correctly using `object-position: center 15%`

---

## 🔧 Environment Variables (Optional)

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/teamManagement
```

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| `MongoDB connection failed` | Run `mongod` to start the MongoDB service |
| `Cannot POST /api/members` | Backend not running — start with `npm run dev` in `/backend` |
| Images not loading | Ensure `backend/uploads/` folder exists |
| CORS error | Backend must be on port `5000`, frontend on port `3000` |
| Photo shows half face | Photos now use `objectPosition: center 15%` — re-upload if needed |
| Frontend blank page | Run `npm install` in `/frontend` then `npm start` |

---

## 👥 Team Sharks

Built as part of the **Full Stack Development (FSD)** course — CT2 Group Task Online Assessment.  
**SRM Institute of Science & Technology**  
*Learn · Leap · Lead*
