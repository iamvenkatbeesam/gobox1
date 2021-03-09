import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DroplocationComponent } from './droplocation/droplocation.component';
import { PaymenttypeselectionComponent } from './paymenttypeselection/paymenttypeselection.component';
import { PhoneEmailComponent } from './phone-email/phone-email.component';
import { PickuplocationComponent } from './pickuplocation/pickuplocation.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { MakerequestComponent } from './makerequest/makerequest.component';
import { AuthGuard } from './_models/auth.guard';
import { SubscriptionComponent } from './subscription/subscription.component';
import { Payment } from './_models/payment';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'home' , canActivate: [AuthGuard]},
//  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'add', component: CreateEmployeeComponent },
  { path: 'update/:id', component: UpdateEmployeeComponent },
  { path: 'details/:id', component: EmployeeDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'phone_email', component: PhoneEmailComponent},
  { path: 'pickuplocation', component: PickuplocationComponent},
  { path: 'droplocation', component: DroplocationComponent},
  { path: 'paymenttypeselection', component:PaymenttypeselectionComponent},
  { path: 'makerequest/:id', component: MakerequestComponent},
  { path: 'subscription', component: SubscriptionComponent},
  { path: 'history', component: EmployeeListComponent},
  { path: 'payment', component: PaymentComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }