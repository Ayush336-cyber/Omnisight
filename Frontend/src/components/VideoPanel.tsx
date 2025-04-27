import React from 'react';

const VideoPanel: React.FC = () => (
  <div className="relative w-full h-full bg-black">
    <img
      className="object-cover w-full h-full"
      src="http://127.0.0.1:8000/video_feed"
      alt="YOLOv5 Live"
    />
    <div className="absolute inset-0 pointer-events-none" />
  </div>
);
export default VideoPanel;