// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl:"https://localhost:9090",
  registrationByEmailUrl : "/registration/registrationByEmail",
  loginUrl : "/authentication/loginByEmail",
  logoutUrl : "/authentication/logout",
  getUserInformations: "/account/getUserInformations",
  getCompanyAddress: "/account/getCompanyAddress",
  updateUserInformations: "/account/updateUserInformations",
  getAllMovies:"/movies/getAllMovies",
  getMoviesFilter:"/movies/getMoviesFilter",
  getMoviesByCategory:"/movies/getMoviesByCategory",
  addToCart:"/cart/addToCart",
  getCategories:"/category/getAllCategories",
  saveDiscount:"/discount/saveDiscount",
  getCart:"/cart/getCart",
  updateCartItem:"/cart/updateCartItem",
  deleteCartItem:"/cart/deleteCartItem",
  emptyCart:"/cart/emptyCart",
  order:"/order/saveOrder",
  delivery:"DELIVERY",
  pickup:'PICKUP',
  getOrderById: "/order/getOrderById",
  deleteOrder: "/order/deleteOrder",
  stripePaymentCharge: "/stripePayment/charge",
  changeOrderStatusToPayed:"/order/changeOrderStatusToPayed",
  inventory:"/inventory/saveInventoryItem",
  uploadFile:"/files/uploadMovieFile",
  getOrdersByUserId:"/order/getOrdersByUserId",
  getAllOrders:"/order/getAllOrders",
  orderNextStatus:"/order/orderNextStatus",
  getUsers:"/user/users-list",
  saveUser:"/user/save-user",
  updateUser:"/user/update-user",
  deleteUser:'/user/delete-user',
  getDiscounts:"/discount/discount-list",
  deleteDiscount:"/discount/delete-discount",
  getInventories:"/inventory/inventory-list",
  deleteInventory:"/inventory/delete-inventory"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
