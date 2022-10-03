import { h, text } from 'hyperapp';

export const Section = (props, children) => h(
  'section',
  {
    class: 'py-2 px-4',
  },
  [
    h('h1', {
      class: 'mb-4 block border-b border-b-black text-lg font-bold capitalize',
    }, text(props.title)),

    h('article', {}, children),
  ]
);
