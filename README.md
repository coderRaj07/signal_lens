# 🚀 SignalLens – Competitive Intelligence Tracker

SignalLens is a lightweight competitive intelligence tool that:

* Monitors competitor websites
* Stores content snapshots
* Computes textual differences
* Calculates change percentage
* Flags significant changes
* Generates AI-powered summaries
* Shows last 5 checks per competitor

Backend and frontend are included in the same repository for simplicity.

---

# 🌍 Live Demo

Frontend:
👉 [https://signal-lens-frontend.vercel.app](https://signal-lens-frontend.vercel.app)

Backend API Docs:
👉 [https://signallens-backend.onrender.com/docs](https://signallens-backend.onrender.com/docs)

---

# 🏗 Architecture Overview

```
Add Competitor
        ↓
Trigger Check
        ↓
Fetch Content (HTTP → Playwright fallback)
        ↓
Store Snapshot
        ↓
Compare With Previous Snapshot
        ↓
Calculate Change %
        ↓
LLM Summary (Skipped if < 2% change)
        ↓
Store Result
```

---

# 🛠 Tech Stack

Backend:

* FastAPI (async)
* SQLAlchemy Async
* PostgreSQL (Neon)
* httpx
* Playwright (fallback for JS-heavy pages)
* OpenAI / Cerebras LLM

Frontend:

* React (Vite)
* Axios
* Basic state management

Deployment:

* Backend → Render
* Frontend → Vercel
---

# ▶️ How to Run Locally

## 1️⃣ Clone Repository

```bash
git clone https://github.com/coderRaj07/signal_lens
cd signal_lens
```

---

# 🔹 Backend Setup

Navigate to Backend folder:

```bash
cd SignalLens_Backend
```

## 2️⃣ Create Virtual Environment

### 🐧 Ubuntu / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

### 🪟 Windows

```powershell
python -m venv venv
venv\Scripts\activate
```

You should now see `(venv)` in your terminal.

---

## 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
playwright install chromium
```

---

## 4️⃣ Create Backend `.env`

Create a file named `.env` inside the backend root:

```
DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@HOST:PORT/DBNAME?ssl=require
LLM_PROVIDER=openai
OPENAI_API_KEY=your_key_here
```

⚠ Do NOT commit `.env` to GitHub.

---

## 5️⃣ Run Backend

```bash
uvicorn app.main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

# 🔹 Frontend Setup

Navigate to frontend folder:

```bash
cd SignalLens_Frontend
```

---

## 6️⃣ Create Frontend `.env`

Inside the frontend root directory, create a file:

```
.env
```

Add:

```
VITE_API_BASE=http://127.0.0.1:8000
```

If using deployed backend instead:

```
VITE_API_BASE=https://signallens-backend.onrender.com
```

---

## 7️⃣ Install & Run Frontend

```bash
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🌍 Environment Variables Summary

### Backend `.env`

* `DATABASE_URL`
* `LLM_PROVIDER`
* `OPENAI_API_KEY` or `CEREBRAS_API_KEY`

### Frontend `.env`

* `VITE_API_BASE`

---

# 🧪 Basic Usage

1. Add competitor (name + URL)
2. Trigger check
3. View:

   * Change percentage
   * Significant flag
   * AI summary
   * Last 5 history entries

---

# 🛡 Basic Safety Handling

The system includes:

* Input validation for URL format
* Try/except around fetch operations
* Graceful handling of failed crawls
* LLM skipped if change < 2% (cost protection)
* Backend does not crash on empty snapshots
* CORS properly configured for frontend

If a fetch fails:

* It returns a failure response
* No server crash
* Check is stored with status

---

# ⚠ Known Limitations

This is important for clarity.

### 1️⃣ JS-Heavy Websites (Stripe Issue)

Some websites like:

* Stripe pricing
* Stripe changelog
* Other heavily React/Cloudflare-protected sites

Do NOT work reliably.

Reason:

* Heavy client-side rendering
* Bot protection
* Dynamic pricing APIs
* Cloudflare challenges

Even with Playwright fallback:

* Timeouts may occur
* Rendering may fail on cloud environments

---

### 2️⃣ Changelog Pages

Changelog pages sometimes:

* Load content dynamically
* Require scrolling
* Load via internal APIs

This may cause:

* Empty content snapshots
* Minor false-positive change detection

---

### 3️⃣ Text-Based Diff Only

Current diff system:

* Text-based comparison
* Not DOM-aware
* Not structured (e.g., pricing JSON extraction)

Meaning:

* Layout changes may increase change %
* Business logic changes are inferred via LLM

---

### 4️⃣ No Background Worker

Checks run in-request.
No distributed queue (Celery / Redis not implemented).

---

### 5️⃣ No Scheduler

Checks are manual.
No cron-based automatic monitoring.

---

# 🧠 Design Decisions

* LLM skipped if change < 2% (cost optimization)
* Significant flag if change ≥ 10%
* Store full snapshot for history
* Return only last 5 checks
* Simple architecture for clarity over complexity

---

# 📁 Project Structure

```
backend/
  app/
frontend/
README.md
```

---

## 🎯 Project Status

### ✅ What Is Done

| Feature                       | Status |
| ----------------------------- | ------ |
| Competitor CRUD               | ✅      |
| Snapshot Storage              | ✅      |
| Text Diff Computation         | ✅      |
| Change Percentage Calculation | ✅      |
| AI Summary Generation         | ✅      |
| Significant Change Detection  | ✅      |
| Last 5 Check History          | ✅      |
| Basic Failure Handling        | ✅      |
| Cloud Deployment              | ✅      |

---

### ❌ What Is NOT Done

| Feature                                | Status |
| -------------------------------------- | ------ |
| DOM-aware Diff                         | ❌      |
| Structured Pricing Extraction          | ❌      |
| Distributed Background Workers         | ❌      |
| Automatic Scheduling                   | ❌      |
| Advanced Bot-Evasion (Protected Sites) | ❌      |

---

## 👨‍💻 Author

- **Name:** Rajendra Bisoi  
- **Role:** Backend Engineer  
- **Stack:** Python, FastAPI, Django, PostgreSQL, Redis, Celery, AWS
- **Specialization:** LLM Systems  