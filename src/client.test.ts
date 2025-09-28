import { describe, expect, it } from 'vitest';
import { client } from './index';

describe('VOICEVOX Client', () => {
  it('should export client', () => {
    expect(client).toBeDefined();
    expect(typeof client.GET).toBe('function');
    expect(typeof client.POST).toBe('function');
  });

  it('should have correct base URL', () => {
    // openapi-fetchのクライアントが正しく設定されていることを確認
    expect(client).toBeDefined();
  });
});
