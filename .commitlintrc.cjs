const list = ['feat', 'fix', 'style', 'docs', 'refactor', 'chore'];
const maxMessageLength = 100;
const minMessageLength = 3;

/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'custom-type-enum': ({ type }) => {
          if (!list.includes(type)) {
            return [
              false,
              `
                Type 必須得是: ${list.join(', ')} \n
                例如: feat: 增加一個新的功能
                `,
            ];
          }
          return [true];
        },
        'custom-header-max-length': ({ header }, _when, expetedValue) => {
          if (header.length > expetedValue) {
            return [
              false,
              `
                標題必須少於${expetedValue}個字元, 現在為${header.length}個字元
                `,
            ];
          }
          return [true];
        },
        'custom-header-min-length': ({ header }, _when, expetedValue) => {
          if (header.length < expetedValue) {
            return [
              false,
              `
                標題必須多於${expetedValue}個字元, 現在為${header.length}個字元
                `,
            ];
          }
          return [true];
        },
      },
    },
  ],
  rules: {
    'custom-type-enum': [2, 'always'],
    'custom-header-max-length': [2, 'always', maxMessageLength],
    'custom-header-min-length': [2, 'always', minMessageLength],
  },
  messages: {
    type: '請選擇您要 Commit 的類型(必選)：',
    customScope: '選擇此次 Commit 影響的範圍(可選，若無，請按 Enter 略過):\n ',
    subject: '簡短描述 Commit 的修正範圍(必填)：\n',
    body: '更詳細的 Commit 說明(可選，若無，請按 Enter 略過):\n ',
    issues:
      '此次 Commit 會關閉的 Issues, e.g #123(可選，若無，請按 Enter 略過):\n ',
  },
  types: [
    {
      value: 'feat',
      name: 'feat:     🎸  新增/修改功能 (Feature)',
      emoji: '🎸',
    },
    { value: 'fix', name: 'fix:      🐛  修正 Bug (bug fix)', emoji: '🐛' },
    {
      value: 'docs',
      name: 'docs:     ✏️  修改/新增文件 (documentation)',
      emoji: '✏️',
    },
    {
      value: 'style',
      name: 'style:    💄  修改程式碼格式或風格，不影響原有運作，例如 ESLint (formatting, missing semi colons, …)',
      emoji: '💄',
    },
    {
      value: 'refactor',
      name: 'refactor: 💡  重構 or 優化，不屬於 bug 也不屬於新增功能等',
      emoji: '💡',
    },
    {
      value: 'perf',
      name: 'perf:     ⚡️  A code change that improves performance',
      emoji: '⚡️',
    },
    {
      value: 'test',
      name: 'test:     ✅  Adding missing tests or correcting existing tests',
      emoji: '✅',
    },
    {
      value: 'build',
      name: 'build:    📦️   Changes that affect the build system or external dependencies',
      emoji: '📦️',
    },
    {
      value: 'ci',
      name: 'ci:       🎡  Changes to our CI configuration files and scripts',
      emoji: '🎡',
    },
    {
      value: 'chore',
      name: 'chore:    🤖  增加或修改第三方套件(輔助工具)等 (maintain)',
      emoji: '🤖',
    },
    {
      value: 'revert',
      name: 'revert:   ⏪️  Reverts a previous commit',
      emoji: '⏪️',
    },
  ],
  useEmoji: true,
};
