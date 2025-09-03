import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isLibMode = mode === 'lib';
  
  const config: any = {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  };

  if (isLibMode) {
    // Library build configuration
    config.build = {
      outDir: 'dist',
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'FormBuilder',
        formats: ['es', 'umd'],
        fileName: (format) => `form-builder.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    };
  } else {
    // Demo application configuration
    config.build = {
      outDir: 'demo-dist',
    };
  }

  return config;
})