const axios = require('axios');

exports.rebuildSite = async () => {
  await axios.post('https://api.netlify.com/build_hooks/5e4207320a25ca7d73f7b00e');
}
