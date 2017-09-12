export class Presets {
  constructor() {
    return [
      // 2 rows each
      [1, null, 1, null, 1, null, 1, null,
        null, 1, null, 1, null, 1, null, 1,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        0, null, 0, null, 0, null, 0, null,
        null, 0, null, 0, null, 0, null, 0
      ],

      // ready for king jump
      [null, null, null, null, null, null, null, null,
        null, 0, null, 0, null, 1, null, 0,
        null, null, null, null, null, null, null, null,
        null, null, null, 0, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        1, null, 1, null, 1, null, 1, null,
        null, null, null, null, null, null, null, null
      ],

      // king long jump
      [null, null, null, null, null, null, null, null,
        null, null, null, null, null, 0, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, 1, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null
      ]
    ]
  }
}
