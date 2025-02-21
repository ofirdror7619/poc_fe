import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject, Subscription} from "rxjs";
import {DataService} from "../app/data.service";

@Component({
  selector: 'app-alarm-form',
  templateUrl: './alarm-form.component.html',
  styleUrls: ['./alarm-form.component.css']
})
export class AlarmFormComponent implements OnInit {
  alarmForm: FormGroup;
  response: string = ''
  posts: any[] | undefined;
  private destroy$: Subject<void> = new Subject<void>();
  private subscription: Subscription | undefined;
  isSubmitting: boolean = false;
  alarmNames = ['metadata-producer-without-media-files', 'metadata-producer-osLogin-not-found'];
  @Output() responseChange = new EventEmitter<string>();
  @Output() submitClicked = new EventEmitter<boolean>();


  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.alarmForm = this.fb.group({
      alarmName: [''],
      region: [''],
      date: [''],
    });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    this.fetchData(this.alarmForm.value);
    this.isSubmitting = true;
    this.submitClicked.emit(true);
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
          this.response = JSON.stringify(this.posts);
          this.responseChange.emit(this.response);
          this.isSubmitting = false;
          this.submitClicked.emit(false);// emit the new response
        },
        error => {
          console.error('Error fetching data:', error);
          // Handle error as needed
        }
      );
  }

  ngOnInit(): void {
  }
}
