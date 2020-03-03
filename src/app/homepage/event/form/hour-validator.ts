import { AbstractControl } from '@angular/forms';

export function ValidateHours(control: AbstractControl) {
    if (control.value) {
        const heure = control.value.split(':');
        const heureEnTroisPartie = heure.length === 3;
        if ( !heureEnTroisPartie) {
            return {format: true};
        }
        const heureEntre00Et23 = +heure[0] >= 0 && +heure[0] < 24;
        const minEntre00Et60 = +heure[1] >= 0 && +heure[1] < 60;
        const secEntre00Et60 = +heure[2] >= 0 && +heure[2] < 60;
        const heure2Chiffres = heure[0].length === 2;
        const min2Chiffres = heure[1].length === 2;
        const sec2Chiffres = heure[2].length === 2;
        if (heureEntre00Et23 && minEntre00Et60 && secEntre00Et60 && heure2Chiffres && min2Chiffres && sec2Chiffres) {
            return null;
        } else {
            return {format: true};
        }
    }
}
