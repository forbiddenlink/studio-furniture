"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { AI } from "@/lib/constants";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/ai/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: AI.CHAT.INITIAL_MESSAGE,
      },
    ],
    onError: () => {
      toast.error(AI.CHAT.ERROR_MESSAGE);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSubmit(e);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // create a synthetic event
      const syntheticEvent = {
        preventDefault: () => { },
      } as React.FormEvent;
      if (input.trim()) handleSubmit(syntheticEvent);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 gap-2"
        aria-label={isOpen ? "Close AI Shopping Assistant" : "Open AI Shopping Assistant"}
        aria-expanded={isOpen}
        aria-controls="ai-assistant-chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
            <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-yellow-400" aria-hidden="true" />
          </>
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card 
          id="ai-assistant-chat"
          className="fixed bottom-24 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col"
          role="dialog"
          aria-label="AI Shopping Assistant Chat"
        >
          {/* Header */}
          <div className="p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">AI Shopping Assistant</h3>
                <p className="text-xs opacity-90">Powered by AI • Always here to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                    }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'Just now'}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <form onSubmit={onFormSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything about our furniture..."
                className="flex-1"
                disabled={isLoading}
                aria-label="Type your message to the AI assistant"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2" role="note">
              💡 Try: &quot;I need a chair for my reading nook&quot; or &quot;Show me modern tables&quot;
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
