import { navigate } from 'svelte-routing';
import { writable } from 'svelte/store';
import firebase from 'firebase/app';

import { setMessage, setError } from '../helpers/message';
import { getUid } from '../helpers/currentUid';

function createAuth() {
  const { subscribe, set, update } = writable({});

  return {
    subscribe,
    async login({ email, password }) {
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
      } catch (e) {
        const { code } = e;
        setError(code);
        throw e;
      }
    },
    async register({ email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await getUid();

        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            bill: 10000,
            name
          });
      } catch (e) {
        const { code } = e;
        setError(code);
        throw e;
      }
    },
    async logout() {
      try {
        await firebase.auth().signOut();
        setMessage('Вы вышли из системы');
        navigate('/login');
      } catch (e) {
        const { code } = e;
        setError(code);
      }
    }
  };
}

export const auth = createAuth();
