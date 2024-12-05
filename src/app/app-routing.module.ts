import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  },
  {
    path: 'items',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/items/list/list.module').then(m => m.ListPageModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/items/create/create.module').then(m => m.CreatePageModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./pages/items/edit/edit.module').then(m => m.EditPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./pages/items/detail/detail.module').then(m => m.DetailPageModule)
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
