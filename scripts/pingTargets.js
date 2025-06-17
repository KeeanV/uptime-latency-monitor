const fetch = require('node-fetch');
const supabase = require('../lib/supabaseClient');
const { URL } = require('url');

async function checkTarget(target) {
  const { id, url, expected_status } = target;
  let status_code = null;
  let latency_ms = null;
  let is_up = false;
  let error_message = null;

  try {
    const start = Date.now();
    const res = await fetch(url);
    const end = Date.now();

    status_code = res.status;
    latency_ms = end - start;
    is_up = res.status === expected_status;
  } catch (err) {
    error_message = err.message;
  }

  await supabase.from('logs').insert({
    target_id: id,
    response_time_ms: latency_ms,
    status_code,
    success: is_up,
    timestamp: new Date(),
  });
}

async function main() {
  const { data: targets, error } = await supabase.from('targets').select('*');
  if (error) {
    console.error('Failed to fetch targets:', error);
    return;
  }

  await Promise.all(targets.map(checkTarget));
}

main();
