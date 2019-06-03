import { writable } from 'svelte/store';
import firebase from 'firebase/app';

function createAuth() {
  const { subscribe, set, update } = writable({});

  return {
    subscribe,
    login: async ({ email, password }) => {
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
      } catch (e) {
        throw e;
      }
    },
    register: async ({ email, password, name }) => {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    }
  };
}

export const auth = createAuth();
