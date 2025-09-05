'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PredictionForm from '@/components/PredictionForm';
import PredictionResults from '@/components/PredictionResults';
import HistoryList from '@/components/HistoryList';
import { PredictionResult } from '@/types/prediction';

export default function HomePage() {
  const [currentPrediction, setCurrentPrediction] = useState<PredictionResult | null>(null);
  const [predictionHistory, setPredictionHistory] = useState<PredictionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('predict');

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('sportsPredictionHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setPredictionHistory(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Failed to parse saved history:', error);
        localStorage.removeItem('sportsPredictionHistory');
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (predictionHistory.length > 0) {
      localStorage.setItem('sportsPredictionHistory', JSON.stringify(predictionHistory));
    }
  }, [predictionHistory]);

  const handlePredictionGenerated = async (prediction: PredictionResult) => {
    setIsLoading(true);
    
    try {
      // Add to current prediction
      setCurrentPrediction(prediction);
      
      // Add to history (newest first)
      setPredictionHistory(prev => [prediction, ...prev]);
      
      // Switch to results tab
      setActiveTab('results');
      
    } catch (error) {
      console.error('Error handling prediction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setPredictionHistory([]);
    localStorage.removeItem('sportsPredictionHistory');
  };

  const handleNewPrediction = () => {
    setActiveTab('predict');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Sports Match Predictor
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get AI-powered predictions for football matches with detailed analysis, 
          win probabilities, and score predictions based on team performance data.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">AI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Advanced AI models analyze team performance, form, and historical data
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">Win Probabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Detailed probability breakdowns for home win, draw, and away win scenarios
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">Score Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Predicted final scores based on attacking and defensive capabilities
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Application */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="predict">Predict</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="history">
            History ({predictionHistory.length})
          </TabsTrigger>
        </TabsList>

        {/* Prediction Form Tab */}
        <TabsContent value="predict" className="mt-8">
          <div className="space-y-6">
            <PredictionForm 
              onPredictionGenerated={handlePredictionGenerated}
              isLoading={isLoading}
            />
            
            {/* Quick Stats */}
            {predictionHistory.length > 0 && (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      You've made <span className="font-semibold">{predictionHistory.length}</span> predictions
                    </p>
                    <Button 
                      variant="link" 
                      onClick={() => setActiveTab('history')}
                      className="text-sm mt-1"
                    >
                      View all predictions →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="mt-8">
          {currentPrediction ? (
            <div className="space-y-6">
              <PredictionResults prediction={currentPrediction} />
              
              <div className="flex justify-center">
                <Button onClick={handleNewPrediction} size="lg">
                  Make Another Prediction
                </Button>
              </div>
            </div>
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <p className="text-lg text-gray-500 mb-4">No prediction results yet</p>
                  <Button onClick={() => setActiveTab('predict')}>
                    Generate Your First Prediction
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="mt-8">
          <HistoryList 
            predictions={predictionHistory}
            onClearHistory={handleClearHistory}
          />
        </TabsContent>
      </Tabs>

      {/* System Prompt Section */}
      <Card className="max-w-4xl mx-auto mt-12">
        <CardHeader>
          <CardTitle>AI System Configuration</CardTitle>
          <p className="text-sm text-gray-600">
            The AI uses advanced sports analysis capabilities to generate predictions
          </p>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Analysis Factors:</h4>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Team form and current season performance</li>
              <li>Historical head-to-head records</li>
              <li>Home advantage statistical impact</li>
              <li>Key player availability and injuries</li>
              <li>Tactical matchup compatibility</li>
              <li>External factors (pressure, motivation)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}