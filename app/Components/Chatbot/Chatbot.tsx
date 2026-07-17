"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, User, RefreshCw } from "lucide-react";
import "./Chatbot.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What is Saksham's AI expertise?",
  "Tell me about the Halcyon Credit project",
  "Has Saksham published any research papers?",
  "What is his experience with LangGraph?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I am Saksham's AI assistant. Ask me anything about his projects, skills, or professional background!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Visual notify for unread messages if chat is closed
  useEffect(() => {
    if (messages.length > 1 && !isOpen) {
      setHasNewMessage(true);
    }
  }, [messages.length, isOpen]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn't process that response. Please try again.",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! I ran into an error connecting to the server. Please check your connection and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: "Reset complete! What else would you like to know about Saksham?",
      },
    ]);
  };

  return (
    <div className="portfolio-chatbot-container">
      {/* Floating Trigger Button */}
      <button
        onClick={handleOpenToggle}
        className={`chatbot-trigger-btn ${isOpen ? "active" : ""} ${hasNewMessage ? "shake-alert" : ""
          }`}
        aria-label="Toggle chat assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {hasNewMessage && <span className="chatbot-unread-dot" />}
      </button>

      {/* Chat Window Panel */}
      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar-active">
              <Bot className="w-5 h-5 text-emerald-400" />
              <span className="chatbot-online-status" />
            </div>
            <div>
              <p className="chatbot-title">Saksham's AI Agent</p>
              <p className="chatbot-status-text">Powered by Llama 3</p>
            </div>
          </div>
          <div className="chatbot-header-actions">
            <button
              onClick={handleReset}
              className="chatbot-control-btn"
              title="Reset Chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleOpenToggle}
              className="chatbot-control-btn close"
              title="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Panel */}
        <div className="chatbot-body">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chatbot-message-row ${msg.role === "user" ? "user-row" : "assistant-row"
                }`}
            >
              <div className="chatbot-message-avatar">
                {msg.role === "user" ? (
                  <User className="w-3.5 h-3.5" />
                ) : (
                  <Bot className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="chatbot-message-bubble">
                <p className="chatbot-message-text">{msg.content}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="chatbot-message-row assistant-row">
              <div className="chatbot-message-avatar">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="chatbot-message-bubble typing">
                <div className="chatbot-typing-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts (only shown if message history is short and not loading) */}
        {messages.length <= 2 && !isLoading && (
          <div className="chatbot-suggestions">
            <div className="chatbot-suggestions-label">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Suggested Questions</span>
            </div>
            <div className="chatbot-suggestions-list">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="chatbot-suggestion-item"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Input Form */}
        <form onSubmit={handleFormSubmit} className="chatbot-footer">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about Saksham's work..."
            className="chatbot-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="chatbot-send-btn"
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
