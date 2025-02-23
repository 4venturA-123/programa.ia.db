const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function extractTextFromPDFs(pdfPaths) {
    let text = '';
    for (const pdfPath of pdfPaths) {
        const existingPdfBytes = fs.readFileSync(pdfPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        for (const page of pages) {
            const textContent = await page.getTextContent();
            textContent.items.forEach(item => {
                text += item.str + ' ';
            });
        }
    }
    return text;
}

module.exports = { extractTextFromPDFs };
