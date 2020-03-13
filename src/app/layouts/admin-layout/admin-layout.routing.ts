import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IpfsfileComponent } from '../../Ipfsfile/ipfsfile.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AddindividualComponent } from 'app/addindividual/addindividual.component';
import { AddemployeeComponent } from 'app/addemployee/addemployee.component';
import { AddcompanyComponent } from 'app/addcompany/addcompany.component';


export const AdminLayoutRoutes: Routes = [  
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'addcompany',   component: AddcompanyComponent },
    { path: 'addindividual',   component: AddindividualComponent },
    { path: 'addemployee',   component:AddemployeeComponent  },
    { path: 'table-list',     component: TableListComponent },
    { path: 'ipfsfile',     component: IpfsfileComponent },
    { path: 'icons',          component: IconsComponent },    
    { path: 'notifications',  component: NotificationsComponent },    
];
