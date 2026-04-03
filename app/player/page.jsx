'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Player() {
  const params = useSearchParams();

  const name = params.get('name');
  const url = params.get('url');
  const key = params.get('key');

  useEffect(() => {
    const load = async () => {
      const shaka = await import('shaka-player/dist/shaka-player.compiled.js');
      const video = document.getElementById('video');
      const player = new shaka.default.Player(video);

      if (key) {
        const [kid, k] = key.split(':');
        player.configure({ drm: { clearKeys: { [kid]: k } } });
      }

      try {
        await player.load(url);
      } catch (e) {
        console.error(e);
      }
    };

    if (url) load();
  }, [url]);

  return (
    <div style={{ padding: 20 }}>
      <h1>{name}</h1>
      <video id="video" controls autoPlay style={{ width: '100%' }} />
    </div>
  );
}
