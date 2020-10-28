import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { storedUsers, userScore } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store) {
    this.getUsers();
  }
  getUsers(): void {
    if (localStorage && localStorage.getItem('users')) {
      try {
        const users = JSON.parse(localStorage.getItem('users'));
        if (Array.isArray(users)) {
          this.store.dispatch(storedUsers({oldUsers: users}));
        }
      } catch (err) {
        // do nothing
      }
    }
  }
  title = 'zoomTest';
}
