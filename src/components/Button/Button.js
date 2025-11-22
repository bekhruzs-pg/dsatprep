import styles from './Button.module.css';

export default function Button({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    href,
    className = '',
    ...props
}) {
    const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

    if (href) {
        return (
            <a href={href} className={buttonClass} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={buttonClass} {...props}>
            {children}
        </button>
    );
}
