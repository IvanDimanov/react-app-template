const fs = require('fs')
const path = require('path')

const ENV_PATH = path.resolve(__dirname, '../.env')

const parse = (variable) => {
  if (!isNaN(Number(variable))) {
    return Number(variable)
  }

  if (variable === 'true' ||
      variable === 'false'
  ) {
    return variable === 'true'
  }

  return variable
}

const getEnv = () => {
  let lines = []

  try {
    const envFile = fs.readFileSync(ENV_PATH, 'utf-8')
    lines = envFile.split('\n')
  } catch (error) {
    /**
     * Heroku cannot add files outside '.gitignore'
     * and since we cannot commit the '.env' file
     * we gonna fallback to use the default process env vars
     */
    console.warn(`Unable to read file ${ENV_PATH} fallback using process.env:`, error)
    lines = Object.keys(process.env).map((key) => `${key}=${process.env[key]}`)
  }

  /**
   * Why not use `process.env` directly or something like `` ?
   * => Because it `process.env` contains all environment variable
   * which the FE needs only the ones that are contained in the `ENV_PATH` file.
   *
   * Moreover, the values need to be `JSON.stringify()`
   * because of the `webpack.DefinePlugin()`
   * https://webpack.js.org/plugins/define-plugin/#usage
   */
  return lines
    .filter((line) => line)  // Removes empty lines
    .filter((line) => !line.startsWith('//'))  // Removes "//" comments
    .filter((line) => !line.startsWith('#'))   // Removes "#" comments
    .map((line) => {
      const data = line.split('=')
      const key = String(data[0]).trim()
      let value = String(data[1]).trim()
      value = JSON.stringify(parse(value))

      return {
        [key]: value
      }
    })
    .reduce((item, obj) => ({ ...obj, ...item }), {})
}

/**
 * Always provide only a clone but never the original
 * because objects can be altered
 */
const env = getEnv()
module.exports = () => Object.assign({}, env)
