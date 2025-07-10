import axios from 'axios';
import { supabase } from '../backend/lib/supabaseClient.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(fileURLToPath(import.meta.url), '../../.env') });

const PINGER_USER_ID = process.env.PINGER_USER_ID || 'default-pinger-user';

console.log(`[Ping Script] Starting ping process for user: ${PINGER_USER_ID}`);

/**
 * Pings a single URL and returns its status, latency, and success.
 * @param {string} url - The URL to ping.
 * @param {number} expectedStatus - The expected HTTP status code for a successful ping.
 * @returns {object} - Ping result object.
 */
async function pingUrl(url, expectedStatus = 200) {
  const start = Date.now();
  try {
    const response = await axios.get(url, { timeout: 10000 }); 
    const latency = Date.now() - start;
    return {
      url,
      status: response.status,
      latency,
      isUp: response.status === expectedStatus,
      error: null,
    };
  } catch (error) {
    const latency = Date.now() - start;
    return {
      url,
      status: error.response?.status || 0, 
      latency,
      isUp: false,
      error: error.message,
    };
  }
}

/**
 * Main function to fetch targets, ping them, and log results to Supabase.
 */
export async function runPingProcess() { // Exported for backend/index.js
  try {
    // 1. Fetch targets from Supabase for the PINGER_USER_ID
    const { data: targets, error: fetchError } = await supabase
      .from('targets')
      .select('*')
      .eq('user_id', PINGER_USER_ID); // Filter by user_id

    if (fetchError) {
      console.error('[Ping Script] Error fetching targets:', fetchError.message);
      return;
    }

    if (!targets || targets.length === 0) {
      console.log('[Ping Script] No targets found for this user. Exiting.');
      return;
    }

    console.log(`[Ping Script] Found ${targets.length} targets to ping.`);

    // 2. Ping each URL and record results
    for (const target of targets) {
      console.log(`[Ping Script] Pinging ${target.url}...`);
      const result = await pingUrl(target.url, target.expected_status);

      // 3. Insert log into Supabase
      const { data: logData, error: insertError } = await supabase
        .from('logs')
        .insert({
          target_id: target.id,
          timestamp: new Date().toISOString(), 
          response_time_ms: result.latency,
          status_code: result.status,
          success: result.isUp,
          error_message: result.error,
          user_id: PINGER_USER_ID, 
        });

      if (insertError) {
        console.error(`[Ping Script] Error inserting log for ${target.url}:`, insertError.message);
      } else {
        console.log(`[Ping Script] Logged for ${target.url}: Status=${result.status}, Latency=${result.latency}ms, Success=${result.isUp}`);
      }
    }
    console.log('[Ping Script] All targets pinged successfully.');
  } catch (mainError) {
    console.error('[Ping Script] An unhandled error occurred in runPingProcess:', mainError);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runPingProcess();
}