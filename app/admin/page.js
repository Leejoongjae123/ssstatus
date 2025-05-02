'use client';

import { useState, useEffect } from 'react';
import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { useToast } from "@/app/components/ui/use-toast";

export default function AdminPage() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // 초기 로드 시 백엔드에서 상태 가져오기
  useEffect(() => {
    fetchChannelStatus();
  }, []);

  // 백엔드에서 현재 상태 가져오기
  const fetchChannelStatus = async () => {
    try {
      const response = await fetch('/api/service/status');
      if (!response.ok) throw new Error('상태 조회에 실패했습니다');
      
      const data = await response.json();
      setIsActive(data.state === 'Y');
    } catch (error) {
      console.error('상태 조회 오류:', error);
      toast({
        title: "오류 발생",
        description: "서비스 상태를 가져오는데 실패했습니다",
        variant: "destructive",
      });
    }
  };

  // 상태 변경 API 호출
  const updateChannelStatus = async (state) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/service/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: state ? 'Y' : 'N' }),
      });
      
      if (!response.ok) throw new Error('상태 변경에 실패했습니다');
      
      const data = await response.json();
      setIsActive(state);
      
      toast({
        title: "성공",
        description: data.message,
      });
    } catch (error) {
      console.error('상태 변경 오류:', error);
      toast({
        title: "오류 발생",
        description: "서비스 상태 변경에 실패했습니다",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 토글 상태 변경 처리
  const handleToggleStatus = (checked) => {
    updateChannelStatus(checked);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4 md:mb-6">채널 상태 관리</h2>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg gap-4">
          <div>
            <p className="font-medium text-gray-800">채널 상태</p>
            <p className="text-sm text-gray-500 mt-1">
              채널을 활성화하거나 비활성화합니다
            </p>
          </div>
          
          <div className="flex items-center">
            <span className={cn(
              "mr-3 text-sm font-medium",
              isActive ? "text-green-600" : "text-gray-500"
            )}>
              {isActive ? '활성화됨' : '비활성화됨'}
            </span>
            
            {/* Shadcn 토글 스위치 */}
            <Switch
              checked={isActive}
              onCheckedChange={handleToggleStatus}
              disabled={isLoading}
              className={cn(
                isActive ? "bg-green-600" : "bg-gray-300"
              )}
            />
          </div>
        </div>
        
        <div className="mt-6 md:mt-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-medium text-gray-800 mb-2">현재 상태 정보</h3>
          <div className="flex items-center mt-2">
            <div className={`h-3 w-3 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <p className="text-sm text-gray-600">
              채널이 현재 <span className={isActive ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {isActive ? '활성화' : '비활성화'}</span> 상태입니다
            </p>
          </div>
          
          
        </div>
      </div>
    </div>
  );
} 