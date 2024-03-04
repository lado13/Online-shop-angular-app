import { Routes } from '@angular/router';
import { ContextComponent } from './context/context.component';
import { DetailComponent } from './detail/detail.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { AdminPanelComponent } from './adminPanel/admin-panel.component';
import { adminGuard } from './guard/admin.guard';
import { UserOrderComponent } from './user-order/user-order.component';
import { CategoryUploadComponent } from './category-upload/category-upload.component';
import { UserComponent } from './user/user.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditProductComponent } from './edit-product/edit-product.component';


export const routes: Routes = [
    { 'path': '', component: ContextComponent },
    { 'path': 'products/:id', component: DetailComponent },
    { 'path': 'shopingCart', component: ShopingCartComponent },
    { 'path': 'singUp', component: SingUpComponent },
    { 'path': 'singIn', component: SingInComponent },
    { 'path': 'productUpload', component: ProductUploadComponent, canActivate: [adminGuard] },
    { 'path': 'adminPanel', component: AdminPanelComponent, canActivate: [adminGuard] },
    { 'path': 'userOrders', component: UserOrderComponent, canActivate: [adminGuard] },
    { 'path': 'categoryUpload', component: CategoryUploadComponent, canActivate: [adminGuard] },
    { 'path': 'user', component: UserComponent, canActivate: [adminGuard] },
    { 'path': 'passwordReset', component: PasswordResetRequestComponent },
    { 'path': 'editCategory/:id', component: EditCategoryComponent, canActivate: [adminGuard] },
    { 'path': 'editProduct/:id', component: EditProductComponent, canActivate: [adminGuard] }
];
