import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductResponse } from '../models/product.model';
import { map, catchError } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private productsSubject = new BehaviorSubject<Product[]>([]);
    public products$: Observable<Product[]> = this.productsSubject.asObservable();

    private apiUrl = './assets/mock/boutiques.json'; // URL de l'API
    // private apiUrl =  `${environment.apiUrl}`; // URL de l'API de la vrais

    constructor(private http: HttpClient) {}

    // Récupérer les produits depuis l'API
    fetchProducts(): void {
        this.http.get<ProductResponse>(this.apiUrl).pipe(
            map(response => response.member), // Extraire la liste des produits
            catchError(error => {
                console.error('Erreur lors de la récupération des produits', error);
                // Retourner un Observable vide pour permettre au flux de continuer
                return [];
            })
        ).subscribe(products => {
            this.productsSubject.next(products); // Mettre à jour le BehaviorSubject
        });
    }


    // Ajouter un produit (simulation)
    addProduct(product: Product): void {
        const currentProducts = this.productsSubject.getValue();
        this.productsSubject.next([...currentProducts, product]);
    }
}
