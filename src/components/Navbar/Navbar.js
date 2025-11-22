import Link from 'next/link';
import styles from './Navbar.module.css';
import Button from '../Button/Button';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>🎯</span>
                    <span className={styles.logoText}>DSAT<span className="gradient-text">Prep</span></span>
                </Link>

                <div className={styles.navLinks}>
                    <Link href="/math" className={styles.navLink}>Math</Link>
                    <Link href="/english" className={styles.navLink}>English</Link>
                    <Link href="/practice" className={styles.navLink}>Practice</Link>
                </div>

                <div className={styles.navActions}>
                    <Button variant="outline" size="small" href="/practice">
                        Start Practice
                    </Button>
                </div>
            </div>
        </nav>
    );
}
