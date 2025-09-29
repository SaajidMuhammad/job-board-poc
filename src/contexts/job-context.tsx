"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Job, JobFilters, JobContextType } from "@/types/job";
import { initialJobs } from "./inital-mock-data";

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filters, setFilters] = useState<JobFilters>({});
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);
  const [loading, setLoading] = useState(false);

  // Filter jobs based on current filters
  useEffect(() => {
    let filtered = jobs;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.jobType && filters.jobType !== "all") {
      filtered = filtered.filter((job) => job.jobType === filters.jobType);
    }

    if (filters.location && filters.location !== "all") {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.company && filters.company !== "all") {
      filtered = filtered.filter((job) =>
        job.company.toLowerCase().includes(filters.company!.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, filters]);

  const addJob = (jobData: Omit<Job, "id" | "postedDate">) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      postedDate: new Date().toISOString().split("T")[0],
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const updateFilters = (newFilters: JobFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const getJobById = (id: string) => {
    return jobs.find((job) => job.id === id);
  };

  const value: JobContextType = {
    jobs,
    filteredJobs,
    filters,
    addJob,
    updateFilters,
    getJobById,
    loading,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
}
