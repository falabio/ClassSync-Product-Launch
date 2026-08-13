# ClassSync — Product Launch Video & Motion Graphics

An automated, high-energy product launch video and dynamic motion graphics demo suite for **ClassSync**, built with **Remotion**, **React**, and **TypeScript**.

---

## 🎬 Project Highlights

- **Dynamic Motion Engine**: Programmatic keyframe animations, typography kinetic transitions, and spring physics built purely in React with Remotion.
- **Automated Tour Pipeline**: Headless browser automation scripts that capture live UI states and render high-fidelity video reels.
- **Modular Compositions**:
  - `ClassSync45sLaunch`: High-tempo, 45-second launch commercial with sound synchronization.
  - `ClassSyncProHype`: Feature breakdown showcase covering core platform workflows.
  - `ClassSyncSocialHype`: Social media ready vertical/square teaser cuts.

---

## 🛠️ Tech Stack

- **Framework**: React & TypeScript
- **Video Engine**: [Remotion](https://www.remotion.dev/)
- **Audio & Media Processing**: Web Audio APIs, dynamic media compositor
- **Automation**: Playwright / Node automation capture scripts

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Open Remotion Studio (Interactive Preview)
```bash
npm run dev
```
This opens the local player in your browser where you can inspect individual scenes, scrub frames, and test transitions.

### 3. Render MP4 Launch Video
```bash
npx remotion render ClassSync45sLaunch out/launch_video.mp4
```

---

## 📁 Repository Structure

```
├── public/                 # Soundtrack, sound effects, and UI screen assets
├── extracted_slides/       # Extracted visual presentation layers
├── src/
│   ├── Root.tsx            # Composition definitions & Remotion registration
│   ├── ClassSync45sLaunch.tsx # 45-second main launch composition
│   ├── ClassSyncProHype.tsx   # Detailed product demo composition
│   └── ClassSyncSocialHype.tsx# Social teaser reel composition
├── record_app.js           # Automated UI capture script
└── student_scores.csv      # Sample dataset for live grade analytics animations
```

---

## 📄 License
This project is for demonstration and product launch purposes.
