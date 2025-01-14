module.exports = {
  title: 'Vitedge',
  description: 'Edge-side rendering and fullstack Vite framework',
  themeConfig: {
    repo: 'frandiox/vitedge',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    algolia: {
      apiKey: 'f98b65240d8346a09d4bdf113beb233c',
      indexName: 'vitedge',
    },

    nav: [
      {
        text: 'Release Notes',
        link: 'https://github.com/frandiox/vitedge/releases',
      },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        link: '/getting-started',
      },
      {
        text: 'Usage',
        link: '/usage',
      },
      {
        text: 'Page Props',
        link: '/props',
      },
      {
        text: 'API',
        link: '/api',
      },
      {
        text: 'Cache',
        link: '/cache',
      },
      {
        text: 'Environment Variables',
        link: '/environment',
      },
      {
        text: 'CORS',
        link: '/cors',
      },
      {
        text: 'Troubleshooting',
        link: '/troubleshooting',
      },
    ],
  },
}
