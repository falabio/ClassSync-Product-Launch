const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Launching headed browser for live ClassSync demo tour...');
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 800 // Slows down actions by 800ms so you can follow along
  });
  
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();
  const htmlPath = 'file:///C:/Users/felix/OneDrive/Documents/Google%20Antigravity/Peer%20Power%20Dashboard/index.html?clean=true';
  
  // Register alert handler to accept alerts automatically
  page.on('dialog', async dialog => {
    console.log(`Alert Notification: "${dialog.message()}"`);
    await page.waitForTimeout(1000);
    await dialog.accept();
  });

  console.log('Navigating to ClassSync App...');
  await page.goto(htmlPath);
  await page.waitForTimeout(1500);

  console.log('Clearing old session storage...');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(1500);

  console.log('Step 1: Switching to Chronological Score Ledger tab...');
  await page.click('#main-tab-ledger');
  await page.waitForTimeout(1500);

  console.log('Step 2: Uploading student_scores.csv...');
  const csvPath = path.join(__dirname, 'student_scores.csv');
  const fileInput = await page.$('#csv-file-selector');
  await fileInput.setInputFiles(csvPath);
  await page.waitForTimeout(2000);

  console.log('Step 3: Switching to ZPD Peer Matcher...');
  await page.click('#main-tab-matcher');
  await page.waitForTimeout(1500);

  console.log('Step 4: Running matching engine algorithm...');
  await page.click('#btn-generate-matching');
  await page.waitForTimeout(2000);

  console.log('Step 5: Scrolling through matched peer tutoring pairing cards...');
  await page.evaluate(() => window.scrollBy({ top: 380, behavior: 'smooth' }));
  await page.waitForTimeout(3000);

  console.log('Step 6: Scrolling back up to check session attendance...');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(1500);
  
  const checkboxes = await page.$$('.attendance-row input[type="checkbox"]');
  for (let i = 0; i < Math.min(4, checkboxes.length); i++) {
    console.log(`Checking attendance checkbox ${i + 1}...`);
    await checkboxes[i].click();
    await page.waitForTimeout(800);
  }
  await page.waitForTimeout(1500);

  console.log('Step 7: Viewing Cohort Analytics & SVG Charts...');
  await page.evaluate(() => window.scrollTo({ top: 480, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.click('#main-tab-analytics');
  await page.waitForTimeout(2000);

  console.log('Step 8: Toggling progress filters...');
  console.log('Filtering progress: Tutors...');
  await page.click('#btn-filter-progress-tutor');
  await page.waitForTimeout(1500);
  console.log('Filtering progress: Tutees...');
  await page.click('#btn-filter-progress-tutee');
  await page.waitForTimeout(1500);
  console.log('Restoring progress filter: Class...');
  await page.click('#btn-filter-progress-all');
  await page.waitForTimeout(2000);

  console.log('Demo tour complete! Leaving browser open for your evaluation.');
  console.log('You can now click around, upload files, reset state, and test the app yourself.');
})();
