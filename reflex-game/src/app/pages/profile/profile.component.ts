import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';


import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  currentUserEmail: string | null = null;
  currentUserName: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Felhasználói adatok lekérése
    this.currentUserEmail = this.authService.getCurrentUserEmail();
    this.currentUserName = this.authService.getCurrentUserDisplayName();
    
    // Form inicializálása
    this.initializeForm();
  }

  private initializeForm(): void {
    // A névből először ki kell nyerni a kereszt- és vezetéknevet
    let firstName = '';
    let lastName = '';
    
    if (this.currentUserName && this.currentUserName !== 'Vendég') {
      const nameParts = this.currentUserName.split(' ');
      if (nameParts.length >= 2) {
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(' ');
      } else {
        firstName = this.currentUserName;
      }
    }

    this.profileForm = this.fb.group({
      firstName: [firstName, [Validators.required]],
      lastName: [lastName, [Validators.required]],
      email: [this.currentUserEmail, [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Jelszó egyezőség ellenőrző validátor
  private passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    // Ha egyik mezőben sincs érték, vagy a két érték megegyezik, akkor érvényes
    if (!password?.value && !confirmPassword?.value) {
      return null;
    }
    
    return password && confirmPassword && password.value === confirmPassword.value 
      ? null : { 'passwordMismatch': true };
  }

  onSubmit(): void {
    if (this.profileForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const formData = this.profileForm.value;
    
    // Csak akkor küldjük a jelszót, ha meg lett adva
    const userData: any = {
      name: {
        firstname: formData.firstName,
        lastname: formData.lastName
      },
      email: formData.email
    };

    if (formData.password) {
      userData.password = formData.password;
    }

    // Itt implementálnánk a profil frissítést
    // Példa:
    console.log('Profil adatok frissítése:', userData);

    // Mock adatfrissítés (production környezetben ide API hívás kerülne)
    setTimeout(() => {
      this.isSubmitting = false;
      this.snackBar.open('A profiladatok sikeresen frissítve!', 'Rendben', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      
      // Frissítjük a kijelzett nevet, ha változott
      if (this.currentUserName !== `${formData.firstName} ${formData.lastName}`) {
        this.currentUserName = `${formData.firstName} ${formData.lastName}`;
      }
      
      // Ha az email is változott, érdemes lehet újra betölteni az oldalt
      // vagy frissíteni az auth service-t
      if (this.currentUserEmail !== formData.email) {
        this.currentUserEmail = formData.email;
      }
      
      // Jelszó mezők törlése a sikeres mentés után
      this.profileForm.patchValue({
        password: '',
        confirmPassword: ''
      });
    }, 1500);
  }

  // Getter metódusok a form mezőkhöz - ezeket használjuk a templateben
  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }
  get password() { return this.profileForm.get('password'); }
  get confirmPassword() { return this.profileForm.get('confirmPassword'); }
}