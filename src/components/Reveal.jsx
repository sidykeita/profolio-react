import React, { useEffect, useRef } from 'react';

/**
 * Reveal component
 * Props:
 * - as: element/tag to render (default 'div')
 * - className: extra classes
 * - delay: ms delay before animating once intersected
 * - offset: rootMargin like '0px 0px -10% 0px' (default '0px 0px -10% 0px')
 * - threshold: IntersectionObserver threshold (default 0.15)
 * - once: whether to reveal only once (default false)
 */
const Reveal = ({
  as: Tag = 'div',
  className = '',
  children,
  delay = 0,
  offset = '0px 0px -10% 0px',
  threshold = 0.15,
  once = false,
  ...rest
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId;

    const onIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timeoutId = window.setTimeout(() => {
            el.classList.add('is-visible');
          }, delay);
          if (once) observer.unobserve(entry.target);
        } else {
          // When not intersecting, reset if not once
          if (!once) {
            el.classList.remove('is-visible');
          }
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: offset,
      threshold,
    });

    // ensure base class
    el.classList.add('reveal');

    observer.observe(el);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [delay, offset, threshold, once]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
