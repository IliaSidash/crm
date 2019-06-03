import firebase from 'firebase/app';

export async function getUid() {
  const user = await firebase.auth().currentUser;
  return user ? user.uid : null;
}
