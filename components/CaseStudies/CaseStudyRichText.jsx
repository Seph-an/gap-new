import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const components = {
  a: ({ href = '', children, node: _node, ...props }) => href.startsWith('/') || href.startsWith('#')
    ? <Link href={href} className="font-medium text-[#51D4D6] underline decoration-[#51D4D6]/50 underline-offset-4 hover:text-white" {...props}>{children}</Link>
    : <a href={href} className="font-medium text-[#51D4D6] underline decoration-[#51D4D6]/50 underline-offset-4 hover:text-white" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>,
  img: ({ alt = '', node: _node, ...props }) => <img alt={alt} className="h-auto max-w-full rounded-xl" loading="lazy" {...props} />,
  table: ({ children }) => <div className="max-w-full overflow-x-auto"><table>{children}</table></div>,
  pre: ({ children }) => <pre className="max-w-full overflow-x-auto">{children}</pre>,
};

export default function CaseStudyRichText({ children }) {
  return <div className="prose prose-invert mt-4 max-w-none break-words text-base leading-7 text-gray-300 sm:text-lg sm:leading-8"><ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{children}</ReactMarkdown></div>;
}
