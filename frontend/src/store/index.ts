import { createStore } from "vuex";
import router from "../router";
import { auth, db } from "../firebase";
import {
  // AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
// import { getStorage, ref, deleteObject } from "firebase/storage";

export default createStore({
  state: {
    user: null,
    pdfData: null,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getPdfData(state) {
      return state.pdfData;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_PDFDATA(state, pdfData) {
      state.pdfData = pdfData;
    },
    CLEAR_PDFDATA(state) {
      state.pdfData = null;
    },
  },
  actions: {
    savePdfData({ commit }, pdfData) {
      commit("SET_PDFDATA", pdfData);
    },
    deletePdfData({ commit }) {
      commit("CLEAR_PDFDATA");
    },
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error: any) {
        // console.log(error.code + " " + error.message);
        switch (error.code) {
          case "auth/user-not-found":
            console.log("User not found");
            break;
          case "auth/wrong-password":
            console.log("Wrong password");
            break;
          default:
            console.log("Invalid email");
        }
        return;
      }
      commit("SET_USER", auth.currentUser);
      router.push("/");
    },
    async register({ commit }, details) {
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        switch (error.code) {
          case "auth/email-already-in-use":
            console.log("Email already in use");
            break;
          case "auth/invalid-email":
            console.log("Invalid email");
            break;
          case "auth/operation-not-allowed":
            console.log("Operation not allowed");
            break;
          case "auth/weak-password":
            console.log("Weak password");
            break;
          default:
            console.log("Something went wrong");
        }
        return;
      }
      commit("SET_USER", auth.currentUser);
      router.push("/");
    },
    async logout({ commit }) {
      await signOut(auth);
      commit("CLEAR_USER");
      router.push("/login");
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);
          if (router.currentRoute.value.path === "/login") {
            router.push("/");
          }
          if (router.currentRoute.value.path === "/register") {
            router.push("/");
          }
        }
      });
    },
  },
  modules: {},
});
