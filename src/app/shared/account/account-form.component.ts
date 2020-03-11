import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import {User} from "../../login/user";
import {CacheService} from "../../../services/cache.service";
import {ToasterService} from "../../../services/toaster.service";

@Component({
    selector: 'app-account-form',
    templateUrl: './account-form.component.html',
    styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {

    @Input() creation: boolean;

    accountForm: FormGroup;
    user: User;

    password: string;
    passwordConfirmation: string;

    constructor(
        private auth: AuthService,
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private cacheService: CacheService,
        private toasterService: ToasterService
    ) {
        this.accountForm = fb.group({
            email: [''],
            username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(6)])]

        });
    }

    ngOnInit(): void {
        if (this.creation) {
            this.user = new User(null, null, null);
        } else {
            this.user = this.cacheService.getUser();
        }
    }

    save() {
        if (!this.user.username|| this.user.username === "") {
            this.toasterService.displayMessage("Erreur : le nom d'utilisateur n'est pas valide.");
        } else if (this.creation) {
            if (!this.user.email || this.user.email === "") {
                this.toasterService.displayMessage("L'email saisi n'est pas valide.");
            } else if (!this.password || !this.passwordConfirmation || this.password.length < 6) {
                this.toasterService.displayMessage("Le mot de passe saisi n'est pas valide.");
            } else if (this.password !== this.passwordConfirmation) {
                this.toasterService.displayMessage("Les deux mots de passe saisis ne sont pas identiques.");
            } else {
                this.createAccount();
            }
        } else {
            this.editAccount();
        }
    }

    createAccount() {
        let credentials = {
            email: this.user.email,
            password: this.password
        };
        this.auth.registerUser(credentials).then(
            success => {
            this.userService.save(this.user).then(() => {
                this.toasterService.displayMessage("Votre compte a bien été crée. Vous pouvez désormais vous authentifier.");
                this.router.navigate(['']);
            });
        },
            error => {
                let message = "";
                if(error.code === "auth/email-already-in-use") {
                    message = "Erreur : un compte existe déjà avec cet email."
                } else {
                    message = "Erreur lors de la création de compte. Veuillez réessayer.";
                }
                this.toasterService.displayMessage(message);
            });
    }

    editAccount() {
        this.userService.save(this.user).then((userSaved) => {
            this.toasterService.displayMessage("Votre compte a bien été modifié.");
            this.cacheService.changeTitleTopBar("");
            this.cacheService.setUser(userSaved);
            this.router.navigateByUrl('/woozer/home');
        });
    }

}
