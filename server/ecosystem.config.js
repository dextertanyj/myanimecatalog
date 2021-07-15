module.exports = [
  {
    script: 'dist/index.js',
    name: 'app_server',
    node_args: '--max-old-space-size=4096',
  },
];
