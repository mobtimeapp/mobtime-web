import { h } from 'hyperapp';
import { text } from '../i18n/i18n.js';

import * as actions from '../actions.js';

export const MemberForm = (_props) => h(
  'form',
  {
    action: '#nop',
    method: 'post',
    class: 'mb-2 flex flex-row items-center justify-start',
    onsubmit: (_, event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const name = formData.get('name');
      if (!name) {
        return [actions.Nop];
      }
      event.target.reset();
      return [
        actions.addMember,
        { name },
      ];
    },
  },
  [

    //h('button', { type: 'submit', class: 'mr-2 w-4 flex-shrink' }, text('+')),
    h('input', { name: 'name', class: 'ml-6 block flex-grow tracking-wide bg-transparent border border-gray-200 dark:border-gray-700 focus:outline-blue-500 p-1' }),
    h('button', { type: 'submit', class: 'uppercase tracking-wide px-4 py-1 ml-2 border border-gray-200 block' }, h('small', {}, text('member.add'))),
  ],
);
