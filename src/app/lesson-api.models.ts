export interface LessonDto {
  id: number;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  published: boolean;
}

export interface LessonApiResponse {
  items: LessonDto[];
  total: number;
}
