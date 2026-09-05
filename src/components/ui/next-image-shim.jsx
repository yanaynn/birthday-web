import React from 'react';

export default function Image({ src, alt, fill, className, priority, sizes, ...props }) {
  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      style={
        fill
          ? {
              position: 'absolute',
              height: '100%',
              width: '100%',
              inset: 0,
              objectFit: 'cover',
            }
          : undefined
      }
      {...props}
    />
  );
}
