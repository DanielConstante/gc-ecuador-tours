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

  // Helper function to add image from URL
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
    } catch (error) {
      console.warn('Failed to load image:', url);
    }
  };

  // Header background
  doc.setFillColor(primaryBlueR, primaryBlueG, primaryBlueB);
  doc.rect(0, 0, 210, 50, 'F');

  // Decorative wave - simplified
  doc.setFillColor(oceanBlueR, oceanBlueG, oceanBlueB);
  doc.rect(0, 48, 210, 12, 'F');

  // Logo/Title
  doc.setTextColor(whiteR, whiteG, whiteB);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Ecuador Tours', 15, 25);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('& Transport', 15, 32);

  // Tour name
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(tour.name[language], 15, 70);

  // Gold underline
  doc.setDrawColor(accentGoldR, accentGoldG, accentGoldB);
  doc.setLineWidth(1);
  doc.line(15, 73, 80, 73);

  // Tour image
  try {
    await addImageFromUrl(tour.image, 15, 80, 90, 60);
    
    // Image border
    doc.setDrawColor(primaryBlueR, primaryBlueG, primaryBlueB);
    doc.setLineWidth(0.5);
    doc.rect(15, 80, 90, 60);
  } catch {
    // Fallback rectangle if image fails
    doc.setFillColor(lightGrayR, lightGrayG, lightGrayB);
    doc.rect(15, 80, 90, 60, 'F');
    doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);
    doc.setFontSize(10);
    doc.text('Tour Image', 50, 112);
  }

  // SUV image placeholder
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

  // Info section
  let yPos = 155;
  
  doc.setTextColor(primaryBlueR, primaryBlueG, primaryBlueB);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(translations.tourInfo, 15, yPos);
  yPos += 10;

  // Details box
  doc.setFillColor(lightGrayR, lightGrayG, lightGrayB);
  doc.setDrawColor(oceanBlueR, oceanBlueG, oceanBlueB);
  doc.setLineWidth(0.3);
  doc.roundedRect(15, yPos - 5, 180, 35, 3, 3, 'FD');

  doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  // Price
  doc.setFont('helvetica', 'bold');
  doc.text(`${translations.price}:`, 20, yPos + 5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(accentGoldR, accentGoldG, accentGoldB);
  doc.setFontSize(14);
  doc.text(`$${tour.price} USD`, 45, yPos + 5);
  doc.setFontSize(11);
  doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);

  // Duration
  doc.setFont('helvetica', 'bold');
  doc.text(`${translations.duration}:`, 20, yPos + 15);
  doc.setFont('helvetica', 'normal');
  doc.text(tour.duration[language], 55, yPos + 15);

  // Category
  doc.setFont('helvetica', 'bold');
  doc.text(`${translations.category}:`, 20, yPos + 25);
  doc.setFont('helvetica', 'normal');
  doc.text(tour.category, 55, yPos + 25);

  // City
  doc.setFont('helvetica', 'bold');
  doc.text('Ciudad:', 100, yPos + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(tour.city, 125, yPos + 5);

  yPos += 45;

  // Description
  doc.setTextColor(primaryBlueR, primaryBlueG, primaryBlueB);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(language === 'es' ? 'Descripción' : 'Description', 15, yPos);
  yPos += 8;

  doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const descriptionLines = doc.splitTextToSize(tour.description[language], 180);
  doc.text(descriptionLines, 15, yPos);
  yPos += (descriptionLines as string[]).length * 5 + 10;

  // Includes section
  doc.setTextColor(primaryBlueR, primaryBlueG, primaryBlueB);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(translations.includes, 15, yPos);
  yPos += 8;

  doc.setTextColor(darkGrayR, darkGrayG, darkGrayB);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  tour.includes[language].forEach((item) => {
    // Bullet point - small circle
    doc.setFillColor(accentGoldR, accentGoldG, accentGoldB);
    doc.circle(18, yPos - 1.5, 1.5, 'F');
    
    // Text
    const itemLines = doc.splitTextToSize(item, 170);
    doc.text(itemLines, 25, yPos);
    yPos += (itemLines as string[]).length * 5 + 3;
  });

  // Footer
  const footerY = 270;
  
  // Footer background
  doc.setFillColor(primaryBlueR, primaryBlueG, primaryBlueB);
  doc.rect(0, footerY, 210, 27, 'F');

  // Contact info
  doc.setTextColor(whiteR, whiteG, whiteB);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(translations.contactInfo, 15, footerY + 8);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('WhatsApp: +593 99 999 9999', 15, footerY + 15);
  doc.text('Email: info@ecuadortours.com', 15, footerY + 21);

  // Website
  doc.setFont('helvetica', 'bold');
  doc.text(translations.website, 110, footerY + 8);
  doc.setFont('helvetica', 'normal');
  doc.text('www.ecuadortours.com', 110, footerY + 15);

  // Generated date
  doc.setFontSize(8);
  doc.text(`${translations.generated}: ${new Date().toLocaleDateString()}`, 110, footerY + 21);

  // Call to action
  doc.setFillColor(accentGoldR, accentGoldG, accentGoldB);
  doc.roundedRect(160, footerY + 5, 40, 15, 2, 2, 'F');
  doc.setTextColor(whiteR, whiteG, whiteB);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(translations.bookNow, 168, footerY + 14);

  // Save PDF
  const fileName = `${tour.slug}-tour-info.pdf`;
  doc.save(fileName);
}