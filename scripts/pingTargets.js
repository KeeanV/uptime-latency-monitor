const axios = require('axios');


const targets = [
  { url: '', expectedStatus: 200 },
];

(async () => {
  for (const target of targets) {
    const start = Date.now();

    try {
      const response = await axios.get(target.url);
      const latency = Date.now() - start;

      if (response.status === target.expectedStatus) {
        console.log(`[OK] ${target.url} responded in ${latency}ms`);
      } else {
        console.log(`[WARN] ${target.url} returned unexpected status ${response.status} (expected ${target.expectedStatus})`);
      }

      // TODO: Save success result and latency to database

    } catch (err) {
      const latency = Date.now() - start;
      console.log(`[FAIL] ${target.url} failed after ${latency}ms: ${err.message}`);

      // TODO: Save failure result to database + trigger alert
    }
  }
})();
