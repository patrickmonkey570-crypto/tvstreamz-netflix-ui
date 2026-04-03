'use client';
import { useEffect, useState } from 'react';
import { parseM3U } from './lib/m3u';
import Link from 'next/link';

export default function Home() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetch('/playlist.m3u')
      .then(res => res.text())
      .then(text => setChannels(parseM3U(text)));
  }, []);

  return (
    <div className="p-6">
      <h1 style={{ fontSize: 32, fontWeight: 'bold' }}>🎬 Live TV</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))',
        gap: 20,
        marginTop: 20
      }}>
        {channels.map((ch, i) => (
          <Link key={i}
            href={`/player?name=${encodeURIComponent(ch.name)}&url=${encodeURIComponent(ch.url)}&logo=${encodeURIComponent(ch.logo)}&key=${ch.licenseKey || ''}`}>
            <div style={{
              background: "#14141a",
              padding: 10,
              borderRadius: 12,
              transition: '0.3s'
            }}>
              <img src={ch.logo} style={{ height: 100, width: '100%', objectFit: 'contain' }} />
              <p>{ch.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
