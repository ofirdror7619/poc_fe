import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-results-output',
  templateUrl: './results-output.component.html',
  styleUrls: ['./results-output.component.css']
})
export class ResultsOutputComponent implements OnInit {
  responseData: any;
  loading = false;

  constructor() { }

  @Input()
  set response(value: string) {
    this.responseData = JSON.parse(value);
  }

  @Input()
  set submitClicked(value: boolean) {
    this.loading = value;
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

}
