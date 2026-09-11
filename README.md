<p align="center">
  <img src="https://img.shields.io/badge/Spring_Boot-4.0.8-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
</p>

# 🏦 Loan Risk Prediction System

> An end-to-end credit risk assessment platform that evaluates retail loan applicants using machine learning inference, backed by a Spring Boot API for persistence & audit, and a React + Vite dashboard for interactive underwriting workflows.

---

## 📋 Table of Contents

- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Frontend Pages](#-frontend-pages)
- [ML Service](#-ml-service)
- [Configuration](#%EF%B8%8F-configuration)
- [Development Notes](#-development-notes)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏗 Architecture

```
┌─────────────────┐       ┌──────────────────┐       ┌─────────────────┐
│                 │       │                  │       │                 │
│   React + Vite  │──────▶│  Spring Boot 4   │──────▶│  FastAPI (ML)   │
│   (Port 5173)   │◀──────│  (Port 8080)     │◀──────│  (Port 8000)    │
│                 │  REST │                  │ HTTP  │                 │
└─────────────────┘       └───────┬──────────┘       └─────────────────┘
                                  │
                                  ▼
                          ┌──────────────┐
                          │    MySQL     │
                          │ loan_risk_db │
                          └──────────────┘
```

| Layer | Responsibility |
|:---|:---|
| **Frontend** | Collects applicant underwriting vectors, displays risk verdicts, assessment history, and model performance metrics |
| **Backend** | Exposes REST endpoints, validates input, delegates to ML service for predictions (with heuristic fallback), persists assessments to MySQL |
| **ML Service** | Serves trained model predictions via FastAPI. Training notebook included for model development & export |

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|:---|:---|:---|
| React | 19.2 | UI component library |
| TypeScript | 6.0 | Type-safe development |
| Vite | 8.2 | Build tooling & dev server |
| Tailwind CSS | 4.3 | Utility-first styling |
| Lucide React | 1.42 | Icon library |

### Backend
| Technology | Version | Purpose |
|:---|:---|:---|
| Spring Boot | 4.0.8 | Application framework |
| Java | 21 | Runtime |
| Spring Data JPA | — | ORM & data access |
| Spring WebFlux | — | Non-blocking HTTP client (`WebClient`) for ML service calls |
| Spring Validation | — | Bean validation (Jakarta) |
| Lombok | — | Boilerplate reduction |
| MySQL Connector/J | — | Database driver |
| Maven | — | Build & dependency management |

### ML Service
| Technology | Purpose |
|:---|:---|
| Python 3.10+ | Runtime |
| FastAPI | REST API framework |
| Jupyter Notebook | Model training & experimentation |

---

## 📂 Project Structure

```
loan-risk-prediction-system/
├── backend/                          # Spring Boot application
│   ├── src/main/java/com/loanrisk/loan_risk_backend/
│   │   ├── config/
│   │   │   ├── CorsConfig.java              # CORS policy (allows localhost:5173)
│   │   │   └── RestClientConfig.java        # WebClient builder bean
│   │   ├── controller/
│   │   │   └── LoanAssessmentController.java  # REST endpoints
│   │   ├── dao/
│   │   │   ├── LoanAssessmentDAO.java         # DAO interface
│   │   │   └── impl/                          # DAO implementation
│   │   ├── dto/
│   │   │   ├── common/
│   │   │   │   └── ApiResponse.java           # Generic API response wrapper
│   │   │   ├── request/
│   │   │   │   └── LoanAssessmentRequestDTO.java  # Input validation DTO
│   │   │   └── response/
│   │   │       ├── LoanAssessmentResponseDTO.java  # Evaluation result DTO
│   │   │       ├── AssessmentHistoryDTO.java        # History record DTO
│   │   │       └── MLServicePredictionDTO.java      # ML service response mapping
│   │   ├── entity/
│   │   │   └── LoanAssessment.java            # JPA entity (loan_assessments table)
│   │   ├── repository/
│   │   │   └── LoanAssessmentRepository.java  # Spring Data JPA repository
│   │   ├── service/
│   │   │   ├── LoanAssessmentService.java     # Service interface
│   │   │   └── impl/
│   │   │       └── LoanAssessmentServiceImpl.java  # Business logic + ML integration
│   │   └── util/
│   │       ├── FinancialCalculatorUtil.java
│   │       └── StandardResponse.java
│   ├── src/main/resources/
│   │   ├── application.yml                    # App configuration
│   │   └── application.properties
│   ├── pom.xml
│   └── mvnw / mvnw.cmd                       # Maven wrapper scripts
│
├── frontend/                          # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── FeatureImportanceChart.tsx
│   │   │   │   ├── MetricCard.tsx
│   │   │   │   └── RiskGauge.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── loan/
│   │   │   │   ├── LoanForm.tsx               # Applicant underwriting form
│   │   │   │   ├── ResultCard.tsx             # Risk verdict display
│   │   │   │   └── AssessmentHistoryTable.tsx # Assessment audit log
│   │   │   └── ui/
│   │   │       ├── GlassCard.tsx              # Glassmorphism card component
│   │   │       └── Badge.tsx                  # Status badge component
│   │   ├── pages/
│   │   │   ├── AssessmentPage.tsx             # Risk assessment workflow
│   │   │   ├── HistoryPage.tsx                # Assessment history view
│   │   │   └── ModelMetricsPage.tsx           # Model performance dashboard
│   │   ├── services/
│   │   │   └── api.ts                         # Backend API client (WIP)
│   │   ├── types/
│   │   │   └── loan.ts                        # TypeScript interfaces
│   │   ├── App.tsx                            # Root component & routing
│   │   └── main.tsx                           # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── ml-service/                        # Python ML microservice
│   ├── app/
│   │   └── main.py                            # FastAPI entrypoint (scaffold)
│   ├── data/                                  # Training datasets (.gitkeep)
│   ├── models/                                # Exported model artifacts (.gitkeep)
│   ├── notebooks/
│   │   └── loan_risk_model_training.ipynb     # Model training notebook
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

---

## ✨ Features

### Assessment Dashboard
- 📝 **11-field underwriting form** — annual income, DTI ratio, credit score, loan amount, interest rate, gender, marital status, education level, employment status, loan purpose, and credit grade/subgrade
- ⚡ **Real-time risk evaluation** with risk probability visualization (progress bar), confidence score, and risk factor explanations
- ✅ **Approved / Rejected verdict** with color-coded badges and detailed underwriting observations

### History & Audit
- 📊 **Assessment history table** with full audit trail of all evaluations
- 🕐 **Chronological ordering** (most recent first)

### Model Performance Metrics
- 📈 **ROC-AUC, F1-Score, Accuracy, and Latency** dashboards
- 📉 **Feature importance weight matrix** showing relative impact of each underwriting variable

### Backend Intelligence
- 🤖 **ML-first inference** — routes requests to FastAPI microservice for model predictions
- 🛡️ **Heuristic fallback** — if the ML service is unreachable, applies a rule-based policy engine (DTI > 0.25 OR credit score < 600 OR interest rate > 15% → high risk)
- 💾 **Full persistence** — every assessment is saved to MySQL with UUID-based IDs and timestamps

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|:---|:---|
| Java | 21+ |
| Maven | 3.9+ (or use the included `mvnw` wrapper) |
| Node.js | 18+ |
| npm | 9+ |
| Python | 3.10+ |
| MySQL | 8.0+ |

### 1️⃣ Database Setup

```sql
-- MySQL will auto-create the database via the JDBC URL flag:
-- ?createDatabaseIfNotExist=true
--
-- Alternatively, create it manually:
CREATE DATABASE loan_risk_db;
```

> **Note:** Update credentials in `backend/src/main/resources/application.yml` if your MySQL user/password differs from the defaults.

### 2️⃣ ML Service

```bash
cd ml-service

# Create and activate virtual environment
python -m venv .venv

# Windows
.\.venv\Scripts\Activate

# macOS / Linux
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Train model using the Jupyter notebook
# jupyter notebook notebooks/loan_risk_model_training.ipynb
# Export trained model to ml-service/models/

# Start the ML inference server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3️⃣ Backend

```bash
cd backend

# Using Maven wrapper (recommended)
# Windows
.\mvnw.cmd spring-boot:run

# macOS / Linux
./mvnw spring-boot:run

# Or using system Maven
mvn spring-boot:run
```

The backend starts on **http://localhost:8080** and connects to the ML service at `http://localhost:8000`.

### 4️⃣ Frontend

```bash
cd frontend

npm install
npm run dev
```

The dev server starts on **http://localhost:5173**.

---

## 📡 API Reference

Base URL: `http://localhost:8080/api/v1/loan-assessments`

### `POST /evaluate`

Submit an applicant's underwriting vector for risk evaluation.

**Request Body:**

```json
{
  "annual_income": 48000.0,
  "debt_to_income_ratio": 0.12,
  "credit_score": 680,
  "loan_amount": 15000.0,
  "interest_rate": 12.5,
  "gender": "Female",
  "marital_status": "Single",
  "education_level": "Bachelor's",
  "employment_status": "Employed",
  "loan_purpose": "Debt consolidation",
  "grade_subgrade": "C3"
}
```

**Validation Rules:**

| Field | Constraint |
|:---|:---|
| `annual_income` | Required, must be positive |
| `debt_to_income_ratio` | Required, range `[0.0, 1.5]` |
| `credit_score` | Required, range `[300, 850]` |
| `loan_amount` | Required, must be positive |
| `interest_rate` | Required, must be positive |
| `gender` | Required, non-blank |
| `marital_status` | Required, non-blank |
| `education_level` | Required, non-blank |
| `employment_status` | Required, non-blank |
| `loan_purpose` | Required, non-blank |
| `grade_subgrade` | Required, non-blank |

**Response:**

```json
{
  "code": 200,
  "message": "Loan evaluation completed successfully",
  "data": {
    "id": "a1b2c3d4-...",
    "prediction": 0,
    "risk_probability": 0.14,
    "confidence_score": 0.93,
    "debt_to_income_ratio": 0.12,
    "model_name": "CreditRisk-Inference-Engine-v2",
    "timestamp": "2026-09-11T20:00:00",
    "risk_factors": [
      "Prime credit score qualification",
      "Strong income-to-debt ratio"
    ]
  }
}
```

| `prediction` Value | Meaning |
|:---|:---|
| `0` | ✅ **Low Risk — Approved** |
| `1` | ❌ **High Risk — Rejected** |

---

### `GET /history`

Retrieve all persisted assessment records (most recent first).

**Response:**

```json
{
  "code": 200,
  "message": "Audit history fetched successfully",
  "data": [
    {
      "id": "a1b2c3d4-...",
      "annualIncome": 48000.0,
      "debtToIncomeRatio": 0.12,
      "creditScore": 680,
      "loanAmount": 15000.0,
      "interestRate": 12.5,
      "gender": "Female",
      "maritalStatus": "Single",
      "educationLevel": "Bachelor's",
      "employmentStatus": "Employed",
      "loanPurpose": "Debt consolidation",
      "gradeSubgrade": "C3",
      "predictionVerdict": 0,
      "riskProbability": 0.14,
      "confidenceScore": 0.93,
      "assignedModel": "CreditRisk-Inference-Engine-v2",
      "createdAt": "2026-09-11T20:00:00"
    }
  ]
}
```

---

### Sample cURL

```bash
curl -X POST http://localhost:8080/api/v1/loan-assessments/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "annual_income": 60000,
    "debt_to_income_ratio": 0.15,
    "credit_score": 720,
    "loan_amount": 10000,
    "interest_rate": 10.5,
    "gender": "Male",
    "marital_status": "Married",
    "education_level": "Master'\''s",
    "employment_status": "Employed",
    "loan_purpose": "Car",
    "grade_subgrade": "B2"
  }'
```

---

## 🖥 Frontend Pages

| Page | Route/Tab | Description |
|:---|:---|:---|
| **Assessment** | `assessment` | Underwriting form + real-time risk verdict with probability bar, DTI, confidence, and risk factors |
| **History** | `history` | Tabular audit log of all past assessments |
| **Model Metrics** | `metrics` | Performance dashboard showing ROC-AUC (0.931), F1-Score (0.874), Accuracy (92.4%), Latency (18ms), and feature importance weights |

---

## 🤖 ML Service

The ML microservice is designed to be deployed as a standalone FastAPI server. The backend communicates with it via `WebClient` at the configured base URL.

### Expected ML Service Contract

**`POST /predict`**

The backend sends the full `LoanAssessmentRequestDTO` payload and expects:

```json
{
  "prediction": 0,
  "probability_risk": 0.16,
  "confidence_score": 0.94,
  "model_name": "XGBoost-V2.1-Ensemble",
  "key_risk_factors": ["Factor 1", "Factor 2"]
}
```

### Training Notebook

The Jupyter notebook at `ml-service/notebooks/loan_risk_model_training.ipynb` is provided for model training and experimentation. Export trained models (`.pkl` / `.joblib`) to `ml-service/models/`.

---

## ⚙️ Configuration

All backend configuration lives in [`application.yml`](backend/src/main/resources/application.yml):

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/loan_risk_db?createDatabaseIfNotExist=true
    username: root
    password: <your-password>          # ⚠️ Change this
  jpa:
    hibernate:
      ddl-auto: create                 # ⚠️ Use 'update' or 'validate' in production

ml-service:
  base-url: http://localhost:8000      # FastAPI ML service URL
```

> [!WARNING]
> The default `ddl-auto: create` **drops and recreates tables on every restart**. Switch to `update` or `validate` for non-destructive behavior.

> [!CAUTION]
> **Never commit database credentials to source control.** Use environment variables or a secrets manager in production.

---

## 📝 Development Notes

- **Frontend uses local simulation** — The `App.tsx` currently runs a client-side heuristic evaluation (`setTimeout` mock). Wire it to the backend by implementing the API client in `frontend/src/services/api.ts`.
- **Heuristic fallback** — If the ML service is unreachable, the backend falls back to a rule-based policy engine automatically (see `LoanAssessmentServiceImpl.java`).
- **CORS** — Configured to allow `http://localhost:5173` via both `@CrossOrigin` on the controller and global `CorsConfig.java`.
- **UUID primary keys** — Assessments use `GenerationType.UUID` for globally unique identifiers.
- **DAO + Repository pattern** — The backend uses both a DAO layer and Spring Data JPA repository for data access.

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is part of an academic ML course final project. See repository metadata for details.
For questions or issues, please [open an issue](../../issues).
