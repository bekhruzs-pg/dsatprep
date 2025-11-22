'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import styles from './test.module.css';

export default function TestPage() {
    const params = useParams();
    const router = useRouter();
    const { mode, type } = params;

    const [timeRemaining, setTimeRemaining] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [testStarted, setTestStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    // Configure test based on type
    const testConfig = {
        math: { totalQuestions: 22, timeLimit: 35 * 60, subject: 'math' },
        english: { totalQuestions: 27, timeLimit: 32 * 60, subject: 'english' },
        full: { totalQuestions: 49, timeLimit: 67 * 60, subject: 'full' }
    };

    const config = testConfig[type] || testConfig.math;

    // Fetch questions
    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch(`/api/questions/${config.subject}?testType=${type}&testMode=${mode}`);
                const data = await response.json();

                if (data.success) {
                    setQuestions(data.data);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchQuestions();
    }, [type, mode, config.subject]);

    useEffect(() => {
        if (mode === 'timed' && testStarted) {
            setTimeRemaining(config.timeLimit);
        }
    }, [mode, testStarted, config.timeLimit]);

    useEffect(() => {
        if (mode === 'timed' && timeRemaining > 0 && testStarted) {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        handleSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [mode, timeRemaining, testStarted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        setTestStarted(true);
    };

    const handleAnswerSelect = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = () => {
        // Calculate score
        let correct = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correct_answer) {
                correct++;
            }
        });

        // Store results in sessionStorage
        sessionStorage.setItem('testResults', JSON.stringify({
            type,
            mode,
            questions,
            answers,
            correct,
            total: questions.length,
            score: Math.round((correct / questions.length) * 100)
        }));

        router.push('/results');
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <main className={styles.main}>
                    <div className="container">
                        <Card variant="glass" className={styles.startCard}>
                            <h2>Loading questions...</h2>
                        </Card>
                    </div>
                </main>
            </>
        );
    }

    if (!testStarted) {
        return (
            <>
                <Navbar />
                <main className={styles.main}>
                    <div className="container">
                        <Card variant="glass" className={styles.startCard}>
                            <h1>
                                {type === 'math' ? '📐 Math' : type === 'english' ? '📚 English' : '🎯 Full-Length'} Test
                            </h1>
                            <p className={styles.testInfo}>
                                <strong>Mode:</strong> {mode === 'timed' ? 'Timed' : 'Untimed'}<br />
                                <strong>Questions:</strong> {questions.length}<br />
                                {mode === 'timed' && <><strong>Time:</strong> {Math.floor(config.timeLimit / 60)} minutes</>}
                            </p>
                            <p className={styles.instructions}>
                                You are about to start your practice test with real DSAT questions. Click the button below when you're ready.
                            </p>
                            <Button variant="primary" size="large" onClick={handleStart}>
                                Begin Test
                            </Button>
                        </Card>
                    </div>
                </main>
            </>
        );
    }

    const currentQ = questions[currentQuestion];

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className={styles.testContainer}>
                    {/* Timer Bar */}
                    {mode === 'timed' && (
                        <div className={styles.timerBar}>
                            <div className={styles.timerContent}>
                                <span className={styles.timerLabel}>Time Remaining:</span>
                                <span className={`${styles.timerValue} ${timeRemaining < 300 ? styles.warning : ''}`}>
                                    ⏱️ {formatTime(timeRemaining)}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Question Area */}
                    <div className={styles.questionSection}>
                        <Card variant="elevated" className={styles.questionCard}>
                            <div className={styles.questionHeader}>
                                <span className={styles.questionNumber}>
                                    Question {currentQuestion + 1} of {questions.length}
                                </span>
                                <div className={styles.questionMeta}>
                                    <span className={styles.questionType}>
                                        {currentQ.subject === 'math' ? 'Math' : 'English'}
                                    </span>
                                    <span className={`${styles.difficulty} ${styles[currentQ.difficulty.toLowerCase()]}`}>
                                        {currentQ.difficulty}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.questionContent}>
                                <p className={styles.questionText}>
                                    {currentQ.question_text}
                                </p>

                                <div className={styles.answerChoices}>
                                    {currentQ.options.map((option, idx) => {
                                        const letter = option.charAt(0);
                                        return (
                                            <div key={idx} className={styles.choice}>
                                                <input
                                                    type="radio"
                                                    name="answer"
                                                    id={`choice-${letter}`}
                                                    checked={answers[currentQ.id] === letter}
                                                    onChange={() => handleAnswerSelect(currentQ.id, letter)}
                                                />
                                                <label htmlFor={`choice-${letter}`}>
                                                    <span className={styles.choiceLetter}>{letter}</span>
                                                    <span>{option.substring(3)}</span>
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className={styles.questionFooter}>
                                <span className={styles.topicLabel}>
                                    {currentQ.topic?.replace(/_/g, ' ')}
                                </span>
                            </div>
                        </Card>
                    </div>

                    {/* Navigation */}
                    <div className={styles.navigation}>
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentQuestion === 0}
                        >
                            ← Previous
                        </Button>

                        <span className={styles.progress}>
                            {currentQuestion + 1} / {questions.length}
                        </span>

                        {currentQuestion === questions.length - 1 ? (
                            <Button variant="primary" onClick={handleSubmit}>
                                Submit Test
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleNext}>
                                Next →
                            </Button>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
