import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: (to) => {
      // the function receives the target route as the argument
      // a relative location doesn't start with `/`
      // or { path: 'profile'}
      return "CreateReport";
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/registration",
    name: "Registration",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegistrationView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/createreport",
    name: "CreateReport",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CreateReportView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/uploadpdf",
    name: "UploadPDF",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UploadPdfView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/uploadaudio",
    name: "UploadAudio",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UploadAudioView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/uploadimage",
    name: "UploadImage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UploadImageView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/uploadtext",
    name: "UploadText",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UploadTextView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/uploadmemo",
    name: "UploadMemo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UploadMemoView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/uploadpicture",
    name: "UploadPicture",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UploadPictureView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/getreport",
    name: "GetReport",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/GetReportView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path === "/login" && auth.currentUser) {
    next(from);
    return;
  }

  if (to.path === "/registration" && auth.currentUser) {
    next(from);
    return;
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("/login");
    return;
  }

  next();
});

export default router;
