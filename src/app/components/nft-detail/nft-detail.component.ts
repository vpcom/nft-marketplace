import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Nft } from '../../core/models/nft.model';

@Component({
  selector: 'app-nft-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.scss']
})
export class NftDetailComponent implements OnInit {
  nft: Nft | null = null;

  // Mock NFT data - in real app, this would come from service/API
  private mockNfts: Nft[] = [
    {
      id: '1',
      title: 'Cool Cat #1',
      name: 'Cool Cat #1',
      description: 'A cool cat NFT from the famous Cool Cats collection. This adorable feline features unique traits and is part of a limited series.',
      image: './cat.webp',
      owner: '0x123...abc',
      price: 0.5,
      attributes: [
        { trait_type: 'Background', value: 'Blue' },
        { trait_type: 'Eyes', value: 'Green' },
        { trait_type: 'Hat', value: 'Baseball Cap' },
        { trait_type: 'Rarity', value: 'Common' }
      ]
    },
    {
      id: '2',
      title: 'Rare Dragon',
      name: 'Rare Dragon',
      description: 'A majestic rare dragon NFT from the Mythical Creatures collection. This powerful beast has been sought after by collectors worldwide.',
      image: './dragon.webp',
      owner: '0x456...def',
      price: 1.2,
      attributes: [
        { trait_type: 'Element', value: 'Fire' },
        { trait_type: 'Size', value: 'Large' },
        { trait_type: 'Wings', value: 'Golden' },
        { trait_type: 'Rarity', value: 'Rare' }
      ]
    },
    {
      id: '3',
      title: 'Pixel Art',
      name: 'Pixel Art',
      description: 'Beautiful retro-style pixel art NFT featuring classic gaming aesthetics. Perfect for collectors of nostalgic digital art.',
      image: './mario.webp',
      owner: '0x789...ghi',
      price: 0.8,
      attributes: [
        { trait_type: 'Style', value: '8-bit' },
        { trait_type: 'Theme', value: 'Gaming' },
        { trait_type: 'Colors', value: '16-color' },
        { trait_type: 'Rarity', value: 'Uncommon' }
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.nft = this.mockNfts.find(nft => nft.id === id) || null;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  buyNft() {
    if (this.nft) {
      alert(`Purchasing ${this.nft.title} for ${this.nft.price} MATIC`);
      // In real app, this would trigger blockchain transaction
    }
  }

  makeOffer() {
    if (this.nft) {
      const offer = prompt(`Make an offer for ${this.nft.title} (in MATIC):`);
      if (offer) {
        alert(`Offer of ${offer} MATIC submitted for ${this.nft.title}`);
      }
    }
  }
}