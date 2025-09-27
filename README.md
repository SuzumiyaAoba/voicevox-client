# @suzumiyaaoba/voicevox-client

[![CI](https://github.com/SuzumiyaAoba/voicevox-client/actions/workflows/ci.yml/badge.svg)](https://github.com/SuzumiyaAoba/voicevox-client/actions/workflows/ci.yml)
[![Security](https://github.com/SuzumiyaAoba/voicevox-client/actions/workflows/security.yml/badge.svg)](https://github.com/SuzumiyaAoba/voicevox-client/actions/workflows/security.yml)
[![npm version](https://badge.fury.io/js/%40suzumiyaaoba%2Fvoicevox-client.svg)](https://badge.fury.io/js/%40suzumiyaaoba%2Fvoicevox-client)
[![codecov](https://codecov.io/gh/SuzumiyaAoba/voicevox-client/branch/main/graph/badge.svg)](https://codecov.io/gh/SuzumiyaAoba/voicevox-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

VOICEVOX ENGINE OSS向けのTypeScriptクライアントライブラリです。[Orval](https://orval.dev)を使用してOpenAPIスキーマから自動生成されています。

## インストール

```bash
npm install @suzumiyaaoba/voicevox-client
```

## 使用方法

### 基本的な使用例

```typescript
import { speakers, audioQuery, synthesis } from '@suzumiyaaoba/voicevox-client';

// スピーカー一覧を取得
const speakersResponse = await speakers();
console.log(speakersResponse.data);

// 音声合成用のクエリを作成
const audioQueryResponse = await audioQuery({
  text: 'こんにちは',
  speaker: 3
});

// 音声を合成
const synthesisResponse = await synthesis(audioQueryResponse.data, {
  speaker: 3
});

// Blobとして音声データを取得
const audioBlob = synthesisResponse.data;
```

### その他のAPI

```typescript
import { 
  version, 
  coreVersions, 
  supportedDevices,
  getUserDictWords,
  addUserDictWord
} from '@suzumiyaaoba/voicevox-client';

// エンジンのバージョンを取得
const versionResponse = await version();
console.log(versionResponse.data);

// 対応デバイス情報を取得
const devicesResponse = await supportedDevices();
console.log(devicesResponse.data);

// ユーザー辞書の単語を取得
const dictWordsResponse = await getUserDictWords();
console.log(dictWordsResponse.data);
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
- [Orval](https://orval.dev)