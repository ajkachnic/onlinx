const http = require("http");
const url = require("url");
const codes = require('./codes.min.js')

function groupBy(arr, prop) {
    let grouped = {};
    for (let i = 0; i < arr.length; i++) {
        if (!grouped[arr[i][prop]]) {
            grouped[arr[i][prop]] = []
        }
        grouped[arr[i][prop]].push(arr[i])
    }
    return grouped;
}
const onlinx = () => {
    let routes = [];

    let types = {
        'html':'text/html',
        '.html':'text/html',
        'json':'application/json',
        'png':'image/png'
    }

    return {
        /**
         * @param {object} json - The Object taken and used to create routes
         * @param {function} [callback] - The callback function to be called on the route
         */
        route: (json, callback) => {
            routes.push({
                route: json.route,
                method: json.method,
                listener: callback ? callback : json.listener
            })
        },
        /**
         * Used to setuo the HTTP server and establish routes
         * @param {int} port - The port the server is hosted on
         * @param {function} callback - The callback function called after the server is setup. Passed two arguements, req and res
         */
        listen: (port, callback) => {
            const server = http.createServer(async (req, res) => {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                const parsed = url.parse(req.url, true)
                const newReq = {
                    ...parsed,
                    ...req,
                    body: body
                }
                const newRes = {
                    send: val => {
                        res.write(val);
                        res.end()
                    },
                    status: val => {
                        res.writeHead(val);
                    },
                    sendStatus: val => {
                        res.writeHead(val);
                        res.write(codes[val]);
                        res.end();
                    },
                    set: (key, val) => res.setHeader(key, val),
                    type:(type) => res.setHeader('Content-Type', types[type]),
                    ...res,
                }

                const methodsArrs = groupBy(routes, "method")
                if (methodsArrs[req.method]) {
                    methodsArrs[req.method].map(val => {
                        if (val.route == parsed.pathname) {
                            val.listener(newReq, newRes);
                        }
                    });
                }
            })
            server.listen(port, callback);
        }
    }
}



module.exports = onlinx;