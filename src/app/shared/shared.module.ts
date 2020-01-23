import {NgModule} from "@angular/core";
import {ButtonComponent} from "./button/button.component";
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
    imports: [
    ],
    declarations: [
        ButtonComponent,
        TopbarComponent
    ],
    exports: [
        ButtonComponent,
        TopbarComponent
    ]
})
export class SharedModule {}
