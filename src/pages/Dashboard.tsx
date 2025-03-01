import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import PerformanceMetric from '@/components/PerformanceMetric';
import ComparisonChart from '@/components/ComparisonChart';
import InsightCard from '@/components/InsightCard';
import SearchChannel from '@/components/SearchChannel';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, VideoIcon, Users, ThumbsUp, Clock, BarChart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [channelId, setChannelId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const channelParam = params.get('channel');
    
    if (channelParam) {
      setChannelId(channelParam);
      loadChannelData(channelParam);
    }
  }, [location]);
  
  const loadChannelData = (id: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Channel data loaded",
        description: `Analysis complete for channel ID: ${id.substring(0, 15)}...`,
      });
    }, 1500);
  };
  
  const handleChannelSelect = (id: string) => {
    setChannelId(id);
    
    const url = new URL(window.location.href);
    url.searchParams.set('channel', id);
    window.history.pushState({}, '', url);
    
    loadChannelData(id);
  };

  const viewsData = [
    { date: 'Jan', views: 45000 },
    { date: 'Feb', views: 52000 },
    { date: 'Mar', views: 49000 },
    { date: 'Apr', views: 63000 },
    { date: 'May', views: 58000 },
    { date: 'Jun', views: 72000 },
    { date: 'Jul', views: 80000 },
  ];
  
  const subscribersData = [
    { date: 'Jan', subscribers: 10000 },
    { date: 'Feb', subscribers: 12000 },
    { date: 'Mar', subscribers: 15000 },
    { date: 'Apr', subscribers: 17500 },
    { date: 'May', subscribers: 19000 },
    { date: 'Jun', subscribers: 21000 },
    { date: 'Jul', subscribers: 24000 },
  ];
  
  const contentTypeData = [
    { type: 'Tutorials', videos: 45, engagement: 78 },
    { type: 'Reviews', videos: 30, engagement: 65 },
    { type: 'Vlogs', videos: 15, engagement: 82 },
    { type: 'Interviews', videos: 10, engagement: 70 },
  ];
  
  const bestPerformingVideos = [
    { title: 'Ultimate Guide to YouTube Success', views: 1250000, engagement: 9.2 },
    { title: 'How I Got 1M Subscribers', views: 980000, engagement: 8.7 },
    { title: 'Top 10 Channel Growth Strategies', views: 850000, engagement: 8.5 },
    { title: 'Behind the Scenes: Content Creation', views: 720000, engagement: 7.9 },
  ];
  
  const insights = [
    {
      title: 'Optimize Video Length',
      description: 'Your 10-15 minute videos perform 43% better than shorter or longer content. Consider focusing on this duration for future uploads.',
      type: 'content' as const,
      impact: 'high' as const,
    },
    {
      title: 'Increase Upload Frequency',
      description: 'Channels in your niche that upload twice weekly see 28% higher subscriber growth. Consider adjusting your content calendar.',
      type: 'growth' as const,
      impact: 'medium' as const,
    },
    {
      title: 'Engage More in Comments',
      description: 'Videos where you respond to comments in the first 24 hours show 35% higher retention rates and more return viewers.',
      type: 'engagement' as const,
      impact: 'high' as const,
    },
    {
      title: 'Audience Shift Detected',
      description: 'Your audience demographics are shifting toward 25-34 age range. Consider adjusting content to better address this growing segment.',
      type: 'audience' as const,
      impact: 'medium' as const,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <SearchChannel 
              onChannelSelect={handleChannelSelect}
              className="max-w-2xl mx-auto"
            />
          </div>
          
          {channelId ? (
            <div className="animate-fade-in">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-4 text-muted-foreground">Analyzing channel data...</p>
                  </div>
                </div>
              ) : (
                <>
                  <Card className="mb-8 border-[1.5px] overflow-hidden glass-panel">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&h=200" 
                            alt="Channel"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h1 className="text-2xl font-bold mb-1">Tech Insights</h1>
                          <p className="text-muted-foreground mb-3">Latest tech reviews and insights</p>
                          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="font-medium">1.25M Subscribers</span>
                            </div>
                            <div className="flex items-center">
                              <VideoIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="font-medium">420 Videos</span>
                            </div>
                            <div className="flex items-center">
                              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                              <span className="font-medium text-green-500">+12.5% Growth</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <PerformanceMetric
                      title="Total Views"
                      value="25.8M"
                      change={12.3}
                      icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
                      variant="default"
                    />
                    <PerformanceMetric
                      title="Avg. Watch Time"
                      value="8:32"
                      change={-2.1}
                      icon={<Clock className="h-4 w-4 text-muted-foreground" />}
                      variant="default"
                    />
                    <PerformanceMetric
                      title="Engagement Rate"
                      value="7.4%"
                      change={3.8}
                      icon={<ThumbsUp className="h-4 w-4 text-muted-foreground" />}
                      variant="default"
                    />
                    <PerformanceMetric
                      title="Subscriber Growth"
                      value="12.5%"
                      suffix="monthly"
                      icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
                      variant="default"
                    />
                  </div>
                  
                  <Tabs defaultValue="overview" className="mb-8">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                      <TabsTrigger 
                        value="overview" 
                        onClick={() => setActiveTab('overview')}
                        className="text-sm"
                      >
                        Channel Overview
                      </TabsTrigger>
                      <TabsTrigger 
                        value="content" 
                        onClick={() => setActiveTab('content')}
                        className="text-sm"
                      >
                        Content Analysis
                      </TabsTrigger>
                      <TabsTrigger 
                        value="audience" 
                        onClick={() => setActiveTab('audience')}
                        className="text-sm"
                      >
                        Audience Insights
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-8 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ComparisonChart
                          title="Views Trend"
                          data={viewsData}
                          type="line"
                          keys={{
                            category: 'date',
                            channel1: 'views',
                          }}
                          channel1Name="Views"
                        />
                        
                        <ComparisonChart
                          title="Subscriber Growth"
                          data={subscribersData}
                          type="line"
                          keys={{
                            category: 'date',
                            channel1: 'subscribers',
                          }}
                          channel1Name="Subscribers"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ComparisonChart
                          title="Content Performance by Type"
                          data={contentTypeData}
                          type="bar"
                          keys={{
                            category: 'type',
                            channel1: 'videos',
                            channel2: 'engagement',
                          }}
                          channel1Name="Videos"
                          channel2Name="Engagement"
                        />
                        
                        <Card className="border-[1.5px]">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-medium mb-4">Best Performing Videos</h3>
                            <div className="space-y-4">
                              {bestPerformingVideos.map((video, index) => (
                                <div key={index} className="flex items-center gap-4 border-b border-muted pb-3 last:border-0 last:pb-0">
                                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                                    <span className="font-medium text-sm">{index + 1}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm truncate">{video.title}</h4>
                                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                                      <span>{(video.views / 1000000).toFixed(1)}M views</span>
                                      <span className="mx-2">•</span>
                                      <span>{video.engagement} engagement score</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="content" className="space-y-8 animate-fade-in">
                      <p className="text-muted-foreground">Content analysis tab content will go here.</p>
                    </TabsContent>
                    
                    <TabsContent value="audience" className="space-y-8 animate-fade-in">
                      <p className="text-muted-foreground">Audience insights tab content will go here.</p>
                    </TabsContent>
                  </Tabs>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Improvement Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {insights.map((insight, index) => (
                        <InsightCard
                          key={index}
                          title={insight.title}
                          description={insight.description}
                          type={insight.type}
                          impact={insight.impact}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Enter a YouTube Channel to Begin</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Enter a YouTube channel URL or ID above to see detailed analytics and growth insights.
              </p>
              <div className="flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=400" 
                  alt="YouTube Analytics" 
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
