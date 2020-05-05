

const nextConfig = {
    // Copy env variables to client side
    env: {
        BLOGGABLE_CONTENT_URL: process.env.BLOGGABLE_CONTENT_URL,
    },

    poweredByHeader: false,



};

module.exports = nextConfig;
