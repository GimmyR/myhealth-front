import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { OversightEntryComponent } from "./oversight-entry/oversight-entry.component";
import { OversightComponent } from "./oversight/oversight.component";
import { SignInComponent } from "./sign-in/sign-in.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "sign-in", component: SignInComponent },
    { path: "oversight/:id", component: OversightComponent },
    { path: "oversight-entry/:oversightId", component: OversightEntryComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}