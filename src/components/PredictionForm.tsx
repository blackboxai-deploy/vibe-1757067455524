'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeamSearch from './TeamSearch';
import LoadingSpinner from './LoadingSpinner';
import { PredictionRequest, PredictionResult } from '@/types/prediction';

interface PredictionFormProps {
  onPredictionGenerated: (prediction: PredictionResult) => void;
  isLoading: boolean;
}

export default function PredictionForm({ 
  onPredictionGenerated, 
  isLoading 
}: PredictionFormProps) {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [league, setLeague] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!homeTeam.trim() || !awayTeam.trim()) {
      setError('Please enter both home and away teams');
      return;
    }

    if (homeTeam.toLowerCase().trim() === awayTeam.toLowerCase().trim()) {
      setError('Home and away teams must be different');
      return;
    }

    try {
      const requestData: PredictionRequest = {
        homeTeam: homeTeam.trim(),
        awayTeam: awayTeam.trim(),
        league: league.trim() || undefined
      };

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.success && data.data) {
        onPredictionGenerated(data.data);
        // Clear form after successful prediction
        setHomeTeam('');
        setAwayTeam('');
        setLeague('');
      } else {
        setError(data.error || 'Failed to generate prediction');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      setError('Failed to generate prediction. Please try again.');
    }
  };

  const handleRandomTeams = async () => {
    try {
      const response = await fetch('/api/teams?action=random');
      const data = await response.json();

      if (data.success && data.data) {
        setHomeTeam(data.data.home.name);
        setAwayTeam(data.data.away.name);
        setLeague(data.data.home.league || '');
      }
    } catch (error) {
      console.error('Failed to get random teams:', error);
    }
  };

  const handleSwapTeams = () => {
    const temp = homeTeam;
    setHomeTeam(awayTeam);
    setAwayTeam(temp);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Sports Match Predictor
        </CardTitle>
        <p className="text-center text-gray-600">
          Enter two teams to get AI-powered match predictions
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Home Team */}
          <div>
            <TeamSearch
              value={homeTeam}
              onChange={setHomeTeam}
              label="Home Team"
              placeholder="Enter home team name..."
              disabled={isLoading}
            />
          </div>

          {/* Away Team */}
          <div>
            <TeamSearch
              value={awayTeam}
              onChange={setAwayTeam}
              label="Away Team"
              placeholder="Enter away team name..."
              disabled={isLoading}
            />
          </div>

          {/* League (Optional) */}
          <div>
            <Label htmlFor="league">League (Optional)</Label>
            <Input
              id="league"
              type="text"
              value={league}
              onChange={(e) => setLeague(e.target.value)}
              placeholder="e.g., Premier League, La Liga..."
              disabled={isLoading}
              className="mt-2"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleSwapTeams}
              disabled={isLoading || (!homeTeam && !awayTeam)}
              className="flex-1 min-w-[120px]"
            >
              Swap Teams
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleRandomTeams}
              disabled={isLoading}
              className="flex-1 min-w-[120px]"
            >
              Random Teams
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !homeTeam.trim() || !awayTeam.trim()}
            className="w-full h-12 text-lg font-semibold"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" text="Generating Prediction..." />
            ) : (
              'Generate Prediction'
            )}
          </Button>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}