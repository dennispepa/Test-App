import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { ForumComponent } from './components/forum.component';
import { SignInComponent } from './components/sign-in.component';
import { SignUpComponent } from './components/sign-up.component';
import { CommonService } from './Service/common.service';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        Ng2Bs3ModalModule,
        FormsModule],
    declarations: [
        AppComponent,
        ForumComponent,
        SignUpComponent,
        SignInComponent],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        CommonService],
    bootstrap: [AppComponent]

})
export class AppModule { }

