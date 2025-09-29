import { type NextRequest, NextResponse } from "next/server"
import type { Job } from "@/types/job"

const jobs: Job[] = [
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const jobType = searchParams.get("jobType")
    const location = searchParams.get("location")
    const company = searchParams.get("company")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")

    let filteredJobs = [...jobs]

    if (search) {
      const searchLower = search.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower),
      )
    }

    if (jobType && jobType !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.jobType === jobType)
    }

    if (location && location !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
    }

    if (company && company !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.company.toLowerCase().includes(company.toLowerCase()))
    }

    const limitNum = limit ? Number.parseInt(limit) : undefined
    const offsetNum = offset ? Number.parseInt(offset) : 0

    if (limitNum) {
      filteredJobs = filteredJobs.slice(offsetNum, offsetNum + limitNum)
    }

    filteredJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())

    return NextResponse.json({
      jobs: filteredJobs,
      total: filteredJobs.length,
      hasMore: limitNum ? offsetNum + limitNum < filteredJobs.length : false,
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const requiredFields = ["title", "company", "location", "jobType", "description"]
    const missingFields = requiredFields.filter((field) => !body[field]?.trim())

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    const validJobTypes = ["full-time", "part-time", "contract", "internship"]
    if (!validJobTypes.includes(body.jobType)) {
      return NextResponse.json({ error: "Invalid job type" }, { status: 400 })
    }

    const newJob: Job = {
      id: Date.now().toString(),
      title: body.title.trim(),
      company: body.company.trim(),
      location: body.location.trim(),
      jobType: body.jobType,
      description: body.description.trim(),
      requirements: body.requirements || [],
      salary: body.salary?.trim() || undefined,
      applicationUrl: body.applicationUrl?.trim() || undefined,
      postedDate: new Date().toISOString().split("T")[0],
    }

    jobs.unshift(newJob)

    return NextResponse.json(newJob, { status: 201 })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
