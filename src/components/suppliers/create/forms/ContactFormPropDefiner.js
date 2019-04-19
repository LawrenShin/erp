export const contactFormPropDefiner = (object, propName, propValue) => {
  return (Object.defineProperty(object, propName, {
    value: propValue,
    writable: true,
    enumerable: true,
    configurable: true
  }))
}