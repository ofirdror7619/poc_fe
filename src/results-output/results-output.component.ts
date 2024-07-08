import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-results-output',
  templateUrl: './results-output.component.html',
  styleUrls: ['./results-output.component.css']
})
export class ResultsOutputComponent implements OnInit {
  @Input() response!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
