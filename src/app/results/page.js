'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import styles from './results.module.css';

export default function ResultsPage() {
    const router = useRouter();
    const [results, setResults] = useState(null);

    useEffect(() => {
        const data = sessionStorage.getItem('testResults');
        if (data) {
            setResults(JSON.parse(data));
        } else {
            router.push('/practice');
        }
    }, [router]);

    if (!results) {
        return (
            <>
                <Navbar />
                <main className={styles.main}>
                    <div className="container">
                        <Card variant="glass" className={styles.loadingCard}>
                            <h2>Loading results...</h2>
                        </Card>
                    </div>
                </main>
            </>
        );
    }

    const percentage = Math.round((results.correct / results.total) * 100);
    const scoreCategory = percentage >= 90 ? 'excellent' : percentage >= 75 ? 'good' : percentage >= 60 ? 'fair' : 'needs-work';

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className="container">
                    {/* Score Card */}
                    <Card variant="glass" className={styles.scoreCard}>
                        <div className={styles.scoreHeader}>
                            <h1>Test Results</h1>
                            <p className={styles.testMeta}>
                                {results.type === 'math' ? '📐 Math' : results.type === 'english' ? '📚 English' : '🎯 Full-Length'} •
                                {results.mode === 'timed' ? ' Timed' : ' Untimed'}
                            </p>
                        </div>

                        <div className={`${styles.scoreDisplay} ${styles[scoreCategory]}`}>
                            <div className={styles.scoreValue}>{percentage}%</div>
                            <div className={styles.scoreLabel}>{results.correct} / {results.total} Correct</div>
                        </div>

                        <div className={styles.scoreMessage}>
                            {scoreCategory === 'excellent' && '🎉 Excellent work! You\'re on track for an 800!'}
                            {scoreCategory === 'good' && '👍 Good job! Keep practicing to reach your target score.'}
                            {scoreCategory === 'fair' && '📚 Fair performance. Review the explanations and try again.'}
                            {scoreCategory === 'needs-work' && '💪 Keep practicing! Focus on understanding the concepts.'}
                        </div>
                    </Card>

                    {/* Breakdown by Difficulty */}
                    <Card variant="elevated" className={styles.breakdownCard}>
                        <h3>Performance Breakdown</h3>
                        <div className={styles.breakdownGrid}>
                            {['Easy', 'Medium', 'Hard'].map(diff => {
                                const questionsOfDiff = results.questions.filter(q => q.difficulty === diff);
                                const correctOfDiff = questionsOfDiff.filter(q => results.answers[q.id] === q.correct_answer).length;
                                const totalOfDiff = questionsOfDiff.length;
                                const percentOfDiff = totalOfDiff > 0 ? Math.round((correctOfDiff / totalOfDiff) * 100) : 0;

                                return (
                                    <div key={diff} className={styles.breakdownItem}>
                                        <div className={styles.breakdownHeader}>
                                            <span className={`${styles.difficultyBadge} ${styles[diff.toLowerCase()]}`}>{diff}</span>
                                            <span className={styles.breakdownScore}>{percentOfDiff}%</span>
                                        </div>
                                        <div className={styles.breakdownDetails}>
                                            {correctOfDiff} / {totalOfDiff} correct
                                        </div>
                                        <div className={styles.progressBar}>
                                            <div className={styles.progressFill} style={{ width: `${percentOfDiff}%` }}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Question Review */}
                    <Card variant="elevated" className={styles.reviewCard}>
                        <h3>Question Review</h3>
                        <div className={styles.questionsList}>
                            {results.questions.map((q, idx) => {
                                const userAnswer = results.answers[q.id];
                                const isCorrect = userAnswer === q.correct_answer;

                                return (
                                    <div key={q.id} className={`${styles.reviewItem} ${isCorrect ? styles.correct : styles.incorrect}`}>
                                        <div className={styles.reviewHeader}>
                                            <span className={styles.questionNum}>#{idx + 1}</span>
                                            <span className={styles.reviewStatus}>
                                                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                                            </span>
                                            <span className={`${styles.difficultyBadge} ${styles[q.difficulty.toLowerCase()]}`}>
                                                {q.difficulty}
                                            </span>
                                        </div>
                                        <p className={styles.reviewQuestion}>{q.question_text}</p>
                                        <div className={styles.reviewAnswers}>
                                            <div className={styles.answerRow}>
                                                <strong>Your answer:</strong> {userAnswer || 'Not answered'}
                                                {userAnswer && !isCorrect && ' ❌'}
                                            </div>
                                            {!isCorrect && (
                                                <div className={styles.answerRow}>
                                                    <strong>Correct answer:</strong> {q.correct_answer} ✓
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.explanation}>
                                            <strong>Explanation:</strong> {q.explanation}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <Button variant="primary" size="large" href="/practice">
                            Take Another Test
                        </Button>
                        <Button variant="outline" size="large" href="/">
                            Back to Home
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
}
