module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/base'
  ],
  plugins: [
  ],
  ignorePatterns: [ '/dist/*', '/src/plugins/*', '/static', '/public' ],
  rules: {
    quotes: [ 'warn', 'single' ], // String의 큰 따옴표 / 작은 따옴표 설정
    semi: [ 'warn', 'always' ], // Semicolon 설정
    indent: [ 'warn', 2 ], // Indent 설정
    'no-tabs': [ 'warn' ], // Indent에 Tab 허용 여부 설정
    'space-before-function-paren': [ // Function 과 () 사이의 띄어쓰기 여부
      'warn',
      {
        anonymous: 'never', // 익명 함수와 () 사이 띄어쓰기 여부
        named: 'never', // 이름 있는 함수와 () 사이 띄어쓰기 여부
        asyncArrow: 'always' // async 키워드와 () 사이 띄어쓰기 여부
      }
    ],
    'keyword-spacing': [ 'warn', { before: true, after: true }], // Keyword(if 등) 후 띄어쓰기 여부
    'comma-spacing': [ 'warn', { before: false, after: true }], // Comma 뒤의 space 여부
    'array-bracket-spacing': [ 'warn', 'always', { objectsInArrays: false, arraysInArrays: false }], // Array의 [] 내부의 띄어쓰기 여부
    'object-curly-spacing': [ 'warn', 'always', { arraysInObjects: true }], // Object의 {} 내부의 띄어쓰기 여부
    'space-before-blocks': 'warn', // {} 이전에 띄어쓰기 할 지 여부
    'arrow-parens': [ 'warn', 'always' ], // 화살표 함수에서, () 생략 가능 여부
    'object-shorthand': [ 'warn', 'always' ], // Object 내 에서, property, method를 Shorthand 로 정의 여부
    'quote-props': [ 'warn', 'as-needed' ], // Object의 Key 에 따옴표(Quote) 사용 여부
    'comma-dangle': [ 'warn', 'never' ], // Trailing Comma 사용 여부
    'no-trailing-spaces': 'warn', // 빈 공간의 Indent Space 허용 여부
    'key-spacing': [ 'warn', { beforeColon: false, afterColon: true }], // Colon 앞/뒤에 띄어쓰기 여부
    'space-infix-ops': [ 'warn', { int32Hint: false }], // 연산자 사이의 띄어쓰기 여부
    'spaced-comment': [ 'warn', 'always', { // 주석 표시 앞/뒤의 띄어쓰기 여부
      line: {
        markers: [ '/' ],
        exceptions: [ '-', '+' ]
      },
      block: {
        markers: [ '!' ],
        exceptions: [ '*' ],
        balanced: true
      }
    }],
    'padding-line-between-statements': [ // 특정 명령어 뒤에 띄어쓰기 추가하는지 여부
      'warn',
      { blankLine: 'always', prev: [ 'import', 'cjs-import', 'case', 'default' ], next: '*' },
      { blankLine: 'never', prev: [ 'import', 'cjs-import' ], next: [ 'import', 'cjs-import' ] },
      { blankLine: 'always', prev: '*', next: [ 'try', 'return', 'class', 'export', 'cjs-export', 'block', 'block-like' ] }
    ],
    'no-multiple-empty-lines': [ 'warn', { max: 1 }], // 내용 없는 라인의 허용 개수
    'no-unused-vars': 'warn', // 선언된 변수 중 사용되지 않은 변수 허용 여부
    // curly: [ 'warn', 'multi-or-nest', 'consistent' ], // 명령어(if, while 등) 뒤의 {} 생략 가능 여부
    // 'brace-style': [ 'warn', '1tbs', { allowSingleLine: true }],
    // 'padded-blocks': [ 'warn', 'never', { allowSingleLineBlocks: true }],
    // 'max-len': [ // 한 줄의 최대 글자 수
    //   'warn',
    //   100,
    //   { ignoreUrls: true, ignoreComments: true, ignoreTrailingComments: true }
    // ],
    // 'linebreak-style': 'off', // Line Break 를 Window(CRLF), Mac(LF) 허용 여부
    // 'no-undef': 'off', // 정의되지 않은 변수가 파일 내에 있을 경우, 점검 여부
    // 'no-alert': 'off', // alert 사용 허용 여부
    'no-console': 'off' // console 사용 허용 여부
    // 'no-debugger': 'off' // debugger 사용 허용 여부
  }
};
