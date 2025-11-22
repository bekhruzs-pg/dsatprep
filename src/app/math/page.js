'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import styles from './math.module.css';

export default function MathPage() {
    const [domains, setDomains] = useState([]);
    const [expandedDomain, setExpandedDomain] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTopics() {
            try {
                const response = await fetch('/api/content?subject=math');
                const data = await response.json();
                if (data.success) {
                    setDomains(data.data);
                }
            } catch (error) {
                console.error('Error fetching topics:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTopics();
    }, []);

    const roadmapPhases = [
        {
            phase: "Phase 1",
            title: "Foundation",
            subtitle: "Concepts & Mechanics",
            description: "Ensure zero gaps in fundamental mathematical concepts.",
            topics: ["Linear Equations", "Linear Inequalities", "Systems of Equations"]
        },
        {
            phase: "Phase 2",
            title: "Application",
            subtitle: "Standard Problems",
            description: "Apply concepts to standard SAT-style questions.",
            topics: ["Quadratic Equations", "Exponentials", "Functions"]
        },
        {
            phase: "Phase 3",
            title: "Mastery",
            subtitle: "Hard Problems & Desmos",
            description: "Tackle the hardest problems and optimize for speed.",
            topics: ["Advanced Functions", "Complex Systems", "Graphical Solutions"]
        },
        {
            phase: "Phase 4",
            title: "The 800 Push",
            subtitle: "Speed, Traps, & Optimization",
            description: "Eliminate careless errors and master the unsolvable.",
            topics: ["Time Management", "Trap Recognition", "Full Tests"]
        }
    ];

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className="container">
                        <div className={styles.heroContent}>
                            <div className={styles.badge}>📐 DSAT Math</div>
                            <h1 className="fade-in">
                                Path to <span className="gradient-text">800</span>
                            </h1>
                            <p className={styles.subtitle}>
                                Structured roadmap covering Algebra, Advanced Math, Problem-Solving, and Geometry. Master every concept from foundation to perfection.
                            </p>
                            <div className={styles.heroActions}>
                                <Button variant="primary" size="large" href="/practice">
                                    Start Practice
                                </Button>
                                <Button variant="outline" size="large" href="#roadmap">
                                    View Roadmap
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Roadmap Phases */}
                <section id="roadmap" className="section">
                    <div className="container">
                        <h2 className={styles.sectionTitle}>4-Phase Progression Plan</h2>
                        <div className={styles.phasesGrid}>
                            {roadmapPhases.map((phase, index) => (
                                <Card key={index} variant="glass" className={styles.phaseCard}>
                                    <div className={styles.phaseNumber}>{phase.phase}</div>
                                    <h3>{phase.title}</h3>
                                    <div className={styles.phaseSubtitle}>{phase.subtitle}</div>
                                    <p className={styles.phaseDescription}>{phase.description}</p>
                                    <div className={styles.phaseTopics}>
                                        {phase.topics.map((topic, idx) => (
                                            <span key={idx} className={styles.phaseTopic}>{topic}</span>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Study Topics by Domain */}
                <section className={`section ${styles.domainsSection}`}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>Study Materials by Domain</h2>
                        <p className={styles.sectionSubtitle}>Click on a domain to explore topics and articles</p>

                        {loading ? (
                            <div className={styles.loading}>Loading topics...</div>
                        ) : (
                            <div className={styles.domainsGrid}>
                                {domains.map((domain, index) => (
                                    <Card
                                        key={index}
                                        variant="elevated"
                                        hover
                                        className={styles.domainCard}
                                        onClick={() => setExpandedDomain(expandedDomain === index ? null : index)}
                                    >
                                        <div className={styles.domainHeader}>
                                            <h3>{domain.name}</h3>
                                            <span className={styles.topicCount}>
                                                {domain.topics.length} topics
                                            </span>
                                        </div>

                                        {expandedDomain === index && (
                                            <div className={styles.topicsList}>
                                                {domain.topics.map((topic, topicIdx) => (
                                                    <Link
                                                        key={topicIdx}
                                                        href={`/study/math/${domain.slug}/${topic.slug}`}
                                                        className={styles.topicItem}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <span className={styles.topicName}>{topic.name}</span>
                                                        <div className={styles.topicMeta}>
                                                            {topic.hasArticle && <span className={styles.badge}>📄 Article</span>}
                                                            {topic.hasQuestions && <span className={styles.badge}>❓ Practice</span>}
                                                        </div>
                                                        <span className={styles.arrow}>→</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {expandedDomain !== index && (
                                            <div className={styles.domainFooter}>
                                                Click to view topics →
                                            </div>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className="section">
                    <div className="container">
                        <Card variant="glass" className={styles.ctaCard}>
                            <h2>Ready to Start Your Journey?</h2>
                            <p>Begin with practice tests or dive into study materials.</p>
                            <div className={styles.ctaActions}>
                                <Button variant="primary" size="large" href="/practice">
                                    Start Practice Test
                                </Button>
                                <Button variant="secondary" size="large" href="/english">
                                    Switch to English
                                </Button>
                            </div>
                        </Card>
                    </div>
                </section>
            </main>
        </>
    );
}
