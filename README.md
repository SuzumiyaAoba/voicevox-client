# @suzumiyaaoba/voicevox-client

[![CI](https://github.com/SuzumiyaAoba/voicevox-client/actions/workflows/ci.yml/badge.svg)](https://github.com/SuzumiyaAoba/voicevox-client/actions/workflows/ci.yml)
[![Security](https://github.com/SuzumiyaAoba/voicevox-client/actions/workflows/security.yml/badge.svg)](https://github.com/SuzumiyaAoba/voicevox-client/actions/workflows/security.yml)
[![npm version](https://badge.fury.io/js/%40suzumiyaaoba%2Fvoicevox-client.svg)](https://badge.fury.io/js/%40suzumiyaaoba%2Fvoicevox-client)
[![codecov](https://codecov.io/gh/SuzumiyaAoba/voicevox-client/branch/main/graph/badge.svg)](https://codecov.io/gh/SuzumiyaAoba/voicevox-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

VOICEVOX ENGINE OSS向けのTypeScriptクライアントライブラリです。`openapi-fetch` と `openapi-typescript` によりOpenAPIスキーマから型安全なクライアントを提供します。

## インストール

```bash
npm install @suzumiyaaoba/voicevox-client
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

```bash
npm install
```

### テストの実行

```bash
# 通常のテスト実行
npm run test

# ワンタイムテスト実行
npm run test:run

# カバレッジ付きテスト
npm run test:coverage

# UI付きテスト
npm run test:ui
```

### ビルド

```bash
# ESMビルド
npm run build

# ESM + CJS デュアルビルド
npm run build:dual
```

### コードフォーマット

```bash
# チェックのみ
npm run check

# 自動修正
npm run fix
```

### スキーマの更新

```bash
# ローカルのVOICEVOXサーバーからスキーマを更新
npm run update-schema
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