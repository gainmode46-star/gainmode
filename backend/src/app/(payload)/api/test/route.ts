import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('Test API route called')
    
    return NextResponse.json({
      success: true,
      message: 'Test API is working',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json(
      { success: false, error: 'Test API failed' },
      { status: 500 }
    )
  }
}