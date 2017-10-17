import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Menu } from 'primeng/components/menu/menu';
import { ActivatedRoute, Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  menuItems: MenuItem[];
  miniMenuItems: MenuItem[];

  @ViewChild('bigMenu') bigMenu: Menu;
  @ViewChild('smallMenu') smallMenu: Menu;

  constructor(private router: Router) { }
  ngOnInit(): void {
    const handleSelected = function (event) {
      const allMenus = jQuery(event.originalEvent.target).closest('ul');
      const allLinks = allMenus.find('.menu-selected');

      allLinks.removeClass('menu-selected');
      const selected = jQuery(event.originalEvent.target).closest('a');
      selected.addClass('menu-selected');
    };
    this.menuItems = [
      { label: 'Dashboard', icon: 'fa-home', routerLink: ['/dashboard'], command: (event) => handleSelected(event) },
      { label: 'All Times', icon: 'fa-calendar', routerLink: ['/alltimes'], command: (event) => handleSelected(event) },
      { label: 'My Timesheet', icon: 'fa-clock-o', routerLink: ['/timesheet'], command: (event) => handleSelected(event) },
      { label: 'Add Project', icon: 'fa-tasks', routerLink: ['/projects'], command: (event) => handleSelected(event) },
      { label: 'My Profile', icon: 'fa-users', routerLink: ['/profile'], command: (event) => handleSelected(event) },
      { label: 'Settings', icon: 'fa-sliders', routerLink: ['/settings'], command: (event) => handleSelected(event) },
    ];

    this.miniMenuItems = [];
    this.menuItems.forEach((item: MenuItem) => {
      const miniItem = { icon: item.icon, routerLink: item.routerLink };
      this.miniMenuItems.push(miniItem);
    });

  }
  selectInitialMenuItemBasedOnUrl() {
    const path = document.location.pathname;
    const menuItem = this.menuItems.find(item => item.routerLink[0] === path);
    if (menuItem) {
      const selectedIcon = this.bigMenu.container.querySelector(`.${menuItem.icon}`);
      jQuery(selectedIcon).closest('li').addClass('menu-selected');
    }
  }
  ngAfterViewInit(): void {
    this.selectInitialMenuItemBasedOnUrl();
  }
}
