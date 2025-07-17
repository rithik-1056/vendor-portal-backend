const axios = require('axios');
const { baseUrl, username, password } = require('../config/sapConnectionConfig');

exports.callOData = async (endpoint, method = 'GET', data = null) => {
  const url = `${baseUrl}${endpoint}`;
  const config = {
    method,
    url,
    auth: {
      username,
      password,
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data
  };

  try {
    const response = await axios(config);
    return response.data.d?.results || response.data.d;
  } catch (error) {
    console.error(`[SAP OData Error]:`, error.response?.data?.error?.message?.value || error.message);
    throw new Error('SAP OData Error');
  }
};
