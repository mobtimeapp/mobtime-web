import { h } from 'hyperapp';

import * as actions from '../actions.js';

export const GoalForm = (_props) => h(
  'form',
  {
    action: '#nop',
    method: 'post',
    class: 'mb-2 flex flex-row items-start justify-start',
    onsubmit: (_, event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const text = formData.get('goal')
        .split("\n")
        .filter(Boolean)
        [0];

      event.target.reset();

      return [
        actions.addGoal,
        { text },
      ];
    },
  },
  [
    h('input', { type: 'checkbox', readOnly: true, disabled: true, class: 'mr-2 mt-1' }),
    h('textarea', {
      name: 'goal',
      onkeydown: (_, event) => {
        if (event.key == 'Enter' && !event.shiftKey) {
          event.preventDefault();
          event.target.form.requestSubmit();
        }
        return [actions.Nop];
      },
      class: 'block flex-grow tracking-wide bg-transparent border border-gray-200 dark:border-gray-700 focus:outline-blue-500 p-1',
    }),
  ],
);
