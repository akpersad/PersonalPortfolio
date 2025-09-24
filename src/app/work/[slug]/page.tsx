import type { Metadata } from 'next';
import { projects } from '@/lib/projects';
import ProjectPageClient from './ProjectPageClient';

// Create slug mapping for projects
const projectSlugs: Record<string, string> = {
  'POKÉ COLLECTOR': 'poke-collector',
  'Protein Quality Calculator': 'protein-checker',
};

// Create reverse mapping for lookup
const slugToProject: Record<string, string> = Object.fromEntries(
  Object.entries(projectSlugs).map(([project, slug]) => [slug, project])
);

type ProjectSlug = keyof typeof slugToProject;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for static export
export async function generateStaticParams() {
  return Object.keys(slugToProject).map(slug => ({
    slug: slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const projectName = slugToProject[slug as ProjectSlug];
  const project = projects.find(p => p.project === projectName);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.project} - Andrew Persad | Frontend Project`,
    description: project.shortDescription,
    keywords: project.keywords.join(', '),
    openGraph: {
      title: `${project.project} - Andrew Persad`,
      description: project.shortDescription,
      type: 'article',
      url: `https://andrewpersad.dev/work/${slug}`,
      images: project.images?.[0]?.web
        ? [
            {
              url: project.images[0].web,
              width: 800,
              height: 600,
              alt: `${project.project} screenshot`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.project} - Andrew Persad`,
      description: project.shortDescription,
      images: project.images?.[0]?.web ? [project.images[0].web] : undefined,
    },
    alternates: {
      canonical: `https://andrewpersad.dev/work/${slug}`,
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  return <ProjectPageClient params={params} />;
}
