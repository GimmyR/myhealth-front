import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateOversightComponent } from "./create-oversight/create-oversight.component";
import { EditOversightComponent } from "./edit-oversight/edit-oversight.component";
import { ForgottenPasswordComponent } from "./forgotten-password/forgotten-password.component";
import { HomeComponent } from "./home/home.component";
import { OversightEntryEditComponent } from "./oversight-entry-edit/oversight-entry-edit.component";
import { OversightEntryComponent } from "./oversight-entry/oversight-entry.component";
import { OversightComponent } from "./oversight/oversight.component";
import { SettingsComponent } from "./settings/settings.component";
import { SignInComponent } from "./sign-in/sign-in.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "sign-in", component: SignInComponent },
    { path: "oversight/:id", component: OversightComponent },
    { path: "oversight-entry/add/:oversightId", component: OversightEntryComponent },
    { path: "oversight-entry/edit/:id", component: OversightEntryEditComponent },
    { path: "create-oversight", component: CreateOversightComponent },
    { path: "edit-oversight/:id", component: EditOversightComponent },
    { path: "settings", component: SettingsComponent },
    { path: "forgotten-password", component: ForgottenPasswordComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}