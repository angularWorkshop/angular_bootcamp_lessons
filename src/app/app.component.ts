import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Booking Summary';
  protected readonly adultPrice = 12;
  protected readonly childPrice = 7;

  protected readonly adults = signal(0);
  protected readonly children = signal(0);

  protected readonly totalTickets = computed(() => this.adults() + this.children());

  protected readonly totalPrice = computed(
    () => this.adults() * this.adultPrice + this.children() * this.childPrice,
  );

  protected readonly bookingStatus = computed(() => {
    const tickets = this.totalTickets();

    if (tickets === 0) {
      return 'No tickets selected';
    }

    if (tickets >= 4) {
      return 'Group booking';
    }

    return 'Booking in progress';
  });

  protected increaseAdults(): void {
    this.adults.update(value => value + 1);
  }

  protected decreaseAdults(): void {
    this.adults.update(value => Math.max(0, value - 1));
  }

  protected increaseChildren(): void {
    this.children.update(value => value + 1);
  }

  protected decreaseChildren(): void {
    this.children.update(value => Math.max(0, value - 1));
  }
}
