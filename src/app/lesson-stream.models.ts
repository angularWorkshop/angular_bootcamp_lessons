export interface LessonPreview {
  id: number;
  title: string;
  format: 'Video' | 'Workshop' | 'Lab';
  durationMinutes: number;
  isNew: boolean;
}
