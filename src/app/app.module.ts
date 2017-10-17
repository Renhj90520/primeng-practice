import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MenuModule, PanelModule, ChartModule, InputTextModule, ButtonModule, InputMaskModule,
  InputTextareaModule, EditorModule, CalendarModule, RadioButtonModule, FieldsetModule,
  DropdownModule, MultiSelectModule, ListboxModule, SpinnerModule, SliderModule, RatingModule,
  DataTableModule, ContextMenuModule, TabViewModule, DialogModule, StepsModule, ScheduleModule, TreeModule, DataGridModule, TooltipModule, ConfirmDialogModule, GrowlModule, DragDropModule, GalleriaModule
} from 'primeng/primeng';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlltimesComponent } from './alltimes/alltimes.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProfileComponent } from './profile/profile.component';
import { StatisticComponent } from './statistic/statistic.component';
import { FielderrorsComponent } from './fielderrors/fielderrors.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'alltimes', component: AlltimesComponent },
  { path: 'timesheet', component: TimesheetComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    DashboardComponent,
    AlltimesComponent,
    TimesheetComponent,
    ProjectsComponent,
    ProfileComponent,
    StatisticComponent,
    FielderrorsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PanelModule,
    MenuModule,
    RouterModule.forRoot(appRoutes),
    ChartModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    InputTextareaModule,
    EditorModule,
    CalendarModule,
    RadioButtonModule,
    FieldsetModule,
    DropdownModule,
    MultiSelectModule,
    ListboxModule,
    SpinnerModule,
    SliderModule,
    RatingModule,
    DataTableModule,
    ContextMenuModule,
    TabViewModule,
    DialogModule,
    StepsModule,
    ScheduleModule,
    TreeModule,
    DataGridModule,
    TooltipModule,
    ConfirmDialogModule,
    GrowlModule,
    DragDropModule,
    GalleriaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
