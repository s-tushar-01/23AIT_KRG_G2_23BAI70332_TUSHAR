// src/components/FileStream.tsx
import React from 'react';
import { fileService } from '../services/fileService';

interface FileStreamProps {
  fileId: string;
  type: 'video' | 'audio';
  filename: string;
}

const FileStream: React.FC<FileStreamProps> = ({ fileId, type, filename }) => {
  const streamUrl = fileService.getStreamUrl(fileId);

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Streaming: {filename}</h2>
      {type === 'video' ? (
        <video controls className="w-full max-w-3xl rounded shadow">
          <source src={streamUrl} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <audio controls className="w-full">
          <source src={streamUrl} />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default FileStream;
