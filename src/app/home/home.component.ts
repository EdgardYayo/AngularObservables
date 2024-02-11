import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(
    //   (count) => {
    //     console.log(count);

    //   }
    // );

    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count); // Make the Observable going on
        if (count === 2) {
          observer.complete(); // Make the Observable completes and end
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!')); // Make the Observable throw an error and end
        }
        count++;
      }, 1000)
    });


    this.firstObsSubscription = customIntervalObservable.pipe(filter((data: number) => {
      return data % 2 === 0;
    }),map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe((data) => {
      console.log(data);
    }, (error) => { // To handle the error in the Observable
      console.log(error);
      alert(error.message);
    }, () => { // To handle the completion of the Observable
      console.log('Completed!');
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
