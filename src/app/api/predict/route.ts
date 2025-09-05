import { NextRequest, NextResponse } from 'next/server';
import { generatePrediction } from '@/lib/ai-client';
import { PredictionRequest, PredictionResult, ApiResponse } from '@/types/prediction';

export async function POST(request: NextRequest) {
  try {
    const body: PredictionRequest = await request.json();
    
    // Validate required fields
    if (!body.homeTeam || !body.awayTeam) {
      return NextResponse.json({
        success: false,
        error: 'Both home and away teams are required'
      } as ApiResponse<null>, { status: 400 });
    }

    // Validate teams are different
    if (body.homeTeam.toLowerCase().trim() === body.awayTeam.toLowerCase().trim()) {
      return NextResponse.json({
        success: false,
        error: 'Home and away teams must be different'
      } as ApiResponse<null>, { status: 400 });
    }

    // Generate prediction using AI
    const aiPrediction = await generatePrediction(
      body.homeTeam.trim(),
      body.awayTeam.trim(),
      body.league
    );

    // Create prediction result
    const predictionResult: PredictionResult = {
      id: `pred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      homeTeam: body.homeTeam.trim(),
      awayTeam: body.awayTeam.trim(),
      homeWinProbability: Math.round(aiPrediction.homeWinProbability * 100) / 100,
      drawProbability: Math.round(aiPrediction.drawProbability * 100) / 100,
      awayWinProbability: Math.round(aiPrediction.awayWinProbability * 100) / 100,
      predictedScore: aiPrediction.predictedScore,
      confidence: Math.round(aiPrediction.confidence * 100) / 100,
      analysis: aiPrediction.analysis,
      keyFactors: aiPrediction.keyFactors,
      createdAt: new Date().toISOString(),
      league: body.league
    };

    return NextResponse.json({
      success: true,
      data: predictionResult,
      message: 'Prediction generated successfully'
    } as ApiResponse<PredictionResult>);

  } catch (error) {
    console.error('Prediction API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to generate prediction. Please try again.'
    } as ApiResponse<null>, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Use POST to generate predictions.'
  } as ApiResponse<null>, { status: 405 });
}