// src/services/fileService.ts
import axios from 'axios';

// Axios instance with base URL if needed
const api = axios.create({
  baseURL: '/api', // adjust if backend is on another origin
  responseType: 'blob',
});




export const fileService = {
  // stream
  getStreamUrl: (id: string): string => {
    // Assumes same-origin or CORS enabled
    return `http://localhost:8080/api/stream/${id}`;
  },

  // Upload File (multipart)
  uploadFile: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data; // ID returned
  },

  // Download File by ID
  downloadFile: async (id: string, filename: string): Promise<void> => {
    const response = await axios.get(`/api/download/${id}`, {
      headers: { 'Accept': '*/*' },
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(link.href);
  },

  // Delete functionality: You need to implement /api/media/{id} DELETE on the backend if desired
  deleteFile: async (id: string): Promise<void> => {
    await axios.delete(`/api/media/${id}`);
  },
};

export const fileServiceFilter = {
  // Fetch paginated media metadata
  getFiles: async (filters: {
    filename?: string; // Not supported in backend yet
    file_type?: string;
    min_size?: string;
    max_size?: string;
    upload_date?: string;
  }) => {
    // Only pagination is supported, others ignored unless added to backend
    const page = 0;
    const size = 100;
    const sortBy = 'uploadedAt';
    const desc = true;

    const response = await axios.get('/api/media', {
      params: { page, size, sortBy, desc },
    });

    return response.data.content.map((item: any) => ({
      id: item.id,
      original_filename: item.filename,
      file_type: item.contentType,
      size: item.size,
      uploaded_at: item.uploadedAt,
      file: item.id, // Use this as file ID to download
    }));
  },
};
