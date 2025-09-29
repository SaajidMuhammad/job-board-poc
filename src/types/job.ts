export interface Job {
  id: string
  title: string
  company: string
  location: string
  jobType: "full-time" | "part-time" | "contract" | "internship"
  description: string
  requirements?: string[]
  salary?: string
  postedDate: string
  applicationUrl?: string
}

export interface JobFilters {
  jobType?: string
  location?: string
  company?: string
  search?: string
}

export interface JobContextType {
  jobs: Job[]
  filteredJobs: Job[]
  filters: JobFilters
  addJob: (job: Omit<Job, "id" | "postedDate">) => void
  updateFilters: (filters: JobFilters) => void
  getJobById: (id: string) => Job | undefined
  loading: boolean
  currentPage: number
  totalPages: number
  jobsPerPage: number
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
}
