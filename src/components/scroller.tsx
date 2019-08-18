import React, { useEffect, useState } from 'react';
import { css, cx } from 'linaria';

export const scrollerClass = css`
  padding-top: 70px;
  position: absolute;
  bottom: 64px;
  left: 50%;
  transform: translateX(-50%);

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 24px;
    height: 24px;
    margin-left: -12px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(-45deg);
    animation: sdb05 1.5s infinite;
  }

  @keyframes sdb05 {
    0% {
      transform: rotate(-45deg) translate(0, 0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: rotate(-45deg) translate(-20px, 20px);
      opacity: 0;
    }
  }
`;

export const Scroller = ({ children }) => {
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    const height = window.innerHeight / 2;
    const handler = () => {
      window.requestAnimationFrame(() =>
        setOpacity(Math.max((height - window.scrollY) / height, 0)),
      );
    };

    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className={scrollerClass} style={{ opacity }}>
      {children}
    </div>
  );
};
