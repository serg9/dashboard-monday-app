export const CATEGORY_COLORS = {
  ACTIVE: 'bg-yellow-50',
  WORKLOAD: 'bg-red-50',
  COMPLETED: 'bg-green-50',
  
  IN_PROGRESS: 'bg-yellow-50',
  NEED_REVIEW: 'bg-orange-50',
  LEAD_FEEDBACK: 'bg-red-50',
  TO_PACK: 'bg-purple-50',
  TO_DO: 'bg-red-50',
  SENT: 'bg-pink-50',
  CLIENT_FEEDBACK: 'bg-indigo-50',
  READY_FOR_CLIENT: 'bg-blue-50',
  PAUSED: 'bg-gray-50',
  
  DONE_THIS_MONTH: 'bg-green-50',
  STOPPED: 'bg-gray-100',
} as const;

export type CategoryColorKey = keyof typeof CATEGORY_COLORS;

export const getCategoryColor = (status: string): string => {
  if (!status) return 'bg-gray-50';
  
  const normalizedStatus = status
    .trim()
    .toUpperCase()
    .replace(/[\s\-\.]+/g, '_') as CategoryColorKey;
  
  return CATEGORY_COLORS[normalizedStatus] || 'bg-gray-50';
};

