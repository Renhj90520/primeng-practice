import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fielderrors',
  templateUrl: './fielderrors.component.html',
  styleUrls: ['./fielderrors.component.css']
})
export class FielderrorsComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() fieldName: string;
  @Input() niceName: string;

  constructor() { }

  ngOnInit() {
  }

  fieldErrors(field: string) {
    const controlstate = this.form.controls[field];
    return (controlstate.dirty && controlstate.errors) ? controlstate.errors : null;
  }
}
