import { describe, expect, it, vi } from 'vitest';
import { client } from './index';

describe('VOICEVOX Client', () => {
  it('should export client', () => {
    expect(client).toBeDefined();
    expect(typeof client.GET).toBe('function');
    expect(typeof client.POST).toBe('function');
  });

  it('should request the default engine URL and parse JSON', async () => {
    const fetch = vi.fn<typeof globalThis.fetch>().mockResolvedValue(new Response('"0.25.0"'));

    const { data, error } = await client.GET('/version', { fetch });

    const request = fetch.mock.calls[0]?.[0] as Request;
    expect(request.url).toBe('http://localhost:50021/version');
    expect(request.method).toBe('GET');
    expect(data).toBe('0.25.0');
    expect(error).toBeUndefined();
  });

  it('should serialize typed query parameters for POST requests', async () => {
    const fetch = vi.fn<typeof globalThis.fetch>().mockResolvedValue(new Response('{}'));

    await client.POST('/audio_query', {
      params: { query: { text: 'こんにちは', speaker: 3 } },
      fetch,
    });

    const request = fetch.mock.calls[0]?.[0] as Request;
    const url = new URL(request.url);
    expect(request.method).toBe('POST');
    expect(url.pathname).toBe('/audio_query');
    expect(url.searchParams.get('text')).toBe('こんにちは');
    expect(url.searchParams.get('speaker')).toBe('3');
  });

  it('should return engine errors without throwing', async () => {
    const errorBody = { detail: [] };
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValue(new Response(JSON.stringify(errorBody), { status: 422 }));

    const { data, error, response } = await client.GET('/speakers', { fetch });

    expect(data).toBeUndefined();
    expect(error).toEqual(errorBody);
    expect(response.status).toBe(422);
  });
});
