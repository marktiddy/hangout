const handler = require("./handler")
// @ponicode
describe("handler.getAccessToken", () => {
    test("0", async () => {
        await handler.getAccessToken({ pathParameters: { code: 0 } })
    })

    test("1", async () => {
        await handler.getAccessToken({ pathParameters: { code: "function(code) {\n\t\t\t\treturn I.mode === 'client' || !Basic.arrayDiff(code, [200, 404]);\n\t\t\t}" } })
    })

    test("2", async () => {
        await handler.getAccessToken({ pathParameters: { code: "function log(code) {\n        var args = [];\n        for (var _i = 1; _i < arguments.length; _i++) {\n            args[_i - 1] = arguments[_i];\n        }\n        console.log(utils.tr.apply(null, arguments));\n    }\n" } })
    })

    test("3", async () => {
        await handler.getAccessToken({ pathParameters: { code: 0.0 } })
    })

    test("4", async () => {
        await handler.getAccessToken({ pathParameters: { code: "function unescape(code) {\n        return code.replace(/\\\\('|\\\\)/g, \"$1\").replace(/[\\r\\t\\n]/g, \" \");\n    }" } })
    })

    test("5", async () => {
        await handler.getAccessToken(undefined)
    })
})

// @ponicode
describe("handler.refreshAccessToken", () => {
    test("0", async () => {
        await handler.refreshAccessToken(true)
    })

    test("1", async () => {
        await handler.refreshAccessToken(false)
    })

    test("2", async () => {
        await handler.refreshAccessToken(undefined)
    })
})
