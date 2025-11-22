import { NextResponse } from 'next/server';
import { getArticle } from '@/lib/contentLoader';

export async function GET(request, { params }) {
    const { subject, domain, topic } = await params;

    try {
        console.log(`Fetching article for: ${subject}/${domain}/${topic}`);
        const article = getArticle(subject, domain, topic);
        console.log('Article found:', !!article);

        if (!article) {
            return NextResponse.json(
                { success: false, error: 'Article not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: article });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
