import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240, // Only compress files >10kb
      deleteOriginFile: false, // Keep original files alongside compressed ones
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['framer-motion', 'lucide-react'],
          'utils': ['@supabase/supabase-js'],
          'appointment': ['@emailjs/browser'],
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true,
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    reportCompressedSize: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@supabase/supabase-js',
      'lucide-react',
      '@emailjs/browser',
    ],
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    port: 4173,
    host: true,
  },
  esbuild: {
    legalComments: 'none',
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },
  css: {
    devSourcemap: false,
  },
});