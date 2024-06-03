module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/prettier',
  ],
  rules: {
    'no-console': process.env.MODE === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.MODE === 'production' ? 'warn' : 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/multi-word-component-names': 'off',
  },
}
