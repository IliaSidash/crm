import { writable } from 'svelte/store';
import firebase from 'firebase/app';

import { getUid } from '../helpers/currentUid';

function createInfo() {
  const { subscribe, set, update } = writable({ state: {}, loaded: false });

  return {
    subscribe,
    fetch: async () => {
      try {
        const uid = await getUid();
        const snapshot = await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once('value');
        const info = snapshot.val();

        set({
          state: info,
          loaded: true
        });
      } catch (e) {
        throw e;
      }
    },
    fetchCurrency: async () => {
      const key = 'bae9cc3f649d875ee6e4c7db7cbf4bde';
      const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      );
      const currency = await res.json();
      return currency;
    }
  };
}

export const info = createInfo();
