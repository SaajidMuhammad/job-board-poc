"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Job, JobFilters, JobContextType } from "@/types/job"

const JobContext = createContext<JobContextType | undefined>(undefined)

// Mock initial data
const initialJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    jobType: "full-time",
    description:
      "We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for building user-facing features using modern web technologies.",
    requirements: ["React", "TypeScript", "Next.js", "5+ years experience"],
    salary: "$120,000 - $150,000",
    postedDate: "2024-01-15",
    applicationUrl: "https://example.com/apply/1",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "DataFlow Inc",
    location: "New York, NY",
    jobType: "full-time",
    description:
      "Join our backend team to build scalable APIs and microservices. Experience with cloud platforms and databases required.",
    requirements: ["Node.js", "Python", "AWS", "PostgreSQL", "3+ years experience"],
    salary: "$100,000 - $130,000",
    postedDate: "2024-01-14",
    applicationUrl: "https://example.com/apply/2",
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    jobType: "contract",
    description:
      "We need a talented UX Designer to help create intuitive and engaging user experiences for our digital products.",
    requirements: ["Figma", "User Research", "Prototyping", "2+ years experience"],
    salary: "$80 - $100/hour",
    postedDate: "2024-01-13",
    applicationUrl: "https://example.com/apply/3",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Austin, TX",
    jobType: "full-time",
    description:
      "Looking for a DevOps Engineer to manage our infrastructure and deployment pipelines. Strong automation skills required.",
    requirements: ["Docker", "Kubernetes", "CI/CD", "Terraform", "4+ years experience"],
    salary: "$110,000 - $140,000",
    postedDate: "2024-01-12",
    applicationUrl: "https://example.com/apply/4",
  },
  {
    id: "5",
    title: "Product Manager",
    company: "InnovateLab",
    location: "Seattle, WA",
    jobType: "full-time",
    description:
      "Seeking an experienced Product Manager to drive product strategy and work closely with engineering and design teams.",
    requirements: ["Product Strategy", "Agile", "Analytics", "3+ years experience"],
    salary: "$130,000 - $160,000",
    postedDate: "2024-01-11",
    applicationUrl: "https://example.com/apply/5",
  },
  {
    id: "6",
    title: "Marketing Intern",
    company: "StartupXYZ",
    location: "Los Angeles, CA",
    jobType: "internship",
    description:
      "Great opportunity for a marketing student to gain hands-on experience in digital marketing and content creation.",
    requirements: ["Marketing fundamentals", "Social Media", "Content Creation"],
    salary: "$20/hour",
    postedDate: "2024-01-10",
    applicationUrl: "https://example.com/apply/6",
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
