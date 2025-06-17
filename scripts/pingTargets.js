const axios = require('axios');

module.exports = async function pingTarget(url, expectedStatus = 200) {
  const start = Date.now();
  try {
    const response = await axios.get(url);
    const latency = Date.now() - start;
    return {
      url,
      status: response.status,
      latency,
      isUp: response.status === expectedStatus,
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
};
