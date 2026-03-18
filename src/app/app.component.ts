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

  // TODO: derive the total number of tickets from adults and children
  protected readonly totalTickets = computed(() => 0);

  // TODO: derive the total price from adults, children and prices
  protected readonly totalPrice = computed(() => 0);

  // TODO: derive status from totalTickets
  protected readonly bookingStatus = computed(() => 'No tickets selected');

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
