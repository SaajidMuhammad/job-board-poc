import { PageLayout } from "@/layouts/page-layout"
import { AddJobForm } from "@/components/add-job-form"

export default function AddJobPage() {
  return (
    <PageLayout
      title="Post a New Job"
      description="Share your job opportunity with talented professionals looking for their next role."
    >
      <AddJobForm />
    </PageLayout>
  )
}
