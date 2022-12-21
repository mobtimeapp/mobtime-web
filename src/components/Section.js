import { h } from 'hyperapp';
import { text } from '../i18n/i18n.js';

export const Section = (props, children) => h(
  'section',
  {
    class: 'py-2 px-4',
  },
  [
    h('header', { class: 'mb-4 border-b border-b-black dark:border-b-gray-200 flex align-center justify-start' }, [
      h('h1', {
        class: 'text-lg font-bold capitalize flex-grow',
      }, text(props.title)),

      props.actions && h('div', {}, props.actions),
    ]),

    h('article', {}, children),
  ]
);
