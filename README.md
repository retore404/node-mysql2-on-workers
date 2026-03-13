# node-mysql2-on-workers

## Minimum reproduction procedure

**1. Start up MySQL Container**

```
docker compose up -d
```

**2. Start up worker app**

```
cd app
npm run dev
```

**3. access to worker app**

```
curl localhost:8787
```

Then, getting the error below.

```
✘ [ERROR] Error

      at Object.createConnectionPromise [as createConnection]
  (file:///workspaces/node-mysql2-on-workers/app/node_modules/mysql2/promise.js:19:31)
      at Array.<anonymous> (file:///workspaces/node-mysql2-on-workers/app/src/index.ts:7:34)
      at #dispatch
  (file:///workspaces/node-mysql2-on-workers/app/node_modules/hono/dist/hono-base.js:288:37)
      at Hono2.fetch
  (file:///workspaces/node-mysql2-on-workers/app/node_modules/hono/dist/hono-base.js:325:17)
      at fetchDispatcher
  (file:///workspaces/node-mysql2-on-workers/app/.wrangler/tmp/bundle-fKBSVp/middleware-loader.entry.ts:54:17)
      at __facade_invokeChain__
  (file:///workspaces/node-mysql2-on-workers/app/node_modules/wrangler/templates/middleware/common.ts:53:9)
      at Object.next
  (file:///workspaces/node-mysql2-on-workers/app/node_modules/wrangler/templates/middleware/common.ts:50:11)
      at jsonError
  (file:///workspaces/node-mysql2-on-workers/app/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts:22:30)
      at __facade_invokeChain__
  (file:///workspaces/node-mysql2-on-workers/app/node_modules/wrangler/templates/middleware/common.ts:53:9)
      at Object.next
  (file:///workspaces/node-mysql2-on-workers/app/node_modules/wrangler/templates/middleware/common.ts:50:11)
  {
    message: "Access denied for user 'test_user'@'172.19.0.1' (using password: YES)",
    code: 'ER_ACCESS_DENIED_ERROR',
    errno: 1045,
    sqlState: '28000'
  }
```

**4. Patch `caching_sha2_password.js`**

```diff
function encrypt(password, scramble, key) {
  const stage1 = xorRotating(Buffer.from(`${password}\0`, 'utf8'), scramble);
  return crypto.publicEncrypt(
    {
      key,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
+     oaepHash: 'sha1',
    },
    stage1
  );
}
```

**5. access to worker app again**

```
curl localhost:8787
```

-> No error occured.
