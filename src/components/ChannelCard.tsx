
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Users, TrendingUp, Video, Youtube } from 'lucide-react';

interface ChannelCardProps {
  channel: {
    id: string;
    name: string;
    subscribers: number;
    views: number;
    videos: number;
    thumbnailUrl: string;
    description: string;
    growth: number;
  };
  className?: string;
  onAnalyze?: (channelId: string) => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ 
  channel, 
  className,
  onAnalyze
}) => {
  return (
    <Card className={cn(
      "overflow-hidden card-hover border-[1.5px]",
      "transition-all duration-300",
      className
    )}>
      <div className="relative h-24 bg-accent/30 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-accent/30 to-accent/10"></div>
        </div>
      </div>
      
      <div className="relative flex justify-center">
        <div className="absolute -top-10 ring-4 ring-background">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
            {channel.thumbnailUrl ? (
              <img 
                src={channel.thumbnailUrl} 
                alt={channel.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <Youtube className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
      
      <CardHeader className="pt-12 text-center">
        <CardTitle className="text-lg font-semibold truncate max-w-[200px] mx-auto">
          {channel.name}
        </CardTitle>
        <CardDescription className="text-xs truncate max-w-[250px] mx-auto">
          {channel.description || "No description available"}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center mt-2">
          <div className="flex flex-col items-center">
            <Users className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-sm font-medium">{formatNumber(channel.subscribers)}</span>
            <span className="text-xs text-muted-foreground">Subscribers</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Video className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-sm font-medium">{channel.videos}</span>
            <span className="text-xs text-muted-foreground">Videos</span>
          </div>
          
          <div className="flex flex-col items-center">
            <TrendingUp className="h-4 w-4 text-muted-foreground mb-1" />
            <span className={cn(
              "text-sm font-medium",
              channel.growth > 0 ? "text-green-500" : "text-red-500"
            )}>
              {channel.growth > 0 ? '+' : ''}{channel.growth}%
            </span>
            <span className="text-xs text-muted-foreground">Growth</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full rounded-md border-[1.5px]"
          onClick={() => onAnalyze && onAnalyze(channel.id)}
        >
          <LineChart className="h-4 w-4 mr-2" />
          View Analytics
        </Button>
      </CardFooter>
    </Card>
  );
};

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export default ChannelCard;
