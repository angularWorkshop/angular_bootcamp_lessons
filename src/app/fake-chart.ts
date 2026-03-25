export class FakeChart {
  private destroyed = false;

  constructor(
    private readonly host: HTMLElement,
    private readonly width: number,
  ) {
    this.host.setAttribute('data-chart-ready', 'true');
    this.host.setAttribute('data-chart-width', `${this.width}`);
  }

  destroy(): void {
    this.destroyed = true;
    this.host.removeAttribute('data-chart-ready');
  }

  isDestroyed(): boolean {
    return this.destroyed;
  }
}
