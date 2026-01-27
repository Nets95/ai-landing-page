import React from 'react';

export interface GlowEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'normal' | 'large';
  children: React.ReactNode;
}

export const GlowEffect = React.forwardRef<HTMLDivElement, GlowEffectProps>(
  (
    {
      variant = 'primary',
      size = 'normal',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const glowStyles = {
      primary: size === 'large' ? 'glow-primary-lg' : 'glow-primary',
      secondary: 'glow-secondary',
      accent: size === 'large' ? 'glow-accent-lg' : 'glow-accent',
    };

    const combinedClassName = `${glowStyles[variant]} ${className}`.trim();

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

GlowEffect.displayName = 'GlowEffect';
