
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Youtube } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SearchChannelProps {
  onChannelSelect?: (channelId: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchChannel: React.FC<SearchChannelProps> = ({ 
  onChannelSelect, 
  placeholder = "Enter YouTube channel URL or ID", 
  className = "" 
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a YouTube channel URL or ID",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Extract channel ID if it's a URL
    let channelId = query.trim();
    
    // Simple validation for demonstration
    if (channelId.includes('youtube.com/')) {
      // Extract ID from URL (this is simplified)
      const match = channelId.match(/(?:channel\/|c\/|@)([^\/\?]+)/);
      channelId = match ? match[1] : channelId;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // For demonstration, we'll just pass the ID
      if (onChannelSelect) {
        onChannelSelect(channelId);
      }
      
      toast({
        title: "Channel found",
        description: "Channel analysis is ready to view",
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex w-full max-w-lg items-center space-x-2 ${className}`}>
      <div className="relative flex-1">
        <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-6 border-[1.5px] rounded-lg focus-visible:ring-accent"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="px-6 py-6 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-all"
      >
        {isLoading ? 
          "Searching..." : 
          <span className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            Analyze
          </span>
        }
      </Button>
    </form>
  );
};

export default SearchChannel;
