export const delay = async (callback, milliseconds = 1000) => {
   await sleep(milliseconds)
   if (typeof callback == 'function') {
      callback()
   }
}

export default delay