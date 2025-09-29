import type { Job, JobFilters } from "@/types/job"

const API_BASE_URL = "/api"

export interface JobsResponse {
  jobs: Job[]
  total: number
  hasMore: boolean
}

export class JobAPI {
  static async getJobs(filters?: JobFilters & { limit?: number; offset?: number }): Promise<JobsResponse> {
    const params = new URLSearchParams()

    if (filters?.search) params.append("search", filters.search)
    if (filters?.jobType) params.append("jobType", filters.jobType)
    if (filters?.location) params.append("location", filters.location)
    if (filters?.company) params.append("company", filters.company)
    if (filters?.limit) params.append("limit", filters.limit.toString())
    if (filters?.offset) params.append("offset", filters.offset.toString())

    const response = await fetch(`${API_BASE_URL}/jobs?${params}`)

    if (!response.ok) {
      throw new Error("Failed to fetch jobs")
    }

    return response.json()
  }

  static async getJob(id: string): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Job not found")
      }
      throw new Error("Failed to fetch job")
    }

    return response.json()
  }

  static async createJob(jobData: Omit<Job, "id" | "postedDate">): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to create job")
    }

    return response.json()
  }

  static async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to update job")
    }

    return response.json()
  }

  static async deleteJob(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete job")
    }
  }
}
