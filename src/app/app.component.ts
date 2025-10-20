import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { WalletButtonComponent } from './components/wallet-button/wallet-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    WalletButtonComponent,
  ],
  template: `
    <header>
      <h1>Minimal NFT Marketplace</h1>
      <nav>
        <button mat-button routerLink="/">NFTs</button>
        <button mat-button routerLink="/mint">Mint NFT</button>
        <app-wallet-button></app-wallet-button>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #ccc;
    }
    nav {
      display: flex;
      gap: 16px;
      align-items: center;
    }
    main {
      padding: 16px;
    }
  `]
})
export class AppComponent {}