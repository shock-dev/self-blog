import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';

interface MarkdownOutputProps {
  title?: string
  description?: string
}

const MarkdownOutput = ({
  title,
  description
}: MarkdownOutputProps) => {
  let markdownText: string;

  if (title && !description) {
    markdownText = `# ${title}`;
  }

  if (!title && description) {
    markdownText = description;
  }

  if (title && description) {
    markdownText = `# ${title}\n ${description}`;
  }

  return (
    <div className="markdown-body">
      <ReactMarkdown>
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownOutput;
