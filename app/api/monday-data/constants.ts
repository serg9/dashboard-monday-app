export const MONDAY_API_URL = 'https://api.monday.com/v2' as const;
export const BOARD_IDS = [9458295478, 9458292426] as const; // Board IDs
export const ITEMS_LIMIT = 500 as const; // Items limit

export const STATUS_CATEGORIES = {
  ACTIVE: ['IN PROGRESS', 'NEED REVIEW', 'LEAD FEEDBACK', 'TO PACK', 'SENT', 'CLIENT FEEDBACK', 'READY FOR CLIENT', 'PAUSED'] as readonly string[],
  WORKLOAD: ['IN PROGRESS', 'NEED REVIEW'] as readonly string[],
  COMPLETED: ['DONE THIS MONTH', 'STOPPED'] as readonly string[],
} as const;

export const COLUMN_IDS = {
  PERSON: 'person',
  TIME_TRACKING: 'time_tracking__1',
  RATE: 'numbers0__1',
} as const;

export const FINANCIAL_CONSTANTS = {
  STANDARD_HOURS_PER_WEEK: 40,
  HOURS_IN_SECOND: 3600,
} as const;
