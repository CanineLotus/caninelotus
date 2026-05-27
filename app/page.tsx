import PortfolioPageClient from "./portfolio-page-client";
import { getProjects } from "./projects-data";

export default function Page() {
  const projects = getProjects();

  return <PortfolioPageClient initialProjects={projects} />;
}
