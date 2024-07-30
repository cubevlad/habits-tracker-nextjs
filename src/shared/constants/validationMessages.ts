export const VALIDATION_MESSAGES = {
  required: 'Необходимо заполнить поле',
  min: 'Не может быть меньше 2',
  max: 'Не может быть больше 16',
  email: 'Неверный формат почты',
  positive: 'Должно быть положительное число',
  minLength: 'Должно быть не менее 1 символа',
  maxLength: (length: number) => `Должно быть не более ${length} символов`,
}
