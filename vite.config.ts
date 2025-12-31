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
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@water102/fx-react',
      fileName: () => 'index.js',
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

