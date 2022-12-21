import { h } from 'hyperapp';
import { text } from '../i18n/i18n.js';

import * as actions from '../actions.js';

export const Goal = (goal) => {
  return h('li', { key: goal.id }, [
    h('label', { class: 'mb-2 flex justify-start items-start' }, [
      h('input', {
        type: 'checkbox',
        class: 'mr-2 mt-1',
        checked: goal.completed,
        onchange: (_, event) => {
          event.preventDefault();
          return [actions.completeGoal, { id: goal.id, completed: event.target.checked }];
        },
      }),
      h('span', { class: 'leading-tight' }, text(goal.text, false)),
    ]),
    goal.children && h('ol', { class: 'ml-4' }, goal.children.map(Goal))
  ]);
};
