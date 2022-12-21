import { app, h } from 'hyperapp';

import { TimerSummary } from './components/TimerSummary.js';
import { Section } from './components/Section.js';
import { Member } from './components/Member.js';
import { MemberForm } from './components/MemberForm.js';
import { Goal } from './components/Goal.js';
import { GoalForm } from './components/GoalForm.js';
import { AppendableList } from './components/AppendableList.js';

import * as actions from './actions.js';

import { IntervalSub } from './subscriptions/Interval.js';
import { ClientSub } from './subscriptions/Client.js';

import { load as loadI18n, text } from './i18n/i18n.js';

const tryLang = (languages) => {
  if (languages.length === 0) {
    return Promise.reject();
  }
  const [lang, ...otherLangs] = languages;
  const path = `${lang}-default`;
  return loadI18n(path)
    .catch(() => tryLang(otherLangs));
};

const getLang = () => {
  const params = (new URL(document.location)).searchParams;
  const languages = [
    params.get('lang'),
    ...navigator.languages,
  ].filter(Boolean).map(l => l.split('-')[0]);

  return tryLang(languages);
};

export const ui = (client, domMount) => getLang()
  .finally(() => app({
    init: actions.initialState(),

    view: (state) => {
      const { time, mob, goals, settings } = state.timer;

      const mobOrder = (settings.mobOrder || '').split(',');
      const minMembers = Math.max(mob.length, mobOrder.length);
      const members = Array
        .from({ length: minMembers }, (_, index) => ({
          id: `empty-${index}`,
          name: null,
          ...(mob[index] || {}),
          position: mobOrder[index] || null,
        }));

      const pendingGoals = goals.filter(g => !g.completed);
      const completedGoals = goals.filter(g => g.completed);

      return h('main', {
        class: '',
      }, [
        h('header', {
          class: 'mb-2 mt-1 flex px-4',
        }, [
          h('logo', { class: 'flex-grow' }, [
            h('h1', { class: 'uppercase sm:text-lg sm:font-bold sm:tracking-wide' }, text('mobtime')),
          ]),
          h('controls', { class: 'flex h-full flex-row' }, [
            h('button', { type: 'button', class: 'ml-4 rounded-sm text-sm' }, [
              text('⚙️ ', false),
              text('settings')
            ]),
            h('button', { type: 'button', class: 'ml-4 rounded-sm text-sm' }, [
              text('✉️ ', false),
              text('notifications'),
            ]),
          ]),
        ]),

        TimerSummary({
          time,
          settings,
          now: state.now,
        }),

        h('mobtime-grid', {
          class: 'grid sm:grid-cols-2',
        }, [
          Section({
            title: 'yourTeam',
            actions: [
              h('button', { type: 'button', class: 'ml-2 text-green-600' }, text('done')),
              h('button', { type: 'button', class: 'ml-2' }, text('edit')),
            ]
          }, [
            // h('ol', { class: 'mb-4' }, members.map(Member)),

            AppendableList({
              confirmed: members.map(Member),
              pending: state.local.mob.map(name => Member({ name, pending: true }))
            }),
            MemberForm(),
          ]),

          Section({ title: 'goals' }, [
            h('ol', { class: 'mb-4' }, pendingGoals.map(Goal)),
            GoalForm(),

            h('details', {}, [
              h('summary', { open: false }, [
                text(`${completedGoals.length} `, false),
                text(`completed`),
              ]),
              h('ol', { class: 'mb-4 ml-4' }, completedGoals.map(Goal)),
            ]),
          ]),
        ]),

      ]);
    },

    subscriptions: (state) => [
      [ClientSub, {
        client,
        clientRestartedAt: state.clientRestartedAt,
        setChannel: actions.setChannel,
        setMob: actions.setMob,
        setGoals: actions.setGoals,
        setSettings: actions.setSettings,
        setTimerTime: actions.setTimerTime,
        setClientRestartedAt: actions.clientRestartedAt,
      }],
      state.timer.time.startedAt && [IntervalSub, { onTick: actions.onTick }],
    ],

    node: domMount,
  }));
