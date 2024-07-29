import cookie from 'cookie'

export const setCookie = (res, name, value, options = {}) => {
  const stringValue = typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value)

  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', cookie.serialize(name, stringValue, options))
}

export const removeCookie = (res, name) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(name, '', {
      maxAge: -1,
      path: '/',
    })
  )
}
