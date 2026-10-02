import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // Read profile.jpg and crop to circular 180x180
  const profileBytes = await fs.readFile(path.join(process.cwd(), 'public', 'profile.jpg'));
  
  // Make a circular cropped avatar with high quality
  const avatarSize = 170;
  const circleMask = Buffer.from(
    `<svg width="${avatarSize}" height="${avatarSize}">
      <circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}" fill="#ffffff" />
    </svg>`
  );

  const circularAvatar = await sharp(profileBytes)
    .resize(avatarSize, avatarSize, { fit: 'cover' })
    .composite([
      {
        input: circleMask,
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();

  // Create SVG backdrop with high-end dark luxury tech aesthetic
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#080c16" />
        <stop offset="50%" stop-color="#0e172a" />
        <stop offset="100%" stop-color="#091224" />
      </linearGradient>

      <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="100%" stop-color="#2563eb" />
      </linearGradient>

      <linearGradient id="emeraldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#34d399" />
        <stop offset="100%" stop-color="#059669" />
      </linearGradient>

      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(255, 255, 255, 0.07)" />
        <stop offset="100%" stop-color="rgba(255, 255, 255, 0.02)" />
      </linearGradient>

      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="60" result="blur" />
      </filter>
    </defs>

    <!-- Base Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

    <!-- Ambient Glow Orbs -->
    <circle cx="200" cy="100" r="180" fill="#1e40af" opacity="0.35" filter="url(#glow)" />
    <circle cx="1050" cy="520" r="220" fill="#047857" opacity="0.25" filter="url(#glow)" />
    <circle cx="900" cy="120" r="160" fill="#0284c7" opacity="0.25" filter="url(#glow)" />

    <!-- Subtle Tech Grid Pattern -->
    <g opacity="0.08" stroke="#ffffff" stroke-width="1">
      <line x1="0" y1="105" x2="${width}" y2="105" />
      <line x1="0" y1="210" x2="${width}" y2="210" />
      <line x1="0" y1="315" x2="${width}" y2="315" />
      <line x1="0" y1="420" x2="${width}" y2="420" />
      <line x1="0" y1="525" x2="${width}" y2="525" />
      
      <line x1="150" y1="0" x2="150" y2="${height}" />
      <line x1="300" y1="0" x2="300" y2="${height}" />
      <line x1="450" y1="0" x2="450" y2="${height}" />
      <line x1="600" y1="0" x2="600" y2="${height}" />
      <line x1="750" y1="0" x2="750" y2="${height}" />
      <line x1="900" y1="0" x2="900" y2="${height}" />
      <line x1="1050" y1="0" x2="1050" y2="${height}" />
    </g>

    <!-- Outer Decorative Border -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="20" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5" />

    <!-- Avatar Glow Rings -->
    <circle cx="175" cy="225" r="92" fill="none" stroke="rgba(56, 189, 248, 0.3)" stroke-width="3" />
    <circle cx="175" cy="225" r="88" fill="none" stroke="#38bdf8" stroke-width="2" />

    <!-- Name & Professional Title -->
    <text x="300" y="180" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
      Shamim Ahmed Robin
    </text>

    <!-- Subtitle with gradient feel -->
    <text x="300" y="226" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="600" fill="#38bdf8" letter-spacing="0.2">
      Web Developer &amp; Digital Marketing Specialist
    </text>

    <text x="300" y="262" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="400" fill="#94a3b8">
      Founder &amp; Lead Developer of StyleSphere • E-commerce &amp; Full-Stack Solutions
    </text>

    <!-- Horizontal Divider -->
    <line x1="80" y1="340" x2="1120" y2="340" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5" />

    <!-- 3 Highlight Cards in Bottom Area -->
    <!-- Card 1: Web Development -->
    <rect x="80" y="375" width="320" height="180" rx="14" fill="url(#cardGrad)" stroke="rgba(56, 189, 248, 0.25)" stroke-width="1.2" />
    <circle cx="120" cy="415" r="16" fill="rgba(56, 189, 248, 0.15)" />
    <text x="113" y="421" font-family="monospace" font-size="16" font-weight="bold" fill="#38bdf8">&lt;/&gt;</text>
    <text x="148" y="422" font-family="system-ui, sans-serif" font-size="19" font-weight="700" fill="#ffffff">Web Engineering</text>
    <text x="104" y="460" font-family="system-ui, sans-serif" font-size="15" fill="#94a3b8">Next.js 15, React, TypeScript</text>
    <text x="104" y="488" font-family="system-ui, sans-serif" font-size="15" fill="#94a3b8">REST APIs &amp; Tailwind CSS</text>
    <text x="104" y="516" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#38bdf8">Fast • Responsive • Scalable</text>

    <!-- Card 2: Digital Marketing -->
    <rect x="440" y="375" width="320" height="180" rx="14" fill="url(#cardGrad)" stroke="rgba(52, 211, 153, 0.25)" stroke-width="1.2" />
    <circle cx="480" cy="415" r="16" fill="rgba(52, 211, 153, 0.15)" />
    <text x="474" y="422" font-family="system-ui, sans-serif" font-size="17" font-weight="bold" fill="#34d399">↗</text>
    <text x="508" y="422" font-family="system-ui, sans-serif" font-size="19" font-weight="700" fill="#ffffff">Growth &amp; Marketing</text>
    <text x="464" y="460" font-family="system-ui, sans-serif" font-size="15" fill="#94a3b8">Meta Ads (FB &amp; Instagram)</text>
    <text x="464" y="488" font-family="system-ui, sans-serif" font-size="15" fill="#94a3b8">CRO, Funnels &amp; Pixel Setup</text>
    <text x="464" y="516" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#34d399">Data-Driven Acquisition</text>

    <!-- Card 3: Experience & Location -->
    <rect x="800" y="375" width="320" height="180" rx="14" fill="url(#cardGrad)" stroke="rgba(168, 85, 247, 0.25)" stroke-width="1.2" />
    <circle cx="840" cy="415" r="16" fill="rgba(168, 85, 247, 0.15)" />
    <text x="834" y="422" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#c084fc">★</text>
    <text x="868" y="422" font-family="system-ui, sans-serif" font-size="19" font-weight="700" fill="#ffffff">StyleSphere &amp; Beyond</text>
    <text x="824" y="460" font-family="system-ui, sans-serif" font-size="15" fill="#94a3b8">Founder &amp; Lead Developer</text>
    <text x="824" y="488" font-family="system-ui, sans-serif" font-size="15" fill="#94a3b8">Sylhet, Bangladesh (Remote)</text>
    <text x="824" y="516" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#c084fc">Open for Collaborations</text>

    <!-- Live Website URL Badge Top Right -->
    <rect x="815" y="65" width="305" height="42" rx="21" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />
    <circle cx="837" cy="86" r="5" fill="#10b981" />
    <text x="852" y="92" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#f8fafc">
      shamimahmedrobin.vercel.app
    </text>
  </svg>
  `;

  // Composite the SVG with the circular avatar
  const finalImage = await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: circularAvatar,
        top: 225 - avatarSize / 2, // 140
        left: 175 - avatarSize / 2, // 90
      },
    ])
    .png({ quality: 95 })
    .toFile(path.join(process.cwd(), 'public', 'og-image.png'));

  console.log('Successfully generated public/og-image.png:', finalImage);
}

generateOgImage().catch(console.error);
