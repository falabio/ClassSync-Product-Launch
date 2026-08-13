const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: path.join(__dirname, 'public'),
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  const htmlPath = 'file:///C:/Users/felix/OneDrive/Documents/Google%20Antigravity/Peer%20Power%20Dashboard/index.html?clean=true';
  
  // Auto-dismiss dialog alerts
  page.on('dialog', async dialog => {
    console.log(`Dialog: [${dialog.type()}] "${dialog.message()}"`);
    await dialog.accept();
  });

  // Helper to move virtual cursor smoothly and trigger click
  const moveAndClick = async (selector, waitTimeAfter = 1000) => {
    console.log(`Virtual click on ${selector}`);
    const element = await page.$(selector);
    if (!element) return;
    const box = await element.boundingBox();
    if (!box) return;
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    
    // Smooth cursor movement
    await page.evaluate(({x, y}) => window.moveVirtualCursor(x, y), {x, y});
    await page.waitForTimeout(600); // transit duration
    
    // Play visual target click ring
    await page.evaluate(() => window.clickVirtualCursor());
    await page.waitForTimeout(150);
    
    // Trigger actual click
    await element.click({ force: true });
    await page.waitForTimeout(waitTimeAfter);
  };

  console.log('Navigating to ClassSync app...');
  await page.goto(htmlPath);
  await page.waitForTimeout(1000);

  // Start clean
  console.log('Clearing local storage...');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(1000); // 2.5s total

  // Scene 1: Initial cohort health dashboard view (0.0s - 6.5s)
  console.log('Scene 1: Monitoring cohort health...');
  await moveAndClick('#main-tab-ledger', 1000); // 4.0s

  // Select Block 2 Pre-Test block in form selector
  console.log('Selecting Block 2 Pre-Test in form...');
  const blockSelector = '#input-block';
  const selBox = await page.$(blockSelector).then(el => el.boundingBox());
  const selX = selBox.x + selBox.width / 2;
  const selY = selBox.y + selBox.height / 2;
  await page.evaluate(({selX, selY}) => window.moveVirtualCursor(selX, selY), {selX, selY});
  await page.waitForTimeout(500);
  await page.evaluate(() => window.clickVirtualCursor());
  await page.selectOption(blockSelector, 'Block 2 - Fractions Pre-Test (Weeks 4-6)');
  await page.waitForTimeout(1000); // 6.5s

  // Scene 2: Upload CSV score file (6.5s - 14.0s)
  console.log('Scene 2: Uploading student scores CSV...');
  const csvPath = path.join(__dirname, 'student_scores.csv');
  const fileInput = await page.$('#csv-file-selector');
  const box = await fileInput.boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.evaluate(({x, y}) => window.moveVirtualCursor(x, y), {x, y});
  await page.waitForTimeout(500);
  await page.evaluate(() => window.clickVirtualCursor());
  await page.waitForTimeout(150);
  await fileInput.setInputFiles(csvPath);
  
  // Wait for Simulated progress loader & alert dialogue acceptance
  await page.waitForTimeout(3500); // 11.5s
  console.log('Viewing ledger table red alert badges...');
  await page.waitForTimeout(2500); // 14.0s total

  // Scene 3: ZPD Peer Matcher tab & Generation (14.0s - 22.5s)
  console.log('Scene 3: Transitioning to ZPD Peer Matcher...');
  await moveAndClick('#main-tab-matcher', 800); // 15.5s
  await moveAndClick('#tab-b2-pre', 800); // 17.0s
  await moveAndClick('#btn-generate-matching', 1000); // 19.0s
  
  console.log('Scrolling through peer tutor matched pairs...');
  await page.evaluate(() => window.scrollBy({ top: 380, behavior: 'instant' }));
  await page.waitForTimeout(3500); // 22.5s total

  // Scene 4: Attendance Checklist check-ins (22.5s - 30.0s)
  console.log('Scene 4: Instant scroll up to Attendance Tracker...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400); // 22.9s

  const checkboxes = await page.$$('.attendance-row input[type="checkbox"]');
  for (let i = 0; i < Math.min(3, checkboxes.length); i++) {
    console.log(`Checking attendance checkbox ${i + 1}...`);
    const chkBox = await checkboxes[i].boundingBox();
    if (chkBox) {
      const chkX = chkBox.x + chkBox.width / 2;
      const chkY = chkBox.y + chkBox.height / 2;
      
      await page.evaluate(({chkX, chkY}) => window.moveVirtualCursor(chkX, chkY), {chkX, chkY});
      await page.waitForTimeout(500);
      await page.evaluate(() => window.clickVirtualCursor());
      await page.waitForTimeout(150);
      await page.evaluate((el) => el.click(), checkboxes[i]);
      await page.waitForTimeout(600);
    }
  }
  await page.waitForTimeout(2800); // 30.0s total

  // Scene 5: Cohort Analytics tab & Progress charts (30.0s - 38.0s)
  console.log('Scene 5: Opening Cohort Analytics tab...');
  await moveAndClick('#main-tab-analytics', 800); // 31.5s
  
  console.log('Scrolling down to view progress growth charts...');
  await page.evaluate(() => window.scrollTo(0, 480));
  await page.waitForTimeout(800); // 32.5s

  // Toggle chart filter buttons
  await moveAndClick('#btn-filter-progress-tutor', 800); // 34.0s
  await moveAndClick('#btn-filter-progress-tutee', 800); // 35.5s
  await moveAndClick('#btn-filter-progress-all', 800); // 37.0s

  console.log('Scrolling to student growth explorer table...');
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(1000); // 38.0s total

  console.log('Closing browser and finalizing full interaction video capture...');
  await page.close();
  await context.close();
  await browser.close();

  const video = page.video();
  if (video) {
    const videoPath = await video.path();
    console.log('RECORDED_VIDEO_PATH:', videoPath);
    const fs = require('fs');
    fs.copyFileSync(videoPath, path.join(__dirname, 'public', 'dashboard_live_capture.webm'));
    console.log('COPIED_TO_PUBLIC_DASHBOARD_LIVE_CAPTURE');
  }
})();
