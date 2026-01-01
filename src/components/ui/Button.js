import styles from './Button.module.css';
import Link from 'next/link';

export default function Button({ 
  children, 
  variant = 'primary', 
  href, 
  className = '', 
  ...props 
}) {
  const combinedClassName = `${styles.button} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
