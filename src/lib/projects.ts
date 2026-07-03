import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export interface Project {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    coverImage: string;
    badge: string;
    status: string;
    content: string;
}

// Get all projects sorted by date descending
export function getAllProjects(): Project[] {
    // Check if directory exists
    if (!fs.existsSync(projectsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);

    const allProjectsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(projectsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Parse metadata section
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || 'Untitled Project',
                date: data.date || '',
                excerpt: data.excerpt || '',
                tags: data.tags || [],
                coverImage: data.coverImage || '',
                badge: data.badge || '',
                status: data.status || 'In Progress',
                content: content,
            };
        });

    // Sort projects by date descending
    return allProjectsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Get a single project by slug
export function getProjectBySlug(slug: string): Project | null {
    const projects = getAllProjects();
    return projects.find((project) => project.slug === slug) || null;
}
