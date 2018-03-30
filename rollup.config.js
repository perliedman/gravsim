import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import svelte from 'rollup-plugin-svelte'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    json({ preferConst: true }),
    svelte({
      css: function (css) {
        css.write('dist/bundle.css')
      }
    }),
    resolve({browser: true}),
    commonjs()
  ]
}
