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

export interface UserWorkload {
  name: string;
  activeTasks: number;
  totalWorkload: number;
  completedTasks: number;
  tasksByStatus: Record<string, number>;
}

export interface WorkloadListProps {
  userWorkloads: UserWorkload[];
}

export interface WorkloadListItemProps {
  name: string;
  count: number;
  type: string;
}

export interface FinancialListProps {
  userFinancials: UserFinancial[];
}

export interface FinancialListItemProps {
  name: string;
  count: number;
  type: string;
}

export interface WorkloadListTaskCategoryItemProps {
  tasksByStatus: Record<string, number>;
}
