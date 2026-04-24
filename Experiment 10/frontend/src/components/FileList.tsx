import React, { useState } from 'react';
import { fileService, fileServiceFilter} from '../services/fileService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { File as FileType } from '../types/file';
import { DocumentIcon, TrashIcon, ArrowDownTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const FileList: React.FC = () => {
  const queryClient = useQueryClient();

  // Search & Filters State
  const [filters, setFilters] = useState({
    filename: '',
    file_type: '',
    min_size: '',
    max_size: '',
    upload_date: '',
  });

  // Fetch Files with Filters
  const { data: files, isLoading, error, refetch } = useQuery<FileType[]>({
    queryKey: ['files', filters],
    queryFn: () => fileServiceFilter.getFiles(filters),
  });

  // Handle Filter Changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Refresh File List with Filters
  const applyFilters = () => {
    refetch();
  };

  // File Deletion Mutation
  const deleteMutation = useMutation({
    mutationFn: fileService.deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });

  // File Download Mutation
  const downloadMutation = useMutation({
    mutationFn: ({ fileUrl, filename }: { fileUrl: string; filename: string }) =>
      fileService.downloadFile(fileUrl, filename),
  });

  // Handle Delete
  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Handle Download
  const handleDownload = async (fileUrl: string, filename: string) => {
    try {
      await downloadMutation.mutateAsync({ fileUrl, filename });
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* 🔍 Search & Filters Section */}
      {/* <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Search & Filters</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <input
            type="text"
            name="filename"
            placeholder="Search by name"
            className="p-2 border rounded-md w-full"
            onChange={handleFilterChange}
          />
          <select name="file_type" className="p-2 border rounded-md w-full" onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="image/png">PNG</option>
            <option value="application/pdf">PDF</option>
            <option value="application/json">JSON</option>
          </select>
          <input
            type="number"
            name="min_size"
            placeholder="Min Size (KB)"
            className="p-2 border rounded-md w-full"
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="max_size"
            placeholder="Max Size (KB)"
            className="p-2 border rounded-md w-full"
            onChange={handleFilterChange}
          />
        </div>
        <button
          onClick={applyFilters}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
          Search
        </button>
      </div> */}

      {/* 📂 File List Section */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Uploaded Files</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error loading files.</p>
      ) : files?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <DocumentIcon className="mx-auto h-10 w-10 text-gray-400" />
          <p>No files found.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {files?.map((file) => (
  <li key={file.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between">
    <div>
      <p className="font-medium text-gray-900">{file.original_filename}</p>
      <p className="text-sm text-gray-500">{file.file_type} • {(file.size / 1024).toFixed(2)} KB</p>
      <p className="text-sm text-gray-400">Uploaded {new Date(file.uploaded_at).toLocaleString()}</p>
    </div>
    <div className="flex space-x-2 mt-2 md:mt-0">
      <button
        onClick={() => handleDownload(file.id, file.original_filename)}
        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
      >
        Download
      </button>

      {/* Only show Stream button for videos or audio */}
      {['video/mp4', 'audio/mpeg', 'video/webm'].includes(file.file_type) && (
  <a
    href={fileService.getStreamUrl(file.id)}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700"
  >
    Stream
  </a>
)}

      <button
        onClick={() => handleDelete(file.id)}
        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  </li>
))}
        </ul>
      )}
    </div>
  );
};


