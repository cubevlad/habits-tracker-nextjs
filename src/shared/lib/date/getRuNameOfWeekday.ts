import { format } from 'date-fns'
import { ru as ruLocale } from 'date-fns/locale'

export const getRuNameOfWeekday = (date: Date) => format(date, 'cccc', { locale: ruLocale })
