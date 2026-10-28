# ParkCloud: Cloud-Based Smart Parking Management System (India Edition)

[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Nginx](https://img.shields.io/badge/Nginx-1.27-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)
[![AWS](https://img.shields.io/badge/AWS-ap--south--1-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)

**ParkCloud** is a production-grade, cloud-native smart parking management and mobility telemetry platform tailored for high-density metropolitan areas across India (Mumbai, Pune, Hyderabad, and Bengaluru).

It provides real-time slot discovery, touchless digital check-in/check-out, automated GST-compliant tax invoicing, role-based personal driver analytics, and administrative intelligence (occupancy forecasting, rush-hour distribution, and S3-backed compliance audits).

---

## 🚀 Quick Start with Docker (Recommended)

ParkCloud is fully containerized using multi-stage Docker builds, dedicated bridge networking, healthchecks, and resource management.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/)

### 1. Clone & Launch
```bash
git clone https://github.com/amosnunes01/ParkCloud.git
cd ParkCloud

# Start all services with Docker Compose
docker compose up -d --build
```
*Alternatively, you can run `./docker-run.sh` or `make up`.*

### 2. Access the Application
- **Web Application:** [http://localhost](http://localhost) (or `http://localhost:80`)
- **Backend API:** [http://localhost:5001](http://localhost:5001)
- **Container Health:** `make health`
- **View Logs:** `docker compose logs -f`
- **Stop Application:** `docker compose down` (or `make down`)

---

## 👥 Demo Credentials

| Role | Email | Password | Features Accessible |
|---|---|---|---|
| **Driver / Commuter** | `rahul.sharma@example.com` | `User@ParkCloud2026!` | Slot booking, digital pass QR, Driver Personal Analytics, GST Tax Invoices |
| **Administrator** | `admin@parkcloud.in` | `Admin@ParkCloud2026!` | Boom barrier scanner, Operational Heatmaps, S3 Audit Reports, Lot & Slot Config |

---

## 🏗️ Docker Architecture

```
┌───────────────────────────────────────────────────────────┐
│                    Docker Host Machine                    │
│                                                           │
│   Port 80 (Host) ─────────────► Port 80 (Container)       │
│                                      │                    │
│   Port 5001 (Host) ────────┐         │                    │
│                            │         ▼                    │
│   ┌────────────────────────┼──────────────────────────┐   │
│   │ Custom Bridge Network: │ parkcloud-network        │   │
│   │                        ▼                          │   │
│   │    ┌────────────────────────┐                     │   │
│   │    │  parkcloud-web (Nginx) │                     │   │
│   │    │  - Serves React SPA    │                     │   │
│   │    │  - Gzip compression    │                     │   │
│   │    │  - Security headers    │                     │   │
│   │    │  - Proxies /api/* ────┐│                     │   │
│   │    └───────────────────────┼┘                     │   │
│   │                            │                      │   │
│   │                            ▼                      │   │
│   │    ┌────────────────────────┐                     │   │
│   │    │  parkcloud-api (Node)  │                     │   │
│   │    │  - REST API Engine     │                     │   │
│   │    │  - Dynamic PDF streams │                     │   │
│   │    │  - Port 5000 (Internal)│                     │   │
│   │    └────────────────────────┘                     │   │
│   └───────────────────────────────────────────────────┘   │
│                                                           │
│   Volumes:                                                │
│   - parkcloud-storage (persistent report data)            │
│   - parkcloud-nginx-logs (access/error logs)              │
└───────────────────────────────────────────────────────────┘
```

### Docker Features Implemented:
- **Multi-Stage Security-Hardened Builds:** Alpine-based non-root user execution (`parkcloud:nodejs`).
- **Container Healthchecks:** Automated health polling (`wget http://localhost:5000/api/health`).
- **Resource Constraints:** CPU (`0.50`) and Memory (`256M`) limits with reservations.
- **Service Dependencies:** Nginx web container waits for API health before binding traffic.
- **Persistent Named Volumes:** Independent lifecycle management for logs and generated files.
- **Environment Parity:** Configurable ports and endpoints via `.env`.

---

## 📁 Repository Structure

```
ParkCloud/
├── docker/
│   ├── Dockerfile.api            # Alpine-based Node.js API container
│   ├── Dockerfile.web            # Alpine-based Nginx static & proxy container
│   └── nginx.conf                # Nginx reverse proxy & cache configuration
├── docker-compose.yml            # Multi-container orchestration definition
├── .dockerignore                 # Excludes binaries and dependencies
├── .env.example                  # Environment template
├── .env                          # Local environment configuration
├── Makefile                      # One-word lifecycle commands
├── docker-run.sh                 # Quick launch script
├── docker-stop.sh                # Graceful shutdown script
├── PROJECT_REPORT.md             # Formal architectural & engineering report
├── README.md                     # Documentation & setup guide
└── app-extracted/
    ├── package.json              # Dependencies (React 18, Vite, Chart.js)
    ├── electron/                 # Electron desktop wrapper
    └── dist/
        ├── index.html            # Entry HTML with light/dark theme initialization
        ├── mock-api.js           # REST API server & PDF generation engine
        └── assets/
            ├── index-C66t_1mZ.js # React application bundle
            ├── index-BPEtBLJJ.css# Base utility styles
            └── theme-override.css# Blueprint engineering grid design tokens
```

---

## ⚡ Key Features

### 1. Commuter & Driver Experience
- **Live Bay Discovery:** Interactive availability across Mumbai, Pune, Hyderabad, and Bengaluru.
- **Categorized Slots:** Four-Wheelers, Two-Wheelers, and dedicated EV Charging points.
- **Digital Parking Pass:** Instant scannable QR pass for contactless gate entry.
- **Driver Personal Analytics:** Personal trip count, monthly spending bar charts, and bay frequency breakdown.
- **Downloadable GST Invoices:** Auto-generated PDF tax invoices with SAC code `996742` and 18% GST (CGST 9% + SGST 9%).

### 2. Administrator & Operator Experience
- **Gate Boom-Barrier Scanner:** Digital verification terminal with automated 4-second physical barrier status cycle.
- **System Operational Telemetry:** System Occupancy Rate, 24-hr IST distribution charts, and 7-day regression forecast curves.
- **7 × 24 Utilization Heatmap:** Day × Hour density visualization.
- **Amazon S3 Audit Reports:** Server-side PDF and CSV audit exports.
- **Lot & Slot Configuration:** Dynamic tariff manager (Paise/INR) and slot registration.

---

## ☁️ Live Cloud Deployment (AWS)

ParkCloud is deployed live in AWS region **`ap-south-1` (Mumbai)** inside account **Bryson (`247842832040`)**:

- **Live URL:** [http://13.203.192.73](http://13.203.192.73)
- **EC2 Instance:** `parkcloud-bryson-web` (`i-0dc1a66948a62d66f`)
- **S3 Bucket:** `parkcloud-storage-ap-south-1-i4dkpdh5`
- **IAM Role:** `parkcloud-ec2-s3-role` (with `parkcloud-ec2-s3-profile`)
- **Security Group:** `parkcloud-app-sg` (Ports 80 & 22)

## 🔒 Security Handling in Application and Cloud Setup (R4)

ParkCloud implements multi-layer defense-in-depth across both the application layer and AWS cloud infrastructure:

### 1. Application-Level Security
- **Authentication & Token Management:** Token-based session verification with protected route wrappers; unauthenticated requests are automatically deflected to `/login`.
- **Role-Based Access Control (RBAC):** Strict operational segregation between `USER` (Driver) and `ADMIN` (Operator). Commuters can only view their own vehicles, bookings, personal analytics, and invoices. Fleet occupancy heatmaps and barrier overrides are strictly restricted to verified administrators.
- **Input Validation & Sanitization:** Server-side regex pattern verification on all incoming payloads (e.g., Indian HSRP plate formats `^[0-9]{2}[A-Z]{2}[0-9]{4}[A-Z]{2}$` and Bharat Series `^[0-9]{2}BH[0-9]{4}[A-Z]{2}$`).
- **HTTP Security Headers:** Nginx enforces `X-Frame-Options: SAMEORIGIN` (Clickjacking mitigation), `X-Content-Type-Options: nosniff` (MIME sniffing defense), `X-XSS-Protection: 1; mode=block`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- **Container Hardening (Docker):** Application processes execute under a dedicated non-root user (`parkcloud:nodejs`, UID 1001) in minimal Alpine Linux images. The internal API port 5000 is isolated within a private Docker bridge network (`parkcloud-network`).

### 2. Cloud Infrastructure Security (AWS)
- **Zero Static Credentials:** The application runtime contains **zero hardcoded AWS access keys** or secrets. The EC2 instance assumes `parkcloud-ec2-s3-role` dynamically via AWS Security Token Service (STS) and IMDSv2.
- **Network Perimeter Isolation:** Stateful AWS Security Group (`parkcloud-app-sg`) permits ingress strictly on Port 80 (HTTP) and Port 22 (SSH). Internal application port 5000 is bound strictly to `127.0.0.1` loopback and is inaccessible from the public internet.
- **Storage Access Control (Amazon S3):** Bucket `parkcloud-storage-ap-south-1-i4dkpdh5` enforces S3 Block Public Access. Reports and files are generated server-side and streamed only via authenticated sessions or temporary 15-minute IAM pre-signed URLs.
- **Data Residency Compliance:** In strict adherence to India's **Digital Personal Data Protection (DPDP) Act 2023**, all telemetry, license plates, and driver records reside solely within the AWS Mumbai (`ap-south-1`) region.

---

## 📜 Compliance & Localization
- **Data Privacy:** DPDP Act 2023 compliant (data residency within India).
- **Taxation:** Indian Goods and Services Tax (GST) compliant.
- **Timezone:** Standardized on `Asia/Kolkata` (IST).
- **Vehicles:** Support for state RTO plates (`MH02AB1234`) and Bharat Series (`22BH1234AA`).

---

## 📄 License
This project is licensed under the MIT License — see the LICENSE file for details.
