import { h } from 'hyperapp';
import { text } from '../i18n/i18n.js';

import * as actions from '../actions.js';

const memberPendingClass = (pending) => {
  if (!pending) return '';

  return 'bg-amber-50 border-b border-amber-400';
};

export const Member = (member) => h(
  'li',
  { class: ['py-1 flex flex-row items-center justify-start', memberPendingClass(member.pending)].join(' ') },
  [
    h('member-draggable', { class: 'mr-2 flex flex-shrink cursor-move flex-col' }, [
      h('member-line', { class: 'mt-1 w-4 border-b-2 border-black dark:border-gray-100' }),
      h('member-line', { class: 'mt-1 w-4 border-b-2 border-black dark:border-gray-100' }),
      h('member-line', { class: 'mt-1 w-4 border-b-2 border-black dark:border-gray-100' }),
    ]),
    h('user', { class: 'flex-grow flex items-center justify-between' }, [
      h('editable', {
        class: {
          'text-lg': true,
          'text-gray-300': !member.name,
        },
        contenteditable: !!member.id,
        // oninput: (_, event) => {
        //   console.log('editable.input', event.target.innerText, member.id);
        //   return [actions.onMemberInput, { name: event.target.innerText, id: member.id }];
        // },
        onblur: (_, event) => {
          const name = event.target.innerText;
          return [actions.editMember, { name, id: member.id }]
        },
      }, member.name ? text(member.name, false) :text('member.empty')),
      h('small', {
        class: 'block uppercase tracking-wide',
      }, 
      [
        member.pending
          ? text('member.pending')
          : (member.position ? text(member.position, false) : text('member.noPosition'))
      ]),
    ]),
  ],
);
