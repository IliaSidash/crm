import { writable } from 'svelte/store';
import firebase from 'firebase/app';

import { getUid } from '../helpers/currentUid';
import { setError } from '../helpers/message';

function createInfo() {
  const { subscribe, set, update } = writable({
    name: '',
    bill: 0,
    loaded: false
  });

  return {
    subscribe,
    async fetch() {
      try {
        const uid = await getUid();
        const snapshot = await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once('value');
        const info = snapshot.val();

        set({
          ...info,
          loaded: true
        });
      } catch (e) {
        const { code } = e;
        setError(code);
        throw e;
      }
    },
    async fetchCurrency() {
      const key = 'bae9cc3f649d875ee6e4c7db7cbf4bde';
      const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      );
      const currency = await res.json();
      return currency;
    },
    async updateInfo(info) {
      try {
        const uid = await getUid();
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .update(info);

        update(() => info);
      } catch (e) {
        const { code } = e;
        setError(code);
        throw e;
      }
    }
  };
}

export const info = createInfo();
