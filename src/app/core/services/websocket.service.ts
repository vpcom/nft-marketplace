import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Store } from '@ngrx/store';
import * as NftActions from '../../store/nft/nft.actions';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor(private store: Store) {
    this.socket$ = new WebSocketSubject('ws://localhost:4000/socket/websocket');
    this.socket$.subscribe((msg) => {
      if (msg.event === 'nft_update') {
        this.store.dispatch(NftActions.updateNftFromSocket({ nft: msg.payload }));
      }
    });
  }

  onMessage() {
    return this.socket$;
  }
}