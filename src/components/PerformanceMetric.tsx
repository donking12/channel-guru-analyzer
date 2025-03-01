
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, AreaChart, BarChart } from 'lucide-react';
import { cva } from 'class-variance-authority';

const metricVariants = cva(
  "transition-all duration-300 rounded-xl p-5",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-guru-darkGray border border-border",
        glass: "glass-effect",
        filled: "bg-accent/10 border border-accent/20",
        outline: "border-2 border-border bg-background",
      },
      size: {
        sm: "p-3",
        default: "p-5",
        lg: "p-6",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface PerformanceMetricProps {
  title: string;
  value: string | number;
  change?: number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
  variant?: "default" | "glass" | "filled" | "outline";
  size?: "sm" | "default" | "lg";
}

const PerformanceMetric: React.FC<PerformanceMetricProps> = ({
  title,
  value,
  change,
  prefix,
  suffix,
  icon,
  description,
  className,
  variant = "default",
  size = "default",
}) => {
  // Determine the icon to use based on the change value
  const renderTrendIcon = () => {
    if (change === undefined) return null;
    
    if (change > 0) {
      return <AreaChart className="h-4 w-4 text-green-500" />;
    } else if (change < 0) {
      return <AreaChart className="h-4 w-4 text-red-500" />;
    } else {
      return <LineChart className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className={cn(metricVariants({ variant, size }), className, "animate-fade-up")}>
      <CardContent className="p-0">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {icon || renderTrendIcon()}
        </div>
        
        <div className="flex items-baseline">
          {prefix && <span className="text-sm text-muted-foreground mr-1">{prefix}</span>}
          <span className="text-2xl font-semibold">{value}</span>
          {suffix && <span className="text-sm text-muted-foreground ml-1">{suffix}</span>}
        </div>
        
        {change !== undefined && (
          <div className={cn(
            "text-xs font-medium mt-1 flex items-center",
            change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-muted-foreground"
          )}>
            {change > 0 ? "↑" : change < 0 ? "↓" : "→"}
            {" "}
            {Math.abs(change)}%
            {change !== 0 && <span className="ml-1">{change > 0 ? "increase" : "decrease"}</span>}
          </div>
        )}
        
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceMetric;
