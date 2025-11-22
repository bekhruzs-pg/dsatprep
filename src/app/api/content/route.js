import { NextResponse } from 'next/server';
import { getAllTopics } from '@/lib/contentLoader';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject') || 'math';

    try {
        const topics = getAllTopics(subject);
        return NextResponse.json({ success: true, data: topics });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
