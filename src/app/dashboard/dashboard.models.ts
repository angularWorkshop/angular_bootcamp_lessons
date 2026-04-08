export type SearchScreenState = 'idle' | 'searching' | 'empty' | 'error' | 'results';
export type LessonStatus = 'Live' | 'Draft' | 'Archived';
export type LessonStatusFilter = 'all' | LessonStatus;

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
