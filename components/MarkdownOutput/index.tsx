import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';

interface MarkdownOutputProps {
  text: string
}

const MarkdownOutput = ({
  text
}: MarkdownOutputProps) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown>
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownOutput;
