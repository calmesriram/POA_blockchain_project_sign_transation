import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IpfsfileComponent } from '../../Ipfsfile/ipfsfile.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AdddetailComponent } from 'app/adddetail/adddetail.component';

export const AdminLayoutRoutes: Routes = [  
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'adddetail',   component: AdddetailComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'ipfsfile',     component: IpfsfileComponent },
    { path: 'icons',          component: IconsComponent },    
    { path: 'notifications',  component: NotificationsComponent },    
];
