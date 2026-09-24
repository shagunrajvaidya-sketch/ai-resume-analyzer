<div align="center">

# 🎯 ResuMind

### AI Resume Analyzer & Job Match Platform

*Get ATS scores, AI-powered feedback, and job-specific resume insights — all for free.*

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.x-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [How It Works](#-how-it-works)
- [Testing](#-testing)
- [Challenges Faced](#-challenges-faced)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)
- [Contact](#-contact)

---

## 🎯 About the Project

**ResuMind** is a free, AI-powered web platform that analyzes resumes against Applicant Tracking System (ATS) standards and provides detailed, actionable feedback.

### The Problem

- **90%** of Fortune 500 companies use ATS to filter resumes
- **75%** of resumes are rejected by ATS before a human ever sees them
- Most students **don't know** how ATS parsing works
- Commercial tools like Jobscan and Resume Worded charge **$15-30/month**

### The Solution

ResuMind bridges this gap with:

- ✅ **Free for everyone** — no subscription, no hidden costs
- ✅ **AI-powered analysis** — LLM-based feedback across 5 dimensions
- ✅ **Job-specific matching** — compare your resume against any job description
- ✅ **Transparent scoring** — see exactly how scores are calculated
- ✅ **Modern UI** — clean, responsive, and easy to use

---

## ✨ Features

### Core Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure sign-in via Google/GitHub using Puter.js |
| 📤 **Resume Upload** | Drag-and-drop PDF upload (max 20 MB) |
| 🔄 **PDF Conversion** | Client-side PDF → Image conversion via PDF.js |
| 🔍 **OCR Extraction** | Text extraction using Puter's `img2txt` |
| 🤖 **AI Analysis** | LLM-based analysis via Groq API |
| 📊 **ATS Score** | Overall + category-wise scores (out of 100) |
| 💡 **Actionable Tips** | Specific suggestions with explanations |
| 💼 **Job Matching** | Compare resume against a job description |
| 📁 **History** | View all previously analyzed resumes |
| 🗑️ **Delete** | Remove resumes you no longer need |

### Feedback Categories

ResuMind scores your resume across **5 critical dimensions**:

1. **ATS Compatibility** — How well ATS systems can parse your resume
2. **Tone & Style** — Professional language and formatting
3. **Content Quality** — Impact, quantifiability, and relevance
4. **Structure** — Organization and readability
5. **Skills Alignment** — Match with job requirements

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React Router v7** | File-based routing framework |
| **TypeScript** | Type-safe development |
| **Tailwind CSS v4** | Utility-first styling |
| **Vite** | Build tool & dev server |
| **Zustand** | Lightweight state management |
| **React Dropzone** | File upload UI |
| **PDF.js** | PDF-to-image conversion |
| **Lucide React** | Modern icon library |

### Backend / Services

| Service | Purpose |
|---|---|
| **Puter.js** | Auth, File System, KV Database |
| **Groq API** | LLM inference (fast & free) |
| **Google Gemini** | Alternative LLM (fallback) |

### Development Tools

- **WebStorm** — IDE
- **Git + GitHub** — Version control
- **Chrome DevTools** — Debugging

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────┐
│         PRESENTATION TIER (Browser)         │
│  React Router v7 + TypeScript + Tailwind    │
│  Home | Upload | Resume | Auth              │
└──────────────────┬──────────────────────────┘
                   │ HTTPS
                   ▼
┌─────────────────────────────────────────────┐
│         APPLICATION TIER (Services)         │
│  - Puter.js (Auth, FS, KV)                  │
│  - Groq API (LLM inference)                 │
│  - PDF.js (Client-side conversion)          │
└──────────────────┬──────────────────────────┘
                   │ REST API
                   ▼
┌─────────────────────────────────────────────┐
│         EXTERNAL SERVICES                   │
│  - Puter Cloud (Storage + KV)               │
│  - Groq Cloud (LLM)                         │
└─────────────────────────────────────────────┘
```

### Project Structure

```
ai-resume-analyzer/
├── app/
│   ├── components/           # Reusable UI components
│   │   ├── Accordion.tsx
│   │   ├── ATS.tsx
│   │   ├── Details.tsx
│   │   ├── FileUploader.tsx
│   │   ├── Navbar.tsx
│   │   ├── ResumeCard.tsx
│   │   ├── ScoreBadge.tsx
│   │   ├── ScoreCircle.tsx
│   │   ├── ScoreGauge.tsx
│   │   └── Summary.tsx
│   ├── constants/            # App constants + prompts
│   │   └── index.ts
│   ├── lib/                  # Utilities & stores
│   │   ├── pdf2img.ts        # PDF conversion
│   │   ├── puter.ts          # Zustand store
│   │   └── utils.ts          # Helpers
│   ├── routes/               # Route components
│   │   ├── auth.tsx
│   │   ├── home.tsx
│   │   ├── resume.tsx
│   │   └── upload.tsx
│   ├── types/                # TypeScript types
│   │   ├── index.ts
│   │   └── puter.d.ts
│   ├── app.css               # Global styles
│   ├── root.tsx              # Root layout
│   └── routes.ts             # Route config
├── public/
│   ├── icons/                # SVG icons
│   └── images/               # Background images
├── .env                      # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v20+ ([Download](https://nodejs.org/))
- **npm** v10+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [below](#-environment-variables))

4. **Start the dev server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://localhost:5173
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
# Required
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx

# Optional (fallback)
VITE_GOOGLE_AI_KEY=AQ.xxxxxxxxxxxxxxxxxxxx
VITE_OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxx
```

### How to Get API Keys

| Service | Sign Up Link | Free Tier |
|---|---|---|
| **Groq** (recommended) | [console.groq.com](https://console.groq.com) | 30 req/min, 14,400/day |
| Google Gemini | [aistudio.google.com](https://aistudio.google.com/apikey) | 1,500 req/day |
| OpenRouter | [openrouter.ai](https://openrouter.ai) | 50 req/day (free models) |

> ⚠️ **Never commit `.env` to Git.** It's already in `.gitignore`.

---

## 💻 Usage

### 1. Sign In

Click **"Sign In"** on the homepage. Authenticate with Google or GitHub.

### 2. Upload Resume

Navigate to **`/upload`** and fill in:

- **Company Name** (optional)
- **Job Title** (optional)
- **Job Description** (optional but recommended for job matching)
- **Resume PDF** (required, max 20 MB)

Click **"Analyze Resume"**.

### 3. View Feedback

After ~10 seconds, you'll be redirected to `/resume/:id` where you'll see:

- **Overall Score** — Circular gauge
- **ATS Score** — With suggestions
- **Category Breakdown** — Tone, Content, Structure, Skills
- **Detailed Tips** — With explanations
- **Resume Preview** — Side-by-side view

### 4. Track History

All analyzed resumes appear on the **Home** page as cards.

### 5. Clean Up Storage

If you hit Puter's storage limit, open DevTools Console and run:

```javascript
const path = '/valiant_door_391056/AppData/app-907541aa-7512-568b-af67-9f6b383a53ca';
const items = await puter.fs.readdir(path);
for (const item of items) {
  try { await puter.fs.delete(item.path); } catch (e) {}
}
await puter.kv.flush();
console.log('✅ Cleaned');
```

---

## 📸 Screenshots

### Home Page
<img width="1908" height="1067" alt="Screenshot 2026-09-24 222158" src="https://github.com/user-attachments/assets/461aec6e-1342-483c-b77c-0bb190ceff47" />


### Upload Page
<img width="1883" height="916" alt="Screenshot 2026-09-24 222236" src="https://github.com/user-attachments/assets/6f4d05df-e385-46da-acb6-67e4c4721b77" />


### Analysis in Progress
<img width="1886" height="911" alt="Screenshot 2026-09-24 222609" src="https://github.com/user-attachments/assets/9e3b1866-80a3-4f5a-abc8-740d7c49d6e1" />


### Feedback Page
<img width="1890" height="1012" alt="Screenshot 2026-09-24 222700" src="https://github.com/user-attachments/assets/dec8a145-c6ff-453b-8bbd-e3974c197d8b" />
<img width="1887" height="901" alt="Screenshot 2026-09-24 222718" src="https://github.com/user-attachments/assets/8144d4f6-b43c-4e8b-be4a-12def878e593" />


### Category Breakdown
<img width="1875" height="912" alt="Screenshot 2026-09-24 222734" src="https://github.com/user-attachments/assets/36b78a6f-0fb7-4597-99cf-dd4988aa1b2c" />


---

## ⚙️ How It Works

### Analysis Pipeline

```
┌─────────────────┐
│ 1. Upload PDF   │  User selects PDF file (max 20 MB)
└────────┬────────┘
         ▼
┌─────────────────┐
│ 2. Upload to    │  File stored in Puter File System
│    Puter FS     │
└────────┬────────┘
         ▼
┌─────────────────┐
│ 3. Convert to   │  PDF.js renders first page → PNG
│    Image        │
└────────┬────────┘
         ▼
┌─────────────────┐
│ 4. Upload Image │  PNG stored in Puter FS
│    to Puter FS  │
└────────┬────────┘
         ▼
┌─────────────────┐
│ 5. Extract Text │  OCR via Puter's img2txt
│    (OCR)        │
└────────┬────────┘
         ▼
┌─────────────────┐
│ 6. Send to LLM  │  Groq API: prompt + resume text
│    (Groq API)   │
└────────┬────────┘
         ▼
┌─────────────────┐
│ 7. Parse JSON   │  Clean + parse structured response
│    Response     │
└────────┬────────┘
         ▼
┌─────────────────┐
│ 8. Store in KV  │  Save to Puter KV database
└────────┬────────┘
         ▼
┌─────────────────┐
│ 9. Redirect to  │  User sees feedback
│    /resume/:id  │
└─────────────────┘
```

**Total time: 8-15 seconds per resume** ⚡

---

## 🧪 Testing

### Test Coverage

| Type | Count | Pass Rate |
|---|---|---|
| Unit Tests | 6 | 100% |
| Integration Tests | 6 | 100% |
| System Tests | 6 | 100% |
| UAT (Beta Users) | 5 | 4.4/5 avg rating |

### Test Dataset

- **30 resumes** (15 student + 10 public + 5 synthetic)
- **20 job descriptions** (LinkedIn, Naukri, Internshala)

### Performance Metrics

| Metric | Target | Achieved |
|---|---|---|
| Resume upload | < 3 sec | 1.5-2.5 sec ✅ |
| PDF conversion | < 2 sec | 1-1.5 sec ✅ |
| OCR extraction | < 3 sec | 2-3 sec ✅ |
| AI analysis | < 10 sec | 4-7 sec ✅ |
| **Total** | **< 20 sec** | **8-15 sec** ✅ |

---

## 🧗 Challenges Faced

Real-world AI integration isn't easy. Here are the key challenges we solved:

| # | Challenge | Solution |
|---|---|---|
| 1 | PowerShell script execution blocked | Changed execution policy to `RemoteSigned` |
| 2 | OneDrive sync conflicts with npm | Moved project outside OneDrive |
| 3 | Puter WebSocket connection crashes | Migrated AI to external API (Groq) |
| 4 | File attachment API hangs | Switched to OCR → text approach |
| 5 | Google Gemini model deprecation | Auto-updated model based on error hints |
| 6 | OpenRouter free model removal | Migrated to Groq (stable free tier) |
| 7 | Puter storage limit exceeded | Built cleanup function |
| 8 | Groq model deprecation | Updated to `openai/gpt-oss-120b` |
| 9 | JSON parse failures | Added markdown cleaning + retry logic |
| 10 | Missing default exports | Added `export default` to all components |

**Key Learning:** Production AI apps need **robust error handling** and **graceful degradation**.

---

## 🗺 Roadmap

### ✅ Done

- [x] User authentication
- [x] PDF upload + conversion
- [x] OCR text extraction
- [x] LLM analysis (Groq)
- [x] 5-category feedback
- [x] Job matching
- [x] Resume history
- [x] Resume deletion
- [x] Error handling + retry

### 🚧 In Progress

- [ ] Deploy to Vercel
- [ ] Dark mode
- [ ] Export feedback as PDF

### 📅 Planned

- [ ] Multi-resume comparison
- [ ] Hindi/regional language support
- [ ] Built-in resume builder
- [ ] LinkedIn integration
- [ ] Job board integration (Naukri, Internshala)
- [ ] Mobile app (React Native)
- [ ] AI interview prep module

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create a branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update README if needed

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- [React Router](https://reactrouter.com/) — Modern routing framework
- [Puter.js](https://puter.com/) — Free cloud services
- [Groq](https://groq.com/) — Lightning-fast LLM inference
- [Tailwind CSS](https://tailwindcss.com/) — Beautiful utility-first CSS
- [PDF.js](https://mozilla.github.io/pdf.js/) — PDF rendering
- [Zustand](https://zustand-demo.pmnd.rs/) — Simple state management

Special thanks to **Mr. [Guide Name]** for guidance throughout the project.

---

## 📬 Contact

**Name** — Shagun Rajvaidya

**Project Link:** [https://github.com/yourusername/ai-resume-analyzer](https://github.com/yourusername/ai-resume-analyzer)

**Live Demo:** [https://resumind.vercel.app](#)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Made with ❤️ by Shagun Rajvaidya**

</div>
