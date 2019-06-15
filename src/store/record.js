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
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (e) {
        const { code } = e;
        setError(code);
        throw e;
      }
    },
    async fetchRecords() {
      try {
        const uid = await getUid();
        const snapshot = await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .once('value');
        const records = snapshot.val();
        if (records) {
          const normalizedRecords = Object.keys(records).map((key) => ({
            id: key,
            ...records[key]
          }));
          set(normalizedRecords);
        }
      } catch (e) {
        const { code } = e;
        setError(code);
        throw e;
      }
    }
  };
}

export const record = createRecord();
