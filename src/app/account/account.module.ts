import { DossiersListResolve } from './dossiers/dossiers-list-resolve.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { accountRouting } from './account.routing';
import { AccountSidenavComponent } from './account-sidenav/account-sidenav.component';
import { MaterialModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { NotesComponent } from './notes/notes.component';
import { ProfileComponent } from './profile/profile.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { DossiersComponent } from './dossiers/dossiers.component';
import { EventsComponent } from './events/events.component';
import { DocumentsComponent } from './documents/documents.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './account.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    accountRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountComponent,
    AccountSidenavComponent,
    NotesComponent,
    ProfileComponent,
    ProceduresComponent,
    DossiersComponent,
    EventsComponent,
    DocumentsComponent,
    UserInformationComponent,
    ChangePasswordComponent
  ],
  providers: [
    DossiersListResolve,
    AccountService
  ]
})
export class AccountModule { }
