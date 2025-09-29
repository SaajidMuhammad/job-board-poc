"use client"

import Link from "next/link"
import { MapPin, Building, Clock, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Job } from "@/types/job"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const formatJobType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground mb-1 text-balance">{job.title}</h3>
              <div className="flex items-center text-muted-foreground text-sm mb-2">
                <Building className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{job.company}</span>
              </div>
            </div>
            <Badge variant="secondary" className="flex-shrink-0">
              {formatJobType(job.jobType)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>

            {job.salary && (
              <div className="flex items-center text-muted-foreground text-sm">
                <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{job.salary}</span>
              </div>
            )}

            <p className="text-muted-foreground text-sm line-clamp-2 text-pretty">{job.description}</p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center text-muted-foreground text-xs">
                <Clock className="h-3 w-3 mr-1" />
                <span>{formatDate(job.postedDate)}</span>
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <div className="flex gap-1">
                  {job.requirements.slice(0, 2).map((req, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                  {job.requirements.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.requirements.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
