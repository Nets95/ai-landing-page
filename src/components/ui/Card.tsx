import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glassVariant?: 'light' | 'medium' | 'heavy';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      hover = false,
      glassVariant = 'medium',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const glassStyles = {
      light: 'glass-light',
      medium: 'glass-medium',
      heavy: 'glass-heavy',
    };

    const hoverStyle = hover ? 'card-hover' : 'card';

    const combinedClassName =
      `${hoverStyle} ${glassStyles[glassVariant]} ${className}`.trim();

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
