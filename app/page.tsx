import { PageLayout } from "@/layouts/page-layout"
import { JobFilters } from "@/components/job-filters"
import { JobList } from "@/components/job-list"

export default function HomePage() {
  return (
    <PageLayout
      title="Find Your Dream Job"
      description="Discover amazing opportunities from top companies in Sri Lanka."
    >
      <div className="space-y-8">
        <JobFilters />
        <JobList />
      </div>
    </PageLayout>
  );
}
