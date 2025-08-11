import { SubItem, ColumnValue } from '../types';

export function getColumnValue(subitem: SubItem, columnId: string): ColumnValue | null {
  try {
    return subitem.column_values.find(col => col.id === columnId) || null;
  } catch (error) {
    console.warn(`Error extracting column ${columnId}:`, error);
    return null;
  }
}

export function parseNumericValue(value: string | undefined, fallback: number = 0): number {
  if (!value) return fallback;
  
  const parsed = parseFloat(value);
  return isNaN(parsed) ? fallback : parsed;
}
