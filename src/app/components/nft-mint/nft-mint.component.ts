import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { GraphQLService } from '../../core/services/graphql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nft-mint',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './nft-mint.component.html',
  styleUrls: ['./nft-mint.component.scss']
})
export class NftMintComponent {
  mintForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private gql: GraphQLService, private router: Router) {
    this.mintForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit() {
    if (this.mintForm.valid) {
      const formData = this.mintForm.value;
      const imagePath = this.selectedFile ? this.selectedFile.name : './placeholder.png';
      this.gql.mintNft(formData.name, formData.description, Number(formData.price), imagePath).subscribe((nft) => {
        // navigate to the new NFT detail page
        this.router.navigate(['/nft', nft.id]);
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('File selected:', file.name);
    }
  }
}