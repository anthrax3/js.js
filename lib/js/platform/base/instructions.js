exports.get = function get() {
  var out = { type: 'register', id: this.ret };
  var reg = { type: 'register' };
  var any = { type: 'any' };
  var js = { type: 'js' };

  return {
    literal: { inputs: [ js ], output: reg },
    ret: { inputs: [ out ], output: null },
    global: { inputs: [], output: reg },
    'this': { inputs: [], output: reg },
    self: { inputs: [], output: reg },
    runtime: { inputs:  [], output: reg, shallow: true },
    brk: { inputs: [], output: null, shallow: true },

    code: { inputs: [ js ], output: reg },
    map: { inputs: [ js ], output: reg },
    hole: { inputs: [ ], output: reg },

    cleanupRegs: { inputs: [ reg ], output: reg, shallow: true },
    readTagged: { inputs: [ reg, js ], output: reg, shallow: true },
    writeTagged: { inputs: [ reg, reg, js ], output: null, shallow: true },

    toBoolean: { inputs: [ reg ], output: out, shallow: true },
    nop: { inputs: [ any ], output: [ reg ] },
    loadArg: { inputs: [ js ], output: reg },
    pushArg: { inputs: [ any ], output: null, shallow: true },
    alignStack: { inputs: [ js ], output: null },
    checkMap: { inputs: [ reg, js ], output: null, shallow: true },
    call: {
      inputs: [ reg, reg, js ],
      output: out,
      call: true,
      shallow: true
    },
    stub: { inputs: [ js ], output: reg, shallow: true },
    callStub: {
      inputs: [ reg, js ],
      output: out,
      call: true,
      shallow: true
    },
    loadStubArg: { inputs: [ js ], output: reg },
    alignStubStack: { inputs: [ js ], output: null },
    runtimeId: { inputs: [ js ], output: reg, shallow: true },
    binary: {
      inputs: [ js, reg, reg ],
      output: out,
      shallow: true
    },

    isTrue: { inputs: [ reg ], output: null, shallow: true },
    isSmi: { inputs: [ reg ], output: null, shallow: true },
    checkOverflow: { inputs: [], output: null, shallow: true },
    reverseBranch: { inputs: [], output: null, shallow: true },

    smiUntag: { inputs: [ reg ], output: reg, shallow: true },
    smiAdd: { inputs: [ reg, reg ], output: reg, shallow: true },
    smiSub: { inputs: [ reg, reg ], output: reg, shallow: true },
    smiMul: { inputs: [ reg, reg ], output: out, shallow: true },
    smiCompare: { inputs: [ js, reg, reg ], output: null, shallow: true },
    smiShl: { inputs: [ reg, reg ], output: reg, shallow: true },
    smiMax: { inputs: [ reg, reg ], output: reg, shallow: true },

    pointerAdd: { inputs: [ reg, reg ], output: reg, shallow: true },
    pointerCompare: { inputs: [ js, reg, reg ], output: null, shallow: true },
    pointerFill: { inputs: [ reg, reg, reg ], output: null, shallow: true },

    'heap.current': { inputs: [], output: reg, shallow: true },
    'heap.setCurrent': { inputs: [ reg ], output: null, shallow: true },
    'heap.limit': { inputs: [], output: reg, shallow: true },
    'heap.alignSize': { inputs: [ reg ], output: reg, shallow: true },
  };
};

exports.getMethods = function getMethods(platform) {
  var res = {};
  Object.keys(platform.instructions).forEach(function(name) {
    var method = 'gen' + name.split('.').map(function(part) {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join('');
    res[name] = platform[method];
  }, platform);
  return res;
};