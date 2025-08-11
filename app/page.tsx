'use client';

import React, { useEffect, useState } from 'react';
import { UserWorkload, UserFinancial } from '../types';
import { Header } from '../components/Header';
import { WorkloadList } from '../components/workload/WorkloadList';
import { FinancialList } from '../components/financial/FinancialList';

const MondayPage: React.FC = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [backgroundLoading, setBackgroundLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userWorkloads, setUserWorkloads] = useState<UserWorkload[]>([]);
  const [userFinancials, setUserFinancials] = useState<UserFinancial[]>([]);
  const [activeTab, setActiveTab] = useState<'workload' | 'financial'>('workload');
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  const fetchData = async (isInitial = false) => {
    try {
      if (isInitial) {
        setInitialLoading(true);
        setError(null);
      } else {
        setBackgroundLoading(true);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch('/api/monday-data', {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        setUserWorkloads(result.data.userWorkloads);
        setUserFinancials(result.data.userFinancials);
        setLastUpdateTime(new Date());
        setError(null); // Clear any previous errors on successful fetch
      } else {
        throw new Error(result.error || 'Failed to fetch data from API');
      }
      
    } catch (err) {
      console.error('API error:', err);
      
      // Only show error on initial load or if we don't have any data yet
      if (isInitial || (!userWorkloads.length && !userFinancials.length)) {
        setError(`Failed to fetch data: ${err instanceof Error ? err.message : 'Невідома помилка'}`);
      } else {
        // For background updates, just log the error but don't disrupt the UI
        console.warn('Background update failed, keeping existing data');
      }
    } finally {
      if (isInitial) {
        setInitialLoading(false);
      } else {
        setBackgroundLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(true);
    
    const intervalId = setInterval(() => {
      fetchData(false);
    }, 30000); // 30 seconds
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (initialLoading) {
    return <div className="p-4">Завантаження даних...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Помилка: {error}</div>;
  }

  return (
    <div className="p-4">
      <Header />
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('workload')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'workload'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Завантаженість
        </button>
        <button
          onClick={() => setActiveTab('financial')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'financial'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Фінанси
        </button>
      </div>

      {activeTab === 'workload' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Завантаженість співробітників</h2>
          {userWorkloads.length > 0 ? (
            <WorkloadList userWorkloads={userWorkloads} />
          ) : (
            <div className="text-gray-500">Немає даних про завантаженість співробітників</div>
          )}
        </div>
      )}

      {activeTab === 'financial' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Розрахунок додаткових виплат</h2>
          {userFinancials.length > 0 ? (
            <FinancialList userFinancials={userFinancials} />
          ) : (
            <div className="text-gray-500">Немає фінансових даних</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MondayPage;