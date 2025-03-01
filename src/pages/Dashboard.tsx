
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import { useToast } from '@/components/ui/use-toast';
import SearchChannel from '@/components/SearchChannel';
import { LineChart, BarChart, Users, TrendingUp, MessageSquare } from 'lucide-react';

type TabType = "content" | "audience" | "growth" | "engagement";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get('channel');
  const [activeTab, setActiveTab] = useState<TabType>("content");
  const [isLoading, setIsLoading] = useState(false);
  const [channelData, setChannelData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (channelId) {
      loadChannelData(channelId);
    }
  }, [channelId]);

  const loadChannelData = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - in a real app, you would fetch from YouTube API
      // This is where you'd use the API key from localStorage
      const apiKey = localStorage.getItem('youtubeApiKey');
      
      // For now, let's just simulate a response after a delay
      setTimeout(() => {
        setChannelData({
          id: id,
          name: 'Sample Channel',
          subscribers: 1250000,
          views: 25000000,
          videos: 420,
          description: 'This is a sample channel for demonstration',
          thumbnailUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&h=200',
          growth: 12.5
        });
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Error loading channel data",
        description: "Could not fetch the channel information. Please try again later.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };
  
  const handleChannelSelect = (newChannelId: string) => {
    navigate(`/dashboard?channel=${newChannelId}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">YouTube Channel Analytics</h1>
          
          <SearchChannel 
            onChannelSelect={handleChannelSelect}
            placeholder="Search for another channel" 
            className="max-w-2xl"
          />
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-lg font-medium">Loading channel data...</p>
            </div>
          </div>
        ) : channelData ? (
          <div className="space-y-8">
            {/* Channel Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-card rounded-lg border shadow-sm">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-secondary flex-shrink-0">
                {channelData.thumbnailUrl ? (
                  <img 
                    src={channelData.thumbnailUrl} 
                    alt={channelData.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold">{channelData.name}</h2>
                <p className="text-muted-foreground mb-4">{channelData.description}</p>
                
                <div className="grid grid-cols-3 gap-4 max-w-md">
                  <div className="text-center p-2 bg-accent/10 rounded-md">
                    <p className="text-lg font-bold">{formatNumber(channelData.subscribers)}</p>
                    <p className="text-xs text-muted-foreground">Subscribers</p>
                  </div>
                  <div className="text-center p-2 bg-accent/10 rounded-md">
                    <p className="text-lg font-bold">{channelData.videos}</p>
                    <p className="text-xs text-muted-foreground">Videos</p>
                  </div>
                  <div className="text-center p-2 bg-accent/10 rounded-md">
                    <p className="text-lg font-bold text-green-500">+{channelData.growth}%</p>
                    <p className="text-xs text-muted-foreground">Growth</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Analytics Tabs */}
            <Tabs defaultValue="content" value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="content" className="flex items-center">
                  <BarChart className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="audience" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Audience
                </TabsTrigger>
                <TabsTrigger value="growth" className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Growth
                </TabsTrigger>
                <TabsTrigger value="engagement" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Engagement
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-6">
                <h3 className="text-xl font-semibold">Content Performance</h3>
                <p className="text-muted-foreground">
                  Analyze your content performance metrics and identify top performing videos.
                </p>
                
                <div className="h-80 bg-accent/10 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Content metrics visualization will appear here when connected to the YouTube API.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="audience" className="space-y-6">
                <h3 className="text-xl font-semibold">Audience Demographics</h3>
                <p className="text-muted-foreground">
                  Understand your audience demographics and viewing patterns.
                </p>
                
                <div className="h-80 bg-accent/10 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Audience demographics visualization will appear here when connected to the YouTube API.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="growth" className="space-y-6">
                <h3 className="text-xl font-semibold">Channel Growth</h3>
                <p className="text-muted-foreground">
                  Track your channel's growth over time and identify trends.
                </p>
                
                <div className="h-80 bg-accent/10 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Growth metrics visualization will appear here when connected to the YouTube API.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="engagement" className="space-y-6">
                <h3 className="text-xl font-semibold">Audience Engagement</h3>
                <p className="text-muted-foreground">
                  Analyze likes, comments, and other engagement metrics.
                </p>
                
                <div className="h-80 bg-accent/10 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Engagement metrics visualization will appear here when connected to the YouTube API.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-lg">
              <h2 className="text-2xl font-bold mb-4">No Channel Selected</h2>
              <p className="text-muted-foreground mb-6">
                Enter a YouTube channel URL or ID above to view analytics and insights.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
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

export default Dashboard;
