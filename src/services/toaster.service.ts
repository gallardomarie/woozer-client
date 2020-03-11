import {Injectable} from "@angular/core";
import {ToastController} from "@ionic/angular";

@Injectable()
export class ToasterService {

    constructor(
        private toastController: ToastController,
    ) { }

    async displayMessage(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 3000
        });
        toast.present();
    }

}