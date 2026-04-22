# 🚀 SignalLens – Competitive Intelligence Tracker (Backend)

SignalLens is a competitive intelligence backend system that:

* Crawls competitor websites
* Stores content snapshots
* Computes textual differences between checks
* Calculates percentage change
* Flags significant changes
* Generates AI-powered summaries
* Maintains last 5 check history per competitor
* Provides health status for backend, database, and LLM

Deployed Backend:

```
https://signal-lens.vercel.app/
```

---

# 🏗 Architecture Overview

Flow:

```
Competitor Added
        ↓
Check Triggered
        ↓
Fetch Content (HTTP → Playwright fallback)
        ↓
Store Snapshot
        ↓
Compare With Previous Snapshot
        ↓
Generate Diff + Change %
        ↓
Skip LLM if change < 2%
        ↓
Store Check Result
```

Key Features:

* Async FastAPI
* SQLAlchemy (async)
* Neon PostgreSQL
* Playwright fallback for JS-heavy sites
* LLM integration (Cerebras / OpenAI)
* Cost optimization (skip LLM if < 2% change)
* Significant change flag (≥ 10%)

---

# 🛠 Tech Stack

* FastAPI
* SQLAlchemy Async
* AsyncPG
* PostgreSQL (Neon)
* Playwright
* httpx
* Cerebras LLM
* Uvicorn

---

# 📦 Project Structure

```
app/
 ├── api/
 ├── services/
 ├── repositories/
 ├── models/
 ├── schemas/
 ├── utils/
 ├── db/
 └── main.py

requirements.txt
.env.example
Dockerfile (optional)
README.md
AI_NOTES.md
PROMPTS_USED.md
ABOUTME.md
```

---

# ⚙️ Running Locally

---

## 1️⃣ Clone Repo

```bash
git clone https://github.com/coderRaj07/SignalLens_Backend
cd SignalLens_Backend
```

---

## 2️⃣ Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate   # Mac/Linux
# OR
venv\Scripts\activate      # Windows
```

---

## 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
playwright install chromium
```

---

## 4️⃣ Create `.env` File

Create `.env` in root:

```
DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@HOST:PORT/DBNAME?ssl=require
LLM_PROVIDER=cerebras
CEREBRAS_API_KEY=your_key_here
OPENAI_API_KEY=
```

⚠ Do NOT commit `.env`

---

## 5️⃣ Run Server

```bash
uvicorn app.main:app --reload
```

Server runs at:

```
http://127.0.0.1:8000
```

Swagger UI:

```
http://127.0.0.1:8000/docs
```

---

# 🧪 How to Test Locally

---

## Step 1 – Health Check

```
GET /status
```

Expected:

```json
{
  "backend": "healthy",
  "database": "healthy",
  "llm": "healthy"
}
```

---

## Step 2 – Add Competitor

```
POST /competitors
```

Example:

```json
{
  "name": "HackerNews",
  "url": "https://news.ycombinator.com/",
  "tag": "news"
}
```

---

## Step 3 – Run Check

```
POST /checks/{id}
```

Wait 15–30 seconds.

Check again after some time to test the changes

---

## Step 4 – View History

```
GET /checks/{id}
```

You will see:

* change_percentage
* is_significant
* summary
* created_at

Run check twice to see diff in action.

---

# 🌍 Deploying on Render

---

## 1️⃣ Push Code to GitHub

Ensure:

* `.env` NOT committed
* `.env.example` exists
* `.gitignore` configured properly

---

## 2️⃣ Create New Web Service on Render

* Connect GitHub repo
* Select Python

---

## 3️⃣ Render Settings (Without Docker)

Build Command:

```
pip install -r requirements.txt && playwright install chromium
```

Start Command:

```
uvicorn app.main:app --host 0.0.0.0 --port 10000
```

---

## 4️⃣ Add Environment Variables in Render

```
DATABASE_URL=postgresql+asyncpg://....?ssl=require
LLM_PROVIDER=cerebras
CEREBRAS_API_KEY=your_key
OPENAI_API_KEY=
```

---

## 5️⃣ Deploy

After deployment, test:

```
https://your-app.onrender.com/status
```

---

# 🐳 Optional: Docker Deployment

If using Docker:

```
docker build -t signallens .
docker run -p 8000:8000 signallens
```

In Render:

* Select Docker
* No build/start commands needed

---

# 🔍 Important Implementation Details

* `pool_pre_ping=True` for Neon DB stability
* HttpUrl converted to string before DB insert
* LLM skipped if change < 2%
* Significant flag if change ≥ 10%
* Last 5 checks returned
* Playwright fallback for JS-heavy sites

---

# ⚠ Limitations

* Diff is text-based (not DOM-aware)
* No scheduled cron checks (manual trigger only)
* Background tasks are in-process (not distributed queue)
* No retry system for failed checks

---

# 🏁 Submission Includes

* Backend (FastAPI)
* Frontend (React)
* README
* AI_NOTES.md
* PROMPTS_USED.md
* ABOUTME.md
* Hosted backend link
* Hosted frontend link

---

# 📬 Author

Rajendra Bisoi
Software Engineer
Tech Stack: Python, FastAPI, PostgreSQL, AWS, Redis, LLM Systems

---
