import * as yup from 'yup'

import { VALIDATION_MESSAGES } from '@shared/constants'

export const noteSchema = yup.object({
  content: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .max(240, VALIDATION_MESSAGES.maxLength(240))
    .trim(),
  createdAt: yup.string(),
})
