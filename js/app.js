requirejs.config({
    baseUrl: "./js/lib",
    paths: {
        jquery: "./node_modules/jquery/dist/jquery.min",
        app: "../app"
    }
})
requirejs(['app/index'])
