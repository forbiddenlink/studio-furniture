"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { Product } from "@/types";
import { toast } from "sonner";

interface AISearchProps {
  onResults: (results: Product[]) => void;
}

export function AISearch({ onResults }: AISearchProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const smartSearchSuggestions = [
    "modern chair under $1000",
    "walnut dining table for 6 people",
    "minimalist storage for small apartment",
    "ambient lighting for bedroom",
    "cozy seating for reading",
  ];

  const performAISearch = async (searchQuery: string) => {
    setIsSearching(true);

    try {
      const response = await fetch('/api/ai/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      onResults(data.results);
    } catch (error) {
      console.error(error);
      toast.error("Failed to perform AI search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      performAISearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    performAISearch(suggestion);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Try: 'modern chair under $1000' or 'walnut dining table'"
            className="pl-10"
            data-testid="ai-search-input"
          />
        </div>
        <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
          {isSearching ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Searching
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              AI Search
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Try:</span>
        {smartSearchSuggestions.map((suggestion) => (
          <Badge
            key={suggestion}
            variant="secondary"
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </Badge>
        ))}
      </div>
    </div>
  );
}
