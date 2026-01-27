/**
 * Generate a base64 encoded placeholder for images
 * This creates a simple gradient blur effect as a placeholder
 */
export function getImagePlaceholder(
  color: 'blue' | 'purple' | 'teal' | 'pink' = 'blue'
): string {
  const colors = {
    blue: 'rgba(59,130,246,0.3)',
    purple: 'rgba(139,92,246,0.3)',
    teal: 'rgba(20,184,166,0.3)',
    pink: 'rgba(236,72,153,0.3)',
  };

  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors[color]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(15,23,42,1);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#grad)" />
    </svg>
  `;

  // Convert SVG to base64 data URL
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Get a shimmer placeholder effect (for skeleton loading)
 */
export function getShimmerPlaceholder(
  width: number = 400,
  height: number = 300
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgba(30,41,59,1);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(51,65,85,1);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(30,41,59,1);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#shimmer)">
        <animate
          attributeName="x"
          from="-${width}"
          to="${width}"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}
