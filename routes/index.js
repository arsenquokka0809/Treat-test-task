const { readdirSync } = require('fs');

/**
 * Routes
 * Main route functionality
 * @desc: generating express routes automatically using fs for reading directory 'routes'
 */
const routes = async (app) => {
    try {
        const routesJSON = {};

        const files = await readdirSync(__dirname);

        for (const fileName of files) {
            const routeLayer = fileName.replace('.route.js', '');

            const base = `/api/${routeLayer}`;
            const routeConfig = require(`./${fileName}`);

            routesJSON[routeLayer] = [];

            if (routeConfig.stack && routeConfig.stack.length) {
                for (const layer of routeConfig.stack) {
                    const method = Object.keys(layer.route.methods)[0];
                    if (method) {
                        routesJSON[routeLayer].push(
                            `${method.toUpperCase()} ${layer.route.path}`
                        );
                    }
                }
            }
            app.use(base, routeConfig);
        }

        app.use((err, req, res, next) => {
            next();
        });
    } catch (e) {
        console.log('routes/index.js -> routes() -> Error:', e);
    }
};

module.exports = routes;
