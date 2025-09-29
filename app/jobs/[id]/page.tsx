"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Building, Clock, DollarSign, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PageLayout } from "@/layouts/page-layout"
import { useJobs } from "@/contexts/job-context"
import { useEffect, useState } from "react"
import type { Job } from "@/types/job"

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getJobById } = useJobs()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const foundJob = getJobById(params.id as string)
      setJob(foundJob || null)
      setLoading(false)
    }
  }, [params.id, getJobById])

  const formatJobType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleApply = () => {
    if (job?.applicationUrl) {
      window.open(job.applicationUrl, "_blank")
    } else {
      // Mock application process
      alert("Application submitted successfully! (This is a demo)")
    }
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-12 bg-muted rounded w-3/4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </PageLayout>
    )
  }

  if (!job) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Button>

        {/* Job Header */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl lg:text-3xl mb-3 text-balance">{job.title}</CardTitle>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span className="font-medium">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Posted {formatDate(job.postedDate)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="text-sm">
                    {formatJobType(job.jobType)}
                  </Badge>
                  {job.salary && (
                    <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                <Button onClick={handleApply} size="lg" className="w-full lg:w-auto">
                  Apply Now
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-pretty">{job.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Apply */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Apply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Ready to take the next step in your career?</p>
                <Button onClick={handleApply} className="w-full">
                  Apply Now
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                <Separator />
                <p className="text-xs text-muted-foreground">By applying, you agree to our terms and conditions.</p>
              </CardContent>
            </Card>

            {/* Job Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-foreground">Company</dt>
                    <dd className="text-sm text-muted-foreground">{job.company}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-foreground">Location</dt>
                    <dd className="text-sm text-muted-foreground">{job.location}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-foreground">Job Type</dt>
                    <dd className="text-sm text-muted-foreground">{formatJobType(job.jobType)}</dd>
                  </div>
                  {job.salary && (
                    <div>
                      <dt className="text-sm font-medium text-foreground">Salary</dt>
                      <dd className="text-sm text-muted-foreground">{job.salary}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-foreground">Posted</dt>
                    <dd className="text-sm text-muted-foreground">{formatDate(job.postedDate)}</dd>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            {job.requirements && job.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
