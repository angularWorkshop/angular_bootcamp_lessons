export type DashboardScreenState = 'idle' | 'loading' | 'empty' | 'error' | 'success';
export type LessonStatus = 'Live' | 'Draft' | 'Archived';

export interface DashboardLesson {
  id: string;
  title: string;
  owner: string;
  track: string;
  status: LessonStatus;
  durationMinutes: number;
  learners: number;
  summary: string;
}
