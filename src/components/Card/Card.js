import styles from './Card.module.css';

export default function Card({
    children,
    variant = 'default',
    className = '',
    hover = false,
    ...props
}) {
    const cardClass = `${styles.card} ${styles[variant]} ${hover ? styles.hover : ''} ${className}`;

    return (
        <div className={cardClass} {...props}>
            {children}
        </div>
    );
}
