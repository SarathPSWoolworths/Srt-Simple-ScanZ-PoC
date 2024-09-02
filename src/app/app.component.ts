import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  public imageSrc: any = '';
  errorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  submitImage() {
    alert('Image sent to sps@tcs.woolworths.com.au');
  }
  readURL(event: any ): void {
    if (!event?.currentTarget?.files) return;
    if (event.currentTarget.files && event.currentTarget.files[0]) {
        const file = event.currentTarget.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(file);
    }
}
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}