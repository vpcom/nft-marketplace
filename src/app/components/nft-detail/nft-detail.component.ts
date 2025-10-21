import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Nft } from '../../core/models/nft.model';
import { GraphQLService } from '../../core/services/graphql.service';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gql: GraphQLService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gql.getNft(id).subscribe((nft) => {
        this.nft = nft;
      });
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