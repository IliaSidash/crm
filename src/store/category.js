import { writable } from 'svelte/store';
import firebase from 'firebase/app';

import { setMessage, setError } from '../helpers/message';
import { getUid } from '../helpers/currentUid';

function createCategory() {
  const { subscribe, set, update } = writable([]);

  async function fetch() {
    try {
      const uid = await getUid();
      const snapshot = await firebase
        .database()
        .ref(`/users/${uid}/categories`)
        .once('value');
      const categories = snapshot.val();
      const normalizedCategories = Object.keys(categories).map((key) => ({
        id: key,
        ...categories[key]
      }));
      set(normalizedCategories);
    } catch (e) {}
  }

  return {
    subscribe,
    fetch,
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
    },
    async update({ name, limit, id }) {
      try {
        const uid = await getUid();
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ name, limit });
        fetch();
      } catch (e) {
        const { code } = e;
        setError(code);
        throw e;
      }
    }
  };
}

export const category = createCategory();
