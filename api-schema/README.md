# API Schema

このディレクトリには VOICEVOX API の OpenAPI スキーマファイルを配置してください。

## ファイル配置

API スキーマファイルを以下の名前で配置：

```
api-schema/openapi.json
```

## スキーマファイル取得後の手順

1. スキーマファイルを配置
2. API クライアントを生成:
   ```bash
   yarn generate
   ```

これで `src/types.ts` と `src/client.ts` にタイプセーフな API クライアントが生成されます。
