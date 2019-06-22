import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';

import { JustPopOpenModalComponent } from './modal/open-modal.component';
import { JustPopupModalComponent } from './modal/modal-popup.component';
import { JustPopWrapperComponent } from './wrapper/wrapper.component';

import { JustPopScrollPipe, JustPopModalService  } from './services';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    JustPopOpenModalComponent,
    JustPopupModalComponent,
    JustPopWrapperComponent,
    JustPopScrollPipe
  ],
  exports: [
    JustPopupModalComponent,
    JustPopWrapperComponent,
    JustPopOpenModalComponent
  ],
  entryComponents: [
  ],
})

// As default, providers will always initialize to private
// Object's due to this we are using static forRoot to be able
// to use it within app without declaring it. MrZ
export class JustPopupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: JustPopupModule,
      providers: [
        JustPopModalService
      ]
    };
  }
}
