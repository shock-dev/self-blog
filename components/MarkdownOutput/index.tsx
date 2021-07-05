import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';

interface MarkdownOutputProps {
  title: string
  description: string
}

const MarkdownOutput = ({
  title,
  description
}: MarkdownOutputProps) => {
  const markdownText = `# ${title}\n ${description}`;

  return (
    <div className="markdown-body">
      <ReactMarkdown>
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownOutput;
