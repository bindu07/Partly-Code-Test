import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SampleTableComponent } from './sample-table/sample-table.component';
import { OnlynumbersDirective } from './onlynumber/onlynumbers.directive';

@NgModule({
  declarations: [AppComponent, SampleTableComponent, OnlynumbersDirective],
  imports: [BrowserModule, FormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
