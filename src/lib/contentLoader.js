import fs from 'fs';
import path from 'path';

const CONTENT_ROOT = path.join(process.cwd(), 'DSAT_Math');
const ENGLISH_ROOT = path.join(process.cwd(), 'DSAT_English');

/**
 * Get all topics for a subject organized by domain
 */
export function getAllTopics(subject = 'math') {
  const root = subject === 'math' ? CONTENT_ROOT : ENGLISH_ROOT;
  const domains = [];

  try {
    const domainDirs = fs.readdirSync(root).filter(item => {
      const itemPath = path.join(root, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const domainDir of domainDirs) {
      const domainPath = path.join(root, domainDir);
      const topicDirs = fs.readdirSync(domainPath).filter(item => {
        const itemPath = path.join(domainPath, item);
        return fs.statSync(itemPath).isDirectory();
      });

      const topics = topicDirs.map(topicDir => {
        const topicPath = path.join(domainPath, topicDir);
        const hasArticle = fs.existsSync(path.join(topicPath, 'article.md'));
        const hasQuestions = fs.existsSync(path.join(topicPath, 'qa.json'));

        return {
          name: topicDir.replace(/_/g, ' '),
          slug: topicDir,
          hasArticle,
          hasQuestions
        };
      });

      domains.push({
        name: domainDir.replace(/_/g, ' '),
        slug: domainDir,
        topics
      });
    }

    return domains;
  } catch (error) {
    console.error('Error loading topics:', error);
    return [];
  }
}

/**
 * Get article content for a specific topic
 */
export function getArticle(subject, domain, topic) {
  const root = subject === 'math' ? CONTENT_ROOT : ENGLISH_ROOT;
  const articlePath = path.join(root, domain, topic, 'article.md');

  try {
    if (fs.existsSync(articlePath)) {
      const content = fs.readFileSync(articlePath, 'utf8');
      return {
        content,
        domain: domain.replace(/_/g, ' '),
        topic: topic.replace(/_/g, ' ')
      };
    }
    return null;
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
}

/**
 * Get all questions, optionally filtered
 */
export function getQuestions(subject, filters = {}) {
  const root = subject === 'math' ? CONTENT_ROOT : ENGLISH_ROOT;
  let allQuestions = [];

  try {
    const domainDirs = fs.readdirSync(root).filter(item => {
      const itemPath = path.join(root, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const domainDir of domainDirs) {
      // Skip if domain filter is specified and doesn't match
      if (filters.domain && domainDir !== filters.domain) continue;

      const domainPath = path.join(root, domainDir);
      const topicDirs = fs.readdirSync(domainPath).filter(item => {
        const itemPath = path.join(domainPath, item);
        return fs.statSync(itemPath).isDirectory();
      });

      for (const topicDir of topicDirs) {
        // Skip if topic filter is specified and doesn't match
        if (filters.topic && topicDir !== filters.topic) continue;

        const qaPath = path.join(domainPath, topicDir, 'qa.json');
        
        if (fs.existsSync(qaPath)) {
          const qaContent = fs.readFileSync(qaPath, 'utf8');
          const questions = JSON.parse(qaContent);
          
          // Add metadata to each question
          const questionsWithMeta = questions.map(q => ({
            ...q,
            domain: domainDir,
            topic: topicDir,
            subject
          }));

          allQuestions = allQuestions.concat(questionsWithMeta);
        }
      }
    }

    // Apply difficulty filter
    if (filters.difficulty) {
      allQuestions = allQuestions.filter(q => 
        q.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
      );
    }

    // Limit number of questions if specified
    if (filters.limit && filters.limit > 0) {
      // Shuffle for randomness
      allQuestions = shuffleArray(allQuestions).slice(0, filters.limit);
    }

    return allQuestions;
  } catch (error) {
    console.error('Error loading questions:', error);
    return [];
  }
}

/**
 * Shuffle an array (Fisher-Yates algorithm)
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get questions for a specific test configuration
 */
export function getTestQuestions(type = 'math', mode = 'timed') {
  const config = {
    math: { subject: 'math', limit: 22 },
    english: { subject: 'english', limit: 27 },
    full: null // Will combine both
  };

  if (type === 'full') {
    const mathQuestions = getQuestions('math', { limit: 22 });
    const englishQuestions = getQuestions('english', { limit: 27 });
    return [...mathQuestions, ...englishQuestions];
  }

  const testConfig = config[type];
  return getQuestions(testConfig.subject, { limit: testConfig.limit });
}
