import { ui } from './ui.js';

ui({
  timerId: 'preview',
  options: {
    domain: 'mobti.me',
    secure: true
  },
}, document.querySelector('main'));
