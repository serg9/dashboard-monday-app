import { MondayApiResponse } from '../types';
import { MONDAY_API_URL, API_VERSION, BOARD_IDS, ITEMS_LIMIT, COLUMN_IDS } from '../constants';

export function buildMondayQuery(): string {
  return `
    query ($boardIds: [ID!]) {
      boards(ids: $boardIds) {
        id
        name
        items_page(limit: ${ITEMS_LIMIT}) {
          items {
            id
            name
            group {
              title
            }
            subitems {
              id
              name
              column_values(ids: ["${COLUMN_IDS.PERSON}", "${COLUMN_IDS.TIME_TRACKING}", "${COLUMN_IDS.RATE}"]) {
                id
                type
                text
                value
                ... on TimeTrackingValue {
                  running
                  duration
                  history {
                    started_at
                    ended_at
                    started_user_id
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}

export async function fetchMondayData(): Promise<MondayApiResponse> {
  const query = buildMondayQuery();
  const variables = { boardIds: Array.from(BOARD_IDS) };

  const response = await fetch(MONDAY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.MONDAY_API_TOKEN!,
      'API-Version': API_VERSION
    },
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    throw new Error(
      `Monday API request failed with status ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}
