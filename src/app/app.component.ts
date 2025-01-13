// import { Component, OnInit } from '@angular/core';
// import { take } from 'rxjs';
// import { OlympicService } from './core/services/olympic.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent implements OnInit {
//   constructor(private olympicService: OlympicService) {}

//   ngOnInit(): void {
//     this.olympicService.loadInitialData().pipe(take(1)).subscribe();
//   }

//   codeSample: string = `
//     const hello = "Hello, Highlight.js!";
//     console.log(hello);
//   `;
//   languageSample: string = 'typescript';
// }
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import {NavigationEnd, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Pabiosoft';
  // Exemple de code à afficher dans le composant de surlignage
  codeSample: string = `
    const hello = "Hello, Highlight.js!";
    console.log(hello);
  `;

  // Langage du code à afficher
  languageSample: string = 'typescript';

  // constructor(private olympicService: OlympicService) {}
  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Remonte en haut de la page à chaque navigation
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  ngOnInit(): void {
    // this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
