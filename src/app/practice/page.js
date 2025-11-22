'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import styles from './practice.module.css';

export default function PracticePage() {
    const router = useRouter();
    const [testType, setTestType] = useState('math');
    const [testMode, setTestMode] = useState('timed');

    const handleStartTest = () => {
        router.push(`/test/${testMode}/${testType}`);
    };

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className="container">
                    <section className={styles.hero}>
                        <h1 className="fade-in">
                            Practice <span className="gradient-text">Tests</span>
                        </h1>
                        <p className={styles.subtitle}>
                            Configure your practice test. Choose between timed realistic tests or untimed practice sessions.
                        </p>
                    </section>

                    <div className={styles.configSection}>
                        {/* Test Type Selection */}
                        <Card variant="elevated" className={styles.configCard}>
                            <h3>1. Select Test Type</h3>
                            <div className={styles.optionsGrid}>
                                <div
                                    className={`${styles.option} ${testType === 'math' ? styles.active : ''}`}
                                    onClick={() => setTestType('math')}
                                >
                                    <div className={styles.optionIcon}>📐</div>
                                    <div className={styles.optionContent}>
                                        <h4>Math Only</h4>
                                        <p>22 questions per module</p>
                                        <p className={styles.optionTime}>35 min per module</p>
                                    </div>
                                    {testType === 'math' && <div className={styles.checkmark}>✓</div>}
                                </div>

                                <div
                                    className={`${styles.option} ${testType === 'english' ? styles.active : ''}`}
                                    onClick={() => setTestType('english')}
                                >
                                    <div className={styles.optionIcon}>📚</div>
                                    <div className={styles.optionContent}>
                                        <h4>English Only</h4>
                                        <p>27 questions per module</p>
                                        <p className={styles.optionTime}>32 min per module</p>
                                    </div>
                                    {testType === 'english' && <div className={styles.checkmark}>✓</div>}
                                </div>

                                <div
                                    className={`${styles.option} ${testType === 'full' ? styles.active : ''}`}
                                    onClick={() => setTestType('full')}
                                >
                                    <div className={styles.optionIcon}>🎯</div>
                                    <div className={styles.optionContent}>
                                        <h4>Full-Length</h4>
                                        <p>Math + English</p>
                                        <p className={styles.optionTime}>~2 hours 14 min</p>
                                    </div>
                                    {testType === 'full' && <div className={styles.checkmark}>✓</div>}
                                </div>
                            </div>
                        </Card>

                        {/* Test Mode Selection */}
                        <Card variant="elevated" className={styles.configCard}>
                            <h3>2. Select Test Mode</h3>
                            <div className={styles.modeGrid}>
                                <div
                                    className={`${styles.modeOption} ${testMode === 'timed' ? styles.active : ''}`}
                                    onClick={() => setTestMode('timed')}
                                >
                                    <div className={styles.modeIcon}>⏱️</div>
                                    <h4>Timed</h4>
                                    <p>Realistic test conditions with countdown timer</p>
                                    {testMode === 'timed' && <div className={styles.checkmark}>✓</div>}
                                </div>

                                <div
                                    className={`${styles.modeOption} ${testMode === 'untimed' ? styles.active : ''}`}
                                    onClick={() => setTestMode('untimed')}
                                >
                                    <div className={styles.modeIcon}>∞</div>
                                    <h4>Untimed</h4>
                                    <p>Practice at your own pace, no timer pressure</p>
                                    {testMode === 'untimed' && <div className={styles.checkmark}>✓</div>}
                                </div>
                            </div>
                        </Card>

                        {/* Summary and Start */}
                        <Card variant="glass" className={styles.summaryCard}>
                            <div className={styles.summary}>
                                <div>
                                    <h3>Ready to Start?</h3>
                                    <p className={styles.summaryText}>
                                        <strong>Test Type:</strong> {testType === 'math' ? 'Math Only' : testType === 'english' ? 'English Only' : 'Full-Length'} •
                                        <strong> Mode:</strong> {testMode === 'timed' ? 'Timed' : 'Untimed'}
                                    </p>
                                </div>
                                <Button variant="primary" size="large" onClick={handleStartTest}>
                                    🚀 Start Test
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    );
}
