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
  myForm: FormGroup;
  posts: any[] | undefined;
  private destroy$: Subject<void> = new Subject<void>();
  private subscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.myForm = this.fb.group({
      agent: [''],
      region: ['']
    });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    this.fetchData(this.myForm.value);
  }

  fetchData(params: any) {
    this.subscription = this.dataService.getRequest(params)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (data: any) => {
          this.posts = data;
          console.log('Data received:', this.posts);
        },
        error => {
          console.error('Error fetching data:', error);
          // Handle error as needed
        }
      );
  }
}