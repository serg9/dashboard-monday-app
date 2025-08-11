import { NextResponse } from 'next/server';
import { ApiResponse } from './types';

import { processUserWorkloads, processUserFinancials } from './utils/data-processing';
import { validateEnvironment, validateMondayResponse } from './utils/validation';
import { fetchMondayData } from './utils/monday-api';

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    const envValidation = validateEnvironment();
    if (!envValidation.isValid) {
      return NextResponse.json({
        success: false,
        error: envValidation.error,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    const apiResponse = await fetchMondayData();
    const boards = validateMondayResponse(apiResponse);

    const [userWorkloads, userFinancials] = await Promise.all([
      Promise.resolve(processUserWorkloads(boards)),
      Promise.resolve(processUserFinancials(boards))
    ]);

    return NextResponse.json({
      success: true,
      data: {
        raw: { boards },
        userWorkloads,
        userFinancials
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 