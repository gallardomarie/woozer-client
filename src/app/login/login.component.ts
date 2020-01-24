import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastController} from "@ionic/angular";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm: FormGroup;
  loginError: string;

  constructor(
      private auth: AuthService,
      private fb: FormBuilder,
      private toastController: ToastController,
      private userService: UserService,
      private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  login() {
    const data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    const credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signInWithEmail(credentials)
        .then(() => {
              this.router.navigate(['/homepage'], {state: {user: data.email}});
            }
           /* () => {
               this.userService.findUserByMail(data.email).then((data) => {
                 if (data != null) {
              this.router.navigate(['/homepage'], {state: {user: data}});
               } else {
                 console.log('L\'utilisateur n\'existe pas en base.');
               }
             },
               );
            }*/),
    error => this.displayErrorToaster(error.code)
    ;
  }

  async displayErrorToaster(errorCode: string) {
    let message = '';
    if (errorCode === 'auth/user-not-found') {
      message = 'Aucun utilisateur n\'est associé à l\'email saisi.';
    } else if (errorCode === 'auth/wrong-password') {
      message = 'Le mot de passe saisi est invalide.';
    } else {
      message = 'Erreur lors de la tentative de connexion. Veuillez réessayer.';
    }
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
