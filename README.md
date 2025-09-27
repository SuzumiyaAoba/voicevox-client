# VOICEBOX Client

VOICEVOX API の TypeScript クライアントライブラリ

## 前提条件

- [Nix](https://nixos.org/download/) がインストールされていること
- [Docker](https://www.docker.com/) が動作していること（VOICEVOX API サーバー用）

## 開発環境のセットアップ

### 1. Nix 開発環境への入場

```bash
nix develop
```

または direnv を使用している場合：

```bash
direnv allow
```

### 2. 依存関係のインストール

```bash
bun install
```

### 3. VOICEVOX API サーバーの起動

```bash
bun run voicevox:start
```

サーバーが起動したら、http://localhost:50021/docs でAPI仕様を確認できます。

## OpenAPI スキーマの更新

### GitHub から最新スキーマを取得（推奨）

```bash
bun run update-schema
```

### ローカルサーバーからスキーマを取得

```bash
# 先にVOICEVOX APIサーバーを起動
bun run voicevox:start

# ローカルサーバーからスキーマを取得
bun run update-schema:local
```

どちらのコマンドも、スキーマ取得後に自動的にAPIクライアントを再生成します。

## 使用方法

### API クライアントの生成

API スキーマファイルを `api-schema/openapi.json` に配置してから：

```bash
bun run generate
```

### 開発モードでの実行

```bash
bun run dev
```

### ビルド

```bash
bun run build
```

## 利用可能なコマンド

| コマンド | 説明 |
|----------|------|
| `bun run dev` | 開発モードで実行（ファイル監視あり） |
| `bun run build` | プロダクション用ビルド |
| `bun run generate` | orval で API クライアントを生成 |
| `bun run update-schema` | GitHub から OpenAPI スキーマを更新し、APIクライアントを再生成 |
| `bun run update-schema:local` | ローカルサーバーから OpenAPI スキーマを更新し、APIクライアントを再生成 |
| `bun run check` | コードの静的解析（Biome） |
| `bun run format` | コードフォーマット |
| `bun run test` | テスト実行 |
| `bun run voicevox:start` | VOICEVOX API サーバー起動 |
| `bun run voicevox:stop` | VOICEVOX API サーバー停止 |
| `bun run voicevox:logs` | VOICEVOX API サーバーのログ表示 |

## ディレクトリ構造

```
.
├── api-schema/          # OpenAPI スキーマファイル
├── src/
│   ├── api/
│   │   ├── generated.ts # 生成された API クライアント
│   │   └── mutator.ts   # HTTP クライアント設定
│   ├── client.ts        # クライアントラッパー
│   └── index.ts         # メインエクスポート
├── flake.nix           # Nix 環境設定
├── docker-compose.yml  # VOICEVOX API サーバー設定
├── orval.config.ts     # API クライアント生成設定
└── biome.json          # リンター・フォーマッター設定
```

## 開発ガイドライン

- [[memory:5943006]] アロー関数を使用する
- [[memory:5689662]] Biome を使用してコードの品質を保つ
- [[memory:5689715]] 生成されたコードは `bun run check` の対象外
- コミット前に自動的にlint-stagedによる品質チェックが実行される

## ライセンス

MIT
