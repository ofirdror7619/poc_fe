import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../app/data.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  response: string = ''
  isClicked: boolean = false;

  handleResponseChange(newResponse: string) {
    this.response = newResponse;
  }

  handleSubmitClicked(isClicked: boolean) {
    this.isClicked = isClicked;
  }

  constructor(){}

  ngOnDestroy(): void {
    // TODO document why this method 'ngOnDestroy' is empty
  }
}
