export interface LessonSuggestion {
  id: number;
  title: string;
  format: 'Guide' | 'Checklist' | 'Workshop';
  durationMinutes: number;
}
