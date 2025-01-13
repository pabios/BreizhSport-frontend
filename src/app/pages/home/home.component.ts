import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ArticleModel} from "../../core/models/article.model";
import {ArticleService} from "../../core/services/article.service";
import {TechnologieService} from "../../core/services/technologie.service";
import {Technology} from "../../core/models/technologies.model";
import { Router } from '@angular/router';
import html2canvas from "html2canvas";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  iconAtEnd: boolean = false;
  confirmationMessage: string | null = null;
  loadings: boolean = true;
  //
  articles: ArticleModel[] | null = null ;
  technologies: Technology[] | null = null;
  //
  items = [
    {
      icon: 'pi pi-download',
      command: () => {
        console.log('Téléchargement du logo...');
        // Ajouter ici votre logique de téléchargement
      },
    },
    {
      icon: 'pi pi-external-link',
      url: 'https://monimba.com',
      target: '_blank',
    },
  ];
  //
  sponsors = [
    {
      name: 'Monimba',
      description: 'Agence Immobilière 🇬🇳',
      logo: './assets/sponsors-logo/monimba.png',
      link: 'https://monimba.com',
    },
    {
      name: 'Jean Paul Macron',
      description: 'Développeur chez XYZ 🇫🇷',
      logo: './assets/logo/pabiosoft-logo.png',
      link: 'https://sponsor2.com',
    },
    // Ajoutez plus de sponsors ici si nécessaire
  ];


  constructor(
      private articleService: ArticleService,
      private technologieService: TechnologieService,
      private router: Router
  ) {}

  ngOnInit(): void {
    // this.olympics$ = this.olympicService.getOlympics();
    this.articleService.loadInitialData().subscribe({
      next: () => {
        this.articleService.getArticles().subscribe((articles) => {
          this.articles = articles;
        });
      },
      error: (err) => console.error('Error loading articles:', err)
    });
    // Charger les technologies initiales
    this.technologieService.loadInitialData().subscribe({
      next: (data) => (this.technologies = data),
      error: (error) => console.error('Error loading technologies:', error)
    });
  }

  onMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; // Assertion de type
    if (target) {
      this.enlargeImage(target);
    }
  }
  onMouseOut(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; // Assertion de type
    if (target) {
      this.resetImage(target);
    }
  }

  // imageService
  enlargeImage(imageElement: HTMLImageElement): void {
    if (imageElement) {
      imageElement.style.transform = 'scale(1.2)';
      imageElement.style.transition = 'transform 0.3s';
    }
  }

  resetImage(imageElement: HTMLImageElement): void {
    if (imageElement) {
      imageElement.style.transform = 'scale(1)';
    }
  }

  onLireClick(article: ArticleModel): void {
    console.log('Article sélectionné:', article);
    this.router.navigate(['/posts/article', article['@id']])
  }

  // Méthode pour télécharger la carte
  downloadCard(cardId: string): void {
    const cardElement = document.getElementById(cardId);
    if (!cardElement) {
      console.error('Card element not found for ID:', cardId);
      return;
    }

    // Sauvegarde des styles et des éléments originaux
    const originalStyle = cardElement.getAttribute('style');
    const downloadButton = cardElement.querySelector('.download-button') as HTMLElement;
    const badge = cardElement.querySelector('.badge') as HTMLElement;

    // Masquer le bouton de téléchargement et ajuster le style du badge
    if (downloadButton) downloadButton.style.display = 'none';
    if (badge) {
      badge.style.fontSize = '1.5rem'; // Agrandir le texte du badge
      badge.style.padding = '1rem 2rem'; // Ajouter plus de padding pour le texte
      badge.style.whiteSpace = 'nowrap'; // Empêcher le retour à la ligne
      badge.style.borderRadius = '10px'; // Bordures arrondies pour une meilleure esthétique
    }

    // Ajout des styles spécifiques pour le téléchargement
    cardElement.setAttribute(
        'style',
        `
    width: 1200px; 
    height: 675px; 
    padding: 40px; 
    background: linear-gradient(to right, #1a202c, #2c7a7b, #1a202c); 
    border-radius: 20px;
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center;
  `
    );

    // Utilisation de html2canvas pour capturer l'élément
    html2canvas(cardElement, {
      scale: 3, // Résolution élevée
      backgroundColor: null, // Conserve la transparence
    }).then((canvas) => {
      // Réinitialisation des styles originaux
      if (originalStyle) {
        cardElement.setAttribute('style', originalStyle);
      } else {
        cardElement.removeAttribute('style');
      }

      // Réafficher le bouton et rétablir le badge à sa taille d'origine
      if (downloadButton) downloadButton.style.display = '';
      if (badge) {
        badge.style.fontSize = '0.75rem'; // Taille d'origine du badge
        badge.style.padding = '0.25rem 0.5rem'; // Padding d'origine
        badge.style.borderRadius = '5px'; // Rétablissement des bordures d'origine
      }

      // Générer et télécharger l'image
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Pabiosoft_Carte_Sponsor_${cardId}.png`;
      link.click();
    });
  }





}
