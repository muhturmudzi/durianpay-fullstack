
export const errorMessages = (msg: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listError: any = {
    'user not found': 'Your email/password is wrong. Please try again!',
  }

  if (!listError[msg]) return msg

  return listError[msg]
}