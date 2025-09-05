import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/prediction';

// Since we're using client-side storage, this endpoint provides 
// validation and future server-side storage capabilities

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        message: 'History is managed client-side via localStorage',
        instructions: 'Use the frontend history management for storing predictions'
      },
      message: 'History endpoint available'
    } as ApiResponse<any>);

  } catch (error) {
    console.error('History API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to access history'
    } as ApiResponse<null>, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Future implementation for server-side history storage
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      data: {
        message: 'Prediction received but stored client-side',
        received: body
      },
      message: 'History storage endpoint ready for future implementation'
    } as ApiResponse<any>);

  } catch (error) {
    console.error('History POST error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to store history'
    } as ApiResponse<null>, { status: 500 });
  }
}

export async function DELETE() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        message: 'Clear history request received',
        instructions: 'History clearing is managed client-side'
      },
      message: 'History clearing endpoint available'
    } as ApiResponse<any>);

  } catch (error) {
    console.error('History DELETE error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to clear history'
    } as ApiResponse<null>, { status: 500 });
  }
}