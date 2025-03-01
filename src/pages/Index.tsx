
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SearchChannel from '@/components/SearchChannel';
import ChannelCard from '@/components/ChannelCard';
import Navigation from '@/components/Navigation';
import { ChevronRight, TrendingUp, LineChart, BarChart, Settings } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  // Dummy featured channels
  const featuredChannels = [
    {
      id: 'channel1',
      name: 'Tech Insights',
      subscribers: 1250000,
      views: 25000000,
      videos: 420,
      thumbnailUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&h=200',
      description: 'Latest tech reviews and insights',
      growth: 12.5
    },
    {
      id: 'channel2',
      name: 'Cooking Master',
      subscribers: 3400000,
      views: 89000000,
      videos: 315,
      thumbnailUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=200&h=200',
      description: 'Delicious recipes and cooking tips',
      growth: 8.2
    },
    {
      id: 'channel3',
      name: 'Travel Diaries',
      subscribers: 890000,
      views: 15000000,
      videos: 210,
      thumbnailUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&h=200',
      description: 'Explore the world with us',
      growth: -2.4
    }
  ];
  
  const handleChannelSelect = (channelId: string) => {
    navigate(`/dashboard?channel=${channelId}`);
  };
  
  const handleAnalyzeChannel = (channelId: string) => {
    navigate(`/dashboard?channel=${channelId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block rounded-full bg-accent/30 px-3 py-1 text-sm font-medium text-accent-foreground mb-6 animate-fade-in">
            Elevate your YouTube channel
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto animate-fade-up text-balance">
            Discover what makes great channels succeed
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up delay-100 text-balance">
            Analyze your channel, compare with competitors, and get actionable insights to grow your audience and improve your content strategy.
          </p>
          
          <div className="max-w-xl mx-auto animate-fade-up delay-200">
            <SearchChannel 
              onChannelSelect={handleChannelSelect}
              placeholder="Enter a YouTube channel URL" 
            />
          </div>
          
          {/* Settings button */}
          <div className="mt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/settings')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure API Key
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 bg-guru-lightGray dark:bg-guru-darkGray/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Analytics Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              Everything you need to understand your channel's performance and growth opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-6 flex flex-col items-center text-center animate-fade-up">
              <div className="h-12 w-12 rounded-full bg-accent/30 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Detailed Analytics</h3>
              <p className="text-muted-foreground text-balance">Get in-depth analysis of your channel's performance metrics and audience demographics.</p>
            </div>
            
            <div className="glass-panel p-6 flex flex-col items-center text-center animate-fade-up delay-100">
              <div className="h-12 w-12 rounded-full bg-accent/30 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Competitor Comparison</h3>
              <p className="text-muted-foreground text-balance">Compare your channel with competitors to identify strengths and areas for improvement.</p>
            </div>
            
            <div className="glass-panel p-6 flex flex-col items-center text-center animate-fade-up delay-200">
              <div className="h-12 w-12 rounded-full bg-accent/30 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Growth Insights</h3>
              <p className="text-muted-foreground text-balance">Receive actionable recommendations to increase subscribers and improve content strategy.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="rounded-full px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Explore Features <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Channels */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured Channels</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              See how these popular channels have optimized their content and audience engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredChannels.map((channel) => (
              <ChannelCard 
                key={channel.id}
                channel={channel}
                onAnalyze={handleAnalyzeChannel}
                className="animate-fade-up"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-accent/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 animate-fade-up">Ready to Grow Your Channel?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up delay-100 text-balance">
            Join thousands of content creators who use ChannelGuru to analyze, optimize, and grow their YouTube presence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-200">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="rounded-full px-8 py-6 bg-guru-red hover:bg-guru-red/90 text-white w-full sm:w-auto"
            >
              Start Free Analysis
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/compare')}
              className="rounded-full px-8 py-6 w-full sm:w-auto"
            >
              Compare Channels
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-guru-red flex items-center justify-center">
                <span className="text-white font-bold text-sm">YG</span>
              </div>
              <span className="font-semibold text-lg">ChannelGuru</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">About</a>
              <a href="#" className="hover:text-foreground">Features</a>
              <a href="#" className="hover:text-foreground">Pricing</a>
              <a href="#" className="hover:text-foreground">FAQs</a>
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} ChannelGuru. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
