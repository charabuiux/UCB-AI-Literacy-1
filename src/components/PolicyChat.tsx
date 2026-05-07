"use client";

import { useChat } from 'ai/react';
import { Send, Bot, User } from 'lucide-react';

export default function PolicyChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-[var(--color-berkeley-blue)] text-white p-4">
        <h3 className="font-bold flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Policy Assistant
        </h3>
        <p className="text-blue-100 text-sm">Ask me about campus AI guidelines, privacy, and policies.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 mt-10">
            <p>No messages yet.</p>
            <p className="text-sm mt-2">Try asking: <br/>"Can I use ChatGPT to write code for my assignment?"</p>
          </div>
        )}
        
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                <span className="text-xs opacity-75 font-medium">{m.role === 'user' ? 'You' : 'Assistant'}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex gap-1">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 bg-white flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question..."
          className="flex-1 border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          className="bg-[var(--color-berkeley-blue)] text-white p-2.5 rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
