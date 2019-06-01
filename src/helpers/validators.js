export function required(errorMessage = 'Это поле нужно заполнить') {
  return (value) => ({
    isValid: value && value.trim().length > 0,
    errorMessage
  });
}

export function email(errorMessage = 'Введите корректный Email') {
  const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return (value) => ({
    isValid: regexp.test(value),
    errorMessage
  });
}

export function minLength(length) {
  return (value) => ({
    isValid: value.trim().length >= length,
    errorMessage: `Количество символов не должно быть меньше ${length}`
  });
}
