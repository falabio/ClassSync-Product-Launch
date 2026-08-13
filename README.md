# ClassSync — Product Launch Video & Motion Graphics

An automated, high-energy product launch video and presentation showcase for **ClassSync**, built with **Remotion**, **React**, and **TypeScript**.

---

## 🎬 Watch the Launch Video

https://github.com/user-attachments/assets/322d7d1f-1ffa-4198-ba11-22b65f8a2e1a

> 💡 *Click play above to watch the full 1080p automated product launch video.*

### Key Highlights:
- **Smart Attendance & Live Grading**: Real-time student metrics and automated attendance tracking.
- **Dynamic UI Interactions**: High-fidelity dashboard workflows and live classroom synchronizations.
- **Audio-Visual Sync**: Synchronized motion graphics, typography kinetic transitions, and spring physics.

---

## 🛠️ Tech Stack

- **Framework**: React & TypeScript
- **Video Engine**: [Remotion](https://www.remotion.dev/)
- **Audio & Visual Processing**: Programmatic composition pipeline, Web Audio APIs
- **Automation**: Automated screen capture and data visualization pipelines

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
This opens the local player in your browser where you can inspect scenes, scrub frames, and customize animations.

### 3. Render the Video
```bash
npx remotion render ClassSync45sLaunch out/ClassSync_Video.mp4
```

---

## 📁 Repository Structure

```
├── public/                 # Soundtrack, sound effects, and UI screen assets
├── extracted_slides/       # Visual presentation layers
├── src/
│   ├── Root.tsx            # Composition definitions & Remotion registration
│   └── ClassSync45sLaunch.tsx # Master launch video composition
├── record_app.js           # Automated UI capture script
└── student_scores.csv      # Sample dataset for live grade analytics
```

---

## 📄 License
This project is for demonstration and product launch purposes.
