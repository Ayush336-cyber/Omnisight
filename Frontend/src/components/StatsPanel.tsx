import React from 'react';
import { Progress } from '@/components/ui/progress';

const StatsPanel: React.FC = () => {
  const cpuUsage = 30;  // placeholder values
  const gpuUsage = 45;

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">System Stats</h2>
      <div className="mb-4">
        <p className="text-sm mb-1">CPU Usage</p>
        <Progress value={cpuUsage} max={100} className="h-2" />
      </div>
      <div>
        <p className="text-sm mb-1">GPU Usage</p>
        <Progress value={gpuUsage} max={100} className="h-2" />
      </div>
    </div>
  );
};

export default StatsPanel;