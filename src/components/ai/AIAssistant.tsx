"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AI } from "@/lib/constants";
import { sanitizeInput } from "@/lib/validation";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: Date;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: AI.CHAT.INITIAL_MESSAGE,
      createdAt: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the input is rendered
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Sanitize and validate input
    const sanitizedInput = sanitizeInput(input);

    if (sanitizedInput.length > AI.CHAT.MAX_MESSAGE_LENGTH) {
      toast.error(`Message is too long. Maximum ${AI.CHAT.MAX_MESSAGE_LENGTH} characters allowed.`);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: sanitizedInput,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })).concat({ role: "user", content: userMessage.content }),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      let assistantMessage = "";
      const assistantId = Date.now().toString();
      let messageAdded = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("0:")) {
            const text = line.slice(2);
            assistantMessage += text;

            if (!messageAdded) {
              setMessages((prev) => [
                ...prev,
                {
                  id: assistantId,
                  role: "assistant",
                  content: assistantMessage,
                  createdAt: new Date(),
                },
              ]);
              messageAdded = true;
            } else {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: assistantMessage }
                    : m
                )
              );
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error(AI.CHAT.ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const syntheticEvent = {
        preventDefault: () => {},
      } as React.FormEvent;
      handleSubmit(syntheticEvent);
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
                      ? message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about our furniture..."
                className="flex-1"
                disabled={isLoading}
                aria-label="Type your message to the AI assistant"
                aria-describedby="ai-chat-hint"
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
            <p id="ai-chat-hint" className="text-xs text-muted-foreground mt-2" role="note">
              Try: &quot;I need a chair for my reading nook&quot; or &quot;Show me modern tables&quot;
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
