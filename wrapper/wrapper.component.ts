import { Component, OnInit, OnChanges, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { Input, ViewChild, HostListener, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { JustPopModalService } from '../services';
import * as _ from 'lodash';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'just-pop-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})

export class JustPopWrapperComponent implements OnInit, OnChanges, OnDestroy {
  /*
   * Configurations
   */
  @Input() config?: any;
  @Output() closed = new EventEmitter();
  @ViewChild('container') container: any;

  private popupId: any;
  private items: any[] = [];
  private level: any;
  private savedData: any;
  private modalConfig;
  public isLoaded: boolean;

  constructor(
    private JustPopServ: JustPopModalService,
    public el: ElementRef,
    private router: Router
  ) {
    this.isLoaded = false;
   }

  ngOnInit() {
    if (this.config === undefined || this.config === null) {
      this.config = {
        theme: {
          header_container: {
            title: 'INFORMATIVE POPUPs',
            left_image: '',
            left_width: '24px',
            background: '#fff'
          },
          body_container: {
            title: '',
            content: '',
            background: '#fff'
          },
          footer_container: {
            title: '',
            background: '#fff'
          }
        },
        buttons: {
          left: {
            label: 'MORE INFO',
            color: 'btn-flat',
            enabled: false,
            routing: true,
            path: 'https://google.com',
            target: 'blank'
          },
          right: {
            label: 'CANCEL',
            color: 'btn-flat',
            enabled: true,
            routing: false
          }
        },
        selector: {
          id: 'JustPOP'
        }
      };
    }
    if (this.config.theme.body_container.content === '') {
      this.config.theme.body_container.content = 'Please Add the correct data model in order for the modal to populate your popup.'
    }

    this.popupId = this.config.selector.id;
    if (this.config !== undefined){
      this.isLoaded = true;
    }
  }

  ngOnDestroy() {
      // console.log("exintg");
  }

  ngOnChanges(changes) {
    this.refresh();
  }

  loaded() {
    // console.log('It\'s loaded.');
    this.isLoaded = true;
  }

  closeModal(popopupId: string) {
    this.closed.emit('Closing POPID: ' + popopupId);
    this.JustPopServ.close(popopupId);
  }

  moreInfo(path: any, popId: any) {
    this.JustPopServ.close(popId);

  }

  // Refresh Functionality
  refresh() {

    const queue = this.JustPopServ.getScrollQueueList();
    const scrollTop = this.container.nativeElement.scrollTop; 
    const height = this.container.nativeElement.clientHeight;

    const sortedQueue = _.sortBy(queue, ['position']);
    const focusedNode = _.findLast(sortedQueue, function(node) {
      return node.position < (scrollTop + height);
    });

    if (focusedNode !== undefined) {
      focusedNode.callBack();
    }
  }
}
