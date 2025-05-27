# 🚀 TrackFlow – CRM & Operations Manager

**TrackFlow** is a full-stack CRM and operations automation app built with **FastAPI** (backend) and **React + Tailwind CSS** (frontend). It helps manage leads, track orders, and view live dashboards for actionable business insights.

---

## 🔑 Features

### 🧲 Lead Management
- Add, view, and update sales leads
- Stages include: New → Contacted → Qualified → Proposal Sent → Won → Lost
- Assign follow-up dates and companies

### 📦 Order Management
- Link leads to orders upon conversion
- Track order status: Received → In Development → Dispatched
- Add dispatch and tracking details

### 📊 Real-Time Dashboard
- Bar chart of leads by stage
- Pie chart of orders by status
- Built using `react-chartjs-2`

### 💅 Clean UI with Tailwind CSS
- Fully responsive and modern design
- Smooth dropdowns and inputs
- Visual clarity and ease of use

---

## 🧱 Tech Stack

| Layer       | Tech              |
|-------------|-------------------|
| Frontend    | React + Tailwind  |
| Backend     | FastAPI + SQLAlchemy |
| API Testing | Swagger UI        |
| Charts      | Chart.js          |
| Deployment  | Vercel (Frontend) + Render (Backend)

---

## 📁 Project Structure
trackflow/
├── backend/ # FastAPI backend
│ └── app/
│ ├── main.py
│ ├── models.py
│ ├── schemas.py
│ ├── database.py
│ └── crud.py
├── frontend/ # React frontend
│ └── src/
│ ├── App.js
│ ├── Dashboard.js
│ ├── index.js
│ └── index.css


---------

## ⚙️ Setup Instructions

### Backend (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload


Visit: http://localhost:8000/docs to access it.

Frontend (React + Tailwind)
bash
Copy
Edit
cd frontend
npm install
npm start
Visit: http://localhost:3000 to use the app.

