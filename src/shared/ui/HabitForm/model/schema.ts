import * as yup from 'yup'

import { VALIDATION_MESSAGES } from '@shared/constants'

export const habitSchema = yup.object({
  name: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .max(80, VALIDATION_MESSAGES.maxLength(80))
    .trim(),
  goal: yup.number().required(VALIDATION_MESSAGES.required).positive(VALIDATION_MESSAGES.positive),
})
