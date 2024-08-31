import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ReactiveFormComponent implements OnInit {


  ngOnInit() {
  }

}
