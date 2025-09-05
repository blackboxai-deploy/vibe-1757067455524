export interface Team {
  id: string;
  name: string;
  league?: string;
  country?: string;
}

export interface PredictionRequest {
  homeTeam: string;
  awayTeam: string;
  league?: string;
  matchDate?: string;
}

export interface PredictionResult {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeWinProbability: number;
  drawProbability: number;
  awayWinProbability: number;
  predictedScore: {
    home: number;
    away: number;
  };
  confidence: number;
  analysis: string;
  keyFactors: string[];
  createdAt: string;
  league?: string;
}

export interface PredictionHistory {
  predictions: PredictionResult[];
  totalPredictions: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AIResponse {
  homeWinProbability: number;
  drawProbability: number;
  awayWinProbability: number;
  predictedScore: {
    home: number;
    away: number;
  };
  confidence: number;
  analysis: string;
  keyFactors: string[];
}

export interface TeamSuggestion {
  name: string;
  league?: string;
  country?: string;
}