'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/app/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email === 'admin@naver.com' && password === '123456789') {
      // 간단한 클라이언트 측 인증 처리
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/admin');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-white">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-black">NEXT.js</h1>
          <h2 className="text-xl font-bold mt-6 mb-3">관리자 로그인</h2>
          <p className="text-sm text-gray-600 mb-4">
            계정 정보를 입력하여 로그인하세요
          </p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded text-sm border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                placeholder="admin@naver.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-fit px-4 py-1 bg-blue-600 text-white hover:bg-blue-700"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 