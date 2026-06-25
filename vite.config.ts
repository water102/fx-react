import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [
    react(), // This handles CSS modules automatically
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
      entryRoot: 'src',
      outDir: 'dist',
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        'error-boundary': path.resolve(__dirname, 'src/entries/error-boundary.ts'),
        hooks: path.resolve(__dirname, 'src/entries/hooks.ts'),
        i18n: path.resolve(__dirname, 'src/entries/i18n.ts'),
        'redux-logic': path.resolve(__dirname, 'src/entries/redux-logic.ts'),
        'with-react-query': path.resolve(__dirname, 'src/entries/with-react-query.ts'),
        'copy-to-clipboard': path.resolve(__dirname, 'src/entries/copy-to-clipboard.ts'),
      },
      name: '@water102/fx-react',
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'react-router',
        'react-redux',
        '@reduxjs/toolkit',
        '@tanstack/react-query',
        '@water102/fx-common',
        '@water102/fx-web',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'react-hot-toast',
        'i18next',
        'react-i18next',
        'i18next-http-backend',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'index.css';
          }
          return assetInfo.name || 'asset';
        },
      },
    },
    cssCodeSplit: false, // Bundle all CSS into one file
  },
});

