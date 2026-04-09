# 🧠 EmpathyForge

**AI System for Stakeholder Empathy & Product Design Intelligence**

> Built with ❤️ for Bilal Mubarak — Lecturer, Industrial Design, University of Gujrat, Pakistan

EmpathyForge is a production-ready, full-stack web application that uses **Google Gemini AI** to help Industrial Designers, design students, and product innovators understand every stakeholder in their product ecosystem. Write about your project — EmpathyForge does the rest.

---

## ✨ Why EmpathyForge?

Great products are built by designers who deeply understand people. But in a complex product ecosystem, there are **many** stakeholders — users, manufacturers, retailers, the environment, communities, regulators — each with their own perspectives, needs, and concerns.

EmpathyForge automates the heavy lifting of stakeholder research so you can focus on designing better products.

---

## 👥 Who Is It For?

- 🎓 **Industrial Design students** — learn empathy-driven design methodology
- 🏭 **Professional Industrial Designers** — accelerate early-stage research
- 💡 **Product innovators & entrepreneurs** — validate ideas before investing resources
- 🏫 **Design educators** — demonstrate stakeholder analysis in classrooms

---

## 🚀 Features

- 👥 **AI Stakeholder Discovery** — Identifies 5–10 relevant stakeholders from your project description
- 🗺️ **Empathy Maps** — Think, Feel, Say/Do, Pain Points, Gains, Design Influence — for every stakeholder
- 🔍 **7 Critical Personas** — Skeptic, Investor, Environmentalist, Manufacturer, End User, Ethicist, 🇵🇰 Local Context Analyst
- 📊 **Design Intelligence Report** — Refined problem statement, opportunities, risks, next steps, priorities, ethics, sustainability
- 💾 **Project History** — All analyses saved to database, accessible anytime
- 🔐 **Secure Auth** — JWT-based registration, login, and session management
- 🖨️ **Print to PDF** — Export your full design report

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Tailwind CSS + React Router v6 |
| **Backend** | Python FastAPI + SQLAlchemy |
| **AI Engine** | Google Gemini 1.5 Pro |
| **Database** | PostgreSQL 15 |
| **Auth** | JWT (python-jose + passlib/bcrypt) |
| **Containerization** | Docker + Docker Compose |

---

## ⚡ Quick Start (Docker)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
- A Google Gemini API key (free — see below)

### 1. Clone the Repository
```bash
git clone https://github.com/bilalmubarak09/EmpathyForge.git
cd EmpathyForge
```

### 2. Get Your Google Gemini API Key (Free!)
1. Go to **[https://aistudio.google.com](https://aistudio.google.com)**
2. Sign in with your Google account
3. Click **"Get API Key"** → **"Create API Key"**
4. Copy the key (looks like: `AIzaSy...`)

### 3. Configure Environment
```bash
cp .env.example .env
```
Open `.env` and fill in your values:
```
GEMINI_API_KEY=AIzaSy...your_key_here...
SECRET_KEY=generate_a_random_string_here
```
Generate a secure SECRET_KEY:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### 4. Launch with Docker
```bash
docker-compose up --build
```

### 5. Open the App
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

---

## 🔧 Manual Setup (Without Docker)

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export DATABASE_URL=postgresql://postgres:password@localhost:5432/empathyforge
export GEMINI_API_KEY=your_key_here
export SECRET_KEY=your_secret_key

# Start PostgreSQL and create database
createdb empathyforge

# Run the server
uvicorn main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Set API URL
echo "VITE_API_URL=http://localhost:8000" > .env

# Start dev server
npm run dev
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key | ✅ Yes |
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `SECRET_KEY` | JWT signing secret (keep private!) | ✅ Yes |
| `VITE_API_URL` | Backend API URL for frontend | ✅ Yes |

---

## 📱 How to Use EmpathyForge

1. **Register** → Create a free account at `/register`
2. **New Project** → Click "New Project" on your dashboard
3. **Describe your product** → Fill in:
   - Project title
   - Product description (at least 100 characters — be detailed!)
   - Product category (Furniture, Electronics, Medical, etc.)
   - Design stage (Idea Stage, Concept Development, Prototype, Market Ready)
4. **Analyze** → Click "Analyze with EmpathyForge"
5. **Explore results** in 4 tabs:
   - **Stakeholders** — Who matters and why
   - **Empathy Maps** — Deep dive per stakeholder
   - **Critical Analysis** — 7 expert perspectives
   - **Design Report** — Actionable insights
6. **Download** → Print the Design Report as PDF

---

## 🗺️ Project Structure

```
EmpathyForge/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── database.py          # SQLAlchemy engine + session
│   ├── auth.py              # JWT auth + password hashing
│   ├── models/models.py     # Database models
│   ├── schemas/schemas.py   # Pydantic schemas
│   ├── routers/             # API route handlers
│   ├── services/            # AI service + analysis pipeline
│   ├── alembic/             # Database migrations
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages
│   │   ├── context/         # Auth state management
│   │   └── api/             # Axios API client
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🔮 Future Roadmap

- [ ] 🌐 Urdu language support
- [ ] 📧 Email verification
- [ ] 🤝 Collaborative projects (share with team)
- [ ] 📈 Analytics dashboard
- [ ] 🎨 Visual empathy map canvas
- [ ] 📱 Mobile app (React Native)
- [ ] 🏫 Classroom mode for educators
- [ ] 🔗 Export to Figma / Miro

---

## 🙏 Credits

Built with ❤️ for **Bilal Mubarak** — Lecturer, Industrial Design, University of Gujrat, Pakistan

Powered by:
- [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 License

MIT License — Free to use, modify, and distribute.
