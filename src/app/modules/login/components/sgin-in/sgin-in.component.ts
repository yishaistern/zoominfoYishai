import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SginFormComponent } from '../sgin-form/sgin-form.component';
@Component({
  selector: 'app-sgin-in',
  templateUrl: './sgin-in.component.html',
  styleUrls: ['./sgin-in.component.scss']
})
export class SginInComponent implements OnInit, OnDestroy {
  dialogSub: Subscription;
  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnDestroy(): void {
    this.dialogSub.unsubscribe();
  }
  ngOnInit(): void {
    this.openSginInDialog();
  }

  openSginInDialog(): void {
    const dialogRef = this.dialog.open(SginFormComponent, {
      data: {}
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/game']);
    });
  }
}
