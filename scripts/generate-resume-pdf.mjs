import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

async function generateResumePdf() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard Letter dimensions (612 x 792 points)
  const width = 612;
  const height = 792;
  const page = pdfDoc.addPage([width, height]);

  // Load fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Left sidebar dimensions
  const sidebarWidth = 195;
  const sidebarColor = rgb(30 / 255, 58 / 255, 110 / 255); // Rich deep navy blue like the screenshot
  const mainX = sidebarWidth + 24;
  const mainWidth = width - mainX - 24;

  // Draw sidebar background
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
    const photoDim = 110;
    const photoX = (sidebarWidth - photoDim) / 2;
    const photoY = height - 145;

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

  // --- LEFT SIDEBAR CONTENT ---
  let sideY = height - 175;
  const sideX = 18;
  const sideTextColor = rgb(1, 1, 1);
  const sideSubTextColor = rgb(215 / 255, 225 / 255, 240 / 255);

  const drawSidebarSection = (title) => {
    sideY -= 18;
    page.drawText(title, {
      x: sideX,
      y: sideY,
      size: 11,
      font: fontBold,
      color: sideTextColor,
    });
    sideY -= 4;
    page.drawLine({
      start: { x: sideX, y: sideY },
      end: { x: sidebarWidth - 18, y: sideY },
      thickness: 1,
      color: rgb(80 / 255, 115 / 255, 175 / 255),
    });
    sideY -= 12;
  };

  // CONTACT
  drawSidebarSection('CONTACT');
  const contacts = [
    'shamimahmedrobin5@gmail.com',
    '+880 1887 353914',
    'Sylhet, Bangladesh',
    'linkedin.com/in/shamimahmedrobin',
    'github.com/shamimahmedrobin',
    'shamimahmedrobin.vercel.app',
  ];
  for (const c of contacts) {
    page.drawText(c, {
      x: sideX,
      y: sideY,
      size: 8,
      font: fontRegular,
      color: sideSubTextColor,
    });
    sideY -= 13;
  }

  // SKILLS
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
    page.drawText('•', { x: sideX, y: sideY, size: 8, font: fontBold, color: rgb(140 / 255, 185 / 255, 255 / 255) });
    page.drawText(s, {
      x: sideX + 8,
      y: sideY,
      size: 8,
      font: fontRegular,
      color: sideSubTextColor,
    });
    sideY -= 13;
  }

  // LANGUAGES
  drawSidebarSection('LANGUAGES');
  const languages = [
    { name: 'Bengali', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Hindi', level: 'Conversational' },
  ];
  for (const l of languages) {
    page.drawText(`${l.name}: `, { x: sideX, y: sideY, size: 8, font: fontBold, color: sideTextColor });
    const nameWidth = fontBold.widthOfTextAtSize(`${l.name}: `, 8);
    page.drawText(l.level, { x: sideX + nameWidth, y: sideY, size: 8, font: fontRegular, color: sideSubTextColor });
    sideY -= 13;
  }

  // CERTIFICATES
  drawSidebarSection('CERTIFICATES');
  const certificates = [
    'Full Stack Web Developer Course –\nProgramming Hero',
    'UI/UX Specialization Course –\nBangladesh Government',
    'E-commerce Strategy & Operations –\ne-CAB',
  ];
  for (const cert of certificates) {
    page.drawText('•', { x: sideX, y: sideY, size: 8, font: fontBold, color: rgb(140 / 255, 185 / 255, 255 / 255) });
    const lines = cert.split('\n');
    page.drawText(lines[0], { x: sideX + 8, y: sideY, size: 7.5, font: fontBold, color: sideTextColor });
    sideY -= 10;
    if (lines[1]) {
      page.drawText(lines[1], { x: sideX + 8, y: sideY, size: 7.5, font: fontRegular, color: sideSubTextColor });
      sideY -= 12;
    }
  }

  // --- RIGHT MAIN CONTENT ---
  let mainY = height - 48;
  const darkColor = rgb(17 / 255, 24 / 255, 39 / 255);
  const grayColor = rgb(75 / 255, 85 / 255, 99 / 255);
  const blueColor = rgb(30 / 255, 58 / 255, 110 / 255);

  // Name & Title
  page.drawText('Shamim Ahmed Robin', {
    x: mainX,
    y: mainY,
    size: 24,
    font: fontBold,
    color: darkColor,
  });
  mainY -= 17;

  page.drawText('Web Developer & Digital Marketing Specialist', {
    x: mainX,
    y: mainY,
    size: 11,
    font: fontRegular,
    color: grayColor,
  });
  mainY -= 12;

  // Header separator line
  page.drawLine({
    start: { x: mainX, y: mainY },
    end: { x: width - 24, y: mainY },
    thickness: 1,
    color: rgb(220 / 255, 226 / 255, 235 / 255),
  });
  mainY -= 16;

  const drawMainSectionHeader = (title) => {
    page.drawText(title, {
      x: mainX,
      y: mainY,
      size: 11,
      font: fontBold,
      color: darkColor,
    });
    mainY -= 4;
    page.drawLine({
      start: { x: mainX, y: mainY },
      end: { x: width - 24, y: mainY },
      thickness: 0.75,
      color: rgb(210 / 255, 218 / 255, 230 / 255),
    });
    mainY -= 12;
  };

  // SUMMARY
  drawMainSectionHeader('SUMMARY');
  const summaryParagraph = 
    'Highly motivated Web Developer & Digital Marketing Specialist with strong foundations in modern frontend architecture, full-stack web applications, and performance marketing. Passionate about building fast, scalable digital products and driving high-converting customer acquisition funnels. Seeking opportunities to apply technical engineering and strategic growth marketing within a dynamic environment.';

  // Word-wrap summary
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

  const summaryLines = wrapText(summaryParagraph, mainWidth, 8.5, fontRegular);
  for (const line of summaryLines) {
    page.drawText(line, {
      x: mainX,
      y: mainY,
      size: 8.5,
      font: fontRegular,
      color: grayColor,
    });
    mainY -= 12;
  }
  mainY -= 4;

  // EXPERIENCE
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
      meta: 'Part-time • Remote • 3 yrs 9 mos',
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

  for (const exp of experiences) {
    // Title + Date
    const titleText = `${exp.company} | ${exp.role}`;
    page.drawText(titleText, {
      x: mainX,
      y: mainY,
      size: 9.5,
      font: fontBold,
      color: darkColor,
    });

    const dateWidth = fontRegular.widthOfTextAtSize(exp.date, 8.5);
    page.drawText(exp.date, {
      x: width - 24 - dateWidth,
      y: mainY,
      size: 8.5,
      font: fontRegular,
      color: grayColor,
    });
    mainY -= 11;

    // Sub-meta
    page.drawText(exp.meta, {
      x: mainX,
      y: mainY,
      size: 8,
      font: fontRegular,
      color: grayColor,
    });
    mainY -= 11;

    // Bullets
    for (const b of exp.bullets) {
      page.drawText('•', {
        x: mainX + 4,
        y: mainY,
        size: 8,
        font: fontBold,
        color: grayColor,
      });
      page.drawText(b, {
        x: mainX + 13,
        y: mainY,
        size: 8,
        font: fontRegular,
        color: grayColor,
      });
      mainY -= 11;
    }
    mainY -= 4;
  }

  // EDUCATION
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

  for (const edu of education) {
    page.drawText(edu.degree, {
      x: mainX,
      y: mainY,
      size: 9,
      font: fontBold,
      color: darkColor,
    });

    const dateW = fontRegular.widthOfTextAtSize(edu.date, 8.5);
    page.drawText(edu.date, {
      x: width - 24 - dateW,
      y: mainY,
      size: 8.5,
      font: fontRegular,
      color: grayColor,
    });
    mainY -= 11;

    page.drawText(edu.sub, {
      x: mainX,
      y: mainY,
      size: 8,
      font: fontOblique,
      color: grayColor,
    });
    mainY -= 13;
  }
  mainY -= 2;

  // HOBBIES & INTERESTS
  drawMainSectionHeader('HOBBIES & INTERESTS');
  const hobbiesText = 'Travelling: Exploring new cultures and landscapes.  •  Reading: Tech literature, UI/UX, and growth books.  •  Coding: Modern web frameworks and open-source tools.';
  const hobbyLines = wrapText(hobbiesText, mainWidth, 8, fontRegular);
  for (const line of hobbyLines) {
    page.drawText(line, {
      x: mainX,
      y: mainY,
      size: 8,
      font: fontRegular,
      color: grayColor,
    });
    mainY -= 11;
  }

  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(path.join(process.cwd(), 'public', 'resume.pdf'), pdfBytes);
  console.log('Successfully generated public/resume.pdf! Size:', pdfBytes.length);
}

generateResumePdf().catch(console.error);
