import { Board, UserWorkload, UserFinancial } from '../types';
import { STATUS_CATEGORIES, COLUMN_IDS, FINANCIAL_CONSTANTS } from '../constants';
import { getColumnValue, parseNumericValue } from './helpers';

/**
 * Creates or updates user workload data
 */
function updateUserWorkload(
  userMap: Map<string, UserWorkload>,
  userName: string,
  status: string
): void {
  if (!userMap.has(userName)) {
    userMap.set(userName, {
      name: userName,
      activeTasks: 0,
      totalWorkload: 0,
      completedTasks: 0,
      tasksByStatus: {}
    });
  }

  const user = userMap.get(userName)!;
  
  // Update status count
  user.tasksByStatus[status] = (user.tasksByStatus[status] || 0) + 1;
  
  // Update task counters based on status categories
  if (STATUS_CATEGORIES.ACTIVE.includes(status)) {
    user.activeTasks++;
  }
  
  if (STATUS_CATEGORIES.WORKLOAD.includes(status)) {
    user.totalWorkload++;
  }
  
  if (STATUS_CATEGORIES.COMPLETED.includes(status)) {
    user.completedTasks++;
  }
}

/**
 * Processes Monday.com data to extract user workload information
 */
export function processUserWorkloads(boards: Board[]): UserWorkload[] {
  const userMap = new Map<string, UserWorkload>();

  try {
    boards.forEach(board => {
      if (!board.items_page?.items) {
        console.warn(`Board ${board.id} has no items`);
        return;
      }

      board.items_page.items.forEach(item => {
        const status = item.group?.title;
        if (!status) {
          console.warn(`Item ${item.id} has no status`);
          return;
        }
        
        item.subitems?.forEach(subitem => {
          const personColumn = getColumnValue(subitem, COLUMN_IDS.PERSON);
          const userName = personColumn?.text?.trim();
          
          if (userName) {
            updateUserWorkload(userMap, userName, status);
          }
        });
      });
    });

    return Array.from(userMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error processing user workloads:', error);
    return [];
  }
}

/**
 * Creates or updates user financial data
 */
function updateUserFinancial(
  userMap: Map<string, UserFinancial>,
  userName: string,
  hoursWorked: number,
  rate: number
): void {
  if (!userMap.has(userName)) {
    userMap.set(userName, {
      name: userName,
      totalHours: 0,
      rate: 0,
      salary: 0,
      additionalPayment: 0
    });
  }

  const user = userMap.get(userName)!;
  user.totalHours += hoursWorked;
  
  // Update rate if a valid rate is provided
  if (rate > 0) {
    user.rate = rate;
  }
}

/**
 * Calculates salary and additional payments based on hours worked
 */
function calculateFinancials(user: UserFinancial): void {
  const STANDARD_HOURS_PER_MONTH = 160; // 160 hours per month standard
  
  // Base salary = rate * 160 hours per month (fixed monthly salary)
  user.salary = user.rate * STANDARD_HOURS_PER_MONTH;
  
  // Earned amount = actual hours worked * rate
  const earnedAmount = user.totalHours * user.rate;
  
  // Additional payments = difference between fixed salary and earned amount
  // If worked less than 160 hours, get the difference as additional payment
  user.additionalPayment = Math.max(0, user.salary - earnedAmount);
}

/**
 * Processes Monday.com data to extract user financial information
 */
export function processUserFinancials(boards: Board[]): UserFinancial[] {
  const userMap = new Map<string, UserFinancial>();

  try {
    boards.forEach(board => {
      if (!board.items_page?.items) {
        console.warn(`Board ${board.id} has no items for financial processing`);
        return;
      }

      board.items_page.items.forEach(item => {
        item.subitems?.forEach(subitem => {
          const personColumn = getColumnValue(subitem, COLUMN_IDS.PERSON);
          const timeTrackingColumn = getColumnValue(subitem, COLUMN_IDS.TIME_TRACKING);
          const rateColumn = getColumnValue(subitem, COLUMN_IDS.RATE);
          
          const userName = personColumn?.text?.trim();
          
          if (userName && timeTrackingColumn && rateColumn) {
            const hoursWorked = timeTrackingColumn.duration 
              ? timeTrackingColumn.duration / FINANCIAL_CONSTANTS.HOURS_IN_SECOND 
              : 0;
            const rate = parseNumericValue(rateColumn.text);
            
            if (hoursWorked > 0 || rate > 0) {
              updateUserFinancial(userMap, userName, hoursWorked, rate);
            }
          }
        });
      });
    });

    // Calculate final financial data for each user
    userMap.forEach(user => calculateFinancials(user));

    return Array.from(userMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error processing user financials:', error);
    return [];
  }
}
