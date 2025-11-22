import Link from 'next/link';
import styles from './page.module.css';
import Navbar from '@/components/Navbar/Navbar';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.badge}>
                🎯 Target 1600 Prep Platform
              </div>
              <h1 className={`${styles.heroTitle} fade-in`}>
                Master the <span className="gradient-text">Digital SAT</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Comprehensive study roadmaps, unlimited practice tests, and structured materials to help you achieve a perfect 1600 score.
              </p>
              <div className={styles.heroCTA}>
                <Button variant="primary" size="large" href="/math">
                  📐 Start Math
                </Button>
                <Button variant="secondary" size="large" href="/english">
                  📚 Start English
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Subject Cards */}
        <section className="section">
          <div className="container">
            <h2 className={styles.sectionTitle}>Choose Your Path</h2>
            <div className={styles.subjectGrid}>
              <Link href="/math" className={styles.subjectCardLink}>
                <Card variant="glass" hover className={styles.subjectCard}>
                  <div className={styles.subjectIcon}>📐</div>
                  <h3>DSAT Math</h3>
                  <p className={styles.subjectDescription}>
                    Master Algebra, Advanced Math, Problem-Solving, and Geometry with a structured roadmap to 800.
                  </p>
                  <div className={styles.subjectTopics}>
                    <span className={styles.topic}>Algebra</span>
                    <span className={styles.topic}>Advanced Math</span>
                    <span className={styles.topic}>Geometry</span>
                    <span className={styles.topic}>Data Analysis</span>
                  </div>
                  <div className={styles.arrow}>→</div>
                </Card>
              </Link>

              <Link href="/english" className={styles.subjectCardLink}>
                <Card variant="glass" hover className={styles.subjectCard}>
                  <div className={styles.subjectIcon}>📚</div>
                  <h3>DSAT English</h3>
                  <p className={styles.subjectDescription}>
                    Master Reading Comprehension, Grammar, Vocabulary, and Rhetorical Skills with a proven roadmap to 800.
                  </p>
                  <div className={styles.subjectTopics}>
                    <span className={styles.topic}>Grammar</span>
                    <span className={styles.topic}>Vocabulary</span>
                    <span className={styles.topic}>Comprehension</span>
                    <span className={styles.topic}>Rhetoric</span>
                  </div>
                  <div className={styles.arrow}>→</div>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Practice Section */}
        <section className={`section ${styles.practiceSection}`}>
          <div className="container">
            <Card variant="glass" className={styles.practiceCard}>
              <div className={styles.practiceContent}>
                <div>
                  <h2>Ready to Practice?</h2>
                  <p className={styles.practiceDescription}>
                    Choose from timed or untimed tests. Practice Math, English, or full-length tests.
                  </p>
                </div>
                <Button variant="primary" size="large" href="/practice">
                  ⏱️ Start Practice Test
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="section">
          <div className="container">
            <h2 className={styles.sectionTitle}>Everything You Need</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🗺️</div>
                <h4>Structured Roadmaps</h4>
                <p>Follow proven path maps from current level to perfect 800 scores.</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>📝</div>
                <h4>Practice Tests</h4>
                <p>Unlimited timed and untimed practice with instant feedback.</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>📖</div>
                <h4>Study Materials</h4>
                <p>Comprehensive materials covering every topic and difficulty level.</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>⏱️</div>
                <h4>Realistic Timing</h4>
                <p>Adaptive modules with real DSAT time constraints and pacing.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
