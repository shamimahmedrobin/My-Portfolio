import { PDFDocument, rgb, StandardFonts, PDFName, PDFString } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// Helper to add a clickable link annotation to the PDF page
function addLinkAnnotation(pdfDoc, page, url, rect) {
  const context = pdfDoc.context;
  const linkAnnot = context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: rect, // [x1, y1, x2, y2]
    Border: [0, 0, 0],
    A: {
      Type: 'Action',
      S: 'URI',
      URI: PDFString.of(url),
    },
  });
  const linkAnnotRef = context.register(linkAnnot);

  let annots = page.node.get(PDFName.of('Annots'));
  if (!annots) {
    annots = context.obj([]);
    page.node.set(PDFName.of('Annots'), annots);
  }
  annots.push(linkAnnotRef);
}

async function generateResumePdf() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard Letter dimensions (612 x 792 points)
  const width = 612;
  const height = 792;
  const page = pdfDoc.addPage([width, height]);

  // Load standard fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Left sidebar dimensions
  const sidebarWidth = 195;
  const sidebarColor = rgb(26 / 255, 52 / 255, 98 / 255); // Premium deep navy blue
  const mainX = sidebarWidth + 24;
  const mainWidth = width - mainX - 24;

  // Draw full-height sidebar background
  page.drawRectangle({
    x: 0,
    y: 0,
    width: sidebarWidth,
    height: height,
    color: sidebarColor,
  });

  // Embed profile photo
  try {
    const photoBytes = await fs.readFile(path.join(process.cwd(), 'public', 'profile.jpg'));
    const photoImage = await pdfDoc.embedJpg(photoBytes);
    const photoDim = 108;
    const photoX = (sidebarWidth - photoDim) / 2;
    const photoY = height - 138;

    // Draw white background / border for photo
    page.drawRectangle({
      x: photoX - 2,
      y: photoY - 2,
      width: photoDim + 4,
      height: photoDim + 4,
      color: rgb(1, 1, 1),
    });

    page.drawImage(photoImage, {
      x: photoX,
      y: photoY,
      width: photoDim,
      height: photoDim,
    });
  } catch (err) {
    console.warn('Could not embed photo:', err);
  }

  // --- PREPARE HIGH-RES ICONS FOR CONTACT ITEMS ---
  const iconSvgs = {
    mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    location: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><path fill="#ffffff" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 0 0 0-3 1.5 1.5 0 0 0 0 3m1.4 9.74v-8.37H5.06v8.37h2.8z"/></svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><path fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    globe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><path fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 0a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20"/></svg>`,
  };

  const embeddedIcons = {};
  for (const [key, svg] of Object.entries(iconSvgs)) {
    const pngBuf = await sharp(Buffer.from(svg)).png().toBuffer();
    embeddedIcons[key] = await pdfDoc.embedPng(pngBuf);
  }

  // --- LEFT SIDEBAR CONTENT ---
  let sideY = height - 156;
  const sideX = 18;
  const sideTextColor = rgb(1, 1, 1);
  const sideSubTextColor = rgb(220 / 255, 230 / 255, 245 / 255);
  const sideAccentColor = rgb(105 / 255, 150 / 255, 220 / 255);

  const drawSidebarSection = (title) => {
    sideY -= 18;
    page.drawText(title, {
      x: sideX,
      y: sideY,
      size: 10.5,
      font: fontBold,
      color: sideTextColor,
    });
    sideY -= 4;
    page.drawLine({
      start: { x: sideX, y: sideY },
      end: { x: sidebarWidth - 18, y: sideY },
      thickness: 0.8,
      color: sideAccentColor,
    });
    sideY -= 11;
  };

  // 1. CONTACT - Option 2: Sleek Clickable Icons + Short Handles
  drawSidebarSection('CONTACT');

  const contactItems = [
    {
      iconKey: 'mail',
      label: 'shamimahmedrobin5@gmail.com',
      url: 'mailto:shamimahmedrobin5@gmail.com',
      fontSize: 8.2,
    },
    {
      iconKey: 'phone',
      label: '+880 1887 353914',
      url: 'tel:+8801887353914',
      fontSize: 8.8,
    },
    {
      iconKey: 'location',
      label: 'Sylhet, Bangladesh',
      url: null,
      fontSize: 8.8,
    },
    {
      iconKey: 'linkedin',
      label: '/in/shamimahmedrobin',
      url: 'https://www.linkedin.com/in/shamimahmedrobin',
      fontSize: 8.8,
    },
    {
      iconKey: 'github',
      label: '/shamimahmedrobin',
      url: 'https://github.com/shamimahmedrobin',
      fontSize: 8.8,
    },
    {
      iconKey: 'globe',
      label: 'shamimahmedrobin.vercel.app',
      url: 'https://shamimahmedrobin.vercel.app',
      fontSize: 8.2,
    },
  ];

  const iconDim = 10;
  for (const item of contactItems) {
    const iconImg = embeddedIcons[item.iconKey];
    const itemY = sideY;

    // Draw crisp icon
    if (iconImg) {
      page.drawImage(iconImg, {
        x: sideX,
        y: itemY - 1,
        width: iconDim,
        height: iconDim,
      });
    }

    // Draw handle text
    const textX = sideX + iconDim + 6;
    page.drawText(item.label, {
      x: textX,
      y: itemY,
      size: item.fontSize,
      font: fontRegular,
      color: sideSubTextColor,
    });

    // If clickable, attach interactive LinkAnnotation covering the entire row (icon + handle)
    if (item.url) {
      const textWidth = fontRegular.widthOfTextAtSize(item.label, item.fontSize);
      addLinkAnnotation(pdfDoc, page, item.url, [
        sideX - 2,
        itemY - 3,
        textX + textWidth + 4,
        itemY + iconDim + 3,
      ]);
    }

    sideY -= 16;
  }

  // 2. SKILLS
  drawSidebarSection('SKILLS');
  const skills = [
    'Next.js, React, TypeScript',
    'Tailwind CSS, HTML5, CSS3, JS',
    'Node.js, Express, REST APIs',
    'Git, GitHub, VS Code, Postman',
    'Meta Ads (Facebook & Instagram)',
    'CRO & Funnel Design',
    'Pixel Setup, CAPI, Analytics',
  ];
  for (const s of skills) {
    page.drawText('•', { x: sideX, y: sideY, size: 8.5, font: fontBold, color: rgb(140 / 255, 195 / 255, 255 / 255) });
    page.drawText(s, {
      x: sideX + 9,
      y: sideY,
      size: 8.6,
      font: fontRegular,
      color: sideSubTextColor,
    });
    sideY -= 15.5;
  }

  // 3. LANGUAGES
  drawSidebarSection('LANGUAGES');
  const languages = [
    { name: 'Bengali', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Hindi', level: 'Conversational' },
  ];
  for (const l of languages) {
    page.drawText(`${l.name}: `, { x: sideX, y: sideY, size: 8.8, font: fontBold, color: sideTextColor });
    const nameWidth = fontBold.widthOfTextAtSize(`${l.name}: `, 8.8);
    page.drawText(l.level, { x: sideX + nameWidth, y: sideY, size: 8.8, font: fontRegular, color: sideSubTextColor });
    sideY -= 16;
  }

  // 4. CERTIFICATES
  drawSidebarSection('CERTIFICATES');
  const certificates = [
    { title: 'Full Stack Web Developer Course –', issuer: 'Programming Hero' },
    { title: 'UI/UX Specialization Course –', issuer: 'Bangladesh Government' },
    { title: 'E-commerce Strategy & Operations –', issuer: 'e-CAB' },
  ];
  for (let i = 0; i < certificates.length; i++) {
    const cert = certificates[i];
    page.drawText('•', { x: sideX, y: sideY, size: 8.5, font: fontBold, color: rgb(140 / 255, 195 / 255, 255 / 255) });
    page.drawText(cert.title, { x: sideX + 9, y: sideY, size: 8.4, font: fontBold, color: sideTextColor });
    sideY -= 12;
    page.drawText(cert.issuer, { x: sideX + 9, y: sideY, size: 8, font: fontRegular, color: sideSubTextColor });
    if (i < certificates.length - 1) {
      sideY -= 16;
    }
  }
  sideY -= 18; // Generous breathing space above OVERALL VERDICT

  // 5. OVERALL VERDICT
  drawSidebarSection('OVERALL VERDICT');
  const verdicts = [
    { label: 'Design', score: '8.5/10', val: 8.5 },
    { label: 'Content', score: '9.5/10', val: 9.5 },
    { label: 'Credibility/Consistency', score: '8/10', val: 8.0 },
    { label: 'Potential after Revision', score: '9/10', val: 9.0 },
  ];

  const barWidth = sidebarWidth - sideX - 18; // 159

  for (let i = 0; i < verdicts.length; i++) {
    const v = verdicts[i];
    // Label
    page.drawText(v.label, {
      x: sideX,
      y: sideY,
      size: 8.2,
      font: fontBold,
      color: sideSubTextColor,
    });

    // Score on right
    const scoreW = fontBold.widthOfTextAtSize(v.score, 8.2);
    page.drawText(v.score, {
      x: sidebarWidth - 18 - scoreW,
      y: sideY,
      size: 8.2,
      font: fontBold,
      color: rgb(140 / 255, 195 / 255, 255 / 255),
    });
    sideY -= 6;

    // Progress Bar Background
    page.drawRectangle({
      x: sideX,
      y: sideY,
      width: barWidth,
      height: 2.5,
      color: rgb(38 / 255, 65 / 255, 115 / 255),
    });

    // Progress Bar Fill
    const fillWidth = barWidth * (v.val / 10);
    page.drawRectangle({
      x: sideX,
      y: sideY,
      width: fillWidth,
      height: 2.5,
      color: rgb(96 / 255, 165 / 255, 250 / 255),
    });

    if (i < verdicts.length - 1) {
      sideY -= 13;
    }
  }

  // Helper: word-wrap text
  const wrapText = (text, maxWidth, size, font) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = `${currentLine} ${word}`;
      const w = font.widthOfTextAtSize(testLine, size);
      if (w < maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  // --- RIGHT MAIN CONTENT ---
  let mainY = height - 44;
  const darkColor = rgb(17 / 255, 24 / 255, 39 / 255);
  const grayColor = rgb(65 / 255, 75 / 255, 90 / 255);

  // Name & Title
  page.drawText('Shamim Ahmed Robin', {
    x: mainX,
    y: mainY,
    size: 29,
    font: fontBold,
    color: sidebarColor, // Matching the rich navy blue of the left sidebar
  });
  mainY -= 22;

  page.drawText('Web Developer & Digital Marketing Specialist', {
    x: mainX,
    y: mainY,
    size: 11.5,
    font: fontRegular,
    color: grayColor,
  });
  mainY -= 14;

  // Header separator line
  page.drawLine({
    start: { x: mainX, y: mainY },
    end: { x: width - 24, y: mainY },
    thickness: 1.25,
    color: rgb(215 / 255, 222 / 255, 232 / 255),
  });
  mainY -= 22;

  const drawMainSectionHeader = (title) => {
    page.drawText(title, {
      x: mainX,
      y: mainY,
      size: 11.5,
      font: fontBold,
      color: darkColor,
    });
    mainY -= 5;
    page.drawLine({
      start: { x: mainX, y: mainY },
      end: { x: width - 24, y: mainY },
      thickness: 0.8,
      color: rgb(210 / 255, 218 / 255, 230 / 255),
    });
    mainY -= 16;
  };

  // 1. SUMMARY
  drawMainSectionHeader('SUMMARY');
  const summaryParagraph = 
    'Web Developer and Digital Marketing Specialist with hands-on experience building and managing e-commerce platforms, social media campaigns, customer acquisition funnels, SEO, and performance marketing. Founder and Lead Developer of StyleSphere, where I work across product development, digital marketing, analytics, and business operations.';

  // Draw justified paragraph
  const drawJustifiedParagraph = (text, startX, maxWidth, size, font, color, lineHeight) => {
    const words = text.trim().split(/\s+/);
    const lines = [];
    let currentWords = [words[0]];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = [...currentWords, word].join(' ');
      if (font.widthOfTextAtSize(testLine, size) <= maxWidth) {
        currentWords.push(word);
      } else {
        lines.push(currentWords);
        currentWords = [word];
      }
    }
    lines.push(currentWords);

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const lineWords = lines[lineIndex];
      const isLastLine = lineIndex === lines.length - 1;

      if (isLastLine || lineWords.length <= 1) {
        // Last line left-aligned
        page.drawText(lineWords.join(' '), {
          x: startX,
          y: mainY,
          size,
          font,
          color,
        });
      } else {
        // Justified line: calculate exact inter-word spacing
        const totalWordsWidth = lineWords.reduce((sum, w) => sum + font.widthOfTextAtSize(w, size), 0);
        const gaps = lineWords.length - 1;
        const spaceWidth = (maxWidth - totalWordsWidth) / gaps;

        let curX = startX;
        for (let wIndex = 0; wIndex < lineWords.length; wIndex++) {
          const w = lineWords[wIndex];
          page.drawText(w, {
            x: curX,
            y: mainY,
            size,
            font,
            color,
          });
          curX += font.widthOfTextAtSize(w, size) + spaceWidth;
        }
      }

      mainY -= lineHeight;
    }
  };

  drawJustifiedParagraph(summaryParagraph, mainX, mainWidth, 9.4, fontRegular, grayColor, 14.5);
  mainY -= 14;

  // 2. EXPERIENCE
  drawMainSectionHeader('EXPERIENCE');

  const experiences = [
    {
      company: 'StyleSphere',
      role: 'Founder & Lead Developer',
      date: 'Jul 2024 – Present',
      meta: 'Full-time • Sylhet, Bangladesh (Hybrid) • stylesphere.com.bd',
      bullets: [
        'Founded StyleSphere, a modern direct-to-consumer (D2C) fashion & lifestyle brand.',
        'Architected full-stack e-commerce web platform using Next.js, React, and TypeScript.',
        'Leading Search Engine Optimization (SEO), customer funnels, and performance marketing.',
      ],
    },
    {
      company: 'TrustShopBD',
      role: 'Social Media Manager',
      date: 'Nov 2022 – Jul 2024',
      meta: 'Part-time • Remote',
      bullets: [
        'Managed multi-channel social media brand presence, campaign content, and promotions.',
        'Handled Customer Relationship Management (CRM) and audience interaction workflows.',
        'Drove consistent digital brand growth and customer engagement across key platforms.',
      ],
    },
    {
      company: 'Fiverr',
      role: 'Freelance Graphic Designer',
      date: 'Jan 2020 – May 2024',
      meta: 'Freelance • Remote (International Clients)',
      bullets: [
        'Created high-converting marketing visuals, digital ad banners, and social creatives.',
        'Designed custom brand identity assets and UI graphics using Adobe Photoshop.',
        'Maintained top client satisfaction ratings through high-quality visual deliverables.',
      ],
    },
  ];

  for (let i = 0; i < experiences.length; i++) {
    const exp = experiences[i];
    // Title + Date
    const titleText = `${exp.company} | ${exp.role}`;
    page.drawText(titleText, {
      x: mainX,
      y: mainY,
      size: 10.5,
      font: fontBold,
      color: darkColor,
    });

    const dateWidth = fontRegular.widthOfTextAtSize(exp.date, 9.2);
    page.drawText(exp.date, {
      x: width - 24 - dateWidth,
      y: mainY,
      size: 9.2,
      font: fontRegular,
      color: grayColor,
    });
    mainY -= 15;

    // Sub-meta
    page.drawText(exp.meta, {
      x: mainX,
      y: mainY,
      size: 8.8,
      font: fontRegular,
      color: grayColor,
    });
    mainY -= 15;

    // Bullets
    for (const b of exp.bullets) {
      page.drawText('•', {
        x: mainX + 4,
        y: mainY,
        size: 9,
        font: fontBold,
        color: grayColor,
      });
      page.drawText(b, {
        x: mainX + 14,
        y: mainY,
        size: 9,
        font: fontRegular,
        color: grayColor,
      });
      mainY -= 15.5;
    }

    if (i < experiences.length - 1) {
      mainY -= 16;
    }
  }
  mainY -= 18;

  // 3. EDUCATION
  drawMainSectionHeader('EDUCATION');
  const education = [
    {
      degree: 'Bachelor of Arts (Honours)',
      date: '2024 – Running',
      sub: 'Murarichand College, Sylhet',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      date: '2020 – 2023',
      sub: 'Sunamganj Poura College – Graduated: 2023',
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      date: '2016 – 2020',
      sub: 'Joynagor Bazar Hazi Goni Baksh High School – Graduated: 2020',
    },
  ];

  for (let i = 0; i < education.length; i++) {
    const edu = education[i];
    page.drawText(edu.degree, {
      x: mainX,
      y: mainY,
      size: 10.2,
      font: fontBold,
      color: darkColor,
    });

    const dateW = fontRegular.widthOfTextAtSize(edu.date, 9.2);
    page.drawText(edu.date, {
      x: width - 24 - dateW,
      y: mainY,
      size: 9.2,
      font: fontRegular,
      color: grayColor,
    });
    mainY -= 15;

    page.drawText(edu.sub, {
      x: mainX,
      y: mainY,
      size: 8.8,
      font: fontOblique,
      color: grayColor,
    });
    mainY -= 16;

    if (i < education.length - 1) {
      mainY -= 14;
    }
  }
  mainY -= 16;

  // 4. HOBBIES & INTERESTS
  drawMainSectionHeader('HOBBIES & INTERESTS');
  const hobbies = [
    {
      label: 'Travelling: ',
      desc: 'Exploring diverse cultures, landscapes, and creative viewpoints.',
    },
    {
      label: 'Reading: ',
      desc: 'Tech literature, UI/UX design architecture, and growth marketing books.',
    },
    {
      label: 'Coding: ',
      desc: 'Crafting responsive web apps, open-source utilities, and micro-tools.',
    },
  ];

  for (let i = 0; i < hobbies.length; i++) {
    const h = hobbies[i];
    page.drawText('•', {
      x: mainX + 4,
      y: mainY,
      size: 9,
      font: fontBold,
      color: grayColor,
    });

    const indentX = mainX + 14;
    const availableWidth = mainWidth - 14;
    const labelWidth = fontBold.widthOfTextAtSize(h.label, 9);

    // Draw bold label
    page.drawText(h.label, {
      x: indentX,
      y: mainY,
      size: 9,
      font: fontBold,
      color: darkColor,
    });

    // Check if entire description fits within the right margin
    const descWidth = fontRegular.widthOfTextAtSize(h.desc, 9);
    if (labelWidth + descWidth <= availableWidth) {
      page.drawText(h.desc, {
        x: indentX + labelWidth,
        y: mainY,
        size: 9,
        font: fontRegular,
        color: grayColor,
      });
      mainY -= 17;
    } else {
      // Word-wrap description across lines safely without ever overflowing
      const words = h.desc.split(' ');
      let line1 = '';
      const line2Words = [];
      let fitsLine1 = true;

      for (const w of words) {
        if (fitsLine1) {
          const test = line1 ? `${line1} ${w}` : w;
          if (labelWidth + fontRegular.widthOfTextAtSize(test, 9) <= availableWidth) {
            line1 = test;
          } else {
            fitsLine1 = false;
            line2Words.push(w);
          }
        } else {
          line2Words.push(w);
        }
      }

      page.drawText(line1, {
        x: indentX + labelWidth,
        y: mainY,
        size: 9,
        font: fontRegular,
        color: grayColor,
      });
      mainY -= 13.5;

      const line2 = line2Words.join(' ');
      if (line2) {
        page.drawText(line2, {
          x: indentX,
          y: mainY,
          size: 9,
          font: fontRegular,
          color: grayColor,
        });
        mainY -= 16;
      }
    }
  }

  console.log(`Final Positions => sideY: ${sideY.toFixed(1)}, mainY: ${mainY.toFixed(1)} (page bottom is 0)`);

  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(path.join(process.cwd(), 'public', 'resume.pdf'), pdfBytes);
  console.log('Successfully regenerated public/resume.pdf! Size:', pdfBytes.length);
}

generateResumePdf().catch(console.error);
