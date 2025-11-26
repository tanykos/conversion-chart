# Conversion chart

Interactive line chart for visualizing A/B testing statistics.

## 🚀 Live Demo

[View Deployment](https://tanykos.github.io/conversion-chart/)

## 📊 Visualization Library

**Recharts** - A composable charting library built on React components for creating responsive, customizable line charts with smooth animations and interactive tooltips.

## ✨ Implemented Features

### Core Features

- ✅ **Multi-variation line chart** - Display conversion rates for multiple test variations
- ✅ **Custom tooltip** - on hover shows popup with detailed metrics
- ✅ **Variations select** - Custom dropdown with checkboxes for selecting variations
- ✅ **Period select** - Switch between Day and Week views
- ✅ **Dynamic axes** - Axes automatically adjust to show only visible data
- ✅ **Responsive design** - Adapts to different screen sizes

### Bonus Features

- ✅ **Dark/Light theme** - Toggle between themes with localStorage persistence

## 🛠️ Local Setup

### Prerequisites

- Node.js v22.12+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/tanykos/conversion-chart.git
cd conversion-chart
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open in browser:

```
http://localhost:5173/conversion-chart/
```

## 🎨 Tech Stack

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.2.4
- **Recharts** 2.15.0
- **CSS Modules** - Scoped styling
- **Feature-Sliced Design** - Architecture methodology
