import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface ParamsPromise {
    slug: string;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<ParamsPromise> }
) {
    try {
        const { slug } = await params;

        const comments = await prisma.blogComment.findMany({
            where: { slug },
            orderBy: { createdAt: 'desc' },
        });

        const formattedComments = comments.map((comment) => ({
            id: comment.id,
            name: comment.name,
            email: comment.email,
            message: comment.message,
            date: comment.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        }));

        return NextResponse.json({ comments: formattedComments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<ParamsPromise> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();

        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const comment = await prisma.blogComment.create({
            data: {
                slug,
                name: name.trim(),
                email: email.trim(),
                message: message.trim(),
            },
        });

        return NextResponse.json(
            {
                id: comment.id,
                name: comment.name,
                email: comment.email,
                message: comment.message,
                date: comment.createdAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json(
            { error: 'Failed to create comment' },
            { status: 500 }
        );
    }
}
