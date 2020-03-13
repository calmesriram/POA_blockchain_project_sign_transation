import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IpfsfileComponent } from '../../Ipfsfile/ipfsfile.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { MaterialModule } from 'materialmodule/appMaterial.module';
import { AddindividualComponent } from 'app/addindividual/addindividual.component';
import { AddemployeeComponent } from 'app/addemployee/addemployee.component';
import { AddcompanyComponent } from 'app/addcompany/addcompany.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    AddcompanyComponent,
    AddindividualComponent,
    AddemployeeComponent,
    TableListComponent,
    IpfsfileComponent,
    IconsComponent,    
    NotificationsComponent
    
  ]
})

export class AdminLayoutModule {}
