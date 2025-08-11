export interface ColumnValue {
  id: string;
  type: string;
  text?: string;
  value?: string;
  duration?: number;
  running?: boolean;
  history?: Array<{
    started_at: string;
    ended_at: string;
    started_user_id: string;
  }>;
}

export interface SubItem {
  id: string;
  name: string;
  column_values: ColumnValue[];
}

export interface Item {
  id: string;
  name: string;
  group: {
    title: string;
  };
  subitems: SubItem[];
}

export interface Board {
  id: string;
  name: string;
  items_page: {
    items: Item[];
  };
}

export interface MondayApiResponse {
  data?: {
    boards: Board[];
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

export interface UserWorkload {
  name: string;
  activeTasks: number;
  totalWorkload: number;
  completedTasks: number;
  tasksByStatus: Record<string, number>;
}

export interface UserFinancial {
  name: string;
  totalHours: number;
  rate: number;
  salary: number;
  additionalPayment: number;
}

export interface ApiResponse {
  success: boolean;
  data?: {
    raw: { boards: Board[] };
    userWorkloads: UserWorkload[];
    userFinancials: UserFinancial[];
  };
  error?: string;
  timestamp?: string;
}
