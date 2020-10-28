import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from '../../../../interfaces/model-interface';
import { selectusers } from '../../../../store/main-reducer';
import { addUser } from '../../../../store/actions';

@Component({
  selector: 'app-sgin-form',
  templateUrl: './sgin-form.component.html',
  styleUrls: ['./sgin-form.component.scss']
})
export class SginFormComponent implements OnInit, OnDestroy {
  name = '';
  usersSub: Subscription;
  users: User[];
  isAlready: boolean;
  constructor(
    public dialogRef: MatDialogRef<SginFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
    ) {}

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }
  ngOnInit(): void {
    this.usersSub  = this.store.select(selectusers).subscribe(data => {
      this.users = data;
    });
  }

  checkuser(name: string): boolean {
    for (let i = 0 ; i <  this.users.length; i++) {
      if (this.users[i].userName === name) {
        return true;
      }
    }
    return false;
  }
  addUser(): void {
    if (this.checkuser(this.name)) {
      this.isAlready = true;
    } else {
      this.isAlready = false;
      this.store.dispatch(addUser({userName: this.name}));
      this.dialogRef.close();
    }
  }
}
