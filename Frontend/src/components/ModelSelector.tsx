import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const models = ['yolov5', 'dehaze', 'navaique'];

const ModelSelector: React.FC = () => {
  const [selected, setSelected] = React.useState<string>('yolov5');

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Model Selector</h2>
      <ToggleGroup type="single" value={selected} onValueChange={setSelected}>
        {models.map((model) => (
          <ToggleGroupItem key={model} value={model} className="px-2 py-1">
            {model.toUpperCase()}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ModelSelector;