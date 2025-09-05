import { AIResponse } from '@/types/prediction';

export const AI_CONFIG = {
  endpoint: 'https://oi-server.onrender.com/chat/completions',
  headers: {
    'customerId': 'kerlblitz@gmail.com',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer xxx'
  },
  model: 'openrouter/claude-sonnet-4'
};

export const SPORTS_ANALYSIS_PROMPT = `You are an expert sports analyst with deep knowledge of football/soccer teams, their performance patterns, and match prediction capabilities. 

Your task is to analyze matchups between teams and provide detailed predictions. Consider:

1. **Team Form & Performance**: Current season performance, recent results, scoring patterns
2. **Historical Matchups**: Head-to-head records, recent encounters
3. **Home Advantage**: Home team statistical advantages, crowd impact
4. **Key Players**: Star players, injuries, suspensions
5. **Tactical Analysis**: Playing styles, formation compatibility
6. **External Factors**: Weather, motivation, league position pressure

Respond ONLY with a valid JSON object in this exact format:
{
  "homeWinProbability": number (0-100),
  "drawProbability": number (0-100),
  "awayWinProbability": number (0-100),
  "predictedScore": {
    "home": number,
    "away": number
  },
  "confidence": number (1-100),
  "analysis": "detailed analysis paragraph",
  "keyFactors": ["factor1", "factor2", "factor3"]
}

Ensure probabilities sum to 100. Base your analysis on realistic football knowledge.`;

export async function generatePrediction(
  homeTeam: string, 
  awayTeam: string, 
  league?: string
): Promise<AIResponse> {
  try {
    const matchContext = league ? ` (${league})` : '';
    const prompt = `Analyze this football match: ${homeTeam} vs ${awayTeam}${matchContext}. Provide a detailed prediction.`;

    const response = await fetch(AI_CONFIG.endpoint, {
      method: 'POST',
      headers: AI_CONFIG.headers,
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: SPORTS_ANALYSIS_PROMPT
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`AI API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content;

    if (!aiContent) {
      throw new Error('No content received from AI service');
    }

    // Parse JSON response
    const cleanContent = aiContent.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
    const prediction = JSON.parse(cleanContent) as AIResponse;

    // Validate response structure
    if (!prediction.homeWinProbability || !prediction.analysis) {
      throw new Error('Invalid prediction format received');
    }

    return prediction;

  } catch (error) {
    console.error('Error generating prediction:', error);
    
    // Fallback prediction
    return {
      homeWinProbability: 40,
      drawProbability: 30,
      awayWinProbability: 30,
      predictedScore: { home: 1, away: 1 },
      confidence: 60,
      analysis: 'Unable to generate detailed analysis. This is a balanced matchup with both teams having equal chances.',
      keyFactors: ['Home advantage', 'Recent form', 'Team motivation']
    };
  }
}