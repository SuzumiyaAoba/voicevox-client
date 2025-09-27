import { describe, expect, it, vi } from 'vitest';
import {
  audioQuery,
  CorsPolicyMode,
  coreVersions,
  getPortalPage,
  SpeakerStyleType,
  speakers,
  synthesis,
  version,
  WordTypes,
} from './index.js';

// fetchのモック
global.fetch = vi.fn();

describe('VOICEVOX Client', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Basic API calls', () => {
    it('should call getPortalPage', async () => {
      const mockResponse = {
        data: '<html>Portal Page</html>',
        status: 200,
        headers: new Headers(),
      };

      (fetch as any).mockResolvedValueOnce({
        status: 200,
        text: () => Promise.resolve(JSON.stringify('<html>Portal Page</html>')),
        headers: new Headers(),
      });

      const result = await getPortalPage();

      expect(fetch).toHaveBeenCalledWith('/', {
        method: 'GET',
      });
      expect(result.status).toBe(200);
    });

    it('should call version endpoint', async () => {
      const mockVersion = '0.14.0';

      (fetch as any).mockResolvedValueOnce({
        status: 200,
        text: () => Promise.resolve(JSON.stringify(mockVersion)),
        headers: new Headers(),
      });

      const result = await version();

      expect(fetch).toHaveBeenCalledWith('/version', {
        method: 'GET',
      });
      expect(result.status).toBe(200);
    });

    it('should call speakers endpoint', async () => {
      const mockSpeakers = [
        {
          name: 'ずんだもん',
          speaker_uuid: 'test-uuid',
          styles: [
            {
              id: 3,
              name: 'ノーマル',
              type: SpeakerStyleType.talk,
            },
          ],
          version: '1.0.0',
        },
      ];

      (fetch as any).mockResolvedValueOnce({
        status: 200,
        text: () => Promise.resolve(JSON.stringify(mockSpeakers)),
        headers: new Headers(),
      });

      const result = await speakers();

      expect(fetch).toHaveBeenCalledWith('/speakers', {
        method: 'GET',
      });
      expect(result.status).toBe(200);
    });

    it('should call audioQuery endpoint with params', async () => {
      const mockAudioQuery = {
        accent_phrases: [],
        speedScale: 1.0,
        pitchScale: 0.0,
        intonationScale: 1.0,
        volumeScale: 1.0,
        prePhonemeLength: 0.1,
        postPhonemeLength: 0.1,
        outputSamplingRate: 24000,
        outputStereo: false,
      };

      (fetch as any).mockResolvedValueOnce({
        status: 200,
        text: () => Promise.resolve(JSON.stringify(mockAudioQuery)),
        headers: new Headers(),
      });

      const params = { text: 'こんにちは', speaker: 3 };
      const result = await audioQuery(params);

      expect(fetch).toHaveBeenCalledWith(
        '/audio_query?text=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF&speaker=3',
        {
          method: 'POST',
        }
      );
      expect(result.status).toBe(200);
    });

    it('should call synthesis endpoint', async () => {
      const mockAudioQuery = {
        accent_phrases: [],
        speedScale: 1.0,
        pitchScale: 0.0,
        intonationScale: 1.0,
        volumeScale: 1.0,
        prePhonemeLength: 0.1,
        postPhonemeLength: 0.1,
        outputSamplingRate: 24000,
        outputStereo: false,
      };

      const mockBlob = new Blob(['audio data'], { type: 'audio/wav' });

      (fetch as any).mockResolvedValueOnce({
        status: 200,
        text: () => Promise.resolve(JSON.stringify(mockBlob)),
        headers: new Headers(),
      });

      const params = { speaker: 3 };
      const result = await synthesis(mockAudioQuery, params);

      expect(fetch).toHaveBeenCalledWith('/synthesis?speaker=3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockAudioQuery),
      });
      expect(result.status).toBe(200);
    });
  });

  describe('Constants', () => {
    it('should export CorsPolicyMode constants', () => {
      expect(CorsPolicyMode.all).toBe('all');
      expect(CorsPolicyMode.localapps).toBe('localapps');
    });

    it('should export SpeakerStyleType constants', () => {
      expect(SpeakerStyleType.talk).toBe('talk');
      expect(SpeakerStyleType.singing_teacher).toBe('singing_teacher');
      expect(SpeakerStyleType.frame_decode).toBe('frame_decode');
      expect(SpeakerStyleType.sing).toBe('sing');
    });

    it('should export WordTypes constants', () => {
      expect(WordTypes.PROPER_NOUN).toBe('PROPER_NOUN');
      expect(WordTypes.COMMON_NOUN).toBe('COMMON_NOUN');
      expect(WordTypes.VERB).toBe('VERB');
      expect(WordTypes.ADJECTIVE).toBe('ADJECTIVE');
      expect(WordTypes.SUFFIX).toBe('SUFFIX');
    });
  });

  describe('URL generation', () => {
    it('should generate core versions URL', async () => {
      const mockVersions = ['0.14.0', '0.13.0'];

      (fetch as any).mockResolvedValueOnce({
        status: 200,
        text: () => Promise.resolve(JSON.stringify(mockVersions)),
        headers: new Headers(),
      });

      await coreVersions();

      expect(fetch).toHaveBeenCalledWith('/core_versions', {
        method: 'GET',
      });
    });
  });

  describe('Error handling', () => {
    it('should handle HTTP error responses', async () => {
      (fetch as any).mockResolvedValueOnce({
        status: 422,
        text: () => Promise.resolve(JSON.stringify({ detail: 'Validation error' })),
        headers: new Headers(),
      });

      const result = await version();

      expect(result.status).toBe(422);
    });

    it('should handle network errors', async () => {
      (fetch as any).mockRejectedValueOnce(new Error('Network error'));

      await expect(version()).rejects.toThrow('Network error');
    });
  });
});
