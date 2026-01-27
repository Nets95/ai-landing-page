import React from 'react';

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'sage-earth' | 'subtle';
  children: React.ReactNode;
}

export const GradientText = React.forwardRef<
  HTMLSpanElement,
  GradientTextProps
>(({ variant = 'primary', className = '', children, ...props }, ref) => {
  const variantStyles = {
    primary: 'gradient-text', // Maps to sage-earth gradient
    secondary: 'gradient-text-secondary',
    accent: 'gradient-text-accent',
    'sage-earth': 'gradient-text-sage-earth', // New muted gradient
    subtle: 'gradient-text-subtle', // New subtle white-to-gray gradient
  };

  const combinedClassName = `${variantStyles[variant]} ${className}`.trim();

  return (
    <span ref={ref} className={combinedClassName} {...props}>
      {children}
    </span>
  );
});

GradientText.displayName = 'GradientText';
