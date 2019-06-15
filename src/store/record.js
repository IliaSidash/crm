import { writable } from 'svelte/store';
import firebase from 'firebase/app';

import { setError } from '../helpers/message';
import { getUid } from '../helpers/currentUid';

function createRecord() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    async create(record) {
      try {
        const uid = await getUid();
        await firebase
          .database()
          .ref(`/users/${uid}/recors`)
          .push(record);
      } catch (e) {
        const { code } = e;
        setError(coded);
        throw e;
      }
    }
  };
}

export const record = createRecord();
