import React from 'react';
import Navbar from './components/Navbar';
import ModelSelector from './components/ModelSelector';
import VideoPanel from './components/VideoPanel';
import StatsPanel from './components/StatsPanel';

const App: React.FC = () => (
  <div className="flex flex-col h-screen">
    <Navbar />
    <div className="flex flex-1">
      <aside className="w-1/5 p-4 border-r border-teal-800 bg-gray-900/30">
        <ModelSelector />
      </aside>
      <main className="flex-1 p-4">
        <VideoPanel />
      </main>
      <aside className="w-1/5 p-4 border-l border-teal-800 bg-gray-900/30">
        <StatsPanel />
      </aside>
    </div>
  </div>
);

export default App;