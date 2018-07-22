import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public thisDiaLogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String
  ){}

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDiaLogRef.close('Confirm');
  }

  onCloseCancel() {
    this.thisDiaLogRef.close('Cancel');
  }

}
