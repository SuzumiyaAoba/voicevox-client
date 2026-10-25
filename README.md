# @suzumiyaaoba/voicevox-client

[![CI](https://github.com/SuzumiyaAoba/voicevox-client/actions/workflows/ci.yml/badge.svg)](https://github.com/SuzumiyaAoba/voicevox-client/actions/workflows/ci.yml)
[![Security](https://github.com/SuzumiyaAoba/voicevox-client/actions/workflows/security.yml/badge.svg)](https://github.com/SuzumiyaAoba/voicevox-client/actions/workflows/security.yml)
[![npm version](https://badge.fury.io/js/%40suzumiyaaoba%2Fvoicevox-client.svg)](https://badge.fury.io/js/%40suzumiyaaoba%2Fvoicevox-client)
[![codecov](https://codecov.io/gh/SuzumiyaAoba/voicevox-client/branch/main/graph/badge.svg)](https://codecov.io/gh/SuzumiyaAoba/voicevox-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

VOICEVOX ENGINE OSS向けのTypeScriptクライアントライブラリです。`openapi-fetch` と `openapi-typescript` によりOpenAPIスキーマから型安全なクライアントを提供します。

## インストール

```bash
yarn add @suzumiyaaoba/voicevox-client
```

## 使用方法

### 基本的な使用例

```typescript
import client from '@suzumiyaaoba/voicevox-client';

// スピーカー一覧を取得
const speakersRes = await client.GET('/speakers');
console.log(speakersRes.data);

// 音声合成用のクエリを作成
const aqRes = await client.POST('/audio_query', {
  params: { query: { text: 'こんにちは', speaker: 3 } },
});

// 音声を合成（WAVをBlobで取得）
const synthRes = await client.POST('/synthesis', {
  params: { query: { speaker: 3 } },
  body: aqRes.data!,
  parseAs: 'blob',
});

const audioBlob = synthRes.data; // Blob
```

### その他のAPI

```typescript
import client from '@suzumiyaaoba/voicevox-client';

// エンジンのバージョンを取得
const versionRes = await client.GET('/version');
console.log(versionRes.data);

// 対応デバイス情報を取得
const devicesRes = await client.GET('/supported_devices');
console.log(devicesRes.data);

// ユーザー辞書の単語を取得
const dictRes = await client.GET('/user_dict');
console.log(dictRes.data);

// ユーザー辞書に単語を追加
const addRes = await client.POST('/user_dict_word', {
  params: {
    query: {
      surface: 'VOICEVOX',
      pronunciation: 'ボイスボックス',
      accent_type: 1,
    },
  },
});
console.log(addRes.data);
```

## API仕様

このライブラリは以下のVOICEVOX ENGINE APIエンドポイントをサポートしています：

- 音声合成関連（synthesis, audioQuery, etc.）
- スピーカー情報（speakers, speakerInfo）
- 歌唱音声合成（singFrameAudioQuery, frameSynthesis）
- ユーザー辞書（user_dict関連）
- プリセット管理（presets関連）
- その他（version, coreVersions, etc.）

詳細なAPI仕様については、[VOICEVOX ENGINE](https://github.com/VOICEVOX/voicevox_engine)のドキュメントを参照してください。

## 開発

### 依存関係のインストール

Node.js 22.22.2 以上の 22 系、24.15.0 以上の 24 系、または 26 以上を使用します。
Yarn は `package.json` の `packageManager` に固定しています。

```bash
corepack enable
yarn install --immutable
```

Corepack が付属しない Node.js では、先に `npm install --global --ignore-scripts corepack@0.36.0` を実行してください。
Git フックを使用する場合は、インストール後に `yarn prepare` を実行します。

### 依存関係の安全な更新

- 依存パッケージのインストールスクリプトを無効化し、公開から 7 日以上経過した版だけを採用します。
- Yarn の Hardened Mode とチェックサム検証を有効にし、CI では `yarn install --immutable --check-cache` でロックファイルと配布物を検証します。
- 直接依存は完全なバージョン番号、GitHub Actions はコミット SHA に固定します。更新時は公開日・差分・互換性を確認してください。
- Dependabot にも 7 日間の待機期間を設定し、自動承認・自動マージは行いません。Vitest 関連は同時に更新します。
- CI とリリースでは中程度以上の既知の脆弱性を検出したら停止します。PR では依存関係とライセンスの変更も検査します。
- `openapi-typescript@7.13.0` は TypeScript 5 のコンパイラ API を使用するため、TypeScript は互換性のある最新の 5.9.3 に固定しています。

更新後は `yarn generate`、`yarn format`、`yarn test:run`、`yarn test:coverage`、`yarn build:dual`、`yarn tsc --noEmit`、`yarn npm audit --all --recursive --severity moderate` を実行します。
待機期間やスクリプト制限を無効にして更新を通さないでください。

### テストの実行

```bash
# 通常のテスト実行
yarn test

# ワンタイムテスト実行
yarn test:run

# カバレッジ付きテスト
yarn test:coverage

# UI付きテスト
yarn test:ui
```

### ビルド

```bash
# ESMビルド
yarn build

# ESM + CJS デュアルビルド
yarn build:dual
```

### コードフォーマット

```bash
# チェックのみ
yarn check

# 自動修正
yarn fix
```

### スキーマの更新

```bash
# ローカルのVOICEVOXサーバーからスキーマを更新
yarn update-schema
```

## ライセンス

MIT

## 貢献

プルリクエストや Issue の報告は歓迎です。

## 関連プロジェクト

- [VOICEVOX](https://voicevox.hiroshiba.jp/)
- [VOICEVOX ENGINE](https://github.com/VOICEVOX/voicevox_engine)
- `openapi-fetch`（`https://github.com/drwpow/openapi-fetch`）
- `openapi-typescript`（`https://github.com/drwpow/openapi-typescript`）
