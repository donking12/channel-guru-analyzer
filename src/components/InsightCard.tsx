
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  title: string;
  description: string;
  type: 'content' | 'audience' | 'growth' | 'engagement';
  impact: 'high' | 'medium' | 'low';
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  type,
  impact,
  actionLabel = "Learn More",
  onAction,
  className
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'content':
        return <Star className="h-4 w-4" />;
      case 'audience':
        return <Users className="h-4 w-4" />;
      case 'growth':
        return <TrendingUp className="h-4 w-4" />;
      case 'engagement':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };
  
  const getTypeLabel = () => {
    switch (type) {
      case 'content':
        return 'Content Strategy';
      case 'audience':
        return 'Audience Insight';
      case 'growth':
        return 'Growth Opportunity';
      case 'engagement':
        return 'Engagement Booster';
      default:
        return 'Insight';
    }
  };
  
  const getImpactColor = () => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    }
  };

  return (
    <Card className={cn(
      "border-[1.5px] hover:shadow-md transition-all duration-300 animate-fade-up", 
      className
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex space-x-2">
            <Badge variant="outline" className="flex items-center space-x-1 px-2 py-1">
              {getTypeIcon()}
              <span className="text-xs">{getTypeLabel()}</span>
            </Badge>
            <Badge className={cn("px-2 py-1", getImpactColor())}>
              {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
            </Badge>
          </div>
          <Lightbulb className="h-5 w-5 text-guru-accent" />
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-balance">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full justify-between text-accent-foreground hover:bg-accent/20 rounded-md"
          onClick={onAction}
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Export missing icons
export const Users = TrendingUp;
export const MessageSquare = TrendingUp;

export default InsightCard;
