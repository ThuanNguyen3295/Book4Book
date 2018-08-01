import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

@NgModule({
  exports: [
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  declarations: []
})

export class CustomMaterialModule {}


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from '../app/services/auth.service'
import { UtilService } from '../app/services/util.service'
import { RequestService } from '../app/services/request.service'
import { FilterService } from '../app/services/filter.service'
import { LocationService } from '../app/services/location.service'
import { HttpModule} from '@angular/http';
import { PostComponent } from './post/post.component';
import { AuthGuard } from './guard/auth.guard';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { LoginComponent } from './login/login.component';
import { FilterOptionsDialog } from './filterOptions/filter.component'
import { AgmCoreModule } from '@agm/core';
import { SettingComponent } from './setting/setting.component';
import { DetailpageComponent } from './detailpage/detailpage.component';
import { ProfileComponent } from './profile/profile.component'

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'setting', component: SettingComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'post', component: PostComponent, canActivate:[AuthGuard]},
  {path:'detail/:id', component: DetailpageComponent},
  // {path:'about', component: AboutComponent},
  // {path:'**', component: Error404Component}
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    SearchbarComponent,
    LoginComponent,
    FilterOptionsDialog,
    SettingComponent,
    DetailpageComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CustomMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDf-yIqxErTkbWzKhLox7nAANnrfDIY190&libraries',
      libraries: ['geometry']
    })
  ],
  entryComponents:[
    LoginComponent,
    FilterOptionsDialog
  ],
  providers: [AuthService, RequestService, UtilService, FilterService, LocationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
