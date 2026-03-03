import { jsPDF } from 'jspdf';
import type { Tour } from '@/hooks/useTours';

interface PDFData {
  tour: Tour;
  language: 'es' | 'en';
  translations: {
    tourInfo: string;
    contactInfo: string;
    generated: string;
    bookNow: string;
    website: string;
    includes: string;
    duration: string;
    price: string;
    category: string;
    itinerary: string;
    note: string;
  };
}

export async function generateTourPDF(data: PDFData): Promise<void> {
  const { tour, language, translations } = data;
  const doc = new jsPDF();

  // Color palette - RGB values
  const primaryBlueR = 10, primaryBlueG = 61, primaryBlueB = 98;
  const oceanBlueR = 27, oceanBlueG = 108, oceanBlueB = 168;
  const accentGoldR = 245, accentGoldG = 166, accentGoldB = 35;
  const whiteR = 255, whiteG = 255, whiteB = 255;
  const lightGrayR = 240, lightGrayG = 249, lightGrayB = 255;
  const darkGrayR = 30, darkGrayG = 39, darkGrayB = 46;

  const PAGE_HEIGHT = 297;
  const FOOTER_HEIGHT = 30;
  const CONTENT_BOTTOM = PAGE_HEIGHT - FOOTER_HEIGHT - 5;

  // Draws footer on the current page
  const drawFooter = () => {
    const footerY = PAGE_HEIGHT - FOOTER_HEIGHT;
    doc.setFillColor(primaryBlueR, primaryBlueG, primaryBlueB);
    doc.rect(0, footerY, 210, FOOTER_HEIGHT, 'F');

    doc.setTextColor(whiteR, whiteG, whiteB);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(translations.contactInfo, 15, footerY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('WhatsApp: +593 98 402 3098', 15, footerY + 15);
    doc.text('Email: galoconstante@gmail.com', 15, footerY + 22);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(translations.website, 110, footerY + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('www.ecuadortours.com', 110, footerY + 15);
    doc.text(`${translations.generated}: ${new Date().toLocaleDateString()}`, 110, footerY + 22);

    doc.setFillColor(accentGoldR, accentGoldG, accentGoldB);
    doc.roundedRect(160, footerY + 7, 38, 13, 2, 2, 'F');
    doc.setTextColor(whiteR, whiteG, whiteB);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(translations.bookNow, 166, footerY + 15);
  };

  // Checks if yPos + neededHeight would overflow; if so, draws footer, adds page, returns new yPos
  const checkPageBreak = (y: number, needed: number = 20): number => {
    if (y + needed > CONTENT_BOTTOM) {
      drawFooter();
      doc.addPage();
      return 20;
    }
    return y;
  };

  // Helper to load image from URL
  const addImageFromUrl = async (url: string, x: number, y: number, w: number, h: number): Promise<void> => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = url;
      });
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        doc.addImage(dataUrl, 'JPEG', x, y, w, h);
      }
    } catch {
      console.warn('Failed to load image:', url);
    }
  };

  // ── PAGE 1 HEADER ──────────────────────────────────────────────
  doc.setFillColor(primaryBlueR, primaryBlueG, primaryBlueB);
  doc.rect(0, 0, 210, 50, 'F');

  doc.setFillColor(oceanBlueR, oceanBlueG, oceanBlueB);
  doc.rect(0, 48, 210, 12, 'F');

  doc.setTextColor(whiteR, whiteG, whiteB);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('GC Ecuador Tours', 15, 25);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('& Transport', 15, 32);

  // ── TOUR NAME ──────────────────────────────────────────────────
  doc.setTextColor(primaryBlueR, primaryBlueG, primaryBlueB);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(tour.name[language], 15, 70);

  doc.setDrawColor(accentGoldR, accentGoldG, accentGoldB);
  doc.setLineWidth(1);
  doc.line(15, 73, 80, 73);

  // ── IMAGES ────────────────────────────────────────────────────
  try {
    await addImageFromUrl(tour.image, 15, 80, 90, 60);
    doc.setDrawColor(primaryBlueR, primaryBlueG, primaryBlueB);
    doc.setLineWidth(0.5);
    doc.rect(15, 80, 90, 60);
  } catch {
    doc.setFillColor(lightGrayR, lightGrayG, lightGrayB);
    doc.rect(15, 80, 90, 60, 'F');
    doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);
    doc.setFontSize(10);
    doc.text('Tour Image', 50, 112);
  }

  try {
    await addImageFromUrl('/images/suv.jpg', 115, 80, 80, 45);
    doc.setDrawColor(primaryBlueR, primaryBlueG, primaryBlueB);
    doc.rect(115, 80, 80, 45);
  } catch {
    doc.setFillColor(lightGrayR, lightGrayG, lightGrayB);
    doc.rect(115, 80, 80, 45, 'F');
    doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);
    doc.setFontSize(10);
    doc.text('7-Seat SUV', 145, 105);
  }

  // ── INFO BOX ──────────────────────────────────────────────────
  let yPos = 155;

  doc.setTextColor(primaryBlueR, primaryBlueG, primaryBlueB);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(translations.tourInfo, 15, yPos);
  yPos += 10;

  doc.setFillColor(lightGrayR, lightGrayG, lightGrayB);
  doc.setDrawColor(oceanBlueR, oceanBlueG, oceanBlueB);
  doc.setLineWidth(0.3);
  doc.roundedRect(15, yPos - 5, 180, 35, 3, 3, 'FD');

  doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);
  doc.setFontSize(11);

  doc.setFont('helvetica', 'bold');
  doc.text(`${translations.price}:`, 20, yPos + 5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(accentGoldR, accentGoldG, accentGoldB);
  doc.setFontSize(13);
  doc.text(`$${tour.price} USD / 4 pax`, 45, yPos + 5);
  doc.setFontSize(11);
  doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);

  doc.setFont('helvetica', 'bold');
  doc.text(`${translations.duration}:`, 20, yPos + 15);
  doc.setFont('helvetica', 'normal');
  doc.text(tour.duration[language], 55, yPos + 15);

  doc.setFont('helvetica', 'bold');
  doc.text(`${translations.category}:`, 20, yPos + 25);
  doc.setFont('helvetica', 'normal');
  doc.text(tour.category, 55, yPos + 25);

  doc.setFont('helvetica', 'bold');
  doc.text(language === 'es' ? 'Ciudad:' : 'City:', 100, yPos + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(tour.city, 125, yPos + 5);

  yPos += 45;

  // ── DESCRIPTION ───────────────────────────────────────────────
  yPos = checkPageBreak(yPos, 25);
  doc.setTextColor(primaryBlueR, primaryBlueG, primaryBlueB);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'es' ? 'Descripción' : 'Description', 15, yPos);
  yPos += 8;

  doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const descLines = doc.splitTextToSize(tour.description[language] ?? '', 180);
  for (const line of descLines as string[]) {
    yPos = checkPageBreak(yPos, 6);
    doc.text(line, 15, yPos);
    yPos += 5;
  }
  yPos += 8;

  // ── ITINERARY ─────────────────────────────────────────────────
  if (tour.itinerary) {
    yPos = checkPageBreak(yPos, 20);
    doc.setTextColor(primaryBlueR, primaryBlueG, primaryBlueB);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(translations.itinerary, 15, yPos);
    yPos += 8;

    tour.itinerary[language].forEach((item, index) => {
      const itemLines = doc.splitTextToSize(item, 165) as string[];
      const blockHeight = itemLines.length * 5 + 5;
      yPos = checkPageBreak(yPos, blockHeight);

      // Step number circle
      doc.setFillColor(oceanBlueR, oceanBlueG, oceanBlueB);
      doc.circle(19, yPos - 1.5, 2.5, 'F');
      doc.setTextColor(whiteR, whiteG, whiteB);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.text(String(index + 1), index + 1 < 10 ? 17.5 : 16.5, yPos - 0.5);

      doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(itemLines, 26, yPos);
      yPos += blockHeight;
    });
    yPos += 5;
  }

  // ── INCLUDES ─────────────────────────────────────────────────
  yPos = checkPageBreak(yPos, 20);
  doc.setTextColor(primaryBlueR, primaryBlueG, primaryBlueB);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(translations.includes, 15, yPos);
  yPos += 8;

  tour.includes[language].forEach((item) => {
    const itemLines = doc.splitTextToSize(item, 165) as string[];
    const blockHeight = itemLines.length * 5 + 3;
    yPos = checkPageBreak(yPos, blockHeight);

    doc.setFillColor(accentGoldR, accentGoldG, accentGoldB);
    doc.circle(18, yPos - 1.5, 1.5, 'F');

    doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(itemLines, 25, yPos);
    yPos += blockHeight;
  });
  yPos += 5;

  // ── NOTE ─────────────────────────────────────────────────────
  if (tour.note) {
    const noteText = tour.note[language] ?? '';
    const noteLines = doc.splitTextToSize(noteText, 168) as string[];
    const noteBoxHeight = noteLines.length * 5 + 16;
    yPos = checkPageBreak(yPos, noteBoxHeight + 5);

    doc.setFillColor(255, 249, 230);
    doc.setDrawColor(accentGoldR, accentGoldG, accentGoldB);
    doc.setLineWidth(0.5);
    doc.roundedRect(15, yPos - 5, 180, noteBoxHeight, 3, 3, 'FD');

    doc.setTextColor(primaryBlueR, primaryBlueG, primaryBlueB);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(translations.note, 20, yPos + 3);

    doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(noteLines, 20, yPos + 11);
    yPos += noteBoxHeight + 8;
  }

  // ── FOOTER ────────────────────────────────────────────────────
  drawFooter();

  // Save
  doc.save(`${tour.slug}-tour-info.pdf`);
}
