import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsLettersComponent } from './news-letters/news-letters.component';
import { NewsLettersDetailsComponent } from './news-letters-details/news-letters-details.component';
import { NewsLettersResponseComponent } from './news-letters-response/news-letters-response.component';
import { NewsLettersCampaignComponent } from './news-letters-campaign/news-letters-campaign.component';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Campaign',
      status: true
    },
    children: [
      {
        path: '',
        redirectTo: 'news_letters',
        pathMatch: 'full',
        
      }, 
      {
        path: 'news_letters',
        component: NewsLettersComponent,
        data: {
          breadcrumb: 'News Letters',
          status: true,
          icon:'campaign'
        },
      }, 
      {
        path: 'newsketters_details/:id',
        component: NewsLettersDetailsComponent,
        data: {
          breadcrumb: 'Newsletter Details',
          status: true,
          icon:'create'
        },
      }, 
      {
        path: 'newsketters_campaign/:id',
        component: NewsLettersCampaignComponent,
        data: {
          breadcrumb: 'Campaign',
          status: true,
          icon:'campaign'
        },
      }, 
      {
        path: 'news_letters_feedback',
        component: NewsLettersResponseComponent,
        data: {
          breadcrumb: 'Newsletters Feedback',
          status: true,
          icon:'feedback'
        },
      }, 
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
