import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { MocksService } from './mocks';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, HomeModule],
  declarations: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (mocksService: MocksService) => {
        return () => {
          return mocksService.init();
        };
      },
      deps: [MocksService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
