
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SaveIcon, KeyIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showKey, setShowKey] = useState<boolean>(false);
  const { toast } = useToast();

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('youtubeApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    try {
      setIsSaving(true);
      
      // Simple validation - check if the key is not empty
      if (!apiKey.trim()) {
        toast({
          title: "Empty API Key",
          description: "Please enter a YouTube Data API key",
          variant: "destructive"
        });
        return;
      }
      
      // Save to localStorage
      localStorage.setItem('youtubeApiKey', apiKey);
      
      toast({
        title: "API Key Saved",
        description: "Your YouTube API key has been saved successfully",
      });

      // Hide the key after saving
      setShowKey(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API key",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Function to mask the API key for display
  const maskApiKey = (key: string) => {
    if (!key) return '';
    const firstFour = key.substring(0, 4);
    const lastFour = key.substring(key.length - 4);
    return `${firstFour}${'•'.repeat(Math.max(0, key.length - 8))}${lastFour}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="glass-panel p-6 bg-card rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <KeyIcon className="mr-2 h-5 w-5" />
            YouTube API Configuration
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="youtubeApiKey" className="text-sm font-medium">
                YouTube Data API Key
              </label>
              <p className="text-sm text-muted-foreground mb-2">
                Enter your API key from the Google Cloud Console to enable YouTube data fetching.
              </p>
              <div className="relative">
                <Input
                  id="youtubeApiKey"
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your YouTube Data API Key"
                  className="font-mono pr-10"
                  autoComplete="off"
                  spellCheck="false"
                />
                <Button
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowKey(!showKey)}
                  aria-label={showKey ? "Hide API key" : "Show API key"}
                >
                  {showKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </Button>
              </div>
              {apiKey && !showKey && (
                <div className="text-sm font-mono mt-1 text-muted-foreground">
                  Saved key: {maskApiKey(apiKey)}
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleSaveApiKey} 
              disabled={isSaving}
              className="flex items-center"
            >
              <SaveIcon className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save API Key"}
            </Button>
            
            <div className="text-sm text-muted-foreground mt-4 p-4 border rounded-md bg-accent/10">
              <h3 className="font-medium mb-2">How to get a YouTube Data API Key:</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-accent underline">Google Cloud Console</a></li>
                <li>Create a new project or select an existing one</li>
                <li>Navigate to "APIs & Services" &gt; "Library"</li>
                <li>Search for "YouTube Data API v3" and enable it</li>
                <li>Go to "Credentials" and create an API key</li>
                <li>Copy the API key and paste it here</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
