import type { Preview } from '@storybook/nextjs-vite'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../renderer/store/store'
import { ThemeProvider } from '../renderer/components/ThemeProvider'
import '../renderer/styles/globals.css'



const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      // Apply dark class to html element based on background
      React.useEffect(() => {
        const isDark = context.globals.backgrounds?.value === '#1a1a1a';
        const htmlElement = document.documentElement;
        if (isDark) {
          htmlElement.classList.add('dark');
        } else {
          htmlElement.classList.remove('dark');
        }
      }, [context.globals.backgrounds?.value]);

      

      return (
        <Provider store={store}>
          <ThemeProvider>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4">
              <Story />
            </div>
          </ThemeProvider>
        </Provider>
      );
    },
  ],
};

export default preview;