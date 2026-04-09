export interface UploadFileVm {
  id: string;
  name: string;
  status: 'queued' | 'uploading' | 'done';
  progress: number;
  previewUrl: string;
}

export const DEMO_FILES: UploadFileVm[] = [
  { id: 'hero.png', name: 'hero.png', status: 'queued', progress: 0, previewUrl: 'hero.png' },
  { id: 'team.webp', name: 'team.webp', status: 'queued', progress: 0, previewUrl: 'team.webp' },
];
