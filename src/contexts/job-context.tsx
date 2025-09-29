"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Job, JobFilters, JobContextType } from "@/types/job"

const JobContext = createContext<JobContextType | undefined>(undefined)

// Mock initial data
const initialJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "WSO2",
    location: "Colombo, Sri Lanka",
    jobType: "full-time",
    description:
      "We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for building user-facing features using modern web technologies.",
    requirements: ["React", "TypeScript", "Next.js", "5+ years experience"],
    salary: "LKR 200,000 - LKR 300,000",
    postedDate: "2024-01-15",
    applicationUrl: "https://example.com/apply/1",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "Sysco Labs",
    location: "Colombo, Sri Lanka",
    jobType: "full-time",
    description:
      "Join our backend team to build scalable APIs and microservices. Experience with cloud platforms and databases required.",
    requirements: ["Node.js", "Python", "AWS", "PostgreSQL", "3+ years experience"],
    salary: "LKR 180,000 - LKR 250,000",
    postedDate: "2024-01-14",
    applicationUrl: "https://example.com/apply/2",
  },
  {
    id: "3",
    title: "UX Designer",
    company: "99X Technology",
    location: "Remote",
    jobType: "contract",
    description:
      "We need a talented UX Designer to help create intuitive and engaging user experiences for our digital products.",
    requirements: ["Figma", "User Research", "Prototyping", "2+ years experience"],
    salary: "LKR 3,000 - LKR 5,000/hour",
    postedDate: "2024-01-13",
    applicationUrl: "https://example.com/apply/3",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "Virtusa",
    location: "Colombo, Sri Lanka",
    jobType: "full-time",
    description:
      "Looking for a DevOps Engineer to manage our infrastructure and deployment pipelines. Strong automation skills required.",
    requirements: ["Docker", "Kubernetes", "CI/CD", "Terraform", "4+ years experience"],
    salary: "LKR 220,000 - LKR 350,000",
    postedDate: "2024-01-12",
    applicationUrl: "https://example.com/apply/4",
  },
  {
    id: "5",
    title: "Product Manager",
    company: "IFS",
    location: "Colombo, Sri Lanka",
    jobType: "full-time",
    description:
      "Seeking an experienced Product Manager to drive product strategy and work closely with engineering and design teams.",
    requirements: ["Product Strategy", "Agile", "Analytics", "3+ years experience"],
    salary: "LKR 250,000 - LKR 400,000",
    postedDate: "2024-01-11",
    applicationUrl: "https://example.com/apply/5",
  },
  {
    id: "6",
    title: "Marketing Intern",
    company: "PickMe",
    location: "Colombo, Sri Lanka",
    jobType: "internship",
    description:
      "Great opportunity for a marketing student to gain hands-on experience in digital marketing and content creation.",
    requirements: ["Marketing fundamentals", "Social Media", "Content Creation"],
    salary: "LKR 25,000/month",
    postedDate: "2024-01-10",
    applicationUrl: "https://example.com/apply/6",
  },
  {
    id: "7",
    title: "Mobile App Developer",
    company: "CodeGen International",
    location: "Colombo, Sri Lanka",
    jobType: "full-time",
    description:
      "Join our mobile development team to create innovative mobile applications for iOS and Android platforms.",
    requirements: ["React Native", "Flutter", "Swift", "Kotlin", "2+ years experience"],
    salary: "LKR 150,000 - LKR 250,000",
    postedDate: "2024-01-09",
    applicationUrl: "https://example.com/apply/7",
  },
  {
    id: "8",
    title: "Data Scientist",
    company: "MillenniumIT ESP",
    location: "Colombo, Sri Lanka",
    jobType: "full-time",
    description:
      "We are seeking a Data Scientist to analyze complex data sets and build machine learning models for our financial technology solutions.",
    requirements: ["Python", "Machine Learning", "SQL", "Statistics", "3+ years experience"],
    salary: "LKR 200,000 - LKR 350,000",
    postedDate: "2024-01-08",
    applicationUrl: "https://example.com/apply/8",
  },
  {
    id: "9",
    title: "QA Engineer",
    company: "Zone24x7",
    location: "Kandy, Sri Lanka",
    jobType: "full-time",
    description:
      "Looking for a QA Engineer to ensure the quality of our software products through comprehensive testing strategies.",
    requirements: ["Selenium", "Jest", "Manual Testing", "API Testing", "2+ years experience"],
    salary: "LKR 120,000 - LKR 200,000",
    postedDate: "2024-01-07",
    applicationUrl: "https://example.com/apply/9",
  },
  {
    id: "10",
    title: "Business Analyst",
    company: "John Keells IT",
    location: "Colombo, Sri Lanka",
    jobType: "full-time",
    description:
      "Seeking a Business Analyst to bridge the gap between business stakeholders and technical teams in our digital transformation initiatives.",
    requirements: ["Business Analysis", "Agile", "Documentation", "Stakeholder Management", "3+ years experience"],
    salary: "LKR 180,000 - LKR 280,000",
    postedDate: "2024-01-06",
    applicationUrl: "https://example.com/apply/10",
  },
]

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const [filters, setFilters] = useState<JobFilters>({})
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs)
  const [loading, setLoading] = useState(false)

  // Filter jobs based on current filters
  useEffect(() => {
    let filtered = jobs

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower),
      )
    }

    if (filters.jobType && filters.jobType !== "all") {
      filtered = filtered.filter((job) => job.jobType === filters.jobType)
    }

    if (filters.location && filters.location !== "all") {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(filters.location!.toLowerCase()))
    }

    if (filters.company && filters.company !== "all") {
      filtered = filtered.filter((job) => job.company.toLowerCase().includes(filters.company!.toLowerCase()))
    }

    setFilteredJobs(filtered)
  }, [jobs, filters])

  const addJob = (jobData: Omit<Job, "id" | "postedDate">) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      postedDate: new Date().toISOString().split("T")[0],
    }
    setJobs((prev) => [newJob, ...prev])
  }

  const updateFilters = (newFilters: JobFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const getJobById = (id: string) => {
    return jobs.find((job) => job.id === id)
  }

  const value: JobContextType = {
    jobs,
    filteredJobs,
    filters,
    addJob,
    updateFilters,
    getJobById,
    loading,
  }

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>
}

export function useJobs() {
  const context = useContext(JobContext)
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider")
  }
  return context
}
