import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { SelectivePreloadingStrategy } from './selective-preloading.strategy';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: SelectivePreloadingStrategy,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
