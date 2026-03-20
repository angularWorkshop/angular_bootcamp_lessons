export interface SearchLesson {
  id: number;
  title: string;
  format: 'Video' | 'Workshop' | 'Guide';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}
