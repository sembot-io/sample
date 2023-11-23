import { Component } from '@angular/core';
import { SampleService } from './sample.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDataDialogComponent } from './shared/components/user-data-dialog/user-data-dialog.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface dataInterface {
  users: any[];
}

interface SampleDataInterface {
  users?: any[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sample';

  get search() {
    return this.form.get('search') as FormControl;
  }

  form: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  usersList: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: any[];
  };
  usersListData: any[];

  displayed_columns: string[] = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email',
    'actions',
  ];

  constructor(public dialog: MatDialog, private sampleService: SampleService) {
    this.sampleService.getUersList().subscribe((res) => {
      this.usersList = res;
      this.usersListData = res.data;
    });

    this.search.valueChanges.subscribe(
      (val) =>
        (this.usersListData = this.usersList.data.filter((user: any) =>
          user.email.startsWith(val)
        ))
    );
  }

  showUserData(userId: number) {
    const dialogRef = this.dialog.open(UserDataDialogComponent, {
      width: '550px',
      data: userId,
    });
  }
}
