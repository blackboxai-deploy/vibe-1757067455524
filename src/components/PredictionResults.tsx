'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PredictionResult } from '@/types/prediction';

interface PredictionResultsProps {
  prediction: PredictionResult;
}

export default function PredictionResults({ prediction }: PredictionResultsProps) {
  const getWinnerBadgeColor = () => {
    if (prediction.homeWinProbability > prediction.awayWinProbability && prediction.homeWinProbability > prediction.drawProbability) {
      return 'default';
    } else if (prediction.awayWinProbability > prediction.homeWinProbability && prediction.awayWinProbability > prediction.drawProbability) {
      return 'secondary';
    } else {
      return 'outline';
    }
  };

  const getPredictedWinner = () => {
    if (prediction.homeWinProbability > prediction.awayWinProbability && prediction.homeWinProbability > prediction.drawProbability) {
      return prediction.homeTeam;
    } else if (prediction.awayWinProbability > prediction.homeWinProbability && prediction.awayWinProbability > prediction.drawProbability) {
      return prediction.awayTeam;
    } else {
      return 'Draw';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {prediction.homeTeam} vs {prediction.awayTeam}
          </CardTitle>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <Badge variant={getWinnerBadgeColor()} className="text-lg px-4 py-2">
              Predicted Winner: {getPredictedWinner()}
            </Badge>
            {prediction.league && (
              <Badge variant="outline">{prediction.league}</Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Score Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Predicted Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-8 text-4xl font-bold">
            <div className="text-center">
              <div className="text-blue-600">{prediction.predictedScore.home}</div>
              <div className="text-sm font-normal text-gray-600 mt-2">
                {prediction.homeTeam}
              </div>
            </div>
            <div className="text-gray-400">-</div>
            <div className="text-center">
              <div className="text-red-600">{prediction.predictedScore.away}</div>
              <div className="text-sm font-normal text-gray-600 mt-2">
                {prediction.awayTeam}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Win Probabilities */}
      <Card>
        <CardHeader>
          <CardTitle>Win Probabilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Home Win */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{prediction.homeTeam} Win</span>
              <span className="font-bold text-blue-600">
                {prediction.homeWinProbability.toFixed(1)}%
              </span>
            </div>
            <Progress value={prediction.homeWinProbability} className="h-3" />
          </div>

          {/* Draw */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Draw</span>
              <span className="font-bold text-gray-600">
                {prediction.drawProbability.toFixed(1)}%
              </span>
            </div>
            <Progress value={prediction.drawProbability} className="h-3" />
          </div>

          {/* Away Win */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{prediction.awayTeam} Win</span>
              <span className="font-bold text-red-600">
                {prediction.awayWinProbability.toFixed(1)}%
              </span>
            </div>
            <Progress value={prediction.awayWinProbability} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Match Analysis</CardTitle>
          <div className={`text-right ${getConfidenceColor(prediction.confidence)}`}>
            Confidence: {prediction.confidence}%
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed mb-4">
            {prediction.analysis}
          </p>
          
          {prediction.keyFactors && prediction.keyFactors.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Key Factors:</h4>
              <div className="flex flex-wrap gap-2">
                {prediction.keyFactors.map((factor, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {factor}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-sm text-gray-500">
            Prediction ID: {prediction.id} • Generated: {formatDate(prediction.createdAt)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}