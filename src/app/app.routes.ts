import { Routes } from '@angular/router';
import { LoginComponent } from './account/admin/login/login.component';
import { PageNotFoundComponent } from './shared-component/page-not-found/page-not-found.component';
import { HostDashboardComponent } from './admin/host-dashboard/host-dashboard.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { authServiceGuard } from './shared/auth-service.guard';
import { ItemDetailsComponent } from './item/item-details/item-details.component';
import { BillingDetailsComponent } from './billing/billing-details/billing-details.component';
import { AddBillComponent } from './billing/add-bill/add-bill.component';

export const routes: Routes = [
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'host-dashboard', title: 'Host Dashboard',
         component: HostDashboardComponent,
         canActivate: [authServiceGuard],
         children: [
            { path: 'add-item', title: 'Add Item', component: AddItemComponent },
            { path: 'add-item/:id', title: 'Add Item', component: AddItemComponent },
            { path: 'item-details', title: 'Item Details', component: ItemDetailsComponent },
            { path: 'billing-details', title: 'Billing Details', component: BillingDetailsComponent },
            { path: 'add-bill', title: 'Add Bill', component: AddBillComponent },
            { path: 'add-bill/:id', title: 'Add Bill', component: AddBillComponent },
         ]
        },
    { path: '**', component: PageNotFoundComponent }
];
