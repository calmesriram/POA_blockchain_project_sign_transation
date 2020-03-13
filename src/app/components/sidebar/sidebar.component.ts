import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'menu/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: 'menu/addcompany', title: 'Add Company',  icon:'person', class: '' },
    { path: 'menu/addindividual', title: 'Add Individual',  icon:'person', class: '' },
    { path: 'menu/addemployee', title: 'Add Employee',  icon:'person', class: '' },
    { path: 'menu/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: 'menu/ipfsfile', title: 'IPFS',  icon:'library_books', class: '' },
    { path: 'menu/icons', title: 'Icons',  icon:'bubble_chart', class: '' },    
    { path: 'menu/notifications', title: 'Notifications',  icon:'notifications', class: '' },    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
