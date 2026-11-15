# 🌐 Ankit Parida - Portfolio

A modern, interactive portfolio website built with the MERN stack. It features a clean Black & White aesthetic with seamless dark/light mode support, dynamic tech stack animations, and a fully functional backend.

## 🌍 Live Demo

- **Frontend:** [https://port-folio-dusky-one.vercel.app](https://port-folio-dusky-one.vercel.app)
- **Backend API:** [https://portfolio-eevk.onrender.com](https://portfolio-eevk.onrender.com)

---

## ✨ Features

### 🎨 Design & UX
- **Black & White Theme:** Clean, minimal, and highly professional aesthetic.
- **Dark/Light Mode:** Seamless theme switching with local storage persistence.
- **Fully Responsive:** Optimized for all devices (mobile, tablet, desktop).
- **Interactive Animations:** Floating tech stack elements, typing effects, and smooth scroll reveals.

### 📄 Pages & Sections
- **Home:** Profile with typing animation, recent GitHub projects feed, and social links.
- **About:** Education, professional summary, soft skills, and interests.
- **Skills:** Categorized technical skills, GitHub & LeetCode profile links.
- **Projects:** Full-width showcase of featured projects (MovieMate) with live API and source code links.
- **Certifications:** Verified certificates with images (Python, Cisco, IBM, etc.).
- **Contact:** Contact form with MongoDB storage and email notifications.

### ⚙️ Technical Features
- **Contact Form:** Saves messages securely to MongoDB with instant Nodemailer email notifications.
- **GitHub Integration:** Dynamically fetches and displays recent repositories with stars and language stats.
- **Resume Download:** One-click PDF resume download.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI Framework |
| **Vite** | Build Tool |
| **Custom CSS** | Styling (Black & White Theme) |
| **React Router DOM** | Navigation |
| **Axios** | HTTP Requests |
| **Chart.js** | Data Visualization |
| **React Icons** | Icons |

### Backend
| Technology | Purpose |
| :--- | :--- |
| **Node.js** | Runtime Environment |
| **Express.js** | API Framework |
| **MongoDB + Mongoose** | Database & ODM |
| **Nodemailer** | Email Notifications |

### Deployment
| Service | Purpose |
| :--- | :--- |
| **Vercel** | Frontend Hosting |
| **Render** | Backend Hosting |
| **MongoDB Atlas** | Cloud Database Hosting |

---

## 📁 Project Structure

```text
PortFolio/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # Navbar, Footer, Background Elements
│   │   ├── pages/           # Home, About, Skills, Projects, Certifications, Contact
│   │   ├── data/            # Static data (Projects, Skills, Certifications)
│   │   ├── context/         # Theme Context (Dark/Light mode)
│   │   ├── services/        # API calls
│   │   └── styles/          # Modular CSS (themes, components, animations)
│   └── public/              # Resume PDF and static assets
│
├── server/                  # Node.js Backend
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── models/          # Mongoose schemas (Contact)
│   │   ├── controllers/     # Route logic (Contact, GitHub)
│   │   ├── routes/          # Express routes
│   │   └── app.js           # Express application setup
│   └── server.js            # Server entry point
│
└── README.md
📧 Contact
Ankit Parida

Platform	Link
Email	ankitparida386@gmail.com
LinkedIn	linkedin.com/in/ankitparida087
GitHub	github.com/ankitparida-dev
LeetCode	leetcode.com/u/Ankit087-acer
⭐ If you like this portfolio, feel free to give it a star!