import {NgModule} from "@angular/core";
import {ButtonComponent} from "./button/button.component";
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    imports: [
    ],
    declarations: [
        ButtonComponent,
        TopbarComponent,
        FooterComponent
    ],
    exports: [
        ButtonComponent,
        TopbarComponent,
        FooterComponent
    ]
})
export class SharedModule {}
