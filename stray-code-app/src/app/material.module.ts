import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
// import { ElementDialogComponent } from './_models/element-dialog/element-dialog.component';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgSelect2Module } from 'ng-select2';



@NgModule({
    imports: [MatSidenavModule, MatListModule, MatCheckboxModule,
              MatIconModule, MatToolbarModule, MatButtonModule, FormsModule,
              MatTableModule, RouterLink,
              MatDialogModule,  MatCardModule, ReactiveFormsModule,
              MatInputModule, MatDividerModule, MatSidenav, CommonModule, FormsModule, NgSelect2Module],
    exports: [MatSidenavModule, MatListModule, MatCheckboxModule,
              MatIconModule, MatToolbarModule, MatButtonModule, FormsModule,
              MatTableModule, RouterLink,
              MatDialogModule, MatCardModule, ReactiveFormsModule,
              MatInputModule, MatDividerModule, MatSidenav, CommonModule, FormsModule, NgSelect2Module ],
})

export class MaterialModule {}
export class AppModule { }
