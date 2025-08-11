import { MondayApiResponse, Board } from '../types';

export function validateEnvironment(): { isValid: boolean; error?: string } {
  const token = process.env.MONDAY_API_TOKEN;
  
  if (!token) {
    return {
      isValid: false,
      error: 'MONDAY_API_TOKEN is not defined in environment variables'
    };
  }
  
  if (token.length < 10) {
    return {
      isValid: false,
      error: 'MONDAY_API_TOKEN appears to be invalid (too short)'
    };
  }
  
  return { isValid: true };
}

export function validateMondayResponse(result: MondayApiResponse): Board[] {
  if (result.errors && result.errors.length > 0) {
    const errorMessages = result.errors.map(err => err.message).join(', ');
    throw new Error(`Monday API returned errors: ${errorMessages}`);
  }

  if (!result.data?.boards) {
    throw new Error('No board data received from Monday API');
  }

  return result.data.boards;
}
