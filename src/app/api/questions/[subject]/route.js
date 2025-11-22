import { NextResponse } from 'next/server';
import { getQuestions, getTestQuestions } from '@/lib/contentLoader';

export async function GET(request, { params }) {
    const { subject } = await params;
    const { searchParams } = new URL(request.url);

    const filters = {
        domain: searchParams.get('domain'),
        topic: searchParams.get('topic'),
        difficulty: searchParams.get('difficulty'),
        limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')) : null
    };

    // Check if this is for a test
    const testType = searchParams.get('testType');
    const testMode = searchParams.get('testMode');

    try {
        let questions;

        if (testType) {
            questions = getTestQuestions(testType, testMode);
        } else {
            questions = getQuestions(subject, filters);
        }

        return NextResponse.json({ success: true, data: questions, count: questions.length });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
