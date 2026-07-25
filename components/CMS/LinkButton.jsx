import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LinkButton({ link, className = '' }) {
  if (!link?.url || !link?.label) return null;
  const classes = className || `gap-button ${link.variant === 'light' ? 'gap-button-light' : 'gap-button-primary'}`;
  const content = (
    <>
      <span>{link.label}</span>
      {link.variant !== 'light' && <ArrowRight size={20} className="ml-2" />}
    </>
  );

  if (link.external || link.url.startsWith('http')) {
    return <a href={link.url} className={classes}>{content}</a>;
  }

  return <Link href={link.url} className={classes}>{content}</Link>;
}
