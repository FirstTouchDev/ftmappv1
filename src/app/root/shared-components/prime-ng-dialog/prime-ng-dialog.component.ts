import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';

export interface ConfirmButton {
     label: string;
     action: () => void;
     styleClass?: string;
}

export interface ConfirmDialogConfig {
     header?: string;
     message?: string;
     icon?: string;
     iconColor?: string;
     iconBgColor?: string;
     iconColorToken?: string;      // e.g. 'primary-contrast'
     iconBgColorToken?: string;    // e.g. 'primary'
     buttons?: ConfirmButton[];
}

@Component({
     selector: 'prime-ng-dialog',
     templateUrl: './prime-ng-dialog.component.html',
     styleUrls: ['./prime-ng-dialog.component.scss'],
     standalone: true,
     imports: [CommonModule, ConfirmDialogModule, ButtonModule]
})
export class PrimeNgDialogComponent {
     @ViewChild('cd') cd!: ConfirmDialog;

     @Input() header = 'Confirm';
     @Input() message = 'Are you sure?';
     @Input() icon = 'fa-solid fa-circle-info';
     @Input() iconColor = '#ffffff';
     @Input() iconBgColor = '#007ad9';
     @Input() buttons: ConfirmButton[] = [];

     // Tokens map to PrimeNG theme CSS variables
     private readonly COLOR_TOKENS: Record<string, string> = {
          'primary': '--p-button-primary-background',
          'primary-contrast': '--p-button-primary-color',
          'danger': '--p-button-danger-background',
          'danger-contrast': '--p-button-danger-color',
          'success': '--p-button-success-background',
          'success-contrast': '--p-button-success-color',
          // Extend as needed
     };

     constructor(
          private confirmationService: ConfirmationService
     ) { }

     private resolveColorToken(token?: string, fallback?: string): string {
          if (!token) return fallback ?? '#000000';
          const cssVar = this.COLOR_TOKENS[token];
          return cssVar ? `var(${cssVar})` : fallback ?? '#000000';
     }

     public show(config?: ConfirmDialogConfig): void {
          if (config) {
               this.header = config.header ?? this.header;
               this.message = config.message ?? this.message;
               this.icon = config.icon ?? this.icon;
               this.iconColor = this.resolveColorToken(config.iconColorToken, config.iconColor ?? this.iconColor);
               this.iconBgColor = this.resolveColorToken(config.iconBgColorToken, config.iconBgColor ?? this.iconBgColor);
               this.buttons = config.buttons ?? this.buttons;
          }
          this.confirmationService.confirm({
               header: this.header,
               message: this.message,
          });
     }

     public dismissDialog(): void {
          if (this.cd) {
               this.cd.close();
          }
     }
}
