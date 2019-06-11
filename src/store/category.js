import { writable } from 'svelte/store';
import firebase from 'firebase/app';

import { setMessage, setError } from '../helpers/message';
import { getUid } from '../helpers/currentUid';

function createCategory() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    async create({ name, limit }) {
      try {
        const uid = await getUid();
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ name, limit });

        update((prevState) => [
          ...prevState,
          { id: category.key, name, limit }
        ]);
      } catch (e) {
        const { code } = e;
        setError(code);
        throw e;
      }
    }
  };
}

export const category = createCategory();
