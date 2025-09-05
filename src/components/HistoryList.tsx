'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PredictionResult } from '@/types/prediction';

interface HistoryListProps {
  predictions: PredictionResult[];
  onClearHistory: () => void;
}

export default function HistoryList({ predictions, onClearHistory }: HistoryListProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  if (predictions.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg">No predictions yet</p>
            <p className="text-sm">Generate your first match prediction above!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getPredictedWinner = (prediction: PredictionResult) => {
    if (prediction.homeWinProbability > prediction.awayWinProbability && prediction.homeWinProbability > prediction.drawProbability) {
      return prediction.homeTeam;
    } else if (prediction.awayWinProbability > prediction.homeWinProbability && prediction.awayWinProbability > prediction.drawProbability) {
      return prediction.awayTeam;
    } else {
      return 'Draw';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-100 text-green-800';
    if (confidence >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Prediction History ({predictions.length})</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearHistory}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Clear History
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {predictions.map((prediction) => (
          <Collapsible
            key={prediction.id}
            open={expandedItems.has(prediction.id)}
            onOpenChange={() => toggleExpanded(prediction.id)}
          >
            <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-semibold">
                        {prediction.homeTeam} vs {prediction.awayTeam}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {formatDate(prediction.createdAt)}
                      </Badge>
                      {prediction.league && (
                        <Badge variant="secondary" className="text-xs">
                          {prediction.league}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium">
                        {prediction.predictedScore.home} - {prediction.predictedScore.away}
                      </div>
                      <Badge variant="default" className="text-xs">
                        {getPredictedWinner(prediction)}
                      </Badge>
                      <Badge className={`text-xs ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Probabilities */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-gray-600">{prediction.homeTeam}</div>
                        <div className="text-lg font-bold text-blue-600">
                          {prediction.homeWinProbability.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Draw</div>
                        <div className="text-lg font-bold text-gray-600">
                          {prediction.drawProbability.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">{prediction.awayTeam}</div>
                        <div className="text-lg font-bold text-red-600">
                          {prediction.awayWinProbability.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    {/* Analysis */}
                    <div>
                      <h4 className="font-semibold mb-2">Analysis</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {prediction.analysis}
                      </p>
                    </div>
                    
                    {/* Key Factors */}
                    {prediction.keyFactors && prediction.keyFactors.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Key Factors</h4>
                        <div className="flex flex-wrap gap-2">
                          {prediction.keyFactors.map((factor, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
}