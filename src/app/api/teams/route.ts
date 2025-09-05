import { NextRequest, NextResponse } from 'next/server';
import { searchTeams, getRandomTeamPair, POPULAR_TEAMS } from '@/lib/teams-data';
import { ApiResponse, TeamSuggestion } from '@/types/prediction';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const action = searchParams.get('action');

    // Handle random team pair request
    if (action === 'random') {
      const randomPair = getRandomTeamPair();
      return NextResponse.json({
        success: true,
        data: randomPair,
        message: 'Random team pair generated'
      } as ApiResponse<{ home: TeamSuggestion; away: TeamSuggestion }>);
    }

    // Handle team search
    if (query) {
      const suggestions = searchTeams(query);
      return NextResponse.json({
        success: true,
        data: suggestions,
        message: `Found ${suggestions.length} team suggestions`
      } as ApiResponse<TeamSuggestion[]>);
    }

    // Return popular teams if no query
    const popularTeams = POPULAR_TEAMS.slice(0, 20);
    return NextResponse.json({
      success: true,
      data: popularTeams,
      message: 'Popular teams retrieved'
    } as ApiResponse<TeamSuggestion[]>);

  } catch (error) {
    console.error('Teams API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve teams data'
    } as ApiResponse<null>, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Use GET to retrieve teams.'
  } as ApiResponse<null>, { status: 405 });
}