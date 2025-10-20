import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({ providedIn: 'root' })
export class WalletService {
  private provider?: ethers.BrowserProvider;
  private signer?: ethers.Signer;

  async connectWallet(): Promise<string | null> {
    if (!(window as any).ethereum) {
      alert('MetaMask not found');
      return null;
    }
    this.provider = new ethers.BrowserProvider((window as any).ethereum);
    const accounts = await this.provider.send('eth_requestAccounts', []);
    this.signer = await this.provider.getSigner();
    return accounts[0];
  }

  getSigner() {
    return this.signer;
  }
}