import {Component, OnInit, Renderer2} from '@angular/core';
import {NgForOf} from "@angular/common";
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {Button, ButtonDirective} from "primeng/button";
import {RouterLink} from "@angular/router";
import {ImageModule} from "primeng/image";
import {DialogModule} from "primeng/dialog";
import {MessagesModule} from "primeng/messages";
import {ProductService} from "../../core/services/product.service";
import {Product} from "../../core/models/product.model";
import {DataViewModule} from "primeng/dataview";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [
    NgForOf,
    CarouselModule,
    TagModule,
    Button,
    RouterLink,
    ImageModule,
    DialogModule,
    MessagesModule,
    DataViewModule,
    CardModule,
    ButtonDirective
  ],
  templateUrl: './boutique.component.html',
  styleUrl: './boutique.component.scss'
})
export class BoutiqueComponent implements OnInit{
  products: Product[] = [];

  productsOld = [
    {
      name: 'Raspberry Pi 4',
      description: 'Un ordinateur miniature polyvalent.',
      price: 70,
      image: './assets/boutique/raspberry-pi.jpg',
      inventoryStatus: 'RUPTURE-DE-STOCK',
      checkoutUrl: 'https://pabiosoft-it.lemonsqueezy.com/buy/b2dc4430-66a3-4ff0-a971-2f7863e55eec'
    },
    {
      name: 'Arduino Starter Kit',
      description: 'Idéal pour démarrer avec l’électronique.',
      price: 50,
      image: './assets/boutique/arduino-kit.png',
      inventoryStatus: 'EN-STOCK',
      checkoutUrl: 'https://pabiosoft-it.lemonsqueezy.com/buy/02758878-3204-4954-a3e9-af4baa78f22c'

    },
    {
      name: 'Livre : Clean Architecture',
      description: 'Apprenez les principes de conception logicielle.',
      price: 35,
      image: './assets/boutique/clean-architecture-book.jpg',
      inventoryStatus: 'STOCK-FAIBLE',
      checkoutUrl: 'https://pabiosoft-it.lemonsqueezy.com/buy/ad157948-9e9f-4500-b3ae-2361f8eb1cfe'

    },
  ];

  featuredProducts = [
    {
      name: 'Écran tactile 7 pouces',
      description: 'Compatibilité avec Raspberry Pi.',
      price: 65,
      image: './assets/boutique/touchscreen.jpg',
      inventoryStatus: 'STOCK-FAIBLE',
      checkoutUrl: 'https://pabiosoft-it.lemonsqueezy.com/buy/c1d566b4-c75e-4961-b460-b9e2792461d8'
    },
    {
      name: 'Capteurs multiples',
      description: 'Idéal pour vos projets IoT.',
      price: 25,
      image: './assets/boutique/sensors.png',
      inventoryStatus: 'EN-STOCK',
      checkoutUrl: 'https://pabiosoft-it.lemonsqueezy.com/buy/42ccf523-409b-43c0-9f47-b474b0826751'
    },
    {
      name: 'Ensemble de composants',
      description: 'Tous les éléments pour démarrer.',
      price: 40,
      image: './assets/boutique/components-kit.png',
      inventoryStatus: 'RUPTURE-DE-STOCK',
      checkoutUrl: 'https://pabiosoft-it.lemonsqueezy.com/buy/528a4954-a989-4ef0-a094-6b89b493b1f3'
    },
  ];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
      private renderer: Renderer2,
      private productService: ProductService

      ) {}

  ngOnInit(): void {
    // S'abonner au BehaviorSubject pour les mises à jour en temps réel
    this.productService.products$.subscribe((products) => {
      this.products = products;
    });

    // Charger les produits depuis l'API
    this.productService.fetchProducts();
    //
    console.table(this.products)
    //
    // this.loadLemonScript();
  }
  formatInventoryStatus(status: string): string {
    return status.replace(/-/g, ' ');
  }


  getSeverityClass(inventoryStatus: string): string {
    switch (inventoryStatus) {
      case 'EN-STOCK':
        return 'bg-green-500 text-white'; // Success style
      case 'STOCK-FAIBLE':
        return 'bg-yellow-500 text-white'; // Warning style
      case 'RUPTURE-DE-STOCK':
        return 'bg-red-500 text-white'; // Danger style
      default:
        return 'bg-gray-500 text-white'; // Default style
    }
  }


  /**
   * Ouvrir le checkout Lemon.js
   * @param url URL du checkout
   */
  openCheckout(url: string): void {
    const anchor = this.renderer.createElement('a');
    anchor.href = url;
    anchor.className = 'lemonsqueezy-button';
    anchor.target = '_blank'; // Ouvre dans un nouvel onglet
    anchor.style.display = 'none'; // On cache l'élément temporaire
    this.renderer.appendChild(document.body, anchor);
    anchor.click();
    this.renderer.removeChild(document.body, anchor); // Nettoyage après l'ouverture
  }


  selectedImage: string | null = null;

  openImageModal(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  closeImageModal(): void {
    this.selectedImage = null;
  }

  visible: boolean = false;

  showDialog(imageUrl: string) {
    this.visible = true;
    this.selectedImage = imageUrl;
  }

  /**
   * Charger le script Lemon.js dynamiquement
   */
  private loadLemonScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://app.lemonsqueezy.com/js/lemon.js';
    script.defer = true;
    script.onload = () => {
      console.log('Lemon.js chargé avec succès');
    };
    this.renderer.appendChild(document.body, script);
  }

}
