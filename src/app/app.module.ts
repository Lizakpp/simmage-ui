import { ReduxService } from './services/utils/redux.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgModule, OpaqueToken } from '@angular/core';

import { AgGridModule } from 'ag-grid-angular/main';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CanActivateIfLogged } from './services/guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from './services/guards/can-activate-if-user.guard';
import { CanDeactivateGuard } from './services/guards/can-deactivate.guard';
import { CheckboxRendererComponent } from './grid/renderers/checkbox';
import { DeviceService } from './services/utils/device.service';
import { DocumentService } from './services/backend/document.service';
import { DocumentsService } from './services/backend/documents.service';
import { DossiersService } from './services/backend/dossiers.service';
import { DossierStatusService } from './services/backend/dossier-status.service';
import { EnumsService } from './services/backend/enums.service';
import { EventService } from './services/backend/event.service';
import { EventsService } from './services/backend/events.service';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '@angular/material';
import { NoteService } from './services/backend/note.service';
import { NotesService } from './services/backend/notes.service';
import { ObjectiveService } from './services/backend/objective.service';
import { ObjectivesService } from './services/backend/objectives.service';
import { OrganService } from './services/backend/organ.service';
import { ParticipantsService } from './services/backend/participants.service';
import { PgService } from './services/backend/pg.service';
import { PortalsService } from './services/backend/portals.service';
import { PreferencesService } from './services/utils/preferences.service';
import { ResourcesService } from './services/backend/resources.service';
import { SharedModule } from './shared/shared.module';
import { FormsDialogModule } from './shared/forms/forms-dialog.module';
import { SnackService } from './services/utils/snack.service';
import { SwitchthemeService } from './services/utils/switchtheme.service';
import { TopicService } from './services/backend/topic.service';
import { UserService } from './services/utils/user.service';
import { FormLeaveDialogService } from './services/utils/form-leave-dialog.service';
import { FormsDialogService } from './services/utils/forms-dialog.service';
import { PgDateFormaterService } from './services/utils/pg-date-formater.service';
import { DialogEventDetailsService } from './services/utils/dialog-event-details.service';
import { routing } from './app.routing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CheckboxRendererComponent
  ],
  imports: [
    // ng
    BrowserModule,
    // CommonModule,
    // ng modules
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    // app
    routing,
    SharedModule,
    NoopAnimationsModule,
    AgGridModule.withComponents([
      CheckboxRendererComponent
    ]),
    FormsDialogModule,
    CalendarModule.forRoot()
  ],
  providers: [
    PgService,
    UserService,
    DossiersService,
    DossierStatusService,
    DeviceService,
    SnackService,
    PortalsService,
    CanActivateIfLogged,
    CanActivateIfUser,
    CanDeactivateGuard,
    CanDeactivateGuard,
    DocumentService,
    DocumentsService,
    SwitchthemeService,
    ParticipantsService,
    EnumsService,
    TopicService,
    OrganService,
    EventService,
    EventsService,
    DocumentService,
    DocumentsService,
    NoteService,
    NotesService,
    ResourcesService,
    ObjectiveService,
    ObjectivesService,
    PreferencesService,
    FormLeaveDialogService,
    ReduxService,
    FormsDialogService,
    PgDateFormaterService,
    DialogEventDetailsService
  ],
  exports: [
    AgGridModule
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
