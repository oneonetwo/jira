const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": "rgb(0, 82, 204)",
                            "@link-color": "#1DA57A",
                            "@border-radius-base": "2px"
                        },
                        javascriptEnabled: true
                    }
                }
            }
        }
    ]
};