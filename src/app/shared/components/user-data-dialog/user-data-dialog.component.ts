import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SampleService } from 'src/app/sample.service';

@Component({
  selector: 'app-user-data-dialog',
  templateUrl: './user-data-dialog.component.html',
  styleUrls: ['./user-data-dialog.component.scss'],
})
export class UserDataDialogComponent implements OnInit {
  resources$: Observable<any[]> = this.sampleService.getSampleResources();

  showResources = true;
  userData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public userId: number,
    private sampleService: SampleService
  ) {}

  ngOnInit(): void {
    this.userId && this.getUserData(this.userId);
  }

  getUserData(userId: number) {
    this.sampleService
      .getUserData(userId)
      .subscribe((res) => res.data && (this.userData = res.data));
  }
}
