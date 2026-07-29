// Shared primitives — panels, buttons, type helpers, the mono-numeral discipline.

import React from 'react';
import { useRoute } from './router.jsx';

// Every numeral in the mono face — including inside prose.
const NUM_RE = /((?:[£$€])?\d(?:[\d,.:]*\d)?(?:\s?(?:kg|km|am|pm))?(?:\s?[–—-]\s?(?:[£$€])?\d(?:[\d,.:]*\d)?(?:\s?(?:kg|km|am|pm))?)?%?)/g;

export function monoNums(text) {
  if (typeof text !== 'string') return text;
  const parts = text.split(NUM_RE);
  if (parts.length === 1) return text;
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <span key={i} className="mono-num">{p}</span>
    ) : (
      <React.Fragment key={i}>{p}</React.Fragment>
    )
  );
}

export function P({ as: As = 'p', ink = false, className = '', children, ...rest }) {
  return (
    <As className={`t-body ${ink ? 'text-ink' : 'text-mid'} ${className}`} {...rest}>
      {typeof children === 'string' ? monoNums(children) : children}
    </As>
  );
}

export function Kicker({ children, className = '' }) {
  return <p className={`t-kicker text-(--accent-text) ${className}`}>{children}</p>;
}

export function Section({ children, className = '' }) {
  return <h2 className={`t-section ${className}`}>{children}</h2>;
}

export function Panel({ as: As = 'div', lg = false, deep = false, interactive = false, className = '', ...rest }) {
  return (
    <As
      className={`panel ${lg ? 'panel-lg' : ''} ${deep ? 'panel-deep' : ''} ${interactive ? 'panel-i' : ''} ${className}`}
      {...rest}
    />
  );
}

export function Btn({ variant = 'quiet', className = '', as, href, ...rest }) {
  const cls = `btn btn-${variant} ${className}`;
  if (as === 'a' || href) return <a className={cls} href={href} {...rest} />;
  return <button type="button" className={cls} {...rest} />;
}

// Navigation button — a real link styled as a button.
export function NavBtn({ to, world, variant = 'quiet', className = '', children, ...rest }) {
  const { href } = useRoute();
  return (
    <a className={`btn btn-${variant} ${className}`} href={href(to, world)} {...rest}>
      {children}
    </a>
  );
}

export function Chip({ children, className = '' }) {
  return (
    <span
      className={`t-meta inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-mid ${className}`}
    >
      {children}
    </span>
  );
}

// Stagger index helper: <Rise i={2}>…</Rise>
export function Rise({ i = 0, as: As = 'div', className = '', ...rest }) {
  return <As className={`rise ${className}`} style={{ '--i': i }} {...rest} />;
}

export function Divider({ className = '' }) {
  return <hr className={`border-0 border-t border-white/[0.08] ${className}`} aria-hidden="true" />;
}
