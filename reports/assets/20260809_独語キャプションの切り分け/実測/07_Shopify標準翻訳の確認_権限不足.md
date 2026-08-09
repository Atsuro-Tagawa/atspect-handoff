# 07_Shopify標準翻訳の確認_権限不足

```text
■ ストアのロケール＝当トークンの権限では読めない（read_locales なし）＝★未確認と記録する

■ 商品の翻訳資産（Shopify標準の翻訳）に独語が入っているか
file:///C:/Users/ataga/atspect-system/scripts/_readonly-locale-check-20260809.mjs:7
  const j = await r.json(); if (j.errors) throw new Error(JSON.stringify(j.errors)); return j.data;
                                                ^

Error: [{"message":"Access denied for translatableResource field. Required access: `read_translations` access scope.","locations":[{"line":1,"column":17}],"extensions":{"code":"ACCESS_DENIED","documentation":"https://shopify.dev/api/usage/access-scopes","requiredAccess":"`read_translations` access scope."},"path":["translatableResource"]}]
    at gql (file:///C:/Users/ataga/atspect-system/scripts/_readonly-locale-check-20260809.mjs:7:49)
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
    at async file:///C:/Users/ataga/atspect-system/scripts/_readonly-locale-check-20260809.mjs:23:14

Node.js v24.15.0
```
