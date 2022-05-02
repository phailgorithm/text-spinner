const { Directus } = require("@directus/sdk");

// treating the directus instance as a singleton
const directus = new Directus(process.env.DIRECTUS_URL, {
    auth: {
        autoRefresh: false
    }

});

module.exports = directus;
