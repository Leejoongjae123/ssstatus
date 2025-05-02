import { NextResponse } from 'next/server';

// 백엔드 API URL (환경 변수로 관리하는 것이 좋음)
const API_URL = 'https://f0rj3b625m.execute-api.ap-southeast-2.amazonaws.com';

// GET 메서드: 서비스 상태 조회
export async function GET() {
  try {
    const response = await fetch(`${API_URL}/service/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('백엔드 API 요청 실패');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('서비스 상태 조회 실패:', error);
    return NextResponse.json(
      { error: '서비스 상태 조회에 실패했습니다' },
      { status: 500 }
    );
  }
}

// POST 메서드: 서비스 상태 변경
export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_URL}/service/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('백엔드 API 요청 실패');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('서비스 상태 변경 실패:', error);
    return NextResponse.json(
      { error: '서비스 상태 변경에 실패했습니다' },
      { status: 500 }
    );
  }
} 