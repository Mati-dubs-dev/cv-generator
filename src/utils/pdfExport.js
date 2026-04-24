/**
 * pdfExport.js — PDF generation utility (v2)
 *
 * Improvements over v1:
 *   - Temporarily resets any CSS transform (zoom) on #cv-preview before export
 *     so html2pdf always captures the real 794px A4 size.
 *   - Uses html2canvas scale:3 for sharper text (especially on hi-DPI screens).
 *   - Preserves the original transform after export.
 *   - Better pagebreak handling to avoid content cuts.
 *   - Accepts an optional onProgress callback.
 */

/**
 * Exports the CV preview element as a downloadable PDF.
 *
 * @param {string}   elementId   DOM id of the CV element (default: 'cv-preview')
 * @param {string}   fileName    Output filename without extension
 * @param {Function} onProgress  Optional callback: (phase: 'start'|'done'|'error') => void
 */
export async function exportToPDF(
  elementId = 'cv-preview',
  fileName = 'mi-cv',
  onProgress
) {
  const html2pdf = (await import('html2pdf.js')).default;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`[pdfExport] Element #${elementId} not found`);
    onProgress?.('error');
    return;
  }

  onProgress?.('start');

  // ── Temporarily neutralize the scale transform applied by CVPreview ──────
  // html2pdf reads the DOM dimensions; if the element is scaled down visually,
  // the PDF will be cropped. We reset scale to 1 during capture.
  const originalTransform = element.style.transform;
  const originalTransformOrigin = element.style.transformOrigin;
  element.style.transform = 'none';
  element.style.transformOrigin = 'initial';

  const options = {
    margin: [0, 0, 0, 0],        // top, right, bottom, left (mm)
    filename: `${fileName}.pdf`,
    image: {
      type: 'jpeg',
      quality: 0.98,
    },
    html2canvas: {
      scale: 3,                  // 3x for crisp fonts and images
      useCORS: true,             // needed for base64 photos
      logging: false,
      letterRendering: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794,          // force A4 width
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
    },
    pagebreak: {
      // Avoid cutting sections across pages
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.pdf-page-break-before',
      after:  '.pdf-page-break-after',
      avoid:  '.pdf-no-break',
    },
  };

  try {
    await html2pdf().set(options).from(element).save();
    onProgress?.('done');
  } catch (error) {
    console.error('[pdfExport] Generation failed:', error);
    onProgress?.('error');
    throw error;
  } finally {
    // ── Restore original transform ────────────────────────────────────────
    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;
  }
}

/**
 * Builds a URL-safe filename from the CV owner's name.
 * e.g. "María González" → "cv-maria-gonzalez"
 *
 * @param {string} fullName
 * @returns {string}
 */
export function buildFileName(fullName) {
  const safe = (fullName || 'cv')
    .toLowerCase()
    .replace(/[áàäâã]/g, 'a')
    .replace(/[éèëê]/g,  'e')
    .replace(/[íìïî]/g,  'i')
    .replace(/[óòöôõ]/g, 'o')
    .replace(/[úùüû]/g,  'u')
    .replace(/[ñ]/g,     'n')
    .replace(/[ç]/g,     'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return safe ? `cv-${safe}` : 'mi-cv';
}
