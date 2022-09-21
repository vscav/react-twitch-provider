const consoleFilters = [
  /^Warning: ReactDOM.render is no longer supported in React 18./ // React 18 deprecation warning
]

function suppressErrorOutput() {
  const originalError = console.error

  const error = (...args: Parameters<typeof originalError>) => {
    const message = typeof args[0] === 'string' ? args[0] : null
    if (!message || !consoleFilters.some((filter) => filter.test(message))) {
      originalError(...args)
    }
  }

  console.error = error

  return () => {
    console.error = originalError
  }
}

// function errorFilteringDisabled() {
//   try {
//     return true /* replace by env variable check */
//   } catch {
//     return false
//   }
// }

function enableErrorOutputSuppression() {
  if (
    typeof beforeEach === 'function' &&
    typeof afterEach === 'function'
    // && !errorFilteringDisabled()
  ) {
    let restoreConsole!: () => void

    beforeEach(() => {
      restoreConsole = suppressErrorOutput()
    })

    afterEach(() => restoreConsole())
  }
}

export { enableErrorOutputSuppression }
