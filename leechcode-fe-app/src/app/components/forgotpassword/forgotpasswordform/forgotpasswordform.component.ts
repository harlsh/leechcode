import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpasswordform',
  templateUrl: './forgotpasswordform.component.html',
  styleUrls: ['./forgotpasswordform.component.css']
})
export class ForgotpasswordformComponent implements OnInit {
  @Output() formData: EventEmitter<{
    email: string;
  }> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.form.get('email');
  }


  onSubmit() {
    this.formData.emit(this.form.value);
  }

}
