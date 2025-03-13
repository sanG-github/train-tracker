# Train Tracker

An interactive web application for tracking trains across Germany in real-time. Built with Next.js, and Leaflet (Open Street Map).

## Features

- 🚂 Real-time train tracking on an interactive map
- 🎯 Color-coded train markers indicating delay status:
  - 🟢 Green: On time
  - 🟡 Orange: Delayed < 15 minutes
  - 🔴 Red: Delayed > 15 minutes
- 📍 Click on train markers to view detailed information
- 📋 Sidebar displaying train station list and journey details
- 🔄 Real-time data refresh functionality
- 🎨 Modern, responsive UI with smooth animations
- 🗺️ Interactive map with zoom controls and smooth transitions

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for production
- [React](https://reactjs.org/) - Frontend library
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [React Leaflet](https://react-leaflet.js.org/) - React components for Leaflet maps
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety and enhanced developer experience

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sanG-github/train-tracker.git
cd train-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
train-tracker/
├── app/
│   ├── components/         # React components
│   │   ├── Map.tsx        # Main map component
│   │   ├── TrainMarker.tsx# Train marker component
│   │   └── StationList.tsx# Station list sidebar
│   ├── types/             # TypeScript type definitions
│   └── data/              # Mock data and data utilities
├── public/                # Static assets
│   └── images/           # Images and icons
└── ...
```

## Features in Detail

### Interactive Map
- Displays train locations across Germany
- Smooth zoom transitions when selecting trains
- Custom markers with delay status indicators

### Train Information
- Real-time train status and delay information
- Station list showing the train's journey
- Next station highlighting
- Delay status visualization

## Acknowledgments

- OpenStreetMap for providing the map tiles
- Leaflet.js community for the mapping library
- Next.js
