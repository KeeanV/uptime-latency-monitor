require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const pingTargets = require('../scripts/pingTargets');
pingTargets();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

(async () => {
  const { data: targets, error } = await supabase.from('targets').select('*');
  if (error) {
    console.error('Error fetching targets:', error.message);
    return;
  }

  for (const target of targets) {
    const result = await pingTargets(target.url, target.expected_status);
    await supabase.from('logs').insert({
      target_id: target.id,
      status_code: result.status,
      response_time_ms: result.latency,
      success: result.isUp,
    });
    console.log(`Logged result for ${target.url}`);
  }
})();
