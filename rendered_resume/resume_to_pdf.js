const puppeteer = require('puppeteer');

async function generatePDF(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.pdf({ path: outputPath, format: 'letter' });
  await browser.close();
}

// If building off of local: spin up the live preview server
// Provide the URL path to the resume from localhost
// Make sure to include "-webkit-print-color-adjust: exact;" for full color
// Source: https://www.bannerbear.com/blog/how-to-convert-html-into-pdf-with-node-js-and-puppeteer/#method-1-downloading-pdf-from-a-web-page-using-url
// Run this file with node.js
generatePDF('http://127.0.0.1:5500/html/resume.html', 'resume.pdf')
  .then(() => console.log('PDF generated successfully'))
  .catch(err => console.error('Error generating PDF:', err));