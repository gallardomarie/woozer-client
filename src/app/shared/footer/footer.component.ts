import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

    navigateToCalendar() {
        // TODO
        console.log('Je navigue sur le calendar');
    }

    navigateToTricount() {
        // TODO
        console.log('Je navigue sur le tricount');
    }

    navigateToGallery() {
        // TODO
        console.log('Je navigue dans la galerie');
    }

    navigateToChat() {
        // TODO
        console.log('Je navigue sur le chat');
    }

    navigateToHomepage() {
        // TODO
        console.log('Je navigue sur la page d accueil ');
    }


}
