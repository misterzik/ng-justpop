import { Component, OnInit, Input } from '@angular/core';
import { JustPopModalService } from '../services/modal.service';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'just-pop',
  templateUrl: './open-modal.component.html'
})
export class JustPopOpenModalComponent implements OnInit {
  @Input() popupId: any;
  @Input() label: any;
  @Input() config: any;
  public _internalPopUpId: any;

  constructor(private slimModalSvc: JustPopModalService) { 

  }

  ngOnInit(): void {
    // Color Options
    // btn-flat | btn-primary
    if (this.config === undefined || this.config === null) {
      this.config = {
          selector: 'JustPOP',
          label: 'JustPOP',
          color: 'btn-primary',
          class: ''
      };
    }
    this._internalPopUpId = this.popupId;
  }

  openModal(popId: string): void {
    this.slimModalSvc.open(popId);
  }

}
