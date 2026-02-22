import React, { useState } from 'react';

interface MarkdownTextProps {
  text: string;
  className?: string;
  maxLength?: number;
}

/**
 * A simple component that renders text with support for:
 * 1. Multi-line content (via whitespace-pre-wrap)
 * 2. Bold text (via **bold**)
 * 3. Collapsible "View More" for long text
 */
export default function MarkdownText({ text, className = '', maxLength = 200 }: MarkdownTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const shouldCollapse = text.length > maxLength;
  const displayedText = isExpanded || !shouldCollapse ? text : text.slice(0, maxLength) + '...';

  // Split by bold markers (**text**) and keep the markers for identification
  const parts = displayedText.split(/(\*\*.*?\*\*)/g);

  return (
    <div className={className}>
      <div className="whitespace-pre-wrap break-words">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} className="font-bold text-gray-900">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </div>
      
      {shouldCollapse && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
        >
          {isExpanded ? 'Show Less' : 'View More'}
        </button>
      )}
    </div>
  );
}
