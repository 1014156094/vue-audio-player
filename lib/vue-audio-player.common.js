module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "07e3":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0dcd":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1bc3":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("f772");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "1c9a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3bb0d234_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0dcd");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3bb0d234_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3bb0d234_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3bb0d234_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "1ec9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
var document = __webpack_require__("e53d").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "25eb":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "274f":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFDElEQVRoQ91aXUybVRh+3v4Q0HVVmANG6WSUbTgTMwfDxBsw2dwSncZkGe0GV4qR6QaBbRcaL4xGneLYVEymmRkTCjHxP5kS47zwQjbQLZH9UQa2ZaNuELF1Vfrzmq/QWlhpe76vjLFz+53ned/nnPec77zvOYQUtJGqwqUTPlSA6CECVgNcANA9AO6cov8b4KsADTJwHsw/p2lxIufYwB9KzZNcAmf16ixM+KuZYAGwDoAoFwPoJUY70jSthtbzo3J8ETWKoR3FuZqAr5GBZ6NGWI7t/zGE6wjiCEP9urHjwmURsqQFcHm5xpk7XA/wywAWiRgR6OsB6BWXbnFzyeFeXzK4pAQ4LCuKwKpOAGuTIU1Bn9NBFbYvb7OdTcSVUIDdYnqCGK0AFiciS/F3D4OrjNaBL+LxxhXgtBTWMFMLAHWKnUuWLkDEtYb2gcOzAWYVYLeYniOG5Py8NybUGtttH8RyJKYAe6VpCxE+m8eRn+lrgBlPGTtsX838cIOAoW1FxWoVn5zDnUbujHoCQVp/b2f/uWiCaQJ6atZps93jpwA8INfKHOPOuHT60ugtdpoAh7loD8D759gJhfS0L9/aH/ExIsBeuWoZUeDCLRg6MwV7mNWrwn/siACHxfQeGDsVDs9NgRPQYrDaQr6GBFw2r1wSQNAOIEOJB6TRIr1kAzJKNiCtaC3Udy8F/D4ExkYwMXQW3lNd+Kf3e7A/qVNCPFe8aqiMy6wXr4UEOM2mOgYOKHE+o3Qj9Ja90GQvj0vjd/2O8fb9ITFKGgH1BqutOSyghyePxOJNpYZ+WwN0jz8jhHV//SHGO5uAYEAIF9W5J99qKyUpGfH5aUTGeT7EpTfvFXY+7ERIhFX2psfMagPZLYWVxGSVMwwZZZuQtftdOdAIZvTgC/B2fyuPg7CD7GbTAQLqRBmkBZvT/APUmTmi0Gn9A2MujNRVyFrYDDSTw2w6DmCTqBd3PLwFmTubRGEx+4+1NOL6T1+KcxGOk6PS1A+CSRQthY4UQqlo3pPfYbT5eXEqhk2agb8A6ETRuYd+hHpJnigsZv/AtWFc2VUuh8stCZCqA8It72gfSJsmjIsFkH5sw9X3yeKSL+DIaVB6uOwjy3YEpEDAhOwQymnqgia3QJnnU2gFITR6Wyzihb2N3hI/svpHwL4J4XAM/ciUHSU2I2v3IWHD0YDRg7vg7ZaCQFarokvmgmwt1FdkH+Ys+6B77GlZ1t3ffITx9jdlYQFMHuYktNNsUnScvqv6RSzaWCXkiKfrE/zZ+qrs4zQBvQarrSR1Cc36R6E370kuoel4W/4JdGqYGGgwWm3vpDylzCjbDCk70xbcD3VmdsicdOL0Df4WysKkeE95SjkVRu8zUCsUB/PU+YakXvJjwZdVJBELurAlCZgqLXbfxIsM0SD81aXTl81aWgzNwuRtTM88XGgkEuOmYLDE0HnpYnTH26+8Hla3oC84wiIW9BVTZCbMhU8S6Og8rAkPmKvzOwY+j7c4Et5SRi3sm3nNeiaogiUl16xh9X1b16Tptf82MuMlpVXsOCPqZfBrbn/6W2s+7UsqQUhqBqINOrauzGNtsIEYNSl9agB8TIQ3DG02Z6L9NOE2mgyBdKcQ5GAVCNsZeFBGPsEE/AJGm4pUx6RafzJ2Z/YRnoFYRqSkSEOqCjCVEVAMQCpXSM9twm8qPACuApCe25wDcbefgydWWAddcpyOxvwHRRsEkTWDUzcAAAAASUVORK5CYII="

/***/ }),

/***/ "294c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "35e8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");
module.exports = __webpack_require__("8e60") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "584a":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5d6b":
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__("e53d").parseInt;
var $trim = __webpack_require__("a1ce").trim;
var ws = __webpack_require__("e692");
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "63b6":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var ctx = __webpack_require__("d864");
var hide = __webpack_require__("35e8");
var has = __webpack_require__("07e3");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7445":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("63b6");
var $parseInt = __webpack_require__("5d6b");
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "794b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("8e60") && !__webpack_require__("294c")(function () {
  return Object.defineProperty(__webpack_require__("1ec9")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "79aa":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8e60":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("294c")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a1ce":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("63b6");
var defined = __webpack_require__("25eb");
var fails = __webpack_require__("294c");
var spaces = __webpack_require__("e692");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return ch;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return ch;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return ch;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "a49d":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon-play-start.d5e819a3.png";

/***/ }),

/***/ "acb9":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "aebd":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b9e9":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("7445");
module.exports = __webpack_require__("584a").parseInt;


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c06f":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d864":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("79aa");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d9f6":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var toPrimitive = __webpack_require__("1bc3");
var dP = Object.defineProperty;

exports.f = __webpack_require__("8e60") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "e2db":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon-play-pause.ccd85025.png";

/***/ }),

/***/ "e4ae":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "e53d":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "e692":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "e814":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("b9e9");

/***/ }),

/***/ "f772":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules//.cache//vue-loader","cacheIdentifier":"42fc28b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/audio-player/index.vue?vue&type=template&id=3bb0d234&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"audio-conatiner"},[_c('div',{staticClass:"audio-btn-container"},[_c('img',{staticClass:"play-previous-btn",attrs:{"src":__webpack_require__("c06f")},on:{"click":_vm.playPrev}}),(!_vm.isPlaying)?_c('img',{staticClass:"play-start-btn",attrs:{"src":__webpack_require__("a49d")},on:{"click":_vm.play}}):_c('img',{staticClass:"play-start-btn",attrs:{"src":__webpack_require__("e2db")},on:{"click":_vm.pause}}),_c('img',{staticClass:"play-next-btn",attrs:{"src":__webpack_require__("acb9")},on:{"click":_vm.playNext}})]),_c('div',{ref:"audioProgressContainer",staticClass:"audio-progress-container"},[_c('div',{ref:"audioProgress",staticClass:"audio-progress"}),_c('img',{ref:"audioProgressPoint",staticClass:"audio-progress-point",attrs:{"src":__webpack_require__("274f")}})]),_c('div',{staticClass:"audio-time-container"},[_c('div',{staticClass:"audio-current-time"},[_vm._v("\n      "+_vm._s(_vm.currentTimeAfterFormat)+"\n    ")]),_c('div',{staticClass:"audio-duration"},[_vm._v("\n      "+_vm._s(_vm.formatTime(_vm.duration))+"\n    ")])]),_c('audio',{ref:"audio",attrs:{"src":_vm.audioList[_vm.currentPlayIndex]},on:{"ended":_vm.onEnded,"timeupdate":_vm.onTimeUpdate,"loadedmetadata":_vm.onLoadedmetadata}},[_vm._v("\n    浏览器太老咯，请升级浏览器吧~\n  ")])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/audio-player/index.vue?vue&type=template&id=3bb0d234&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js
var parse_int = __webpack_require__("e814");
var parse_int_default = /*#__PURE__*/__webpack_require__.n(parse_int);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/audio-player/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var audio_playervue_type_script_lang_js_ = ({
  name: 'AudioPlayer',
  props: {
    // 音频播放列表
    audioList: {
      default: null,
      type: Array
    },
    // 播放前的回调函数
    beforePlay: {
      default: null,
      type: Function
    },
    // 上一首前的回调函数
    beforePrev: {
      default: null,
      type: Function
    },
    // 下一首前的回调函数
    beforeNext: {
      default: null,
      type: Function
    },
    // 是否列表循环播放
    isLoop: {
      default: true,
      type: Boolean
    }
  },
  data: function data() {
    return {
      currentPlayIndex: 0,
      // 当前播放的音频位置索引
      isPlaying: false,
      // 音频是否正在播放
      duration: '',
      // 音频持续时间
      currentTime: '',
      // 音频当前播放时间
      currentTimeAfterFormat: '',
      // 音频播放当时时间（格式化后）
      isDragging: false // 是否正在拖拽音频进度

    };
  },
  methods: {
    // 当媒介元素的持续时间以及其它媒介已加载数据时运行脚本
    onLoadedmetadata: function onLoadedmetadata() {
      this.duration = this.$refs.audio.duration;
      this.initProgressDrag();
    },
    // 正在播放音频中
    onTimeUpdate: function onTimeUpdate(val) {
      this.progressValue = this.$refs.audio.currentTime / (this.$refs.audio.duration / 100);
      this.currentTimeAfterFormat = this.formatTime(this.$refs.audio.currentTime); // 正在拖拽进度

      if (this.isDragging) {
        return;
      } // 设置播放进度条


      this.$refs.audioProgress.style.width = this.$refs.audio.currentTime / this.$refs.audio.duration * this.$refs.audioProgressContainer.offsetWidth + 'px'; // 设置播放进度拖拽点

      this.$refs.audioProgressPoint.style.left = this.$refs.audio.currentTime / this.$refs.audio.duration * (this.$refs.audioProgressContainer.offsetWidth - this.$refs.audioProgressPoint.offsetWidth / 2) + 'px';
    },
    // 格式化秒为分
    formatTime: function formatTime(second) {
      return [parse_int_default()(second / 60 % 60), parse_int_default()(second % 60)].join(':').replace(/\b(\d)\b/g, '0$1');
    },
    // 音频播放完毕
    onEnded: function onEnded() {
      this.pause();
      this.$emit('ended');
    },
    // 初始化音频进度的拖拽逻辑
    initProgressDrag: function initProgressDrag() {
      var _this = this;

      this.$refs.audioProgressPoint.addEventListener('touchstart', function (event) {
        // 设置拖拽中
        _this.isDragging = true;
      }, false);
      this.$refs.audioProgressPoint.addEventListener('touchmove', function (event) {
        var touch = event.touches[0]; // 超出范围

        if (touch.pageX < _this.$refs.audioProgressContainer.offsetLeft || touch.pageX > _this.$refs.audioProgressContainer.offsetLeft + _this.$refs.audioProgressContainer.offsetWidth) {
          return;
        } // 设置点点


        _this.$refs.audioProgressPoint.style.left = touch.pageX - _this.$refs.audioProgressPoint.offsetWidth / 2 - _this.$refs.audioProgressContainer.offsetLeft + 'px'; // 设置进度条

        _this.$refs.audioProgress.style.width = touch.pageX - _this.$refs.audioProgressContainer.offsetLeft + 'px'; // 设置当前时间

        _this.currentTime = _this.$refs.audioProgress.offsetWidth / _this.$refs.audioProgressContainer.offsetWidth * _this.duration; // 设置当前时间（格式化后）

        _this.currentTimeAfterFormat = _this.formatTime(_this.currentTime);
      }, false);
      this.$refs.audioProgressPoint.addEventListener('touchend', function (event) {
        // 设置播放位置
        _this.$refs.audio.currentTime = _this.currentTime; // 设置未拖拽

        _this.isDragging = false;
      }, false);
      this.initProgressClick();
    },
    // 初始化音频进度的点击逻辑
    initProgressClick: function initProgressClick() {
      var _this2 = this;

      this.$refs.audioProgressContainer.addEventListener('click', function (event) {
        var touch = event; // 设置点点

        _this2.$refs.audioProgressPoint.style.left = touch.pageX - _this2.$refs.audioProgressPoint.offsetWidth / 2 - _this2.$refs.audioProgressContainer.offsetLeft + 'px'; // 设置进度条

        _this2.$refs.audioProgress.style.width = touch.pageX - _this2.$refs.audioProgressContainer.offsetLeft + 'px'; // 设置当前时间

        _this2.currentTime = _this2.$refs.audioProgress.offsetWidth / _this2.$refs.audioProgressContainer.offsetWidth * _this2.duration; // 设置当前时间（格式化后）

        _this2.currentTimeAfterFormat = _this2.formatTime(_this2.currentTime); // 设置播放位置

        _this2.$refs.audio.currentTime = _this2.currentTime;
      });
    },
    // 开始播放
    play: function play() {
      var _this3 = this;

      if (this.beforePlay) {
        this.beforePlay(function (state) {
          if (state !== false) {
            _this3.$refs.audio.play();

            _this3.isPlaying = true;
          }
        });
        return;
      }

      this.$refs.audio.play();
      this.isPlaying = true;
    },
    // 暂停播放
    pause: function pause() {
      this.$refs.audio.pause();
      this.isPlaying = false;
    },
    // 播放上一首
    playPrev: function playPrev() {
      var _this4 = this;

      if (this.currentPlayIndex <= 0 && !this.isLoop) {
        // 无上一首了
        alert('已是第一首！');
        return;
      }

      var prev = function prev() {
        if (_this4.currentPlayIndex <= 0 && _this4.isLoop) {
          // 列表循环
          _this4.currentPlayIndex = _this4.audioList.length - 1;
        } else {
          _this4.currentPlayIndex--;
        }

        _this4.$nextTick(function () {
          _this4.$refs.audio.play();

          _this4.isPlaying = true;
        });
      };

      if (this.beforePrev) {
        this.beforePrev(function (state) {
          if (state !== false) {
            prev();
          }
        });
        return;
      }

      prev();
    },
    // 播放下一首
    playNext: function playNext() {
      var _this5 = this;

      if (this.currentPlayIndex + 1 >= this.audioList.length && !this.isLoop) {
        // 无下一首了
        alert('已是最后一首！');
        return;
      }

      var next = function next() {
        if (_this5.currentPlayIndex + 1 >= _this5.audioList.length && _this5.isLoop) {
          // 列表循环
          _this5.currentPlayIndex = 0;
        } else {
          _this5.currentPlayIndex++;
        }

        _this5.$nextTick(function () {
          _this5.$refs.audio.play();

          _this5.isPlaying = true;
        });
      };

      if (this.beforeNext) {
        this.beforeNext(function (state) {
          if (state !== false) {
            next();
          }
        });
        return;
      }

      next();
    }
  }
});
// CONCATENATED MODULE: ./packages/audio-player/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var packages_audio_playervue_type_script_lang_js_ = (audio_playervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/audio-player/index.vue?vue&type=style&index=0&id=3bb0d234&lang=less&scoped=true&
var audio_playervue_type_style_index_0_id_3bb0d234_lang_less_scoped_true_ = __webpack_require__("1c9a");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./packages/audio-player/index.vue






/* normalize component */

var component = normalizeComponent(
  packages_audio_playervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "3bb0d234",
  null
  
)

component.options.__file = "index.vue"
/* harmony default export */ var audio_player = (component.exports);
// CONCATENATED MODULE: ./packages/index.js



var packages_install = function install(Vue) {
  Vue.component(audio_player.name, audio_player);
};
/* istanbul ignore if */


if (typeof window !== 'undefined' && window.Vue) {
  packages_install(window.Vue);
}

/* harmony default export */ var packages_0 = ({
  install: packages_install,
  AudioPlayer: audio_player
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (packages_0);



/***/ })

/******/ });
//# sourceMappingURL=vue-audio-player.common.js.map