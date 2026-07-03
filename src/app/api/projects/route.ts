import { getAllProjects } from '@/lib/projects';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const projects = getAllProjects();
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}
