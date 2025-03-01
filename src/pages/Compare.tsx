
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import SearchChannel from '@/components/SearchChannel';
import ComparisonChart from '@/components/ComparisonChart';
import PerformanceMetric from '@/components/PerformanceMetric';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VideoIcon, Users, ThumbsUp, TrendingUp, Clock, BarChart, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Compare = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [channel1, setChannel1] = useState<string | null>(null);
  const [channel2, setChannel2] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  
  const handleSelectChannel1 = (channelId: string) => {
    setChannel1(channelId);
    
    toast({
      title: "First channel selected",
      description: "Now select a second channel to compare",
    });
  };
  
  const handleSelectChannel2 = (channelId: string) => {
    setChannel2(channelId);
    setIsLoading(true);
    
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
      setShowComparison(true);
      
      toast({
        title: "Comparison ready",
        description: "Analyzing the differences between channels",
      });
    }, 1500);
  };
  
  const handleReset = () => {
    setChannel1(null);
    setChannel2(null);
    setShowComparison(false);
  };

  // Dummy comparison data
  const viewsComparisonData = [
    { date: 'Jan', channel1: 45000, channel2: 32000 },
    { date: 'Feb', channel1: 52000, channel2: 38000 },
    { date: 'Mar', channel1: 49000, channel2: 45000 },
    { date: 'Apr', channel1: 63000, channel2: 52000 },
    { date: 'May', channel1: 58000, channel2: 54000 },
    { date: 'Jun', channel1: 72000, channel2: 59000 },
    { date: 'Jul', channel1: 80000, channel2: 62000 },
  ];
  
  const subscribersComparisonData = [
    { date: 'Jan', channel1: 10000, channel2: 8000 },
    { date: 'Feb', channel1: 12000, channel2: 8500 },
    { date: 'Mar', channel1: 15000, channel2: 9000 },
    { date: 'Apr', channel1: 17500, channel2: 10200 },
    { date: 'May', channel1: 19000, channel2: 11000 },
    { date: 'Jun', channel1: 21000, channel2: 12500 },
    { date: 'Jul', channel1: 24000, channel2: 13800 },
  ];
  
  const contentComparisonData = [
    { type: 'Tutorials', channel1: 78, channel2: 65 },
    { type: 'Reviews', channel1: 65, channel2: 72 },
    { type: 'Vlogs', channel1: 82, channel2: 58 },
    { type: 'Interviews', channel1: 70, channel2: 80 },
  ];
  
  const uploadFrequencyData = [
    { month: 'Jan', channel1: 8, channel2: 4 },
    { month: 'Feb', channel1: 7, channel2: 5 },
    { month: 'Mar', channel1: 9, channel2: 6 },
    { month: 'Apr', channel1: 8, channel2: 4 },
    { month: 'May', channel1: 10, channel2: 3 },
    { month: 'Jun', channel1: 6, channel2: 5 },
    { month: 'Jul', channel1: 11, channel2: 4 },
  ];
  
  const keyDifferences = [
    {
      title: 'Upload Frequency',
      channel1Value: '8.4 videos/month',
      channel2Value: '4.4 videos/month',
      difference: '+91%',
      insight: 'Channel 1 publishes nearly twice as often, helping maintain audience engagement and algorithm visibility.'
    },
    {
      title: 'Video Length',
      channel1Value: '12:45 average',
      channel2Value: '5:20 average',
      difference: '+139%',
      insight: 'Channel 1 creates longer, more in-depth content which increases watch time and improves ranking.'
    },
    {
      title: 'Engagement Rate',
      channel1Value: '7.8%',
      channel2Value: '5.2%',
      difference: '+50%',
      insight: 'Channel 1 has stronger audience interaction, showing more effective content and community building.'
    },
    {
      title: 'Thumbnail CTR',
      channel1Value: '9.3%',
      channel2Value: '6.1%',
      difference: '+52%',
      insight: 'Channel 1 has more effective thumbnails and titles, driving significantly higher click-through rates.'
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Channel Comparison</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              Compare two YouTube channels to identify key differences and learn what makes one more successful than the other.
            </p>
          </div>
          
          {/* Channel Selection */}
          {!showComparison && (
            <div className="max-w-3xl mx-auto mb-10 space-y-8 animate-fade-up">
              <Card className="border-[1.5px]">
                <CardHeader>
                  <CardTitle className="text-lg">Select First Channel</CardTitle>
                </CardHeader>
                <CardContent>
                  <SearchChannel 
                    onChannelSelect={handleSelectChannel1}
                    placeholder="Enter first YouTube channel URL or ID"
                  />
                </CardContent>
              </Card>
              
              {channel1 && (
                <Card className="border-[1.5px]">
                  <CardHeader>
                    <CardTitle className="text-lg">Select Second Channel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SearchChannel 
                      onChannelSelect={handleSelectChannel2}
                      placeholder="Enter second YouTube channel URL or ID"
                    />
                  </CardContent>
                </Card>
              )}
              
              {isLoading && (
                <div className="flex justify-center items-center min-h-[100px]">
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-4 text-muted-foreground">Analyzing channels...</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Comparison Results */}
          {showComparison && (
            <div className="animate-fade-in">
              {/* Header with Channel Info */}
              <div className="flex flex-col md:flex-row gap-6 mb-10">
                <Card className="flex-1 border-[1.5px] glass-panel">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&h=200" 
                          alt="Channel 1"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">Tech Insights</h2>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          <span>1.25M Subscribers</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-bold">VS</span>
                  </div>
                </div>
                
                <Card className="flex-1 border-[1.5px] glass-panel">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&h=200" 
                          alt="Channel 2"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">Tech Reviews</h2>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          <span>720K Subscribers</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Key Metrics Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                <div className="relative">
                  <PerformanceMetric
                    title="Total Views (Monthly)"
                    value="3.2M"
                    prefix="~"
                    variant="outline"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-medium">
                    1
                  </div>
                </div>
                
                <div className="relative">
                  <PerformanceMetric
                    title="Total Views (Monthly)"
                    value="1.9M"
                    prefix="~"
                    variant="outline"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-guru-red rounded-full flex items-center justify-center text-xs text-white font-medium">
                    2
                  </div>
                </div>
                
                <div className="relative">
                  <PerformanceMetric
                    title="Engagement Rate"
                    value="7.8%"
                    variant="outline"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-medium">
                    1
                  </div>
                </div>
                
                <div className="relative">
                  <PerformanceMetric
                    title="Engagement Rate"
                    value="5.2%"
                    variant="outline"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-guru-red rounded-full flex items-center justify-center text-xs text-white font-medium">
                    2
                  </div>
                </div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <ComparisonChart
                  title="Views Trend"
                  data={viewsComparisonData}
                  type="line"
                  keys={{
                    category: 'date',
                    channel1: 'channel1',
                    channel2: 'channel2',
                  }}
                  channel1Name="Tech Insights"
                  channel2Name="Tech Reviews"
                />
                
                <ComparisonChart
                  title="Subscriber Growth"
                  data={subscribersComparisonData}
                  type="line"
                  keys={{
                    category: 'date',
                    channel1: 'channel1',
                    channel2: 'channel2',
                  }}
                  channel1Name="Tech Insights"
                  channel2Name="Tech Reviews"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <ComparisonChart
                  title="Content Engagement by Type"
                  data={contentComparisonData}
                  type="bar"
                  keys={{
                    category: 'type',
                    channel1: 'channel1',
                    channel2: 'channel2',
                  }}
                  channel1Name="Tech Insights"
                  channel2Name="Tech Reviews"
                />
                
                <ComparisonChart
                  title="Upload Frequency"
                  data={uploadFrequencyData}
                  type="bar"
                  keys={{
                    category: 'month',
                    channel1: 'channel1',
                    channel2: 'channel2',
                  }}
                  channel1Name="Tech Insights"
                  channel2Name="Tech Reviews"
                />
              </div>
              
              {/* Key Differences */}
              <Card className="border-[1.5px] mb-10">
                <CardHeader>
                  <CardTitle>Key Differences & Success Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {keyDifferences.map((item, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                        <div>
                          <h3 className="font-medium text-sm">{item.title}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold">1</span>
                          </div>
                          <span className="text-sm">{item.channel1Value}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-guru-red flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-white">2</span>
                          </div>
                          <span className="text-sm">{item.channel2Value}</span>
                        </div>
                        <div>
                          <div className="mb-1">
                            <span className="text-sm font-medium text-green-500">{item.difference}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.insight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" onClick={handleReset}>
                  Compare Different Channels
                </Button>
                <Button>
                  View Detailed Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Compare;
