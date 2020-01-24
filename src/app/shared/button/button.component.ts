import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    //styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {

    @Input() text: string;

    //TODO réussir à afficher le bouton de la bonne couleur à partir de la variable --woozer-primary-blue
    //TODO enlever le style mis direct dans le button et le mettre dans un fichier css
    //TODO faire un fichier css global et l'importer sur chaque page? ou fichier propre à chaque composant pour ne pas tout charger à chaque fois? Voir internet

}