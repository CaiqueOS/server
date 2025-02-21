import { defineConfig } from 'tsup'

// Escolhendo quais arquivos vão ser convertidos, e para qual formato
export default defineConfig({
  entry: ['./src/**/*.ts'],
  format: 'esm',
  outDir: 'dist',
  clean: true,
})
