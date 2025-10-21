import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { Nft } from '../../core/models/nft.model';
import { GraphQLService } from '../../core/services/graphql.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nft-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatButtonModule],
  templateUrl: './nft-list.component.html',
  styleUrls: ['./nft-list.component.scss']
})
export class NftListComponent implements OnInit, OnDestroy {
  nfts: Nft[] = [];
  loading = true;
  error: string | null = null;
  private sub: Subscription | null = null;

  constructor(private router: Router, private gql: GraphQLService) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = null;
    this.sub = this.gql.getNfts().subscribe({
      next: (nfts) => {
        this.nfts = nfts;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load nfts', err);
        this.error = 'Failed to load NFTs';
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  viewDetails(id: string) {
    this.router.navigate(['/nft', id]);
  }

  buy(id: string) {
    alert(`Buying NFT with ID: ${id}`);
  }
}