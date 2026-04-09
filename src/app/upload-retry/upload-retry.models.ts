export interface RetryFileVm {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'queued' | 'uploading' | 'failed' | 'done' | 'canceled';
  progress: number;
  error: string;
}

export const INPUT_FILES: RetryFileVm[] = [
  { id: 'poster.png', name: 'poster.png', type: 'image/png', size: 1000, status: 'queued', progress: 0, error: '' },
  { id: 'huge.mov', name: 'huge.mov', type: 'video/quicktime', size: 5000, status: 'queued', progress: 0, error: '' },
];
