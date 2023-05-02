module.exports = {
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 6
  },
  globals: {
    $: true,
    jQuery: true
  },
  env: {
    node: true,
    browser: true,
    amd: true
  },
  // Disable rules the current code base does not follow
  rules: {
    'one-var': 'off',
    'no-var': 'off',
    'prefer-const': 'off',
    camelcase: 'off',
    'dot-notation': 'off',
    'object-shorthand': 'off',
    'no-useless-escape': 'off',
    'no-unmodified-loop-condition': 'off',
    'no-void': 'off'
  }
}
