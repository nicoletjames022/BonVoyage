// const http = require('http')
// const fs = require('fs')
// const PORT = 3100// create an HTTP server that handles HTTP requests; it is handed two parameters: the request and response objects
// const server = http.createServer((req, resp) => {
//     fs.readFile("web/index.html", function (error, page) {
//         if (error) {resp.writeHead(404);
//             resp.write('Contents you are looking are Not Found');
//         } 
//             else {resp.writeHead(200, { 'Content-Type': 'text/html' });
//             resp.write(page);
//         }resp.end();
//     })
// })
//     server.listen(PORT);
//     console.log(`HTTP Server is listening at port ${PORT} for HTTP GET requests`)

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js");

if (workbox) {
    console.log("Yay! Workbox is loaded !");
    workbox.precaching.precacheAndRoute([]);

    /*  cache images in the e.g others folder; edit to other folders you got
    and config in the sw-config.js file
    */
    workbox.routing.registerRoute(
        /(.*)others(.*)\.(?:png|gif|jpg)/,
        new workbox.strategies.CacheFirst({
            cacheName: "images",
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                })
            ]
        })
    );
    /* Make your JS and CSS âš¡ fast by returning the assets from the cache,
     while making sure they are updated in the background for the next use.
    */
    workbox.routing.registerRoute(
    // cache js, css, scc files
        /.*\.(?:css|js|scss|)/,
        // use cache but update in the background ASAP
        new workbox.strategies.StaleWhileRevalidate({
            // use a custom cache name
            cacheName: "assets",
        })
    );

    // cache google fonts
    workbox.routing.registerRoute(
        new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
        new workbox.strategies.CacheFirst({
            cacheName: "google-fonts",
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );

    // add offline analytics
    workbox.googleAnalytics.initialize();

    /* Install a new service worker and have it update
   and control a web page as soon as possible
    */

    workbox.core.skipWaiting();
    workbox.core.clientsClaim();

} else {
    console.log("Oops! Workbox didn't load ðŸ‘º");
}