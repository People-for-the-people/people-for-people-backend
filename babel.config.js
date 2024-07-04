module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
    '@babel/plugin-syntax-decorators',
  ],
};
