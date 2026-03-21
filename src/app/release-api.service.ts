import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

export interface ReleaseQueueApiItem {
  id: string;
  name: string;
  environment: 'dev' | 'staging' | 'prod';
  blockers: number;
  warnings: number;
}

export interface ReleaseQueueCard {
  id: string;
  title: string;
  status: 'ready' | 'watch' | 'blocked';
  summary: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReleaseApiService {
  constructor(private readonly http: HttpClient) {}

  public loadQueue(): Observable<ReleaseQueueCard[]> {
    return this.http.get<ReleaseQueueApiItem[]>('/api/release-queue').pipe(
      map((items) =>
        items.map((item) => ({
          id: item.id,
          title: `${item.environment.toUpperCase()}: ${item.name}`,
          status: this.getStatus(item),
          summary: this.getSummary(item),
        })),
      ),
    );
  }

  public retryRelease(id: string): Observable<string> {
    return this.http.post<{ message: string }>(`/api/release-queue/${id}/retry`, {}).pipe(
      map((response) => response.message),
      catchError(() => of('Retry failed')),
    );
  }

  private getStatus(item: ReleaseQueueApiItem): 'ready' | 'watch' | 'blocked' {
    if (item.blockers > 0) {
      return 'blocked';
    }

    if (item.warnings > 0) {
      return 'watch';
    }

    return 'ready';
  }

  private getSummary(item: ReleaseQueueApiItem): string {
    if (item.blockers > 0) {
      return `${item.blockers} blockers`;
    }

    if (item.warnings > 0) {
      return `${item.warnings} warnings`;
    }

    return 'Ready for release';
  }
}
