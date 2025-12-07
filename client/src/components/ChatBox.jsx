import React, { useState } from "react";
import { useSession } from "../context/SessionContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FiCopy, FiCheck } from "react-icons/fi";

const ChatBox = () => {
  const { currentSession } = useSession();
  const chats = currentSession?.chats || [];
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const CopyFooter = ({ id, text }) => {
    const isCopied = copiedId === id;
    return (
      <button
        onClick={() => handleCopy(text, id)}
        className="flex items-center gap-2 text-[13px] px-3 py-1.5 bg-[#26272B] border border-[#3C3D42] rounded-md text-gray-300 hover:bg-[#303236] cursor-pointer mt-4"
      >
        {isCopied ? <FiCheck /> : <FiCopy />}
        {isCopied ? "Copied" : "Copy"}
      </button>
    );
  };

  const MarkdownRenderer = ({ content, idx }) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-gray-100 mt-5 mb-3 leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-gray-100 mt-4 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-gray-200 mt-3 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-[15px] text-gray-300 leading-[1.7] mt-2">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-100">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-200">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-6 mt-3 space-y-1 text-[15px] text-gray-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 mt-3 space-y-1 text-[15px] text-gray-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-[1.6]">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-500 pl-4 my-4 italic text-gray-400 leading-relaxed">
              {children}
            </blockquote>
          ),
          code: ({ inline, children }) => {
            if (inline) {
              return (
                <code className="bg-[#26272B] text-gray-200 px-1.5 py-0.5 rounded text-[14px]">
                  {children}
                </code>
              );
            }
            return children;
          },
          pre: ({ children }) => {
            const id = `codeblock-${idx}`;
            const isCopied = copiedId === id;
            const codeText = children.props.children;

            return (
              <div className="relative mt-5 rounded-xl overflow-hidden border border-[#3A3B40] bg-[#0D0F13]">
                <button
                  onClick={() => handleCopy(codeText, id)}
                  className="absolute top-2 right-3 flex items-center gap-1 bg-[#2B2C31] px-2 py-1 rounded-md text-[11px] border border-[#3C3D42] text-gray-300 cursor-pointer"
                >
                  {isCopied ? <FiCheck /> : <FiCopy />}
                  {isCopied ? "Copied" : "Copy"}
                </button>

                <SyntaxHighlighter
                  style={atomOneDark}
                  customStyle={{
                    padding: "18px",
                    margin: 0,
                    fontSize: "0.92rem",
                    background: "#0D0F13"
                  }}
                >
                  {codeText}
                </SyntaxHighlighter>
              </div>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <section className="overflow-y-auto px-12 py-10 space-y-14 bg-[#101114] custom-scroll">
      {chats.map((chat, index) => {
        const promptId = `prompt-${index}`;
        const responseId = `response-${index}`;

        return (
          <div key={index} className="space-y-12">

            <div className="flex justify-end">
              <div className="max-w-[72%] bg-[#1A1B1F] text-gray-100 px-6 py-4 rounded-2xl shadow-lg border border-[#292A2F]">
                <div className="text-[15px] leading-[1.7] whitespace-pre-wrap">
                  {chat.prompt}
                </div>

                <CopyFooter id={promptId} text={chat.prompt || ""} />
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-[78%] bg-[#17181C] text-white px-7 py-6 rounded-2xl shadow-lg border border-[#2A2B30]">
                <MarkdownRenderer content={chat.response} idx={index} />

                <CopyFooter id={responseId} text={chat.response || ""} />
              </div>
            </div>

          </div>
        );
      })}
    </section>
  );
};

export default ChatBox;
