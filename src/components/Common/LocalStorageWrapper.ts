export enum LocalStorageKey {
  IS_CONNECTED = 'isConnected'
}

export const localStorageInternal = () => {
  if (typeof window === 'undefined') {
    return undefined
  }

  return localStorage
}

export const getString = (key: LocalStorageKey): string | undefined | null => localStorageInternal()?.getItem(key.toString())

export const getBoolean = (key: LocalStorageKey): boolean => localStorageInternal()?.getItem(key.toString()) == 'true'

export const setItem = (key: LocalStorageKey, value: string) => {
  localStorageInternal()?.setItem(key.toString(), value)
}

export const removeItem = (key: LocalStorageKey) => {
  localStorageInternal()?.removeItem(key.toString())
}