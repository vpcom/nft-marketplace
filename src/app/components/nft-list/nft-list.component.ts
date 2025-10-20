import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { Nft } from '../../core/models/nft.model';

@Component({
  selector: 'app-nft-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatButtonModule],
  templateUrl: './nft-list.component.html',
  styleUrls: ['./nft-list.component.scss']
})
export class NftListComponent {
  nfts: Nft[] = [
    {
      id: '1',
      title: 'Cool Cat #1',
      name: 'Cool Cat #1',
      description: 'A cool cat NFT',
      image: './cat.webp',
      owner: '0x123...abc',
      price: 0.5,
      attributes: [
        { trait_type: 'Background', value: 'Blue' },
        { trait_type: 'Eyes', value: 'Green' }
      ]
    },
    {
      id: '2',
      title: 'Rare Dragon',
      name: 'Rare Dragon',
      description: 'A rare dragon NFT',
      image: './dragon.webp',
      owner: '0x456...def',
      price: 1.2,
      attributes: [
        { trait_type: 'Element', value: 'Fire' },
        { trait_type: 'Size', value: 'Large' }
      ]
    },
    {
      id: '3',
      title: 'Pixel Art',
      name: 'Pixel Art',
      description: 'Beautiful pixel art',
      image: './mario.webp',
      owner: '0x789...ghi',
      price: 0.8,
      attributes: [
        { trait_type: 'Style', value: '8-bit' },
        { trait_type: 'Theme', value: 'Gaming' }
      ]
    }
  ];

  constructor(private router: Router) {}

  viewDetails(id: string) {
    this.router.navigate(['/nft', id]);
  }

  buy(id: string) {
    alert(`Buying NFT with ID: ${id}`);
  }
}