'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Navbar from '@/components/Navbar/Navbar';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import styles from './study.module.css';

export default function StudyTopicPage() {
    const params = useParams();
    const { subject, domain, topic } = params;

    const [article, setArticle] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        async function fetchContent() {
            try {
                // Fetch article
                const articleRes = await fetch(`/api/article/${subject}/${domain}/${topic}`);
                const articleData = await articleRes.json();

                if (articleData.success) {
                    setArticle(articleData.data);
                }

                // Fetch questions for this topic
                const questionsRes = await fetch(`/api/questions/${subject}?domain=${domain}&topic=${topic}`);
                const questionsData = await questionsRes.json();

                if (questionsData.success) {
                    setQuestions(questionsData.data);
                }
            } catch (error) {
                console.error('Error fetching content:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, [subject, domain, topic]);

    const handleAnswerSelect = (questionId, answer) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleCheckAnswers = () => {
        setShowResults(true);
    };

    const handleReset = () => {
        setSelectedAnswers({});
        setShowResults(false);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <main className={styles.main}>
                    <div className="container">
                        <Card variant="glass" className={styles.loadingCard}>
                            <h2>Loading content...</h2>
                        </Card>
                    </div>
                </main>
            </>
        );
    }

    const correctCount = showResults
        ? questions.filter(q => selectedAnswers[q.id] === q.correct_answer).length
        : 0;

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className="container">
                    {/* Header */}
                    <div className={styles.header}>
                        <Button variant="ghost" href={`/${subject}`}>
                            ← Back to {subject === 'math' ? 'Math' : 'English'}
                        </Button>
                        <div className={styles.breadcrumb}>
                            <span>{article?.domain}</span>
                            <span> / </span>
                            <span>{article?.topic}</span>
                        </div>
                    </div>

                    {/* Article Content */}
                    {article && (
                        <Card variant="elevated" className={styles.articleCard}>
                            <div className={styles.articleHeader}>
                                <h1>{article.topic}</h1>
                                <span className={styles.subjectBadge}>
                                    {subject === 'math' ? '📐 Math' : '📚 English'}
                                </span>
                            </div>
                            <div className={styles.articleContent}>
                                <div className={styles.markdown}>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkMath]}
                                        rehypePlugins={[rehypeKatex]}
                                    >
                                        {article.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Practice Questions */}
                    {questions.length > 0 && (
                        <Card variant="elevated" className={styles.practiceCard}>
                            <div className={styles.practiceHeader}>
                                <h2>Practice Questions</h2>
                                {showResults && (
                                    <div className={styles.score}>
                                        Score: {correctCount} / {questions.length} ({Math.round((correctCount / questions.length) * 100)}%)
                                    </div>
                                )}
                            </div>

                            <div className={styles.questionsList}>
                                {questions.map((q, idx) => {
                                    let options = q.options;

                                    if (typeof options === 'string') {
                                        try {
                                            options = JSON.parse(options);
                                        } catch (e) {
                                            console.error("Error parsing options:", e);
                                            options = [];
                                        }
                                    }

                                    if (!Array.isArray(options)) {
                                        options = [];
                                    }

                                    const userAnswer = selectedAnswers[q.id];
                                    const isCorrect = userAnswer === q.correct_answer;
                                    const showFeedback = showResults && userAnswer;

                                    return (
                                        <div key={q.id} className={`${styles.questionItem} ${showFeedback ? (isCorrect ? styles.correct : styles.incorrect) : ''}`}>
                                            <div className={styles.questionHeader}>
                                                <span className={styles.questionNum}>Question {idx + 1}</span>
                                                <span className={`${styles.difficulty} ${styles[q.difficulty.toLowerCase()]}`}>
                                                    {q.difficulty}
                                                </span>
                                            </div>

                                            <p className={styles.questionText}>{q.question_text}</p>

                                            <div className={styles.options}>
                                                {options.map((option, optIdx) => {
                                                    const optText = typeof option === 'string' ? option : String(option);
                                                    const letter = optText.charAt(0);
                                                    const isSelected = userAnswer === letter;
                                                    const isCorrectAnswer = q.correct_answer === letter;

                                                    return (
                                                        <div
                                                            key={optIdx}
                                                            className={`${styles.option} 
                                ${isSelected ? styles.selected : ''} 
                                ${showFeedback && isCorrectAnswer ? styles.correctOption : ''}
                                ${showFeedback && isSelected && !isCorrect ? styles.incorrectOption : ''}
                              `}
                                                            onClick={() => !showResults && handleAnswerSelect(q.id, letter)}
                                                        >
                                                            <span className={styles.optionLetter}>{letter}</span>
                                                            <span>{option.substring(3)}</span>
                                                            {showFeedback && isCorrectAnswer && <span className={styles.checkmark}>✓</span>}
                                                            {showFeedback && isSelected && !isCorrect && <span className={styles.cross}>✗</span>}
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {showFeedback && (
                                                <div className={styles.explanation}>
                                                    <strong>Explanation:</strong> {q.explanation}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className={styles.practiceActions}>
                                {!showResults ? (
                                    <Button
                                        variant="primary"
                                        size="large"
                                        onClick={handleCheckAnswers}
                                        disabled={Object.keys(selectedAnswers).length === 0}
                                    >
                                        Check Answers
                                    </Button>
                                ) : (
                                    <Button variant="outline" size="large" onClick={handleReset}>
                                        Try Again
                                    </Button>
                                )}
                            </div>
                        </Card>
                    )}
                </div>
            </main>
        </>
    );
}
