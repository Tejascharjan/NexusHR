<div align="center">

# 🚀 NexusHR

### AI-Powered Human Resource Management System

<p>
A modern, full-stack Human Resource Management System built using <strong>Spring Boot</strong>, <strong>React</strong>, and <strong>Artificial Intelligence</strong> to streamline workforce management through employee administration, attendance tracking, leave management, payroll processing, and AI-driven analytics.
</p>

<p>
  <img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-brightgreen?style=for-the-badge&logo=springboot" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/MySQL-Database-blue?style=for-the-badge&logo=mysql" />
  <img src="https://img.shields.io/badge/Spring_AI-Gemini-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

<p>
  <img src="https://img.shields.io/github/stars/your-username/NexusHR?style=social" />
  <img src="https://img.shields.io/github/forks/your-username/NexusHR?style=social" />
  <img src="https://img.shields.io/github/issues/your-username/NexusHR?style=social" />
</p>

</div>

---

## 🎥 Application Demo

<div align="center">

<img src="images/nexushr-demo.gif" width="900"/>

</div>

---

## 📸 Application Screenshots

### Dashboard

<div align="center">
  <img src="images/dashboard.png" width="900"/>
</div>

### Employee Management

<div align="center">
  <img src="images/employees.png" width="900"/>
</div>

### Attendance Management

<div align="center">
  <img src="images/attendance.png" width="900"/>
</div>

### Payroll Management

<div align="center">
  <img src="images/payroll.png" width="900"/>
</div>

### AI Analytics Dashboard

<div align="center">
  <img src="images/ai-dashboard.png" width="900"/>
</div>

---

# ✨ Features

<table>
<tr>
<td width="50%">

### 👥 Employee Management

- Employee onboarding
- Profile management
- Compensation management
- Role management
- Employee directory

</td>

<td width="50%">

### 🏢 Department Management

- Department creation
- Manager assignment
- Department statistics
- Employee allocation
- Department reports

</td>
</tr>

<tr>
<td>

### 🕒 Attendance Management

- Daily attendance tracking
- Present/Absent management
- Half-day handling
- Holiday management
- Monthly reports

</td>

<td>

### 📝 Leave Management

- Leave application workflow
- Paid and unpaid leaves
- Leave approval process
- Leave history
- Leave analytics

</td>
</tr>

<tr>
<td>

### 💰 Payroll Management

- Automated payroll generation
- Attendance-based calculations
- Allowances and deductions
- Salary history
- Draft → Processed → Paid workflow

</td>

<td>

### 🤖 AI Analytics

- Attrition prediction
- Skill gap analysis
- Employee engagement scoring
- Training recommendations
- Workforce analytics

</td>
</tr>
</table>

---

# 🏗️ System Architecture

<div align="center">

<img src="images/architecture.png" width="900"/>

</div>

---

# 🛠️ Technology Stack

## Backend

<p>
<img src="https://skillicons.dev/icons?i=java,spring,maven,mysql" />
</p>

- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA (Hibernate)
- Spring Validation
- JWT Authentication
- REST APIs
- Spring AI
- Maven

---

## Frontend

<p>
<img src="https://skillicons.dev/icons?i=react,typescript,redux,tailwind,vite" />
</p>

- React.js
- TypeScript
- Redux Toolkit
- React Router
- React Hook Form
- Zod Validation
- Tailwind CSS
- shadcn/ui
- Axios

---

## AI Stack

<p>
<img src="https://img.shields.io/badge/Google-Gemini-blue?style=for-the-badge&logo=google" />
<img src="https://img.shields.io/badge/Spring_AI-Framework-green?style=for-the-badge" />
</p>

Features:

- Attrition Prediction
- Skill Gap Analysis
- Engagement Scoring
- Training Recommendations
- AI-powered Insights

---

# 📂 Project Structure

```text
NexusHR
│
├── backend
│   ├── authentication
│   ├── employee-management
│   ├── department-management
│   ├── attendance-management
│   ├── leave-management
│   ├── payroll-management
│   ├── ai-analytics
│   └── reporting
│
└── frontend
    ├── components
    ├── pages
    ├── redux
    ├── hooks
    ├── services
    ├── schemas
    └── layouts
```

---

# 🗄️ Database Design

<div align="center">

<img src="images/database-diagram.png" width="900"/>

</div>

---

# 🔐 Authentication & Authorization

<div align="center">

| Role        | Permissions                           |
| ----------- | ------------------------------------- |
| 👑 Admin    | Complete system access                |
| 👨‍💼 Manager  | Team and department management        |
| 👨‍💻 Employee | Self-service portal and personal data |

</div>

---

# 🤖 AI Analytics Module

## Employee Attrition Prediction

Analyzes:

- Attendance trends
- Leave patterns
- Performance indicators
- Employee tenure
- Engagement score

Provides:

- Risk level
- Confidence score
- Reasons
- Retention recommendations

---

## Skill Gap Analysis

- Role-specific skill evaluation
- Missing skill identification
- Skill match percentage
- Personalized learning recommendations

---

## Employee Engagement Scoring

Calculates employee engagement using:

```text
Attendance Consistency      30%
Performance Rating          30%
Training Participation      15%
Activities                  15%
Recognition                 10%
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/NexusHR.git
cd NexusHR
```

---

## Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔧 Environment Variables

### Backend (.env)

```properties
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/nexushr
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=password

JWT_SECRET=your-secret-key

GEMINI_API_KEY=your-gemini-api-key
```

---

# 🚀 Future Enhancements

- Salary Slip PDF Generation
- Email Notifications
- Recruitment Management
- Performance Management
- HR Chatbot
- Natural Language Reports
- Advanced Predictive Analytics
- Mobile Application

---

# 📚 Learning Outcomes

- Full Stack Development
- Microservices Architecture
- REST API Design
- Authentication & Authorization
- Database Design
- Payroll Management
- Attendance Management
- Spring AI Integration
- Prompt Engineering
- Predictive Analytics
- Clean Architecture and Design Patterns

---

# 👨‍💻 Author

### Tejas Charjan

Java Full Stack Developer

<p>
<a href="https://github.com/your-username">
<img src="https://img.shields.io/badge/GitHub-Profile-black?style=for-the-badge&logo=github"/>
</a>

<a href="https://www.linkedin.com/in/your-linkedin">
<img src="https://img.shields.io/badge/LinkedIn-Profile-blue?style=for-the-badge&logo=linkedin"/>
</a>
</p>

---

<div align="center">

### ⭐ If you found this project useful, please consider giving it a star!

Made with ❤️ using Spring Boot, React, and Artificial Intelligence.

</div>
