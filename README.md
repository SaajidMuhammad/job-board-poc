# 🚀 Job Board Application

A modern, responsive job board application built with Next.js, TypeScript, and Tailwind CSS, specifically designed for the job market.

## ✨ Features

- 🔍 **Advanced Job Search** - Search by title, company, location, or keywords
- 🏢 **Sri Lankan Companies** - Real companies like WSO2, Virtusa, Sysco Labs, IFS
- 📍 **Localized Content** - Jobs in Colombo, Kandy, and remote positions
- 💰 **LKR Salary Ranges** - Realistic salary ranges in Sri Lankan Rupees
- 🎯 **Smart Filtering** - Filter by job type, location, and company
- 📄 **Pagination** - 12 jobs per page with smooth navigation
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Built with Next.js and optimized for speed

## 🛠 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide_React-000000?style=for-the-badge&logo=lucide&logoColor=white)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SaajidMuhammad/job-board-poc.git
   cd job-board-poc
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
job-board-poc/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── job-card.tsx  # Job card component
│   │   ├── job-list.tsx  # Job listing component
│   │   ├── job-filters.tsx # Filter component
│   │   ├── pagination.tsx # Pagination component
│   │   └── navigation.tsx # Navigation component
│   ├── contexts/         # React contexts
│   │   └── job-context.tsx # Job state management
│   ├── types/           # TypeScript type definitions
│   └── lib/             # Utility functions
└── public/              # Static assets
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 **Mobile** (320px - 768px)
- 📱 **Tablet** (768px - 1024px)
- 💻 **Desktop** (1024px+)

## 🔧 Development

### Adding New Jobs
Jobs can be added through the "Add Job" form or by updating the mock data in `src/contexts/inital-mock-data.ts`.

### Customizing Filters
Modify the filter options in `src/components/job-filters.tsx` to add new filtering capabilities.

### Styling
The project uses Tailwind CSS for styling. Customize the design by modifying the Tailwind classes in the components.

## 👨‍💻 Developed by Saajid Muhammad

### 💻 **Frontend Engineer | React • Next.js • React Native • TypeScript**

⚡ I build **scalable apps with clean code and pixel-perfect UI/UX.**

### 📫 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/saajidmuhammad)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SaajidMuhammad)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:saajithtm@gmail.com)

---

✨ *"Clean code, scalable apps, and delightful user experiences — that's my craft."*
