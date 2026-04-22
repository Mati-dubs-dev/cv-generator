/**
 * pdfExport.js — Handles PDF generation from the CV preview element
 * Uses html2pdf.js (loaded client-side only)
 */

/**
 * Exports the CV preview element as a downloadable PDF
 * @param {string} elementId - The DOM id of the CV preview element
 * @param {string} fileName  - The PDF file name (without extension)
 */
export async function exportToPDF(elementId = 'cv-preview', fileName = 'mi-cv') {
  // Dynamically import html2pdf.js (client-side only)
  const html2pdf = (await import('html2pdf.js')).default;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element #${elementId} not found`);
    return;
  }

  const options = {
    margin: 0,
    filename: `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,          // Retina quality
      useCORS: true,
      letterRendering: true,
      scrollY: 0,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
    },
  };

  try {
    await html2pdf().set(options).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

/**
 * Generate a safe filename from the CV name
 * @param {string} fullName
 */
export function buildFileName(fullName) {
  const safe = (fullName || 'cv')
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `cv-${safe}` || 'mi-cv';
}
