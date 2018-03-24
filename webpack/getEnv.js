const fs = require('fs')
const path = require('path')

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

const ENV_PATH = path.resolve(__dirname, '../.env')
const envFile = fs.readFileSync(ENV_PATH, 'utf-8')

/**
 * Why not use `process.env` directly or something like `` ?
 * => Because it `process.env` contains all environment variable
 * which the FE needs only the ones that are contained in the `ENV_PATH` file.
 *
 * Moreover, the values need to be `JSON.stringify()`
 * because of the `webpack.DefinePlugin()`
 * https://webpack.js.org/plugins/define-plugin/#usage
 */
const env = envFile
  .split('\n')
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

/**
 * Always provide only a clone but never the original
 * because objects can be altered
 */
module.exports = () => Object.assign({}, env)
