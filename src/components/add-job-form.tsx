"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useJobs } from "@/contexts/job-context"
import type { Job } from "@/types/job"

interface FormData {
  title: string
  company: string
  location: string
  jobType: Job["jobType"] | ""
  description: string
  salary: string
  applicationUrl: string
  requirements: string[]
}

interface FormErrors {
  title?: string
  company?: string
  location?: string
  jobType?: string
  description?: string
}

export function AddJobForm() {
  const router = useRouter()
  const { addJob } = useJobs()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentRequirement, setCurrentRequirement] = useState("")

  const [formData, setFormData] = useState<FormData>({
    title: "",
    company: "",
    location: "",
    jobType: "",
    description: "",
    salary: "",
    applicationUrl: "",
    requirements: [],
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required"
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.jobType) {
      newErrors.jobType = "Job type is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Job description is required"
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Job description must be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const addRequirement = () => {
    if (currentRequirement.trim() && !formData.requirements.includes(currentRequirement.trim())) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, currentRequirement.trim()],
      }))
      setCurrentRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addRequirement()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const jobData = {
        title: formData.title.trim(),
        company: formData.company.trim(),
        location: formData.location.trim(),
        jobType: formData.jobType as Job["jobType"],
        description: formData.description.trim(),
        salary: formData.salary.trim() || undefined,
        applicationUrl: formData.applicationUrl.trim() || undefined,
        requirements: formData.requirements.length > 0 ? formData.requirements : undefined,
      }

      addJob(jobData)

      // Redirect to job listings with success message
      router.push("/?success=job-added")
    } catch (error) {
      console.error("Error adding job:", error)
      // Handle error (could show toast notification)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                Job Title *
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                Company *
              </label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="e.g. TechCorp Inc."
                className={errors.company ? "border-destructive" : ""}
              />
              {errors.company && <p className="text-sm text-destructive mt-1">{errors.company}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                Location *
              </label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g. San Francisco, CA or Remote"
                className={errors.location ? "border-destructive" : ""}
              />
              {errors.location && <p className="text-sm text-destructive mt-1">{errors.location}</p>}
            </div>

            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-foreground mb-2">
                Job Type *
              </label>
              <Select value={formData.jobType} onValueChange={(value) => handleInputChange("jobType", value)}>
                <SelectTrigger className={errors.jobType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              {errors.jobType && <p className="text-sm text-destructive mt-1">{errors.jobType}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-foreground mb-2">
                Salary (Optional)
              </label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                placeholder="e.g. $80,000 - $120,000 or $50/hour"
              />
            </div>

            <div>
              <label htmlFor="applicationUrl" className="block text-sm font-medium text-foreground mb-2">
                Application URL (Optional)
              </label>
              <Input
                id="applicationUrl"
                type="url"
                value={formData.applicationUrl}
                onChange={(e) => handleInputChange("applicationUrl", e.target.value)}
                placeholder="https://company.com/careers/apply"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
              rows={6}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
            <p className="text-sm text-muted-foreground mt-1">{formData.description.length}/50 characters minimum</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requirements & Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-foreground mb-2">
              Add Requirements (Optional)
            </label>
            <div className="flex gap-2">
              <Input
                id="requirements"
                value={currentRequirement}
                onChange={(e) => setCurrentRequirement(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g. React, 3+ years experience, Bachelor's degree"
              />
              <Button type="button" onClick={addRequirement} disabled={!currentRequirement.trim()} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Press Enter or click + to add each requirement</p>
          </div>

          {formData.requirements.length > 0 && (
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Requirements ({formData.requirements.length})</p>
              <div className="flex flex-wrap gap-2">
                {formData.requirements.map((req, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {req}
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={() => router.push("/")} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding Job..." : "Add Job"}
        </Button>
      </div>
    </form>
  )
}
