
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SaveIcon, KeyIcon } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="glass-panel p-6">
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
              <Input
                id="youtubeApiKey"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your YouTube Data API Key"
                className="font-mono"
                autoComplete="off"
                spellCheck="false"
              />
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
