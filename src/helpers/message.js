import M from 'materialize-css';

const messages = {
  'auth/user-not-found': 'Пользователь с таким email не существует',
  'auth/wrong-password': 'Невереный пароль',
  'auth/email-already-in-use': 'Email уже занят'
};

export function setMessage(html) {
  M.toast({ html });
}

export function setError(code) {
  const message = messages[code] || 'Что-то пошло не так';
  M.toast({ html: `[[Ошибка]] ${message}` });
}
