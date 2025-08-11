import React from 'react';

export const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-blue-600"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
);

const SkeletonLine = ({ className = '' }: { className?: string }) => (
  <div className={`h-3 rounded bg-gray-200/70 ${className}`}></div>
);

const CardSkeleton = () => (
  <div className="border rounded-lg p-4 bg-white shadow-sm animate-pulse">
    <div className="h-5 w-40 bg-gray-200/70 rounded mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="border rounded-md p-3">
        <SkeletonLine className="h-4 w-24 mb-2" />
        <SkeletonLine className="h-6 w-12" />
      </div>
      <div className="border rounded-md p-3">
        <SkeletonLine className="h-4 w-24 mb-2" />
        <SkeletonLine className="h-6 w-12" />
      </div>
      <div className="border rounded-md p-3">
        <SkeletonLine className="h-4 w-24 mb-2" />
        <SkeletonLine className="h-6 w-12" />
      </div>
    </div>
    <div>
      <SkeletonLine className="h-4 w-44 mb-2" />
      <div className="space-y-2">
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-5/6" />
        <SkeletonLine className="w-4/6" />
      </div>
    </div>
  </div>
);

const TabsSkeleton = () => (
  <div className="flex border-b mb-6">
    <div className="px-4 py-2">
      <div className="h-5 w-24 bg-gray-200/70 rounded" />
    </div>
    <div className="px-4 py-2">
      <div className="h-5 w-20 bg-gray-200/70 rounded" />
    </div>
  </div>
);

const formatTime = (date: Date | null) => {
  if (!date) return '-';
  return new Intl.DateTimeFormat('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

export const LoadingSkeleton = () => (
  <div className="p-4">
    <div className="mb-4 animate-pulse">
      <div className="h-7 w-56 bg-gray-200/70 rounded" />
    </div>
    <TabsSkeleton />
    <div className="space-y-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  </div>
);

export const StatusBar = ({
  backgroundLoading,
  lastUpdateTime,
}: {
  backgroundLoading: boolean;
  lastUpdateTime: Date | null;
}) => (
  <div className="mt-2 mb-4 flex items-center gap-3 text-sm text-gray-600">
    {backgroundLoading ? (
      <div className="inline-flex items-center gap-2">
        <Spinner />
        <span>Оновлення даних…</span>
      </div>
    ) : (
      <div className="inline-flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
        <span>Останнє оновлення: {formatTime(lastUpdateTime)}</span>
      </div>
    )}
  </div>
);
