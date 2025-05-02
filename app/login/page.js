'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/app/components/ui/card";
import { useToast } from "@/app/components/ui/use-toast";
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (email === 'admin@naver.com' && password === '123456789') {
        // 간단한 클라이언트 측 인증 처리
        localStorage.setItem('isLoggedIn', 'true');
        
        toast({
          title: "로그인 성공",
          description: "관리자 페이지로 이동합니다.",
        });
        
        // 약간의 지연 시간을 두고 이동하여 토스트 메시지 확인 가능하게 함
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } else {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        toast({
          title: "로그인 실패",
          description: "이메일 또는 비밀번호가 올바르지 않습니다.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      setError('로그인 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex items-center justify-center gap-3">
            <Image 
              src="/logo.png" 
              alt="logo" 
              width={40} 
              height={40} 
              className="rounded-md"
            />
            <p className="text-lg font-medium text-gray-600">채널톡 상태 관리</p>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-800 mt-2">
            관리자 로그인
          </CardTitle>
          <CardDescription className="text-center text-gray-500 text-base">
            계정 정보를 입력하여 로그인하세요
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  이메일
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@naver.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  비밀번호
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <p className="text-xs text-gray-500">관리자 계정으로 로그인하세요</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 