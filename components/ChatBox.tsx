'use client';

import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to Trade Buddy! I\'m your AI-powered stock analysis assistant. Ask me questions like "Should I invest in AAPL?" or "Analyze Tesla stock" and I\'ll provide intelligent analysis and recommendations.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        setError(data.error || 'Failed to analyze stock');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-[#111827]/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-[#1F2937]/50 border-b border-gray-700/50">
        <h1 className="text-xl font-semibold text-[#E5E7EB]">Trade Buddy</h1>
        <p className="text-sm text-[#9CA3AF]">AI-Powered Stock Analysis</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`animate-fade-in ${index === messages.length - 1 ? 'animate-delay-0' : ''}`}
          >
            <MessageBubble message={message} />
          </div>
        ))}
        {isLoading && (
          <div className="animate-fade-in">
            <TypingIndicator />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Toast */}
      {error && (
        <div className="mx-6 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-6 bg-[#1F2937]/30 border-t border-gray-700/50">
        <div className="flex space-x-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoading ? "Analyzing..." : "Enter stock symbol (e.g., AAPL)"}
            className="flex-1 px-4 py-3 bg-[#374151] border border-gray-600 rounded-full text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-[#2563EB] text-white rounded-full hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-[#111827] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}