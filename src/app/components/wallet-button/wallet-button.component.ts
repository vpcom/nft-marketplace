import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-wallet-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './wallet-button.component.html',
  styleUrls: ['./wallet-button.component.scss']
})
export class WalletButtonComponent {
  connected = false;
  address = '0xDemo...Wallet';

  connectWallet() {
    this.connected = !this.connected;
  }
}