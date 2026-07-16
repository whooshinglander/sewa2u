import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function stampPageNumbers(inputBuffer: Buffer): Promise<Buffer> {
  const pdfDoc = await PDFDocument.load(inputBuffer)
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  const pages = pdfDoc.getPages()
  const total = pages.length

  for (let i = 0; i < total; i++) {
    const page = pages[i]
    const { width } = page.getSize()
    const text = `Page ${i + 1} of ${total}`
    const fontSize = 8
    const textWidth = font.widthOfTextAtSize(text, fontSize)

    page.drawText(text, {
      x: (width - textWidth) / 2,  // perfectly centred
      y: 18,                        // 18pt from bottom
      size: fontSize,
      font,
      color: rgb(0.35, 0.35, 0.35),
    })
  }

  const out = await pdfDoc.save()
  return Buffer.from(out)
}
