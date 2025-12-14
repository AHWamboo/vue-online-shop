import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/contact",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ContactPage.vue") }],
  },
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/LogInPage.vue") }],
  },
  {
    path: "/signIn",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/SignInPage.vue") }],
  },
  {
    path: "/cart",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/CartPage.vue") }],
  },
  {
    path: "/checkout",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/CheckoutPage.vue") }],
  },
  {
    path: "/product/:id",
    props: true,
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ProductPage.vue") }],
  },
  {
    path: "/category/:categoryName/",
    props: true,
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/CategoryPage.vue") }],
  },
  {
    path: "/managePanel",
    component: () => import("layouts/ManagePanelLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/ManagePanelPage.vue") },
      {
        path: "userProfile",
        component: () => import("src/pages/managePanel/UserProfile.vue"),
      },
      {
        path: "products",
        component: () => import("src/pages/managePanel/ProductsPage.vue"),
      },
      {
        path: "addProduct",
        component: () => import("src/pages/managePanel/AddProductPage.vue"),
      },
      {
        path: "contactMessages",
        component: () => import("src/pages/managePanel/ContactMessages.vue"),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/access_token=:access_token(.*)",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/AuthPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "404",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
