export function parseM3U(m3u) {
  const lines = m3u.split('\n');
  const channels = [];
  let current = {};

  lines.forEach(line => {
    line = line.trim();

    if (line.startsWith('#EXTINF:')) {
      const name = line.match(/,(.+)$/)?.[1];
      const logo = line.match(/tvg-logo="([^"]+)"/)?.[1];

      current = {
        name: name || 'Unknown',
        logo: logo || ''
      };
    } else if (line.includes('license_key')) {
      current.licenseKey = line.split('=')[1];
    } else if (line.startsWith('http')) {
      current.url = line;
      channels.push({ ...current });
      current = {};
    }
  });

  return channels;
}
