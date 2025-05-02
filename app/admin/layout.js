'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // 간단한 인증 검사
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }

    // 화면 크기에 따라 사이드바 상태 조정
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // 초기 로드 및 리사이즈 이벤트에 대한 핸들러
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 사이드바 */}
      <div 
        className={cn(
          "bg-white shadow-md transition-all duration-300 ease-in-out fixed md:relative z-10 h-full",
          sidebarOpen ? "w-64" : "w-0 md:w-16 overflow-hidden"
        )}
      >
        <div className="p-4 border-b flex items-center space-x-4">
          <Image
            className={cn(
              "transition-all duration-300",
              sidebarOpen ? "w-12 h-12" : "w-8 h-8"
            )}
            src="/logo.png"
            alt="신승세무법인 로고" 
            width={48}
            height={48}
            priority
          />
          <p className={cn(
            "text-lg font-medium transition-all duration-300",
            sidebarOpen ? "opacity-100" : "opacity-0 md:opacity-100"
          )}>신승세무법인</p>
          <Button 
            variant="ghost"
            size="sm"
            className="ml-auto md:hidden"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        
        <nav className="mt-6">
          <Link href="/admin">
            <div className={cn(
              "flex items-center px-3 md:px-4 py-3 text-gray-700 border-l-4",
              sidebarOpen ? "border-blue-500 bg-gray-100" : "border-transparent justify-center"
            )}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span className={cn(
                "ml-3 transition-opacity duration-300",
                sidebarOpen ? "opacity-100" : "opacity-0 hidden md:inline md:opacity-0"
              )}>
                채널톡봇 상태관리
              </span>
            </div>
          </Link>
        </nav>
      </div>

      {/* 메인 컨텐츠 */}
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden transition-all duration-300",
        sidebarOpen ? "md:ml-0" : "ml-0 md:ml-16"
      )}>
        {/* 헤더 */}
        <header className="bg-white shadow-sm">
          <div className="px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2" 
                onClick={toggleSidebar}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
              <h1 className="text-lg md:text-xl font-semibold">관리자 대시보드</h1>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 hover:bg-red-50"
            >
              로그아웃
            </Button>
          </div>
        </header>

        {/* 컨텐츠 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
} 