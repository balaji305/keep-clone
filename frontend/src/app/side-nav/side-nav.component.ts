import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  @Input() sideNavStatus!: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  lists = [
    {
      number: '1',
      name: 'Notes',
      icon: 'fa-solid fa-house',
      href: '/dashboard',
    },
    {
      number: '1',
      name: 'Archive',
      icon: 'fa-solid fa-folder',
      href: '/archive',
    },
    { number: '1', name: 'Bin', icon: 'fa-solid fa-trash-can', href: '/bin' },
  ];

  redirectTo(href: any) {
    this.router.navigate(['.' + href]);
  }
}
