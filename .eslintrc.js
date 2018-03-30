/**
 * @Author: Henrique Liberato <hliberato>
 * @Date:   22-11-2017
 * @Last modified by:   hliberato
 * @Last modified time: 29-03-2018
 */

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  env: {
    browser: true
  },
  rules: {
  }
};
