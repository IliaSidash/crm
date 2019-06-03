import App from './App.svelte';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import '../public/styles/main.css';

const firebaseConfig = {
  apiKey: 'AIzaSyDVEGEisV5qHUD51KsWbkU0HSTFOk1Um0E',
  authDomain: 'todo-svelte.firebaseapp.com',
  databaseURL: 'https://todo-svelte.firebaseio.com',
  projectId: 'todo-svelte',
  storageBucket: 'todo-svelte.appspot.com',
  messagingSenderId: '630531941164',
  appId: '1:630531941164:web:2f65739fba18e976'
};
let app;

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new App({
      target: document.body
    });
  }
});

export default app;
