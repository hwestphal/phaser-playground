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
/******/ 	__webpack_require__.p = "/dist_editor/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src_editor/runtime/T.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/prismjs/prism.js":
/*!***************************************!*\
  !*** ./node_modules/prismjs/prism.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/* **********************************************
     Begin prism-core.js
********************************************** */

/// <reference lib="WebWorker"/>

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
			? self // if in worker
			: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function (_self) {

	// Private helper vars
	var lang = /\blang(?:uage)?-([\w-]+)\b/i;
	var uniqueId = 0;

	// The grammar object for plaintext
	var plainTextGrammar = {};


	var _ = {
		/**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		manual: _self.Prism && _self.Prism.manual,
		disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

		/**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */
		util: {
			encode: function encode(tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, encode(tokens.content), tokens.alias);
				} else if (Array.isArray(tokens)) {
					return tokens.map(encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			/**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */
			type: function (o) {
				return Object.prototype.toString.call(o).slice(8, -1);
			},

			/**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */
			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			/**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */
			clone: function deepClone(o, visited) {
				visited = visited || {};

				var clone; var id;
				switch (_.util.type(o)) {
					case 'Object':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = /** @type {Record<string, any>} */ ({});
						visited[id] = clone;

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = deepClone(o[key], visited);
							}
						}

						return /** @type {any} */ (clone);

					case 'Array':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = [];
						visited[id] = clone;

						(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
							clone[i] = deepClone(v, visited);
						});

						return /** @type {any} */ (clone);

					default:
						return o;
				}
			},

			/**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */
			getLanguage: function (element) {
				while (element && !lang.test(element.className)) {
					element = element.parentElement;
				}
				if (element) {
					return (element.className.match(lang) || [, 'none'])[1].toLowerCase();
				}
				return 'none';
			},

			/**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */
			currentScript: function () {
				if (typeof document === 'undefined') {
					return null;
				}
				if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
					return /** @type {any} */ (document.currentScript);
				}

				// IE11 workaround
				// we'll get the src of the current script by parsing IE11's error stack trace
				// this will not work for inline scripts

				try {
					throw new Error();
				} catch (err) {
					// Get file src url from stack. Specifically works with the format of stack traces in IE.
					// A stack will look like this:
					//
					// Error
					//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
					//    at Global code (http://localhost/components/prism-core.js:606:1)

					var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];
					if (src) {
						var scripts = document.getElementsByTagName('script');
						for (var i in scripts) {
							if (scripts[i].src == src) {
								return scripts[i];
							}
						}
					}
					return null;
				}
			},

			/**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */
			isActive: function (element, className, defaultActivation) {
				var no = 'no-' + className;

				while (element) {
					var classList = element.classList;
					if (classList.contains(className)) {
						return true;
					}
					if (classList.contains(no)) {
						return false;
					}
					element = element.parentElement;
				}
				return !!defaultActivation;
			}
		},

		/**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		languages: {
			/**
			 * The grammar for plain, unformatted text.
			 */
			plain: plainTextGrammar,
			plaintext: plainTextGrammar,
			text: plainTextGrammar,
			txt: plainTextGrammar,

			/**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || /** @type {any} */ (_.languages);
				var grammar = root[inside];
				/** @type {Grammar} */
				var ret = {};

				for (var token in grammar) {
					if (grammar.hasOwnProperty(token)) {

						if (token == before) {
							for (var newToken in insert) {
								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						// Do not insert token which also occur in insert. See #1525
						if (!insert.hasOwnProperty(token)) {
							ret[token] = grammar[token];
						}
					}
				}

				var old = root[inside];
				root[inside] = ret;

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === old && key != inside) {
						this[key] = ret;
					}
				});

				return ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function DFS(o, callback, type, visited) {
				visited = visited || {};

				var objId = _.util.objId;

				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						var property = o[i];
						var propertyType = _.util.type(property);

						if (propertyType === 'Object' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, null, visited);
						} else if (propertyType === 'Array' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, i, visited);
						}
					}
				}
			}
		},

		plugins: {},

		/**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */
		highlightAll: function (async, callback) {
			_.highlightAllUnder(document, async, callback);
		},

		/**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */
		highlightAllUnder: function (container, async, callback) {
			var env = {
				callback: callback,
				container: container,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run('before-highlightall', env);

			env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

			_.hooks.run('before-all-elements-highlight', env);

			for (var i = 0, element; (element = env.elements[i++]);) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		/**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */
		highlightElement: function (element, async, callback) {
			// Find language
			var language = _.util.getLanguage(element);
			var grammar = _.languages[language];

			// Set language on the element, if not present
			element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

			// Set language on the parent, for styling
			var parent = element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre') {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			function insertHighlightedCode(highlightedCode) {
				env.highlightedCode = highlightedCode;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
			}

			_.hooks.run('before-sanity-check', env);

			// plugins may change/add the parent/element
			parent = env.element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
				parent.setAttribute('tabindex', '0');
			}

			if (!env.code) {
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (!env.grammar) {
				insertHighlightedCode(_.util.encode(env.code));
				return;
			}

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function (evt) {
					insertHighlightedCode(evt.data);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			} else {
				insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
			}
		},

		/**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */
		highlight: function (text, grammar, language) {
			var env = {
				code: text,
				grammar: grammar,
				language: language
			};
			_.hooks.run('before-tokenize', env);
			env.tokens = _.tokenize(env.code, env.grammar);
			_.hooks.run('after-tokenize', env);
			return Token.stringify(_.util.encode(env.tokens), env.language);
		},

		/**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */
		tokenize: function (text, grammar) {
			var rest = grammar.rest;
			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			var tokenList = new LinkedList();
			addAfter(tokenList, tokenList.head, text);

			matchGrammar(text, tokenList, grammar, tokenList.head, 0);

			return toArray(tokenList);
		},

		/**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		hooks: {
			all: {},

			/**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */
			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			/**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */
			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i = 0, callback; (callback = callbacks[i++]);) {
					callback(env);
				}
			}
		},

		Token: Token
	};
	_self.Prism = _;


	// Typescript note:
	// The following can be used to import the Token type in JSDoc:
	//
	//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

	/**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */
	function Token(type, content, alias, matchedStr) {
		/**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */
		this.type = type;
		/**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */
		this.content = content;
		/**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || '').length | 0;
	}

	/**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */

	/**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */
	Token.stringify = function stringify(o, language) {
		if (typeof o == 'string') {
			return o;
		}
		if (Array.isArray(o)) {
			var s = '';
			o.forEach(function (e) {
				s += stringify(e, language);
			});
			return s;
		}

		var env = {
			type: o.type,
			content: stringify(o.content, language),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language
		};

		var aliases = o.alias;
		if (aliases) {
			if (Array.isArray(aliases)) {
				Array.prototype.push.apply(env.classes, aliases);
			} else {
				env.classes.push(aliases);
			}
		}

		_.hooks.run('wrap', env);

		var attributes = '';
		for (var name in env.attributes) {
			attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
	};

	/**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */
	function matchPattern(pattern, pos, text, lookbehind) {
		pattern.lastIndex = pos;
		var match = pattern.exec(text);
		if (match && lookbehind && match[1]) {
			// change the match to remove the text matched by the Prism lookbehind group
			var lookbehindLength = match[1].length;
			match.index += lookbehindLength;
			match[0] = match[0].slice(lookbehindLength);
		}
		return match;
	}

	/**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */
	function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
		for (var token in grammar) {
			if (!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = Array.isArray(patterns) ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				if (rematch && rematch.cause == token + ',' + j) {
					return;
				}

				var patternObj = patterns[j];
				var inside = patternObj.inside;
				var lookbehind = !!patternObj.lookbehind;
				var greedy = !!patternObj.greedy;
				var alias = patternObj.alias;

				if (greedy && !patternObj.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
					patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
				}

				/** @type {RegExp} */
				var pattern = patternObj.pattern || patternObj;

				for ( // iterate the token list and keep track of the current token/string position
					var currentNode = startNode.next, pos = startPos;
					currentNode !== tokenList.tail;
					pos += currentNode.value.length, currentNode = currentNode.next
				) {

					if (rematch && pos >= rematch.reach) {
						break;
					}

					var str = currentNode.value;

					if (tokenList.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					var removeCount = 1; // this is the to parameter of removeBetween
					var match;

					if (greedy) {
						match = matchPattern(pattern, pos, text, lookbehind);
						if (!match) {
							break;
						}

						var from = match.index;
						var to = match.index + match[0].length;
						var p = pos;

						// find the node that contains the match
						p += currentNode.value.length;
						while (from >= p) {
							currentNode = currentNode.next;
							p += currentNode.value.length;
						}
						// adjust pos (and p)
						p -= currentNode.value.length;
						pos = p;

						// the current node is a Token, then the match starts inside another Token, which is invalid
						if (currentNode.value instanceof Token) {
							continue;
						}

						// find the last node which is affected by this match
						for (
							var k = currentNode;
							k !== tokenList.tail && (p < to || typeof k.value === 'string');
							k = k.next
						) {
							removeCount++;
							p += k.value.length;
						}
						removeCount--;

						// replace with the new match
						str = text.slice(pos, p);
						match.index -= pos;
					} else {
						match = matchPattern(pattern, 0, str, lookbehind);
						if (!match) {
							continue;
						}
					}

					// eslint-disable-next-line no-redeclare
					var from = match.index;
					var matchStr = match[0];
					var before = str.slice(0, from);
					var after = str.slice(from + matchStr.length);

					var reach = pos + str.length;
					if (rematch && reach > rematch.reach) {
						rematch.reach = reach;
					}

					var removeFrom = currentNode.prev;

					if (before) {
						removeFrom = addAfter(tokenList, removeFrom, before);
						pos += before.length;
					}

					removeRange(tokenList, removeFrom, removeCount);

					var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
					currentNode = addAfter(tokenList, removeFrom, wrapped);

					if (after) {
						addAfter(tokenList, currentNode, after);
					}

					if (removeCount > 1) {
						// at least one Token object was removed, so we have to do some rematching
						// this can only happen if the current pattern is greedy

						/** @type {RematchOptions} */
						var nestedRematch = {
							cause: token + ',' + j,
							reach: reach
						};
						matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

						// the reach might have been extended because of the rematching
						if (rematch && nestedRematch.reach > rematch.reach) {
							rematch.reach = nestedRematch.reach;
						}
					}
				}
			}
		}
	}

	/**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */

	/**
	 * @template T
	 * @private
	 */
	function LinkedList() {
		/** @type {LinkedListNode<T>} */
		var head = { value: null, prev: null, next: null };
		/** @type {LinkedListNode<T>} */
		var tail = { value: null, prev: head, next: null };
		head.next = tail;

		/** @type {LinkedListNode<T>} */
		this.head = head;
		/** @type {LinkedListNode<T>} */
		this.tail = tail;
		this.length = 0;
	}

	/**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */
	function addAfter(list, node, value) {
		// assumes that node != list.tail && values.length >= 0
		var next = node.next;

		var newNode = { value: value, prev: node, next: next };
		node.next = newNode;
		next.prev = newNode;
		list.length++;

		return newNode;
	}
	/**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */
	function removeRange(list, node, count) {
		var next = node.next;
		for (var i = 0; i < count && next !== list.tail; i++) {
			next = next.next;
		}
		node.next = next;
		next.prev = node;
		list.length -= i;
	}
	/**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */
	function toArray(list) {
		var array = [];
		var node = list.head.next;
		while (node !== list.tail) {
			array.push(node.value);
			node = node.next;
		}
		return array;
	}


	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _;
		}

		if (!_.disableWorkerMessageHandler) {
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data);
				var lang = message.language;
				var code = message.code;
				var immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);
		}

		return _;
	}

	// Get current script and highlight
	var script = _.util.currentScript();

	if (script) {
		_.filename = script.src;

		if (script.hasAttribute('data-manual')) {
			_.manual = true;
		}
	}

	function highlightAutomaticallyCallback() {
		if (!_.manual) {
			_.highlightAll();
		}
	}

	if (!_.manual) {
		// If the document state is "loading", then we'll use DOMContentLoaded.
		// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
		// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
		// might take longer one animation frame to execute which can create a race condition where only some plugins have
		// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
		// See https://github.com/PrismJS/prism/issues/2102
		var readyState = document.readyState;
		if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
			document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
		} else {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(highlightAutomaticallyCallback);
			} else {
				window.setTimeout(highlightAutomaticallyCallback, 16);
			}
		}
	}

	return _;

}(_self));

if ( true && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': /<!--[\s\S]*?-->/,
	'prolog': /<\?[\s\S]+?\?>/,
	'doctype': {
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: true,
		inside: {
			'internal-subset': {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: true,
				greedy: true,
				inside: null // see below
			},
			'string': {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: true
			},
			'punctuation': /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/,
			'name': /[^\s<>'"]+/
		}
	},
	'cdata': /<!\[CDATA\[[\s\S]*?\]\]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'special-attr': [],
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					'punctuation': [
						{
							pattern: /^=/,
							alias: 'attr-equals'
						},
						/"|'/
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': [
		{
			pattern: /&[\da-z]{1,8};/i,
			alias: 'named-entity'
		},
		/&#x?[\da-f]{1,8};/i
	]
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism.languages.insertBefore('markup', 'cdata', def);
	}
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
	/**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */
	value: function (attrName, lang) {
		Prism.languages.markup.tag.inside['special-attr'].push({
			pattern: RegExp(
				/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
				'i'
			),
			lookbehind: true,
			inside: {
				'attr-name': /^[^\s=]+/,
				'attr-value': {
					pattern: /=[\s\S]+/,
					inside: {
						'value': {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: true,
							alias: [lang, 'language-' + lang],
							inside: Prism.languages[lang]
						},
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							/"|'/
						]
					}
				}
			}
		});
	}
});

Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;


/* **********************************************
     Begin prism-css.js
********************************************** */

(function (Prism) {

	var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
			inside: {
				'rule': /^@[\w-]+/,
				'selector-function-argument': {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: true,
					alias: 'selector'
				},
				'keyword': {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true
				}
				// See rest below
			}
		},
		'url': {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
			greedy: true,
			inside: {
				'function': /^url/i,
				'punctuation': /^\(|\)$/,
				'string': {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url'
				}
			}
		},
		'selector': {
			pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
			lookbehind: true
		},
		'string': {
			pattern: string,
			greedy: true
		},
		'property': {
			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: true
		},
		'important': /!important\b/i,
		'function': {
			pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
			lookbehind: true
		},
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');
		markup.tag.addAttribute('style', 'css');
	}

}(Prism));


/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: true,
		inside: {
			'punctuation': /[.\\]/
		}
	},
	'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(?:true|false)\b/,
	'function': /\b\w+(?=\()/,
	'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		// eslint-disable-next-line regexp/no-dupe-characters-character-class
		pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
		lookbehind: true,
		greedy: true,
		inside: {
			'regex-source': {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism.languages.regex
			},
			'regex-delimiter': /^\/|\/$/,
			'regex-flags': /^[a-z]+$/,
		}
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'hashbang': {
		pattern: /^#!.*/,
		greedy: true,
		alias: 'comment'
	},
	'template-string': {
		pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
		greedy: true,
		inside: {
			'template-punctuation': {
				pattern: /^`|`$/,
				alias: 'string'
			},
			'interpolation': {
				pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.markup.tag.addInlined('script', 'javascript');

	// add attribute support for all DOM events.
	// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
	Prism.languages.markup.tag.addAttribute(
		/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
		'javascript'
	);
}

Prism.languages.js = Prism.languages.javascript;


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {

	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
		return;
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	var LOADING_MESSAGE = 'Loading…';
	var FAILURE_MESSAGE = function (status, message) {
		return '✖ Error ' + status + ' while fetching file: ' + message;
	};
	var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

	var EXTENSIONS = {
		'js': 'javascript',
		'py': 'python',
		'rb': 'ruby',
		'ps1': 'powershell',
		'psm1': 'powershell',
		'sh': 'bash',
		'bat': 'batch',
		'h': 'c',
		'tex': 'latex'
	};

	var STATUS_ATTR = 'data-src-status';
	var STATUS_LOADING = 'loading';
	var STATUS_LOADED = 'loaded';
	var STATUS_FAILED = 'failed';

	var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
		+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

	var lang = /\blang(?:uage)?-([\w-]+)\b/i;

	/**
	 * Sets the Prism `language-xxxx` or `lang-xxxx` class to the given language.
	 *
	 * @param {HTMLElement} element
	 * @param {string} language
	 * @returns {void}
	 */
	function setLanguageClass(element, language) {
		var className = element.className;
		className = className.replace(lang, ' ') + ' language-' + language;
		element.className = className.replace(/\s+/g, ' ').trim();
	}


	Prism.hooks.add('before-highlightall', function (env) {
		env.selector += ', ' + SELECTOR;
	});

	Prism.hooks.add('before-sanity-check', function (env) {
		var pre = /** @type {HTMLPreElement} */ (env.element);
		if (pre.matches(SELECTOR)) {
			env.code = ''; // fast-path the whole thing and go to complete

			pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

			// add code element with loading message
			var code = pre.appendChild(document.createElement('CODE'));
			code.textContent = LOADING_MESSAGE;

			var src = pre.getAttribute('data-src');

			var language = env.language;
			if (language === 'none') {
				// the language might be 'none' because there is no language set;
				// in this case, we want to use the extension as the language
				var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
				language = EXTENSIONS[extension] || extension;
			}

			// set language classes
			setLanguageClass(code, language);
			setLanguageClass(pre, language);

			// preload the language
			var autoloader = Prism.plugins.autoloader;
			if (autoloader) {
				autoloader.loadLanguages(language);
			}

			// load file
			var xhr = new XMLHttpRequest();
			xhr.open('GET', src, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status < 400 && xhr.responseText) {
						// mark as loaded
						pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

						// highlight code
						code.textContent = xhr.responseText;
						Prism.highlightElement(code);

					} else {
						// mark as failed
						pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

						if (xhr.status >= 400) {
							code.textContent = FAILURE_MESSAGE(xhr.status, xhr.statusText);
						} else {
							code.textContent = FAILURE_EMPTY_MESSAGE;
						}
					}
				}
			};
			xhr.send(null);
		}
	});

	Prism.plugins.fileHighlight = {
		/**
		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
		 *
		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
		 *
		 * @param {ParentNode} [container=document]
		 */
		highlight: function highlight(container) {
			var elements = (container || document).querySelectorAll(SELECTOR);

			for (var i = 0, element; (element = elements[i++]);) {
				Prism.highlightElement(element);
			}
		}
	};

	var logged = false;
	/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
	Prism.fileHighlight = function () {
		if (!logged) {
			console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
			logged = true;
		}
		Prism.plugins.fileHighlight.highlight.apply(this, arguments);
	};

}());

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src_editor/createSCORM/lessonToITags.ts":
/*!*************************************************!*\
  !*** ./src_editor/createSCORM/lessonToITags.ts ***!
  \*************************************************/
/*! exports provided: LessonToITags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LessonToITags", function() { return LessonToITags; });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);

const validTags = ['p', 'subtitle', 'section', 'br', 'code', 'asciimath', 'youtube',
    'title', 'module', 'lesson', 'shortdesc', 'break', 'drill', 'key', 'run'];
class LessonToITags {
    constructor() {
        this.assetsURI = '';
        this.inASpeechBlock = false;
        this.utterance = ''; // collect utterances, they all go into the FIRST block
        this.hasTitle = false;
        // need to initialize the utteranceTag, but we don't have the first utterance yet
        this.utteranceTag = this.iTagFactory('p', new Map(), '');
        this.unitTests(); // we ALWAYS run the unit tests
    }
    // convert a lesson into ready-to-insert HTML
    parse(assetsURI, lesson) {
        this.assetsURI = assetsURI;
        // console.log(lesson.slice(0, 100))
        // process lesson into a nice array of lines (actually paragraphs)
        let aLines = lesson.toString().split('\n');
        // strip out any "byte order mark" from start of lines
        // utf8:  0xEF,0xBB,0xBF.
        // utf16: U+FEFF
        // https://en.wikipedia.org/wiki/Byte_order_mark
        // Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
        // conversion translates it to FEFF (UTF-16 BOM)
        for (let i = 0; i < aLines.length; i++) {
            if (aLines[i].charCodeAt(0) === 0xFEFF) {
                aLines[i] = aLines[i].slice(1);
            }
        }
        //////////// show char values for debugging
        // for (let i = 0; i < 5; i++) {
        //     console.log('1', i, aLines[i])
        //     for (let j = 0; j < aLines[i].length; j++) {
        //         console.log(i, j, aLines[i].charCodeAt(j))
        //     }
        // }
        // replace ALL CRLF with ordinary newline \n
        // for (let i = 0; i < aLines.length; i++) {
        //     aLines[i] = aLines[i].replace(new RegExp(/\r/gm), '\n')
        // }
        // convert from text lines to ITags (maybe consolidating)
        let aTags = this.inputToParagraphs(aLines);
        // //////////// show aTags for debugging
        // for (let i = 0; i < 5; i++) {
        //     console.log('aTag', i, aTags)
        // }
        aTags = this.stripAndHideInnerTags(aTags);
        // preprocess tag array in place - this works because call-by-reference
        this.preProcessTagArray(aTags);
        return (aTags);
    }
    threeDigit(n) {
        return ('000' + n).slice(-3); // always a three-digit string-number 001, 002, etc
    }
    isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    // Returns if a value is really a number
    isNumber(value) {
        return typeof value === 'number' && isFinite(value);
    }
    processMarkdown(sTest) {
        // first alternate voice / speech
        sTest = this.processAlternateMarkdown(sTest, true); // keep first set
        sTest = this.processSingleMarkdown(sTest, / #.*#/, /[^\\]#/, ' <em>', '</em>'); // allow # with escape \#
        sTest = this.processSingleMarkdown(sTest, /\\#/, /#/, '#', '');
        sTest = this.processSingleMarkdown(sTest, /\^.*\^/, /\^/, '<b>', '</b>');
        sTest = this.processSingleMarkdown(sTest, /\`.*\`/, /\`/, '<t3d_code>', '</t3d_code>');
        sTest = sTest.trimRight(); // take off trailing blanks
        // some global substitutions  // use them carefully
        // sTest = sTest.replace(/^^2/g, '[<sup>2</sup>| squared ]')
        // first alternate voice / speech
        //    sTest = this.processAlternateMarkdown(sTest, true)  // keep first set
        // sTest = this.processSingleMarkdown(sTest, '_','_', '<em>', '</em>')
        //   sTest = this.processSingleMarkdown(sTest, '**','', '<b>', '</b>')
        //   sTest = this.processSingleMarkdown(sTest, '`','', '<span style="font-family:monospacefont-size:smaller">', '</span>')
        // trick, alternate is [text[]voice] and it's TWO different markdowns  [--[ and ]--]
        return (sTest);
    }
    eraseMarkdown(sTest) {
        // first alternate voice / speech
        sTest = this.processAlternateMarkdown(sTest, false); // keep second set
        // then the italics (ignore \_)
        sTest = this.processSingleMarkdown(sTest, /#*#/, /#/, '', '');
        sTest = this.processSingleMarkdown(sTest, /\`*\`/, /\`/, '', '');
        sTest = this.processSingleMarkdown(sTest, /\^.*\^/, /\^/, '', '');
        sTest = sTest.trimRight(); // take off trailing blanks
        // // substitution list to improve voices
        // let subs = [
        //     { from: 'JavaScript', to: '[JavaScript | JavvaScript]' },
        //     { from: '\`console.log()\`', to: '[\`console.log()\`|console dot log]' },
        // ]
        // for (let sub of subs) {
        //     while (true) {
        //         let n = sTest.indexOf(sub.from)
        //         if (n === -1) { break }
        //         sTest = sTest.slice(0, n) + sub.to + sTest.slice(n + sub.from.length)
        //     }
        // }
        return (sTest);
    }
    /** don't call this directly, it is shared by processMarkdown() and eraseMarkdown() */
    processSingleMarkdown(sTest, openRegex, closeRegex, openSub, closeSub) {
        let aMatch, aMatch2;
        while (true) {
            aMatch = sTest.match(openRegex);
            if (aMatch == null) {
                break;
            } // all done
            if (aMatch.index == undefined) {
                break;
            } // all done
            if (aMatch.input == undefined) {
                break;
            } // all done
            aMatch2 = sTest.slice(aMatch.index + 1).match(closeRegex);
            if (!aMatch2) {
                console.error(`Found open tag for ${openSub}, missing close tag on '${sTest} at ${sTest.slice(aMatch.index)}'`);
            }
            //     console.log("sMatch", sMatch)
            //     console.log("sMatch2", sMatch2)
            let part1 = aMatch.input.slice(0, aMatch.index);
            // @ts-ignore    // TODO
            console.assert(aMatch2[0] !== null, `Matching problem at ${sTest}`);
            // @ts-ignore    // TODO
            console.assert(aMatch2[0].length - 1 !== null, `Matching problem at ${sTest}`);
            // @ts-ignore    // TODO
            if (aMatch2.index == undefined) {
                break;
            } // all done
            // @ts-ignore    // TODO
            if (aMatch2.input == undefined) {
                break;
            } // all done
            // @ts-ignore    // TODO
            console.assert(aMatch2.index + aMatch2[0].length - 1 !== null, `Matching problem at ${sTest}`);
            // @ts-ignore    // TODO
            let part2 = aMatch2.input.slice(aMatch2[0].length - 1, aMatch2.index + aMatch2[0].length - 1);
            // @ts-ignore    // TODO
            console.assert(aMatch2.index + aMatch2[0].length !== null, `Matching problem at ${sTest}`);
            // @ts-ignore    // TODO
            let part3 = aMatch2.input.slice(aMatch2.index + aMatch2[0].length - 1 + 1);
            sTest = part1 + openSub + part2 + closeSub + part3;
            // console.log(`assemble "${part1}" + "${part2}" + "${part3}"`)
            // console.log(sTest)
        }
        return (sTest);
    }
    createWebURL(snippet) {
        // snippet does NOT have the open and close square brackets
        // 2-element: [print|voice]  
        // 3-element [print|voice|weburl]
        // strategy is to convert a 3-element to a 2-element
        //   [ seeFoo | sayFoo | http://foo.com ] becomes
        //    [<a target="_blank" href="http://foo.com"> seeFoo</a> | sayFoo]  
        let aSnippet = snippet.split('|');
        if (aSnippet.length == 3) { // there is a URL part
            // we don't use _blank because we probably don't want to open multiple windows
            snippet = `<a href='${aSnippet[2]}' target='gamecode'>${aSnippet[0].trimRight()}</a>|${aSnippet[1]}`;
        }
        return snippet;
    }
    /** don't call this directly, it is shared by processMarkdown() and eraseMarkdown() */
    processAlternateMarkdown(sTest, isKeepFirst) {
        // console.log(`function processAlternateMarkdown (${sTest}, ${isKeepFirst})`)
        let oldSTest = sTest;
        while (true) { // may have more than one
            let n = sTest.indexOf('[');
            if (n === -1) {
                break;
            }
            let p = sTest.indexOf(']', n + 1);
            if (p === -1) {
                console.error(`Missing end marker on ${sTest}, p=${p},remainder=${sTest.slice(p + 1)}`);
                throw ('stop');
            }
            // call createWebUrl.  if it is a two=part, then will not change. if a three-part, then 
            // will be converted to a two part
            let snippet = sTest.slice(n + 1, p);
            let fixedSnippet = this.createWebURL(snippet); // convert from 3-part to 2-part (if necessary)
            // and put it back into sTest 
            sTest = sTest.slice(0, n) + '[' + fixedSnippet + ']' + sTest.slice(p + 1);
            // console.log('fixedSnippet',fixedSnippet)
            // start again
            n = sTest.indexOf('[');
            if (n === -1) {
                break;
            }
            p = sTest.indexOf(']', n + 1);
            if (p === -1) {
                console.error(`Missing end marker on ${sTest}, p=${p},remainder=${sTest.slice(p + 1)}`);
            }
            let m = sTest.indexOf('|', n + 1);
            if (m === -1) {
                console.error(`Missing middle marker on ${sTest}, m=${m},remainder=${sTest.slice(m + 1)}`);
            }
            // console.log('part 1 ', sTest.slice(0, n))
            // console.log('part 2 ', sTest.slice(n + 1, m))
            // console.log('part 3 ', sTest.slice(m + 1, p))
            // console.log('part 4 ', sTest.slice(p + 1))
            if (isKeepFirst) { // keep the first part
                sTest = sTest.slice(0, n) + sTest.slice(n + 1, m) + sTest.slice(p + 1);
            }
            else { // keep the second part
                sTest = sTest.slice(0, n) + sTest.slice(m + 1, p) + sTest.slice(p + 1);
            }
        }
        return (sTest);
    }
    // ///////////////////////////////////////
    // ///////////////////////////////////////
    /** find tag-type and parameters  */
    inputToParagraphs(aLines) {
        // console.log('we have # lines ', aLines)
        let aTags = []; // this will be our result
        for (let sLine of aLines) { // weirdly, aLines is an Object of type Array.  JavaSscrpt types are awful.
            // console.log('sline ', sLine)
            /** match is from the first < at the start of line to the  next > */
            let match = sLine.match(new RegExp(/^<([a-z]|[A-Z]|[0-9]|\_|\(|\.|\=|\,|\))*>/)); // matchs <p>  and <h1>, etc
            let sTag = '';
            let sRemain = '';
            let aParams;
            // let bParams: object = {}         // not strict enuf for typescript
            let bParams = {};
            if (match) {
                // console.log('match', match[0].toString)
                sTag = match[0].toString();
                sTag = sTag.slice(1, sTag.length - 1); // take out the < and >
                sRemain = sLine.slice(sTag.length + 2); // if no params
                // clean up - look inside match for parameters
                let params = new RegExp(/\(([^)]+)\)/).exec(sTag);
                // console.log(`params of '${sTag}'`, params)
                if (params) {
                    // console.log('processing a parameter')
                    let sMatch = params[1].toString();
                    // console.log('params', sMatch, aParams)
                    sTag = sTag.slice(0, params.index); // patch the tag part
                    aParams = sMatch.split(','); // and turn into an array of params
                    // now convert to a map, expanding from 'xx' to 'xx:true' where necessary
                    aParams.map((element) => {
                        if (element == null) {
                            throw ('should never happen');
                        }
                        let rule = element.split('=');
                        if (rule.length === 1) { // no colon
                            bParams[element] = '';
                        }
                        else {
                            bParams[rule[0]] = rule[1];
                        }
                    });
                }
                // create a new object, add to aTags
                aTags.push(this.iTagFactory(sTag, bParams, sRemain));
            }
            else {
                // many reasons we might be here
                // we allow a BLANK line without a tag
                // we allow follow lines in code
                // here for continuation lines (without tags)
                // so patch the PREVIOUS aTag
                // just test that the first character isn't a '<'
                console.assert(sLine.slice(0, 1) !== '<', 'Looks like a bad tag:  ' + sLine);
                // console.log("aTags", aTags)
                // special case, this line didn't start with a tag, append to last aTag
                // console.log("here's the bad puppy:", sLine)
                // console.log('atags:', aTags)
                if (aTags.length === 0) {
                    console.error(`File must start with a tag, we got '${sLine}'`);
                }
                // console.log ("before",aTags[aTags.length-1].value, " plus", sLine)
                aTags[aTags.length - 1].rawvalue += '\n' + sLine;
                // console.log ("after",aTags[aTags.length-1].value)
            }
        }
        return (aTags);
    }
    /** convert internal HTML tags (not general, specific tags in specific ways)
     * DO NOT TRY TAG-WITHIN-TAG, this is not a recursive DOM-style parser
    */
    stripAndHideInnerTags(aTags) {
        let infiniteLoopGuard = 1000;
        // test every tag in the document, we bring in the whole file and traverse it
        aTags.forEach((o, i) => {
            // console.log('testing o.rawvalue',o.rawvalue)
            // process these specific tags
            let tags = ['a', 'b'];
            tags.forEach((tag) => {
                let regex = `<\s*${tag}[^>]*>(.*?)<\s*\/\s*${tag}>`;
                let matches;
                // process multiple tags on a single line
                while (matches = o.rawvalue.match(new RegExp(regex))) {
                    // IMPORTANT - must REMOVE the tag, or infinite loop
                    if (infiniteLoopGuard-- < 0) {
                        console.error(`stripAndHide: infinite loop testing tag '${tag}' against ${o.rawvalue}`);
                        break;
                    }
                    // o.rawvalue = before<a ref="someone">something</a>after 
                    // match[0] = "<a ref="someone">something</a>" 
                    // match[1] = "something"
                    // console.log('matches', matches)
                }
            });
        });
        return aTags;
    }
    // ///////////////////////////////////////
    /** parse the tag for voice/text, markdown, implicit params, etc */
    preProcessTagArray(aTags) {
        // TODO move this into a separate compile step, and make it more powerful
        aTags.forEach((o, i) => {
            // there may be multiple <p> tags in a speech block
            // console.log('preprocess', o)
            // we also close off speech block for <p(h1)> and reopen another
            if (this.inASpeechBlock &&
                (('h1' in aTags[i].params) ||
                    ('h2' in aTags[i].params) ||
                    ('h3' in aTags[i].params))) { // need to close off our prior speech block
                // if we aren't in a speech block, then this is the FIRST tag of a speech Icon
                this.utteranceTag = aTags[i]; // point at new tag
                this.utterance = ''; // and start a new speech
                aTags[i].params['SpeechIcon'] = 'true'; // push out a SpeechIcon on this tag
                this.inASpeechBlock = true;
            }
            if (!this.inASpeechBlock && aTags[i].tag === 'p') { // need to open our speech blocks
                // if we aren't in a speech block, then this is the FIRST tag of a speech Icon
                this.utteranceTag = aTags[i];
                aTags[i].params['SpeechIcon'] = 'true'; // push out a SpeechIcon on this tag
                this.inASpeechBlock = true;
            }
            if (this.inASpeechBlock && aTags[i].tag !== 'p') { // need to close off our speech block
                this.utteranceTag.speechvalue = this.utterance;
                this.utterance = '';
                this.inASpeechBlock = false;
                // watch out - fix up at the bottom of the for loop too
            }
            switch (aTags[i].tag) {
                case 'br':
                case 'break':
                case 'drill':
                case 'key':
                case 'run':
                    break;
                case 'module':
                    aTags[i].textvalue = this.processMarkdown(aTags[i].rawvalue);
                    this.hasTitle = true;
                    break;
                case 'lesson':
                    aTags[i].textvalue = this.processMarkdown(aTags[i].rawvalue);
                    this.hasTitle = true;
                    break;
                case 'shortdesc':
                    aTags[i].textvalue = this.processMarkdown(aTags[i].rawvalue);
                    break;
                case 'section': // can put bold and keys in these fields
                    aTags[i].textvalue = this.processMarkdown(aTags[i].rawvalue);
                    break;
                case 'title':
                case 'subtitle':
                case 'asciimath':
                case 'youtube':
                    aTags[i].textvalue = aTags[i].rawvalue; // don't try to process markdown
                    break;
                case 'code':
                    // make sure there is an 'lines' parameter
                    if ('lines' in o.params) {
                        let nLines = o.rawvalue.split('\n').length + 1; // default to # of lines in code, plus 1 
                        nLines = Math.min(nLines, 8); // to maximum of 8 lines
                        aTags[i].params['lines'] = nLines.toString();
                    }
                    break;
                case 'p':
                    // processMarkdown(s)  adds <em> and <b>, and some standard voice substitutions
                    // eraseMarkdown(s)    gets rid of markdowns, leaving text intact
                    // processAlternateMarkdown(s, isKeepFirst)  looks for [a|b] returns first or second
                    aTags[i].textvalue = this.processMarkdown(aTags[i].rawvalue); // nice HTML
                    // add a pause to each sentence, makes it more human.
                    this.utterance += ' ' + this.eraseMarkdown(aTags[i].rawvalue) + " . "; // clean speech
                    if (this.utterance.length > 0) {
                        // only single-quotes allowed in utter
                        this.utterance = this.utterance.replace(/"/g, '\\"'); // escape out double-quotes
                    }
                    // maybe an image to the right
                    if ('img' in o.params) {
                        //TODO: 01 is hardcoded, need to change to lesson#
                        aTags[i].url = 'assets/' + '01/' + o.params['img']; // TODO - check that this image exists
                        break;
                    }
                    // maybe a video to the right
                    if ('video' in o.params) {
                        //TODO: 01 is hardcoded, need to change to lesson#
                        aTags[i].url = 'assets/' + '01/' + o.params['video']; // TODO - check that this image exists
                        break;
                    }
                    break;
                // case '<quote>':
                //     HTML += `<blockquote class="blockquote" style="margin-bottom:0pxpadding-bottom:0px">${i.value}</blockquote>\n`
                //     break
                // case '<citation>':
                //     HTML += `<cite><footer class="blockquote-footer" style="text-indent:100pxmargin-bottom:30px">${i.value}</footer></cite>\n`
                //     break
                // case '<pre>':
                //     HTML += `<pre>${i.value}</pre>\n`
                //     break
                // case '<youtube>':
                //     HTML += `<iframe width="480" height="270" align="right"
                //                src="https://www.youtube.com/embed/${i.value}?rel=0&ampcontrols=0" frameborder="0"
                //                allow="autoplay encrypted-media" allowfullscreen></iframe>\n`
                //     break
                default:
                    console.error('Should never get here on, ' + JSON.stringify(aTags[i]));
            }
            // all done.  just close off
            if (this.inASpeechBlock) { // maybe need to close off our last speech block
                this.utteranceTag.speechvalue = this.utterance;
            }
        });
    }
    pad(n) {
        return (n < 10 ? '0' : '') + n;
    }
    iTagFactory(newtag, aParams, remainder) {
        // verify that tag is 'legal'
        let LCtag = newtag.toLowerCase();
        let x = validTags.find((element) => element === LCtag);
        console.assert(x === LCtag, `LessonToHTML.iTagFactory not legal tag: `, 'illegal tag ', newtag);
        let ret = {
            tag: LCtag,
            params: aParams,
            rawvalue: remainder.trim(),
            textvalue: "",
            speechvalue: "",
            url: "",
            innerTags: []
        };
        return (ret);
    }
    // ////////////////////////////////////
    // //////////   tests
    // ////////////////////////////////////
    unitTests() {
        console.log('Starting unit tests...');
        // TODO put testing conditions on this
        // check out iTagFactory
        let iTag = this.iTagFactory('p', new Map(), '');
        // console.log('test iTagFactory', iTag)
        // regex
        let rTests = [
            { test: new RegExp(/abc/), target: 'abcde', result: 'abc' },
            { test: new RegExp(/^abc/), target: 'abcde', result: 'abc' },
            { test: new RegExp(/^[a-z]*/), target: 'abc99', result: 'abc' },
            { test: new RegExp(/^<[a-z]+>/), target: '<p>stuff', result: '<p>' },
            { test: new RegExp(/^<([a-z]|[0-9]|\(|\))*>/), target: '<p1>stuff', result: '<p1>' },
            { test: new RegExp(/^<([a-z]|[0-9]|\(|\))*>/), target: '<p1(p2)>stuff', result: '<p1(p2)>' },
            { test: new RegExp(/\(([^)]+)\)/), target: '<p1(param)>stuff', result: '(param)' },
        ];
        //TODO figure how to get this past typescript
        // for (let oT of rTests) {
        //     // console.log('test: ', oT)
        //     // console.log('result: ', oT.test.exec(oT.target))
        //     console.assert(oT.test.exec(oT.target)[0] === oT.result,
        //         oT.test + ' ' + oT.target + ' ' + oT.result + ' ' + oT.test.exec(oT.target))
        // }
        // inputToParagraphs()
        let aLines = ['<p>testParagraph'];
        let aTags = this.inputToParagraphs(aLines);
        console.assert(aTags.length === 1, 'Expected array of one object');
        console.assert(aTags[0].tag === 'p', 'Expected tag to be "<p>" and got "' + aTags[0].tag + '"');
        console.assert(aTags[0].rawvalue === 'testParagraph', `Expected string to be 'testParagraph' and got '${aTags[0].textvalue}'`);
        aLines = ['<p>testParagraph', ' and more'];
        aTags = this.inputToParagraphs(aLines);
        console.assert(aTags.length === 1, 'Expected array of one object');
        console.assert(aTags[0].tag === 'p', 'Expected tag to be "<p>" and got "' + aTags[0].tag + '"');
        console.assert(aTags[0].rawvalue === 'testParagraph\n and more', JSON.stringify(aTags[0].textvalue));
        aLines = ['<p(p1)>testParagraph'];
        aTags = this.inputToParagraphs(aLines);
        console.assert(aTags.length === 1, 'Expected array of one object');
        console.assert(aTags[0].tag === 'p', 'Expected tag to be "<p>" and got "' + aTags[0].tag + '"');
        console.assert(typeof aTags[0].params === 'object', 'Expected the params to be a Map object');
        console.assert(aTags[0].params['p1'] === '', 'Expected params to be "p1=" and got ' + JSON.stringify(aTags[0].params));
        console.assert(aTags[0].rawvalue === 'testParagraph', 'test paragraph fails ' + JSON.stringify(aTags[0].textvalue));
        aLines = ['<p(p1=4)>testParagraph'];
        aTags = this.inputToParagraphs(aLines);
        console.assert(aTags.length === 1, 'Expected array of one object');
        console.assert(aTags[0].tag === 'p', 'Expected tag to be "<p>" and got "' + aTags[0].tag + '"');
        console.assert(typeof aTags[0].params === 'object', 'Expected the params to be a Map object');
        console.assert(aTags[0].params['p1'] === '4', 'Expected params to be ["p1=4"] and got ' + JSON.stringify(aTags[0].params['p1']));
        console.assert(aTags[0].rawvalue === 'testParagraph', 'test paragraph fails ' + JSON.stringify(aTags[0].textvalue));
        aLines = ['<p(p1=4,p2=five)>testParagraph'];
        aTags = this.inputToParagraphs(aLines);
        console.assert(aTags.length === 1, 'Expected array of one object');
        console.assert(aTags[0].tag === 'p', 'Expected tag to be "<p>" and got "' + aTags[0].tag + '"');
        console.assert(typeof aTags[0].params === 'object', 'Expected the params to be a Map object');
        console.assert(aTags[0].params['p1'] === '4', 'Expected param p1 to be ["p1=4"] and got ' + JSON.stringify(aTags[0].params['p1']));
        console.assert(aTags[0].params['p2'] === 'five', 'Expected p2 to be ["p2=five"] and got ' + JSON.stringify(aTags[0].params['p2']));
        console.assert(aTags[0].rawvalue === 'testParagraph', JSON.stringify(aTags[0].textvalue));
        aLines = ['<p(p1)>testParagraph', ' and more'];
        aTags = this.inputToParagraphs(aLines);
        console.assert(aTags.length === 1, 'Expected array of one object');
        console.assert(aTags[0].tag === 'p', 'Expected tag to be "<p>" and got "' + aTags[0].tag + '"');
        console.assert(typeof aTags[0].params === 'object', 'Expected the params to be a Map object');
        console.assert(aTags[0].params['p1'] === '', 'Expected params to be ["p1"] and got ' + JSON.stringify(aTags[0].params));
        console.assert(aTags[0].rawvalue === 'testParagraph\n and more', JSON.stringify(aTags[0].textvalue));
        // one day, if we need it, we can add   <p(p1,p2)>text
        // processMarkdown()
        let rTests2 = [
            { test: 'this #value# is', result: 'this <em>value</em> is' },
            { test: 'this #value# is #great#', result: 'this <em>value</em> is <em>great</em>' },
            // doesn't work, don't know why, come back to this later
            // { test: 'this _value_ is *great*', result: 'this <em>value</em> is <b>great</b>' },
            { test: 'this `value` is #great#', result: 'this <t3d_code>value</t3d_code> is <em>great</em>' },
        ];
        for (let sTest of rTests2) {
            let result2 = this.processMarkdown(sTest.test);
            console.assert(result2 === sTest.result, `From '${sTest.test}' we expected '${sTest.result}' but got '${result2}'`);
        }
        // eraseMarkdown()
        let rTests3 = [
            { test: 'this #value# is', result: 'this value is' },
            { test: 'this #value# is #great#', result: 'this value is great' },
            { test: '[tomato|tomawto]', result: 'tomawto' },
        ];
        rTests3.forEach((i) => {
            let result3 = this.eraseMarkdown(i.test);
            console.assert(result3 === i.result, `From '${i.test}' we expected '${i.result}' but got '${result3}'`);
        });
        // processAlternateMarkdown (sTest, marker, isKeep)
        let rTests4 = [
            { test: 'this[?|,] value', resultKeep: 'this? value', resultDisc: 'this, value' },
        ];
        for (let sTest of rTests4) {
            let resultKeep = this.processAlternateMarkdown(sTest.test, true);
            let resultDisc = this.processAlternateMarkdown(sTest.test, false);
            console.assert(resultKeep === sTest.resultKeep, `From '${sTest.test}' we expected '${sTest.resultKeep}' but got '${resultKeep}}'`);
            console.assert(resultDisc === sTest.resultDisc, `From '${sTest.test}' we expected '${sTest.resultDisc}' but got '${resultDisc}'`);
        }
        //         // TODO put testing conditions on this
        //         let test = `<title>Hello World\n
        // <p>I'm alive\n
        // let result = this.parse('', test)
        // // console.log(result)
        this.unittests2();
    }
    unittests2() {
        let test;
        let rslt;
        let assets = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '../assets');
        const validTags = [
            'p',
            'subtitle',
            'section',
            'br',
            'code',
            'title',
            'module',
            'lesson',
            'shortdesc',
            'break',
            'drill',
            'cm',
            'key',
            'run'
        ];
        // <module>
        // test = '<module> 01-Beginner Javascript'
        // rslt = this.parse(assets, test)
        // console.log(rslt)
        // // <p>
        // test = '<p(img=radius.jpg)>The image on the right'
        // rslt = this.parse(assets, test)
        // console.log(rslt)
        // test = '<p> [<a href="https://www.google.com/chrome">https://www.google.com/chrome</a>|w w w dot google dot com]'
        // rslt = this.parse(assets, test)
        // console.log(rslt)
        //         test = `<p> [tomato|tomawto]
        // <p> [first|second]`
        //         rslt = this.parse(assets, test)
        //         console.log(rslt)
        //         test = '<p(p1)>testParagraph'
        //         rslt = this.parse(assets, test)
        //         console.log(rslt)
    }
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./src_editor/runtime/ASCIIMathML.ts":
/*!*******************************************!*\
  !*** ./src_editor/runtime/ASCIIMathML.ts ***!
  \*******************************************/
/*! exports provided: testAsciiMath, asciiMath, AsciiMath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testAsciiMath", function() { return testAsciiMath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asciiMath", function() { return asciiMath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsciiMath", function() { return AsciiMath; });
function testAsciiMath() {
    let eqn = 'sum_(i=1)^n i^3=((n(n+1))/2)^2';
    let a = asciiMath(eqn);
    let main = document.getElementById('testmath');
    if (main !== null)
        main.appendChild(a);
    eqn = ' [[a,b,|,c],[d,e,|,f]]';
    a = asciiMath(eqn);
    main = document.getElementById('testmath');
    if (main !== null)
        main.appendChild(a);
}
function asciiMath(str) {
    let asciiMath = new AsciiMath();
    return asciiMath.parseMath(str, false);
}
/*
ASCIIMathML.js
==============
This file contains JavaScript functions to convert ASCII math notation
and (some) LaTeX to Presentation MathML. The conversion is done while the
HTML page loads, and should work with Firefox and other browsers that can
render MathML.

Just add the next line to your HTML page with this file in the same folder:

<script type="text/javascript" src="ASCIIMathML.js"></script>

Version 2.2 Mar 3, 2014.
Latest version at https://github.com/mathjax/asciimathml
If you use it on a webpage, please send the URL to jipsen@chapman.edu

Copyright (c) 2014 Peter Jipsen and other ASCIIMathML.js contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
var mathcolor = "blue"; // change it to "" (to inherit) or another color
var mathfontsize = "1em"; // change to e.g. 1.2em for larger math
var mathfontfamily = "serif"; // change to "" to inherit (works in IE)
// or another family (e.g. "arial")
var automathrecognize = false; // writing "amath" on page makes this true
var checkForMathML = true; // check if browser can display MathML
var notifyIfNoMathML = true; // display note at top if no MathML capability
var alertIfNoMathML = false; // show alert box if no MathML capability
var translateOnLoad = true; // set to false to do call translators from js
var translateASCIIMath = true; // false to preserve `..`
var displaystyle = true; // puts limits above and below large operators
var showasciiformulaonhover = true; // helps students learn ASCIIMath
var decimalsign = "."; // if "," then when writing lists or matrices put
//a space after the "," like `(1, 2)` not `(1,2)`
var AMdelimiter1 = "`", AMescape1 = "\\\\`"; // can use other characters
var AMdocumentId = "wikitext"; // PmWiki element containing math (default=body)
var fixphi = true; //false to return to legacy phi/varphi mapping
// character lists for Mozilla/Netscape fonts
var AMcal = ["\uD835\uDC9C", "\u212C", "\uD835\uDC9E", "\uD835\uDC9F", "\u2130", "\u2131", "\uD835\uDCA2", "\u210B", "\u2110", "\uD835\uDCA5", "\uD835\uDCA6", "\u2112", "\u2133", "\uD835\uDCA9", "\uD835\uDCAA", "\uD835\uDCAB", "\uD835\uDCAC", "\u211B", "\uD835\uDCAE", "\uD835\uDCAF", "\uD835\uDCB0", "\uD835\uDCB1", "\uD835\uDCB2", "\uD835\uDCB3", "\uD835\uDCB4", "\uD835\uDCB5", "\uD835\uDCB6", "\uD835\uDCB7", "\uD835\uDCB8", "\uD835\uDCB9", "\u212F", "\uD835\uDCBB", "\u210A", "\uD835\uDCBD", "\uD835\uDCBE", "\uD835\uDCBF", "\uD835\uDCC0", "\uD835\uDCC1", "\uD835\uDCC2", "\uD835\uDCC3", "\u2134", "\uD835\uDCC5", "\uD835\uDCC6", "\uD835\uDCC7", "\uD835\uDCC8", "\uD835\uDCC9", "\uD835\uDCCA", "\uD835\uDCCB", "\uD835\uDCCC", "\uD835\uDCCD", "\uD835\uDCCE", "\uD835\uDCCF"];
var AMfrk = ["\uD835\uDD04", "\uD835\uDD05", "\u212D", "\uD835\uDD07", "\uD835\uDD08", "\uD835\uDD09", "\uD835\uDD0A", "\u210C", "\u2111", "\uD835\uDD0D", "\uD835\uDD0E", "\uD835\uDD0F", "\uD835\uDD10", "\uD835\uDD11", "\uD835\uDD12", "\uD835\uDD13", "\uD835\uDD14", "\u211C", "\uD835\uDD16", "\uD835\uDD17", "\uD835\uDD18", "\uD835\uDD19", "\uD835\uDD1A", "\uD835\uDD1B", "\uD835\uDD1C", "\u2128", "\uD835\uDD1E", "\uD835\uDD1F", "\uD835\uDD20", "\uD835\uDD21", "\uD835\uDD22", "\uD835\uDD23", "\uD835\uDD24", "\uD835\uDD25", "\uD835\uDD26", "\uD835\uDD27", "\uD835\uDD28", "\uD835\uDD29", "\uD835\uDD2A", "\uD835\uDD2B", "\uD835\uDD2C", "\uD835\uDD2D", "\uD835\uDD2E", "\uD835\uDD2F", "\uD835\uDD30", "\uD835\uDD31", "\uD835\uDD32", "\uD835\uDD33", "\uD835\uDD34", "\uD835\uDD35", "\uD835\uDD36", "\uD835\uDD37"];
var AMbbb = ["\uD835\uDD38", "\uD835\uDD39", "\u2102", "\uD835\uDD3B", "\uD835\uDD3C", "\uD835\uDD3D", "\uD835\uDD3E", "\u210D", "\uD835\uDD40", "\uD835\uDD41", "\uD835\uDD42", "\uD835\uDD43", "\uD835\uDD44", "\u2115", "\uD835\uDD46", "\u2119", "\u211A", "\u211D", "\uD835\uDD4A", "\uD835\uDD4B", "\uD835\uDD4C", "\uD835\uDD4D", "\uD835\uDD4E", "\uD835\uDD4F", "\uD835\uDD50", "\u2124", "\uD835\uDD52", "\uD835\uDD53", "\uD835\uDD54", "\uD835\uDD55", "\uD835\uDD56", "\uD835\uDD57", "\uD835\uDD58", "\uD835\uDD59", "\uD835\uDD5A", "\uD835\uDD5B", "\uD835\uDD5C", "\uD835\uDD5D", "\uD835\uDD5E", "\uD835\uDD5F", "\uD835\uDD60", "\uD835\uDD61", "\uD835\uDD62", "\uD835\uDD63", "\uD835\uDD64", "\uD835\uDD65", "\uD835\uDD66", "\uD835\uDD67", "\uD835\uDD68", "\uD835\uDD69", "\uD835\uDD6A", "\uD835\uDD6B"];
/*var AMcal = [0xEF35,0x212C,0xEF36,0xEF37,0x2130,0x2131,0xEF38,0x210B,0x2110,0xEF39,0xEF3A,0x2112,0x2133,0xEF3B,0xEF3C,0xEF3D,0xEF3E,0x211B,0xEF3F,0xEF40,0xEF41,0xEF42,0xEF43,0xEF44,0xEF45,0xEF46];
var AMfrk = [0xEF5D,0xEF5E,0x212D,0xEF5F,0xEF60,0xEF61,0xEF62,0x210C,0x2111,0xEF63,0xEF64,0xEF65,0xEF66,0xEF67,0xEF68,0xEF69,0xEF6A,0x211C,0xEF6B,0xEF6C,0xEF6D,0xEF6E,0xEF6F,0xEF70,0xEF71,0x2128];
var AMbbb = [0xEF8C,0xEF8D,0x2102,0xEF8E,0xEF8F,0xEF90,0xEF91,0x210D,0xEF92,0xEF93,0xEF94,0xEF95,0xEF96,0x2115,0xEF97,0x2119,0x211A,0x211D,0xEF98,0xEF99,0xEF9A,0xEF9B,0xEF9C,0xEF9D,0xEF9E,0x2124];*/
var CONST = 0, UNARY = 1, BINARY = 2, INFIX = 3, LEFTBRACKET = 4, RIGHTBRACKET = 5, SPACE = 6, UNDEROVER = 7, DEFINITION = 8, LEFTRIGHT = 9, TEXT = 10, BIG = 11, LONG = 12, STRETCHY = 13, MATRIX = 14, UNARYUNDEROVER = 15; // token types
var AMquote = { input: "\"", tag: "mtext", output: "mbox", tex: null, ttype: TEXT };
var AMsymbols = [
    //some greek symbols
    { input: "alpha", tag: "mi", output: "\u03B1", tex: null, ttype: CONST },
    { input: "beta", tag: "mi", output: "\u03B2", tex: null, ttype: CONST },
    { input: "chi", tag: "mi", output: "\u03C7", tex: null, ttype: CONST },
    { input: "delta", tag: "mi", output: "\u03B4", tex: null, ttype: CONST },
    { input: "Delta", tag: "mo", output: "\u0394", tex: null, ttype: CONST },
    { input: "epsi", tag: "mi", output: "\u03B5", tex: "epsilon", ttype: CONST },
    { input: "varepsilon", tag: "mi", output: "\u025B", tex: null, ttype: CONST },
    { input: "eta", tag: "mi", output: "\u03B7", tex: null, ttype: CONST },
    { input: "gamma", tag: "mi", output: "\u03B3", tex: null, ttype: CONST },
    { input: "Gamma", tag: "mo", output: "\u0393", tex: null, ttype: CONST },
    { input: "iota", tag: "mi", output: "\u03B9", tex: null, ttype: CONST },
    { input: "kappa", tag: "mi", output: "\u03BA", tex: null, ttype: CONST },
    { input: "lambda", tag: "mi", output: "\u03BB", tex: null, ttype: CONST },
    { input: "Lambda", tag: "mo", output: "\u039B", tex: null, ttype: CONST },
    { input: "lamda", tag: "mi", output: "\u03BB", tex: null, ttype: CONST },
    { input: "Lamda", tag: "mo", output: "\u039B", tex: null, ttype: CONST },
    { input: "mu", tag: "mi", output: "\u03BC", tex: null, ttype: CONST },
    { input: "nu", tag: "mi", output: "\u03BD", tex: null, ttype: CONST },
    { input: "omega", tag: "mi", output: "\u03C9", tex: null, ttype: CONST },
    { input: "Omega", tag: "mo", output: "\u03A9", tex: null, ttype: CONST },
    { input: "phi", tag: "mi", output: fixphi ? "\u03D5" : "\u03C6", tex: null, ttype: CONST },
    { input: "varphi", tag: "mi", output: fixphi ? "\u03C6" : "\u03D5", tex: null, ttype: CONST },
    { input: "Phi", tag: "mo", output: "\u03A6", tex: null, ttype: CONST },
    { input: "pi", tag: "mi", output: "\u03C0", tex: null, ttype: CONST },
    { input: "Pi", tag: "mo", output: "\u03A0", tex: null, ttype: CONST },
    { input: "psi", tag: "mi", output: "\u03C8", tex: null, ttype: CONST },
    { input: "Psi", tag: "mi", output: "\u03A8", tex: null, ttype: CONST },
    { input: "rho", tag: "mi", output: "\u03C1", tex: null, ttype: CONST },
    { input: "sigma", tag: "mi", output: "\u03C3", tex: null, ttype: CONST },
    { input: "Sigma", tag: "mo", output: "\u03A3", tex: null, ttype: CONST },
    { input: "tau", tag: "mi", output: "\u03C4", tex: null, ttype: CONST },
    { input: "theta", tag: "mi", output: "\u03B8", tex: null, ttype: CONST },
    { input: "vartheta", tag: "mi", output: "\u03D1", tex: null, ttype: CONST },
    { input: "Theta", tag: "mo", output: "\u0398", tex: null, ttype: CONST },
    { input: "upsilon", tag: "mi", output: "\u03C5", tex: null, ttype: CONST },
    { input: "xi", tag: "mi", output: "\u03BE", tex: null, ttype: CONST },
    { input: "Xi", tag: "mo", output: "\u039E", tex: null, ttype: CONST },
    { input: "zeta", tag: "mi", output: "\u03B6", tex: null, ttype: CONST },
    //binary operation symbols
    //{input:"-",  tag:"mo", output:"\u0096", tex:null, ttype:CONST},
    { input: "*", tag: "mo", output: "\u22C5", tex: "cdot", ttype: CONST },
    { input: "**", tag: "mo", output: "\u2217", tex: "ast", ttype: CONST },
    { input: "***", tag: "mo", output: "\u22C6", tex: "star", ttype: CONST },
    { input: "//", tag: "mo", output: "/", tex: null, ttype: CONST },
    { input: "\\\\", tag: "mo", output: "\\", tex: "backslash", ttype: CONST },
    { input: "setminus", tag: "mo", output: "\\", tex: null, ttype: CONST },
    { input: "xx", tag: "mo", output: "\u00D7", tex: "times", ttype: CONST },
    { input: "|><", tag: "mo", output: "\u22C9", tex: "ltimes", ttype: CONST },
    { input: "><|", tag: "mo", output: "\u22CA", tex: "rtimes", ttype: CONST },
    { input: "|><|", tag: "mo", output: "\u22C8", tex: "bowtie", ttype: CONST },
    { input: "-:", tag: "mo", output: "\u00F7", tex: "div", ttype: CONST },
    { input: "divide", tag: "mo", output: "-:", tex: null, ttype: DEFINITION },
    { input: "@", tag: "mo", output: "\u2218", tex: "circ", ttype: CONST },
    { input: "o+", tag: "mo", output: "\u2295", tex: "oplus", ttype: CONST },
    { input: "ox", tag: "mo", output: "\u2297", tex: "otimes", ttype: CONST },
    { input: "o.", tag: "mo", output: "\u2299", /*amparsei*/ tex: "odot", ttype: CONST },
    { input: "sum", tag: "mo", output: "\u2211", tex: null, ttype: UNDEROVER },
    { input: "prod", tag: "mo", output: "\u220F", tex: null, ttype: UNDEROVER },
    { input: "^^", tag: "mo", output: "\u2227", tex: "wedge", ttype: CONST },
    { input: "^^^", tag: "mo", output: "\u22C0", tex: "bigwedge", ttype: UNDEROVER },
    { input: "vv", tag: "mo", output: "\u2228", tex: "vee", ttype: CONST },
    { input: "vvv", tag: "mo", output: "\u22C1", tex: "bigvee", ttype: UNDEROVER },
    { input: "nn", tag: "mo", output: "\u2229", tex: "cap", ttype: CONST },
    { input: "nnn", tag: "mo", output: "\u22C2", tex: "bigcap", ttype: UNDEROVER },
    { input: "uu", tag: "mo", output: "\u222A", tex: "cup", ttype: CONST },
    { input: "uuu", tag: "mo", output: "\u22C3", tex: "bigcup", ttype: UNDEROVER },
    //binary relation symbols
    { input: "!=", tag: "mo", output: "\u2260", tex: "ne", ttype: CONST },
    { input: ":=", tag: "mo", output: ":=", tex: null, ttype: CONST },
    { input: "lt", tag: "mo", output: "<", tex: null, ttype: CONST },
    { input: "<=", tag: "mo", output: "\u2264", tex: "le", ttype: CONST },
    { input: "lt=", tag: "mo", output: "\u2264", tex: "leq", ttype: CONST },
    { input: "gt", tag: "mo", output: ">", tex: null, ttype: CONST },
    { input: "mlt", tag: "mo", output: "\u226A", tex: "ll", ttype: CONST },
    { input: ">=", tag: "mo", output: "\u2265", tex: "ge", ttype: CONST },
    { input: "gt=", tag: "mo", output: "\u2265", tex: "geq", ttype: CONST },
    { input: "mgt", tag: "mo", output: "\u226B", tex: "gg", ttype: CONST },
    { input: "-<", tag: "mo", output: "\u227A", tex: "prec", ttype: CONST },
    { input: "-lt", tag: "mo", output: "\u227A", tex: null, ttype: CONST },
    { input: ">-", tag: "mo", output: "\u227B", tex: "succ", ttype: CONST },
    { input: "-<=", tag: "mo", output: "\u2AAF", tex: "preceq", ttype: CONST },
    { input: ">-=", tag: "mo", output: "\u2AB0", tex: "succeq", ttype: CONST },
    { input: "in", tag: "mo", output: "\u2208", tex: null, ttype: CONST },
    { input: "!in", tag: "mo", output: "\u2209", tex: "notin", ttype: CONST },
    { input: "sub", tag: "mo", output: "\u2282", tex: "subset", ttype: CONST },
    { input: "sup", tag: "mo", output: "\u2283", tex: "supset", ttype: CONST },
    { input: "sube", tag: "mo", output: "\u2286", tex: "subseteq", ttype: CONST },
    { input: "supe", tag: "mo", output: "\u2287", tex: "supseteq", ttype: CONST },
    { input: "-=", tag: "mo", output: "\u2261", tex: "equiv", ttype: CONST },
    { input: "~=", tag: "mo", output: "\u2245", tex: "cong", ttype: CONST },
    { input: "~~", tag: "mo", output: "\u2248", tex: "approx", ttype: CONST },
    { input: "~", tag: "mo", output: "\u223C", tex: "sim", ttype: CONST },
    { input: "prop", tag: "mo", output: "\u221D", tex: "propto", ttype: CONST },
    //logical symbols
    { input: "and", tag: "mtext", output: "and", tex: null, ttype: SPACE },
    { input: "or", tag: "mtext", output: "or", tex: null, ttype: SPACE },
    { input: "not", tag: "mo", output: "\u00AC", tex: "neg", ttype: CONST },
    { input: "=>", tag: "mo", output: "\u21D2", tex: "implies", ttype: CONST },
    { input: "if", tag: "mo", output: "if", tex: null, ttype: SPACE },
    { input: "<=>", tag: "mo", output: "\u21D4", tex: "iff", ttype: CONST },
    { input: "AA", tag: "mo", output: "\u2200", tex: "forall", ttype: CONST },
    { input: "EE", tag: "mo", output: "\u2203", tex: "exists", ttype: CONST },
    { input: "_|_", tag: "mo", output: "\u22A5", tex: "bot", ttype: CONST },
    { input: "TT", tag: "mo", output: "\u22A4", tex: "top", ttype: CONST },
    { input: "|--", tag: "mo", output: "\u22A2", tex: "vdash", ttype: CONST },
    { input: "|==", tag: "mo", output: "\u22A8", tex: "models", ttype: CONST },
    //grouping brackets
    { input: "(", tag: "mo", output: "(", tex: "left(", ttype: LEFTBRACKET },
    { input: ")", tag: "mo", output: ")", tex: "right)", ttype: RIGHTBRACKET },
    { input: "[", tag: "mo", output: "[", tex: "left[", ttype: LEFTBRACKET },
    { input: "]", tag: "mo", output: "]", tex: "right]", ttype: RIGHTBRACKET },
    { input: "{", tag: "mo", output: "{", tex: null, ttype: LEFTBRACKET },
    { input: "}", tag: "mo", output: "}", tex: null, ttype: RIGHTBRACKET },
    { input: "|", tag: "mo", output: "|", tex: null, ttype: LEFTRIGHT },
    { input: ":|:", tag: "mo", output: "|", tex: null, ttype: CONST },
    { input: "|:", tag: "mo", output: "|", tex: null, ttype: LEFTBRACKET },
    { input: ":|", tag: "mo", output: "|", tex: null, ttype: RIGHTBRACKET },
    //{input:"||", tag:"mo", output:"||", tex:null, ttype:LEFTRIGHT},
    { input: "(:", tag: "mo", output: "\u2329", tex: "langle", ttype: LEFTBRACKET },
    { input: ":)", tag: "mo", output: "\u232A", tex: "rangle", ttype: RIGHTBRACKET },
    { input: "<<", tag: "mo", output: "\u2329", tex: null, ttype: LEFTBRACKET },
    { input: ">>", tag: "mo", output: "\u232A", tex: null, ttype: RIGHTBRACKET },
    { input: "{:", tag: "mo", output: "{:", tex: null, ttype: LEFTBRACKET, invisible: true },
    { input: ":}", tag: "mo", output: ":}", tex: null, ttype: RIGHTBRACKET, invisible: true },
    //miscellaneous symbols
    { input: "int", tag: "mo", output: "\u222B", tex: null, ttype: CONST },
    { input: "dx", tag: "mi", output: "{:d x:}", tex: null, ttype: DEFINITION },
    { input: "dy", tag: "mi", output: "{:d y:}", tex: null, ttype: DEFINITION },
    { input: "dz", tag: "mi", output: "{:d z:}", tex: null, ttype: DEFINITION },
    { input: "dt", tag: "mi", output: "{:d t:}", tex: null, ttype: DEFINITION },
    { input: "oint", tag: "mo", output: "\u222E", tex: null, ttype: CONST },
    { input: "del", tag: "mo", output: "\u2202", tex: "partial", ttype: CONST },
    { input: "grad", tag: "mo", output: "\u2207", tex: "nabla", ttype: CONST },
    { input: "+-", tag: "mo", output: "\u00B1", tex: "pm", ttype: CONST },
    { input: "-+", tag: "mo", output: "\u2213", tex: "mp", ttype: CONST },
    { input: "O/", tag: "mo", output: "\u2205", tex: "emptyset", ttype: CONST },
    { input: "oo", tag: "mo", output: "\u221E", tex: "infty", ttype: CONST },
    { input: "aleph", tag: "mo", output: "\u2135", tex: null, ttype: CONST },
    { input: "...", tag: "mo", output: "...", tex: "ldots", ttype: CONST },
    { input: ":.", tag: "mo", output: "\u2234", tex: "therefore", ttype: CONST },
    { input: ":'", tag: "mo", output: "\u2235", tex: "because", ttype: CONST },
    { input: "/_", tag: "mo", output: "\u2220", tex: "angle", ttype: CONST },
    { input: "/_\\", tag: "mo", output: "\u25B3", tex: "triangle", ttype: CONST },
    { input: "'", tag: "mo", output: "\u2032", tex: "prime", ttype: CONST },
    { input: "tilde", tag: "mover", output: "~", tex: null, ttype: UNARY, acc: true },
    { input: "\\ ", tag: "mo", output: "\u00A0", tex: null, ttype: CONST },
    { input: "frown", tag: "mo", output: "\u2322", tex: null, ttype: CONST },
    { input: "quad", tag: "mo", output: "\u00A0\u00A0", tex: null, ttype: CONST },
    { input: "qquad", tag: "mo", output: "\u00A0\u00A0\u00A0\u00A0", tex: null, ttype: CONST },
    { input: "cdots", tag: "mo", output: "\u22EF", tex: null, ttype: CONST },
    { input: "vdots", tag: "mo", output: "\u22EE", tex: null, ttype: CONST },
    { input: "ddots", tag: "mo", output: "\u22F1", tex: null, ttype: CONST },
    { input: "diamond", tag: "mo", output: "\u22C4", tex: null, ttype: CONST },
    { input: "square", tag: "mo", output: "\u25A1", tex: null, ttype: CONST },
    { input: "|__", tag: "mo", output: "\u230A", tex: "lfloor", ttype: CONST },
    { input: "__|", tag: "mo", output: "\u230B", tex: "rfloor", ttype: CONST },
    { input: "|~", tag: "mo", output: "\u2308", tex: "lceiling", ttype: CONST },
    { input: "~|", tag: "mo", output: "\u2309", tex: "rceiling", ttype: CONST },
    { input: "CC", tag: "mo", output: "\u2102", tex: null, ttype: CONST },
    { input: "NN", tag: "mo", output: "\u2115", tex: null, ttype: CONST },
    { input: "QQ", tag: "mo", output: "\u211A", tex: null, ttype: CONST },
    { input: "RR", tag: "mo", output: "\u211D", tex: null, ttype: CONST },
    { input: "ZZ", tag: "mo", output: "\u2124", tex: null, ttype: CONST },
    { input: "f", tag: "mi", output: "f", tex: null, ttype: UNARY, func: true },
    { input: "g", tag: "mi", output: "g", tex: null, ttype: UNARY, func: true },
    //standard functions
    { input: "lim", tag: "mo", output: "lim", tex: null, ttype: UNDEROVER },
    { input: "Lim", tag: "mo", output: "Lim", tex: null, ttype: UNDEROVER },
    { input: "sin", tag: "mo", output: "sin", tex: null, ttype: UNARY, func: true },
    { input: "cos", tag: "mo", output: "cos", tex: null, ttype: UNARY, func: true },
    { input: "tan", tag: "mo", output: "tan", tex: null, ttype: UNARY, func: true },
    { input: "sinh", tag: "mo", output: "sinh", tex: null, ttype: UNARY, func: true },
    { input: "cosh", tag: "mo", output: "cosh", tex: null, ttype: UNARY, func: true },
    { input: "tanh", tag: "mo", output: "tanh", tex: null, ttype: UNARY, func: true },
    { input: "cot", tag: "mo", output: "cot", tex: null, ttype: UNARY, func: true },
    { input: "sec", tag: "mo", output: "sec", tex: null, ttype: UNARY, func: true },
    { input: "csc", tag: "mo", output: "csc", tex: null, ttype: UNARY, func: true },
    { input: "arcsin", tag: "mo", output: "arcsin", tex: null, ttype: UNARY, func: true },
    { input: "arccos", tag: "mo", output: "arccos", tex: null, ttype: UNARY, func: true },
    { input: "arctan", tag: "mo", output: "arctan", tex: null, ttype: UNARY, func: true },
    { input: "coth", tag: "mo", output: "coth", tex: null, ttype: UNARY, func: true },
    { input: "sech", tag: "mo", output: "sech", tex: null, ttype: UNARY, func: true },
    { input: "csch", tag: "mo", output: "csch", tex: null, ttype: UNARY, func: true },
    { input: "exp", tag: "mo", output: "exp", tex: null, ttype: UNARY, func: true },
    { input: "abs", tag: "mo", output: "abs", tex: null, ttype: UNARY, rewriteleftright: ["|", "|"] },
    { input: "norm", tag: "mo", output: "norm", tex: null, ttype: UNARY, rewriteleftright: ["\u2225", "\u2225"] },
    { input: "floor", tag: "mo", output: "floor", tex: null, ttype: UNARY, rewriteleftright: ["\u230A", "\u230B"] },
    { input: "ceil", tag: "mo", output: "ceil", tex: null, ttype: UNARY, rewriteleftright: ["\u2308", "\u2309"] },
    { input: "log", tag: "mo", output: "log", tex: null, ttype: UNARY, func: true },
    { input: "ln", tag: "mo", output: "ln", tex: null, ttype: UNARY, func: true },
    { input: "det", tag: "mo", output: "det", tex: null, ttype: UNARY, func: true },
    { input: "dim", tag: "mo", output: "dim", tex: null, ttype: CONST },
    { input: "mod", tag: "mo", output: "mod", tex: null, ttype: CONST },
    { input: "gcd", tag: "mo", output: "gcd", tex: null, ttype: UNARY, func: true },
    { input: "lcm", tag: "mo", output: "lcm", tex: null, ttype: UNARY, func: true },
    { input: "lub", tag: "mo", output: "lub", tex: null, ttype: CONST },
    { input: "glb", tag: "mo", output: "glb", tex: null, ttype: CONST },
    { input: "min", tag: "mo", output: "min", tex: null, ttype: UNDEROVER },
    { input: "max", tag: "mo", output: "max", tex: null, ttype: UNDEROVER },
    { input: "Sin", tag: "mo", output: "Sin", tex: null, ttype: UNARY, func: true },
    { input: "Cos", tag: "mo", output: "Cos", tex: null, ttype: UNARY, func: true },
    { input: "Tan", tag: "mo", output: "Tan", tex: null, ttype: UNARY, func: true },
    { input: "Arcsin", tag: "mo", output: "Arcsin", tex: null, ttype: UNARY, func: true },
    { input: "Arccos", tag: "mo", output: "Arccos", tex: null, ttype: UNARY, func: true },
    { input: "Arctan", tag: "mo", output: "Arctan", tex: null, ttype: UNARY, func: true },
    { input: "Sinh", tag: "mo", output: "Sinh", tex: null, ttype: UNARY, func: true },
    { input: "Cosh", tag: "mo", output: "Cosh", tex: null, ttype: UNARY, func: true },
    { input: "Tanh", tag: "mo", output: "Tanh", tex: null, ttype: UNARY, func: true },
    { input: "Cot", tag: "mo", output: "Cot", tex: null, ttype: UNARY, func: true },
    { input: "Sec", tag: "mo", output: "Sec", tex: null, ttype: UNARY, func: true },
    { input: "Csc", tag: "mo", output: "Csc", tex: null, ttype: UNARY, func: true },
    { input: "Log", tag: "mo", output: "Log", tex: null, ttype: UNARY, func: true },
    { input: "Ln", tag: "mo", output: "Ln", tex: null, ttype: UNARY, func: true },
    { input: "Abs", tag: "mo", output: "abs", tex: null, ttype: UNARY, notexcopy: true, rewriteleftright: ["|", "|"] },
    //arrows
    { input: "uarr", tag: "mo", output: "\u2191", tex: "uparrow", ttype: CONST },
    { input: "darr", tag: "mo", output: "\u2193", tex: "downarrow", ttype: CONST },
    { input: "rarr", tag: "mo", output: "\u2192", tex: "rightarrow", ttype: CONST },
    { input: "->", tag: "mo", output: "\u2192", tex: "to", ttype: CONST },
    { input: ">->", tag: "mo", output: "\u21A3", tex: "rightarrowtail", ttype: CONST },
    { input: "->>", tag: "mo", output: "\u21A0", tex: "twoheadrightarrow", ttype: CONST },
    { input: ">->>", tag: "mo", output: "\u2916", tex: "twoheadrightarrowtail", ttype: CONST },
    { input: "|->", tag: "mo", output: "\u21A6", tex: "mapsto", ttype: CONST },
    { input: "larr", tag: "mo", output: "\u2190", tex: "leftarrow", ttype: CONST },
    { input: "harr", tag: "mo", output: "\u2194", tex: "leftrightarrow", ttype: CONST },
    { input: "rArr", tag: "mo", output: "\u21D2", tex: "Rightarrow", ttype: CONST },
    { input: "lArr", tag: "mo", output: "\u21D0", tex: "Leftarrow", ttype: CONST },
    { input: "hArr", tag: "mo", output: "\u21D4", tex: "Leftrightarrow", ttype: CONST },
    //commands with argument
    { input: "sqrt", tag: "msqrt", output: "sqrt", tex: null, ttype: UNARY },
    { input: "root", tag: "mroot", output: "root", tex: null, ttype: BINARY },
    { input: "frac", tag: "mfrac", output: "/", tex: null, ttype: BINARY },
    { input: "/", tag: "mfrac", output: "/", tex: null, ttype: INFIX },
    { input: "stackrel", tag: "mover", output: "stackrel", tex: null, ttype: BINARY },
    { input: "overset", tag: "mover", output: "stackrel", tex: null, ttype: BINARY },
    { input: "underset", tag: "munder", output: "stackrel", tex: null, ttype: BINARY },
    { input: "_", tag: "msub", output: "_", tex: null, ttype: INFIX },
    { input: "^", tag: "msup", output: "^", tex: null, ttype: INFIX },
    { input: "hat", tag: "mover", output: "\u005E", tex: null, ttype: UNARY, acc: true },
    { input: "bar", tag: "mover", output: "\u00AF", tex: "overline", ttype: UNARY, acc: true },
    { input: "vec", tag: "mover", output: "\u2192", tex: null, ttype: UNARY, acc: true },
    { input: "dot", tag: "mover", output: ".", tex: null, ttype: UNARY, acc: true },
    { input: "ddot", tag: "mover", output: "..", tex: null, ttype: UNARY, acc: true },
    { input: "overarc", tag: "mover", output: "\u23DC", tex: "overparen", ttype: UNARY, acc: true },
    { input: "ul", tag: "munder", output: "\u0332", tex: "underline", ttype: UNARY, acc: true },
    { input: "ubrace", tag: "munder", output: "\u23DF", tex: "underbrace", ttype: UNARYUNDEROVER, acc: true },
    { input: "obrace", tag: "mover", output: "\u23DE", tex: "overbrace", ttype: UNARYUNDEROVER, acc: true },
    { input: "text", tag: "mtext", output: "text", tex: null, ttype: TEXT },
    { input: "mbox", tag: "mtext", output: "mbox", tex: null, ttype: TEXT },
    { input: "color", tag: "mstyle", output: "", tex: null, ttype: BINARY },
    { input: "id", tag: "mrow", output: "", tex: null, ttype: BINARY },
    { input: "class", tag: "mrow", output: "", tex: null, ttype: BINARY },
    { input: "cancel", tag: "menclose", output: "cancel", tex: null, ttype: UNARY },
    // AMquote,
    { input: "\"", tag: "mtext", output: "mbox", tex: null, ttype: TEXT },
    { input: "bb", tag: "mstyle", atname: "mathvariant", atval: "bold", output: "bb", tex: null, ttype: UNARY },
    { input: "mathbf", tag: "mstyle", atname: "mathvariant", atval: "bold", output: "mathbf", tex: null, ttype: UNARY },
    { input: "sf", tag: "mstyle", atname: "mathvariant", atval: "sans-serif", output: "sf", tex: null, ttype: UNARY },
    { input: "mathsf", tag: "mstyle", atname: "mathvariant", atval: "sans-serif", output: "mathsf", tex: null, ttype: UNARY },
    { input: "bbb", tag: "mstyle", atname: "mathvariant", atval: "double-struck", output: "bbb", tex: null, ttype: UNARY, codes: AMbbb },
    { input: "mathbb", tag: "mstyle", atname: "mathvariant", atval: "double-struck", output: "mathbb", tex: null, ttype: UNARY, codes: AMbbb },
    { input: "cc", tag: "mstyle", atname: "mathvariant", atval: "script", output: "cc", tex: null, ttype: UNARY, codes: AMcal },
    { input: "mathcal", tag: "mstyle", atname: "mathvariant", atval: "script", output: "mathcal", tex: null, ttype: UNARY, codes: AMcal },
    { input: "tt", tag: "mstyle", atname: "mathvariant", atval: "monospace", output: "tt", tex: null, ttype: UNARY },
    { input: "mathtt", tag: "mstyle", atname: "mathvariant", atval: "monospace", output: "mathtt", tex: null, ttype: UNARY },
    { input: "fr", tag: "mstyle", atname: "mathvariant", atval: "fraktur", output: "fr", tex: null, ttype: UNARY, codes: AMfrk },
    { input: "mathfrak", tag: "mstyle", atname: "mathvariant", atval: "fraktur", output: "mathfrak", tex: null, ttype: UNARY, codes: AMfrk }
];
/** convert an AsciiMath statement to MathML */
class AsciiMath {
    constructor() {
        this.noMathML = false;
        this.translated = false;
        this.AMnames = []; //list of input symbols
        this.AMmathml = "http://www.w3.org/1998/Math/MathML";
        this.AMnestingDepth = 0;
        this.AMpreviousSymbol = 0;
        this.AMcurrentSymbol = 0;
        this.setStylesheet("#AMMLcloseDiv \{font-size:0.8em padding-top:1em color:#014\}\n#AMMLwarningBox \{position:absolute width:100% top:0 left:0 z-index:200 text-align:center font-size:1em font-weight:bold padding:0.5em 0 0.5em 0 color:#ffc background:#c30\}");
        this.initSymbols();
        this.init();
    }
    // Add a stylesheet, replacing any previous custom stylesheet (adapted from TW)
    setStylesheet(s) {
        var id = "AMMLcustomStyleSheet";
        var n = document.getElementById(id);
        // if (document.createStyleSheet) {     // tbtb
        //     // Test for IE's non-standard createStyleSheet method
        //     if (n)
        //         n.parentNode.removeChild(n);
        //     // This failed without the &nbsp;
        //     document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", "&nbsp;<style id='" + id + "'>" + s + "</style>");    // tbtb not 'beforeEnd'
        // } else {
        if (n) {
            // @ts-ignore    // TODO
            n.replaceChild(document.createTextNode(s), n.firstChild);
        }
        else {
            n = document.createElement("style");
            // n.type = "text/css";   //tbtb
            n.id = id;
            n.appendChild(document.createTextNode(s));
            document.getElementsByTagName("head")[0].appendChild(n);
        }
        // }
    }
    init() {
        var msg, warnings = new Array();
        if (document.getElementById == null) {
            alert("This webpage requires a recent browser such as Mozilla Firefox");
            return null;
        }
        if (checkForMathML && (msg = this.checkMathML()))
            warnings.push(msg);
        if (warnings.length > 0)
            this.displayWarnings(warnings);
        if (!this.noMathML)
            this.initSymbols();
        return true;
    }
    checkMathML() {
        if (navigator.appName.slice(0, 8) == "Netscape")
            // @ts-ignore    // TODO
            if (navigator.appVersion.slice(0, 1) >= "5")
                this.noMathML = null;
            else
                this.noMathML = true;
        // else if (navigator.appName.slice(0, 9) == "Microsoft")
        //     try {
        //         var ActiveX = new ActiveXObject("MathPlayer.Factory.1");
        //         noMathML = null;
        //     } catch (e) {
        //         noMathML = true;
        //     }
        else if (navigator.appName.slice(0, 5) == "Opera")
            // @ts-ignore    // TODO
            if (navigator.appVersion.slice(0, 3) >= "9.5")
                this.noMathML = null;
            else
                this.noMathML = true;
        //noMathML = true; //uncomment to check
        if (this.noMathML && notifyIfNoMathML) {
            var msg = "To view the ASCIIMathML notation use Internet Explorer + MathPlayer or Mozilla Firefox 2.0 or later.";
            if (alertIfNoMathML)
                alert(msg);
            else
                return msg;
        }
    }
    hideWarning() {
        var body = document.getElementsByTagName("body")[0];
        let element = document.getElementById('AMMLwarningBox');
        if (element !== null) {
            body.removeChild(element);
        }
        body.onclick = null;
    }
    displayWarnings(warnings) {
        var i, frag, nd = this.createElementXHTML("div");
        var body = document.getElementsByTagName("body")[0];
        body.onclick = this.hideWarning;
        nd.id = 'AMMLwarningBox';
        for (i = 0; i < warnings.length; i++) {
            frag = this.createElementXHTML("div");
            frag.appendChild(document.createTextNode(warnings[i]));
            frag.style.paddingBottom = "1.0em";
            nd.appendChild(frag);
        }
        nd.appendChild(this.createElementXHTML("p"));
        nd.appendChild(document.createTextNode("For instructions see the "));
        var an = this.createElementXHTML("a");
        an.appendChild(document.createTextNode("ASCIIMathML"));
        an.setAttribute("href", "http://asciimath.org");
        nd.appendChild(an);
        nd.appendChild(document.createTextNode(" homepage"));
        an = this.createElementXHTML("div");
        an.id = 'AMMLcloseDiv';
        an.appendChild(document.createTextNode('(click anywhere to close this warning)'));
        nd.appendChild(an);
        var body = document.getElementsByTagName("body")[0];
        body.insertBefore(nd, body.childNodes[0]);
    }
    translate(spanclassAM) {
        if (!this.translated) { // run this only once
            this.translated = true;
            var body = document.getElementsByTagName("body")[0];
            var processN = document.getElementById(AMdocumentId);
            if (translateASCIIMath)
                this.AMprocessNode((processN != null ? processN : body), false, spanclassAM);
        }
    }
    createElementXHTML(t) {
        return document.createElementNS("http://www.w3.org/1999/xhtml", t);
    }
    AMcreateElementMathML(t) {
        return document.createElementNS(this.AMmathml, t);
    }
    createMmlNode(t, frag) {
        var node;
        node = document.createElementNS(this.AMmathml, t);
        if (frag)
            node.appendChild(frag);
        return node;
    }
    newcommand(oldstr, newstr) {
        AMsymbols.push({ input: oldstr, tag: "mo", output: newstr, tex: null, ttype: DEFINITION });
        this.refreshSymbols();
    }
    newsymbol(symbolobj) {
        AMsymbols.push(symbolobj);
        this.refreshSymbols();
    }
    compareNames(s1, s2) {
        if (s1.input > s2.input)
            return 1;
        else
            return -1;
    }
    initSymbols() {
        var i;
        var symlen = AMsymbols.length;
        for (i = 0; i < symlen; i++) {
            if (AMsymbols[i].tex) {
                AMsymbols.push({
                    // @ts-ignore    // TODO
                    input: AMsymbols[i].tex,
                    tex: null,
                    tag: AMsymbols[i].tag, output: AMsymbols[i].output, ttype: AMsymbols[i].ttype,
                    acc: (AMsymbols[i].acc || false)
                });
            }
        }
        this.refreshSymbols();
    }
    refreshSymbols() {
        AMsymbols.sort(this.compareNames);
        // @ts-ignore    // TODO
        for (let i = 0; i < AMsymbols.length; i++)
            this.AMnames[i] = AMsymbols[i].input;
    }
    define(oldstr, newstr) {
        AMsymbols.push({ input: oldstr, tag: "mo", output: newstr, tex: null, ttype: DEFINITION });
        this.refreshSymbols(); // this may be a problem if many symbols are defined!
    }
    AMremoveCharsAndBlanks(str, n) {
        //remove n characters and any following blanks
        var st;
        if (str.charAt(n) == "\\" && str.charAt(n + 1) != "\\" && str.charAt(n + 1) != " ")
            st = str.slice(n + 1);
        else
            st = str.slice(n);
        var i; // tbtb must NOT be defined in the for loop, goes out of scope
        for (i = 0; i < st.length && st.charCodeAt(i) <= 32; i = i + 1) { }
        return st.slice(i); // tbtb  ?? this isn't valid TS, not sure what it means in JS
    }
    position(arr, str, n) {
        // return position >=n where str appears or would be inserted
        // assumes arr is sorted
        if (n == 0) {
            var h, m;
            n = -1;
            h = arr.length;
            while (n + 1 < h) {
                m = (n + h) >> 1;
                if (arr[m] < str)
                    n = m;
                else
                    h = m;
            }
            return h;
        }
        else
            for (var i = n; i < arr.length && arr[i] < str; i++)
                ;
        return i; // i=arr.length || arr[i]>=str
    }
    AMgetSymbol(str) {
        //return maximal initial substring of str that appears in names
        //return null if there is none
        var k = 0; //new pos
        var j = 0; //old pos
        var mk; //match pos
        var st;
        var tagst;
        var match = "";
        var more = true;
        for (var i = 1; i <= str.length && more; i++) {
            st = str.slice(0, i); //initial substring of length i
            j = k;
            // @ts-ignore    // TODO
            k = this.position(this.AMnames, st, j);
            // @ts-ignore    // TODO
            if (k < this.AMnames.length && str.slice(0, this.AMnames[k].length) == this.AMnames[k]) {
                match = this.AMnames[k];
                mk = k;
                i = match.length;
            }
            // @ts-ignore    // TODO
            more = k < this.AMnames.length && str.slice(0, this.AMnames[k].length) >= this.AMnames[k];
        }
        this.AMpreviousSymbol = this.AMcurrentSymbol;
        if (match != "") {
            // @ts-ignore    // TODO
            this.AMcurrentSymbol = AMsymbols[mk].ttype;
            // @ts-ignore    // TODO
            return AMsymbols[mk];
        }
        // if str[0] is a digit or - return maxsubstring of digits.digits
        this.AMcurrentSymbol = CONST;
        k = 1;
        st = str.slice(0, 1);
        var integ = true;
        while ("0" <= st && st <= "9" && k <= str.length) {
            st = str.slice(k, k + 1);
            k++;
        }
        if (st == decimalsign) {
            st = str.slice(k, k + 1);
            if ("0" <= st && st <= "9") {
                integ = false;
                k++;
                while ("0" <= st && st <= "9" && k <= str.length) {
                    st = str.slice(k, k + 1);
                    k++;
                }
            }
        }
        if ((integ && k > 1) || k > 2) {
            st = str.slice(0, k - 1);
            tagst = "mn";
        }
        else {
            k = 2;
            st = str.slice(0, 1); //take 1 character
            tagst = (("A" > st || st > "Z") && ("a" > st || st > "z") ? "mo" : "mi");
        }
        if (st == "-" && str.charAt(1) !== ' ' && this.AMpreviousSymbol == INFIX) {
            this.AMcurrentSymbol = INFIX; //trick "/" into recognizing "-" on second parse
            return { input: st, tag: tagst, output: st, tex: null, ttype: UNARY, func: true };
        }
        return { input: st, tag: tagst, output: st, tex: null, ttype: CONST };
    }
    AMremoveBrackets(node) {
        let st = '';
        if (!node.hasChildNodes()) {
            return;
        }
        if (node.firstChild.hasChildNodes() && (node.nodeName == "mrow" || node.nodeName == "M:MROW")) {
            if (node.firstChild.nextSibling && node.firstChild.nextSibling.nodeName == "mtable") {
                return;
            }
            st = node.firstChild.firstChild.nodeValue;
            if (st == "(" || st == "[" || st == "{")
                node.removeChild(node.firstChild);
        }
        if (node.lastChild.hasChildNodes() && (node.nodeName == "mrow" || node.nodeName == "M:MROW")) {
            st = node.lastChild.firstChild.nodeValue;
            if (st == ")" || st == "]" || st == "}")
                node.removeChild(node.lastChild);
        }
    }
    /*Parsing ASCII math expressions with the following grammar
    v ::= [A-Za-z] | greek letters | numbers | other constant symbols
    u ::= sqrt | text | bb | other unary symbols for font commands
    b ::= frac | root | stackrel         binary symbols
    l ::= ( | [ | { | (: | {:            left brackets
    r ::= ) | ] | } | :) | :}            right brackets
    S ::= v | lEr | uS | bSS             Simple expression
    I ::= S_S | S^S | S_S^S | S          Intermediate expression
    E ::= IE | I/I                       Expression
    Each terminal symbol is translated into a corresponding mathml node.*/
    AMparseSexpr(str) {
        var symbol, node, result, i, st, // rightvert = false,
        newFrag = document.createDocumentFragment();
        str = this.AMremoveCharsAndBlanks(str, 0);
        symbol = this.AMgetSymbol(str); //either a token or a bracket or empty
        if (symbol == null || symbol.ttype == RIGHTBRACKET && this.AMnestingDepth > 0) {
            // @ts-ignore    // TODO
            return [null, str];
        }
        if (symbol.ttype == DEFINITION) {
            str = symbol.output + this.AMremoveCharsAndBlanks(str, symbol.input.length);
            symbol = this.AMgetSymbol(str);
        }
        switch (symbol.ttype) {
            case UNDEROVER:
            case CONST:
                str = this.AMremoveCharsAndBlanks(str, symbol.input.length);
                return [this.createMmlNode(symbol.tag, //its a constant
                    document.createTextNode(symbol.output)), str];
            case LEFTBRACKET: //read (expr+)
                this.AMnestingDepth++;
                str = this.AMremoveCharsAndBlanks(str, symbol.input.length);
                result = this.AMparseExpr(str, true);
                this.AMnestingDepth--;
                if (typeof symbol.invisible == "boolean" && symbol.invisible)
                    node = this.createMmlNode("mrow", result[0]);
                else {
                    node = this.createMmlNode("mo", document.createTextNode(symbol.output));
                    node = this.createMmlNode("mrow", node);
                    node.appendChild(result[0]);
                }
                // @ts-ignore    // TODO
                return [node, result[1]];
            case TEXT:
                if (symbol != AMquote)
                    str = this.AMremoveCharsAndBlanks(str, symbol.input.length);
                if (str.charAt(0) == "{")
                    i = str.indexOf("}");
                else if (str.charAt(0) == "(")
                    i = str.indexOf(")");
                else if (str.charAt(0) == "[")
                    i = str.indexOf("]");
                else if (symbol == AMquote)
                    i = str.slice(1).indexOf("\"") + 1;
                else
                    i = 0;
                if (i == -1)
                    i = str.length;
                st = str.slice(1, i);
                if (st.charAt(0) == " ") {
                    node = this.createMmlNode("mspace");
                    node.setAttribute("width", "1ex");
                    newFrag.appendChild(node);
                }
                newFrag.appendChild(this.createMmlNode(symbol.tag, document.createTextNode(st)));
                if (st.charAt(st.length - 1) == " ") {
                    node = this.createMmlNode("mspace");
                    node.setAttribute("width", "1ex");
                    newFrag.appendChild(node);
                }
                str = this.AMremoveCharsAndBlanks(str, i + 1);
                return [this.createMmlNode("mrow", newFrag), str];
            case UNARYUNDEROVER:
            case UNARY:
                str = this.AMremoveCharsAndBlanks(str, symbol.input.length);
                result = this.AMparseSexpr(str);
                if (result[0] == null) {
                    if (symbol.tag == "mi" || symbol.tag == "mo") {
                        return [this.createMmlNode(symbol.tag, document.createTextNode(symbol.output)), str];
                    }
                    else {
                        result[0] = this.createMmlNode("mi", "");
                    }
                }
                if (typeof symbol.func == "boolean" && symbol.func) { // functions hack
                    st = str.charAt(0);
                    if (st == "^" || st == "_" || st == "/" || st == "|" || st == "," ||
                        (symbol.input.length == 1 && symbol.input.match(/\w/) && st != "(")) {
                        return [this.createMmlNode(symbol.tag, document.createTextNode(symbol.output)), str];
                    }
                    else {
                        node = this.createMmlNode("mrow", this.createMmlNode(symbol.tag, document.createTextNode(symbol.output)));
                        node.appendChild(result[0]);
                        return [node, result[1]];
                    }
                }
                this.AMremoveBrackets(result[0]);
                if (symbol.input == "sqrt") { // sqrt
                    return [this.createMmlNode(symbol.tag, result[0]), result[1]];
                }
                else if (typeof symbol.rewriteleftright != "undefined") { // abs, floor, ceil
                    node = this.createMmlNode("mrow", this.createMmlNode("mo", document.createTextNode(symbol.rewriteleftright[0])));
                    node.appendChild(result[0]);
                    node.appendChild(this.createMmlNode("mo", document.createTextNode(symbol.rewriteleftright[1])));
                    return [node, result[1]];
                }
                else if (symbol.input == "cancel") { // cancel
                    node = this.createMmlNode(symbol.tag, result[0]);
                    node.setAttribute("notation", "updiagonalstrike");
                    return [node, result[1]];
                }
                else if (typeof symbol.acc == "boolean" && symbol.acc) { // accent
                    node = this.createMmlNode(symbol.tag, result[0]);
                    var accnode = this.createMmlNode("mo", document.createTextNode(symbol.output));
                    if (symbol.input == "vec" && ((result[0].nodeName == "mrow" && result[0].childNodes.length == 1
                        // @ts-ignore    // TODO
                        && result[0].firstChild.firstChild.nodeValue !== null
                        // @ts-ignore    // TODO
                        && result[0].firstChild.firstChild.nodeValue.length == 1) ||
                        // @ts-ignore    // TODO
                        (result[0].firstChild.nodeValue !== null
                            // @ts-ignore    // TODO
                            && result[0].firstChild.nodeValue.length == 1))) {
                        accnode.setAttribute("stretchy", false); //tbtb
                    }
                    node.appendChild(accnode);
                    return [node, result[1]];
                }
                else { // font change command
                    if (typeof symbol.codes != "undefined") {
                        for (i = 0; i < result[0].childNodes.length; i++)
                            if (result[0].childNodes[i].nodeName == "mi" || result[0].nodeName == "mi") {
                                // @ts-ignore    // TODO
                                st = (result[0].nodeName == "mi" ? result[0].firstChild.nodeValue :
                                    // @ts-ignore    // TODO
                                    result[0].childNodes[i].firstChild.nodeValue);
                                var newst = ''; // tbtb should be string
                                // @ts-ignore    // TODO
                                for (let j = 0; j < st.length; j++)
                                    // @ts-ignore    // TODO
                                    if (st.charCodeAt(j) > 64 && st.charCodeAt(j) < 91)
                                        // @ts-ignore    // TODO
                                        newst = newst + symbol.codes[st.charCodeAt(j) - 65]; // tbtb newst coerced to string here
                                    // @ts-ignore    // TODO
                                    else if (st.charCodeAt(j) > 96 && st.charCodeAt(j) < 123)
                                        // @ts-ignore    // TODO
                                        newst = newst + symbol.codes[st.charCodeAt(j) - 71];
                                    // @ts-ignore    // TODO
                                    else
                                        newst = newst + st.charAt(j);
                                if (result[0].nodeName == "mi")
                                    result[0] = this.createMmlNode("mo").
                                        appendChild(document.createTextNode(newst));
                                else
                                    result[0].replaceChild(this.createMmlNode("mo").
                                        appendChild(document.createTextNode(newst)), result[0].childNodes[i]);
                            }
                    }
                    node = this.createMmlNode(symbol.tag, result[0]);
                    node.setAttribute(symbol.atname, symbol.atval);
                    return [node, result[1]];
                }
            case BINARY:
                str = this.AMremoveCharsAndBlanks(str, symbol.input.length);
                result = this.AMparseSexpr(str);
                if (result[0] == null)
                    return [this.createMmlNode("mo", document.createTextNode(symbol.input)), str];
                this.AMremoveBrackets(result[0]);
                var result2 = this.AMparseSexpr(result[1]);
                if (result2[0] == null)
                    return [this.createMmlNode("mo", document.createTextNode(symbol.input)), str];
                this.AMremoveBrackets(result2[0]);
                if (['color', 'class', 'id'].indexOf(symbol.input) >= 0) {
                    // Get the second argument
                    if (str.charAt(0) == "{")
                        i = str.indexOf("}");
                    else if (str.charAt(0) == "(")
                        i = str.indexOf(")");
                    else if (str.charAt(0) == "[")
                        i = str.indexOf("]");
                    st = str.slice(1, i);
                    // Make a mathml node
                    node = this.createMmlNode(symbol.tag, result2[0]);
                    // Set the correct attribute
                    if (symbol.input === "color")
                        node.setAttribute("mathcolor", st);
                    else if (symbol.input === "class")
                        node.setAttribute("class", st);
                    else if (symbol.input === "id")
                        node.setAttribute("id", st);
                    return [node, result2[1]];
                }
                if (symbol.input == "root" || symbol.output == "stackrel")
                    newFrag.appendChild(result2[0]);
                newFrag.appendChild(result[0]);
                if (symbol.input == "frac")
                    newFrag.appendChild(result2[0]);
                return [this.createMmlNode(symbol.tag, newFrag), result2[1]];
            case INFIX:
                str = this.AMremoveCharsAndBlanks(str, symbol.input.length);
                return [this.createMmlNode("mo", document.createTextNode(symbol.output)), str];
            case SPACE:
                str = this.AMremoveCharsAndBlanks(str, symbol.input.length);
                node = this.createMmlNode("mspace");
                node.setAttribute("width", "1ex");
                newFrag.appendChild(node);
                newFrag.appendChild(this.createMmlNode(symbol.tag, document.createTextNode(symbol.output)));
                node = this.createMmlNode("mspace");
                node.setAttribute("width", "1ex");
                newFrag.appendChild(node);
                return [this.createMmlNode("mrow", newFrag), str];
            case LEFTRIGHT:
                //    if (rightvert) return [null,str]; else rightvert = true;
                this.AMnestingDepth++;
                str = this.AMremoveCharsAndBlanks(str, symbol.input.length);
                result = this.AMparseExpr(str, false);
                this.AMnestingDepth--;
                st = "";
                // @ts-ignore    // TODO
                if (result[0].lastChild != null)
                    // @ts-ignore    // TODO
                    st = result[0].lastChild.firstChild.nodeValue;
                if (st == "|" && str.charAt(0) !== ",") { // its an absolute value subterm
                    node = this.createMmlNode("mo", document.createTextNode(symbol.output));
                    node = this.createMmlNode("mrow", node);
                    node.appendChild(result[0]);
                    // @ts-ignore    // TODO
                    return [node, result[1]];
                }
                else { // the "|" is a \mid so use unicode 2223 (divides) for spacing
                    node = this.createMmlNode("mo", document.createTextNode("\u2223"));
                    node = this.createMmlNode("mrow", node);
                    return [node, str];
                }
            default:
                //alert("default");
                str = this.AMremoveCharsAndBlanks(str, symbol.input.length);
                return [this.createMmlNode(symbol.tag, //its a constant
                    document.createTextNode(symbol.output)), str];
        }
    }
    AMparseIexpr(str) {
        var symbol, sym1, sym2, node, result, underover;
        str = this.AMremoveCharsAndBlanks(str, 0);
        sym1 = this.AMgetSymbol(str);
        result = this.AMparseSexpr(str);
        node = result[0];
        str = result[1];
        symbol = this.AMgetSymbol(str);
        if (symbol.ttype == INFIX && symbol.input != "/") {
            str = this.AMremoveCharsAndBlanks(str, symbol.input.length);
            //    if (symbol.input == "/") result = AMparseIexpr(str); else ...
            result = this.AMparseSexpr(str);
            if (result[0] == null) // show box in place of missing argument
                result[0] = this.createMmlNode("mo", document.createTextNode("\u25A1"));
            else
                this.AMremoveBrackets(result[0]);
            str = result[1];
            //    if (symbol.input == "/") AMremoveBrackets(node);
            underover = (sym1.ttype == UNDEROVER || sym1.ttype == UNARYUNDEROVER);
            if (symbol.input == "_") {
                sym2 = this.AMgetSymbol(str);
                if (sym2.input == "^") {
                    str = this.AMremoveCharsAndBlanks(str, sym2.input.length);
                    var res2 = this.AMparseSexpr(str);
                    this.AMremoveBrackets(res2[0]);
                    str = res2[1];
                    node = this.createMmlNode((underover ? "munderover" : "msubsup"), node);
                    node.appendChild(result[0]);
                    node.appendChild(res2[0]);
                    node = this.createMmlNode("mrow", node); // so sum does not stretch
                }
                else {
                    node = this.createMmlNode((underover ? "munder" : "msub"), node);
                    node.appendChild(result[0]);
                }
            }
            else if (symbol.input == "^" && underover) {
                node = this.createMmlNode("mover", node);
                node.appendChild(result[0]);
            }
            else {
                node = this.createMmlNode(symbol.tag, node);
                node.appendChild(result[0]);
            }
            if (typeof sym1.func != 'undefined' && sym1.func) {
                sym2 = this.AMgetSymbol(str);
                if (sym2.ttype != INFIX && sym2.ttype != RIGHTBRACKET &&
                    (sym1.input.length > 1 || sym2.ttype == LEFTBRACKET)) {
                    result = this.AMparseIexpr(str);
                    node = this.createMmlNode("mrow", node);
                    node.appendChild(result[0]);
                    str = result[1];
                }
            }
        }
        return [node, str];
    }
    AMparseExpr(str, rightbracket) {
        var symbol, node, result, i, newFrag = document.createDocumentFragment();
        do {
            str = this.AMremoveCharsAndBlanks(str, 0);
            result = this.AMparseIexpr(str);
            node = result[0];
            str = result[1];
            symbol = this.AMgetSymbol(str);
            if (symbol.ttype == INFIX && symbol.input == "/") {
                str = this.AMremoveCharsAndBlanks(str, symbol.input.length);
                result = this.AMparseIexpr(str);
                if (result[0] == null) // show box in place of missing argument
                    result[0] = this.createMmlNode("mo", document.createTextNode("\u25A1"));
                else
                    this.AMremoveBrackets(result[0]);
                str = result[1];
                this.AMremoveBrackets(node);
                node = this.createMmlNode(symbol.tag, node);
                node.appendChild(result[0]);
                newFrag.appendChild(node);
                symbol = this.AMgetSymbol(str);
            }
            else if (node != undefined)
                newFrag.appendChild(node);
        } while ((symbol.ttype != RIGHTBRACKET &&
            (symbol.ttype != LEFTRIGHT || rightbracket)
            || this.AMnestingDepth == 0) && symbol != null && symbol.output != "");
        if (symbol.ttype == RIGHTBRACKET || symbol.ttype == LEFTRIGHT) {
            //    if (AMnestingDepth > 0) AMnestingDepth--;
            // @ts-ignore    // TODO
            var len = newFrag.childNodes.length;
            // @ts-ignore    // TODO
            if (len > 0 && newFrag.childNodes[len - 1].nodeName == "mrow"
                // @ts-ignore    // TODO
                && newFrag.childNodes[len - 1].lastChild
                // @ts-ignore    // TODO
                && newFrag.childNodes[len - 1].lastChild.firstChild) { //matrix
                //removed to allow row vectors: //&& len>1 &&
                //newFrag.childNodes[len-2].nodeName == "mo" &&
                //newFrag.childNodes[len-2].firstChild.nodeValue == ","
                // @ts-ignore    // TODO
                var right = newFrag.childNodes[len - 1].lastChild.firstChild.nodeValue;
                if (right == ")" || right == "]") {
                    // @ts-ignore    // TODO
                    var left = newFrag.childNodes[len - 1].firstChild.firstChild.nodeValue;
                    if (left == "(" && right == ")" && symbol.output != "}" ||
                        left == "[" && right == "]") {
                        var pos = []; // positions of commas
                        var matrix = true;
                        var m = newFrag.childNodes.length;
                        for (i = 0; matrix && i < m; i = i + 2) {
                            pos[i] = [];
                            node = newFrag.childNodes[i];
                            // @ts-ignore    // TODO
                            if (matrix)
                                matrix = node.nodeName == "mrow" &&
                                    // @ts-ignore    // TODO
                                    (i == m - 1 || node.nextSibling.nodeName == "mo" &&
                                        // @ts-ignore    // TODO
                                        node.nextSibling.firstChild.nodeValue == ",") &&
                                    // @ts-ignore    // TODO
                                    node.firstChild.firstChild &&
                                    // @ts-ignore    // TODO
                                    node.firstChild.firstChild.nodeValue == left &&
                                    // @ts-ignore    // TODO
                                    node.lastChild.firstChild &&
                                    // @ts-ignore    // TODO
                                    node.lastChild.firstChild.nodeValue == right;
                            if (matrix)
                                // @ts-ignore    // TODO
                                for (var j = 0; j < node.childNodes.length; j++)
                                    // @ts-ignore    // TODO
                                    if (node.childNodes[j].firstChild.nodeValue == ",")
                                        // @ts-ignore    // TODO
                                        pos[i][pos[i].length] = j;
                            if (matrix && i > 1)
                                matrix = pos[i].length == pos[i - 2].length;
                        }
                        matrix = matrix && (pos.length > 1 || pos[0].length > 0);
                        var columnlines = [];
                        if (matrix) {
                            var row, frag, n, k, table = document.createDocumentFragment();
                            for (i = 0; i < m; i = i + 2) {
                                row = document.createDocumentFragment();
                                frag = document.createDocumentFragment();
                                // @ts-ignore    // TODO
                                node = newFrag.firstChild; // <mrow>(-,-,...,-,-)</mrow>
                                // @ts-ignore    // TODO
                                n = node.childNodes.length;
                                k = 0;
                                // @ts-ignore    // TODO
                                node.removeChild(node.firstChild); //remove (
                                for (j = 1; j < n - 1; j++) {
                                    if (typeof pos[i][k] != "undefined" && j == pos[i][k]) {
                                        // @ts-ignore    // TODO
                                        node.removeChild(node.firstChild); //remove ,
                                        // @ts-ignore    // TODO
                                        if (node.firstChild.nodeName == "mrow" && node.firstChild.childNodes.length == 1 &&
                                            // @ts-ignore    // TODO
                                            node.firstChild.firstChild.firstChild.nodeValue == "\u2223") {
                                            //is columnline marker - skip it
                                            if (i == 0) {
                                                columnlines.push("solid");
                                            }
                                            // @ts-ignore    // TODO
                                            node.removeChild(node.firstChild); //remove mrow
                                            // @ts-ignore    // TODO
                                            node.removeChild(node.firstChild); //remove ,
                                            j += 2;
                                            k++;
                                        }
                                        else if (i == 0) {
                                            columnlines.push("none");
                                        }
                                        row.appendChild(this.createMmlNode("mtd", frag));
                                        k++;
                                        // @ts-ignore    // TODO
                                    }
                                    else
                                        frag.appendChild(node.firstChild);
                                }
                                row.appendChild(this.createMmlNode("mtd", frag));
                                if (i == 0) {
                                    columnlines.push("none");
                                }
                                if (newFrag.childNodes.length > 2) {
                                    // @ts-ignore    // TODO
                                    newFrag.removeChild(newFrag.firstChild); //remove <mrow>)</mrow>
                                    // @ts-ignore    // TODO
                                    newFrag.removeChild(newFrag.firstChild); //remove <mo>,</mo>
                                }
                                table.appendChild(this.createMmlNode("mtr", row));
                            }
                            node = this.createMmlNode("mtable", table);
                            node.setAttribute("columnlines", columnlines.join(" "));
                            if (typeof symbol.invisible == "boolean" && symbol.invisible)
                                node.setAttribute("columnalign", "left");
                            // @ts-ignore    // TODO
                            newFrag.replaceChild(node, newFrag.firstChild);
                        }
                    }
                }
            }
            str = this.AMremoveCharsAndBlanks(str, symbol.input.length);
            if (typeof symbol.invisible != "boolean" || !symbol.invisible) {
                node = this.createMmlNode("mo", document.createTextNode(symbol.output));
                newFrag.appendChild(node);
            }
        }
        return [newFrag, str];
    }
    parseMath(str, latex) {
        var frag, node;
        this.AMnestingDepth = 0;
        //some basic cleanup for dealing with stuff editors like TinyMCE adds
        str = str.replace(/&nbsp;/g, "");
        str = str.replace(/&gt;/g, ">");
        str = str.replace(/&lt;/g, "<");
        frag = this.AMparseExpr(str.replace(/^\s+/g, ""), false)[0];
        node = this.createMmlNode("mstyle", frag);
        if (mathcolor != "")
            node.setAttribute("mathcolor", mathcolor);
        if (mathfontsize != "") {
            node.setAttribute("fontsize", mathfontsize);
            node.setAttribute("mathsize", mathfontsize);
        }
        if (mathfontfamily != "") {
            node.setAttribute("fontfamily", mathfontfamily);
            node.setAttribute("mathvariant", mathfontfamily);
        }
        if (displaystyle)
            node.setAttribute("displaystyle", "true");
        node = this.createMmlNode("math", node);
        if (showasciiformulaonhover) //fixed by djhsu so newline
            node.setAttribute("title", str.replace(/\s+/g, " ")); //does not show in Gecko
        return node;
    }
    strarr2docFrag(arr, linebreaks, latex) {
        var newFrag = document.createDocumentFragment();
        var expr = false;
        for (var i = 0; i < arr.length; i++) {
            if (expr)
                newFrag.appendChild(this.parseMath(arr[i], latex));
            else {
                var arri = (linebreaks ? arr[i].split("\n\n") : [arr[i]]);
                newFrag.appendChild(this.createElementXHTML("span").
                    appendChild(document.createTextNode(arri[0])));
                for (var j = 1; j < arri.length; j++) {
                    newFrag.appendChild(this.createElementXHTML("p"));
                    newFrag.appendChild(this.createElementXHTML("span").
                        appendChild(document.createTextNode(arri[j])));
                }
            }
            expr = !expr;
        }
        return newFrag;
    }
    AMautomathrec(str) {
        //formula is a space (or start of str) followed by a maximal sequence of *two* or more tokens, possibly separated by runs of digits and/or space.
        //tokens are single letters (except a, A, I) and ASCIIMathML tokens
        var texcommand = "\\\\[a-zA-Z]+|\\\\\\s|";
        var ambigAMtoken = "\\b(?:oo|lim|ln|int|oint|del|grad|aleph|prod|prop|sinh|cosh|tanh|cos|sec|pi|tt|fr|sf|sube|supe|sub|sup|det|mod|gcd|lcm|min|max|vec|ddot|ul|chi|eta|nu|mu)(?![a-z])|";
        var englishAMtoken = "\\b(?:sum|ox|log|sin|tan|dim|hat|bar|dot)(?![a-z])|";
        var secondenglishAMtoken = "|\\bI\\b|\\bin\\b|\\btext\\b"; // took if and or not out
        var simpleAMtoken = "NN|ZZ|QQ|RR|CC|TT|AA|EE|sqrt|dx|dy|dz|dt|xx|vv|uu|nn|bb|cc|csc|cot|alpha|beta|delta|Delta|epsilon|gamma|Gamma|kappa|lambda|Lambda|omega|phi|Phi|Pi|psi|Psi|rho|sigma|Sigma|tau|theta|Theta|xi|Xi|zeta"; // uuu nnn?
        var letter = "[a-zA-HJ-Z](?=(?:[^a-zA-Z]|$|" + ambigAMtoken + englishAMtoken + simpleAMtoken + "))|";
        var token = letter + texcommand + "\\d+|[-()[\\]{}+=*&^_%\\\@/<>,\\|!:;'~]|\\.(?!(?:\x20|$))|" + ambigAMtoken + englishAMtoken + simpleAMtoken;
        var re = new RegExp("(^|\\s)(((" + token + ")\\s?)((" + token + secondenglishAMtoken + ")\\s?)+)([,.?]?(?=\\s|$))", "g");
        str = str.replace(re, " `$2`$7");
        var arr = str.split(AMdelimiter1);
        var re1 = new RegExp("(^|\\s)([b-zB-HJ-Z+*<>]|" + texcommand + ambigAMtoken + simpleAMtoken + ")(\\s|\\n|$)", "g");
        var re2 = new RegExp("(^|\\s)([a-z]|" + texcommand + ambigAMtoken + simpleAMtoken + ")([,.])", "g"); // removed |\d+ for now
        let i;
        for (i = 0; i < arr.length; i++) //single nonenglish tokens
            if (i % 2 == 0) {
                arr[i] = arr[i].replace(re1, " `$2`$3");
                arr[i] = arr[i].replace(re2, " `$2`$3");
                arr[i] = arr[i].replace(/([{}[\]])/, "`$1`");
            }
        str = arr.join(AMdelimiter1);
        str = str.replace(/((^|\s)\([a-zA-Z]{2,}.*?)\)`/g, "$1`)"); //fix parentheses
        str = str.replace(/`(\((a\s|in\s))(.*?[a-zA-Z]{2,}\))/g, "$1`$3"); //fix parentheses
        str = str.replace(/\sin`/g, "` in");
        str = str.replace(/`(\(\w\)[,.]?(\s|\n|$))/g, "$1`");
        str = str.replace(/`([0-9.]+|e.g|i.e)`(\.?)/gi, "$1$2");
        str = str.replace(/`([0-9.]+:)`/g, "$1");
        return str;
    }
    processNodeR(n, linebreaks, latex) {
        var mtch, str, arr, i;
        let frg;
        if (n.childNodes.length == 0) {
            // @ts-ignore    // TODO
            if ((n.nodeType != 8 || linebreaks) &&
                // @ts-ignore    // TODO
                n.parentNode.nodeName != "form" && n.parentNode.nodeName != "FORM" &&
                // @ts-ignore    // TODO
                n.parentNode.nodeName != "textarea" && n.parentNode.nodeName != "TEXTAREA"
            /*&& n.parentNode.nodeName!="pre" && n.parentNode.nodeName!="PRE"*/ ) {
                str = n.nodeValue;
                if (!(str == null)) {
                    str = str.replace(/\r\n\r\n/g, "\n\n");
                    str = str.replace(/\x20+/g, " ");
                    str = str.replace(/\s*\r\n/g, " ");
                    if (latex) {
                        // DELIMITERS:
                        mtch = (str.indexOf("\$") == -1 ? false : true);
                        str = str.replace(/([^\\])\$/g, "$1 \$");
                        str = str.replace(/^\$/, " \$"); // in case \$ at start of string
                        arr = str.split(" \$");
                        for (i = 0; i < arr.length; i++)
                            arr[i] = arr[i].replace(/\\\$/g, "\$");
                    }
                    else {
                        mtch = false;
                        str = str.replace(new RegExp(AMescape1, "g"), function () { mtch = true; return "AMescape1"; });
                        str = str.replace(/\\?end{?a?math}?/i, function () { automathrecognize = false; mtch = true; return ""; });
                        str = str.replace(/amath\b|\\begin{a?math}/i, function () { automathrecognize = true; mtch = true; return ""; });
                        arr = str.split(AMdelimiter1);
                        if (automathrecognize)
                            for (i = 0; i < arr.length; i++)
                                if (i % 2 == 0)
                                    arr[i] = this.AMautomathrec(arr[i]);
                        str = arr.join(AMdelimiter1);
                        arr = str.split(AMdelimiter1);
                        for (i = 0; i < arr.length; i++) // this is a problem ************
                            arr[i] = arr[i].replace(/AMescape1/g, AMdelimiter1);
                    }
                    if (arr.length > 1 || mtch) {
                        if (!this.noMathML) {
                            frg = this.strarr2docFrag(arr, n.nodeType == 8, latex);
                            var len = frg.childNodes.length;
                            // @ts-ignore    // TODO
                            n.parentNode.replaceChild(frg, n);
                            return len - 1;
                        }
                        else
                            return 0;
                    }
                }
            }
            else
                return 0;
        }
        else if (n.nodeName != "math") {
            for (i = 0; i < n.childNodes.length; i++)
                i += this.processNodeR(n.childNodes[i], linebreaks, latex);
        }
        return 0;
    }
    AMprocessNode(n, linebreaks, spanclassAM) {
        var frag, st;
        if (spanclassAM != null) {
            frag = document.getElementsByTagName("span");
            for (var i = 0; i < frag.length; i++)
                if (frag[i].className == "AM")
                    this.processNodeR(frag[i], linebreaks, false);
        }
        else {
            try {
                st = n.innerHTML; // look for AMdelimiter on page
            }
            catch (err) { }
            //alert(st)
            if (st == null || /amath\b|\\begin{a?math}/i.test(st) ||
                st.indexOf(AMdelimiter1 + " ") != -1 || st.slice(-1) == AMdelimiter1 ||
                st.indexOf(AMdelimiter1 + "<") != -1 || st.indexOf(AMdelimiter1 + "\n") != -1) {
                this.processNodeR(n, linebreaks, false);
            }
        }
    }
}


/***/ }),

/***/ "./src_editor/runtime/T.ts":
/*!*********************************!*\
  !*** ./src_editor/runtime/T.ts ***!
  \*********************************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony import */ var _runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./runtime */ "./src_editor/runtime/runtime.ts");

// TODO: change URI addresses to be configurations
const lessonURI = 'http://localhost/baby/baby-scorm/lessons/';
const assetsURI = 'http://localhost/baby/baby-scorm/assets/';
const studentID = '00001';
const firstName = 'Tom ';
const lastName = 'Berend';
const config = {
    helpline: 'Discord',
    assetURI: 'http://localhost/baby/baby-scorm/assets/'
};
///////////////////////////////////////////////////////
/////////// load up the (static) lessons //////////////
///////////////////////////////////////////////////////
//TODO: needs to be driven from manifest
console.log('Starting runtime in T.ts');
let t = new _runtime__WEBPACK_IMPORTED_MODULE_0__["Runtime"]();


/***/ }),

/***/ "./src_editor/runtime/lessonpage.ts":
/*!******************************************!*\
  !*** ./src_editor/runtime/lessonpage.ts ***!
  \******************************************/
/*! exports provided: LessonPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LessonPage", function() { return LessonPage; });
/* harmony import */ var _onClickSay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./onClickSay */ "./src_editor/runtime/onClickSay.ts");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _T__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./T */ "./src_editor/runtime/T.ts");
/* harmony import */ var _ASCIIMathML__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ASCIIMathML */ "./src_editor/runtime/ASCIIMathML.ts");
// import *  as ts from 'typescript'
// import { drillByName } from './canvas'

// import { EditorInstance } from './editorInstance'
// import { LessonFactory, drillMathDispatch } from './drillMath'



let utterances = [];
let codeStrings = [];
let moduleInfo = { module: '', lesson: '', shortDesc: '' };
class LessonPage {
    constructor() {
        // console.log('In LessonPage')
        Object(_ASCIIMathML__WEBPACK_IMPORTED_MODULE_3__["testAsciiMath"])();
        // initialize the voices
        this.onClickSay = new _onClickSay__WEBPACK_IMPORTED_MODULE_0__["OnClickSay"]();
    }
    onClickCopy(link) { alert('copy to editor...   ' + link); }
    onClickRun(link) { alert('run in canvas...   ' + link); }
    /** clear out any existing stuff in the document */
    clear() {
        // clear the existing lesson space
        let existing = document.getElementById('lesson');
        if (existing !== null)
            existing.innerHTML = '';
        utterances = [];
        codeStrings = [];
    }
    load(sections, debug = false) {
        this.clear(); // start by erasing
        let previousWasP = false; // we need to accumulate <p>'s together
        console.assert(sections.length > 0, "Didn't get any sections");
        let s = new SectionP(sections[0]);
        // cycle through the ITags, creating a section for each one
        sections.forEach((section) => {
            if ('h1' in section.params || 'h2' in section.params || 'h3' in section.params) {
                // console.log('FFOUND', section.tag)
                if (previousWasP) {
                    // console.log('PPROCESSED')
                    s.finalAttachToDiv();
                    previousWasP = false;
                }
            }
            if (debug) {
                new SectionDebug(section); // don't save in 's
            }
            // close off multiple linked <p> if necessary
            if (section.tag !== 'p' && previousWasP) {
                s.finalAttachToDiv();
                previousWasP = false;
            }
            switch (section.tag) {
                case 'key': // we don't process these, they are meta for the table of contents
                    break;
                case 'p':
                    // this is a bit trickier than the others
                    // <p> get grouped together in a single <DIV>.  so we offer 
                    // a method that adds a single <P> paragraph and another that closes the <DIV>
                    if (!previousWasP) { // previous was something else, so opening a new block of <p>
                        s = new SectionP(section);
                    }
                    s.addSingleParagraph(section);
                    previousWasP = true; // next time through this will be true
                    break;
                case 'code':
                    new SectionCode(section);
                    break;
                case 'module':
                    new SectionModule(section);
                    break;
                case 'lesson':
                    new SectionLesson(section);
                    break;
                case 'shortdesc':
                    new SectionShortDesc(section);
                    break;
                case 'youtube':
                    new SectionYouTube(section);
                    break;
                case 'run':
                    break;
                case 'title':
                case 'subtitle':
                case 'section':
                    new SectionTitle(section);
                    break;
                case 'break': // or in case we want to do something later
                    break;
                case 'asciimath':
                    new SectionAsciiMath(section);
                    break;
                case 'youtube':
                    new SectionYouTube(section);
                    break;
                case 'drill':
                    new SectionDrill(section);
                    break;
                default:
                    new SectionMystery(section);
                    break;
                // console.error(section.tag)
            }
        });
        if (previousWasP && s !== null) // may need to close off the last <p>
            s.finalAttachToDiv();
        // generate the 'on click' events we need    
        this.createLinks();
        // scroll up to the top of the page - only do this in production
        // window.scrollTo({ top: 0 })
    }
    createLinks() {
        // all sections loaded.  now clean up and attach the on-click events
        // to utterances and code editors
        // clean up some of the utterances
        // substitution list to improve voices
        let subs = [
            // { from: 'JavaScript', to: '[Javascript|JavvaScript]' },
            { from: '\`console.log()\`', to: '[\`console.log()\`|console dot log]' },
        ];
        utterances.forEach(utterance => {
            for (let sub of subs) { // anything in the substitution list
                while (true) {
                    let n = utterance.text.indexOf(sub.from);
                    if (n === -1) {
                        break;
                    } // might have multiples (this may be several paragraphs)
                    utterance.text = utterance.text.slice(0, n) + sub.to + utterance.text.slice(n + sub.from.length);
                }
            }
            let element = document.getElementById(utterance.id);
            // console.log('attaching to ', utterance.id,utterance.text)
            if (element !== null)
                element.onclick = () => { this.onClickSay.onClickSay(utterance.text); };
        });
        codeStrings.forEach(codeStr => {
            // first the copy element
            let copyElement = document.getElementById(codeStr.copyID);
            if (copyElement === null) {
                console.error(`No tag "${codeStr.copyID}`);
            }
            else {
                copyElement.onclick = () => { this.onClickCopy(codeStr.copyID); };
            }
            // then the run element
            let runElement = document.getElementById(codeStr.runID);
            if (runElement === null) {
                console.error(`No tag "${codeStr.runID}`);
            }
            else {
                runElement.onclick = () => { this.onClickCopy(codeStr.copyID); };
            }
        });
    }
    moduleInfo() {
        return moduleInfo;
    }
}
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
let halfMonacoWidth = 800; // always.  if you change, then also change the css file (.halfMonaco)
let bakeryTicket = 0;
/** abstract class for adding lesson sections.  use concrete class like sectionVT52 */
class LessonSections {
    constructor(tag) {
        this.tkt = bakeryTicket++; // unique bakery ticket
        this.sectionName = this.divName('sect', this.tkt);
    }
    /** format a class or id into something like 'sect005' */
    divName(prefix, tkt) {
        return (prefix + ("00" + tkt).slice(-3)); // prefix + 3-digit tkt
    }
    /** create a new node  */
    node(newElement, content, newId = '', className = '', attributes = []) {
        let node = document.createElement(newElement);
        if (className.length > 0) {
            node.className = className;
        }
        if (typeof content === 'string' && content.length > 0) {
            node.innerHTML = content;
        }
        if (newId.length > 0) {
            node.id = newId;
        }
        // paste in any attributes...
        attributes.forEach((element) => {
            // console.log('typeof element', typeof element)
            node.setAttribute(element.name, element.value);
        });
        // console.log('node', node)
        return (node);
    }
    /** attach node to existing ID */
    attach(existingId, pContent, pId, pClassName, aNode) {
        let tag = document.getElementById(existingId);
        if (tag === null) {
            console.error(`No tag "${existingId}`);
        }
        else {
            // always wrap the new elements in a <div></div>
            let pElement = document.createElement('DIV');
            if (pClassName.length > 0) {
                pElement.className = pClassName;
            }
            if (pContent.length > 0) {
                pElement.innerHTML = pContent;
            }
            if (pId.length > 0) {
                pElement.id = pId;
            }
            let pTag = tag.appendChild(pElement);
            // now if there are any elements to put below (perhaps div's)
            aNode.forEach((element) => {
                // console.log('typeof element', typeof element)
                pTag.appendChild(element); // inside the <p></p>
            });
        }
    }
    /** set up basic parent/left/right divs, with specific class */
    basicLeftRight(thisSectionID, parentClassName, leftClassName, rightClassName) {
        let section = this.divName("sect", this.tkt);
        let left = this.divName("left", this.tkt);
        let right = this.divName("right", this.tkt);
        this.attach('lesson', '', parentClassName, section, [
            this.node('DIV', '', left, leftClassName),
            this.node('DIV', '', right, rightClassName),
        ]);
    }
}
class SectionModule extends LessonSections {
    constructor(section) {
        super(section);
        // retrieve the information about the user
        let userID = sessionStorage.getItem('id');
        let userName = sessionStorage.getItem('name');
        let userUserName = sessionStorage.getItem('username');
        let userLevel = sessionStorage.getItem('level');
        let userRole = sessionStorage.getItem('role');
        let userTeacherID = sessionStorage.getItem('teacherID');
        let userSchoolID = sessionStorage.getItem('schoolID');
        let user3d = sessionStorage.getItem('3d');
        let user3dDist = sessionStorage.getItem('3dDist');
        let userJoomla = sessionStorage.getItem('Joomla');
        let userCodePath = sessionStorage.getItem('3dCodePath');
        moduleInfo.module = section.textvalue; // save
        // temporary until we link to Joomla
        user3d = 'http://localhost/3d';
        let HTML = '';
        // put up our logo    
        HTML += `<div class='header'><b>GameCode&nbsp;&nbsp;</b><br><img style="height:70px;" src = "${_T__WEBPACK_IMPORTED_MODULE_2__["config"].assetURI}/images/logo.png"> </a></div>`;
        // always have a home button
        HTML += `<div class='header'>
                <a href="${user3d}"> <img height="20px" width = "20px" src = "${_T__WEBPACK_IMPORTED_MODULE_2__["config"].assetURI}/images/home.png" data - toggle="tooltip" title = "Home" ></a> 
                <br>
                <a href="${user3d}"><img height=\"20px\" width=\"20px\" src=\"${_T__WEBPACK_IMPORTED_MODULE_2__["config"].assetURI}/images/shutdown.png\" data-toggle=\"tooltip\" title=\"Logout\" ></a>
                <br>
                <a href="${user3d}"><img height=\"20px\" width=\"20px\" src=\"${_T__WEBPACK_IMPORTED_MODULE_2__["config"].assetURI}/images/about.png\" data-toggle=\"tooltip\" title=\"About\" ></a>
                </div>`;
        // show the current lesson
        HTML += `<div class='header'>

                <button class="greenbutton" > ${section.textvalue} </button>
                <br>
                <form class = "greenbutton" action="/action_page.php">
                        <select name="cars" id="cars">
                            <option value="volvo">Introducion</option>
                            <option value="opel">Basic Javascript</option>
                            <option value="saab">Multiply Game</option>
                        </select>
                </form>
        
            </div>`;
        // add a link to SLACK or DISCORD        
        HTML += `<div class='header'><b>.. for help</b><br>`;
        if (_T__WEBPACK_IMPORTED_MODULE_2__["config"].helpline == 'Slack') {
            HTML += `<a href = "https://communityreading.slack.com" target = "_blank" >
                        <img style="height:30px" src = "${_T__WEBPACK_IMPORTED_MODULE_2__["config"].assetURI}/images/slack.png"> </a>`;
        }
        else { // Discord
            HTML += `<a href = "https://communityreading.discord.com" target = "_blank" >
                    <img style="height:30px;" src = "${_T__WEBPACK_IMPORTED_MODULE_2__["config"].assetURI}/images/discord.png"> </a>`;
        }
        HTML += `<br><a href="https://communityreading.org/babydocs/"><b><span style="font-variant: small-caps;">baby api</span></b> </a>`;
        HTML += `</div>`;
        //section.textvalue
        // create the textvalue for the entire header, and pop it into the page
        this.attach('lesson', '', '', '', [
            this.node('div', HTML, '', 'modbar'),
        ]);
        // // the 'home' button runs you back to Joomla's home page
        // // the 'logoff' button similarly.  if you are in a lesson, then ALWAYS logged in
        // $currentLesson = '01 - Learn Javascript';
        // $HTML.= << <EOT
        //                         < !--    < br />
        //                         <a href="https://join.slack.com/t/communityreading/shared_invite/enQtMzY2MTU4NzczODcyLTJhODFlMDU3OGQ4YzQ3MjYyNGNjN2FhNTU3YzcyNDhlMTM1MmZjNzE1OTA3ZTMwM2RmNTgxNTk5YzcwMWMxODY" > Join Slack < /a>
        // -->
        //     </td>
        //     < /tr></table >
    }
}
class SectionLesson extends LessonSections {
    constructor(section) {
        super(section);
        moduleInfo.lesson = section.textvalue; // just same the lesson name
    }
}
class SectionShortDesc extends LessonSections {
    constructor(section) {
        super(section);
        moduleInfo.shortDesc = section.textvalue; // just same the lesson name
        this.attach('lesson', '', '', '', [
            this.node('P', `SUMMARY - ${section.textvalue}`, '', '', [{ name: 'style', value: 'background-color:lightsalmon' }]),
        ]);
    }
}
class SectionMystery extends LessonSections {
    constructor(section) {
        super(section);
        this.attach('lesson', '', '', '', [
            this.node('P', `Unknown tag - ${section.tag} with rawvalue ${section.rawvalue} </span>`, '', '', [{ name: 'style', value: 'background-color:pink' }]),
        ]);
    }
}
class SectionCode extends LessonSections {
    constructor(section) {
        super(section);
        // console.log('config lines', section.params['lines'])
        //TODO: <code
        //    (lines=6) // only show n lines (indicate there are more)
        //    (noShow)  // just a copy or run button
        //    (noRun)   // not runnable code, no copy or run buttons
        // this.basicLeftRight(this.divName('code', this.tkt),
        //     this.sectionName, this.divName("monaco", this.tkt), this.divName("world", this.tkt))  // specifies the DIV styles (not the IDs)
        // if option 'noedit', then just display code
        // if ('noedit' in section.params) {
        //     let text = section.rawvalue.replace(/(?:\r\n|\r|\n)/g, '<br>')
        //     if (text.startsWith('<br>')) { text = text.slice(4) }  // strip leading <br>
        //     this.attach(this.sectionName, '', this.divName('nocode', this.tkt), '', [
        //         this.node('P', `<t3d_codeblock>${text}</t3d_codeblock>`, '', ''),
        //     ])
        // } else {
        // create a monaco editor on the left side
        let initialCode = section.rawvalue.trimRight();
        initialCode = initialCode.replaceAll(`“`, `"`); // replace web quotes with proper double-quotes
        initialCode = initialCode.replaceAll(`”`, `"`); // replace web quotes with proper double-quotes
        initialCode = initialCode.replaceAll(`‘`, `'`); // replace web quotes with proper single-quotes
        initialCode = initialCode.replaceAll(`’`, `'`); // replace web quotes with proper single-quotes
        let tag = document.getElementById(this.divName('left', this.tkt));
        let nLines = parseFloat(section.params['lines']); // we know it's a string, but typescript doesn't
        if (initialCode.charCodeAt(0) == 10) { // leading LF?
            initialCode = initialCode.substr(1);
        }
        // console.log('initialco', initialCode, initialCode.charCodeAt(0))
        // console.log('about to create the editor')
        // this.editor = new EditorInstance(initialCode, tag, halfMonacoWidth, nLines)
        // if we want line numbers, we just add them ourselves
        initialCode = initialCode
            .split('\n')
            .map((line, num) => `${(num + 1).toString().padStart(3, ' ')}    ${line}`) // 
            .join('\n');
        const html = prismjs__WEBPACK_IMPORTED_MODULE_1__["highlight"](initialCode, prismjs__WEBPACK_IMPORTED_MODULE_1__["languages"].javascript, 'javascript');
        let copyID = this.divName('copy', this.tkt); // code019 or similar
        let runID = this.divName('run', this.tkt); // code019 or similar
        // and save the speech in the utterances array
        codeStrings.push({ copyID: copyID, runID: runID, code: initialCode });
        // console.log('push codeStrings', copyID, runID, initialCode)
        let expandHtml = '';
        if (!('norun' in section.params)) { // sometimes we don't want to run
            expandHtml += // start with the copy a nd run icons
                `<div style='float:left;'>
                    <img id='${copyID}' style='height:24px;position:absolute;' src='../assets/images/copy.png' title='Copy to Editor' />
                    <img id='${runID}' style='height:24px;position:absolute;top: 32px;left:-2px;' src='../assets/images/run.png' title='Run in Canvas' />
                </div>`;
        }
        expandHtml += // add in the code itself
            `<div class='editleft'><code>${html}</code></div>`;
        this.attach('lesson', '', this.divName('code', this.tkt), 'code', [
            this.node('P', expandHtml, '', ''),
        ]);
        // ///////////////////////////////////////////////////////////////////
        // // turn on validation (probably on by default)
        // monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        //     noSemanticValidation: false,
        //     noSyntaxValidation: false,
        // })
        // ///////////////////////////////////////////////////////////////////
        // // add extra libraries
        // monaco.languages.typescript.typescriptDefaults.addExtraLib([
        //     'declare class Facts {',
        //     '    /**',
        //     '     * Returns the next fact',
        //     '     */',
        //     '    static next():string',
        //     '}',
        // ].join('\n'), 'filename/facts.d.ts');
        // monaco.languages.typescript.typescriptDefaults.setCompilerOptions(defaultCompilerOptions)
        // }
    }
    onDestroy() { }
}
class SectionP extends LessonSections {
    //TODO:  p(run)  // immediately run the code part of the section on clicking the utterance
    constructor(section) {
        super(section);
        this.utter = '';
        this.nodes = []; // build up the parts of the div that we need
        // the utterId is constant across multiple <p>s
        this.utterId = this.divName('utter', this.tkt);
        let text = section.textvalue;
        this.originalSection = section; // we will need it 
        // this.addSingleParagraph(section)
        // this.finalAttachToDiv()
    }
    // <p> get grouped together in a single <DIV>.  so we offer 
    // a method that adds a single <P> paragraph and another that closes the <DIV>
    addSingleParagraph(currentSection) {
        // speech icon
        if ('SpeechIcon' in currentSection.params) { // first or continuation?
            // nodes.push(this.node('DIV', '', '', 'prespeaker'))
            this.nodes.push(this.node('IMG', '', this.utterId, 'speaker', [
                { name: 'src', value: "../assets/images/speaker.png" }
                // ,
                // { name: 'onclick', value: `console.log(globalThis);onClickSay("this is a test")` },
            ]));
            // and save the speech in the utterances array
            utterances.push({ id: this.utterId, text: currentSection.speechvalue + " ." });
        }
        else {
            // just add the voice text to the previous utterance
            let previousUtterance = utterances.pop();
            if (previousUtterance !== undefined) {
                previousUtterance.text += '. ' + currentSection.speechvalue;
                utterances.push(previousUtterance);
            }
        }
        // right side image
        if ('img' in currentSection.params) {
            this.nodes.push(this.node('IMG', '', '', 'pimage', [
                { name: 'src', value: currentSection.url },
            ]));
        }
        // right side video
        if ('video' in currentSection.params) {
            this.nodes.push(this.node('video', '', '', 'vimage', [
                { name: 'src', value: currentSection.url },
                { name: 'width', value: "320" },
                { name: 'height', value: "240" },
                { name: 'type', value: "video/webm" },
                // { name: 'controls', value: "" },
                { name: 'loop', value: "" },
                { name: 'autoplay', value: "" },
            ]));
        }
        // do we need to add background betty?  
        if ('science' in currentSection.params && 'SpeechIcon' in currentSection.params) {
            this.nodes.push(this.node('IMG', '', 'science', 'background', [
                { name: 'src', value: "../assets/images/madscience.png" },
            ]));
        }
        // do we need to add realworld?
        if ('history' in currentSection.params && 'SpeechIcon' in currentSection.params) {
            this.nodes.push(this.node('IMG', '', '', 'background', [
                { name: 'src', value: "../assets/images/history.png" },
            ]));
        }
        // do we need to add mindset?
        if ('mindset' in currentSection.params && 'SpeechIcon' in currentSection.params) {
            this.nodes.push(this.node('IMG', '', '', 'background', [
                { name: 'src', value: "../assets/images/anime3.png" },
            ]));
        }
        // finally the text  // <p(h1)> is equivalent to <title>, but gets a speech button
        // is this a bullet or a regular paragraph?
        if ('bullet' in currentSection.params) {
            this.nodes.push(this.node('P', currentSection.textvalue, '', 'bullet'));
        }
        else {
            let tag = 'p';
            if ('h1' in currentSection.params)
                tag = 'h1';
            if ('h2' in currentSection.params)
                tag = 'h2';
            if ('h3' in currentSection.params)
                tag = 'h3';
            this.nodes.push(this.node(tag, currentSection.textvalue, '', ''));
        }
    }
    finalAttachToDiv() {
        // finally attach, either for background-betty or for normal
        if ('science' in this.originalSection.params) {
            this.attach('lesson', '', this.sectionName, 'science', this.nodes);
        }
        else if ('history' in this.originalSection.params) {
            this.attach('lesson', '', this.sectionName, 'history', this.nodes);
        }
        else if ('mindset' in this.originalSection.params) {
            this.attach('lesson', '', this.sectionName, 'mindset', this.nodes);
        }
        else {
            this.attach('lesson', '', this.sectionName, '', this.nodes);
        }
    }
    onDestroy() { }
}
class SectionTitle extends LessonSections {
    constructor(section) {
        super(section);
        let tag = 'h1';
        if (section.tag === 'subtitle') {
            tag = 'h2';
        }
        if (section.tag === 'section') {
            tag = 'h3';
        }
        this.attach('lesson', '', '', '', [
            this.node(tag, section.textvalue),
        ]);
    }
}
class SectionAsciiMath extends LessonSections {
    constructor(section) {
        super(section);
        let mathId = this.divName('math', this.tkt);
        this.attach('lesson', '', mathId, '', []); // create a <div> for the math
        let pTag = document.getElementById(mathId); // and then attach to that div
        if (pTag !== null)
            pTag.appendChild(Object(_ASCIIMathML__WEBPACK_IMPORTED_MODULE_3__["asciiMath"])(section.textvalue));
    }
}
class SectionDrill extends LessonSections {
    constructor(section) {
        super(section);
        // a drill is just a canvas area, the drill software figures how to fill it
        let nodes = [];
        let drillId = this.divName('drill', this.tkt);
        // <div id="drill???s" width="1000" height="300"></canvas>
        this.attach('lesson', '', this.sectionName, '', [
            this.node('canvas', '', drillId, 'drill', [{ name: 'width', value: "1000" }, { name: 'height', value: "300" }])
        ]);
        // let drill = drillByName('singleMultiply', drillId, 6)
        // // eventually ask for history, decide what to do next
        // // for now, drill 6x6 simplemultiply
        // let model = LessonFactory([6, 6])
        // let drill = drillMathDispatch(drillId, model, 'SimpleMultiply')
        // // test function
        // let i = 0
        // while (i++ < 1) {
        //     let question = drill.generator(false).next
        //     drill.renderQuestion(question)
        // }
    }
}
class SectionYouTube extends LessonSections {
    constructor(section) {
        super(section);
        this.nodes = [];
        // Use the EMBED version of the URL (from the <> EMBED), NOT the share URL !!
        console.assert(section.textvalue.includes('embed'), "USE THE EMBED <> VERSION OF THE YOUTUBE URL");
        let youId = this.divName('youtube', this.tkt);
        this.attach('lesson', '', youId, '', [
            this.node('embed', '', '', '', [
                { name: "width", value: "640px" },
                { name: "height", value: "400px" },
                { name: "src", value: section.textvalue.trimRight() },
                { name: "allowfullscreen", value: "true" }
            ])
        ]);
    }
}
class SectionDebug extends LessonSections {
    constructor(section) {
        super(section);
        let tag = 'p';
        this.attach('lesson', '', '', '', [
            this.node(tag, JSON.stringify(section), '', '', [{ name: 'style', value: 'font-size:10px;' }])
        ]);
    }
}


/***/ }),

/***/ "./src_editor/runtime/onClickSay.ts":
/*!******************************************!*\
  !*** ./src_editor/runtime/onClickSay.ts ***!
  \******************************************/
/*! exports provided: OnClickSay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnClickSay", function() { return OnClickSay; });
/////////////////////////////////////////////////////////////////////////////////////
////////////////////// speech support ///////////////////////////////////////////////
class OnClickSay {
    constructor() {
        this.synth = window.speechSynthesis;
        this.synthRunning = false; // don't want two instances
        this.synthCancelled = false; // if cancelled then don't restart
        this.loadVoicesWhenAvailable();
    }
    // we need to load the voices before we can use them
    loadVoicesWhenAvailable() {
        this.voices = this.synth.getVoices();
        if (this.voices.length !== 0) {
            // console.log('voices already loaded')
            // console.log('voices', voices)
        }
        else {
            // console.log('loading voices')
            setTimeout(() => {
                this.loadVoicesWhenAvailable();
            }, 10);
        }
    }
    onClickSay(utterance) {
        console.log('arrived in onClickSay', utterance);
        if (this.voices === undefined) {
            alert('Speech not ready yet, still loading voices.');
            return;
        }
        // if (this.synthRunning) {     // someone clicked, likelywants to STOP the playback
        //     this.synthCancelled = true
        //     return
        // }
        this.synthCancelled = false;
        this.speakResponse(utterance);
        //
        // if (synth.speaking) { /* stop narration */
        //      /* for safari */
        //   synthRunning = false
        //   synth.cancel()
        // }
        //
        // if (!synthRunning) {
        //   synthRunning = true
        //   let utterance = new SpeechSynthesisUtterance(document.getElementById(id).innerHTML)
        //   console.log(utterance)
        //   utterance.voice = synth.getVoices()[3]
        //   utterance.voiceURI = 'native';
        //
        //   utterance.onend = function () {
        //     synthRunning = false
        //   }
        //   synth.speak(utterance)
        // }
    }
    // problem with longer speech chunks, here's a workaround
    // https://stackoverflow.com/questions/21947730/chrome-speech-synthesis-with-longer-texts
    sayit() {
        if (!this.synthRunning) {
            this.synthCancelled = true;
            speechSynthesis.cancel(); // if it errors, this clears out the error.
        }
        let msg = new SpeechSynthesisUtterance();
        // 1:  US english
        // 2:  UK english male
        // 3:  UK english female
        msg.voice = this.synth.getVoices()[1]; // Note: some voices don't support altering params
        msg.lang = 'en-US';
        msg.volume = 1; // 0 to 1
        msg.rate = 1.0; // 0.1 to 1.0
        msg.pitch = 1; // 0 to 2
        msg.onstart = (event) => {
            this.synthRunning = true;
            // console.log(`'Speech Starts ${event}`)
        };
        msg.onend = (event) => {
            this.synthRunning = false;
            // console.log(`Speech Ends ${event}`)
        };
        msg.onerror = (event) => {
            this.synthRunning = false;
            // console.assert(false, `Errored ${event}`)
        };
        msg.onpause = (event) => {
            this.synthRunning = false;
            // console.assert(false, `paused ${event}`)
        };
        msg.onboundary = (event) => {
            // console.assert(false, `onboundary ${event}`)
        };
        return msg;
    }
    speakResponse(text) {
        let wasRunning = this.synthRunning;
        speechSynthesis.cancel(); // if it errors, this clears out the error.
        // not running now
        if (!wasRunning) {
            this.synthRunning = true; // try to prevent a second speaker from starting
            let sentences = text.split('.');
            for (let i = 0; i < sentences.length; i++) {
                let toSay = this.sayit();
                toSay.text = sentences[i];
                speechSynthesis.speak(toSay);
            }
            this.synthRunning = false;
        }
    }
}


/***/ }),

/***/ "./src_editor/runtime/runtime.ts":
/*!***************************************!*\
  !*** ./src_editor/runtime/runtime.ts ***!
  \***************************************/
/*! exports provided: Runtime, serverFileSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Runtime", function() { return Runtime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serverFileSystem", function() { return serverFileSystem; });
/* harmony import */ var _createSCORM_lessonToITags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createSCORM/lessonToITags */ "./src_editor/createSCORM/lessonToITags.ts");
/* harmony import */ var _runtime_lessonpage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../runtime/lessonpage */ "./src_editor/runtime/lessonpage.ts");


class Runtime {
    constructor() {
        // scormHost: object
        this.courseInfo = null; // have to fetch it
        this.lessons = new Map();
        // setup the writer's editor
        this.lessonPage = null; // link to the lessonPage builder
        let editorDiv = document.getElementById('tomseditor');
        this.editor = new Editor(editorDiv);
        console.log('in class Runtime');
        // this.paintWelcome()
    }
    async httpfetch(fileURI) {
        const response = await fetch(fileURI);
        const body = await response.json();
        return body;
    }
    async loadAllFiles() {
        console.log('in loadAllFiles');
        // first step - load the course info
        this.courseInfo = await this.httpfetch("courseinfo.JSON");
        console.log('new lessoninfo', this.courseInfo);
        // now load ALL the course ITag files
        let lesson;
        for (let i = 0; i < this.courseInfo.lessonFiles.length; i++) {
            let name = this.courseInfo.lessonFiles[i];
            console.log('fetching lesson ', name);
            const lessonInfo = await this.httpfetch(name);
            this.lessons.set(name, lessonInfo);
            console.log(this.lessons.get(name));
        }
        // arrgggg..  spent a day trying to make this work, 
        // but all promises fire at the same time and I can't figure
        // how to use Promise.All ...
        // this.courseInfo.lessonFiles.forEach(async (name) => {
        //     const lessonInfo = await this.httpfetch<ITag[]>(name);
        // })
    }
}
async function serverFileSystem(serverURL, sendData) {
    try {
        console.log('posting in postData', JSON.stringify(sendData));
        // Default options are marked with *
        const response = await fetch(serverURL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(sendData),
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }
    catch (error) {
        console.error('error in serverFileSystem');
    }
}
// a simple textarea editor, Grammerly does all the work
class Editor {
    constructor(editorTag) {
        this.initFile = ''; // the file we are editing
        this.isDebug = false;
        this.tagCount = 0;
        this.suggestName = '';
        this.editorTag = editorTag;
        this.save = document.getElementById('save');
        this.load = document.getElementById('load');
        this.run = document.getElementById('run');
        this.debug = document.getElementById('debug');
        this.save.onclick = () => this.doSave();
        this.load.onclick = () => this.doLoad();
        this.run.onclick = () => this.doRun();
        this.debug.onclick = () => this.doDebug();
        this.lessonPage = new _runtime_lessonpage__WEBPACK_IMPORTED_MODULE_1__["LessonPage"]();
    }
    doSave() {
        console.log('in doSave ');
        let area = document.getElementById('tomseditor');
        let text = area.value;
        let data = new Blob([text], { type: 'text/plain' });
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (this.initFile) {
            window.URL.revokeObjectURL(this.initFile);
        }
        this.initFile = window.URL.createObjectURL(data);
        const a = document.createElement("a");
        a.download = this.suggestName; // can only suggest the LAST segment
        a.href = this.initFile;
        a.dispatchEvent(new MouseEvent("click"));
    }
    // use the fileReader to grab a lesson and load it into the textarea
    doLoad() {
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = () => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                let txt = fileReader.result;
                let area = document.getElementById('tomseditor');
                area.value = txt;
                document.getElementById('tomseditor').focus(); // make it the editing focus
                this.isDebug = false;
                this.doRun();
            };
            fileReader.readAsText(input.files[0]);
        };
        input.click();
    }
    doRun() {
        let area = document.getElementById('tomseditor');
        // console.log('doRun',area.value)
        let iTags = new _createSCORM_lessonToITags__WEBPACK_IMPORTED_MODULE_0__["LessonToITags"]().parse('../assets', area.value);
        // console.log('about to run iTags', iTags)
        this.lessonPage.load(iTags, this.isDebug);
        let moduleInfo = this.lessonPage.moduleInfo();
        // console.log('moduleInfo', moduleInfo)
        this.suggestName =
            moduleInfo.module.substr(0, 3) +
                moduleInfo.lesson.substr(0, 3) +
                moduleInfo.module.substr(3) + '.txt';
        let suggestName = document.getElementById('suggestName');
        if (suggestName !== null)
            suggestName.innerHTML = this.suggestName;
    }
    doDebug() {
        this.isDebug = !this.isDebug;
        this.doRun();
    }
    extractItagInfo(iTags) {
        this.tagCount = iTags.length;
        let tagCount = document.getElementById('tagcount');
        if (tagCount !== null)
            tagCount.innerHTML = this.tagCount.toString();
        // suggest a name
        let moduleInfo = this.lessonPage.moduleInfo;
        this.suggestName = moduleInfo().module.substr(0, 3) +
            moduleInfo().lesson.substr(0, 3) +
            moduleInfo().module.substr(4);
        let suggest = document.getElementById('suggestName');
        if (suggest !== null)
            suggest.innerHTML = this.suggestName;
        this.extractItagInfo(iTags);
        let suggestedName = document.getElementById('suggestName');
        if (suggestedName !== null)
            suggestedName.innerHTML = 'SuggestedName';
    }
}
// interface Storage {
//   readonly attribute unsigned long length;
//   DOMString? key(unsigned long index);
//   getter DOMString? getItem(DOMString key);
//   setter void setItem(DOMString key, DOMString value);
//   deleter void removeItem(DOMString key);
//   void clear();
// };
// The getItem(key) method must return the current value associated with the given
// key. If the given key does not exist in the list associated with the object then
// this method must return null.
//
// The setItem(key, value) method must first check if a key/value pair with the
// given key already exists in the list associated with the object.
//
// The removeItem(key) method must cause the key/value pair with the given key to
// be removed from the list associated with the object, if it exists. If no item
// with that key exists, the method must do nothing.
//
// The setItem() and removeItem() methods must be atomic with respect to failure.
// In the case of failure, the method does nothing. That is, changes to the data
// storage area must either be successful, or the data storage area must not be
// changed at all.
//
// The clear() method must atomically cause the list associated with the object to
// be emptied of all key/value pairs, if there are any. If there are none, then the
// method must do nothing.
// class DataServer {
//     public cmd: string
//     public data: string
//     public callback: CallableFunction
//     constructor(cmd: string, data: string, callback: CallableFunction) {
//         this.cmd = cmd
//         this.data = data
//         this.callback = callback
//         $.ajax({
//             method: 'POST',
//             url: 'AJAX.php',
//             data: this.data,
//             success: (data) => {
//                 console.log('in DataServer success(', JSON.parse(data))
//                 this.result = data
//                 this.callback(this.result)
//             }
//         })
//     }
// }
////////////////// fetch api  ///////////////////


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJpc21qcy9wcmlzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjX2VkaXRvci9jcmVhdGVTQ09STS9sZXNzb25Ub0lUYWdzLnRzIiwid2VicGFjazovLy8uL3NyY19lZGl0b3IvcnVudGltZS9BU0NJSU1hdGhNTC50cyIsIndlYnBhY2s6Ly8vLi9zcmNfZWRpdG9yL3J1bnRpbWUvVC50cyIsIndlYnBhY2s6Ly8vLi9zcmNfZWRpdG9yL3J1bnRpbWUvbGVzc29ucGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmNfZWRpdG9yL3J1bnRpbWUvb25DbGlja1NheS50cyIsIndlYnBhY2s6Ly8vLi9zcmNfZWRpdG9yL3J1bnRpbWUvcnVudGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtR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QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFBQTtBQUFBO0FBQUE7QUFBdUI7QUFHdkIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTO0lBQy9FLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7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QUFjLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUUzd0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUUveUIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNueUI7O3NNQUVzTTtBQUV0TSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLENBQUMsRUFDNUQsWUFBWSxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxDQUFDLEVBQUUsVUFBVSxHQUFHLENBQUMsRUFDMUQsU0FBUyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUM1RCxNQUFNLEdBQUcsRUFBRSxFQUFFLGNBQWMsR0FBRyxFQUFFLENBQUMsQ0FBQyxjQUFjO0FBRXBELElBQUksT0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFFcEYsSUFBSSxTQUFTLEdBQWU7SUFDeEIsb0JBQW9CO0lBQ3BCLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3ZFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3RFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzVFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzdFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3RFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3ZFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3pFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3pFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUMxRixFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDN0YsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDckUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDckUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDeEUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDeEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDeEUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDM0UsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDeEUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDMUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDckUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDckUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFFdkUsMEJBQTBCO0lBQzFCLGlFQUFpRTtJQUNqRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN0RSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN0RSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN4RSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNoRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUMxRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN2RSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN4RSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUMxRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUMxRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUMzRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN0RSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtJQUMxRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN0RSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN4RSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN6RSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDcEYsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFDMUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFDM0UsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDeEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFDaEYsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFDOUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFDOUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFFOUUseUJBQXlCO0lBQ3pCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ2pFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ2hFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3ZFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ2hFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3RFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3ZFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3RFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3ZFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3RFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3ZFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3pFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzdFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzdFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3ZFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3pFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBRTNFLGlCQUFpQjtJQUNqQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN0RSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNwRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN2RSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUMxRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNqRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN2RSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN6RSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN6RSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN2RSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN0RSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN6RSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUUxRSxtQkFBbUI7SUFDbkIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7SUFDeEUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7SUFDMUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7SUFDeEUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7SUFDMUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7SUFDckUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFDbkUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDakUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7SUFDdkUsaUVBQWlFO0lBQ2pFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO0lBQy9FLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO0lBQ2hGLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFO0lBQzNFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO0lBQzVFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUU7SUFDeEYsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtJQUV6Rix1QkFBdUI7SUFDdkIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7SUFDM0UsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7SUFDM0UsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7SUFDM0UsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7SUFDM0UsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdkUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDM0UsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDMUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDckUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDckUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDM0UsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDeEUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDeEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDNUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDMUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDeEUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDN0UsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDdkUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtJQUNqRixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN0RSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN4RSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUM3RSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzFGLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3pFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzNFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzNFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDM0UsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUUzRSxvQkFBb0I7SUFDcEIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFDdkUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFDdkUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUMvRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQy9FLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDL0UsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUNqRixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQ2pGLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDakYsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUMvRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQy9FLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDL0UsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUNyRixFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQ3JGLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDckYsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUNqRixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQ2pGLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDakYsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUMvRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUNqRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRTtJQUM3RyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRTtJQUMvRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRTtJQUM3RyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQy9FLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDN0UsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUMvRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNuRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNuRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQy9FLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDL0UsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDbkUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDbkUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFDdkUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7SUFDdkUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUMvRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQy9FLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDL0UsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUNyRixFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQ3JGLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDckYsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUNqRixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQ2pGLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDakYsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUMvRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQy9FLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDL0UsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUMvRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQzdFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7SUFFbEgsUUFBUTtJQUNSLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzVFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzlFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQy9FLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3JFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDbEYsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNyRixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzFGLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzlFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDbkYsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDL0UsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDOUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNuRix3QkFBd0I7SUFDeEIsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDeEUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7SUFDekUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7SUFDdEUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDbEUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7SUFDakYsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7SUFDaEYsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7SUFDbEYsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDakUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDakUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtJQUNwRixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0lBQzFGLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7SUFDcEYsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtJQUMvRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0lBQ2pGLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7SUFDL0YsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtJQUMzRixFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0lBQ3pHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7SUFDdkcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7SUFDdkUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7SUFDdkUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7SUFDdkUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7SUFDbEUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7SUFDckUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFFL0UsV0FBVztJQUNYLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO0lBSXJFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUMzRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDbkgsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ2pILEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUN6SCxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNwSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUMxSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUMzSCxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNySSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7SUFDaEgsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQ3hILEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBQzVILEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFB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SSxPQUFPLEtBQUssSUFBSTtZQUNoQixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXO1FBRXhDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBSTNCLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQzFELElBQUksYUFBYSxLQUFLLElBQUk7WUFDdEIsYUFBYSxDQUFDLFNBQVMsR0FBRyxlQUFlO0lBQ2pELENBQUM7Q0FFSjtBQVNELHNCQUFzQjtBQUN0Qiw2Q0FBNkM7QUFDN0MseUNBQXlDO0FBQ3pDLDhDQUE4QztBQUM5Qyx5REFBeUQ7QUFDekQsNENBQTRDO0FBQzVDLGtCQUFrQjtBQUNsQixLQUFLO0FBRUwsa0ZBQWtGO0FBQ2xGLG1GQUFtRjtBQUNuRixnQ0FBZ0M7QUFDaEMsRUFBRTtBQUNGLCtFQUErRTtBQUMvRSxtRUFBbUU7QUFDbkUsRUFBRTtBQUNGLGlGQUFpRjtBQUNqRixnRkFBZ0Y7QUFDaEYsb0RBQW9EO0FBQ3BELEVBQUU7QUFDRixpRkFBaUY7QUFDakYsZ0ZBQWdGO0FBQ2hGLCtFQUErRTtBQUMvRSxrQkFBa0I7QUFDbEIsRUFBRTtBQUNGLGtGQUFrRjtBQUNsRixtRkFBbUY7QUFDbkYsMEJBQTBCO0FBRTFCLHFCQUFxQjtBQUNyQix5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCLHdDQUF3QztBQUV4QywyRUFBMkU7QUFDM0UseUJBQXlCO0FBQ3pCLDJCQUEyQjtBQUMzQixtQ0FBbUM7QUFDbkMsbUJBQW1CO0FBQ25CLDhCQUE4QjtBQUM5QiwrQkFBK0I7QUFDL0IsK0JBQStCO0FBQy9CLG1DQUFtQztBQUNuQywwRUFBMEU7QUFDMUUscUNBQXFDO0FBQ3JDLDZDQUE2QztBQUM3QyxnQkFBZ0I7QUFDaEIsYUFBYTtBQUNiLFFBQVE7QUFDUixJQUFJO0FBS0osaURBQWlEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3RfZWRpdG9yL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyY19lZGl0b3IvcnVudGltZS9ULnRzXCIpO1xuIiwiLy8gLmRpcm5hbWUsIC5iYXNlbmFtZSwgYW5kIC5leHRuYW1lIG1ldGhvZHMgYXJlIGV4dHJhY3RlZCBmcm9tIE5vZGUuanMgdjguMTEuMSxcbi8vIGJhY2twb3J0ZWQgYW5kIHRyYW5zcGxpdGVkIHdpdGggQmFiZWwsIHdpdGggYmFja3dhcmRzLWNvbXBhdCBmaXhlc1xuXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gcmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIGFycmF5IHdpdGggZGlyZWN0b3J5IG5hbWVzIHRoZXJlXG4vLyBtdXN0IGJlIG5vIHNsYXNoZXMsIGVtcHR5IGVsZW1lbnRzLCBvciBkZXZpY2UgbmFtZXMgKGM6XFwpIGluIHRoZSBhcnJheVxuLy8gKHNvIGFsc28gbm8gbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcyAtIGl0IGRvZXMgbm90IGRpc3Rpbmd1aXNoXG4vLyByZWxhdGl2ZSBhbmQgYWJzb2x1dGUgcGF0aHMpXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGxhc3QgPSBwYXJ0c1tpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzO1xufVxuXG4vLyBwYXRoLnJlc29sdmUoW2Zyb20gLi4uXSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc29sdmVkUGF0aCA9ICcnLFxuICAgICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAtMSAmJiAhcmVzb2x2ZWRBYnNvbHV0ZTsgaS0tKSB7XG4gICAgdmFyIHBhdGggPSAoaSA+PSAwKSA/IGFyZ3VtZW50c1tpXSA6IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAvLyBTa2lwIGVtcHR5IGFuZCBpbnZhbGlkIGVudHJpZXNcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH0gZWxzZSBpZiAoIXBhdGgpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJlc29sdmVkUGF0aCA9IHBhdGggKyAnLycgKyByZXNvbHZlZFBhdGg7XG4gICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IHBhdGguY2hhckF0KDApID09PSAnLyc7XG4gIH1cblxuICAvLyBBdCB0aGlzIHBvaW50IHRoZSBwYXRoIHNob3VsZCBiZSByZXNvbHZlZCB0byBhIGZ1bGwgYWJzb2x1dGUgcGF0aCwgYnV0XG4gIC8vIGhhbmRsZSByZWxhdGl2ZSBwYXRocyB0byBiZSBzYWZlIChtaWdodCBoYXBwZW4gd2hlbiBwcm9jZXNzLmN3ZCgpIGZhaWxzKVxuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICByZXNvbHZlZFBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocmVzb2x2ZWRQYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIXJlc29sdmVkQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICByZXR1cm4gKChyZXNvbHZlZEFic29sdXRlID8gJy8nIDogJycpICsgcmVzb2x2ZWRQYXRoKSB8fCAnLic7XG59O1xuXG4vLyBwYXRoLm5vcm1hbGl6ZShwYXRoKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5ub3JtYWxpemUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHZhciBpc0Fic29sdXRlID0gZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpLFxuICAgICAgdHJhaWxpbmdTbGFzaCA9IHN1YnN0cihwYXRoLCAtMSkgPT09ICcvJztcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihwYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIWlzQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICBpZiAoIXBhdGggJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBwYXRoID0gJy4nO1xuICB9XG4gIGlmIChwYXRoICYmIHRyYWlsaW5nU2xhc2gpIHtcbiAgICBwYXRoICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiAoaXNBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHBhdGg7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmlzQWJzb2x1dGUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5qb2luID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwYXRocyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiBleHBvcnRzLm5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsIGZ1bmN0aW9uKHAsIGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBwICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH0pLmpvaW4oJy8nKSk7XG59O1xuXG5cbi8vIHBhdGgucmVsYXRpdmUoZnJvbSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlbGF0aXZlID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgZnJvbSA9IGV4cG9ydHMucmVzb2x2ZShmcm9tKS5zdWJzdHIoMSk7XG4gIHRvID0gZXhwb3J0cy5yZXNvbHZlKHRvKS5zdWJzdHIoMSk7XG5cbiAgZnVuY3Rpb24gdHJpbShhcnIpIHtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIGZvciAoOyBzdGFydCA8IGFyci5sZW5ndGg7IHN0YXJ0KyspIHtcbiAgICAgIGlmIChhcnJbc3RhcnRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgdmFyIGVuZCA9IGFyci5sZW5ndGggLSAxO1xuICAgIGZvciAoOyBlbmQgPj0gMDsgZW5kLS0pIHtcbiAgICAgIGlmIChhcnJbZW5kXSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0ICsgMSk7XG4gIH1cblxuICB2YXIgZnJvbVBhcnRzID0gdHJpbShmcm9tLnNwbGl0KCcvJykpO1xuICB2YXIgdG9QYXJ0cyA9IHRyaW0odG8uc3BsaXQoJy8nKSk7XG5cbiAgdmFyIGxlbmd0aCA9IE1hdGgubWluKGZyb21QYXJ0cy5sZW5ndGgsIHRvUGFydHMubGVuZ3RoKTtcbiAgdmFyIHNhbWVQYXJ0c0xlbmd0aCA9IGxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChmcm9tUGFydHNbaV0gIT09IHRvUGFydHNbaV0pIHtcbiAgICAgIHNhbWVQYXJ0c0xlbmd0aCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgb3V0cHV0UGFydHMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IHNhbWVQYXJ0c0xlbmd0aDsgaSA8IGZyb21QYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIG91dHB1dFBhcnRzLnB1c2goJy4uJyk7XG4gIH1cblxuICBvdXRwdXRQYXJ0cyA9IG91dHB1dFBhcnRzLmNvbmNhdCh0b1BhcnRzLnNsaWNlKHNhbWVQYXJ0c0xlbmd0aCkpO1xuXG4gIHJldHVybiBvdXRwdXRQYXJ0cy5qb2luKCcvJyk7XG59O1xuXG5leHBvcnRzLnNlcCA9ICcvJztcbmV4cG9ydHMuZGVsaW1pdGVyID0gJzonO1xuXG5leHBvcnRzLmRpcm5hbWUgPSBmdW5jdGlvbiAocGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSBwYXRoID0gcGF0aCArICcnO1xuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiAnLic7XG4gIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KDApO1xuICB2YXIgaGFzUm9vdCA9IGNvZGUgPT09IDQ3IC8qLyovO1xuICB2YXIgZW5kID0gLTE7XG4gIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICBmb3IgKHZhciBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDE7IC0taSkge1xuICAgIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgZW5kID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yXG4gICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoZW5kID09PSAtMSkgcmV0dXJuIGhhc1Jvb3QgPyAnLycgOiAnLic7XG4gIGlmIChoYXNSb290ICYmIGVuZCA9PT0gMSkge1xuICAgIC8vIHJldHVybiAnLy8nO1xuICAgIC8vIEJhY2t3YXJkcy1jb21wYXQgZml4OlxuICAgIHJldHVybiAnLyc7XG4gIH1cbiAgcmV0dXJuIHBhdGguc2xpY2UoMCwgZW5kKTtcbn07XG5cbmZ1bmN0aW9uIGJhc2VuYW1lKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykgcGF0aCA9IHBhdGggKyAnJztcblxuICB2YXIgc3RhcnQgPSAwO1xuICB2YXIgZW5kID0gLTE7XG4gIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICB2YXIgaTtcblxuICBmb3IgKGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgaWYgKHBhdGguY2hhckNvZGVBdChpKSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAvLyBwYXRoIGNvbXBvbmVudFxuICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgICBlbmQgPSBpICsgMTtcbiAgICB9XG4gIH1cblxuICBpZiAoZW5kID09PSAtMSkgcmV0dXJuICcnO1xuICByZXR1cm4gcGF0aC5zbGljZShzdGFydCwgZW5kKTtcbn1cblxuLy8gVXNlcyBhIG1peGVkIGFwcHJvYWNoIGZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSwgYXMgZXh0IGJlaGF2aW9yIGNoYW5nZWRcbi8vIGluIG5ldyBOb2RlLmpzIHZlcnNpb25zLCBzbyBvbmx5IGJhc2VuYW1lKCkgYWJvdmUgaXMgYmFja3BvcnRlZCBoZXJlXG5leHBvcnRzLmJhc2VuYW1lID0gZnVuY3Rpb24gKHBhdGgsIGV4dCkge1xuICB2YXIgZiA9IGJhc2VuYW1lKHBhdGgpO1xuICBpZiAoZXh0ICYmIGYuc3Vic3RyKC0xICogZXh0Lmxlbmd0aCkgPT09IGV4dCkge1xuICAgIGYgPSBmLnN1YnN0cigwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpO1xuICB9XG4gIHJldHVybiBmO1xufTtcblxuZXhwb3J0cy5leHRuYW1lID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykgcGF0aCA9IHBhdGggKyAnJztcbiAgdmFyIHN0YXJ0RG90ID0gLTE7XG4gIHZhciBzdGFydFBhcnQgPSAwO1xuICB2YXIgZW5kID0gLTE7XG4gIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICAvLyBUcmFjayB0aGUgc3RhdGUgb2YgY2hhcmFjdGVycyAoaWYgYW55KSB3ZSBzZWUgYmVmb3JlIG91ciBmaXJzdCBkb3QgYW5kXG4gIC8vIGFmdGVyIGFueSBwYXRoIHNlcGFyYXRvciB3ZSBmaW5kXG4gIHZhciBwcmVEb3RTdGF0ZSA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xuICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgIHN0YXJ0UGFydCA9IGkgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAvLyBleHRlbnNpb25cbiAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgZW5kID0gaSArIDE7XG4gICAgfVxuICAgIGlmIChjb2RlID09PSA0NiAvKi4qLykge1xuICAgICAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBkb3QsIG1hcmsgaXQgYXMgdGhlIHN0YXJ0IG9mIG91ciBleHRlbnNpb25cbiAgICAgICAgaWYgKHN0YXJ0RG90ID09PSAtMSlcbiAgICAgICAgICBzdGFydERvdCA9IGk7XG4gICAgICAgIGVsc2UgaWYgKHByZURvdFN0YXRlICE9PSAxKVxuICAgICAgICAgIHByZURvdFN0YXRlID0gMTtcbiAgICB9IGVsc2UgaWYgKHN0YXJ0RG90ICE9PSAtMSkge1xuICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBhbmQgbm9uLXBhdGggc2VwYXJhdG9yIGJlZm9yZSBvdXIgZG90LCBzbyB3ZSBzaG91bGRcbiAgICAgIC8vIGhhdmUgYSBnb29kIGNoYW5jZSBhdCBoYXZpbmcgYSBub24tZW1wdHkgZXh0ZW5zaW9uXG4gICAgICBwcmVEb3RTdGF0ZSA9IC0xO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdGFydERvdCA9PT0gLTEgfHwgZW5kID09PSAtMSB8fFxuICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBjaGFyYWN0ZXIgaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBkb3RcbiAgICAgIHByZURvdFN0YXRlID09PSAwIHx8XG4gICAgICAvLyBUaGUgKHJpZ2h0LW1vc3QpIHRyaW1tZWQgcGF0aCBjb21wb25lbnQgaXMgZXhhY3RseSAnLi4nXG4gICAgICBwcmVEb3RTdGF0ZSA9PT0gMSAmJiBzdGFydERvdCA9PT0gZW5kIC0gMSAmJiBzdGFydERvdCA9PT0gc3RhcnRQYXJ0ICsgMSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gcGF0aC5zbGljZShzdGFydERvdCwgZW5kKTtcbn07XG5cbmZ1bmN0aW9uIGZpbHRlciAoeHMsIGYpIHtcbiAgICBpZiAoeHMuZmlsdGVyKSByZXR1cm4geHMuZmlsdGVyKGYpO1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmKHhzW2ldLCBpLCB4cykpIHJlcy5wdXNoKHhzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHIgLSBuZWdhdGl2ZSBpbmRleCBkb24ndCB3b3JrIGluIElFOFxudmFyIHN1YnN0ciA9ICdhYicuc3Vic3RyKC0xKSA9PT0gJ2InXG4gICAgPyBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7IHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pIH1cbiAgICA6IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHtcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSBzdHIubGVuZ3RoICsgc3RhcnQ7XG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pO1xuICAgIH1cbjtcbiIsIlxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICBCZWdpbiBwcmlzbS1jb3JlLmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbi8vLyA8cmVmZXJlbmNlIGxpYj1cIldlYldvcmtlclwiLz5cblxudmFyIF9zZWxmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXHQ/IHdpbmRvdyAgIC8vIGlmIGluIGJyb3dzZXJcblx0OiAoXG5cdFx0KHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKVxuXHRcdFx0PyBzZWxmIC8vIGlmIGluIHdvcmtlclxuXHRcdFx0OiB7fSAgIC8vIGlmIGluIG5vZGUganNcblx0KTtcblxuLyoqXG4gKiBQcmlzbTogTGlnaHR3ZWlnaHQsIHJvYnVzdCwgZWxlZ2FudCBzeW50YXggaGlnaGxpZ2h0aW5nXG4gKlxuICogQGxpY2Vuc2UgTUlUIDxodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVD5cbiAqIEBhdXRob3IgTGVhIFZlcm91IDxodHRwczovL2xlYS52ZXJvdS5tZT5cbiAqIEBuYW1lc3BhY2VcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFByaXNtID0gKGZ1bmN0aW9uIChfc2VsZikge1xuXG5cdC8vIFByaXZhdGUgaGVscGVyIHZhcnNcblx0dmFyIGxhbmcgPSAvXFxibGFuZyg/OnVhZ2UpPy0oW1xcdy1dKylcXGIvaTtcblx0dmFyIHVuaXF1ZUlkID0gMDtcblxuXHQvLyBUaGUgZ3JhbW1hciBvYmplY3QgZm9yIHBsYWludGV4dFxuXHR2YXIgcGxhaW5UZXh0R3JhbW1hciA9IHt9O1xuXG5cblx0dmFyIF8gPSB7XG5cdFx0LyoqXG5cdFx0ICogQnkgZGVmYXVsdCwgUHJpc20gd2lsbCBhdHRlbXB0IHRvIGhpZ2hsaWdodCBhbGwgY29kZSBlbGVtZW50cyAoYnkgY2FsbGluZyB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0QWxsfSkgb24gdGhlXG5cdFx0ICogY3VycmVudCBwYWdlIGFmdGVyIHRoZSBwYWdlIGZpbmlzaGVkIGxvYWRpbmcuIFRoaXMgbWlnaHQgYmUgYSBwcm9ibGVtIGlmIGUuZy4geW91IHdhbnRlZCB0byBhc3luY2hyb25vdXNseSBsb2FkXG5cdFx0ICogYWRkaXRpb25hbCBsYW5ndWFnZXMgb3IgcGx1Z2lucyB5b3Vyc2VsZi5cblx0XHQgKlxuXHRcdCAqIEJ5IHNldHRpbmcgdGhpcyB2YWx1ZSB0byBgdHJ1ZWAsIFByaXNtIHdpbGwgbm90IGF1dG9tYXRpY2FsbHkgaGlnaGxpZ2h0IGFsbCBjb2RlIGVsZW1lbnRzIG9uIHRoZSBwYWdlLlxuXHRcdCAqXG5cdFx0ICogWW91IG9idmlvdXNseSBoYXZlIHRvIGNoYW5nZSB0aGlzIHZhbHVlIGJlZm9yZSB0aGUgYXV0b21hdGljIGhpZ2hsaWdodGluZyBzdGFydGVkLiBUbyBkbyB0aGlzLCB5b3UgY2FuIGFkZCBhblxuXHRcdCAqIGVtcHR5IFByaXNtIG9iamVjdCBpbnRvIHRoZSBnbG9iYWwgc2NvcGUgYmVmb3JlIGxvYWRpbmcgdGhlIFByaXNtIHNjcmlwdCBsaWtlIHRoaXM6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqIHdpbmRvdy5QcmlzbSA9IHdpbmRvdy5QcmlzbSB8fCB7fTtcblx0XHQgKiBQcmlzbS5tYW51YWwgPSB0cnVlO1xuXHRcdCAqIC8vIGFkZCBhIG5ldyA8c2NyaXB0PiB0byBsb2FkIFByaXNtJ3Mgc2NyaXB0XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxuXHRcdCAqIEB0eXBlIHtib29sZWFufVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRtYW51YWw6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLm1hbnVhbCxcblx0XHRkaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXI6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcixcblxuXHRcdC8qKlxuXHRcdCAqIEEgbmFtZXNwYWNlIGZvciB1dGlsaXR5IG1ldGhvZHMuXG5cdFx0ICpcblx0XHQgKiBBbGwgZnVuY3Rpb24gaW4gdGhpcyBuYW1lc3BhY2UgdGhhdCBhcmUgbm90IGV4cGxpY2l0bHkgbWFya2VkIGFzIF9wdWJsaWNfIGFyZSBmb3IgX19pbnRlcm5hbCB1c2Ugb25seV9fIGFuZCBtYXlcblx0XHQgKiBjaGFuZ2Ugb3IgZGlzYXBwZWFyIGF0IGFueSB0aW1lLlxuXHRcdCAqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqL1xuXHRcdHV0aWw6IHtcblx0XHRcdGVuY29kZTogZnVuY3Rpb24gZW5jb2RlKHRva2Vucykge1xuXHRcdFx0XHRpZiAodG9rZW5zIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFRva2VuKHRva2Vucy50eXBlLCBlbmNvZGUodG9rZW5zLmNvbnRlbnQpLCB0b2tlbnMuYWxpYXMpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodG9rZW5zKSkge1xuXHRcdFx0XHRcdHJldHVybiB0b2tlbnMubWFwKGVuY29kZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRva2Vucy5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC9cXHUwMGEwL2csICcgJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgdHlwZSBvZiB0aGUgZ2l2ZW4gdmFsdWUuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHthbnl9IG9cblx0XHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogdHlwZShudWxsKSAgICAgID09PSAnTnVsbCdcblx0XHRcdCAqIHR5cGUodW5kZWZpbmVkKSA9PT0gJ1VuZGVmaW5lZCdcblx0XHRcdCAqIHR5cGUoMTIzKSAgICAgICA9PT0gJ051bWJlcidcblx0XHRcdCAqIHR5cGUoJ2ZvbycpICAgICA9PT0gJ1N0cmluZydcblx0XHRcdCAqIHR5cGUodHJ1ZSkgICAgICA9PT0gJ0Jvb2xlYW4nXG5cdFx0XHQgKiB0eXBlKFsxLCAyXSkgICAgPT09ICdBcnJheSdcblx0XHRcdCAqIHR5cGUoe30pICAgICAgICA9PT0gJ09iamVjdCdcblx0XHRcdCAqIHR5cGUoU3RyaW5nKSAgICA9PT0gJ0Z1bmN0aW9uJ1xuXHRcdFx0ICogdHlwZSgvYWJjKy8pICAgID09PSAnUmVnRXhwJ1xuXHRcdFx0ICovXG5cdFx0XHR0eXBlOiBmdW5jdGlvbiAobykge1xuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyBhIHVuaXF1ZSBudW1iZXIgZm9yIHRoZSBnaXZlbiBvYmplY3QuIExhdGVyIGNhbGxzIHdpbGwgc3RpbGwgcmV0dXJuIHRoZSBzYW1lIG51bWJlci5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdFx0XHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHRcdFx0ICovXG5cdFx0XHRvYmpJZDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0XHRpZiAoIW9ialsnX19pZCddKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19faWQnLCB7IHZhbHVlOiArK3VuaXF1ZUlkIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvYmpbJ19faWQnXTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlcyBhIGRlZXAgY2xvbmUgb2YgdGhlIGdpdmVuIG9iamVjdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgbWFpbiBpbnRlbmRlZCB1c2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyB0byBjbG9uZSBsYW5ndWFnZSBkZWZpbml0aW9ucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge1R9IG9cblx0XHRcdCAqIEBwYXJhbSB7UmVjb3JkPG51bWJlciwgYW55Pn0gW3Zpc2l0ZWRdXG5cdFx0XHQgKiBAcmV0dXJucyB7VH1cblx0XHRcdCAqIEB0ZW1wbGF0ZSBUXG5cdFx0XHQgKi9cblx0XHRcdGNsb25lOiBmdW5jdGlvbiBkZWVwQ2xvbmUobywgdmlzaXRlZCkge1xuXHRcdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0XHR2YXIgY2xvbmU7IHZhciBpZDtcblx0XHRcdFx0c3dpdGNoIChfLnV0aWwudHlwZShvKSkge1xuXHRcdFx0XHRcdGNhc2UgJ09iamVjdCc6XG5cdFx0XHRcdFx0XHRpZCA9IF8udXRpbC5vYmpJZChvKTtcblx0XHRcdFx0XHRcdGlmICh2aXNpdGVkW2lkXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmlzaXRlZFtpZF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9uZSA9IC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gKi8gKHt9KTtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbaWRdID0gY2xvbmU7XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBvKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdFx0XHRjbG9uZVtrZXldID0gZGVlcENsb25lKG9ba2V5XSwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoY2xvbmUpO1xuXG5cdFx0XHRcdFx0Y2FzZSAnQXJyYXknOlxuXHRcdFx0XHRcdFx0aWQgPSBfLnV0aWwub2JqSWQobyk7XG5cdFx0XHRcdFx0XHRpZiAodmlzaXRlZFtpZF0pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZpc2l0ZWRbaWRdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2xvbmUgPSBbXTtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbaWRdID0gY2xvbmU7XG5cblx0XHRcdFx0XHRcdCgvKiogQHR5cGUge0FycmF5fSAqLygvKiogQHR5cGUge2FueX0gKi8obykpKS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lW2ldID0gZGVlcENsb25lKHYsIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdHJldHVybiAvKiogQHR5cGUge2FueX0gKi8gKGNsb25lKTtcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gbztcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBQcmlzbSBsYW5ndWFnZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudCBzZXQgYnkgYSBgbGFuZ3VhZ2UteHh4eGAgb3IgYGxhbmcteHh4eGAgY2xhc3MuXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgbm8gbGFuZ3VhZ2UgaXMgc2V0IGZvciB0aGUgZWxlbWVudCBvciB0aGUgZWxlbWVudCBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAsIGBub25lYCB3aWxsIGJlIHJldHVybmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdFx0ICogQHJldHVybnMge3N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0Z2V0TGFuZ3VhZ2U6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRcdHdoaWxlIChlbGVtZW50ICYmICFsYW5nLnRlc3QoZWxlbWVudC5jbGFzc05hbWUpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZWxlbWVudCkge1xuXHRcdFx0XHRcdHJldHVybiAoZWxlbWVudC5jbGFzc05hbWUubWF0Y2gobGFuZykgfHwgWywgJ25vbmUnXSlbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gJ25vbmUnO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBzY3JpcHQgZWxlbWVudCB0aGF0IGlzIGN1cnJlbnRseSBleGVjdXRpbmcuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBkb2VzIF9fbm90X18gd29yayBmb3IgbGluZSBzY3JpcHQgZWxlbWVudC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJucyB7SFRNTFNjcmlwdEVsZW1lbnQgfCBudWxsfVxuXHRcdFx0ICovXG5cdFx0XHRjdXJyZW50U2NyaXB0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCdjdXJyZW50U2NyaXB0JyBpbiBkb2N1bWVudCAmJiAxIDwgMiAvKiBoYWNrIHRvIHRyaXAgVFMnIGZsb3cgYW5hbHlzaXMgKi8pIHtcblx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElFMTEgd29ya2Fyb3VuZFxuXHRcdFx0XHQvLyB3ZSdsbCBnZXQgdGhlIHNyYyBvZiB0aGUgY3VycmVudCBzY3JpcHQgYnkgcGFyc2luZyBJRTExJ3MgZXJyb3Igc3RhY2sgdHJhY2Vcblx0XHRcdFx0Ly8gdGhpcyB3aWxsIG5vdCB3b3JrIGZvciBpbmxpbmUgc2NyaXB0c1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdC8vIEdldCBmaWxlIHNyYyB1cmwgZnJvbSBzdGFjay4gU3BlY2lmaWNhbGx5IHdvcmtzIHdpdGggdGhlIGZvcm1hdCBvZiBzdGFjayB0cmFjZXMgaW4gSUUuXG5cdFx0XHRcdFx0Ly8gQSBzdGFjayB3aWxsIGxvb2sgbGlrZSB0aGlzOlxuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0Ly8gRXJyb3Jcblx0XHRcdFx0XHQvLyAgICBhdCBfLnV0aWwuY3VycmVudFNjcmlwdCAoaHR0cDovL2xvY2FsaG9zdC9jb21wb25lbnRzL3ByaXNtLWNvcmUuanM6MTE5OjUpXG5cdFx0XHRcdFx0Ly8gICAgYXQgR2xvYmFsIGNvZGUgKGh0dHA6Ly9sb2NhbGhvc3QvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzOjYwNjoxKVxuXG5cdFx0XHRcdFx0dmFyIHNyYyA9ICgvYXQgW14oXFxyXFxuXSpcXCgoLiopOi4rOi4rXFwpJC9pLmV4ZWMoZXJyLnN0YWNrKSB8fCBbXSlbMV07XG5cdFx0XHRcdFx0aWYgKHNyYykge1xuXHRcdFx0XHRcdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpIGluIHNjcmlwdHMpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHNjcmlwdHNbaV0uc3JjID09IHNyYykge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBzY3JpcHRzW2ldO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgd2hldGhlciBhIGdpdmVuIGNsYXNzIGlzIGFjdGl2ZSBmb3IgYGVsZW1lbnRgLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBjbGFzcyBjYW4gYmUgYWN0aXZhdGVkIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIGdpdmVuIGNsYXNzIGFuZCBpdCBjYW4gYmUgZGVhY3RpdmF0ZWRcblx0XHRcdCAqIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gY2xhc3MuIFRoZSBfbmVnYXRlZCB2ZXJzaW9uXyBvZiB0aGVcblx0XHRcdCAqIGdpdmVuIGNsYXNzIGlzIGp1c3QgdGhlIGdpdmVuIGNsYXNzIHdpdGggYSBgbm8tYCBwcmVmaXguXG5cdFx0XHQgKlxuXHRcdFx0ICogV2hldGhlciB0aGUgY2xhc3MgaXMgYWN0aXZlIGlzIGRldGVybWluZWQgYnkgdGhlIGNsb3Nlc3QgYW5jZXN0b3Igb2YgYGVsZW1lbnRgICh3aGVyZSBgZWxlbWVudGAgaXRzZWxmIGlzXG5cdFx0XHQgKiBjbG9zZXN0IGFuY2VzdG9yKSB0aGF0IGhhcyB0aGUgZ2l2ZW4gY2xhc3Mgb3IgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiBpdC4gSWYgbmVpdGhlciBgZWxlbWVudGAgbm9yIGFueSBvZiBpdHNcblx0XHRcdCAqIGFuY2VzdG9ycyBoYXZlIHRoZSBnaXZlbiBjbGFzcyBvciB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIGl0LCB0aGVuIHRoZSBkZWZhdWx0IGFjdGl2YXRpb24gd2lsbCBiZSByZXR1cm5lZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBJbiB0aGUgcGFyYWRveGljYWwgc2l0dWF0aW9uIHdoZXJlIHRoZSBjbG9zZXN0IGFuY2VzdG9yIGNvbnRhaW5zIF9fYm90aF9fIHRoZSBnaXZlbiBjbGFzcyBhbmQgdGhlIG5lZ2F0ZWRcblx0XHRcdCAqIHZlcnNpb24gb2YgaXQsIHRoZSBjbGFzcyBpcyBjb25zaWRlcmVkIGFjdGl2ZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcblx0XHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlZmF1bHRBY3RpdmF0aW9uPWZhbHNlXVxuXHRcdFx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdFx0XHQgKi9cblx0XHRcdGlzQWN0aXZlOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lLCBkZWZhdWx0QWN0aXZhdGlvbikge1xuXHRcdFx0XHR2YXIgbm8gPSAnbm8tJyArIGNsYXNzTmFtZTtcblxuXHRcdFx0XHR3aGlsZSAoZWxlbWVudCkge1xuXHRcdFx0XHRcdHZhciBjbGFzc0xpc3QgPSBlbGVtZW50LmNsYXNzTGlzdDtcblx0XHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKG5vKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAhIWRlZmF1bHRBY3RpdmF0aW9uO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBUaGlzIG5hbWVzcGFjZSBjb250YWlucyBhbGwgY3VycmVudGx5IGxvYWRlZCBsYW5ndWFnZXMgYW5kIHRoZSBzb21lIGhlbHBlciBmdW5jdGlvbnMgdG8gY3JlYXRlIGFuZCBtb2RpZnkgbGFuZ3VhZ2VzLlxuXHRcdCAqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRsYW5ndWFnZXM6IHtcblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIGdyYW1tYXIgZm9yIHBsYWluLCB1bmZvcm1hdHRlZCB0ZXh0LlxuXHRcdFx0ICovXG5cdFx0XHRwbGFpbjogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHBsYWludGV4dDogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHRleHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cdFx0XHR0eHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlcyBhIGRlZXAgY29weSBvZiB0aGUgbGFuZ3VhZ2Ugd2l0aCB0aGUgZ2l2ZW4gaWQgYW5kIGFwcGVuZHMgdGhlIGdpdmVuIHRva2Vucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBJZiBhIHRva2VuIGluIGByZWRlZmAgYWxzbyBhcHBlYXJzIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2UsIHRoZW4gdGhlIGV4aXN0aW5nIHRva2VuIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2Vcblx0XHRcdCAqIHdpbGwgYmUgb3ZlcndyaXR0ZW4gYXQgaXRzIG9yaWdpbmFsIHBvc2l0aW9uLlxuXHRcdFx0ICpcblx0XHRcdCAqICMjIEJlc3QgcHJhY3RpY2VzXG5cdFx0XHQgKlxuXHRcdFx0ICogU2luY2UgdGhlIHBvc2l0aW9uIG9mIG92ZXJ3cml0aW5nIHRva2VucyAodG9rZW4gaW4gYHJlZGVmYCB0aGF0IG92ZXJ3cml0ZSB0b2tlbnMgaW4gdGhlIGNvcGllZCBsYW5ndWFnZSlcblx0XHRcdCAqIGRvZXNuJ3QgbWF0dGVyLCB0aGV5IGNhbiB0ZWNobmljYWxseSBiZSBpbiBhbnkgb3JkZXIuIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIGNvbmZ1c2luZyB0byBvdGhlcnMgdGhhdCB0cnlpbmcgdG9cblx0XHRcdCAqIHVuZGVyc3RhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gYmVjYXVzZSwgbm9ybWFsbHksIHRoZSBvcmRlciBvZiB0b2tlbnMgbWF0dGVycyBpbiBQcmlzbSBncmFtbWFycy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGVyZWZvcmUsIGl0IGlzIGVuY291cmFnZWQgdG8gb3JkZXIgb3ZlcndyaXRpbmcgdG9rZW5zIGFjY29yZGluZyB0byB0aGUgcG9zaXRpb25zIG9mIHRoZSBvdmVyd3JpdHRlbiB0b2tlbnMuXG5cdFx0XHQgKiBGdXJ0aGVybW9yZSwgYWxsIG5vbi1vdmVyd3JpdGluZyB0b2tlbnMgc2hvdWxkIGJlIHBsYWNlZCBhZnRlciB0aGUgb3ZlcndyaXRpbmcgb25lcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBsYW5ndWFnZSB0byBleHRlbmQuIFRoaXMgaGFzIHRvIGJlIGEga2V5IGluIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdFx0ICogQHBhcmFtIHtHcmFtbWFyfSByZWRlZiBUaGUgbmV3IHRva2VucyB0byBhcHBlbmQuXG5cdFx0XHQgKiBAcmV0dXJucyB7R3JhbW1hcn0gVGhlIG5ldyBsYW5ndWFnZSBjcmVhdGVkLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlc1snY3NzLXdpdGgtY29sb3JzJ10gPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjc3MnLCB7XG5cdFx0XHQgKiAgICAgLy8gUHJpc20ubGFuZ3VhZ2VzLmNzcyBhbHJlYWR5IGhhcyBhICdjb21tZW50JyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIG92ZXJ3cml0ZSBDU1MnICdjb21tZW50JyB0b2tlblxuXHRcdFx0ICogICAgIC8vIGF0IGl0cyBvcmlnaW5hbCBwb3NpdGlvblxuXHRcdFx0ICogICAgICdjb21tZW50JzogeyAuLi4gfSxcblx0XHRcdCAqICAgICAvLyBDU1MgZG9lc24ndCBoYXZlIGEgJ2NvbG9yJyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIGJlIGFwcGVuZGVkXG5cdFx0XHQgKiAgICAgJ2NvbG9yJzogL1xcYig/OnJlZHxncmVlbnxibHVlKVxcYi9cblx0XHRcdCAqIH0pO1xuXHRcdFx0ICovXG5cdFx0XHRleHRlbmQ6IGZ1bmN0aW9uIChpZCwgcmVkZWYpIHtcblx0XHRcdFx0dmFyIGxhbmcgPSBfLnV0aWwuY2xvbmUoXy5sYW5ndWFnZXNbaWRdKTtcblxuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gcmVkZWYpIHtcblx0XHRcdFx0XHRsYW5nW2tleV0gPSByZWRlZltrZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGxhbmc7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEluc2VydHMgdG9rZW5zIF9iZWZvcmVfIGFub3RoZXIgdG9rZW4gaW4gYSBsYW5ndWFnZSBkZWZpbml0aW9uIG9yIGFueSBvdGhlciBncmFtbWFyLlxuXHRcdFx0ICpcblx0XHRcdCAqICMjIFVzYWdlXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBoZWxwZXIgbWV0aG9kIG1ha2VzIGl0IGVhc3kgdG8gbW9kaWZ5IGV4aXN0aW5nIGxhbmd1YWdlcy4gRm9yIGV4YW1wbGUsIHRoZSBDU1MgbGFuZ3VhZ2UgZGVmaW5pdGlvblxuXHRcdFx0ICogbm90IG9ubHkgZGVmaW5lcyBDU1MgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZG9jdW1lbnRzLCBidXQgYWxzbyBuZWVkcyB0byBkZWZpbmUgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZW1iZWRkZWRcblx0XHRcdCAqIGluIEhUTUwgdGhyb3VnaCBgPHN0eWxlPmAgZWxlbWVudHMuIFRvIGRvIHRoaXMsIGl0IG5lZWRzIHRvIG1vZGlmeSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAgYW5kIGFkZCB0aGVcblx0XHRcdCAqIGFwcHJvcHJpYXRlIHRva2Vucy4gSG93ZXZlciwgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgIGlzIGEgcmVndWxhciBKYXZhU2NyaXB0IG9iamVjdCBsaXRlcmFsLCBzbyBpZiB5b3UgZG9cblx0XHRcdCAqIHRoaXM6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuc3R5bGUgPSB7XG5cdFx0XHQgKiAgICAgLy8gdG9rZW5cblx0XHRcdCAqIH07XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiB0aGVuIHRoZSBgc3R5bGVgIHRva2VuIHdpbGwgYmUgYWRkZWQgKGFuZCBwcm9jZXNzZWQpIGF0IHRoZSBlbmQuIGBpbnNlcnRCZWZvcmVgIGFsbG93cyB5b3UgdG8gaW5zZXJ0IHRva2Vuc1xuXHRcdFx0ICogYmVmb3JlIGV4aXN0aW5nIHRva2Vucy4gRm9yIHRoZSBDU1MgZXhhbXBsZSBhYm92ZSwgeW91IHdvdWxkIHVzZSBpdCBsaWtlIHRoaXM6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjZGF0YScsIHtcblx0XHRcdCAqICAgICAnc3R5bGUnOiB7XG5cdFx0XHQgKiAgICAgICAgIC8vIHRva2VuXG5cdFx0XHQgKiAgICAgfVxuXHRcdFx0ICogfSk7XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiAjIyBTcGVjaWFsIGNhc2VzXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgdGhlIGdyYW1tYXJzIG9mIGBpbnNpZGVgIGFuZCBgaW5zZXJ0YCBoYXZlIHRva2VucyB3aXRoIHRoZSBzYW1lIG5hbWUsIHRoZSB0b2tlbnMgaW4gYGluc2lkZWAncyBncmFtbWFyXG5cdFx0XHQgKiB3aWxsIGJlIGlnbm9yZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBiZWhhdmlvciBjYW4gYmUgdXNlZCB0byBpbnNlcnQgdG9rZW5zIGFmdGVyIGBiZWZvcmVgOlxuXHRcdFx0ICpcblx0XHRcdCAqIGBgYGpzXG5cdFx0XHQgKiBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY29tbWVudCcsIHtcblx0XHRcdCAqICAgICAnY29tbWVudCc6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuY29tbWVudCxcblx0XHRcdCAqICAgICAvLyB0b2tlbnMgYWZ0ZXIgJ2NvbW1lbnQnXG5cdFx0XHQgKiB9KTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqICMjIExpbWl0YXRpb25zXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhlIG1haW4gcHJvYmxlbSBgaW5zZXJ0QmVmb3JlYCBoYXMgdG8gc29sdmUgaXMgaXRlcmF0aW9uIG9yZGVyLiBTaW5jZSBFUzIwMTUsIHRoZSBpdGVyYXRpb24gb3JkZXIgZm9yIG9iamVjdFxuXHRcdFx0ICogcHJvcGVydGllcyBpcyBndWFyYW50ZWVkIHRvIGJlIHRoZSBpbnNlcnRpb24gb3JkZXIgKGV4Y2VwdCBmb3IgaW50ZWdlciBrZXlzKSBidXQgc29tZSBicm93c2VycyBiZWhhdmVcblx0XHRcdCAqIGRpZmZlcmVudGx5IHdoZW4ga2V5cyBhcmUgZGVsZXRlZCBhbmQgcmUtaW5zZXJ0ZWQuIFNvIGBpbnNlcnRCZWZvcmVgIGNhbid0IGJlIGltcGxlbWVudGVkIGJ5IHRlbXBvcmFyaWx5XG5cdFx0XHQgKiBkZWxldGluZyBwcm9wZXJ0aWVzIHdoaWNoIGlzIG5lY2Vzc2FyeSB0byBpbnNlcnQgYXQgYXJiaXRyYXJ5IHBvc2l0aW9ucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUbyBzb2x2ZSB0aGlzIHByb2JsZW0sIGBpbnNlcnRCZWZvcmVgIGRvZXNuJ3QgYWN0dWFsbHkgaW5zZXJ0IHRoZSBnaXZlbiB0b2tlbnMgaW50byB0aGUgdGFyZ2V0IG9iamVjdC5cblx0XHRcdCAqIEluc3RlYWQsIGl0IHdpbGwgY3JlYXRlIGEgbmV3IG9iamVjdCBhbmQgcmVwbGFjZSBhbGwgcmVmZXJlbmNlcyB0byB0aGUgdGFyZ2V0IG9iamVjdCB3aXRoIHRoZSBuZXcgb25lLiBUaGlzXG5cdFx0XHQgKiBjYW4gYmUgZG9uZSB3aXRob3V0IHRlbXBvcmFyaWx5IGRlbGV0aW5nIHByb3BlcnRpZXMsIHNvIHRoZSBpdGVyYXRpb24gb3JkZXIgaXMgd2VsbC1kZWZpbmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEhvd2V2ZXIsIG9ubHkgcmVmZXJlbmNlcyB0aGF0IGNhbiBiZSByZWFjaGVkIGZyb20gYFByaXNtLmxhbmd1YWdlc2Agb3IgYGluc2VydGAgd2lsbCBiZSByZXBsYWNlZC4gSS5lLiBpZlxuXHRcdFx0ICogeW91IGhvbGQgdGhlIHRhcmdldCBvYmplY3QgaW4gYSB2YXJpYWJsZSwgdGhlbiB0aGUgdmFsdWUgb2YgdGhlIHZhcmlhYmxlIHdpbGwgbm90IGNoYW5nZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogdmFyIG9sZE1hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cdFx0XHQgKiB2YXIgbmV3TWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NvbW1lbnQnLCB7IC4uLiB9KTtcblx0XHRcdCAqXG5cdFx0XHQgKiBhc3NlcnQob2xkTWFya3VwICE9PSBQcmlzbS5sYW5ndWFnZXMubWFya3VwKTtcblx0XHRcdCAqIGFzc2VydChuZXdNYXJrdXAgPT09IFByaXNtLmxhbmd1YWdlcy5tYXJrdXApO1xuXHRcdFx0ICogYGBgXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGluc2lkZSBUaGUgcHJvcGVydHkgb2YgYHJvb3RgIChlLmcuIGEgbGFuZ3VhZ2UgaWQgaW4gYFByaXNtLmxhbmd1YWdlc2ApIHRoYXQgY29udGFpbnMgdGhlXG5cdFx0XHQgKiBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gYmVmb3JlIFRoZSBrZXkgdG8gaW5zZXJ0IGJlZm9yZS5cblx0XHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gaW5zZXJ0IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBrZXktdmFsdWUgcGFpcnMgdG8gYmUgaW5zZXJ0ZWQuXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IFtyb290XSBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgYGluc2lkZWAsIGkuZS4gdGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuXHRcdFx0ICogb2JqZWN0IHRvIGJlIG1vZGlmaWVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIERlZmF1bHRzIHRvIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdFx0ICogQHJldHVybnMge0dyYW1tYXJ9IFRoZSBuZXcgZ3JhbW1hciBvYmplY3QuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGluc2lkZSwgYmVmb3JlLCBpbnNlcnQsIHJvb3QpIHtcblx0XHRcdFx0cm9vdCA9IHJvb3QgfHwgLyoqIEB0eXBlIHthbnl9ICovIChfLmxhbmd1YWdlcyk7XG5cdFx0XHRcdHZhciBncmFtbWFyID0gcm9vdFtpbnNpZGVdO1xuXHRcdFx0XHQvKiogQHR5cGUge0dyYW1tYXJ9ICovXG5cdFx0XHRcdHZhciByZXQgPSB7fTtcblxuXHRcdFx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRcdFx0aWYgKGdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cblx0XHRcdFx0XHRcdGlmICh0b2tlbiA9PSBiZWZvcmUpIHtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldFtuZXdUb2tlbl0gPSBpbnNlcnRbbmV3VG9rZW5dO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBEbyBub3QgaW5zZXJ0IHRva2VuIHdoaWNoIGFsc28gb2NjdXIgaW4gaW5zZXJ0LiBTZWUgIzE1MjVcblx0XHRcdFx0XHRcdGlmICghaW5zZXJ0Lmhhc093blByb3BlcnR5KHRva2VuKSkge1xuXHRcdFx0XHRcdFx0XHRyZXRbdG9rZW5dID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG9sZCA9IHJvb3RbaW5zaWRlXTtcblx0XHRcdFx0cm9vdFtpbnNpZGVdID0gcmV0O1xuXG5cdFx0XHRcdC8vIFVwZGF0ZSByZWZlcmVuY2VzIGluIG90aGVyIGxhbmd1YWdlIGRlZmluaXRpb25zXG5cdFx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhfLmxhbmd1YWdlcywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0XHRpZiAodmFsdWUgPT09IG9sZCAmJiBrZXkgIT0gaW5zaWRlKSB7XG5cdFx0XHRcdFx0XHR0aGlzW2tleV0gPSByZXQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVHJhdmVyc2UgYSBsYW5ndWFnZSBkZWZpbml0aW9uIHdpdGggRGVwdGggRmlyc3QgU2VhcmNoXG5cdFx0XHRERlM6IGZ1bmN0aW9uIERGUyhvLCBjYWxsYmFjaywgdHlwZSwgdmlzaXRlZCkge1xuXHRcdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0XHR2YXIgb2JqSWQgPSBfLnV0aWwub2JqSWQ7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBvKSB7XG5cdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobywgaSwgb1tpXSwgdHlwZSB8fCBpKTtcblxuXHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gb1tpXTtcblx0XHRcdFx0XHRcdHZhciBwcm9wZXJ0eVR5cGUgPSBfLnV0aWwudHlwZShwcm9wZXJ0eSk7XG5cblx0XHRcdFx0XHRcdGlmIChwcm9wZXJ0eVR5cGUgPT09ICdPYmplY3QnICYmICF2aXNpdGVkW29iaklkKHByb3BlcnR5KV0pIHtcblx0XHRcdFx0XHRcdFx0dmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0REZTKHByb3BlcnR5LCBjYWxsYmFjaywgbnVsbCwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5VHlwZSA9PT0gJ0FycmF5JyAmJiAhdmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldKSB7XG5cdFx0XHRcdFx0XHRcdHZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdERGUyhwcm9wZXJ0eSwgY2FsbGJhY2ssIGksIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRwbHVnaW5zOiB7fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIG1vc3QgaGlnaC1sZXZlbCBmdW5jdGlvbiBpbiBQcmlzbeKAmXMgQVBJLlxuXHRcdCAqIEl0IGZldGNoZXMgYWxsIHRoZSBlbGVtZW50cyB0aGF0IGhhdmUgYSBgLmxhbmd1YWdlLXh4eHhgIGNsYXNzIGFuZCB0aGVuIGNhbGxzIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBvblxuXHRcdCAqIGVhY2ggb25lIG9mIHRoZW0uXG5cdFx0ICpcblx0XHQgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gYFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyKGRvY3VtZW50LCBhc3luYywgY2FsbGJhY2spYC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBTYW1lIGFzIGluIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcn0uXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBTYW1lIGFzIGluIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcn0uXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEFsbDogZnVuY3Rpb24gKGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdFx0Xy5oaWdobGlnaHRBbGxVbmRlcihkb2N1bWVudCwgYXN5bmMsIGNhbGxiYWNrKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRmV0Y2hlcyBhbGwgdGhlIGRlc2NlbmRhbnRzIG9mIGBjb250YWluZXJgIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3MgYW5kIHRoZW4gY2FsbHNcblx0XHQgKiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gb24gZWFjaCBvbmUgb2YgdGhlbS5cblx0XHQgKlxuXHRcdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdFx0ICogMS4gYGJlZm9yZS1oaWdobGlnaHRhbGxgXG5cdFx0ICogMi4gYGJlZm9yZS1hbGwtZWxlbWVudHMtaGlnaGxpZ2h0YFxuXHRcdCAqIDMuIEFsbCBob29rcyBvZiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gZm9yIGVhY2ggZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7UGFyZW50Tm9kZX0gY29udGFpbmVyIFRoZSByb290IGVsZW1lbnQsIHdob3NlIGRlc2NlbmRhbnRzIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3Mgd2lsbCBiZSBoaWdobGlnaHRlZC5cblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthc3luYz1mYWxzZV0gV2hldGhlciBlYWNoIGVsZW1lbnQgaXMgdG8gYmUgaGlnaGxpZ2h0ZWQgYXN5bmNocm9ub3VzbHkgdXNpbmcgV2ViIFdvcmtlcnMuXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGVhY2ggZWxlbWVudCBhZnRlciBpdHMgaGlnaGxpZ2h0aW5nIGlzIGRvbmUuXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEFsbFVuZGVyOiBmdW5jdGlvbiAoY29udGFpbmVyLCBhc3luYywgY2FsbGJhY2spIHtcblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcblx0XHRcdFx0Y29udGFpbmVyOiBjb250YWluZXIsXG5cdFx0XHRcdHNlbGVjdG9yOiAnY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sIFtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gY29kZSwgY29kZVtjbGFzcyo9XCJsYW5nLVwiXSwgW2NsYXNzKj1cImxhbmctXCJdIGNvZGUnXG5cdFx0XHR9O1xuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWhpZ2hsaWdodGFsbCcsIGVudik7XG5cblx0XHRcdGVudi5lbGVtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShlbnYuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoZW52LnNlbGVjdG9yKSk7XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtYWxsLWVsZW1lbnRzLWhpZ2hsaWdodCcsIGVudik7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwLCBlbGVtZW50OyAoZWxlbWVudCA9IGVudi5lbGVtZW50c1tpKytdKTspIHtcblx0XHRcdFx0Xy5oaWdobGlnaHRFbGVtZW50KGVsZW1lbnQsIGFzeW5jID09PSB0cnVlLCBlbnYuY2FsbGJhY2spO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBIaWdobGlnaHRzIHRoZSBjb2RlIGluc2lkZSBhIHNpbmdsZSBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0XHQgKiAxLiBgYmVmb3JlLXNhbml0eS1jaGVja2Bcblx0XHQgKiAyLiBgYmVmb3JlLWhpZ2hsaWdodGBcblx0XHQgKiAzLiBBbGwgaG9va3Mgb2Yge0BsaW5rIFByaXNtLmhpZ2hsaWdodH0uIFRoZXNlIGhvb2tzIHdpbGwgYmUgcnVuIGJ5IGFuIGFzeW5jaHJvbm91cyB3b3JrZXIgaWYgYGFzeW5jYCBpcyBgdHJ1ZWAuXG5cdFx0ICogNC4gYGJlZm9yZS1pbnNlcnRgXG5cdFx0ICogNS4gYGFmdGVyLWhpZ2hsaWdodGBcblx0XHQgKiA2LiBgY29tcGxldGVgXG5cdFx0ICpcblx0XHQgKiBTb21lIHRoZSBhYm92ZSBob29rcyB3aWxsIGJlIHNraXBwZWQgaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBjb250YWluIGFueSB0ZXh0IG9yIHRoZXJlIGlzIG5vIGdyYW1tYXIgbG9hZGVkIGZvclxuXHRcdCAqIHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgY29udGFpbmluZyB0aGUgY29kZS5cblx0XHQgKiBJdCBtdXN0IGhhdmUgYSBjbGFzcyBvZiBgbGFuZ3VhZ2UteHh4eGAgdG8gYmUgcHJvY2Vzc2VkLCB3aGVyZSBgeHh4eGAgaXMgYSB2YWxpZCBsYW5ndWFnZSBpZGVudGlmaWVyLlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIHRvIGJlIGhpZ2hsaWdodGVkIGFzeW5jaHJvbm91c2x5IHVzaW5nIFdlYiBXb3JrZXJzXG5cdFx0ICogdG8gaW1wcm92ZSBwZXJmb3JtYW5jZSBhbmQgYXZvaWQgYmxvY2tpbmcgdGhlIFVJIHdoZW4gaGlnaGxpZ2h0aW5nIHZlcnkgbGFyZ2UgY2h1bmtzIG9mIGNvZGUuIFRoaXMgb3B0aW9uIGlzXG5cdFx0ICogW2Rpc2FibGVkIGJ5IGRlZmF1bHRdKGh0dHBzOi8vcHJpc21qcy5jb20vZmFxLmh0bWwjd2h5LWlzLWFzeW5jaHJvbm91cy1oaWdobGlnaHRpbmctZGlzYWJsZWQtYnktZGVmYXVsdCkuXG5cdFx0ICpcblx0XHQgKiBOb3RlOiBBbGwgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgcmVxdWlyZWQgdG8gaGlnaGxpZ2h0IHRoZSBjb2RlIG11c3QgYmUgaW5jbHVkZWQgaW4gdGhlIG1haW4gYHByaXNtLmpzYCBmaWxlIGZvclxuXHRcdCAqIGFzeW5jaHJvbm91cyBoaWdobGlnaHRpbmcgdG8gd29yay4gWW91IGNhbiBidWlsZCB5b3VyIG93biBidW5kbGUgb24gdGhlXG5cdFx0ICogW0Rvd25sb2FkIHBhZ2VdKGh0dHBzOi8vcHJpc21qcy5jb20vZG93bmxvYWQuaHRtbCkuXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBoaWdobGlnaHRpbmcgaXMgZG9uZS5cblx0XHQgKiBNb3N0bHkgdXNlZnVsIHdoZW4gYGFzeW5jYCBpcyBgdHJ1ZWAsIHNpbmNlIGluIHRoYXQgY2FzZSwgdGhlIGhpZ2hsaWdodGluZyBpcyBkb25lIGFzeW5jaHJvbm91c2x5LlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRoaWdobGlnaHRFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCwgYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0XHQvLyBGaW5kIGxhbmd1YWdlXG5cdFx0XHR2YXIgbGFuZ3VhZ2UgPSBfLnV0aWwuZ2V0TGFuZ3VhZ2UoZWxlbWVudCk7XG5cdFx0XHR2YXIgZ3JhbW1hciA9IF8ubGFuZ3VhZ2VzW2xhbmd1YWdlXTtcblxuXHRcdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBlbGVtZW50LCBpZiBub3QgcHJlc2VudFxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcblxuXHRcdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBwYXJlbnQsIGZvciBzdHlsaW5nXG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ByZScpIHtcblx0XHRcdFx0cGFyZW50LmNsYXNzTmFtZSA9IHBhcmVudC5jbGFzc05hbWUucmVwbGFjZShsYW5nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpICsgJyBsYW5ndWFnZS0nICsgbGFuZ3VhZ2U7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBjb2RlID0gZWxlbWVudC50ZXh0Q29udGVudDtcblxuXHRcdFx0dmFyIGVudiA9IHtcblx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlLFxuXHRcdFx0XHRncmFtbWFyOiBncmFtbWFyLFxuXHRcdFx0XHRjb2RlOiBjb2RlXG5cdFx0XHR9O1xuXG5cdFx0XHRmdW5jdGlvbiBpbnNlcnRIaWdobGlnaHRlZENvZGUoaGlnaGxpZ2h0ZWRDb2RlKSB7XG5cdFx0XHRcdGVudi5oaWdobGlnaHRlZENvZGUgPSBoaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1pbnNlcnQnLCBlbnYpO1xuXG5cdFx0XHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLWhpZ2hsaWdodCcsIGVudik7XG5cdFx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLXNhbml0eS1jaGVjaycsIGVudik7XG5cblx0XHRcdC8vIHBsdWdpbnMgbWF5IGNoYW5nZS9hZGQgdGhlIHBhcmVudC9lbGVtZW50XG5cdFx0XHRwYXJlbnQgPSBlbnYuZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ByZScgJiYgIXBhcmVudC5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpIHtcblx0XHRcdFx0cGFyZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWVudi5jb2RlKSB7XG5cdFx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0JywgZW52KTtcblxuXHRcdFx0aWYgKCFlbnYuZ3JhbW1hcikge1xuXHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoXy51dGlsLmVuY29kZShlbnYuY29kZSkpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChhc3luYyAmJiBfc2VsZi5Xb3JrZXIpIHtcblx0XHRcdFx0dmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoXy5maWxlbmFtZSk7XG5cblx0XHRcdFx0d29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoZXZ0LmRhdGEpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHdvcmtlci5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdFx0bGFuZ3VhZ2U6IGVudi5sYW5ndWFnZSxcblx0XHRcdFx0XHRjb2RlOiBlbnYuY29kZSxcblx0XHRcdFx0XHRpbW1lZGlhdGVDbG9zZTogdHJ1ZVxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoXy5oaWdobGlnaHQoZW52LmNvZGUsIGVudi5ncmFtbWFyLCBlbnYubGFuZ3VhZ2UpKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogTG93LWxldmVsIGZ1bmN0aW9uLCBvbmx5IHVzZSBpZiB5b3Uga25vdyB3aGF0IHlvdeKAmXJlIGRvaW5nLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0XHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYSBzdHJpbmcgd2l0aCB0aGUgSFRNTCBwcm9kdWNlZC5cblx0XHQgKlxuXHRcdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdFx0ICogMS4gYGJlZm9yZS10b2tlbml6ZWBcblx0XHQgKiAyLiBgYWZ0ZXItdG9rZW5pemVgXG5cdFx0ICogMy4gYHdyYXBgOiBPbiBlYWNoIHtAbGluayBUb2tlbn0uXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBBIHN0cmluZyB3aXRoIHRoZSBjb2RlIHRvIGJlIGhpZ2hsaWdodGVkLlxuXHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gZ3JhbW1hciBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgdG9rZW5zIHRvIHVzZS5cblx0XHQgKlxuXHRcdCAqIFVzdWFsbHkgYSBsYW5ndWFnZSBkZWZpbml0aW9uIGxpa2UgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgLlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgbmFtZSBvZiB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBwYXNzZWQgdG8gYGdyYW1tYXJgLlxuXHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBoaWdobGlnaHRlZCBIVE1MLlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIFByaXNtLmhpZ2hsaWdodCgndmFyIGZvbyA9IHRydWU7JywgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQsICdqYXZhc2NyaXB0Jyk7XG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0OiBmdW5jdGlvbiAodGV4dCwgZ3JhbW1hciwgbGFuZ3VhZ2UpIHtcblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGNvZGU6IHRleHQsXG5cdFx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZVxuXHRcdFx0fTtcblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtdG9rZW5pemUnLCBlbnYpO1xuXHRcdFx0ZW52LnRva2VucyA9IF8udG9rZW5pemUoZW52LmNvZGUsIGVudi5ncmFtbWFyKTtcblx0XHRcdF8uaG9va3MucnVuKCdhZnRlci10b2tlbml6ZScsIGVudik7XG5cdFx0XHRyZXR1cm4gVG9rZW4uc3RyaW5naWZ5KF8udXRpbC5lbmNvZGUoZW52LnRva2VucyksIGVudi5sYW5ndWFnZSk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIGhlYXJ0IG9mIFByaXNtLCBhbmQgdGhlIG1vc3QgbG93LWxldmVsIGZ1bmN0aW9uIHlvdSBjYW4gdXNlLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0XHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgdG9rZW5pemVkIGNvZGUuXG5cdFx0ICpcblx0XHQgKiBXaGVuIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9uIGluY2x1ZGVzIG5lc3RlZCB0b2tlbnMsIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgcmVjdXJzaXZlbHkgb24gZWFjaCBvZiB0aGVzZSB0b2tlbnMuXG5cdFx0ICpcblx0XHQgKiBUaGlzIG1ldGhvZCBjb3VsZCBiZSB1c2VmdWwgaW4gb3RoZXIgY29udGV4dHMgYXMgd2VsbCwgYXMgYSB2ZXJ5IGNydWRlIHBhcnNlci5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IEEgc3RyaW5nIHdpdGggdGhlIGNvZGUgdG8gYmUgaGlnaGxpZ2h0ZWQuXG5cdFx0ICogQHBhcmFtIHtHcmFtbWFyfSBncmFtbWFyIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0b2tlbnMgdG8gdXNlLlxuXHRcdCAqXG5cdFx0ICogVXN1YWxseSBhIGxhbmd1YWdlIGRlZmluaXRpb24gbGlrZSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAuXG5cdFx0ICogQHJldHVybnMge1Rva2VuU3RyZWFtfSBBbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB0b2tlbnMsIGEgdG9rZW4gc3RyZWFtLlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIGxldCBjb2RlID0gYHZhciBmb28gPSAwO2A7XG5cdFx0ICogbGV0IHRva2VucyA9IFByaXNtLnRva2VuaXplKGNvZGUsIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0KTtcblx0XHQgKiB0b2tlbnMuZm9yRWFjaCh0b2tlbiA9PiB7XG5cdFx0ICogICAgIGlmICh0b2tlbiBpbnN0YW5jZW9mIFByaXNtLlRva2VuICYmIHRva2VuLnR5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0ICogICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgbnVtZXJpYyBsaXRlcmFsOiAke3Rva2VuLmNvbnRlbnR9YCk7XG5cdFx0ICogICAgIH1cblx0XHQgKiB9KTtcblx0XHQgKi9cblx0XHR0b2tlbml6ZTogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIpIHtcblx0XHRcdHZhciByZXN0ID0gZ3JhbW1hci5yZXN0O1xuXHRcdFx0aWYgKHJlc3QpIHtcblx0XHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gcmVzdCkge1xuXHRcdFx0XHRcdGdyYW1tYXJbdG9rZW5dID0gcmVzdFt0b2tlbl07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZ3JhbW1hci5yZXN0O1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdG9rZW5MaXN0ID0gbmV3IExpbmtlZExpc3QoKTtcblx0XHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgdG9rZW5MaXN0LmhlYWQsIHRleHQpO1xuXG5cdFx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCB0b2tlbkxpc3QuaGVhZCwgMCk7XG5cblx0XHRcdHJldHVybiB0b0FycmF5KHRva2VuTGlzdCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEBuYW1lc3BhY2Vcblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aG9va3M6IHtcblx0XHRcdGFsbDoge30sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQWRkcyB0aGUgZ2l2ZW4gY2FsbGJhY2sgdG8gdGhlIGxpc3Qgb2YgY2FsbGJhY2tzIGZvciB0aGUgZ2l2ZW4gaG9vay5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGhvb2sgaXQgaXMgcmVnaXN0ZXJlZCBmb3IgaXMgcnVuLlxuXHRcdFx0ICogSG9va3MgYXJlIHVzdWFsbHkgZGlyZWN0bHkgcnVuIGJ5IGEgaGlnaGxpZ2h0IGZ1bmN0aW9uIGJ1dCB5b3UgY2FuIGFsc28gcnVuIGhvb2tzIHlvdXJzZWxmLlxuXHRcdFx0ICpcblx0XHRcdCAqIE9uZSBjYWxsYmFjayBmdW5jdGlvbiBjYW4gYmUgcmVnaXN0ZXJlZCB0byBtdWx0aXBsZSBob29rcyBhbmQgdGhlIHNhbWUgaG9vayBtdWx0aXBsZSB0aW1lcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaG9vay5cblx0XHRcdCAqIEBwYXJhbSB7SG9va0NhbGxiYWNrfSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRhZGQ6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgaG9va3MgPSBfLmhvb2tzLmFsbDtcblxuXHRcdFx0XHRob29rc1tuYW1lXSA9IGhvb2tzW25hbWVdIHx8IFtdO1xuXG5cdFx0XHRcdGhvb2tzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSdW5zIGEgaG9vayBpbnZva2luZyBhbGwgcmVnaXN0ZXJlZCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIENhbGxiYWNrcyB3aWxsIGJlIGludm9rZWQgc3luY2hyb25vdXNseSBhbmQgaW4gdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgd2VyZSByZWdpc3RlcmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBob29rLlxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBlbnYgVGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBvZiB0aGUgaG9vayBwYXNzZWQgdG8gYWxsIGNhbGxiYWNrcyByZWdpc3RlcmVkLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRydW46IGZ1bmN0aW9uIChuYW1lLCBlbnYpIHtcblx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IF8uaG9va3MuYWxsW25hbWVdO1xuXG5cdFx0XHRcdGlmICghY2FsbGJhY2tzIHx8ICFjYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGNhbGxiYWNrOyAoY2FsbGJhY2sgPSBjYWxsYmFja3NbaSsrXSk7KSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soZW52KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRUb2tlbjogVG9rZW5cblx0fTtcblx0X3NlbGYuUHJpc20gPSBfO1xuXG5cblx0Ly8gVHlwZXNjcmlwdCBub3RlOlxuXHQvLyBUaGUgZm9sbG93aW5nIGNhbiBiZSB1c2VkIHRvIGltcG9ydCB0aGUgVG9rZW4gdHlwZSBpbiBKU0RvYzpcblx0Ly9cblx0Ly8gICBAdHlwZWRlZiB7SW5zdGFuY2VUeXBlPGltcG9ydChcIi4vcHJpc20tY29yZVwiKVtcIlRva2VuXCJdPn0gVG9rZW5cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyB0b2tlbi5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgU2VlIHtAbGluayBUb2tlbiN0eXBlIHR5cGV9XG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgVG9rZW5TdHJlYW19IGNvbnRlbnQgU2VlIHtAbGluayBUb2tlbiNjb250ZW50IGNvbnRlbnR9XG5cdCAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBbYWxpYXNdIFRoZSBhbGlhcyhlcykgb2YgdGhlIHRva2VuLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW21hdGNoZWRTdHI9XCJcIl0gQSBjb3B5IG9mIHRoZSBmdWxsIHN0cmluZyB0aGlzIHRva2VuIHdhcyBjcmVhdGVkIGZyb20uXG5cdCAqIEBjbGFzc1xuXHQgKiBAZ2xvYmFsXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdGZ1bmN0aW9uIFRva2VuKHR5cGUsIGNvbnRlbnQsIGFsaWFzLCBtYXRjaGVkU3RyKSB7XG5cdFx0LyoqXG5cdFx0ICogVGhlIHR5cGUgb2YgdGhlIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogVGhpcyBpcyB1c3VhbGx5IHRoZSBrZXkgb2YgYSBwYXR0ZXJuIGluIGEge0BsaW5rIEdyYW1tYXJ9LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZ31cblx0XHQgKiBAc2VlIEdyYW1tYXJUb2tlblxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdC8qKlxuXHRcdCAqIFRoZSBzdHJpbmdzIG9yIHRva2VucyBjb250YWluZWQgYnkgdGhpcyB0b2tlbi5cblx0XHQgKlxuXHRcdCAqIFRoaXMgd2lsbCBiZSBhIHRva2VuIHN0cmVhbSBpZiB0aGUgcGF0dGVybiBtYXRjaGVkIGFsc28gZGVmaW5lZCBhbiBgaW5zaWRlYCBncmFtbWFyLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZyB8IFRva2VuU3RyZWFtfVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuXHRcdC8qKlxuXHRcdCAqIFRoZSBhbGlhcyhlcykgb2YgdGhlIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZ3xzdHJpbmdbXX1cblx0XHQgKiBAc2VlIEdyYW1tYXJUb2tlblxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLmFsaWFzID0gYWxpYXM7XG5cdFx0Ly8gQ29weSBvZiB0aGUgZnVsbCBzdHJpbmcgdGhpcyB0b2tlbiB3YXMgY3JlYXRlZCBmcm9tXG5cdFx0dGhpcy5sZW5ndGggPSAobWF0Y2hlZFN0ciB8fCAnJykubGVuZ3RoIHwgMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHRva2VuIHN0cmVhbSBpcyBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB7QGxpbmsgVG9rZW4gVG9rZW59IG9iamVjdHMuXG5cdCAqXG5cdCAqIFRva2VuIHN0cmVhbXMgaGF2ZSB0byBmdWxmaWxsIGEgZmV3IHByb3BlcnRpZXMgdGhhdCBhcmUgYXNzdW1lZCBieSBtb3N0IGZ1bmN0aW9ucyAobW9zdGx5IGludGVybmFsIG9uZXMpIHRoYXQgcHJvY2Vzc1xuXHQgKiB0aGVtLlxuXHQgKlxuXHQgKiAxLiBObyBhZGphY2VudCBzdHJpbmdzLlxuXHQgKiAyLiBObyBlbXB0eSBzdHJpbmdzLlxuXHQgKlxuXHQgKiAgICBUaGUgb25seSBleGNlcHRpb24gaGVyZSBpcyB0aGUgdG9rZW4gc3RyZWFtIHRoYXQgb25seSBjb250YWlucyB0aGUgZW1wdHkgc3RyaW5nIGFuZCBub3RoaW5nIGVsc2UuXG5cdCAqXG5cdCAqIEB0eXBlZGVmIHtBcnJheTxzdHJpbmcgfCBUb2tlbj59IFRva2VuU3RyZWFtXG5cdCAqIEBnbG9iYWxcblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHQvKipcblx0ICogQ29udmVydHMgdGhlIGdpdmVuIHRva2VuIG9yIHRva2VuIHN0cmVhbSB0byBhbiBIVE1MIHJlcHJlc2VudGF0aW9uLlxuXHQgKlxuXHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHQgKiAxLiBgd3JhcGA6IE9uIGVhY2gge0BsaW5rIFRva2VufS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmcgfCBUb2tlbiB8IFRva2VuU3RyZWFtfSBvIFRoZSB0b2tlbiBvciB0b2tlbiBzdHJlYW0gdG8gYmUgY29udmVydGVkLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIG5hbWUgb2YgY3VycmVudCBsYW5ndWFnZS5cblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIEhUTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRva2VuIG9yIHRva2VuIHN0cmVhbS5cblx0ICogQG1lbWJlcm9mIFRva2VuXG5cdCAqIEBzdGF0aWNcblx0ICovXG5cdFRva2VuLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShvLCBsYW5ndWFnZSkge1xuXHRcdGlmICh0eXBlb2YgbyA9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIG87XG5cdFx0fVxuXHRcdGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG5cdFx0XHR2YXIgcyA9ICcnO1xuXHRcdFx0by5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHMgKz0gc3RyaW5naWZ5KGUsIGxhbmd1YWdlKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHM7XG5cdFx0fVxuXG5cdFx0dmFyIGVudiA9IHtcblx0XHRcdHR5cGU6IG8udHlwZSxcblx0XHRcdGNvbnRlbnQ6IHN0cmluZ2lmeShvLmNvbnRlbnQsIGxhbmd1YWdlKSxcblx0XHRcdHRhZzogJ3NwYW4nLFxuXHRcdFx0Y2xhc3NlczogWyd0b2tlbicsIG8udHlwZV0sXG5cdFx0XHRhdHRyaWJ1dGVzOiB7fSxcblx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZVxuXHRcdH07XG5cblx0XHR2YXIgYWxpYXNlcyA9IG8uYWxpYXM7XG5cdFx0aWYgKGFsaWFzZXMpIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGFsaWFzZXMpKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGVudi5jbGFzc2VzLCBhbGlhc2VzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVudi5jbGFzc2VzLnB1c2goYWxpYXNlcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Xy5ob29rcy5ydW4oJ3dyYXAnLCBlbnYpO1xuXG5cdFx0dmFyIGF0dHJpYnV0ZXMgPSAnJztcblx0XHRmb3IgKHZhciBuYW1lIGluIGVudi5hdHRyaWJ1dGVzKSB7XG5cdFx0XHRhdHRyaWJ1dGVzICs9ICcgJyArIG5hbWUgKyAnPVwiJyArIChlbnYuYXR0cmlidXRlc1tuYW1lXSB8fCAnJykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpICsgJ1wiJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJzwnICsgZW52LnRhZyArICcgY2xhc3M9XCInICsgZW52LmNsYXNzZXMuam9pbignICcpICsgJ1wiJyArIGF0dHJpYnV0ZXMgKyAnPicgKyBlbnYuY29udGVudCArICc8LycgKyBlbnYudGFnICsgJz4nO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1JlZ0V4cH0gcGF0dGVyblxuXHQgKiBAcGFyYW0ge251bWJlcn0gcG9zXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9va2JlaGluZFxuXHQgKiBAcmV0dXJucyB7UmVnRXhwRXhlY0FycmF5IHwgbnVsbH1cblx0ICovXG5cdGZ1bmN0aW9uIG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwb3MsIHRleHQsIGxvb2tiZWhpbmQpIHtcblx0XHRwYXR0ZXJuLmxhc3RJbmRleCA9IHBvcztcblx0XHR2YXIgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWModGV4dCk7XG5cdFx0aWYgKG1hdGNoICYmIGxvb2tiZWhpbmQgJiYgbWF0Y2hbMV0pIHtcblx0XHRcdC8vIGNoYW5nZSB0aGUgbWF0Y2ggdG8gcmVtb3ZlIHRoZSB0ZXh0IG1hdGNoZWQgYnkgdGhlIFByaXNtIGxvb2tiZWhpbmQgZ3JvdXBcblx0XHRcdHZhciBsb29rYmVoaW5kTGVuZ3RoID0gbWF0Y2hbMV0ubGVuZ3RoO1xuXHRcdFx0bWF0Y2guaW5kZXggKz0gbG9va2JlaGluZExlbmd0aDtcblx0XHRcdG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UobG9va2JlaGluZExlbmd0aCk7XG5cdFx0fVxuXHRcdHJldHVybiBtYXRjaDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8c3RyaW5nIHwgVG9rZW4+fSB0b2tlbkxpc3Rcblx0ICogQHBhcmFtIHthbnl9IGdyYW1tYXJcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxzdHJpbmcgfCBUb2tlbj59IHN0YXJ0Tm9kZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRQb3Ncblx0ICogQHBhcmFtIHtSZW1hdGNoT3B0aW9uc30gW3JlbWF0Y2hdXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKiBAcHJpdmF0ZVxuXHQgKlxuXHQgKiBAdHlwZWRlZiBSZW1hdGNoT3B0aW9uc1xuXHQgKiBAcHJvcGVydHkge3N0cmluZ30gY2F1c2Vcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9IHJlYWNoXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCBzdGFydE5vZGUsIHN0YXJ0UG9zLCByZW1hdGNoKSB7XG5cdFx0Zm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuXHRcdFx0aWYgKCFncmFtbWFyLmhhc093blByb3BlcnR5KHRva2VuKSB8fCAhZ3JhbW1hclt0b2tlbl0pIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBwYXR0ZXJucyA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdFx0cGF0dGVybnMgPSBBcnJheS5pc0FycmF5KHBhdHRlcm5zKSA/IHBhdHRlcm5zIDogW3BhdHRlcm5zXTtcblxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBwYXR0ZXJucy5sZW5ndGg7ICsraikge1xuXHRcdFx0XHRpZiAocmVtYXRjaCAmJiByZW1hdGNoLmNhdXNlID09IHRva2VuICsgJywnICsgaikge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBwYXR0ZXJuT2JqID0gcGF0dGVybnNbal07XG5cdFx0XHRcdHZhciBpbnNpZGUgPSBwYXR0ZXJuT2JqLmluc2lkZTtcblx0XHRcdFx0dmFyIGxvb2tiZWhpbmQgPSAhIXBhdHRlcm5PYmoubG9va2JlaGluZDtcblx0XHRcdFx0dmFyIGdyZWVkeSA9ICEhcGF0dGVybk9iai5ncmVlZHk7XG5cdFx0XHRcdHZhciBhbGlhcyA9IHBhdHRlcm5PYmouYWxpYXM7XG5cblx0XHRcdFx0aWYgKGdyZWVkeSAmJiAhcGF0dGVybk9iai5wYXR0ZXJuLmdsb2JhbCkge1xuXHRcdFx0XHRcdC8vIFdpdGhvdXQgdGhlIGdsb2JhbCBmbGFnLCBsYXN0SW5kZXggd29uJ3Qgd29ya1xuXHRcdFx0XHRcdHZhciBmbGFncyA9IHBhdHRlcm5PYmoucGF0dGVybi50b1N0cmluZygpLm1hdGNoKC9baW1zdXldKiQvKVswXTtcblx0XHRcdFx0XHRwYXR0ZXJuT2JqLnBhdHRlcm4gPSBSZWdFeHAocGF0dGVybk9iai5wYXR0ZXJuLnNvdXJjZSwgZmxhZ3MgKyAnZycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqIEB0eXBlIHtSZWdFeHB9ICovXG5cdFx0XHRcdHZhciBwYXR0ZXJuID0gcGF0dGVybk9iai5wYXR0ZXJuIHx8IHBhdHRlcm5PYmo7XG5cblx0XHRcdFx0Zm9yICggLy8gaXRlcmF0ZSB0aGUgdG9rZW4gbGlzdCBhbmQga2VlcCB0cmFjayBvZiB0aGUgY3VycmVudCB0b2tlbi9zdHJpbmcgcG9zaXRpb25cblx0XHRcdFx0XHR2YXIgY3VycmVudE5vZGUgPSBzdGFydE5vZGUubmV4dCwgcG9zID0gc3RhcnRQb3M7XG5cdFx0XHRcdFx0Y3VycmVudE5vZGUgIT09IHRva2VuTGlzdC50YWlsO1xuXHRcdFx0XHRcdHBvcyArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGgsIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dFxuXHRcdFx0XHQpIHtcblxuXHRcdFx0XHRcdGlmIChyZW1hdGNoICYmIHBvcyA+PSByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgc3RyID0gY3VycmVudE5vZGUudmFsdWU7XG5cblx0XHRcdFx0XHRpZiAodG9rZW5MaXN0Lmxlbmd0aCA+IHRleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHQvLyBTb21ldGhpbmcgd2VudCB0ZXJyaWJseSB3cm9uZywgQUJPUlQsIEFCT1JUIVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzdHIgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHJlbW92ZUNvdW50ID0gMTsgLy8gdGhpcyBpcyB0aGUgdG8gcGFyYW1ldGVyIG9mIHJlbW92ZUJldHdlZW5cblx0XHRcdFx0XHR2YXIgbWF0Y2g7XG5cblx0XHRcdFx0XHRpZiAoZ3JlZWR5KSB7XG5cdFx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwb3MsIHRleHQsIGxvb2tiZWhpbmQpO1xuXHRcdFx0XHRcdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleDtcblx0XHRcdFx0XHRcdHZhciB0byA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXHRcdFx0XHRcdFx0dmFyIHAgPSBwb3M7XG5cblx0XHRcdFx0XHRcdC8vIGZpbmQgdGhlIG5vZGUgdGhhdCBjb250YWlucyB0aGUgbWF0Y2hcblx0XHRcdFx0XHRcdHAgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0d2hpbGUgKGZyb20gPj0gcCkge1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG5cdFx0XHRcdFx0XHRcdHAgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gYWRqdXN0IHBvcyAoYW5kIHApXG5cdFx0XHRcdFx0XHRwIC09IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRcdHBvcyA9IHA7XG5cblx0XHRcdFx0XHRcdC8vIHRoZSBjdXJyZW50IG5vZGUgaXMgYSBUb2tlbiwgdGhlbiB0aGUgbWF0Y2ggc3RhcnRzIGluc2lkZSBhbm90aGVyIFRva2VuLCB3aGljaCBpcyBpbnZhbGlkXG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudE5vZGUudmFsdWUgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gZmluZCB0aGUgbGFzdCBub2RlIHdoaWNoIGlzIGFmZmVjdGVkIGJ5IHRoaXMgbWF0Y2hcblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBrID0gY3VycmVudE5vZGU7XG5cdFx0XHRcdFx0XHRcdGsgIT09IHRva2VuTGlzdC50YWlsICYmIChwIDwgdG8gfHwgdHlwZW9mIGsudmFsdWUgPT09ICdzdHJpbmcnKTtcblx0XHRcdFx0XHRcdFx0ayA9IGsubmV4dFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHJlbW92ZUNvdW50Kys7XG5cdFx0XHRcdFx0XHRcdHAgKz0gay52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZW1vdmVDb3VudC0tO1xuXG5cdFx0XHRcdFx0XHQvLyByZXBsYWNlIHdpdGggdGhlIG5ldyBtYXRjaFxuXHRcdFx0XHRcdFx0c3RyID0gdGV4dC5zbGljZShwb3MsIHApO1xuXHRcdFx0XHRcdFx0bWF0Y2guaW5kZXggLT0gcG9zO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCAwLCBzdHIsIGxvb2tiZWhpbmQpO1xuXHRcdFx0XHRcdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG5cdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleDtcblx0XHRcdFx0XHR2YXIgbWF0Y2hTdHIgPSBtYXRjaFswXTtcblx0XHRcdFx0XHR2YXIgYmVmb3JlID0gc3RyLnNsaWNlKDAsIGZyb20pO1xuXHRcdFx0XHRcdHZhciBhZnRlciA9IHN0ci5zbGljZShmcm9tICsgbWF0Y2hTdHIubGVuZ3RoKTtcblxuXHRcdFx0XHRcdHZhciByZWFjaCA9IHBvcyArIHN0ci5sZW5ndGg7XG5cdFx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgcmVhY2ggPiByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRyZW1hdGNoLnJlYWNoID0gcmVhY2g7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHJlbW92ZUZyb20gPSBjdXJyZW50Tm9kZS5wcmV2O1xuXG5cdFx0XHRcdFx0aWYgKGJlZm9yZSkge1xuXHRcdFx0XHRcdFx0cmVtb3ZlRnJvbSA9IGFkZEFmdGVyKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgYmVmb3JlKTtcblx0XHRcdFx0XHRcdHBvcyArPSBiZWZvcmUubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlbW92ZVJhbmdlKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgcmVtb3ZlQ291bnQpO1xuXG5cdFx0XHRcdFx0dmFyIHdyYXBwZWQgPSBuZXcgVG9rZW4odG9rZW4sIGluc2lkZSA/IF8udG9rZW5pemUobWF0Y2hTdHIsIGluc2lkZSkgOiBtYXRjaFN0ciwgYWxpYXMsIG1hdGNoU3RyKTtcblx0XHRcdFx0XHRjdXJyZW50Tm9kZSA9IGFkZEFmdGVyKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgd3JhcHBlZCk7XG5cblx0XHRcdFx0XHRpZiAoYWZ0ZXIpIHtcblx0XHRcdFx0XHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgY3VycmVudE5vZGUsIGFmdGVyKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAocmVtb3ZlQ291bnQgPiAxKSB7XG5cdFx0XHRcdFx0XHQvLyBhdCBsZWFzdCBvbmUgVG9rZW4gb2JqZWN0IHdhcyByZW1vdmVkLCBzbyB3ZSBoYXZlIHRvIGRvIHNvbWUgcmVtYXRjaGluZ1xuXHRcdFx0XHRcdFx0Ly8gdGhpcyBjYW4gb25seSBoYXBwZW4gaWYgdGhlIGN1cnJlbnQgcGF0dGVybiBpcyBncmVlZHlcblxuXHRcdFx0XHRcdFx0LyoqIEB0eXBlIHtSZW1hdGNoT3B0aW9uc30gKi9cblx0XHRcdFx0XHRcdHZhciBuZXN0ZWRSZW1hdGNoID0ge1xuXHRcdFx0XHRcdFx0XHRjYXVzZTogdG9rZW4gKyAnLCcgKyBqLFxuXHRcdFx0XHRcdFx0XHRyZWFjaDogcmVhY2hcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCBjdXJyZW50Tm9kZS5wcmV2LCBwb3MsIG5lc3RlZFJlbWF0Y2gpO1xuXG5cdFx0XHRcdFx0XHQvLyB0aGUgcmVhY2ggbWlnaHQgaGF2ZSBiZWVuIGV4dGVuZGVkIGJlY2F1c2Ugb2YgdGhlIHJlbWF0Y2hpbmdcblx0XHRcdFx0XHRcdGlmIChyZW1hdGNoICYmIG5lc3RlZFJlbWF0Y2gucmVhY2ggPiByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRcdHJlbWF0Y2gucmVhY2ggPSBuZXN0ZWRSZW1hdGNoLnJlYWNoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAdHlwZWRlZiBMaW5rZWRMaXN0Tm9kZVxuXHQgKiBAcHJvcGVydHkge1R9IHZhbHVlXG5cdCAqIEBwcm9wZXJ0eSB7TGlua2VkTGlzdE5vZGU8VD4gfCBudWxsfSBwcmV2IFRoZSBwcmV2aW91cyBub2RlLlxuXHQgKiBAcHJvcGVydHkge0xpbmtlZExpc3ROb2RlPFQ+IHwgbnVsbH0gbmV4dCBUaGUgbmV4dCBub2RlLlxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblxuXHQvKipcblx0ICogQHRlbXBsYXRlIFRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR2YXIgaGVhZCA9IHsgdmFsdWU6IG51bGwsIHByZXY6IG51bGwsIG5leHQ6IG51bGwgfTtcblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHZhciB0YWlsID0geyB2YWx1ZTogbnVsbCwgcHJldjogaGVhZCwgbmV4dDogbnVsbCB9O1xuXHRcdGhlYWQubmV4dCA9IHRhaWw7XG5cblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHRoaXMuaGVhZCA9IGhlYWQ7XG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR0aGlzLnRhaWwgPSB0YWlsO1xuXHRcdHRoaXMubGVuZ3RoID0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGEgbmV3IG5vZGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUgdG8gdGhlIGxpc3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPFQ+fSBub2RlXG5cdCAqIEBwYXJhbSB7VH0gdmFsdWVcblx0ICogQHJldHVybnMge0xpbmtlZExpc3ROb2RlPFQ+fSBUaGUgYWRkZWQgbm9kZS5cblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIGFkZEFmdGVyKGxpc3QsIG5vZGUsIHZhbHVlKSB7XG5cdFx0Ly8gYXNzdW1lcyB0aGF0IG5vZGUgIT0gbGlzdC50YWlsICYmIHZhbHVlcy5sZW5ndGggPj0gMFxuXHRcdHZhciBuZXh0ID0gbm9kZS5uZXh0O1xuXG5cdFx0dmFyIG5ld05vZGUgPSB7IHZhbHVlOiB2YWx1ZSwgcHJldjogbm9kZSwgbmV4dDogbmV4dCB9O1xuXHRcdG5vZGUubmV4dCA9IG5ld05vZGU7XG5cdFx0bmV4dC5wcmV2ID0gbmV3Tm9kZTtcblx0XHRsaXN0Lmxlbmd0aCsrO1xuXG5cdFx0cmV0dXJuIG5ld05vZGU7XG5cdH1cblx0LyoqXG5cdCAqIFJlbW92ZXMgYGNvdW50YCBub2RlcyBhZnRlciB0aGUgZ2l2ZW4gbm9kZS4gVGhlIGdpdmVuIG5vZGUgd2lsbCBub3QgYmUgcmVtb3ZlZC5cblx0ICpcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8VD59IG5vZGVcblx0ICogQHBhcmFtIHtudW1iZXJ9IGNvdW50XG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqL1xuXHRmdW5jdGlvbiByZW1vdmVSYW5nZShsaXN0LCBub2RlLCBjb3VudCkge1xuXHRcdHZhciBuZXh0ID0gbm9kZS5uZXh0O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQgJiYgbmV4dCAhPT0gbGlzdC50YWlsOyBpKyspIHtcblx0XHRcdG5leHQgPSBuZXh0Lm5leHQ7XG5cdFx0fVxuXHRcdG5vZGUubmV4dCA9IG5leHQ7XG5cdFx0bmV4dC5wcmV2ID0gbm9kZTtcblx0XHRsaXN0Lmxlbmd0aCAtPSBpO1xuXHR9XG5cdC8qKlxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3Rcblx0ICogQHJldHVybnMge1RbXX1cblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuXHRcdHZhciBhcnJheSA9IFtdO1xuXHRcdHZhciBub2RlID0gbGlzdC5oZWFkLm5leHQ7XG5cdFx0d2hpbGUgKG5vZGUgIT09IGxpc3QudGFpbCkge1xuXHRcdFx0YXJyYXkucHVzaChub2RlLnZhbHVlKTtcblx0XHRcdG5vZGUgPSBub2RlLm5leHQ7XG5cdFx0fVxuXHRcdHJldHVybiBhcnJheTtcblx0fVxuXG5cblx0aWYgKCFfc2VsZi5kb2N1bWVudCkge1xuXHRcdGlmICghX3NlbGYuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0Ly8gaW4gTm9kZS5qc1xuXHRcdFx0cmV0dXJuIF87XG5cdFx0fVxuXG5cdFx0aWYgKCFfLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcikge1xuXHRcdFx0Ly8gSW4gd29ya2VyXG5cdFx0XHRfc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZ0LmRhdGEpO1xuXHRcdFx0XHR2YXIgbGFuZyA9IG1lc3NhZ2UubGFuZ3VhZ2U7XG5cdFx0XHRcdHZhciBjb2RlID0gbWVzc2FnZS5jb2RlO1xuXHRcdFx0XHR2YXIgaW1tZWRpYXRlQ2xvc2UgPSBtZXNzYWdlLmltbWVkaWF0ZUNsb3NlO1xuXG5cdFx0XHRcdF9zZWxmLnBvc3RNZXNzYWdlKF8uaGlnaGxpZ2h0KGNvZGUsIF8ubGFuZ3VhZ2VzW2xhbmddLCBsYW5nKSk7XG5cdFx0XHRcdGlmIChpbW1lZGlhdGVDbG9zZSkge1xuXHRcdFx0XHRcdF9zZWxmLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIGZhbHNlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gXztcblx0fVxuXG5cdC8vIEdldCBjdXJyZW50IHNjcmlwdCBhbmQgaGlnaGxpZ2h0XG5cdHZhciBzY3JpcHQgPSBfLnV0aWwuY3VycmVudFNjcmlwdCgpO1xuXG5cdGlmIChzY3JpcHQpIHtcblx0XHRfLmZpbGVuYW1lID0gc2NyaXB0LnNyYztcblxuXHRcdGlmIChzY3JpcHQuaGFzQXR0cmlidXRlKCdkYXRhLW1hbnVhbCcpKSB7XG5cdFx0XHRfLm1hbnVhbCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKCkge1xuXHRcdGlmICghXy5tYW51YWwpIHtcblx0XHRcdF8uaGlnaGxpZ2h0QWxsKCk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFfLm1hbnVhbCkge1xuXHRcdC8vIElmIHRoZSBkb2N1bWVudCBzdGF0ZSBpcyBcImxvYWRpbmdcIiwgdGhlbiB3ZSdsbCB1c2UgRE9NQ29udGVudExvYWRlZC5cblx0XHQvLyBJZiB0aGUgZG9jdW1lbnQgc3RhdGUgaXMgXCJpbnRlcmFjdGl2ZVwiIGFuZCB0aGUgcHJpc20uanMgc2NyaXB0IGlzIGRlZmVycmVkLCB0aGVuIHdlJ2xsIGFsc28gdXNlIHRoZVxuXHRcdC8vIERPTUNvbnRlbnRMb2FkZWQgZXZlbnQgYmVjYXVzZSB0aGVyZSBtaWdodCBiZSBzb21lIHBsdWdpbnMgb3IgbGFuZ3VhZ2VzIHdoaWNoIGhhdmUgYWxzbyBiZWVuIGRlZmVycmVkIGFuZCB0aGV5XG5cdFx0Ly8gbWlnaHQgdGFrZSBsb25nZXIgb25lIGFuaW1hdGlvbiBmcmFtZSB0byBleGVjdXRlIHdoaWNoIGNhbiBjcmVhdGUgYSByYWNlIGNvbmRpdGlvbiB3aGVyZSBvbmx5IHNvbWUgcGx1Z2lucyBoYXZlXG5cdFx0Ly8gYmVlbiBsb2FkZWQgd2hlbiBQcmlzbS5oaWdobGlnaHRBbGwoKSBpcyBleGVjdXRlZCwgZGVwZW5kaW5nIG9uIGhvdyBmYXN0IHJlc291cmNlcyBhcmUgbG9hZGVkLlxuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUHJpc21KUy9wcmlzbS9pc3N1ZXMvMjEwMlxuXHRcdHZhciByZWFkeVN0YXRlID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcblx0XHRpZiAocmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnIHx8IHJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgJiYgc2NyaXB0ICYmIHNjcmlwdC5kZWZlcikge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG5cdFx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjaywgMTYpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBfO1xuXG59KF9zZWxmKSk7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IFByaXNtO1xufVxuXG4vLyBoYWNrIGZvciBjb21wb25lbnRzIHRvIHdvcmsgY29ycmVjdGx5IGluIG5vZGUuanNcbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRnbG9iYWwuUHJpc20gPSBQcmlzbTtcbn1cblxuLy8gc29tZSBhZGRpdGlvbmFsIGRvY3VtZW50YXRpb24vdHlwZXNcblxuLyoqXG4gKiBUaGUgZXhwYW5zaW9uIG9mIGEgc2ltcGxlIGBSZWdFeHBgIGxpdGVyYWwgdG8gc3VwcG9ydCBhZGRpdGlvbmFsIHByb3BlcnRpZXMuXG4gKlxuICogQHR5cGVkZWYgR3JhbW1hclRva2VuXG4gKiBAcHJvcGVydHkge1JlZ0V4cH0gcGF0dGVybiBUaGUgcmVndWxhciBleHByZXNzaW9uIG9mIHRoZSB0b2tlbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2xvb2tiZWhpbmQ9ZmFsc2VdIElmIGB0cnVlYCwgdGhlbiB0aGUgZmlyc3QgY2FwdHVyaW5nIGdyb3VwIG9mIGBwYXR0ZXJuYCB3aWxsIChlZmZlY3RpdmVseSlcbiAqIGJlaGF2ZSBhcyBhIGxvb2tiZWhpbmQgZ3JvdXAgbWVhbmluZyB0aGF0IHRoZSBjYXB0dXJlZCB0ZXh0IHdpbGwgbm90IGJlIHBhcnQgb2YgdGhlIG1hdGNoZWQgdGV4dCBvZiB0aGUgbmV3IHRva2VuLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbZ3JlZWR5PWZhbHNlXSBXaGV0aGVyIHRoZSB0b2tlbiBpcyBncmVlZHkuXG4gKiBAcHJvcGVydHkge3N0cmluZ3xzdHJpbmdbXX0gW2FsaWFzXSBBbiBvcHRpb25hbCBhbGlhcyBvciBsaXN0IG9mIGFsaWFzZXMuXG4gKiBAcHJvcGVydHkge0dyYW1tYXJ9IFtpbnNpZGVdIFRoZSBuZXN0ZWQgZ3JhbW1hciBvZiB0aGlzIHRva2VuLlxuICpcbiAqIFRoZSBgaW5zaWRlYCBncmFtbWFyIHdpbGwgYmUgdXNlZCB0byB0b2tlbml6ZSB0aGUgdGV4dCB2YWx1ZSBvZiBlYWNoIHRva2VuIG9mIHRoaXMga2luZC5cbiAqXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIG1ha2UgbmVzdGVkIGFuZCBldmVuIHJlY3Vyc2l2ZSBsYW5ndWFnZSBkZWZpbml0aW9ucy5cbiAqXG4gKiBOb3RlOiBUaGlzIGNhbiBjYXVzZSBpbmZpbml0ZSByZWN1cnNpb24uIEJlIGNhcmVmdWwgd2hlbiB5b3UgZW1iZWQgZGlmZmVyZW50IGxhbmd1YWdlcyBvciBldmVuIHRoZSBzYW1lIGxhbmd1YWdlIGludG9cbiAqIGVhY2ggYW5vdGhlci5cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIEdyYW1tYXJcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBSZWdFeHAgfCBHcmFtbWFyVG9rZW4gfCBBcnJheTxSZWdFeHAgfCBHcmFtbWFyVG9rZW4+Pn1cbiAqIEBwcm9wZXJ0eSB7R3JhbW1hcn0gW3Jlc3RdIEFuIG9wdGlvbmFsIGdyYW1tYXIgb2JqZWN0IHRoYXQgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGlzIGdyYW1tYXIuXG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIHdpbGwgaW52b2tlZCBhZnRlciBhbiBlbGVtZW50IHdhcyBzdWNjZXNzZnVsbHkgaGlnaGxpZ2h0ZWQuXG4gKlxuICogQGNhbGxiYWNrIEhpZ2hsaWdodENhbGxiYWNrXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgc3VjY2Vzc2Z1bGx5IGhpZ2hsaWdodGVkLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgSG9va0NhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IGVudiBUaGUgZW52aXJvbm1lbnQgdmFyaWFibGVzIG9mIHRoZSBob29rLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLW1hcmt1cC5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5QcmlzbS5sYW5ndWFnZXMubWFya3VwID0ge1xuXHQnY29tbWVudCc6IC88IS0tW1xcc1xcU10qPy0tPi8sXG5cdCdwcm9sb2cnOiAvPFxcP1tcXHNcXFNdKz9cXD8+Lyxcblx0J2RvY3R5cGUnOiB7XG5cdFx0Ly8gaHR0cHM6Ly93d3cudzMub3JnL1RSL3htbC8jTlQtZG9jdHlwZWRlY2xcblx0XHRwYXR0ZXJuOiAvPCFET0NUWVBFKD86W14+XCInW1xcXV18XCJbXlwiXSpcInwnW14nXSonKSsoPzpcXFsoPzpbXjxcIidcXF1dfFwiW15cIl0qXCJ8J1teJ10qJ3w8KD8hIS0tKXw8IS0tKD86W14tXXwtKD8hLT4pKSotLT4pKlxcXVxccyopPz4vaSxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQnaW50ZXJuYWwtc3Vic2V0Jzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvKF5bXlxcW10qXFxbKVtcXHNcXFNdKyg/PVxcXT4kKS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiBudWxsIC8vIHNlZSBiZWxvd1xuXHRcdFx0fSxcblx0XHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9cIlteXCJdKlwifCdbXiddKicvLFxuXHRcdFx0XHRncmVlZHk6IHRydWVcblx0XHRcdH0sXG5cdFx0XHQncHVuY3R1YXRpb24nOiAvXjwhfD4kfFtbXFxdXS8sXG5cdFx0XHQnZG9jdHlwZS10YWcnOiAvXkRPQ1RZUEUvLFxuXHRcdFx0J25hbWUnOiAvW15cXHM8PidcIl0rL1xuXHRcdH1cblx0fSxcblx0J2NkYXRhJzogLzwhXFxbQ0RBVEFcXFtbXFxzXFxTXSo/XFxdXFxdPi9pLFxuXHQndGFnJzoge1xuXHRcdHBhdHRlcm46IC88XFwvPyg/IVxcZClbXlxccz5cXC89JDwlXSsoPzpcXHMoPzpcXHMqW15cXHM+XFwvPV0rKD86XFxzKj1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKyg/PVtcXHM+XSkpfCg/PVtcXHMvPl0pKSkrKT9cXHMqXFwvPz4vLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCd0YWcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9ePFxcLz9bXlxccz5cXC9dKy8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9ePFxcLz8vLFxuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnc3BlY2lhbC1hdHRyJzogW10sXG5cdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0cGF0dGVybjogLz1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKykvLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHBhdHRlcm46IC9ePS8sXG5cdFx0XHRcdFx0XHRcdGFsaWFzOiAnYXR0ci1lcXVhbHMnXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0L1wifCcvXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3B1bmN0dWF0aW9uJzogL1xcLz8+Lyxcblx0XHRcdCdhdHRyLW5hbWUnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9bXlxccz5cXC9dKy8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH1cblx0fSxcblx0J2VudGl0eSc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvJltcXGRhLXpdezEsOH07L2ksXG5cdFx0XHRhbGlhczogJ25hbWVkLWVudGl0eSdcblx0XHR9LFxuXHRcdC8mI3g/W1xcZGEtZl17MSw4fTsvaVxuXHRdXG59O1xuXG5QcmlzbS5sYW5ndWFnZXMubWFya3VwWyd0YWcnXS5pbnNpZGVbJ2F0dHItdmFsdWUnXS5pbnNpZGVbJ2VudGl0eSddID1cblx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFsnZW50aXR5J107XG5QcmlzbS5sYW5ndWFnZXMubWFya3VwWydkb2N0eXBlJ10uaW5zaWRlWydpbnRlcm5hbC1zdWJzZXQnXS5pbnNpZGUgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXG4vLyBQbHVnaW4gdG8gbWFrZSBlbnRpdHkgdGl0bGUgc2hvdyB0aGUgcmVhbCBlbnRpdHksIGlkZWEgYnkgUm9tYW4gS29tYXJvdlxuUHJpc20uaG9va3MuYWRkKCd3cmFwJywgZnVuY3Rpb24gKGVudikge1xuXG5cdGlmIChlbnYudHlwZSA9PT0gJ2VudGl0eScpIHtcblx0XHRlbnYuYXR0cmlidXRlc1sndGl0bGUnXSA9IGVudi5jb250ZW50LnJlcGxhY2UoLyZhbXA7LywgJyYnKTtcblx0fVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZywgJ2FkZElubGluZWQnLCB7XG5cdC8qKlxuXHQgKiBBZGRzIGFuIGlubGluZWQgbGFuZ3VhZ2UgdG8gbWFya3VwLlxuXHQgKlxuXHQgKiBBbiBleGFtcGxlIG9mIGFuIGlubGluZWQgbGFuZ3VhZ2UgaXMgQ1NTIHdpdGggYDxzdHlsZT5gIHRhZ3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIFRoZSBuYW1lIG9mIHRoZSB0YWcgdGhhdCBjb250YWlucyB0aGUgaW5saW5lZCBsYW5ndWFnZS4gVGhpcyBuYW1lIHdpbGwgYmUgdHJlYXRlZCBhc1xuXHQgKiBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZyBUaGUgbGFuZ3VhZ2Uga2V5LlxuXHQgKiBAZXhhbXBsZVxuXHQgKiBhZGRJbmxpbmVkKCdzdHlsZScsICdjc3MnKTtcblx0ICovXG5cdHZhbHVlOiBmdW5jdGlvbiBhZGRJbmxpbmVkKHRhZ05hbWUsIGxhbmcpIHtcblx0XHR2YXIgaW5jbHVkZWRDZGF0YUluc2lkZSA9IHt9O1xuXHRcdGluY2x1ZGVkQ2RhdGFJbnNpZGVbJ2xhbmd1YWdlLScgKyBsYW5nXSA9IHtcblx0XHRcdHBhdHRlcm46IC8oXjwhXFxbQ0RBVEFcXFspW1xcc1xcU10rPyg/PVxcXVxcXT4kKS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzW2xhbmddXG5cdFx0fTtcblx0XHRpbmNsdWRlZENkYXRhSW5zaWRlWydjZGF0YSddID0gL148IVxcW0NEQVRBXFxbfFxcXVxcXT4kL2k7XG5cblx0XHR2YXIgaW5zaWRlID0ge1xuXHRcdFx0J2luY2x1ZGVkLWNkYXRhJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvPCFcXFtDREFUQVxcW1tcXHNcXFNdKj9cXF1cXF0+L2ksXG5cdFx0XHRcdGluc2lkZTogaW5jbHVkZWRDZGF0YUluc2lkZVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0aW5zaWRlWydsYW5ndWFnZS0nICsgbGFuZ10gPSB7XG5cdFx0XHRwYXR0ZXJuOiAvW1xcc1xcU10rLyxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzW2xhbmddXG5cdFx0fTtcblxuXHRcdHZhciBkZWYgPSB7fTtcblx0XHRkZWZbdGFnTmFtZV0gPSB7XG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoLyg8X19bXj5dKj4pKD86PCFcXFtDREFUQVxcWyg/OlteXFxdXXxcXF0oPyFcXF0+KSkqXFxdXFxdPnwoPyE8IVxcW0NEQVRBXFxbKVtcXHNcXFNdKSo/KD89PFxcL19fPikvLnNvdXJjZS5yZXBsYWNlKC9fXy9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0YWdOYW1lOyB9KSwgJ2knKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRpbnNpZGU6IGluc2lkZVxuXHRcdH07XG5cblx0XHRQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY2RhdGEnLCBkZWYpO1xuXHR9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZywgJ2FkZEF0dHJpYnV0ZScsIHtcblx0LyoqXG5cdCAqIEFkZHMgYW4gcGF0dGVybiB0byBoaWdobGlnaHQgbGFuZ3VhZ2VzIGVtYmVkZGVkIGluIEhUTUwgYXR0cmlidXRlcy5cblx0ICpcblx0ICogQW4gZXhhbXBsZSBvZiBhbiBpbmxpbmVkIGxhbmd1YWdlIGlzIENTUyB3aXRoIGBzdHlsZWAgYXR0cmlidXRlcy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGF0dHJOYW1lIFRoZSBuYW1lIG9mIHRoZSB0YWcgdGhhdCBjb250YWlucyB0aGUgaW5saW5lZCBsYW5ndWFnZS4gVGhpcyBuYW1lIHdpbGwgYmUgdHJlYXRlZCBhc1xuXHQgKiBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZyBUaGUgbGFuZ3VhZ2Uga2V5LlxuXHQgKiBAZXhhbXBsZVxuXHQgKiBhZGRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2NzcycpO1xuXHQgKi9cblx0dmFsdWU6IGZ1bmN0aW9uIChhdHRyTmFtZSwgbGFuZykge1xuXHRcdFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmluc2lkZVsnc3BlY2lhbC1hdHRyJ10ucHVzaCh7XG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoXG5cdFx0XHRcdC8oXnxbXCInXFxzXSkvLnNvdXJjZSArICcoPzonICsgYXR0ck5hbWUgKyAnKScgKyAvXFxzKj1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKyg/PVtcXHM+XSkpLy5zb3VyY2UsXG5cdFx0XHRcdCdpJ1xuXHRcdFx0KSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2F0dHItbmFtZSc6IC9eW15cXHM9XSsvLFxuXHRcdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvPVtcXHNcXFNdKy8sXG5cdFx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0XHQndmFsdWUnOiB7XG5cdFx0XHRcdFx0XHRcdHBhdHRlcm46IC8oXj1cXHMqKFtcIiddfCg/IVtcIiddKSkpXFxTW1xcc1xcU10qKD89XFwyJCkvLFxuXHRcdFx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRhbGlhczogW2xhbmcsICdsYW5ndWFnZS0nICsgbGFuZ10sXG5cdFx0XHRcdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzW2xhbmddXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0cGF0dGVybjogL149Lyxcblx0XHRcdFx0XHRcdFx0XHRhbGlhczogJ2F0dHItZXF1YWxzJ1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHQvXCJ8Jy9cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5odG1sID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblByaXNtLmxhbmd1YWdlcy5tYXRobWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLnN2ZyA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cblByaXNtLmxhbmd1YWdlcy54bWwgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdtYXJrdXAnLCB7fSk7XG5QcmlzbS5sYW5ndWFnZXMuc3NtbCA9IFByaXNtLmxhbmd1YWdlcy54bWw7XG5QcmlzbS5sYW5ndWFnZXMuYXRvbSA9IFByaXNtLmxhbmd1YWdlcy54bWw7XG5QcmlzbS5sYW5ndWFnZXMucnNzID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLWNzcy5qc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG4oZnVuY3Rpb24gKFByaXNtKSB7XG5cblx0dmFyIHN0cmluZyA9IC8oPzpcIig/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfFteXCJcXFxcXFxyXFxuXSkqXCJ8Jyg/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfFteJ1xcXFxcXHJcXG5dKSonKS87XG5cblx0UHJpc20ubGFuZ3VhZ2VzLmNzcyA9IHtcblx0XHQnY29tbWVudCc6IC9cXC9cXCpbXFxzXFxTXSo/XFwqXFwvLyxcblx0XHQnYXRydWxlJzoge1xuXHRcdFx0cGF0dGVybjogL0BbXFx3LV0oPzpbXjt7XFxzXXxcXHMrKD8hW1xcc3tdKSkqKD86O3woPz1cXHMqXFx7KSkvLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdydWxlJzogL15AW1xcdy1dKy8sXG5cdFx0XHRcdCdzZWxlY3Rvci1mdW5jdGlvbi1hcmd1bWVudCc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvKFxcYnNlbGVjdG9yXFxzKlxcKFxccyooPyFbXFxzKV0pKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKCg/OlteKCldfFxcKFteKCldKlxcKSkqXFwpKSsoPz1cXHMqXFwpKS8sXG5cdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0XHRhbGlhczogJ3NlbGVjdG9yJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQna2V5d29yZCc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvKF58W15cXHctXSkoPzphbmR8bm90fG9ubHl8b3IpKD8hW1xcdy1dKS8sXG5cdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIFNlZSByZXN0IGJlbG93XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQndXJsJzoge1xuXHRcdFx0Ly8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKCdcXFxcYnVybFxcXFwoKD86JyArIHN0cmluZy5zb3VyY2UgKyAnfCcgKyAvKD86W15cXFxcXFxyXFxuKClcIiddfFxcXFxbXFxzXFxTXSkqLy5zb3VyY2UgKyAnKVxcXFwpJywgJ2knKSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnZnVuY3Rpb24nOiAvXnVybC9pLFxuXHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXlxcKHxcXCkkLyxcblx0XHRcdFx0J3N0cmluZyc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJ14nICsgc3RyaW5nLnNvdXJjZSArICckJyksXG5cdFx0XHRcdFx0YWxpYXM6ICd1cmwnXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdCdzZWxlY3Rvcic6IHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnKF58W3t9XFxcXHNdKVtee31cXFxcc10oPzpbXnt9O1wiXFwnXFxcXHNdfFxcXFxzKyg/IVtcXFxcc3tdKXwnICsgc3RyaW5nLnNvdXJjZSArICcpKig/PVxcXFxzKlxcXFx7KScpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0J3N0cmluZyc6IHtcblx0XHRcdHBhdHRlcm46IHN0cmluZyxcblx0XHRcdGdyZWVkeTogdHJ1ZVxuXHRcdH0sXG5cdFx0J3Byb3BlcnR5Jzoge1xuXHRcdFx0cGF0dGVybjogLyhefFteLVxcd1xceEEwLVxcdUZGRkZdKSg/IVxccylbLV9hLXpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbLVxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqOikvaSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdCdpbXBvcnRhbnQnOiAvIWltcG9ydGFudFxcYi9pLFxuXHRcdCdmdW5jdGlvbic6IHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXi1hLXowLTldKVstYS16MC05XSsoPz1cXCgpL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHQncHVuY3R1YXRpb24nOiAvWygpe307OixdL1xuXHR9O1xuXG5cdFByaXNtLmxhbmd1YWdlcy5jc3NbJ2F0cnVsZSddLmluc2lkZS5yZXN0ID0gUHJpc20ubGFuZ3VhZ2VzLmNzcztcblxuXHR2YXIgbWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblx0aWYgKG1hcmt1cCkge1xuXHRcdG1hcmt1cC50YWcuYWRkSW5saW5lZCgnc3R5bGUnLCAnY3NzJyk7XG5cdFx0bWFya3VwLnRhZy5hZGRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2NzcycpO1xuXHR9XG5cbn0oUHJpc20pKTtcblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLWNsaWtlLmpzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblByaXNtLmxhbmd1YWdlcy5jbGlrZSA9IHtcblx0J2NvbW1lbnQnOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteXFxcXF0pXFwvXFwqW1xcc1xcU10qPyg/OlxcKlxcL3wkKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcOl0pXFwvXFwvLiovLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZVxuXHRcdH1cblx0XSxcblx0J3N0cmluZyc6IHtcblx0XHRwYXR0ZXJuOiAvKFtcIiddKSg/OlxcXFwoPzpcXHJcXG58W1xcc1xcU10pfCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDEvLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQnY2xhc3MtbmFtZSc6IHtcblx0XHRwYXR0ZXJuOiAvKFxcYig/OmNsYXNzfGludGVyZmFjZXxleHRlbmRzfGltcGxlbWVudHN8dHJhaXR8aW5zdGFuY2VvZnxuZXcpXFxzK3xcXGJjYXRjaFxccytcXCgpW1xcdy5cXFxcXSsvaSxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3B1bmN0dWF0aW9uJzogL1suXFxcXF0vXG5cdFx0fVxuXHR9LFxuXHQna2V5d29yZCc6IC9cXGIoPzppZnxlbHNlfHdoaWxlfGRvfGZvcnxyZXR1cm58aW58aW5zdGFuY2VvZnxmdW5jdGlvbnxuZXd8dHJ5fHRocm93fGNhdGNofGZpbmFsbHl8bnVsbHxicmVha3xjb250aW51ZSlcXGIvLFxuXHQnYm9vbGVhbic6IC9cXGIoPzp0cnVlfGZhbHNlKVxcYi8sXG5cdCdmdW5jdGlvbic6IC9cXGJcXHcrKD89XFwoKS8sXG5cdCdudW1iZXInOiAvXFxiMHhbXFxkYS1mXStcXGJ8KD86XFxiXFxkKyg/OlxcLlxcZCopP3xcXEJcXC5cXGQrKSg/OmVbKy1dP1xcZCspPy9pLFxuXHQnb3BlcmF0b3InOiAvWzw+XT0/fFshPV09Pz0/fC0tP3xcXCtcXCs/fCYmP3xcXHxcXHw/fFs/Ki9+XiVdLyxcblx0J3B1bmN0dWF0aW9uJzogL1t7fVtcXF07KCksLjpdL1xufTtcblxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgIEJlZ2luIHByaXNtLWphdmFzY3JpcHQuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcblx0J2NsYXNzLW5hbWUnOiBbXG5cdFx0UHJpc20ubGFuZ3VhZ2VzLmNsaWtlWydjbGFzcy1uYW1lJ10sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteJFxcd1xceEEwLVxcdUZGRkZdKSg/IVxccylbXyRBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXC4oPzpwcm90b3R5cGV8Y29uc3RydWN0b3IpKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fVxuXHRdLFxuXHQna2V5d29yZCc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKCg/Ol58XFx9KVxccyopY2F0Y2hcXGIvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteLl18XFwuXFwuXFwuXFxzKilcXGIoPzphc3xhc3NlcnQoPz1cXHMqXFx7KXxhc3luYyg/PVxccyooPzpmdW5jdGlvblxcYnxcXCh8WyRcXHdcXHhBMC1cXHVGRkZGXXwkKSl8YXdhaXR8YnJlYWt8Y2FzZXxjbGFzc3xjb25zdHxjb250aW51ZXxkZWJ1Z2dlcnxkZWZhdWx0fGRlbGV0ZXxkb3xlbHNlfGVudW18ZXhwb3J0fGV4dGVuZHN8ZmluYWxseSg/PVxccyooPzpcXHt8JCkpfGZvcnxmcm9tKD89XFxzKig/OlsnXCJdfCQpKXxmdW5jdGlvbnwoPzpnZXR8c2V0KSg/PVxccyooPzpbI1xcWyRcXHdcXHhBMC1cXHVGRkZGXXwkKSl8aWZ8aW1wbGVtZW50c3xpbXBvcnR8aW58aW5zdGFuY2VvZnxpbnRlcmZhY2V8bGV0fG5ld3xudWxsfG9mfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHJldHVybnxzdGF0aWN8c3VwZXJ8c3dpdGNofHRoaXN8dGhyb3d8dHJ5fHR5cGVvZnx1bmRlZmluZWR8dmFyfHZvaWR8d2hpbGV8d2l0aHx5aWVsZClcXGIvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdF0sXG5cdC8vIEFsbG93IGZvciBhbGwgbm9uLUFTQ0lJIGNoYXJhY3RlcnMgKFNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMDA4NDQ0KVxuXHQnZnVuY3Rpb24nOiAvIz8oPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKig/OlxcLlxccyooPzphcHBseXxiaW5kfGNhbGwpXFxzKik/XFwoKS8sXG5cdCdudW1iZXInOiAvXFxiKD86KD86MFt4WF0oPzpbXFxkQS1GYS1mXSg/Ol9bXFxkQS1GYS1mXSk/KSt8MFtiQl0oPzpbMDFdKD86X1swMV0pPykrfDBbb09dKD86WzAtN10oPzpfWzAtN10pPykrKW4/fCg/OlxcZCg/Ol9cXGQpPykrbnxOYU58SW5maW5pdHkpXFxifCg/OlxcYig/OlxcZCg/Ol9cXGQpPykrXFwuPyg/OlxcZCg/Ol9cXGQpPykqfFxcQlxcLig/OlxcZCg/Ol9cXGQpPykrKSg/OltFZV1bKy1dPyg/OlxcZCg/Ol9cXGQpPykrKT8vLFxuXHQnb3BlcmF0b3InOiAvLS18XFwrXFwrfFxcKlxcKj0/fD0+fCYmPT98XFx8XFx8PT98WyE9XT09fDw8PT98Pj4+Pz0/fFstKyovJSZ8XiE9PD5dPT98XFwuezN9fFxcP1xcPz0/fFxcP1xcLj98W346XS9cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFsnY2xhc3MtbmFtZSddWzBdLnBhdHRlcm4gPSAvKFxcYig/OmNsYXNzfGludGVyZmFjZXxleHRlbmRzfGltcGxlbWVudHN8aW5zdGFuY2VvZnxuZXcpXFxzKylbXFx3LlxcXFxdKy87XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAna2V5d29yZCcsIHtcblx0J3JlZ2V4Jzoge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tZHVwZS1jaGFyYWN0ZXJzLWNoYXJhY3Rlci1jbGFzc1xuXHRcdHBhdHRlcm46IC8oKD86XnxbXiRcXHdcXHhBMC1cXHVGRkZGLlwiJ1xcXSlcXHNdfFxcYig/OnJldHVybnx5aWVsZCkpXFxzKilcXC8oPzpcXFsoPzpbXlxcXVxcXFxcXHJcXG5dfFxcXFwuKSpcXF18XFxcXC58W14vXFxcXFxcW1xcclxcbl0pK1xcL1tkZ2lteXVzXXswLDd9KD89KD86XFxzfFxcL1xcKig/OlteKl18XFwqKD8hXFwvKSkqXFwqXFwvKSooPzokfFtcXHJcXG4sLjs6fSlcXF1dfFxcL1xcLykpLyxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdyZWdleC1zb3VyY2UnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9eKFxcLylbXFxzXFxTXSsoPz1cXC9bYS16XSokKS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGFsaWFzOiAnbGFuZ3VhZ2UtcmVnZXgnLFxuXHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5yZWdleFxuXHRcdFx0fSxcblx0XHRcdCdyZWdleC1kZWxpbWl0ZXInOiAvXlxcL3xcXC8kLyxcblx0XHRcdCdyZWdleC1mbGFncyc6IC9eW2Etel0rJC8sXG5cdFx0fVxuXHR9LFxuXHQvLyBUaGlzIG11c3QgYmUgZGVjbGFyZWQgYmVmb3JlIGtleXdvcmQgYmVjYXVzZSB3ZSB1c2UgXCJmdW5jdGlvblwiIGluc2lkZSB0aGUgbG9vay1mb3J3YXJkXG5cdCdmdW5jdGlvbi12YXJpYWJsZSc6IHtcblx0XHRwYXR0ZXJuOiAvIz8oPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKls9Ol1cXHMqKD86YXN5bmNcXHMqKT8oPzpcXGJmdW5jdGlvblxcYnwoPzpcXCgoPzpbXigpXXxcXChbXigpXSpcXCkpKlxcKXwoPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKVxccyo9PikpLyxcblx0XHRhbGlhczogJ2Z1bmN0aW9uJ1xuXHR9LFxuXHQncGFyYW1ldGVyJzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oZnVuY3Rpb24oPzpcXHMrKD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKik/XFxzKlxcKFxccyopKD8hXFxzKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKFteKCldKlxcKSkrKD89XFxzKlxcKSkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXiRcXHdcXHhBMC1cXHVGRkZGXSkoPyFcXHMpW18kYS16XFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKj0+KS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXFwoXFxzKikoPyFcXHMpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoW14oKV0qXFwpKSsoPz1cXHMqXFwpXFxzKj0+KS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLygoPzpcXGJ8XFxzfF4pKD8hKD86YXN8YXN5bmN8YXdhaXR8YnJlYWt8Y2FzZXxjYXRjaHxjbGFzc3xjb25zdHxjb250aW51ZXxkZWJ1Z2dlcnxkZWZhdWx0fGRlbGV0ZXxkb3xlbHNlfGVudW18ZXhwb3J0fGV4dGVuZHN8ZmluYWxseXxmb3J8ZnJvbXxmdW5jdGlvbnxnZXR8aWZ8aW1wbGVtZW50c3xpbXBvcnR8aW58aW5zdGFuY2VvZnxpbnRlcmZhY2V8bGV0fG5ld3xudWxsfG9mfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHJldHVybnxzZXR8c3RhdGljfHN1cGVyfHN3aXRjaHx0aGlzfHRocm93fHRyeXx0eXBlb2Z8dW5kZWZpbmVkfHZhcnx2b2lkfHdoaWxlfHdpdGh8eWllbGQpKD8hWyRcXHdcXHhBMC1cXHVGRkZGXSkpKD86KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKlxccyopXFwoXFxzKnxcXF1cXHMqXFwoXFxzKikoPyFcXHMpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoW14oKV0qXFwpKSsoPz1cXHMqXFwpXFxzKlxceykvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9XG5cdF0sXG5cdCdjb25zdGFudCc6IC9cXGJbQS1aXSg/OltBLVpfXXxcXGR4PykqXFxiL1xufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAnc3RyaW5nJywge1xuXHQnaGFzaGJhbmcnOiB7XG5cdFx0cGF0dGVybjogL14jIS4qLyxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0YWxpYXM6ICdjb21tZW50J1xuXHR9LFxuXHQndGVtcGxhdGUtc3RyaW5nJzoge1xuXHRcdHBhdHRlcm46IC9gKD86XFxcXFtcXHNcXFNdfFxcJFxceyg/Oltee31dfFxceyg/Oltee31dfFxce1tefV0qXFx9KSpcXH0pK1xcfXwoPyFcXCRcXHspW15cXFxcYF0pKmAvLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCd0ZW1wbGF0ZS1wdW5jdHVhdGlvbic6IHtcblx0XHRcdFx0cGF0dGVybjogL15gfGAkLyxcblx0XHRcdFx0YWxpYXM6ICdzdHJpbmcnXG5cdFx0XHR9LFxuXHRcdFx0J2ludGVycG9sYXRpb24nOiB7XG5cdFx0XHRcdHBhdHRlcm46IC8oKD86XnxbXlxcXFxdKSg/OlxcXFx7Mn0pKilcXCRcXHsoPzpbXnt9XXxcXHsoPzpbXnt9XXxcXHtbXn1dKlxcfSkqXFx9KStcXH0vLFxuXHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQnaW50ZXJwb2xhdGlvbi1wdW5jdHVhdGlvbic6IHtcblx0XHRcdFx0XHRcdHBhdHRlcm46IC9eXFwkXFx7fFxcfSQvLFxuXHRcdFx0XHRcdFx0YWxpYXM6ICdwdW5jdHVhdGlvbidcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHJlc3Q6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnc3RyaW5nJzogL1tcXHNcXFNdKy9cblx0XHR9XG5cdH1cbn0pO1xuXG5pZiAoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCkge1xuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5hZGRJbmxpbmVkKCdzY3JpcHQnLCAnamF2YXNjcmlwdCcpO1xuXG5cdC8vIGFkZCBhdHRyaWJ1dGUgc3VwcG9ydCBmb3IgYWxsIERPTSBldmVudHMuXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0V2ZW50cyNTdGFuZGFyZF9ldmVudHNcblx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuYWRkQXR0cmlidXRlKFxuXHRcdC9vbig/OmFib3J0fGJsdXJ8Y2hhbmdlfGNsaWNrfGNvbXBvc2l0aW9uKD86ZW5kfHN0YXJ0fHVwZGF0ZSl8ZGJsY2xpY2t8ZXJyb3J8Zm9jdXMoPzppbnxvdXQpP3xrZXkoPzpkb3dufHVwKXxsb2FkfG1vdXNlKD86ZG93bnxlbnRlcnxsZWF2ZXxtb3ZlfG91dHxvdmVyfHVwKXxyZXNldHxyZXNpemV8c2Nyb2xsfHNlbGVjdHxzbG90Y2hhbmdlfHN1Ym1pdHx1bmxvYWR8d2hlZWwpLy5zb3VyY2UsXG5cdFx0J2phdmFzY3JpcHQnXG5cdCk7XG59XG5cblByaXNtLmxhbmd1YWdlcy5qcyA9IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0O1xuXG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgQmVnaW4gcHJpc20tZmlsZS1oaWdobGlnaHQuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuKGZ1bmN0aW9uICgpIHtcblxuXHRpZiAodHlwZW9mIFByaXNtID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvbWF0Y2hlcyNQb2x5ZmlsbFxuXHRpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcblx0XHRFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuXHR9XG5cblx0dmFyIExPQURJTkdfTUVTU0FHRSA9ICdMb2FkaW5n4oCmJztcblx0dmFyIEZBSUxVUkVfTUVTU0FHRSA9IGZ1bmN0aW9uIChzdGF0dXMsIG1lc3NhZ2UpIHtcblx0XHRyZXR1cm4gJ+KcliBFcnJvciAnICsgc3RhdHVzICsgJyB3aGlsZSBmZXRjaGluZyBmaWxlOiAnICsgbWVzc2FnZTtcblx0fTtcblx0dmFyIEZBSUxVUkVfRU1QVFlfTUVTU0FHRSA9ICfinJYgRXJyb3I6IEZpbGUgZG9lcyBub3QgZXhpc3Qgb3IgaXMgZW1wdHknO1xuXG5cdHZhciBFWFRFTlNJT05TID0ge1xuXHRcdCdqcyc6ICdqYXZhc2NyaXB0Jyxcblx0XHQncHknOiAncHl0aG9uJyxcblx0XHQncmInOiAncnVieScsXG5cdFx0J3BzMSc6ICdwb3dlcnNoZWxsJyxcblx0XHQncHNtMSc6ICdwb3dlcnNoZWxsJyxcblx0XHQnc2gnOiAnYmFzaCcsXG5cdFx0J2JhdCc6ICdiYXRjaCcsXG5cdFx0J2gnOiAnYycsXG5cdFx0J3RleCc6ICdsYXRleCdcblx0fTtcblxuXHR2YXIgU1RBVFVTX0FUVFIgPSAnZGF0YS1zcmMtc3RhdHVzJztcblx0dmFyIFNUQVRVU19MT0FESU5HID0gJ2xvYWRpbmcnO1xuXHR2YXIgU1RBVFVTX0xPQURFRCA9ICdsb2FkZWQnO1xuXHR2YXIgU1RBVFVTX0ZBSUxFRCA9ICdmYWlsZWQnO1xuXG5cdHZhciBTRUxFQ1RPUiA9ICdwcmVbZGF0YS1zcmNdOm5vdChbJyArIFNUQVRVU19BVFRSICsgJz1cIicgKyBTVEFUVVNfTE9BREVEICsgJ1wiXSknXG5cdFx0KyAnOm5vdChbJyArIFNUQVRVU19BVFRSICsgJz1cIicgKyBTVEFUVVNfTE9BRElORyArICdcIl0pJztcblxuXHR2YXIgbGFuZyA9IC9cXGJsYW5nKD86dWFnZSk/LShbXFx3LV0rKVxcYi9pO1xuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBQcmlzbSBgbGFuZ3VhZ2UteHh4eGAgb3IgYGxhbmcteHh4eGAgY2xhc3MgdG8gdGhlIGdpdmVuIGxhbmd1YWdlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIHNldExhbmd1YWdlQ2xhc3MoZWxlbWVudCwgbGFuZ3VhZ2UpIHtcblx0XHR2YXIgY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWU7XG5cdFx0Y2xhc3NOYW1lID0gY2xhc3NOYW1lLnJlcGxhY2UobGFuZywgJyAnKSArICcgbGFuZ3VhZ2UtJyArIGxhbmd1YWdlO1xuXHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lLnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKCk7XG5cdH1cblxuXG5cdFByaXNtLmhvb2tzLmFkZCgnYmVmb3JlLWhpZ2hsaWdodGFsbCcsIGZ1bmN0aW9uIChlbnYpIHtcblx0XHRlbnYuc2VsZWN0b3IgKz0gJywgJyArIFNFTEVDVE9SO1xuXHR9KTtcblxuXHRQcmlzbS5ob29rcy5hZGQoJ2JlZm9yZS1zYW5pdHktY2hlY2snLCBmdW5jdGlvbiAoZW52KSB7XG5cdFx0dmFyIHByZSA9IC8qKiBAdHlwZSB7SFRNTFByZUVsZW1lbnR9ICovIChlbnYuZWxlbWVudCk7XG5cdFx0aWYgKHByZS5tYXRjaGVzKFNFTEVDVE9SKSkge1xuXHRcdFx0ZW52LmNvZGUgPSAnJzsgLy8gZmFzdC1wYXRoIHRoZSB3aG9sZSB0aGluZyBhbmQgZ28gdG8gY29tcGxldGVcblxuXHRcdFx0cHJlLnNldEF0dHJpYnV0ZShTVEFUVVNfQVRUUiwgU1RBVFVTX0xPQURJTkcpOyAvLyBtYXJrIGFzIGxvYWRpbmdcblxuXHRcdFx0Ly8gYWRkIGNvZGUgZWxlbWVudCB3aXRoIGxvYWRpbmcgbWVzc2FnZVxuXHRcdFx0dmFyIGNvZGUgPSBwcmUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQ09ERScpKTtcblx0XHRcdGNvZGUudGV4dENvbnRlbnQgPSBMT0FESU5HX01FU1NBR0U7XG5cblx0XHRcdHZhciBzcmMgPSBwcmUuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xuXG5cdFx0XHR2YXIgbGFuZ3VhZ2UgPSBlbnYubGFuZ3VhZ2U7XG5cdFx0XHRpZiAobGFuZ3VhZ2UgPT09ICdub25lJykge1xuXHRcdFx0XHQvLyB0aGUgbGFuZ3VhZ2UgbWlnaHQgYmUgJ25vbmUnIGJlY2F1c2UgdGhlcmUgaXMgbm8gbGFuZ3VhZ2Ugc2V0O1xuXHRcdFx0XHQvLyBpbiB0aGlzIGNhc2UsIHdlIHdhbnQgdG8gdXNlIHRoZSBleHRlbnNpb24gYXMgdGhlIGxhbmd1YWdlXG5cdFx0XHRcdHZhciBleHRlbnNpb24gPSAoL1xcLihcXHcrKSQvLmV4ZWMoc3JjKSB8fCBbLCAnbm9uZSddKVsxXTtcblx0XHRcdFx0bGFuZ3VhZ2UgPSBFWFRFTlNJT05TW2V4dGVuc2lvbl0gfHwgZXh0ZW5zaW9uO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBzZXQgbGFuZ3VhZ2UgY2xhc3Nlc1xuXHRcdFx0c2V0TGFuZ3VhZ2VDbGFzcyhjb2RlLCBsYW5ndWFnZSk7XG5cdFx0XHRzZXRMYW5ndWFnZUNsYXNzKHByZSwgbGFuZ3VhZ2UpO1xuXG5cdFx0XHQvLyBwcmVsb2FkIHRoZSBsYW5ndWFnZVxuXHRcdFx0dmFyIGF1dG9sb2FkZXIgPSBQcmlzbS5wbHVnaW5zLmF1dG9sb2FkZXI7XG5cdFx0XHRpZiAoYXV0b2xvYWRlcikge1xuXHRcdFx0XHRhdXRvbG9hZGVyLmxvYWRMYW5ndWFnZXMobGFuZ3VhZ2UpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBsb2FkIGZpbGVcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdHRVQnLCBzcmMsIHRydWUpO1xuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcblx0XHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA8IDQwMCAmJiB4aHIucmVzcG9uc2VUZXh0KSB7XG5cdFx0XHRcdFx0XHQvLyBtYXJrIGFzIGxvYWRlZFxuXHRcdFx0XHRcdFx0cHJlLnNldEF0dHJpYnV0ZShTVEFUVVNfQVRUUiwgU1RBVFVTX0xPQURFRCk7XG5cblx0XHRcdFx0XHRcdC8vIGhpZ2hsaWdodCBjb2RlXG5cdFx0XHRcdFx0XHRjb2RlLnRleHRDb250ZW50ID0geGhyLnJlc3BvbnNlVGV4dDtcblx0XHRcdFx0XHRcdFByaXNtLmhpZ2hsaWdodEVsZW1lbnQoY29kZSk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gbWFyayBhcyBmYWlsZWRcblx0XHRcdFx0XHRcdHByZS5zZXRBdHRyaWJ1dGUoU1RBVFVTX0FUVFIsIFNUQVRVU19GQUlMRUQpO1xuXG5cdFx0XHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA+PSA0MDApIHtcblx0XHRcdFx0XHRcdFx0Y29kZS50ZXh0Q29udGVudCA9IEZBSUxVUkVfTUVTU0FHRSh4aHIuc3RhdHVzLCB4aHIuc3RhdHVzVGV4dCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjb2RlLnRleHRDb250ZW50ID0gRkFJTFVSRV9FTVBUWV9NRVNTQUdFO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHhoci5zZW5kKG51bGwpO1xuXHRcdH1cblx0fSk7XG5cblx0UHJpc20ucGx1Z2lucy5maWxlSGlnaGxpZ2h0ID0ge1xuXHRcdC8qKlxuXHRcdCAqIEV4ZWN1dGVzIHRoZSBGaWxlIEhpZ2hsaWdodCBwbHVnaW4gZm9yIGFsbCBtYXRjaGluZyBgcHJlYCBlbGVtZW50cyB1bmRlciB0aGUgZ2l2ZW4gY29udGFpbmVyLlxuXHRcdCAqXG5cdFx0ICogTm90ZTogRWxlbWVudHMgd2hpY2ggYXJlIGFscmVhZHkgbG9hZGVkIG9yIGN1cnJlbnRseSBsb2FkaW5nIHdpbGwgbm90IGJlIHRvdWNoZWQgYnkgdGhpcyBtZXRob2QuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1BhcmVudE5vZGV9IFtjb250YWluZXI9ZG9jdW1lbnRdXG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0OiBmdW5jdGlvbiBoaWdobGlnaHQoY29udGFpbmVyKSB7XG5cdFx0XHR2YXIgZWxlbWVudHMgPSAoY29udGFpbmVyIHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKFNFTEVDVE9SKTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGVsZW1lbnQ7IChlbGVtZW50ID0gZWxlbWVudHNbaSsrXSk7KSB7XG5cdFx0XHRcdFByaXNtLmhpZ2hsaWdodEVsZW1lbnQoZWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBsb2dnZWQgPSBmYWxzZTtcblx0LyoqIEBkZXByZWNhdGVkIFVzZSBgUHJpc20ucGx1Z2lucy5maWxlSGlnaGxpZ2h0LmhpZ2hsaWdodGAgaW5zdGVhZC4gKi9cblx0UHJpc20uZmlsZUhpZ2hsaWdodCA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIWxvZ2dlZCkge1xuXHRcdFx0Y29uc29sZS53YXJuKCdQcmlzbS5maWxlSGlnaGxpZ2h0IGlzIGRlcHJlY2F0ZWQuIFVzZSBgUHJpc20ucGx1Z2lucy5maWxlSGlnaGxpZ2h0LmhpZ2hsaWdodGAgaW5zdGVhZC4nKTtcblx0XHRcdGxvZ2dlZCA9IHRydWU7XG5cdFx0fVxuXHRcdFByaXNtLnBsdWdpbnMuZmlsZUhpZ2hsaWdodC5oaWdobGlnaHQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0fTtcblxufSgpKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgSVRhZyB9IGZyb20gJy4uL3J1bnRpbWUvVCdcblxuY29uc3QgdmFsaWRUYWdzID0gWydwJywgJ3N1YnRpdGxlJywgJ3NlY3Rpb24nLCAnYnInLCAnY29kZScsICdhc2NpaW1hdGgnLCAneW91dHViZScsXG4gICAgJ3RpdGxlJywgJ21vZHVsZScsICdsZXNzb24nLCAnc2hvcnRkZXNjJywgJ2JyZWFrJywgJ2RyaWxsJywgJ2tleScsICdydW4nXVxuXG5cbmV4cG9ydCBjbGFzcyBMZXNzb25Ub0lUYWdzIHtcblxuICAgIHB1YmxpYyBhc3NldHNVUkk6IHN0cmluZyA9ICcnXG5cbiAgICBwcml2YXRlIGluQVNwZWVjaEJsb2NrID0gZmFsc2VcbiAgICBwcml2YXRlIHV0dGVyYW5jZVRhZzogSVRhZyAgLy8gYWNjdW11bGF0ZSBzcGVlY2ggb3ZlciBtdWx0aXBsZSA8cD4gaW50byBGSVJTVCB0YWdcbiAgICBwcml2YXRlIHV0dGVyYW5jZTogc3RyaW5nID0gJycgLy8gY29sbGVjdCB1dHRlcmFuY2VzLCB0aGV5IGFsbCBnbyBpbnRvIHRoZSBGSVJTVCBibG9ja1xuXG4gICAgcHJpdmF0ZSBoYXNUaXRsZSA9IGZhbHNlXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gbmVlZCB0byBpbml0aWFsaXplIHRoZSB1dHRlcmFuY2VUYWcsIGJ1dCB3ZSBkb24ndCBoYXZlIHRoZSBmaXJzdCB1dHRlcmFuY2UgeWV0XG4gICAgICAgIHRoaXMudXR0ZXJhbmNlVGFnID0gdGhpcy5pVGFnRmFjdG9yeSgncCcsIG5ldyBNYXA8YW55LCBhbnk+KCksICcnKVxuXG4gICAgICAgIHRoaXMudW5pdFRlc3RzKCkgIC8vIHdlIEFMV0FZUyBydW4gdGhlIHVuaXQgdGVzdHNcblxuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgYSBsZXNzb24gaW50byByZWFkeS10by1pbnNlcnQgSFRNTFxuICAgIHBhcnNlKGFzc2V0c1VSSTogc3RyaW5nLCBsZXNzb246IHN0cmluZyk6IElUYWdbXSB7XG5cbiAgICAgICAgdGhpcy5hc3NldHNVUkkgPSBhc3NldHNVUklcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhsZXNzb24uc2xpY2UoMCwgMTAwKSlcblxuICAgICAgICAvLyBwcm9jZXNzIGxlc3NvbiBpbnRvIGEgbmljZSBhcnJheSBvZiBsaW5lcyAoYWN0dWFsbHkgcGFyYWdyYXBocylcbiAgICAgICAgbGV0IGFMaW5lczogc3RyaW5nW10gPSBsZXNzb24udG9TdHJpbmcoKS5zcGxpdCgnXFxuJylcblxuICAgICAgICAvLyBzdHJpcCBvdXQgYW55IFwiYnl0ZSBvcmRlciBtYXJrXCIgZnJvbSBzdGFydCBvZiBsaW5lc1xuICAgICAgICAvLyB1dGY4OiAgMHhFRiwweEJCLDB4QkYuXG4gICAgICAgIC8vIHV0ZjE2OiBVK0ZFRkZcbiAgICAgICAgLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQnl0ZV9vcmRlcl9tYXJrXG5cbiAgICAgICAgLy8gQ2F0Y2hlcyBFRkJCQkYgKFVURi04IEJPTSkgYmVjYXVzZSB0aGUgYnVmZmVyLXRvLXN0cmluZ1xuICAgICAgICAvLyBjb252ZXJzaW9uIHRyYW5zbGF0ZXMgaXQgdG8gRkVGRiAoVVRGLTE2IEJPTSlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhTGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhTGluZXNbaV0uY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgICAgICAgICAgICAgYUxpbmVzW2ldID0gYUxpbmVzW2ldLnNsaWNlKDEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8vLy8vLy8vLy8gc2hvdyBjaGFyIHZhbHVlcyBmb3IgZGVidWdnaW5nXG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnMScsIGksIGFMaW5lc1tpXSlcbiAgICAgICAgLy8gICAgIGZvciAobGV0IGogPSAwOyBqIDwgYUxpbmVzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coaSwgaiwgYUxpbmVzW2ldLmNoYXJDb2RlQXQoaikpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyByZXBsYWNlIEFMTCBDUkxGIHdpdGggb3JkaW5hcnkgbmV3bGluZSBcXG5cbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBhTGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgIGFMaW5lc1tpXSA9IGFMaW5lc1tpXS5yZXBsYWNlKG5ldyBSZWdFeHAoL1xcci9nbSksICdcXG4nKVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gY29udmVydCBmcm9tIHRleHQgbGluZXMgdG8gSVRhZ3MgKG1heWJlIGNvbnNvbGlkYXRpbmcpXG4gICAgICAgIGxldCBhVGFncyA9IHRoaXMuaW5wdXRUb1BhcmFncmFwaHMoYUxpbmVzKVxuXG4gICAgICAgIC8vIC8vLy8vLy8vLy8vLyBzaG93IGFUYWdzIGZvciBkZWJ1Z2dpbmdcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdhVGFnJywgaSwgYVRhZ3MpXG4gICAgICAgIC8vIH1cblxuXG4gICAgICAgIGFUYWdzID0gdGhpcy5zdHJpcEFuZEhpZGVJbm5lclRhZ3MoYVRhZ3MpXG5cblxuXG4gICAgICAgIC8vIHByZXByb2Nlc3MgdGFnIGFycmF5IGluIHBsYWNlIC0gdGhpcyB3b3JrcyBiZWNhdXNlIGNhbGwtYnktcmVmZXJlbmNlXG4gICAgICAgIHRoaXMucHJlUHJvY2Vzc1RhZ0FycmF5KGFUYWdzKVxuXG4gICAgICAgIHJldHVybiAoYVRhZ3MpXG4gICAgfVxuXG5cbiAgICB0aHJlZURpZ2l0KG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAoJzAwMCcgKyBuKS5zbGljZSgtMykgLy8gYWx3YXlzIGEgdGhyZWUtZGlnaXQgc3RyaW5nLW51bWJlciAwMDEsIDAwMiwgZXRjXG4gICAgfVxuXG4gICAgaXNTdHJpbmcodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZ1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgaWYgYSB2YWx1ZSBpcyByZWFsbHkgYSBudW1iZXJcbiAgICBpc051bWJlcih2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbHVlKVxuICAgIH1cblxuICAgIHByb2Nlc3NNYXJrZG93bihzVGVzdDogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICAvLyBmaXJzdCBhbHRlcm5hdGUgdm9pY2UgLyBzcGVlY2hcbiAgICAgICAgc1Rlc3QgPSB0aGlzLnByb2Nlc3NBbHRlcm5hdGVNYXJrZG93bihzVGVzdCwgdHJ1ZSkgIC8vIGtlZXAgZmlyc3Qgc2V0XG4gICAgICAgIHNUZXN0ID0gdGhpcy5wcm9jZXNzU2luZ2xlTWFya2Rvd24oc1Rlc3QsIC8gIy4qIy8sIC9bXlxcXFxdIy8sICcgPGVtPicsICc8L2VtPicpICAvLyBhbGxvdyAjIHdpdGggZXNjYXBlIFxcI1xuICAgICAgICBzVGVzdCA9IHRoaXMucHJvY2Vzc1NpbmdsZU1hcmtkb3duKHNUZXN0LCAvXFxcXCMvLCAvIy8sICcjJywgJycpXG5cbiAgICAgICAgc1Rlc3QgPSB0aGlzLnByb2Nlc3NTaW5nbGVNYXJrZG93bihzVGVzdCwgL1xcXi4qXFxeLywgL1xcXi8sICc8Yj4nLCAnPC9iPicpXG4gICAgICAgIHNUZXN0ID0gdGhpcy5wcm9jZXNzU2luZ2xlTWFya2Rvd24oc1Rlc3QsIC9cXGAuKlxcYC8sIC9cXGAvLCAnPHQzZF9jb2RlPicsICc8L3QzZF9jb2RlPicpXG5cbiAgICAgICAgc1Rlc3QgPSBzVGVzdC50cmltUmlnaHQoKSAgLy8gdGFrZSBvZmYgdHJhaWxpbmcgYmxhbmtzXG5cbiAgICAgICAgLy8gc29tZSBnbG9iYWwgc3Vic3RpdHV0aW9ucyAgLy8gdXNlIHRoZW0gY2FyZWZ1bGx5XG4gICAgICAgIC8vIHNUZXN0ID0gc1Rlc3QucmVwbGFjZSgvXl4yL2csICdbPHN1cD4yPC9zdXA+fCBzcXVhcmVkIF0nKVxuXG4gICAgICAgIC8vIGZpcnN0IGFsdGVybmF0ZSB2b2ljZSAvIHNwZWVjaFxuICAgICAgICAvLyAgICBzVGVzdCA9IHRoaXMucHJvY2Vzc0FsdGVybmF0ZU1hcmtkb3duKHNUZXN0LCB0cnVlKSAgLy8ga2VlcCBmaXJzdCBzZXRcblxuICAgICAgICAvLyBzVGVzdCA9IHRoaXMucHJvY2Vzc1NpbmdsZU1hcmtkb3duKHNUZXN0LCAnXycsJ18nLCAnPGVtPicsICc8L2VtPicpXG4gICAgICAgIC8vICAgc1Rlc3QgPSB0aGlzLnByb2Nlc3NTaW5nbGVNYXJrZG93bihzVGVzdCwgJyoqJywnJywgJzxiPicsICc8L2I+JylcbiAgICAgICAgLy8gICBzVGVzdCA9IHRoaXMucHJvY2Vzc1NpbmdsZU1hcmtkb3duKHNUZXN0LCAnYCcsJycsICc8c3BhbiBzdHlsZT1cImZvbnQtZmFtaWx5Om1vbm9zcGFjZWZvbnQtc2l6ZTpzbWFsbGVyXCI+JywgJzwvc3Bhbj4nKVxuXG5cbiAgICAgICAgLy8gdHJpY2ssIGFsdGVybmF0ZSBpcyBbdGV4dFtddm9pY2VdIGFuZCBpdCdzIFRXTyBkaWZmZXJlbnQgbWFya2Rvd25zICBbLS1bIGFuZCBdLS1dXG5cbiAgICAgICAgcmV0dXJuIChzVGVzdClcbiAgICB9XG5cbiAgICBlcmFzZU1hcmtkb3duKHNUZXN0OiBzdHJpbmcpOiBzdHJpbmcgeyAgIC8vIGlkZW50aWNhbCB0byBwcm9jZXNzTWFya2Rvd24sIGJ1dCBlcmFzZXMgdGhlIG1hcmtzIHdpdGhvdXQgcmVwbGFjZW1lbnRcbiAgICAgICAgLy8gZmlyc3QgYWx0ZXJuYXRlIHZvaWNlIC8gc3BlZWNoXG4gICAgICAgIHNUZXN0ID0gdGhpcy5wcm9jZXNzQWx0ZXJuYXRlTWFya2Rvd24oc1Rlc3QsIGZhbHNlKSAgLy8ga2VlcCBzZWNvbmQgc2V0XG4gICAgICAgIC8vIHRoZW4gdGhlIGl0YWxpY3MgKGlnbm9yZSBcXF8pXG4gICAgICAgIHNUZXN0ID0gdGhpcy5wcm9jZXNzU2luZ2xlTWFya2Rvd24oc1Rlc3QsIC8jKiMvLCAvIy8sICcnLCAnJylcbiAgICAgICAgc1Rlc3QgPSB0aGlzLnByb2Nlc3NTaW5nbGVNYXJrZG93bihzVGVzdCwgL1xcYCpcXGAvLCAvXFxgLywgJycsICcnKVxuICAgICAgICBzVGVzdCA9IHRoaXMucHJvY2Vzc1NpbmdsZU1hcmtkb3duKHNUZXN0LCAvXFxeLipcXF4vLCAvXFxeLywgJycsICcnKVxuXG4gICAgICAgIHNUZXN0ID0gc1Rlc3QudHJpbVJpZ2h0KCkgIC8vIHRha2Ugb2ZmIHRyYWlsaW5nIGJsYW5rc1xuXG5cbiAgICAgICAgLy8gLy8gc3Vic3RpdHV0aW9uIGxpc3QgdG8gaW1wcm92ZSB2b2ljZXNcbiAgICAgICAgLy8gbGV0IHN1YnMgPSBbXG4gICAgICAgIC8vICAgICB7IGZyb206ICdKYXZhU2NyaXB0JywgdG86ICdbSmF2YVNjcmlwdCB8IEphdnZhU2NyaXB0XScgfSxcbiAgICAgICAgLy8gICAgIHsgZnJvbTogJ1xcYGNvbnNvbGUubG9nKClcXGAnLCB0bzogJ1tcXGBjb25zb2xlLmxvZygpXFxgfGNvbnNvbGUgZG90IGxvZ10nIH0sXG4gICAgICAgIC8vIF1cblxuICAgICAgICAvLyBmb3IgKGxldCBzdWIgb2Ygc3Vicykge1xuICAgICAgICAvLyAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgbiA9IHNUZXN0LmluZGV4T2Yoc3ViLmZyb20pXG4gICAgICAgIC8vICAgICAgICAgaWYgKG4gPT09IC0xKSB7IGJyZWFrIH1cbiAgICAgICAgLy8gICAgICAgICBzVGVzdCA9IHNUZXN0LnNsaWNlKDAsIG4pICsgc3ViLnRvICsgc1Rlc3Quc2xpY2UobiArIHN1Yi5mcm9tLmxlbmd0aClcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICByZXR1cm4gKHNUZXN0KVxuICAgIH1cblxuICAgIC8qKiBkb24ndCBjYWxsIHRoaXMgZGlyZWN0bHksIGl0IGlzIHNoYXJlZCBieSBwcm9jZXNzTWFya2Rvd24oKSBhbmQgZXJhc2VNYXJrZG93bigpICovXG4gICAgcHJvY2Vzc1NpbmdsZU1hcmtkb3duKHNUZXN0OiBzdHJpbmcsIG9wZW5SZWdleDogUmVnRXhwLCBjbG9zZVJlZ2V4OiBSZWdFeHAsIG9wZW5TdWI6IHN0cmluZywgY2xvc2VTdWI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBhTWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsLCBhTWF0Y2gyOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbFxuXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBhTWF0Y2ggPSBzVGVzdC5tYXRjaChvcGVuUmVnZXgpXG4gICAgICAgICAgICBpZiAoYU1hdGNoID09IG51bGwpIHsgYnJlYWsgfSAgLy8gYWxsIGRvbmVcbiAgICAgICAgICAgIGlmIChhTWF0Y2guaW5kZXggPT0gdW5kZWZpbmVkKSB7IGJyZWFrIH0gIC8vIGFsbCBkb25lXG4gICAgICAgICAgICBpZiAoYU1hdGNoLmlucHV0ID09IHVuZGVmaW5lZCkgeyBicmVhayB9ICAvLyBhbGwgZG9uZVxuXG4gICAgICAgICAgICBhTWF0Y2gyID0gc1Rlc3Quc2xpY2UoYU1hdGNoLmluZGV4ICsgMSkubWF0Y2goY2xvc2VSZWdleCkgXG4gICAgICAgICAgICBpZiAoIWFNYXRjaDIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGb3VuZCBvcGVuIHRhZyBmb3IgJHtvcGVuU3VifSwgbWlzc2luZyBjbG9zZSB0YWcgb24gJyR7c1Rlc3R9IGF0ICR7c1Rlc3Quc2xpY2UoYU1hdGNoLmluZGV4KX0nYClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcInNNYXRjaFwiLCBzTWF0Y2gpXG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJzTWF0Y2gyXCIsIHNNYXRjaDIpXG5cbiAgICAgICAgICAgIGxldCBwYXJ0MSA9IGFNYXRjaC5pbnB1dC5zbGljZSgwLCBhTWF0Y2guaW5kZXgpXG5cbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgY29uc29sZS5hc3NlcnQoYU1hdGNoMlswXSAhPT0gbnVsbCwgYE1hdGNoaW5nIHByb2JsZW0gYXQgJHtzVGVzdH1gKVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICBjb25zb2xlLmFzc2VydChhTWF0Y2gyWzBdLmxlbmd0aCAtIDEgIT09IG51bGwsIGBNYXRjaGluZyBwcm9ibGVtIGF0ICR7c1Rlc3R9YClcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgaWYgKGFNYXRjaDIuaW5kZXggPT0gdW5kZWZpbmVkKSB7IGJyZWFrIH0gIC8vIGFsbCBkb25lXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgIGlmIChhTWF0Y2gyLmlucHV0ID09IHVuZGVmaW5lZCkgeyBicmVhayB9ICAvLyBhbGwgZG9uZVxuXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KGFNYXRjaDIuaW5kZXggKyBhTWF0Y2gyWzBdLmxlbmd0aCAtIDEgIT09IG51bGwsIGBNYXRjaGluZyBwcm9ibGVtIGF0ICR7c1Rlc3R9YClcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgbGV0IHBhcnQyID0gYU1hdGNoMi5pbnB1dC5zbGljZShhTWF0Y2gyWzBdLmxlbmd0aCAtIDEsIGFNYXRjaDIuaW5kZXggKyBhTWF0Y2gyWzBdLmxlbmd0aCAtIDEpXG5cbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgY29uc29sZS5hc3NlcnQoYU1hdGNoMi5pbmRleCArIGFNYXRjaDJbMF0ubGVuZ3RoICE9PSBudWxsLCBgTWF0Y2hpbmcgcHJvYmxlbSBhdCAke3NUZXN0fWApXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgIGxldCBwYXJ0MyA9IGFNYXRjaDIuaW5wdXQuc2xpY2UoYU1hdGNoMi5pbmRleCArIGFNYXRjaDJbMF0ubGVuZ3RoIC0gMSArIDEpXG5cbiAgICAgICAgICAgIHNUZXN0ID0gcGFydDEgKyBvcGVuU3ViICsgcGFydDIgKyBjbG9zZVN1YiArIHBhcnQzXG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBhc3NlbWJsZSBcIiR7cGFydDF9XCIgKyBcIiR7cGFydDJ9XCIgKyBcIiR7cGFydDN9XCJgKVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc1Rlc3QpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChzVGVzdClcbiAgICB9XG5cblxuICAgIGNyZWF0ZVdlYlVSTChzbmlwcGV0OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIC8vIHNuaXBwZXQgZG9lcyBOT1QgaGF2ZSB0aGUgb3BlbiBhbmQgY2xvc2Ugc3F1YXJlIGJyYWNrZXRzXG5cbiAgICAgICAgLy8gMi1lbGVtZW50OiBbcHJpbnR8dm9pY2VdICBcbiAgICAgICAgLy8gMy1lbGVtZW50IFtwcmludHx2b2ljZXx3ZWJ1cmxdXG4gICAgICAgIC8vIHN0cmF0ZWd5IGlzIHRvIGNvbnZlcnQgYSAzLWVsZW1lbnQgdG8gYSAyLWVsZW1lbnRcbiAgICAgICAgLy8gICBbIHNlZUZvbyB8IHNheUZvbyB8IGh0dHA6Ly9mb28uY29tIF0gYmVjb21lc1xuICAgICAgICAvLyAgICBbPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHA6Ly9mb28uY29tXCI+IHNlZUZvbzwvYT4gfCBzYXlGb29dICBcblxuICAgICAgICBsZXQgYVNuaXBwZXQ6IHN0cmluZ1tdID0gc25pcHBldC5zcGxpdCgnfCcpXG4gICAgICAgIGlmIChhU25pcHBldC5sZW5ndGggPT0gMykgeyAvLyB0aGVyZSBpcyBhIFVSTCBwYXJ0XG4gICAgICAgICAgICAvLyB3ZSBkb24ndCB1c2UgX2JsYW5rIGJlY2F1c2Ugd2UgcHJvYmFibHkgZG9uJ3Qgd2FudCB0byBvcGVuIG11bHRpcGxlIHdpbmRvd3NcbiAgICAgICAgICAgIHNuaXBwZXQgPSBgPGEgaHJlZj0nJHthU25pcHBldFsyXX0nIHRhcmdldD0nZ2FtZWNvZGUnPiR7YVNuaXBwZXRbMF0udHJpbVJpZ2h0KCl9PC9hPnwke2FTbmlwcGV0WzFdfWBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc25pcHBldFxuICAgIH1cblxuXG4gICAgLyoqIGRvbid0IGNhbGwgdGhpcyBkaXJlY3RseSwgaXQgaXMgc2hhcmVkIGJ5IHByb2Nlc3NNYXJrZG93bigpIGFuZCBlcmFzZU1hcmtkb3duKCkgKi9cbiAgICBwcm9jZXNzQWx0ZXJuYXRlTWFya2Rvd24oc1Rlc3Q6IHN0cmluZywgaXNLZWVwRmlyc3Q6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgZnVuY3Rpb24gcHJvY2Vzc0FsdGVybmF0ZU1hcmtkb3duICgke3NUZXN0fSwgJHtpc0tlZXBGaXJzdH0pYClcblxuICAgICAgICBsZXQgb2xkU1Rlc3QgPSBzVGVzdFxuICAgICAgICB3aGlsZSAodHJ1ZSkgeyAgICAvLyBtYXkgaGF2ZSBtb3JlIHRoYW4gb25lXG4gICAgICAgICAgICBsZXQgbiA9IHNUZXN0LmluZGV4T2YoJ1snKVxuICAgICAgICAgICAgaWYgKG4gPT09IC0xKSB7IGJyZWFrIH1cblxuICAgICAgICAgICAgbGV0IHAgPSBzVGVzdC5pbmRleE9mKCddJywgbiArIDEpXG4gICAgICAgICAgICBpZiAocCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBNaXNzaW5nIGVuZCBtYXJrZXIgb24gJHtzVGVzdH0sIHA9JHtwfSxyZW1haW5kZXI9JHtzVGVzdC5zbGljZShwICsgMSl9YClcbiAgICAgICAgICAgICAgICB0aHJvdyAoJ3N0b3AnKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWxsIGNyZWF0ZVdlYlVybC4gIGlmIGl0IGlzIGEgdHdvPXBhcnQsIHRoZW4gd2lsbCBub3QgY2hhbmdlLiBpZiBhIHRocmVlLXBhcnQsIHRoZW4gXG4gICAgICAgICAgICAvLyB3aWxsIGJlIGNvbnZlcnRlZCB0byBhIHR3byBwYXJ0XG4gICAgICAgICAgICBsZXQgc25pcHBldCA9IHNUZXN0LnNsaWNlKG4gKyAxLCBwKVxuICAgICAgICAgICAgbGV0IGZpeGVkU25pcHBldCA9IHRoaXMuY3JlYXRlV2ViVVJMKHNuaXBwZXQpIC8vIGNvbnZlcnQgZnJvbSAzLXBhcnQgdG8gMi1wYXJ0IChpZiBuZWNlc3NhcnkpXG4gICAgICAgICAgICAvLyBhbmQgcHV0IGl0IGJhY2sgaW50byBzVGVzdCBcbiAgICAgICAgICAgIHNUZXN0ID0gc1Rlc3Quc2xpY2UoMCwgbikgKyAnWycgKyBmaXhlZFNuaXBwZXQgKyAnXScgKyBzVGVzdC5zbGljZShwICsgMSlcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdmaXhlZFNuaXBwZXQnLGZpeGVkU25pcHBldClcblxuXG4gICAgICAgICAgICAvLyBzdGFydCBhZ2FpblxuICAgICAgICAgICAgbiA9IHNUZXN0LmluZGV4T2YoJ1snKVxuICAgICAgICAgICAgaWYgKG4gPT09IC0xKSB7IGJyZWFrIH1cblxuICAgICAgICAgICAgcCA9IHNUZXN0LmluZGV4T2YoJ10nLCBuICsgMSlcbiAgICAgICAgICAgIGlmIChwID09PSAtMSkgeyBjb25zb2xlLmVycm9yKGBNaXNzaW5nIGVuZCBtYXJrZXIgb24gJHtzVGVzdH0sIHA9JHtwfSxyZW1haW5kZXI9JHtzVGVzdC5zbGljZShwICsgMSl9YCkgfVxuXG5cbiAgICAgICAgICAgIGxldCBtID0gc1Rlc3QuaW5kZXhPZignfCcsIG4gKyAxKVxuICAgICAgICAgICAgaWYgKG0gPT09IC0xKSB7IGNvbnNvbGUuZXJyb3IoYE1pc3NpbmcgbWlkZGxlIG1hcmtlciBvbiAke3NUZXN0fSwgbT0ke219LHJlbWFpbmRlcj0ke3NUZXN0LnNsaWNlKG0gKyAxKX1gKSB9XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwYXJ0IDEgJywgc1Rlc3Quc2xpY2UoMCwgbikpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncGFydCAyICcsIHNUZXN0LnNsaWNlKG4gKyAxLCBtKSlcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwYXJ0IDMgJywgc1Rlc3Quc2xpY2UobSArIDEsIHApKVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3BhcnQgNCAnLCBzVGVzdC5zbGljZShwICsgMSkpXG5cbiAgICAgICAgICAgIGlmIChpc0tlZXBGaXJzdCkgeyAgLy8ga2VlcCB0aGUgZmlyc3QgcGFydFxuICAgICAgICAgICAgICAgIHNUZXN0ID0gc1Rlc3Quc2xpY2UoMCwgbikgKyBzVGVzdC5zbGljZShuICsgMSwgbSkgKyBzVGVzdC5zbGljZShwICsgMSlcbiAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgLy8ga2VlcCB0aGUgc2Vjb25kIHBhcnRcbiAgICAgICAgICAgICAgICBzVGVzdCA9IHNUZXN0LnNsaWNlKDAsIG4pICsgc1Rlc3Quc2xpY2UobSArIDEsIHApICsgc1Rlc3Quc2xpY2UocCArIDEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKHNUZXN0KVxuICAgIH1cblxuXG5cbiAgICAvLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qKiBmaW5kIHRhZy10eXBlIGFuZCBwYXJhbWV0ZXJzICAqL1xuICAgIGlucHV0VG9QYXJhZ3JhcGhzKGFMaW5lczogc3RyaW5nW10pOiBJVGFnW10ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnd2UgaGF2ZSAjIGxpbmVzICcsIGFMaW5lcylcblxuICAgICAgICBsZXQgYVRhZ3M6IElUYWdbXSA9IFtdICAvLyB0aGlzIHdpbGwgYmUgb3VyIHJlc3VsdFxuXG4gICAgICAgIGZvciAobGV0IHNMaW5lIG9mIGFMaW5lcykgeyAgIC8vIHdlaXJkbHksIGFMaW5lcyBpcyBhbiBPYmplY3Qgb2YgdHlwZSBBcnJheS4gIEphdmFTc2NycHQgdHlwZXMgYXJlIGF3ZnVsLlxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NsaW5lICcsIHNMaW5lKVxuXG4gICAgICAgICAgICAvKiogbWF0Y2ggaXMgZnJvbSB0aGUgZmlyc3QgPCBhdCB0aGUgc3RhcnQgb2YgbGluZSB0byB0aGUgIG5leHQgPiAqL1xuICAgICAgICAgICAgbGV0IG1hdGNoID0gc0xpbmUubWF0Y2gobmV3IFJlZ0V4cCgvXjwoW2Etel18W0EtWl18WzAtOV18XFxffFxcKHxcXC58XFw9fFxcLHxcXCkpKj4vKSkgLy8gbWF0Y2hzIDxwPiAgYW5kIDxoMT4sIGV0Y1xuXG4gICAgICAgICAgICBsZXQgc1RhZyA9ICcnXG4gICAgICAgICAgICBsZXQgc1JlbWFpbiA9ICcnXG4gICAgICAgICAgICBsZXQgYVBhcmFtczogc3RyaW5nW11cblxuICAgICAgICAgICAgLy8gbGV0IGJQYXJhbXM6IG9iamVjdCA9IHt9ICAgICAgICAgLy8gbm90IHN0cmljdCBlbnVmIGZvciB0eXBlc2NyaXB0XG4gICAgICAgICAgICBsZXQgYlBhcmFtczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9XG5cbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdtYXRjaCcsIG1hdGNoWzBdLnRvU3RyaW5nKVxuICAgICAgICAgICAgICAgIHNUYWcgPSBtYXRjaFswXS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgc1RhZyA9IHNUYWcuc2xpY2UoMSwgc1RhZy5sZW5ndGggLSAxKSAgLy8gdGFrZSBvdXQgdGhlIDwgYW5kID5cblxuICAgICAgICAgICAgICAgIHNSZW1haW4gPSBzTGluZS5zbGljZShzVGFnLmxlbmd0aCArIDIpIC8vIGlmIG5vIHBhcmFtc1xuXG4gICAgICAgICAgICAgICAgLy8gY2xlYW4gdXAgLSBsb29rIGluc2lkZSBtYXRjaCBmb3IgcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIGxldCBwYXJhbXMgPSBuZXcgUmVnRXhwKC9cXCgoW14pXSspXFwpLykuZXhlYyhzVGFnKVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBwYXJhbXMgb2YgJyR7c1RhZ30nYCwgcGFyYW1zKVxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Byb2Nlc3NpbmcgYSBwYXJhbWV0ZXInKVxuICAgICAgICAgICAgICAgICAgICBsZXQgc01hdGNoID0gcGFyYW1zWzFdLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3BhcmFtcycsIHNNYXRjaCwgYVBhcmFtcylcbiAgICAgICAgICAgICAgICAgICAgc1RhZyA9IHNUYWcuc2xpY2UoMCwgcGFyYW1zLmluZGV4KSAgLy8gcGF0Y2ggdGhlIHRhZyBwYXJ0XG5cbiAgICAgICAgICAgICAgICAgICAgYVBhcmFtcyA9IHNNYXRjaC5zcGxpdCgnLCcpIC8vIGFuZCB0dXJuIGludG8gYW4gYXJyYXkgb2YgcGFyYW1zXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdyBjb252ZXJ0IHRvIGEgbWFwLCBleHBhbmRpbmcgZnJvbSAneHgnIHRvICd4eDp0cnVlJyB3aGVyZSBuZWNlc3NhcnlcbiAgICAgICAgICAgICAgICAgICAgYVBhcmFtcy5tYXAoKGVsZW1lbnQ6IHN0cmluZykgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgKCdzaG91bGQgbmV2ZXIgaGFwcGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBydWxlID0gZWxlbWVudC5zcGxpdCgnPScpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS5sZW5ndGggPT09IDEpIHsgLy8gbm8gY29sb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiUGFyYW1zW2VsZW1lbnRdID0gJydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYlBhcmFtc1tydWxlWzBdXSA9IHJ1bGVbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgb2JqZWN0LCBhZGQgdG8gYVRhZ3NcbiAgICAgICAgICAgICAgICBhVGFncy5wdXNoKHRoaXMuaVRhZ0ZhY3Rvcnkoc1RhZywgYlBhcmFtcywgc1JlbWFpbikpXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyBtYW55IHJlYXNvbnMgd2UgbWlnaHQgYmUgaGVyZVxuICAgICAgICAgICAgICAgIC8vIHdlIGFsbG93IGEgQkxBTksgbGluZSB3aXRob3V0IGEgdGFnXG4gICAgICAgICAgICAgICAgLy8gd2UgYWxsb3cgZm9sbG93IGxpbmVzIGluIGNvZGVcblxuXG4gICAgICAgICAgICAgICAgLy8gaGVyZSBmb3IgY29udGludWF0aW9uIGxpbmVzICh3aXRob3V0IHRhZ3MpXG4gICAgICAgICAgICAgICAgLy8gc28gcGF0Y2ggdGhlIFBSRVZJT1VTIGFUYWdcbiAgICAgICAgICAgICAgICAvLyBqdXN0IHRlc3QgdGhhdCB0aGUgZmlyc3QgY2hhcmFjdGVyIGlzbid0IGEgJzwnXG4gICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQoc0xpbmUuc2xpY2UoMCwgMSkgIT09ICc8JywgJ0xvb2tzIGxpa2UgYSBiYWQgdGFnOiAgJyArIHNMaW5lKVxuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJhVGFnc1wiLCBhVGFncylcbiAgICAgICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2UsIHRoaXMgbGluZSBkaWRuJ3Qgc3RhcnQgd2l0aCBhIHRhZywgYXBwZW5kIHRvIGxhc3QgYVRhZ1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVyZSdzIHRoZSBiYWQgcHVwcHk6XCIsIHNMaW5lKVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhdGFnczonLCBhVGFncylcblxuICAgICAgICAgICAgICAgIGlmIChhVGFncy5sZW5ndGggPT09IDApIHsgY29uc29sZS5lcnJvcihgRmlsZSBtdXN0IHN0YXJ0IHdpdGggYSB0YWcsIHdlIGdvdCAnJHtzTGluZX0nYCkgfVxuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cgKFwiYmVmb3JlXCIsYVRhZ3NbYVRhZ3MubGVuZ3RoLTFdLnZhbHVlLCBcIiBwbHVzXCIsIHNMaW5lKVxuICAgICAgICAgICAgICAgIGFUYWdzW2FUYWdzLmxlbmd0aCAtIDFdLnJhd3ZhbHVlICs9ICdcXG4nICsgc0xpbmVcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyAoXCJhZnRlclwiLGFUYWdzW2FUYWdzLmxlbmd0aC0xXS52YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGFUYWdzKVxuICAgIH1cblxuICAgIC8qKiBjb252ZXJ0IGludGVybmFsIEhUTUwgdGFncyAobm90IGdlbmVyYWwsIHNwZWNpZmljIHRhZ3MgaW4gc3BlY2lmaWMgd2F5cykgXG4gICAgICogRE8gTk9UIFRSWSBUQUctV0lUSElOLVRBRywgdGhpcyBpcyBub3QgYSByZWN1cnNpdmUgRE9NLXN0eWxlIHBhcnNlclxuICAgICovXG4gICAgc3RyaXBBbmRIaWRlSW5uZXJUYWdzKGFUYWdzOiBJVGFnW10pOiBJVGFnW10ge1xuICAgICAgICBsZXQgaW5maW5pdGVMb29wR3VhcmQgPSAxMDAwXG5cbiAgICAgICAgLy8gdGVzdCBldmVyeSB0YWcgaW4gdGhlIGRvY3VtZW50LCB3ZSBicmluZyBpbiB0aGUgd2hvbGUgZmlsZSBhbmQgdHJhdmVyc2UgaXRcbiAgICAgICAgYVRhZ3MuZm9yRWFjaCgobywgaSkgPT4geyAgIC8vIGNhbiBtb2RpZnkgYVRhZ3NbaV0gdGhpcyB3YXlcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Rlc3Rpbmcgby5yYXd2YWx1ZScsby5yYXd2YWx1ZSlcblxuICAgICAgICAgICAgLy8gcHJvY2VzcyB0aGVzZSBzcGVjaWZpYyB0YWdzXG4gICAgICAgICAgICBsZXQgdGFncyA9IFsnYScsICdiJ11cbiAgICAgICAgICAgIHRhZ3MuZm9yRWFjaCgodGFnOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVnZXggPSBgPFxccyoke3RhZ31bXj5dKj4oLio/KTxcXHMqXFwvXFxzKiR7dGFnfT5gXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoZXM6IGFueVtdIHwgbnVsbFxuXG4gICAgICAgICAgICAgICAgLy8gcHJvY2VzcyBtdWx0aXBsZSB0YWdzIG9uIGEgc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICB3aGlsZSAobWF0Y2hlcyA9IG8ucmF3dmFsdWUubWF0Y2gobmV3IFJlZ0V4cChyZWdleCkpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSU1QT1JUQU5UIC0gbXVzdCBSRU1PVkUgdGhlIHRhZywgb3IgaW5maW5pdGUgbG9vcFxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5maW5pdGVMb29wR3VhcmQtLSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYHN0cmlwQW5kSGlkZTogaW5maW5pdGUgbG9vcCB0ZXN0aW5nIHRhZyAnJHt0YWd9JyBhZ2FpbnN0ICR7by5yYXd2YWx1ZX1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gby5yYXd2YWx1ZSA9IGJlZm9yZTxhIHJlZj1cInNvbWVvbmVcIj5zb21ldGhpbmc8L2E+YWZ0ZXIgXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoWzBdID0gXCI8YSByZWY9XCJzb21lb25lXCI+c29tZXRoaW5nPC9hPlwiIFxuICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaFsxXSA9IFwic29tZXRoaW5nXCJcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ21hdGNoZXMnLCBtYXRjaGVzKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGFUYWdzXG4gICAgfVxuXG4gICAgLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLyoqIHBhcnNlIHRoZSB0YWcgZm9yIHZvaWNlL3RleHQsIG1hcmtkb3duLCBpbXBsaWNpdCBwYXJhbXMsIGV0YyAqL1xuICAgIHByZVByb2Nlc3NUYWdBcnJheShhVGFnczogSVRhZ1tdKTogdm9pZCB7XG5cbiAgICAgICAgLy8gVE9ETyBtb3ZlIHRoaXMgaW50byBhIHNlcGFyYXRlIGNvbXBpbGUgc3RlcCwgYW5kIG1ha2UgaXQgbW9yZSBwb3dlcmZ1bFxuXG4gICAgICAgIGFUYWdzLmZvckVhY2goKG8sIGkpID0+IHsgICAvLyBjYW4gbW9kaWZ5IGFUYWdzW2ldIHRoaXMgd2F5XG4gICAgICAgICAgICAvLyB0aGVyZSBtYXkgYmUgbXVsdGlwbGUgPHA+IHRhZ3MgaW4gYSBzcGVlY2ggYmxvY2tcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3ByZXByb2Nlc3MnLCBvKVxuICAgICAgICAgICAgLy8gd2UgYWxzbyBjbG9zZSBvZmYgc3BlZWNoIGJsb2NrIGZvciA8cChoMSk+IGFuZCByZW9wZW4gYW5vdGhlclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5BU3BlZWNoQmxvY2sgJiZcbiAgICAgICAgICAgICAgICAoKCdoMScgaW4gYVRhZ3NbaV0ucGFyYW1zKSB8fFxuICAgICAgICAgICAgICAgICAgICAoJ2gyJyBpbiBhVGFnc1tpXS5wYXJhbXMpIHx8XG4gICAgICAgICAgICAgICAgICAgICgnaDMnIGluIGFUYWdzW2ldLnBhcmFtcykpXG4gICAgICAgICAgICApIHsgLy8gbmVlZCB0byBjbG9zZSBvZmYgb3VyIHByaW9yIHNwZWVjaCBibG9ja1xuICAgICAgICAgICAgICAgIC8vIGlmIHdlIGFyZW4ndCBpbiBhIHNwZWVjaCBibG9jaywgdGhlbiB0aGlzIGlzIHRoZSBGSVJTVCB0YWcgb2YgYSBzcGVlY2ggSWNvblxuICAgICAgICAgICAgICAgIHRoaXMudXR0ZXJhbmNlVGFnID0gYVRhZ3NbaV0gIC8vIHBvaW50IGF0IG5ldyB0YWdcbiAgICAgICAgICAgICAgICB0aGlzLnV0dGVyYW5jZSA9ICcnICAgICAvLyBhbmQgc3RhcnQgYSBuZXcgc3BlZWNoXG4gICAgICAgICAgICAgICAgYVRhZ3NbaV0ucGFyYW1zWydTcGVlY2hJY29uJ10gPSAndHJ1ZScgIC8vIHB1c2ggb3V0IGEgU3BlZWNoSWNvbiBvbiB0aGlzIHRhZ1xuICAgICAgICAgICAgICAgIHRoaXMuaW5BU3BlZWNoQmxvY2sgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5BU3BlZWNoQmxvY2sgJiYgYVRhZ3NbaV0udGFnID09PSAncCcpIHsgLy8gbmVlZCB0byBvcGVuIG91ciBzcGVlY2ggYmxvY2tzXG4gICAgICAgICAgICAgICAgLy8gaWYgd2UgYXJlbid0IGluIGEgc3BlZWNoIGJsb2NrLCB0aGVuIHRoaXMgaXMgdGhlIEZJUlNUIHRhZyBvZiBhIHNwZWVjaCBJY29uXG4gICAgICAgICAgICAgICAgdGhpcy51dHRlcmFuY2VUYWcgPSBhVGFnc1tpXVxuICAgICAgICAgICAgICAgIGFUYWdzW2ldLnBhcmFtc1snU3BlZWNoSWNvbiddID0gJ3RydWUnICAvLyBwdXNoIG91dCBhIFNwZWVjaEljb24gb24gdGhpcyB0YWdcbiAgICAgICAgICAgICAgICB0aGlzLmluQVNwZWVjaEJsb2NrID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaW5BU3BlZWNoQmxvY2sgJiYgYVRhZ3NbaV0udGFnICE9PSAncCcpIHsgLy8gbmVlZCB0byBjbG9zZSBvZmYgb3VyIHNwZWVjaCBibG9ja1xuICAgICAgICAgICAgICAgIHRoaXMudXR0ZXJhbmNlVGFnLnNwZWVjaHZhbHVlID0gdGhpcy51dHRlcmFuY2VcbiAgICAgICAgICAgICAgICB0aGlzLnV0dGVyYW5jZSA9ICcnXG4gICAgICAgICAgICAgICAgdGhpcy5pbkFTcGVlY2hCbG9jayA9IGZhbHNlXG4gICAgICAgICAgICAgICAgLy8gd2F0Y2ggb3V0IC0gZml4IHVwIGF0IHRoZSBib3R0b20gb2YgdGhlIGZvciBsb29wIHRvb1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKGFUYWdzW2ldLnRhZykge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnYnInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2JyZWFrJzpcbiAgICAgICAgICAgICAgICBjYXNlICdkcmlsbCc6XG4gICAgICAgICAgICAgICAgY2FzZSAna2V5JzpcbiAgICAgICAgICAgICAgICBjYXNlICdydW4nOlxuICAgICAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbW9kdWxlJzpcbiAgICAgICAgICAgICAgICAgICAgYVRhZ3NbaV0udGV4dHZhbHVlID0gdGhpcy5wcm9jZXNzTWFya2Rvd24oYVRhZ3NbaV0ucmF3dmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzVGl0bGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlICdsZXNzb24nOlxuICAgICAgICAgICAgICAgICAgICBhVGFnc1tpXS50ZXh0dmFsdWUgPSB0aGlzLnByb2Nlc3NNYXJrZG93bihhVGFnc1tpXS5yYXd2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNUaXRsZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuXG4gICAgICAgICAgICAgICAgY2FzZSAnc2hvcnRkZXNjJzpcbiAgICAgICAgICAgICAgICAgICAgYVRhZ3NbaV0udGV4dHZhbHVlID0gdGhpcy5wcm9jZXNzTWFya2Rvd24oYVRhZ3NbaV0ucmF3dmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlICdzZWN0aW9uJzogICAgICAgICAvLyBjYW4gcHV0IGJvbGQgYW5kIGtleXMgaW4gdGhlc2UgZmllbGRzXG4gICAgICAgICAgICAgICAgICAgIGFUYWdzW2ldLnRleHR2YWx1ZSA9IHRoaXMucHJvY2Vzc01hcmtkb3duKGFUYWdzW2ldLnJhd3ZhbHVlKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndGl0bGUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3N1YnRpdGxlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdhc2NpaW1hdGgnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3lvdXR1YmUnOlxuICAgICAgICAgICAgICAgICAgICBhVGFnc1tpXS50ZXh0dmFsdWUgPSBhVGFnc1tpXS5yYXd2YWx1ZSAgLy8gZG9uJ3QgdHJ5IHRvIHByb2Nlc3MgbWFya2Rvd25cbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvZGUnOlxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGVyZSBpcyBhbiAnbGluZXMnIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgICAgICBpZiAoJ2xpbmVzJyBpbiBvLnBhcmFtcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbkxpbmVzOiBudW1iZXIgPSBvLnJhd3ZhbHVlLnNwbGl0KCdcXG4nKS5sZW5ndGggKyAxICAvLyBkZWZhdWx0IHRvICMgb2YgbGluZXMgaW4gY29kZSwgcGx1cyAxIFxuICAgICAgICAgICAgICAgICAgICAgICAgbkxpbmVzID0gTWF0aC5taW4obkxpbmVzLCA4KSAgICAvLyB0byBtYXhpbXVtIG9mIDggbGluZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGFUYWdzW2ldLnBhcmFtc1snbGluZXMnXSA9IG5MaW5lcy50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3AnOlxuICAgICAgICAgICAgICAgICAgICAvLyBwcm9jZXNzTWFya2Rvd24ocykgIGFkZHMgPGVtPiBhbmQgPGI+LCBhbmQgc29tZSBzdGFuZGFyZCB2b2ljZSBzdWJzdGl0dXRpb25zXG4gICAgICAgICAgICAgICAgICAgIC8vIGVyYXNlTWFya2Rvd24ocykgICAgZ2V0cyByaWQgb2YgbWFya2Rvd25zLCBsZWF2aW5nIHRleHQgaW50YWN0XG4gICAgICAgICAgICAgICAgICAgIC8vIHByb2Nlc3NBbHRlcm5hdGVNYXJrZG93bihzLCBpc0tlZXBGaXJzdCkgIGxvb2tzIGZvciBbYXxiXSByZXR1cm5zIGZpcnN0IG9yIHNlY29uZFxuXG5cbiAgICAgICAgICAgICAgICAgICAgYVRhZ3NbaV0udGV4dHZhbHVlID0gdGhpcy5wcm9jZXNzTWFya2Rvd24oYVRhZ3NbaV0ucmF3dmFsdWUpIC8vIG5pY2UgSFRNTFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBhIHBhdXNlIHRvIGVhY2ggc2VudGVuY2UsIG1ha2VzIGl0IG1vcmUgaHVtYW4uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXR0ZXJhbmNlICs9ICcgJyArIHRoaXMuZXJhc2VNYXJrZG93bihhVGFnc1tpXS5yYXd2YWx1ZSkgKyBcIiAuIFwiIC8vIGNsZWFuIHNwZWVjaFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51dHRlcmFuY2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25seSBzaW5nbGUtcXVvdGVzIGFsbG93ZWQgaW4gdXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXR0ZXJhbmNlID0gdGhpcy51dHRlcmFuY2UucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpIC8vIGVzY2FwZSBvdXQgZG91YmxlLXF1b3Rlc1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBtYXliZSBhbiBpbWFnZSB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdpbWcnIGluIG8ucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IDAxIGlzIGhhcmRjb2RlZCwgbmVlZCB0byBjaGFuZ2UgdG8gbGVzc29uI1xuICAgICAgICAgICAgICAgICAgICAgICAgYVRhZ3NbaV0udXJsID0gJ2Fzc2V0cy8nICsgJzAxLycgKyBvLnBhcmFtc1snaW1nJ10gIC8vIFRPRE8gLSBjaGVjayB0aGF0IHRoaXMgaW1hZ2UgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbWF5YmUgYSB2aWRlbyB0byB0aGUgcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCd2aWRlbycgaW4gby5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogMDEgaXMgaGFyZGNvZGVkLCBuZWVkIHRvIGNoYW5nZSB0byBsZXNzb24jXG4gICAgICAgICAgICAgICAgICAgICAgICBhVGFnc1tpXS51cmwgPSAnYXNzZXRzLycgKyAnMDEvJyArIG8ucGFyYW1zWyd2aWRlbyddICAvLyBUT0RPIC0gY2hlY2sgdGhhdCB0aGlzIGltYWdlIGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cblxuICAgICAgICAgICAgICAgIC8vIGNhc2UgJzxxdW90ZT4nOlxuICAgICAgICAgICAgICAgIC8vICAgICBIVE1MICs9IGA8YmxvY2txdW90ZSBjbGFzcz1cImJsb2NrcXVvdGVcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206MHB4cGFkZGluZy1ib3R0b206MHB4XCI+JHtpLnZhbHVlfTwvYmxvY2txdW90ZT5cXG5gXG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgLy8gY2FzZSAnPGNpdGF0aW9uPic6XG4gICAgICAgICAgICAgICAgLy8gICAgIEhUTUwgKz0gYDxjaXRlPjxmb290ZXIgY2xhc3M9XCJibG9ja3F1b3RlLWZvb3RlclwiIHN0eWxlPVwidGV4dC1pbmRlbnQ6MTAwcHhtYXJnaW4tYm90dG9tOjMwcHhcIj4ke2kudmFsdWV9PC9mb290ZXI+PC9jaXRlPlxcbmBcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAvLyBjYXNlICc8cHJlPic6XG4gICAgICAgICAgICAgICAgLy8gICAgIEhUTUwgKz0gYDxwcmU+JHtpLnZhbHVlfTwvcHJlPlxcbmBcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAvLyBjYXNlICc8eW91dHViZT4nOlxuICAgICAgICAgICAgICAgIC8vICAgICBIVE1MICs9IGA8aWZyYW1lIHdpZHRoPVwiNDgwXCIgaGVpZ2h0PVwiMjcwXCIgYWxpZ249XCJyaWdodFwiXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHtpLnZhbHVlfT9yZWw9MCZhbXBjb250cm9scz0wXCIgZnJhbWVib3JkZXI9XCIwXCJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBhbGxvdz1cImF1dG9wbGF5IGVuY3J5cHRlZC1tZWRpYVwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5cXG5gXG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignU2hvdWxkIG5ldmVyIGdldCBoZXJlIG9uLCAnICsgSlNPTi5zdHJpbmdpZnkoYVRhZ3NbaV0pKVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFsbCBkb25lLiAganVzdCBjbG9zZSBvZmZcbiAgICAgICAgICAgIGlmICh0aGlzLmluQVNwZWVjaEJsb2NrKSB7IC8vIG1heWJlIG5lZWQgdG8gY2xvc2Ugb2ZmIG91ciBsYXN0IHNwZWVjaCBibG9ja1xuICAgICAgICAgICAgICAgIHRoaXMudXR0ZXJhbmNlVGFnLnNwZWVjaHZhbHVlID0gdGhpcy51dHRlcmFuY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwYWQobjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIChuIDwgMTAgPyAnMCcgOiAnJykgKyBuXG4gICAgfVxuXG4gICAgaVRhZ0ZhY3RvcnkobmV3dGFnOiBzdHJpbmcsIGFQYXJhbXM6IG9iamVjdCwgcmVtYWluZGVyOiBzdHJpbmcpOiBJVGFnIHtcblxuICAgICAgICAvLyB2ZXJpZnkgdGhhdCB0YWcgaXMgJ2xlZ2FsJ1xuICAgICAgICBsZXQgTEN0YWcgPSBuZXd0YWcudG9Mb3dlckNhc2UoKVxuICAgICAgICBsZXQgeCA9IHZhbGlkVGFncy5maW5kKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSBMQ3RhZylcbiAgICAgICAgY29uc29sZS5hc3NlcnQoeCA9PT0gTEN0YWcsIGBMZXNzb25Ub0hUTUwuaVRhZ0ZhY3Rvcnkgbm90IGxlZ2FsIHRhZzogYCwgJ2lsbGVnYWwgdGFnICcsIG5ld3RhZylcblxuXG4gICAgICAgIGxldCByZXQ6IElUYWcgPSB7XG4gICAgICAgICAgICB0YWc6IExDdGFnLCAgIC8vIGFsd2F5cyBsb3dlcmNhc2VcbiAgICAgICAgICAgIHBhcmFtczogYVBhcmFtcyxcbiAgICAgICAgICAgIHJhd3ZhbHVlOiByZW1haW5kZXIudHJpbSgpLFxuICAgICAgICAgICAgdGV4dHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgc3BlZWNodmFsdWU6IFwiXCIsXG4gICAgICAgICAgICB1cmw6IFwiXCIsXG4gICAgICAgICAgICBpbm5lclRhZ3M6IFtdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChyZXQpXG4gICAgfVxuXG4gICAgLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gLy8vLy8vLy8vLyAgIHRlc3RzXG4gICAgLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICB1bml0VGVzdHMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTdGFydGluZyB1bml0IHRlc3RzLi4uJylcblxuICAgICAgICAvLyBUT0RPIHB1dCB0ZXN0aW5nIGNvbmRpdGlvbnMgb24gdGhpc1xuICAgICAgICAvLyBjaGVjayBvdXQgaVRhZ0ZhY3RvcnlcbiAgICAgICAgbGV0IGlUYWcgPSB0aGlzLmlUYWdGYWN0b3J5KCdwJywgbmV3IE1hcDxhbnksIGFueT4oKSwgJycpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0ZXN0IGlUYWdGYWN0b3J5JywgaVRhZylcblxuICAgICAgICAvLyByZWdleFxuICAgICAgICBsZXQgclRlc3RzID0gW1xuICAgICAgICAgICAgeyB0ZXN0OiBuZXcgUmVnRXhwKC9hYmMvKSwgdGFyZ2V0OiAnYWJjZGUnLCByZXN1bHQ6ICdhYmMnIH0sXG4gICAgICAgICAgICB7IHRlc3Q6IG5ldyBSZWdFeHAoL15hYmMvKSwgdGFyZ2V0OiAnYWJjZGUnLCByZXN1bHQ6ICdhYmMnIH0sXG4gICAgICAgICAgICB7IHRlc3Q6IG5ldyBSZWdFeHAoL15bYS16XSovKSwgdGFyZ2V0OiAnYWJjOTknLCByZXN1bHQ6ICdhYmMnIH0sXG4gICAgICAgICAgICB7IHRlc3Q6IG5ldyBSZWdFeHAoL148W2Etel0rPi8pLCB0YXJnZXQ6ICc8cD5zdHVmZicsIHJlc3VsdDogJzxwPicgfSxcbiAgICAgICAgICAgIHsgdGVzdDogbmV3IFJlZ0V4cCgvXjwoW2Etel18WzAtOV18XFwofFxcKSkqPi8pLCB0YXJnZXQ6ICc8cDE+c3R1ZmYnLCByZXN1bHQ6ICc8cDE+JyB9LCAvLyBhbGxvdyA8aDE+IG9yIHNpbWlsYXJcbiAgICAgICAgICAgIHsgdGVzdDogbmV3IFJlZ0V4cCgvXjwoW2Etel18WzAtOV18XFwofFxcKSkqPi8pLCB0YXJnZXQ6ICc8cDEocDIpPnN0dWZmJywgcmVzdWx0OiAnPHAxKHAyKT4nIH0sXG4gICAgICAgICAgICB7IHRlc3Q6IG5ldyBSZWdFeHAoL1xcKChbXildKylcXCkvKSwgdGFyZ2V0OiAnPHAxKHBhcmFtKT5zdHVmZicsIHJlc3VsdDogJyhwYXJhbSknIH0sIC8vIGdldCB0aGUgYnJhY2tldHNcbiAgICAgICAgXVxuXG4gICAgICAgIC8vVE9ETyBmaWd1cmUgaG93IHRvIGdldCB0aGlzIHBhc3QgdHlwZXNjcmlwdFxuICAgICAgICAvLyBmb3IgKGxldCBvVCBvZiByVGVzdHMpIHtcbiAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKCd0ZXN0OiAnLCBvVClcbiAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKCdyZXN1bHQ6ICcsIG9ULnRlc3QuZXhlYyhvVC50YXJnZXQpKVxuICAgICAgICAvLyAgICAgY29uc29sZS5hc3NlcnQob1QudGVzdC5leGVjKG9ULnRhcmdldClbMF0gPT09IG9ULnJlc3VsdCxcbiAgICAgICAgLy8gICAgICAgICBvVC50ZXN0ICsgJyAnICsgb1QudGFyZ2V0ICsgJyAnICsgb1QucmVzdWx0ICsgJyAnICsgb1QudGVzdC5leGVjKG9ULnRhcmdldCkpXG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBpbnB1dFRvUGFyYWdyYXBocygpXG5cbiAgICAgICAgbGV0IGFMaW5lcyA9IFsnPHA+dGVzdFBhcmFncmFwaCddXG4gICAgICAgIGxldCBhVGFncyA9IHRoaXMuaW5wdXRUb1BhcmFncmFwaHMoYUxpbmVzKVxuICAgICAgICBjb25zb2xlLmFzc2VydChhVGFncy5sZW5ndGggPT09IDEsICdFeHBlY3RlZCBhcnJheSBvZiBvbmUgb2JqZWN0JylcbiAgICAgICAgY29uc29sZS5hc3NlcnQoYVRhZ3NbMF0udGFnID09PSAncCcsICdFeHBlY3RlZCB0YWcgdG8gYmUgXCI8cD5cIiBhbmQgZ290IFwiJyArIGFUYWdzWzBdLnRhZyArICdcIicpXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KGFUYWdzWzBdLnJhd3ZhbHVlID09PSAndGVzdFBhcmFncmFwaCcsIGBFeHBlY3RlZCBzdHJpbmcgdG8gYmUgJ3Rlc3RQYXJhZ3JhcGgnIGFuZCBnb3QgJyR7YVRhZ3NbMF0udGV4dHZhbHVlfSdgKVxuXG5cbiAgICAgICAgYUxpbmVzID0gWyc8cD50ZXN0UGFyYWdyYXBoJywgJyBhbmQgbW9yZSddXG4gICAgICAgIGFUYWdzID0gdGhpcy5pbnB1dFRvUGFyYWdyYXBocyhhTGluZXMpXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KGFUYWdzLmxlbmd0aCA9PT0gMSwgJ0V4cGVjdGVkIGFycmF5IG9mIG9uZSBvYmplY3QnKVxuICAgICAgICBjb25zb2xlLmFzc2VydChhVGFnc1swXS50YWcgPT09ICdwJywgJ0V4cGVjdGVkIHRhZyB0byBiZSBcIjxwPlwiIGFuZCBnb3QgXCInICsgYVRhZ3NbMF0udGFnICsgJ1wiJylcbiAgICAgICAgY29uc29sZS5hc3NlcnQoYVRhZ3NbMF0ucmF3dmFsdWUgPT09ICd0ZXN0UGFyYWdyYXBoXFxuIGFuZCBtb3JlJywgSlNPTi5zdHJpbmdpZnkoYVRhZ3NbMF0udGV4dHZhbHVlKSlcblxuXG4gICAgICAgIGFMaW5lcyA9IFsnPHAocDEpPnRlc3RQYXJhZ3JhcGgnXVxuICAgICAgICBhVGFncyA9IHRoaXMuaW5wdXRUb1BhcmFncmFwaHMoYUxpbmVzKVxuICAgICAgICBjb25zb2xlLmFzc2VydChhVGFncy5sZW5ndGggPT09IDEsICdFeHBlY3RlZCBhcnJheSBvZiBvbmUgb2JqZWN0JylcbiAgICAgICAgY29uc29sZS5hc3NlcnQoYVRhZ3NbMF0udGFnID09PSAncCcsICdFeHBlY3RlZCB0YWcgdG8gYmUgXCI8cD5cIiBhbmQgZ290IFwiJyArIGFUYWdzWzBdLnRhZyArICdcIicpXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHR5cGVvZiBhVGFnc1swXS5wYXJhbXMgPT09ICdvYmplY3QnLCAnRXhwZWN0ZWQgdGhlIHBhcmFtcyB0byBiZSBhIE1hcCBvYmplY3QnKVxuICAgICAgICBjb25zb2xlLmFzc2VydChhVGFnc1swXS5wYXJhbXNbJ3AxJ10gPT09ICcnLCAnRXhwZWN0ZWQgcGFyYW1zIHRvIGJlIFwicDE9XCIgYW5kIGdvdCAnICsgSlNPTi5zdHJpbmdpZnkoYVRhZ3NbMF0ucGFyYW1zKSlcbiAgICAgICAgY29uc29sZS5hc3NlcnQoYVRhZ3NbMF0ucmF3dmFsdWUgPT09ICd0ZXN0UGFyYWdyYXBoJywgJ3Rlc3QgcGFyYWdyYXBoIGZhaWxzICcgKyBKU09OLnN0cmluZ2lmeShhVGFnc1swXS50ZXh0dmFsdWUpKVxuXG4gICAgICAgIGFMaW5lcyA9IFsnPHAocDE9NCk+dGVzdFBhcmFncmFwaCddXG4gICAgICAgIGFUYWdzID0gdGhpcy5pbnB1dFRvUGFyYWdyYXBocyhhTGluZXMpXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KGFUYWdzLmxlbmd0aCA9PT0gMSwgJ0V4cGVjdGVkIGFycmF5IG9mIG9uZSBvYmplY3QnKVxuICAgICAgICBjb25zb2xlLmFzc2VydChhVGFnc1swXS50YWcgPT09ICdwJywgJ0V4cGVjdGVkIHRhZyB0byBiZSBcIjxwPlwiIGFuZCBnb3QgXCInICsgYVRhZ3NbMF0udGFnICsgJ1wiJylcbiAgICAgICAgY29uc29sZS5hc3NlcnQodHlwZW9mIGFUYWdzWzBdLnBhcmFtcyA9PT0gJ29iamVjdCcsICdFeHBlY3RlZCB0aGUgcGFyYW1zIHRvIGJlIGEgTWFwIG9iamVjdCcpXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KGFUYWdzWzBdLnBhcmFtc1sncDEnXSA9PT0gJzQnLCAnRXhwZWN0ZWQgcGFyYW1zIHRvIGJlIFtcInAxPTRcIl0gYW5kIGdvdCAnICsgSlNPTi5zdHJpbmdpZnkoYVRhZ3NbMF0ucGFyYW1zWydwMSddKSlcbiAgICAgICAgY29uc29sZS5hc3NlcnQoYVRhZ3NbMF0ucmF3dmFsdWUgPT09ICd0ZXN0UGFyYWdyYXBoJywgJ3Rlc3QgcGFyYWdyYXBoIGZhaWxzICcgKyBKU09OLnN0cmluZ2lmeShhVGFnc1swXS50ZXh0dmFsdWUpKVxuXG4gICAgICAgIGFMaW5lcyA9IFsnPHAocDE9NCxwMj1maXZlKT50ZXN0UGFyYWdyYXBoJ11cbiAgICAgICAgYVRhZ3MgPSB0aGlzLmlucHV0VG9QYXJhZ3JhcGhzKGFMaW5lcylcbiAgICAgICAgY29uc29sZS5hc3NlcnQoYVRhZ3MubGVuZ3RoID09PSAxLCAnRXhwZWN0ZWQgYXJyYXkgb2Ygb25lIG9iamVjdCcpXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KGFUYWdzWzBdLnRhZyA9PT0gJ3AnLCAnRXhwZWN0ZWQgdGFnIHRvIGJlIFwiPHA+XCIgYW5kIGdvdCBcIicgKyBhVGFnc1swXS50YWcgKyAnXCInKVxuICAgICAgICBjb25zb2xlLmFzc2VydCh0eXBlb2YgYVRhZ3NbMF0ucGFyYW1zID09PSAnb2JqZWN0JywgJ0V4cGVjdGVkIHRoZSBwYXJhbXMgdG8gYmUgYSBNYXAgb2JqZWN0JylcbiAgICAgICAgY29uc29sZS5hc3NlcnQoYVRhZ3NbMF0ucGFyYW1zWydwMSddID09PSAnNCcsICdFeHBlY3RlZCBwYXJhbSBwMSB0byBiZSBbXCJwMT00XCJdIGFuZCBnb3QgJyArIEpTT04uc3RyaW5naWZ5KGFUYWdzWzBdLnBhcmFtc1sncDEnXSkpXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KGFUYWdzWzBdLnBhcmFtc1sncDInXSA9PT0gJ2ZpdmUnLCAnRXhwZWN0ZWQgcDIgdG8gYmUgW1wicDI9Zml2ZVwiXSBhbmQgZ290ICcgKyBKU09OLnN0cmluZ2lmeShhVGFnc1swXS5wYXJhbXNbJ3AyJ10pKVxuICAgICAgICBjb25zb2xlLmFzc2VydChhVGFnc1swXS5yYXd2YWx1ZSA9PT0gJ3Rlc3RQYXJhZ3JhcGgnLCBKU09OLnN0cmluZ2lmeShhVGFnc1swXS50ZXh0dmFsdWUpKVxuXG4gICAgICAgIGFMaW5lcyA9IFsnPHAocDEpPnRlc3RQYXJhZ3JhcGgnLCAnIGFuZCBtb3JlJ11cbiAgICAgICAgYVRhZ3MgPSB0aGlzLmlucHV0VG9QYXJhZ3JhcGhzKGFMaW5lcylcbiAgICAgICAgY29uc29sZS5hc3NlcnQoYVRhZ3MubGVuZ3RoID09PSAxLCAnRXhwZWN0ZWQgYXJyYXkgb2Ygb25lIG9iamVjdCcpXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KGFUYWdzWzBdLnRhZyA9PT0gJ3AnLCAnRXhwZWN0ZWQgdGFnIHRvIGJlIFwiPHA+XCIgYW5kIGdvdCBcIicgKyBhVGFnc1swXS50YWcgKyAnXCInKVxuICAgICAgICBjb25zb2xlLmFzc2VydCh0eXBlb2YgYVRhZ3NbMF0ucGFyYW1zID09PSAnb2JqZWN0JywgJ0V4cGVjdGVkIHRoZSBwYXJhbXMgdG8gYmUgYSBNYXAgb2JqZWN0JylcbiAgICAgICAgY29uc29sZS5hc3NlcnQoYVRhZ3NbMF0ucGFyYW1zWydwMSddID09PSAnJywgJ0V4cGVjdGVkIHBhcmFtcyB0byBiZSBbXCJwMVwiXSBhbmQgZ290ICcgKyBKU09OLnN0cmluZ2lmeShhVGFnc1swXS5wYXJhbXMpKVxuICAgICAgICBjb25zb2xlLmFzc2VydChhVGFnc1swXS5yYXd2YWx1ZSA9PT0gJ3Rlc3RQYXJhZ3JhcGhcXG4gYW5kIG1vcmUnLCBKU09OLnN0cmluZ2lmeShhVGFnc1swXS50ZXh0dmFsdWUpKVxuXG5cbiAgICAgICAgLy8gb25lIGRheSwgaWYgd2UgbmVlZCBpdCwgd2UgY2FuIGFkZCAgIDxwKHAxLHAyKT50ZXh0XG5cbiAgICAgICAgLy8gcHJvY2Vzc01hcmtkb3duKClcblxuICAgICAgICBsZXQgclRlc3RzMiA9IFtcbiAgICAgICAgICAgIHsgdGVzdDogJ3RoaXMgI3ZhbHVlIyBpcycsIHJlc3VsdDogJ3RoaXMgPGVtPnZhbHVlPC9lbT4gaXMnIH0sXG4gICAgICAgICAgICB7IHRlc3Q6ICd0aGlzICN2YWx1ZSMgaXMgI2dyZWF0IycsIHJlc3VsdDogJ3RoaXMgPGVtPnZhbHVlPC9lbT4gaXMgPGVtPmdyZWF0PC9lbT4nIH0sXG5cbiAgICAgICAgICAgIC8vIGRvZXNuJ3Qgd29yaywgZG9uJ3Qga25vdyB3aHksIGNvbWUgYmFjayB0byB0aGlzIGxhdGVyXG4gICAgICAgICAgICAvLyB7IHRlc3Q6ICd0aGlzIF92YWx1ZV8gaXMgKmdyZWF0KicsIHJlc3VsdDogJ3RoaXMgPGVtPnZhbHVlPC9lbT4gaXMgPGI+Z3JlYXQ8L2I+JyB9LFxuXG4gICAgICAgICAgICB7IHRlc3Q6ICd0aGlzIGB2YWx1ZWAgaXMgI2dyZWF0IycsIHJlc3VsdDogJ3RoaXMgPHQzZF9jb2RlPnZhbHVlPC90M2RfY29kZT4gaXMgPGVtPmdyZWF0PC9lbT4nIH0sXG4gICAgICAgIF1cblxuICAgICAgICBmb3IgKGxldCBzVGVzdCBvZiByVGVzdHMyKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0MiA9IHRoaXMucHJvY2Vzc01hcmtkb3duKHNUZXN0LnRlc3QpXG4gICAgICAgICAgICBjb25zb2xlLmFzc2VydChyZXN1bHQyID09PSBzVGVzdC5yZXN1bHQsIGBGcm9tICcke3NUZXN0LnRlc3R9JyB3ZSBleHBlY3RlZCAnJHtzVGVzdC5yZXN1bHR9JyBidXQgZ290ICcke3Jlc3VsdDJ9J2ApXG4gICAgICAgIH1cblxuICAgICAgICAvLyBlcmFzZU1hcmtkb3duKClcbiAgICAgICAgbGV0IHJUZXN0czMgPSBbXG4gICAgICAgICAgICB7IHRlc3Q6ICd0aGlzICN2YWx1ZSMgaXMnLCByZXN1bHQ6ICd0aGlzIHZhbHVlIGlzJyB9LFxuICAgICAgICAgICAgeyB0ZXN0OiAndGhpcyAjdmFsdWUjIGlzICNncmVhdCMnLCByZXN1bHQ6ICd0aGlzIHZhbHVlIGlzIGdyZWF0JyB9LFxuICAgICAgICAgICAgeyB0ZXN0OiAnW3RvbWF0b3x0b21hd3RvXScsIHJlc3VsdDogJ3RvbWF3dG8nIH0sXG4gICAgICAgIF1cblxuICAgICAgICByVGVzdHMzLmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQzID0gdGhpcy5lcmFzZU1hcmtkb3duKGkudGVzdClcbiAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHJlc3VsdDMgPT09IGkucmVzdWx0LCBgRnJvbSAnJHtpLnRlc3R9JyB3ZSBleHBlY3RlZCAnJHtpLnJlc3VsdH0nIGJ1dCBnb3QgJyR7cmVzdWx0M30nYClcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBwcm9jZXNzQWx0ZXJuYXRlTWFya2Rvd24gKHNUZXN0LCBtYXJrZXIsIGlzS2VlcClcbiAgICAgICAgbGV0IHJUZXN0czQgPSBbXG4gICAgICAgICAgICB7IHRlc3Q6ICd0aGlzWz98LF0gdmFsdWUnLCByZXN1bHRLZWVwOiAndGhpcz8gdmFsdWUnLCByZXN1bHREaXNjOiAndGhpcywgdmFsdWUnIH0sXG4gICAgICAgIF1cblxuICAgICAgICBmb3IgKGxldCBzVGVzdCBvZiByVGVzdHM0KSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0S2VlcCA9IHRoaXMucHJvY2Vzc0FsdGVybmF0ZU1hcmtkb3duKHNUZXN0LnRlc3QsIHRydWUpXG4gICAgICAgICAgICBsZXQgcmVzdWx0RGlzYyA9IHRoaXMucHJvY2Vzc0FsdGVybmF0ZU1hcmtkb3duKHNUZXN0LnRlc3QsIGZhbHNlKVxuXG4gICAgICAgICAgICBjb25zb2xlLmFzc2VydChyZXN1bHRLZWVwID09PSBzVGVzdC5yZXN1bHRLZWVwLFxuICAgICAgICAgICAgICAgIGBGcm9tICcke3NUZXN0LnRlc3R9JyB3ZSBleHBlY3RlZCAnJHtzVGVzdC5yZXN1bHRLZWVwfScgYnV0IGdvdCAnJHtyZXN1bHRLZWVwfX0nYClcbiAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHJlc3VsdERpc2MgPT09IHNUZXN0LnJlc3VsdERpc2MsXG4gICAgICAgICAgICAgICAgYEZyb20gJyR7c1Rlc3QudGVzdH0nIHdlIGV4cGVjdGVkICcke3NUZXN0LnJlc3VsdERpc2N9JyBidXQgZ290ICcke3Jlc3VsdERpc2N9J2ApXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vICAgICAgICAgLy8gVE9ETyBwdXQgdGVzdGluZyBjb25kaXRpb25zIG9uIHRoaXNcbiAgICAgICAgLy8gICAgICAgICBsZXQgdGVzdCA9IGA8dGl0bGU+SGVsbG8gV29ybGRcXG5cbiAgICAgICAgLy8gPHA+SSdtIGFsaXZlXFxuXG5cbiAgICAgICAgLy8gbGV0IHJlc3VsdCA9IHRoaXMucGFyc2UoJycsIHRlc3QpXG4gICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKHJlc3VsdClcblxuXG4gICAgICAgIHRoaXMudW5pdHRlc3RzMigpXG4gICAgfVxuXG4gICAgdW5pdHRlc3RzMigpIHtcblxuICAgICAgICBsZXQgdGVzdDogc3RyaW5nXG4gICAgICAgIGxldCByc2x0OiBJVGFnW11cblxuICAgICAgICBsZXQgYXNzZXRzID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2Fzc2V0cycpXG4gICAgICAgIGNvbnN0IHZhbGlkVGFncyA9IFtcbiAgICAgICAgICAgICdwJyxcbiAgICAgICAgICAgICdzdWJ0aXRsZScsXG4gICAgICAgICAgICAnc2VjdGlvbicsXG4gICAgICAgICAgICAnYnInLFxuICAgICAgICAgICAgJ2NvZGUnLFxuICAgICAgICAgICAgJ3RpdGxlJyxcbiAgICAgICAgICAgICdtb2R1bGUnLFxuICAgICAgICAgICAgJ2xlc3NvbicsXG4gICAgICAgICAgICAnc2hvcnRkZXNjJyxcbiAgICAgICAgICAgICdicmVhaycsXG4gICAgICAgICAgICAnZHJpbGwnLFxuICAgICAgICAgICAgJ2NtJyxcbiAgICAgICAgICAgICdrZXknLFxuICAgICAgICAgICAgJ3J1biddXG5cbiAgICAgICAgLy8gPG1vZHVsZT5cbiAgICAgICAgLy8gdGVzdCA9ICc8bW9kdWxlPiAwMS1CZWdpbm5lciBKYXZhc2NyaXB0J1xuICAgICAgICAvLyByc2x0ID0gdGhpcy5wYXJzZShhc3NldHMsIHRlc3QpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJzbHQpXG5cbiAgICAgICAgLy8gLy8gPHA+XG4gICAgICAgIC8vIHRlc3QgPSAnPHAoaW1nPXJhZGl1cy5qcGcpPlRoZSBpbWFnZSBvbiB0aGUgcmlnaHQnXG4gICAgICAgIC8vIHJzbHQgPSB0aGlzLnBhcnNlKGFzc2V0cywgdGVzdClcbiAgICAgICAgLy8gY29uc29sZS5sb2cocnNsdClcblxuICAgICAgICAvLyB0ZXN0ID0gJzxwPiBbPGEgaHJlZj1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vY2hyb21lXCI+aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9jaHJvbWU8L2E+fHcgdyB3IGRvdCBnb29nbGUgZG90IGNvbV0nXG4gICAgICAgIC8vIHJzbHQgPSB0aGlzLnBhcnNlKGFzc2V0cywgdGVzdClcbiAgICAgICAgLy8gY29uc29sZS5sb2cocnNsdClcblxuICAgICAgICAvLyAgICAgICAgIHRlc3QgPSBgPHA+IFt0b21hdG98dG9tYXd0b11cbiAgICAgICAgLy8gPHA+IFtmaXJzdHxzZWNvbmRdYFxuICAgICAgICAvLyAgICAgICAgIHJzbHQgPSB0aGlzLnBhcnNlKGFzc2V0cywgdGVzdClcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhyc2x0KVxuXG5cbiAgICAgICAgLy8gICAgICAgICB0ZXN0ID0gJzxwKHAxKT50ZXN0UGFyYWdyYXBoJ1xuICAgICAgICAvLyAgICAgICAgIHJzbHQgPSB0aGlzLnBhcnNlKGFzc2V0cywgdGVzdClcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhyc2x0KVxuXG4gICAgfVxuXG59XG5cblxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRlc3RBc2NpaU1hdGgoKSB7XG4gICAgbGV0IGVxbiA9ICdzdW1fKGk9MSlebiBpXjM9KChuKG4rMSkpLzIpXjInXG4gICAgbGV0IGEgPSBhc2NpaU1hdGgoZXFuKVxuICAgIGxldCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3RtYXRoJylcbiAgICBpZiAobWFpbiAhPT0gbnVsbClcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChhKVxuXG4gICAgZXFuID0gJyBbW2EsYix8LGNdLFtkLGUsfCxmXV0nXG4gICAgYSA9IGFzY2lpTWF0aChlcW4pXG4gICAgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXN0bWF0aCcpXG4gICAgaWYgKG1haW4gIT09IG51bGwpXG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoYSlcblxufVxuZXhwb3J0IGZ1bmN0aW9uIGFzY2lpTWF0aChzdHI6IHN0cmluZykge1xuICAgIGxldCBhc2NpaU1hdGggPSBuZXcgQXNjaWlNYXRoKClcbiAgICByZXR1cm4gYXNjaWlNYXRoLnBhcnNlTWF0aChzdHIsIGZhbHNlKVxufVxuXG5cblxuXG5cbi8qXG5BU0NJSU1hdGhNTC5qc1xuPT09PT09PT09PT09PT1cblRoaXMgZmlsZSBjb250YWlucyBKYXZhU2NyaXB0IGZ1bmN0aW9ucyB0byBjb252ZXJ0IEFTQ0lJIG1hdGggbm90YXRpb25cbmFuZCAoc29tZSkgTGFUZVggdG8gUHJlc2VudGF0aW9uIE1hdGhNTC4gVGhlIGNvbnZlcnNpb24gaXMgZG9uZSB3aGlsZSB0aGVcbkhUTUwgcGFnZSBsb2FkcywgYW5kIHNob3VsZCB3b3JrIHdpdGggRmlyZWZveCBhbmQgb3RoZXIgYnJvd3NlcnMgdGhhdCBjYW5cbnJlbmRlciBNYXRoTUwuXG5cbkp1c3QgYWRkIHRoZSBuZXh0IGxpbmUgdG8geW91ciBIVE1MIHBhZ2Ugd2l0aCB0aGlzIGZpbGUgaW4gdGhlIHNhbWUgZm9sZGVyOlxuXG48c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCJBU0NJSU1hdGhNTC5qc1wiPjwvc2NyaXB0PlxuXG5WZXJzaW9uIDIuMiBNYXIgMywgMjAxNC5cbkxhdGVzdCB2ZXJzaW9uIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoamF4L2FzY2lpbWF0aG1sXG5JZiB5b3UgdXNlIGl0IG9uIGEgd2VicGFnZSwgcGxlYXNlIHNlbmQgdGhlIFVSTCB0byBqaXBzZW5AY2hhcG1hbi5lZHVcblxuQ29weXJpZ2h0IChjKSAyMDE0IFBldGVyIEppcHNlbiBhbmQgb3RoZXIgQVNDSUlNYXRoTUwuanMgY29udHJpYnV0b3JzXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cbiovXG5cblxudmFyIG1hdGhjb2xvciA9IFwiYmx1ZVwiOyAgICAgICAgLy8gY2hhbmdlIGl0IHRvIFwiXCIgKHRvIGluaGVyaXQpIG9yIGFub3RoZXIgY29sb3JcbnZhciBtYXRoZm9udHNpemUgPSBcIjFlbVwiOyAgICAgIC8vIGNoYW5nZSB0byBlLmcuIDEuMmVtIGZvciBsYXJnZXIgbWF0aFxudmFyIG1hdGhmb250ZmFtaWx5ID0gXCJzZXJpZlwiOyAgLy8gY2hhbmdlIHRvIFwiXCIgdG8gaW5oZXJpdCAod29ya3MgaW4gSUUpXG4vLyBvciBhbm90aGVyIGZhbWlseSAoZS5nLiBcImFyaWFsXCIpXG52YXIgYXV0b21hdGhyZWNvZ25pemUgPSBmYWxzZTsgLy8gd3JpdGluZyBcImFtYXRoXCIgb24gcGFnZSBtYWtlcyB0aGlzIHRydWVcbnZhciBjaGVja0Zvck1hdGhNTCA9IHRydWU7ICAgICAvLyBjaGVjayBpZiBicm93c2VyIGNhbiBkaXNwbGF5IE1hdGhNTFxudmFyIG5vdGlmeUlmTm9NYXRoTUwgPSB0cnVlOyAgIC8vIGRpc3BsYXkgbm90ZSBhdCB0b3AgaWYgbm8gTWF0aE1MIGNhcGFiaWxpdHlcbnZhciBhbGVydElmTm9NYXRoTUwgPSBmYWxzZTsgICAvLyBzaG93IGFsZXJ0IGJveCBpZiBubyBNYXRoTUwgY2FwYWJpbGl0eVxudmFyIHRyYW5zbGF0ZU9uTG9hZCA9IHRydWU7ICAgIC8vIHNldCB0byBmYWxzZSB0byBkbyBjYWxsIHRyYW5zbGF0b3JzIGZyb20ganNcbnZhciB0cmFuc2xhdGVBU0NJSU1hdGggPSB0cnVlOyAvLyBmYWxzZSB0byBwcmVzZXJ2ZSBgLi5gXG52YXIgZGlzcGxheXN0eWxlID0gdHJ1ZTsgICAgICAvLyBwdXRzIGxpbWl0cyBhYm92ZSBhbmQgYmVsb3cgbGFyZ2Ugb3BlcmF0b3JzXG52YXIgc2hvd2FzY2lpZm9ybXVsYW9uaG92ZXIgPSB0cnVlOyAvLyBoZWxwcyBzdHVkZW50cyBsZWFybiBBU0NJSU1hdGhcbnZhciBkZWNpbWFsc2lnbiA9IFwiLlwiOyAgICAgICAgLy8gaWYgXCIsXCIgdGhlbiB3aGVuIHdyaXRpbmcgbGlzdHMgb3IgbWF0cmljZXMgcHV0XG4vL2Egc3BhY2UgYWZ0ZXIgdGhlIFwiLFwiIGxpa2UgYCgxLCAyKWAgbm90IGAoMSwyKWBcbnZhciBBTWRlbGltaXRlcjEgPSBcImBcIiwgQU1lc2NhcGUxID0gXCJcXFxcXFxcXGBcIjsgLy8gY2FuIHVzZSBvdGhlciBjaGFyYWN0ZXJzXG52YXIgQU1kb2N1bWVudElkID0gXCJ3aWtpdGV4dFwiIC8vIFBtV2lraSBlbGVtZW50IGNvbnRhaW5pbmcgbWF0aCAoZGVmYXVsdD1ib2R5KVxudmFyIGZpeHBoaSA9IHRydWU7ICBcdFx0Ly9mYWxzZSB0byByZXR1cm4gdG8gbGVnYWN5IHBoaS92YXJwaGkgbWFwcGluZ1xuXG4vKisrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKi9cblxuXG50eXBlIEFNU3ltYm9sID0ge1xuICAgIGlucHV0OiBzdHJpbmdcbiAgICB0YWc6IHN0cmluZyAgLy8nbWknIHwgJ21vJyB8ICdtcm9vdCcgfCAnbWZyYWMnIHwgJ21zdXAnIHwgJ21zdWInIHwgJ21vdmVyJyB8ICdtdGV4dCcgfCAnbXNxcnQnIHwgJ211bmRlcicgfCAnbXN0eWxlJyB8ICdtZW5jbG9zZScgfCAnbXJvdydcbiAgICBvdXRwdXQ6IHN0cmluZ1xuICAgIHRleDogc3RyaW5nIHwgbnVsbFxuICAgIHR0eXBlOiBudW1iZXIgLy90b2tlblR5cGVcblxuICAgIGludmlzaWJsZT86IGJvb2xlYW4gICAgICAgICAvLyBhbGwgdGhlc2Ugb3RoZXIgdW5yZWxpYWJsZSBlbGVtZW50cyA/IT8hXG4gICAgZnVuYz86IGJvb2xlYW5cbiAgICBhY2M/OiBib29sZWFuXG4gICAgcmV3cml0ZWxlZnRyaWdodD86IHN0cmluZ1tdICAvLyBhbHdheXMgdHdvIFxuICAgIG5vdGV4Y29weT86IGJvb2xlYW5cblxuICAgIGF0bmFtZT86IFwibWF0aHZhcmlhbnRcIixcbiAgICBhdHZhbD86IFwiYm9sZFwiIHwgXCJzYW5zLXNlcmlmXCIgfCBcImRvdWJsZS1zdHJ1Y2tcIiB8IFwic2NyaXB0XCIgfCBcImZyYWt0dXJcIiB8IFwibW9ub3NwYWNlXCJcbiAgICBjb2Rlcz86IHN0cmluZ1tdICAgLy8gQU1jYWwgfCBBTWZyayB8IEFNYmJiIHwgXG59XG5cbnR5cGUgVGFnID0gJ2RpdicgfCAncCcgfCAnc3BhbicgfCAnYm9keScgfCAnYSdcblxuXG5cblxuXG5cbi8vIGNoYXJhY3RlciBsaXN0cyBmb3IgTW96aWxsYS9OZXRzY2FwZSBmb250c1xudmFyIEFNY2FsID0gW1wiXFx1RDgzNVxcdURDOUNcIiwgXCJcXHUyMTJDXCIsIFwiXFx1RDgzNVxcdURDOUVcIiwgXCJcXHVEODM1XFx1REM5RlwiLCBcIlxcdTIxMzBcIiwgXCJcXHUyMTMxXCIsIFwiXFx1RDgzNVxcdURDQTJcIiwgXCJcXHUyMTBCXCIsIFwiXFx1MjExMFwiLCBcIlxcdUQ4MzVcXHVEQ0E1XCIsIFwiXFx1RDgzNVxcdURDQTZcIiwgXCJcXHUyMTEyXCIsIFwiXFx1MjEzM1wiLCBcIlxcdUQ4MzVcXHVEQ0E5XCIsIFwiXFx1RDgzNVxcdURDQUFcIiwgXCJcXHVEODM1XFx1RENBQlwiLCBcIlxcdUQ4MzVcXHVEQ0FDXCIsIFwiXFx1MjExQlwiLCBcIlxcdUQ4MzVcXHVEQ0FFXCIsIFwiXFx1RDgzNVxcdURDQUZcIiwgXCJcXHVEODM1XFx1RENCMFwiLCBcIlxcdUQ4MzVcXHVEQ0IxXCIsIFwiXFx1RDgzNVxcdURDQjJcIiwgXCJcXHVEODM1XFx1RENCM1wiLCBcIlxcdUQ4MzVcXHVEQ0I0XCIsIFwiXFx1RDgzNVxcdURDQjVcIiwgXCJcXHVEODM1XFx1RENCNlwiLCBcIlxcdUQ4MzVcXHVEQ0I3XCIsIFwiXFx1RDgzNVxcdURDQjhcIiwgXCJcXHVEODM1XFx1RENCOVwiLCBcIlxcdTIxMkZcIiwgXCJcXHVEODM1XFx1RENCQlwiLCBcIlxcdTIxMEFcIiwgXCJcXHVEODM1XFx1RENCRFwiLCBcIlxcdUQ4MzVcXHVEQ0JFXCIsIFwiXFx1RDgzNVxcdURDQkZcIiwgXCJcXHVEODM1XFx1RENDMFwiLCBcIlxcdUQ4MzVcXHVEQ0MxXCIsIFwiXFx1RDgzNVxcdURDQzJcIiwgXCJcXHVEODM1XFx1RENDM1wiLCBcIlxcdTIxMzRcIiwgXCJcXHVEODM1XFx1RENDNVwiLCBcIlxcdUQ4MzVcXHVEQ0M2XCIsIFwiXFx1RDgzNVxcdURDQzdcIiwgXCJcXHVEODM1XFx1RENDOFwiLCBcIlxcdUQ4MzVcXHVEQ0M5XCIsIFwiXFx1RDgzNVxcdURDQ0FcIiwgXCJcXHVEODM1XFx1RENDQlwiLCBcIlxcdUQ4MzVcXHVEQ0NDXCIsIFwiXFx1RDgzNVxcdURDQ0RcIiwgXCJcXHVEODM1XFx1RENDRVwiLCBcIlxcdUQ4MzVcXHVEQ0NGXCJdO1xuXG52YXIgQU1mcmsgPSBbXCJcXHVEODM1XFx1REQwNFwiLCBcIlxcdUQ4MzVcXHVERDA1XCIsIFwiXFx1MjEyRFwiLCBcIlxcdUQ4MzVcXHVERDA3XCIsIFwiXFx1RDgzNVxcdUREMDhcIiwgXCJcXHVEODM1XFx1REQwOVwiLCBcIlxcdUQ4MzVcXHVERDBBXCIsIFwiXFx1MjEwQ1wiLCBcIlxcdTIxMTFcIiwgXCJcXHVEODM1XFx1REQwRFwiLCBcIlxcdUQ4MzVcXHVERDBFXCIsIFwiXFx1RDgzNVxcdUREMEZcIiwgXCJcXHVEODM1XFx1REQxMFwiLCBcIlxcdUQ4MzVcXHVERDExXCIsIFwiXFx1RDgzNVxcdUREMTJcIiwgXCJcXHVEODM1XFx1REQxM1wiLCBcIlxcdUQ4MzVcXHVERDE0XCIsIFwiXFx1MjExQ1wiLCBcIlxcdUQ4MzVcXHVERDE2XCIsIFwiXFx1RDgzNVxcdUREMTdcIiwgXCJcXHVEODM1XFx1REQxOFwiLCBcIlxcdUQ4MzVcXHVERDE5XCIsIFwiXFx1RDgzNVxcdUREMUFcIiwgXCJcXHVEODM1XFx1REQxQlwiLCBcIlxcdUQ4MzVcXHVERDFDXCIsIFwiXFx1MjEyOFwiLCBcIlxcdUQ4MzVcXHVERDFFXCIsIFwiXFx1RDgzNVxcdUREMUZcIiwgXCJcXHVEODM1XFx1REQyMFwiLCBcIlxcdUQ4MzVcXHVERDIxXCIsIFwiXFx1RDgzNVxcdUREMjJcIiwgXCJcXHVEODM1XFx1REQyM1wiLCBcIlxcdUQ4MzVcXHVERDI0XCIsIFwiXFx1RDgzNVxcdUREMjVcIiwgXCJcXHVEODM1XFx1REQyNlwiLCBcIlxcdUQ4MzVcXHVERDI3XCIsIFwiXFx1RDgzNVxcdUREMjhcIiwgXCJcXHVEODM1XFx1REQyOVwiLCBcIlxcdUQ4MzVcXHVERDJBXCIsIFwiXFx1RDgzNVxcdUREMkJcIiwgXCJcXHVEODM1XFx1REQyQ1wiLCBcIlxcdUQ4MzVcXHVERDJEXCIsIFwiXFx1RDgzNVxcdUREMkVcIiwgXCJcXHVEODM1XFx1REQyRlwiLCBcIlxcdUQ4MzVcXHVERDMwXCIsIFwiXFx1RDgzNVxcdUREMzFcIiwgXCJcXHVEODM1XFx1REQzMlwiLCBcIlxcdUQ4MzVcXHVERDMzXCIsIFwiXFx1RDgzNVxcdUREMzRcIiwgXCJcXHVEODM1XFx1REQzNVwiLCBcIlxcdUQ4MzVcXHVERDM2XCIsIFwiXFx1RDgzNVxcdUREMzdcIl07XG5cbnZhciBBTWJiYiA9IFtcIlxcdUQ4MzVcXHVERDM4XCIsIFwiXFx1RDgzNVxcdUREMzlcIiwgXCJcXHUyMTAyXCIsIFwiXFx1RDgzNVxcdUREM0JcIiwgXCJcXHVEODM1XFx1REQzQ1wiLCBcIlxcdUQ4MzVcXHVERDNEXCIsIFwiXFx1RDgzNVxcdUREM0VcIiwgXCJcXHUyMTBEXCIsIFwiXFx1RDgzNVxcdURENDBcIiwgXCJcXHVEODM1XFx1REQ0MVwiLCBcIlxcdUQ4MzVcXHVERDQyXCIsIFwiXFx1RDgzNVxcdURENDNcIiwgXCJcXHVEODM1XFx1REQ0NFwiLCBcIlxcdTIxMTVcIiwgXCJcXHVEODM1XFx1REQ0NlwiLCBcIlxcdTIxMTlcIiwgXCJcXHUyMTFBXCIsIFwiXFx1MjExRFwiLCBcIlxcdUQ4MzVcXHVERDRBXCIsIFwiXFx1RDgzNVxcdURENEJcIiwgXCJcXHVEODM1XFx1REQ0Q1wiLCBcIlxcdUQ4MzVcXHVERDREXCIsIFwiXFx1RDgzNVxcdURENEVcIiwgXCJcXHVEODM1XFx1REQ0RlwiLCBcIlxcdUQ4MzVcXHVERDUwXCIsIFwiXFx1MjEyNFwiLCBcIlxcdUQ4MzVcXHVERDUyXCIsIFwiXFx1RDgzNVxcdURENTNcIiwgXCJcXHVEODM1XFx1REQ1NFwiLCBcIlxcdUQ4MzVcXHVERDU1XCIsIFwiXFx1RDgzNVxcdURENTZcIiwgXCJcXHVEODM1XFx1REQ1N1wiLCBcIlxcdUQ4MzVcXHVERDU4XCIsIFwiXFx1RDgzNVxcdURENTlcIiwgXCJcXHVEODM1XFx1REQ1QVwiLCBcIlxcdUQ4MzVcXHVERDVCXCIsIFwiXFx1RDgzNVxcdURENUNcIiwgXCJcXHVEODM1XFx1REQ1RFwiLCBcIlxcdUQ4MzVcXHVERDVFXCIsIFwiXFx1RDgzNVxcdURENUZcIiwgXCJcXHVEODM1XFx1REQ2MFwiLCBcIlxcdUQ4MzVcXHVERDYxXCIsIFwiXFx1RDgzNVxcdURENjJcIiwgXCJcXHVEODM1XFx1REQ2M1wiLCBcIlxcdUQ4MzVcXHVERDY0XCIsIFwiXFx1RDgzNVxcdURENjVcIiwgXCJcXHVEODM1XFx1REQ2NlwiLCBcIlxcdUQ4MzVcXHVERDY3XCIsIFwiXFx1RDgzNVxcdURENjhcIiwgXCJcXHVEODM1XFx1REQ2OVwiLCBcIlxcdUQ4MzVcXHVERDZBXCIsIFwiXFx1RDgzNVxcdURENkJcIl07XG4vKnZhciBBTWNhbCA9IFsweEVGMzUsMHgyMTJDLDB4RUYzNiwweEVGMzcsMHgyMTMwLDB4MjEzMSwweEVGMzgsMHgyMTBCLDB4MjExMCwweEVGMzksMHhFRjNBLDB4MjExMiwweDIxMzMsMHhFRjNCLDB4RUYzQywweEVGM0QsMHhFRjNFLDB4MjExQiwweEVGM0YsMHhFRjQwLDB4RUY0MSwweEVGNDIsMHhFRjQzLDB4RUY0NCwweEVGNDUsMHhFRjQ2XTtcbnZhciBBTWZyayA9IFsweEVGNUQsMHhFRjVFLDB4MjEyRCwweEVGNUYsMHhFRjYwLDB4RUY2MSwweEVGNjIsMHgyMTBDLDB4MjExMSwweEVGNjMsMHhFRjY0LDB4RUY2NSwweEVGNjYsMHhFRjY3LDB4RUY2OCwweEVGNjksMHhFRjZBLDB4MjExQywweEVGNkIsMHhFRjZDLDB4RUY2RCwweEVGNkUsMHhFRjZGLDB4RUY3MCwweEVGNzEsMHgyMTI4XTtcbnZhciBBTWJiYiA9IFsweEVGOEMsMHhFRjhELDB4MjEwMiwweEVGOEUsMHhFRjhGLDB4RUY5MCwweEVGOTEsMHgyMTBELDB4RUY5MiwweEVGOTMsMHhFRjk0LDB4RUY5NSwweEVGOTYsMHgyMTE1LDB4RUY5NywweDIxMTksMHgyMTFBLDB4MjExRCwweEVGOTgsMHhFRjk5LDB4RUY5QSwweEVGOUIsMHhFRjlDLDB4RUY5RCwweEVGOUUsMHgyMTI0XTsqL1xuXG52YXIgQ09OU1QgPSAwLCBVTkFSWSA9IDEsIEJJTkFSWSA9IDIsIElORklYID0gMywgTEVGVEJSQUNLRVQgPSA0LFxuICAgIFJJR0hUQlJBQ0tFVCA9IDUsIFNQQUNFID0gNiwgVU5ERVJPVkVSID0gNywgREVGSU5JVElPTiA9IDgsXG4gICAgTEVGVFJJR0hUID0gOSwgVEVYVCA9IDEwLCBCSUcgPSAxMSwgTE9ORyA9IDEyLCBTVFJFVENIWSA9IDEzLFxuICAgIE1BVFJJWCA9IDE0LCBVTkFSWVVOREVST1ZFUiA9IDE1OyAvLyB0b2tlbiB0eXBlc1xuXG52YXIgQU1xdW90ZSA9IHsgaW5wdXQ6IFwiXFxcIlwiLCB0YWc6IFwibXRleHRcIiwgb3V0cHV0OiBcIm1ib3hcIiwgdGV4OiBudWxsLCB0dHlwZTogVEVYVCB9O1xuXG52YXIgQU1zeW1ib2xzOiBBTVN5bWJvbFtdID0gW1xuICAgIC8vc29tZSBncmVlayBzeW1ib2xzXG4gICAgeyBpbnB1dDogXCJhbHBoYVwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcIlxcdTAzQjFcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcImJldGFcIiwgdGFnOiBcIm1pXCIsIG91dHB1dDogXCJcXHUwM0IyXCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJjaGlcIiwgdGFnOiBcIm1pXCIsIG91dHB1dDogXCJcXHUwM0M3XCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJkZWx0YVwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcIlxcdTAzQjRcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIkRlbHRhXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MDM5NFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiZXBzaVwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcIlxcdTAzQjVcIiwgdGV4OiBcImVwc2lsb25cIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJ2YXJlcHNpbG9uXCIsIHRhZzogXCJtaVwiLCBvdXRwdXQ6IFwiXFx1MDI1QlwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiZXRhXCIsIHRhZzogXCJtaVwiLCBvdXRwdXQ6IFwiXFx1MDNCN1wiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiZ2FtbWFcIiwgdGFnOiBcIm1pXCIsIG91dHB1dDogXCJcXHUwM0IzXCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJHYW1tYVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTAzOTNcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcImlvdGFcIiwgdGFnOiBcIm1pXCIsIG91dHB1dDogXCJcXHUwM0I5XCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJrYXBwYVwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcIlxcdTAzQkFcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcImxhbWJkYVwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcIlxcdTAzQkJcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIkxhbWJkYVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTAzOUJcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcImxhbWRhXCIsIHRhZzogXCJtaVwiLCBvdXRwdXQ6IFwiXFx1MDNCQlwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiTGFtZGFcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUwMzlCXCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJtdVwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcIlxcdTAzQkNcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIm51XCIsIHRhZzogXCJtaVwiLCBvdXRwdXQ6IFwiXFx1MDNCRFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwib21lZ2FcIiwgdGFnOiBcIm1pXCIsIG91dHB1dDogXCJcXHUwM0M5XCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJPbWVnYVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTAzQTlcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcInBoaVwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBmaXhwaGkgPyBcIlxcdTAzRDVcIiA6IFwiXFx1MDNDNlwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwidmFycGhpXCIsIHRhZzogXCJtaVwiLCBvdXRwdXQ6IGZpeHBoaSA/IFwiXFx1MDNDNlwiIDogXCJcXHUwM0Q1XCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJQaGlcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUwM0E2XCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJwaVwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcIlxcdTAzQzBcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIlBpXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MDNBMFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwicHNpXCIsIHRhZzogXCJtaVwiLCBvdXRwdXQ6IFwiXFx1MDNDOFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiUHNpXCIsIHRhZzogXCJtaVwiLCBvdXRwdXQ6IFwiXFx1MDNBOFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwicmhvXCIsIHRhZzogXCJtaVwiLCBvdXRwdXQ6IFwiXFx1MDNDMVwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwic2lnbWFcIiwgdGFnOiBcIm1pXCIsIG91dHB1dDogXCJcXHUwM0MzXCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJTaWdtYVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTAzQTNcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcInRhdVwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcIlxcdTAzQzRcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcInRoZXRhXCIsIHRhZzogXCJtaVwiLCBvdXRwdXQ6IFwiXFx1MDNCOFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwidmFydGhldGFcIiwgdGFnOiBcIm1pXCIsIG91dHB1dDogXCJcXHUwM0QxXCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJUaGV0YVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTAzOThcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcInVwc2lsb25cIiwgdGFnOiBcIm1pXCIsIG91dHB1dDogXCJcXHUwM0M1XCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJ4aVwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcIlxcdTAzQkVcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIlhpXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MDM5RVwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiemV0YVwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcIlxcdTAzQjZcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcblxuICAgIC8vYmluYXJ5IG9wZXJhdGlvbiBzeW1ib2xzXG4gICAgLy97aW5wdXQ6XCItXCIsICB0YWc6XCJtb1wiLCBvdXRwdXQ6XCJcXHUwMDk2XCIsIHRleDpudWxsLCB0dHlwZTpDT05TVH0sXG4gICAgeyBpbnB1dDogXCIqXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjJDNVwiLCB0ZXg6IFwiY2RvdFwiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIioqXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjIxN1wiLCB0ZXg6IFwiYXN0XCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiKioqXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjJDNlwiLCB0ZXg6IFwic3RhclwiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIi8vXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiL1wiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiXFxcXFxcXFxcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXFxcXCIsIHRleDogXCJiYWNrc2xhc2hcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJzZXRtaW51c1wiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcXFxcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcInh4XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MDBEN1wiLCB0ZXg6IFwidGltZXNcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJ8PjxcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMkM5XCIsIHRleDogXCJsdGltZXNcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCI+PHxcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMkNBXCIsIHRleDogXCJydGltZXNcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJ8Pjx8XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjJDOFwiLCB0ZXg6IFwiYm93dGllXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiLTpcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUwMEY3XCIsIHRleDogXCJkaXZcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJkaXZpZGVcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCItOlwiLCB0ZXg6IG51bGwsIHR0eXBlOiBERUZJTklUSU9OIH0sXG4gICAgeyBpbnB1dDogXCJAXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjIxOFwiLCB0ZXg6IFwiY2lyY1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIm8rXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjI5NVwiLCB0ZXg6IFwib3BsdXNcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJveFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyOTdcIiwgdGV4OiBcIm90aW1lc1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIm8uXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjI5OVwiLCAvKmFtcGFyc2VpKi8gdGV4OiBcIm9kb3RcIiwgdHR5cGU6IENPTlNUIH0sICAvL3RidGJcbiAgICB7IGlucHV0OiBcInN1bVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyMTFcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5ERVJPVkVSIH0sXG4gICAgeyBpbnB1dDogXCJwcm9kXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjIwRlwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkRFUk9WRVIgfSxcbiAgICB7IGlucHV0OiBcIl5eXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjIyN1wiLCB0ZXg6IFwid2VkZ2VcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJeXl5cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMkMwXCIsIHRleDogXCJiaWd3ZWRnZVwiLCB0dHlwZTogVU5ERVJPVkVSIH0sXG4gICAgeyBpbnB1dDogXCJ2dlwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyMjhcIiwgdGV4OiBcInZlZVwiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcInZ2dlwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyQzFcIiwgdGV4OiBcImJpZ3ZlZVwiLCB0dHlwZTogVU5ERVJPVkVSIH0sXG4gICAgeyBpbnB1dDogXCJublwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyMjlcIiwgdGV4OiBcImNhcFwiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIm5ublwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyQzJcIiwgdGV4OiBcImJpZ2NhcFwiLCB0dHlwZTogVU5ERVJPVkVSIH0sXG4gICAgeyBpbnB1dDogXCJ1dVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyMkFcIiwgdGV4OiBcImN1cFwiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcInV1dVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyQzNcIiwgdGV4OiBcImJpZ2N1cFwiLCB0dHlwZTogVU5ERVJPVkVSIH0sXG5cbiAgICAvL2JpbmFyeSByZWxhdGlvbiBzeW1ib2xzXG4gICAgeyBpbnB1dDogXCIhPVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyNjBcIiwgdGV4OiBcIm5lXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiOj1cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCI6PVwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwibHRcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCI8XCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCI8PVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyNjRcIiwgdGV4OiBcImxlXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwibHQ9XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjI2NFwiLCB0ZXg6IFwibGVxXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiZ3RcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCI+XCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJtbHRcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMjZBXCIsIHRleDogXCJsbFwiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIj49XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjI2NVwiLCB0ZXg6IFwiZ2VcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJndD1cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMjY1XCIsIHRleDogXCJnZXFcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJtZ3RcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMjZCXCIsIHRleDogXCJnZ1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIi08XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjI3QVwiLCB0ZXg6IFwicHJlY1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIi1sdFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyN0FcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIj4tXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjI3QlwiLCB0ZXg6IFwic3VjY1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIi08PVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTJBQUZcIiwgdGV4OiBcInByZWNlcVwiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIj4tPVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTJBQjBcIiwgdGV4OiBcInN1Y2NlcVwiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcImluXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjIwOFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiIWluXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjIwOVwiLCB0ZXg6IFwibm90aW5cIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJzdWJcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMjgyXCIsIHRleDogXCJzdWJzZXRcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJzdXBcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMjgzXCIsIHRleDogXCJzdXBzZXRcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJzdWJlXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjI4NlwiLCB0ZXg6IFwic3Vic2V0ZXFcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJzdXBlXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjI4N1wiLCB0ZXg6IFwic3Vwc2V0ZXFcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCItPVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyNjFcIiwgdGV4OiBcImVxdWl2XCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwifj1cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMjQ1XCIsIHRleDogXCJjb25nXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwifn5cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMjQ4XCIsIHRleDogXCJhcHByb3hcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJ+XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjIzQ1wiLCB0ZXg6IFwic2ltXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwicHJvcFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyMURcIiwgdGV4OiBcInByb3B0b1wiLCB0dHlwZTogQ09OU1QgfSxcblxuICAgIC8vbG9naWNhbCBzeW1ib2xzXG4gICAgeyBpbnB1dDogXCJhbmRcIiwgdGFnOiBcIm10ZXh0XCIsIG91dHB1dDogXCJhbmRcIiwgdGV4OiBudWxsLCB0dHlwZTogU1BBQ0UgfSxcbiAgICB7IGlucHV0OiBcIm9yXCIsIHRhZzogXCJtdGV4dFwiLCBvdXRwdXQ6IFwib3JcIiwgdGV4OiBudWxsLCB0dHlwZTogU1BBQ0UgfSxcbiAgICB7IGlucHV0OiBcIm5vdFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTAwQUNcIiwgdGV4OiBcIm5lZ1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIj0+XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjFEMlwiLCB0ZXg6IFwiaW1wbGllc1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcImlmXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiaWZcIiwgdGV4OiBudWxsLCB0dHlwZTogU1BBQ0UgfSxcbiAgICB7IGlucHV0OiBcIjw9PlwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIxRDRcIiwgdGV4OiBcImlmZlwiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIkFBXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjIwMFwiLCB0ZXg6IFwiZm9yYWxsXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiRUVcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMjAzXCIsIHRleDogXCJleGlzdHNcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJffF9cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMkE1XCIsIHRleDogXCJib3RcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJUVFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyQTRcIiwgdGV4OiBcInRvcFwiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcInwtLVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyQTJcIiwgdGV4OiBcInZkYXNoXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwifD09XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjJBOFwiLCB0ZXg6IFwibW9kZWxzXCIsIHR0eXBlOiBDT05TVCB9LFxuXG4gICAgLy9ncm91cGluZyBicmFja2V0c1xuICAgIHsgaW5wdXQ6IFwiKFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIihcIiwgdGV4OiBcImxlZnQoXCIsIHR0eXBlOiBMRUZUQlJBQ0tFVCB9LFxuICAgIHsgaW5wdXQ6IFwiKVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIilcIiwgdGV4OiBcInJpZ2h0KVwiLCB0dHlwZTogUklHSFRCUkFDS0VUIH0sXG4gICAgeyBpbnB1dDogXCJbXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiW1wiLCB0ZXg6IFwibGVmdFtcIiwgdHR5cGU6IExFRlRCUkFDS0VUIH0sXG4gICAgeyBpbnB1dDogXCJdXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXVwiLCB0ZXg6IFwicmlnaHRdXCIsIHR0eXBlOiBSSUdIVEJSQUNLRVQgfSxcbiAgICB7IGlucHV0OiBcIntcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJ7XCIsIHRleDogbnVsbCwgdHR5cGU6IExFRlRCUkFDS0VUIH0sXG4gICAgeyBpbnB1dDogXCJ9XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwifVwiLCB0ZXg6IG51bGwsIHR0eXBlOiBSSUdIVEJSQUNLRVQgfSxcbiAgICB7IGlucHV0OiBcInxcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJ8XCIsIHRleDogbnVsbCwgdHR5cGU6IExFRlRSSUdIVCB9LFxuICAgIHsgaW5wdXQ6IFwiOnw6XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwifFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwifDpcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJ8XCIsIHRleDogbnVsbCwgdHR5cGU6IExFRlRCUkFDS0VUIH0sXG4gICAgeyBpbnB1dDogXCI6fFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcInxcIiwgdGV4OiBudWxsLCB0dHlwZTogUklHSFRCUkFDS0VUIH0sXG4gICAgLy97aW5wdXQ6XCJ8fFwiLCB0YWc6XCJtb1wiLCBvdXRwdXQ6XCJ8fFwiLCB0ZXg6bnVsbCwgdHR5cGU6TEVGVFJJR0hUfSxcbiAgICB7IGlucHV0OiBcIig6XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjMyOVwiLCB0ZXg6IFwibGFuZ2xlXCIsIHR0eXBlOiBMRUZUQlJBQ0tFVCB9LFxuICAgIHsgaW5wdXQ6IFwiOilcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMzJBXCIsIHRleDogXCJyYW5nbGVcIiwgdHR5cGU6IFJJR0hUQlJBQ0tFVCB9LFxuICAgIHsgaW5wdXQ6IFwiPDxcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMzI5XCIsIHRleDogbnVsbCwgdHR5cGU6IExFRlRCUkFDS0VUIH0sXG4gICAgeyBpbnB1dDogXCI+PlwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIzMkFcIiwgdGV4OiBudWxsLCB0dHlwZTogUklHSFRCUkFDS0VUIH0sXG4gICAgeyBpbnB1dDogXCJ7OlwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIns6XCIsIHRleDogbnVsbCwgdHR5cGU6IExFRlRCUkFDS0VULCBpbnZpc2libGU6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcIjp9XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiOn1cIiwgdGV4OiBudWxsLCB0dHlwZTogUklHSFRCUkFDS0VULCBpbnZpc2libGU6IHRydWUgfSxcblxuICAgIC8vbWlzY2VsbGFuZW91cyBzeW1ib2xzXG4gICAgeyBpbnB1dDogXCJpbnRcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMjJCXCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJkeFwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcIns6ZCB4On1cIiwgdGV4OiBudWxsLCB0dHlwZTogREVGSU5JVElPTiB9LFxuICAgIHsgaW5wdXQ6IFwiZHlcIiwgdGFnOiBcIm1pXCIsIG91dHB1dDogXCJ7OmQgeTp9XCIsIHRleDogbnVsbCwgdHR5cGU6IERFRklOSVRJT04gfSxcbiAgICB7IGlucHV0OiBcImR6XCIsIHRhZzogXCJtaVwiLCBvdXRwdXQ6IFwiezpkIHo6fVwiLCB0ZXg6IG51bGwsIHR0eXBlOiBERUZJTklUSU9OIH0sXG4gICAgeyBpbnB1dDogXCJkdFwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcIns6ZCB0On1cIiwgdGV4OiBudWxsLCB0dHlwZTogREVGSU5JVElPTiB9LFxuICAgIHsgaW5wdXQ6IFwib2ludFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyMkVcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcImRlbFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyMDJcIiwgdGV4OiBcInBhcnRpYWxcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJncmFkXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjIwN1wiLCB0ZXg6IFwibmFibGFcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCIrLVwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTAwQjFcIiwgdGV4OiBcInBtXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiLStcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMjEzXCIsIHRleDogXCJtcFwiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIk8vXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjIwNVwiLCB0ZXg6IFwiZW1wdHlzZXRcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJvb1wiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyMUVcIiwgdGV4OiBcImluZnR5XCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiYWxlcGhcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMTM1XCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCIuLi5cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCIuLi5cIiwgdGV4OiBcImxkb3RzXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiOi5cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMjM0XCIsIHRleDogXCJ0aGVyZWZvcmVcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCI6J1wiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyMzVcIiwgdGV4OiBcImJlY2F1c2VcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCIvX1wiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyMjBcIiwgdGV4OiBcImFuZ2xlXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiL19cXFxcXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjVCM1wiLCB0ZXg6IFwidHJpYW5nbGVcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCInXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjAzMlwiLCB0ZXg6IFwicHJpbWVcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJ0aWxkZVwiLCB0YWc6IFwibW92ZXJcIiwgb3V0cHV0OiBcIn5cIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGFjYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwiXFxcXCBcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUwMEEwXCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJmcm93blwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIzMjJcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcInF1YWRcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUwMEEwXFx1MDBBMFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwicXF1YWRcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUwMEEwXFx1MDBBMFxcdTAwQTBcXHUwMEEwXCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJjZG90c1wiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIyRUZcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcInZkb3RzXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjJFRVwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiZGRvdHNcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMkYxXCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJkaWFtb25kXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjJDNFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwic3F1YXJlXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjVBMVwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwifF9fXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjMwQVwiLCB0ZXg6IFwibGZsb29yXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiX198XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjMwQlwiLCB0ZXg6IFwicmZsb29yXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwifH5cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMzA4XCIsIHRleDogXCJsY2VpbGluZ1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIn58XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjMwOVwiLCB0ZXg6IFwicmNlaWxpbmdcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJDQ1wiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIxMDJcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIk5OXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjExNVwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiUVFcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMTFBXCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJSUlwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIxMURcIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIlpaXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjEyNFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiZlwiLCB0YWc6IFwibWlcIiwgb3V0cHV0OiBcImZcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcImdcIiwgdGFnOiBcIm1pXCIsIG91dHB1dDogXCJnXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG5cbiAgICAvL3N0YW5kYXJkIGZ1bmN0aW9uc1xuICAgIHsgaW5wdXQ6IFwibGltXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwibGltXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOREVST1ZFUiB9LFxuICAgIHsgaW5wdXQ6IFwiTGltXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiTGltXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOREVST1ZFUiB9LFxuICAgIHsgaW5wdXQ6IFwic2luXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwic2luXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJjb3NcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJjb3NcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcInRhblwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcInRhblwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgZnVuYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwic2luaFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcInNpbmhcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcImNvc2hcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJjb3NoXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJ0YW5oXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwidGFuaFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgZnVuYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwiY290XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiY290XCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJzZWNcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJzZWNcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcImNzY1wiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcImNzY1wiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgZnVuYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwiYXJjc2luXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiYXJjc2luXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJhcmNjb3NcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJhcmNjb3NcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcImFyY3RhblwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcImFyY3RhblwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgZnVuYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwiY290aFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcImNvdGhcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcInNlY2hcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJzZWNoXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJjc2NoXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiY3NjaFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgZnVuYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwiZXhwXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiZXhwXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJhYnNcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJhYnNcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIHJld3JpdGVsZWZ0cmlnaHQ6IFtcInxcIiwgXCJ8XCJdIH0sXG4gICAgeyBpbnB1dDogXCJub3JtXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwibm9ybVwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgcmV3cml0ZWxlZnRyaWdodDogW1wiXFx1MjIyNVwiLCBcIlxcdTIyMjVcIl0gfSxcbiAgICB7IGlucHV0OiBcImZsb29yXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiZmxvb3JcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIHJld3JpdGVsZWZ0cmlnaHQ6IFtcIlxcdTIzMEFcIiwgXCJcXHUyMzBCXCJdIH0sXG4gICAgeyBpbnB1dDogXCJjZWlsXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiY2VpbFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgcmV3cml0ZWxlZnRyaWdodDogW1wiXFx1MjMwOFwiLCBcIlxcdTIzMDlcIl0gfSxcbiAgICB7IGlucHV0OiBcImxvZ1wiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcImxvZ1wiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgZnVuYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwibG5cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJsblwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgZnVuYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwiZGV0XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiZGV0XCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJkaW1cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJkaW1cIiwgdGV4OiBudWxsLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIm1vZFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIm1vZFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiZ2NkXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiZ2NkXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJsY21cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJsY21cIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcImx1YlwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcImx1YlwiLCB0ZXg6IG51bGwsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiZ2xiXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiZ2xiXCIsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCJtaW5cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJtaW5cIiwgdGV4OiBudWxsLCB0dHlwZTogVU5ERVJPVkVSIH0sXG4gICAgeyBpbnB1dDogXCJtYXhcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJtYXhcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5ERVJPVkVSIH0sXG4gICAgeyBpbnB1dDogXCJTaW5cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJTaW5cIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcIkNvc1wiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIkNvc1wiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgZnVuYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwiVGFuXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiVGFuXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJBcmNzaW5cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJBcmNzaW5cIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcIkFyY2Nvc1wiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIkFyY2Nvc1wiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgZnVuYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwiQXJjdGFuXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiQXJjdGFuXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJTaW5oXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiU2luaFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgZnVuYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwiQ29zaFwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIkNvc2hcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcIlRhbmhcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJUYW5oXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJDb3RcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJDb3RcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcIlNlY1wiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlNlY1wiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgZnVuYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwiQ3NjXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiQ3NjXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBmdW5jOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJMb2dcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJMb2dcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcIkxuXCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiTG5cIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcIkFic1wiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcImFic1wiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgbm90ZXhjb3B5OiB0cnVlLCByZXdyaXRlbGVmdHJpZ2h0OiBbXCJ8XCIsIFwifFwiXSB9LFxuXG4gICAgLy9hcnJvd3NcbiAgICB7IGlucHV0OiBcInVhcnJcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMTkxXCIsIHRleDogXCJ1cGFycm93XCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiZGFyclwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIxOTNcIiwgdGV4OiBcImRvd25hcnJvd1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcInJhcnJcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMTkyXCIsIHRleDogXCJyaWdodGFycm93XCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiLT5cIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMTkyXCIsIHRleDogXCJ0b1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcIj4tPlwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIxQTNcIiwgdGV4OiBcInJpZ2h0YXJyb3d0YWlsXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwiLT4+XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjFBMFwiLCB0ZXg6IFwidHdvaGVhZHJpZ2h0YXJyb3dcIiwgdHR5cGU6IENPTlNUIH0sXG4gICAgeyBpbnB1dDogXCI+LT4+XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjkxNlwiLCB0ZXg6IFwidHdvaGVhZHJpZ2h0YXJyb3d0YWlsXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwifC0+XCIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IFwiXFx1MjFBNlwiLCB0ZXg6IFwibWFwc3RvXCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwibGFyclwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIxOTBcIiwgdGV4OiBcImxlZnRhcnJvd1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcImhhcnJcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMTk0XCIsIHRleDogXCJsZWZ0cmlnaHRhcnJvd1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcInJBcnJcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMUQyXCIsIHRleDogXCJSaWdodGFycm93XCIsIHR0eXBlOiBDT05TVCB9LFxuICAgIHsgaW5wdXQ6IFwibEFyclwiLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBcIlxcdTIxRDBcIiwgdGV4OiBcIkxlZnRhcnJvd1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICB7IGlucHV0OiBcImhBcnJcIiwgdGFnOiBcIm1vXCIsIG91dHB1dDogXCJcXHUyMUQ0XCIsIHRleDogXCJMZWZ0cmlnaHRhcnJvd1wiLCB0dHlwZTogQ09OU1QgfSxcbiAgICAvL2NvbW1hbmRzIHdpdGggYXJndW1lbnRcbiAgICB7IGlucHV0OiBcInNxcnRcIiwgdGFnOiBcIm1zcXJ0XCIsIG91dHB1dDogXCJzcXJ0XCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZIH0sXG4gICAgeyBpbnB1dDogXCJyb290XCIsIHRhZzogXCJtcm9vdFwiLCBvdXRwdXQ6IFwicm9vdFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBCSU5BUlkgfSxcbiAgICB7IGlucHV0OiBcImZyYWNcIiwgdGFnOiBcIm1mcmFjXCIsIG91dHB1dDogXCIvXCIsIHRleDogbnVsbCwgdHR5cGU6IEJJTkFSWSB9LFxuICAgIHsgaW5wdXQ6IFwiL1wiLCB0YWc6IFwibWZyYWNcIiwgb3V0cHV0OiBcIi9cIiwgdGV4OiBudWxsLCB0dHlwZTogSU5GSVggfSxcbiAgICB7IGlucHV0OiBcInN0YWNrcmVsXCIsIHRhZzogXCJtb3ZlclwiLCBvdXRwdXQ6IFwic3RhY2tyZWxcIiwgdGV4OiBudWxsLCB0dHlwZTogQklOQVJZIH0sXG4gICAgeyBpbnB1dDogXCJvdmVyc2V0XCIsIHRhZzogXCJtb3ZlclwiLCBvdXRwdXQ6IFwic3RhY2tyZWxcIiwgdGV4OiBudWxsLCB0dHlwZTogQklOQVJZIH0sXG4gICAgeyBpbnB1dDogXCJ1bmRlcnNldFwiLCB0YWc6IFwibXVuZGVyXCIsIG91dHB1dDogXCJzdGFja3JlbFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBCSU5BUlkgfSxcbiAgICB7IGlucHV0OiBcIl9cIiwgdGFnOiBcIm1zdWJcIiwgb3V0cHV0OiBcIl9cIiwgdGV4OiBudWxsLCB0dHlwZTogSU5GSVggfSxcbiAgICB7IGlucHV0OiBcIl5cIiwgdGFnOiBcIm1zdXBcIiwgb3V0cHV0OiBcIl5cIiwgdGV4OiBudWxsLCB0dHlwZTogSU5GSVggfSxcbiAgICB7IGlucHV0OiBcImhhdFwiLCB0YWc6IFwibW92ZXJcIiwgb3V0cHV0OiBcIlxcdTAwNUVcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGFjYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwiYmFyXCIsIHRhZzogXCJtb3ZlclwiLCBvdXRwdXQ6IFwiXFx1MDBBRlwiLCB0ZXg6IFwib3ZlcmxpbmVcIiwgdHR5cGU6IFVOQVJZLCBhY2M6IHRydWUgfSxcbiAgICB7IGlucHV0OiBcInZlY1wiLCB0YWc6IFwibW92ZXJcIiwgb3V0cHV0OiBcIlxcdTIxOTJcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGFjYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwiZG90XCIsIHRhZzogXCJtb3ZlclwiLCBvdXRwdXQ6IFwiLlwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgYWNjOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJkZG90XCIsIHRhZzogXCJtb3ZlclwiLCBvdXRwdXQ6IFwiLi5cIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGFjYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwib3ZlcmFyY1wiLCB0YWc6IFwibW92ZXJcIiwgb3V0cHV0OiBcIlxcdTIzRENcIiwgdGV4OiBcIm92ZXJwYXJlblwiLCB0dHlwZTogVU5BUlksIGFjYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwidWxcIiwgdGFnOiBcIm11bmRlclwiLCBvdXRwdXQ6IFwiXFx1MDMzMlwiLCB0ZXg6IFwidW5kZXJsaW5lXCIsIHR0eXBlOiBVTkFSWSwgYWNjOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJ1YnJhY2VcIiwgdGFnOiBcIm11bmRlclwiLCBvdXRwdXQ6IFwiXFx1MjNERlwiLCB0ZXg6IFwidW5kZXJicmFjZVwiLCB0dHlwZTogVU5BUllVTkRFUk9WRVIsIGFjYzogdHJ1ZSB9LFxuICAgIHsgaW5wdXQ6IFwib2JyYWNlXCIsIHRhZzogXCJtb3ZlclwiLCBvdXRwdXQ6IFwiXFx1MjNERVwiLCB0ZXg6IFwib3ZlcmJyYWNlXCIsIHR0eXBlOiBVTkFSWVVOREVST1ZFUiwgYWNjOiB0cnVlIH0sXG4gICAgeyBpbnB1dDogXCJ0ZXh0XCIsIHRhZzogXCJtdGV4dFwiLCBvdXRwdXQ6IFwidGV4dFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBURVhUIH0sXG4gICAgeyBpbnB1dDogXCJtYm94XCIsIHRhZzogXCJtdGV4dFwiLCBvdXRwdXQ6IFwibWJveFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBURVhUIH0sXG4gICAgeyBpbnB1dDogXCJjb2xvclwiLCB0YWc6IFwibXN0eWxlXCIsIG91dHB1dDogXCJcIiwgdGV4OiBudWxsLCB0dHlwZTogQklOQVJZIH0sXG4gICAgeyBpbnB1dDogXCJpZFwiLCB0YWc6IFwibXJvd1wiLCBvdXRwdXQ6IFwiXCIsIHRleDogbnVsbCwgdHR5cGU6IEJJTkFSWSB9LFxuICAgIHsgaW5wdXQ6IFwiY2xhc3NcIiwgdGFnOiBcIm1yb3dcIiwgb3V0cHV0OiBcIlwiLCB0ZXg6IG51bGwsIHR0eXBlOiBCSU5BUlkgfSxcbiAgICB7IGlucHV0OiBcImNhbmNlbFwiLCB0YWc6IFwibWVuY2xvc2VcIiwgb3V0cHV0OiBcImNhbmNlbFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSB9LFxuXG4gICAgLy8gQU1xdW90ZSxcbiAgICB7IGlucHV0OiBcIlxcXCJcIiwgdGFnOiBcIm10ZXh0XCIsIG91dHB1dDogXCJtYm94XCIsIHRleDogbnVsbCwgdHR5cGU6IFRFWFQgfSxcblxuXG5cbiAgICB7IGlucHV0OiBcImJiXCIsIHRhZzogXCJtc3R5bGVcIiwgYXRuYW1lOiBcIm1hdGh2YXJpYW50XCIsIGF0dmFsOiBcImJvbGRcIiwgb3V0cHV0OiBcImJiXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZIH0sXG4gICAgeyBpbnB1dDogXCJtYXRoYmZcIiwgdGFnOiBcIm1zdHlsZVwiLCBhdG5hbWU6IFwibWF0aHZhcmlhbnRcIiwgYXR2YWw6IFwiYm9sZFwiLCBvdXRwdXQ6IFwibWF0aGJmXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZIH0sXG4gICAgeyBpbnB1dDogXCJzZlwiLCB0YWc6IFwibXN0eWxlXCIsIGF0bmFtZTogXCJtYXRodmFyaWFudFwiLCBhdHZhbDogXCJzYW5zLXNlcmlmXCIsIG91dHB1dDogXCJzZlwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSB9LFxuICAgIHsgaW5wdXQ6IFwibWF0aHNmXCIsIHRhZzogXCJtc3R5bGVcIiwgYXRuYW1lOiBcIm1hdGh2YXJpYW50XCIsIGF0dmFsOiBcInNhbnMtc2VyaWZcIiwgb3V0cHV0OiBcIm1hdGhzZlwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSB9LFxuICAgIHsgaW5wdXQ6IFwiYmJiXCIsIHRhZzogXCJtc3R5bGVcIiwgYXRuYW1lOiBcIm1hdGh2YXJpYW50XCIsIGF0dmFsOiBcImRvdWJsZS1zdHJ1Y2tcIiwgb3V0cHV0OiBcImJiYlwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgY29kZXM6IEFNYmJiIH0sXG4gICAgeyBpbnB1dDogXCJtYXRoYmJcIiwgdGFnOiBcIm1zdHlsZVwiLCBhdG5hbWU6IFwibWF0aHZhcmlhbnRcIiwgYXR2YWw6IFwiZG91YmxlLXN0cnVja1wiLCBvdXRwdXQ6IFwibWF0aGJiXCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZLCBjb2RlczogQU1iYmIgfSxcbiAgICB7IGlucHV0OiBcImNjXCIsIHRhZzogXCJtc3R5bGVcIiwgYXRuYW1lOiBcIm1hdGh2YXJpYW50XCIsIGF0dmFsOiBcInNjcmlwdFwiLCBvdXRwdXQ6IFwiY2NcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGNvZGVzOiBBTWNhbCB9LFxuICAgIHsgaW5wdXQ6IFwibWF0aGNhbFwiLCB0YWc6IFwibXN0eWxlXCIsIGF0bmFtZTogXCJtYXRodmFyaWFudFwiLCBhdHZhbDogXCJzY3JpcHRcIiwgb3V0cHV0OiBcIm1hdGhjYWxcIiwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGNvZGVzOiBBTWNhbCB9LFxuICAgIHsgaW5wdXQ6IFwidHRcIiwgdGFnOiBcIm1zdHlsZVwiLCBhdG5hbWU6IFwibWF0aHZhcmlhbnRcIiwgYXR2YWw6IFwibW9ub3NwYWNlXCIsIG91dHB1dDogXCJ0dFwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSB9LFxuICAgIHsgaW5wdXQ6IFwibWF0aHR0XCIsIHRhZzogXCJtc3R5bGVcIiwgYXRuYW1lOiBcIm1hdGh2YXJpYW50XCIsIGF0dmFsOiBcIm1vbm9zcGFjZVwiLCBvdXRwdXQ6IFwibWF0aHR0XCIsIHRleDogbnVsbCwgdHR5cGU6IFVOQVJZIH0sXG4gICAgeyBpbnB1dDogXCJmclwiLCB0YWc6IFwibXN0eWxlXCIsIGF0bmFtZTogXCJtYXRodmFyaWFudFwiLCBhdHZhbDogXCJmcmFrdHVyXCIsIG91dHB1dDogXCJmclwiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgY29kZXM6IEFNZnJrIH0sXG4gICAgeyBpbnB1dDogXCJtYXRoZnJha1wiLCB0YWc6IFwibXN0eWxlXCIsIGF0bmFtZTogXCJtYXRodmFyaWFudFwiLCBhdHZhbDogXCJmcmFrdHVyXCIsIG91dHB1dDogXCJtYXRoZnJha1wiLCB0ZXg6IG51bGwsIHR0eXBlOiBVTkFSWSwgY29kZXM6IEFNZnJrIH1cbl07XG5cblxuXG4vKiogY29udmVydCBhbiBBc2NpaU1hdGggc3RhdGVtZW50IHRvIE1hdGhNTCAqL1xuZXhwb3J0IGNsYXNzIEFzY2lpTWF0aCB7XG5cbiAgICBub01hdGhNTCA9IGZhbHNlXG4gICAgdHJhbnNsYXRlZCA9IGZhbHNlXG5cblxuICAgIEFNbmFtZXMgPSBbXTsgLy9saXN0IG9mIGlucHV0IHN5bWJvbHNcbiAgICBBTW1hdGhtbCA9IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTFwiO1xuXG4gICAgQU1uZXN0aW5nRGVwdGggPSAwXG4gICAgQU1wcmV2aW91c1N5bWJvbCA9IDBcbiAgICBBTWN1cnJlbnRTeW1ib2wgPSAwXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zZXRTdHlsZXNoZWV0KFwiI0FNTUxjbG9zZURpdiBcXHtmb250LXNpemU6MC44ZW0gcGFkZGluZy10b3A6MWVtIGNvbG9yOiMwMTRcXH1cXG4jQU1NTHdhcm5pbmdCb3ggXFx7cG9zaXRpb246YWJzb2x1dGUgd2lkdGg6MTAwJSB0b3A6MCBsZWZ0OjAgei1pbmRleDoyMDAgdGV4dC1hbGlnbjpjZW50ZXIgZm9udC1zaXplOjFlbSBmb250LXdlaWdodDpib2xkIHBhZGRpbmc6MC41ZW0gMCAwLjVlbSAwIGNvbG9yOiNmZmMgYmFja2dyb3VuZDojYzMwXFx9XCIpXG5cbiAgICAgICAgdGhpcy5pbml0U3ltYm9scygpXG4gICAgICAgIHRoaXMuaW5pdCgpXG4gICAgfVxuXG5cblxuICAgIC8vIEFkZCBhIHN0eWxlc2hlZXQsIHJlcGxhY2luZyBhbnkgcHJldmlvdXMgY3VzdG9tIHN0eWxlc2hlZXQgKGFkYXB0ZWQgZnJvbSBUVylcbiAgICBzZXRTdHlsZXNoZWV0KHM6IHN0cmluZykge1xuICAgICAgICB2YXIgaWQgPSBcIkFNTUxjdXN0b21TdHlsZVNoZWV0XCI7XG4gICAgICAgIHZhciBuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICAvLyBpZiAoZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCkgeyAgICAgLy8gdGJ0YlxuICAgICAgICAvLyAgICAgLy8gVGVzdCBmb3IgSUUncyBub24tc3RhbmRhcmQgY3JlYXRlU3R5bGVTaGVldCBtZXRob2RcbiAgICAgICAgLy8gICAgIGlmIChuKVxuICAgICAgICAvLyAgICAgICAgIG4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuKTtcbiAgICAgICAgLy8gICAgIC8vIFRoaXMgZmFpbGVkIHdpdGhvdXQgdGhlICZuYnNwO1xuICAgICAgICAvLyAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBcIiZuYnNwOzxzdHlsZSBpZD0nXCIgKyBpZCArIFwiJz5cIiArIHMgKyBcIjwvc3R5bGU+XCIpOyAgICAvLyB0YnRiIG5vdCAnYmVmb3JlRW5kJ1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICBuLnJlcGxhY2VDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKSwgbi5maXJzdENoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgICAgICAvLyBuLnR5cGUgPSBcInRleHQvY3NzXCI7ICAgLy90YnRiXG4gICAgICAgICAgICBuLmlkID0gaWQ7XG4gICAgICAgICAgICBuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHMpKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChuKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB9XG4gICAgfVxuXG5cbiAgICBpbml0KCkge1xuICAgICAgICB2YXIgbXNnLCB3YXJuaW5ncyA9IG5ldyBBcnJheSgpO1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgYWxlcnQoXCJUaGlzIHdlYnBhZ2UgcmVxdWlyZXMgYSByZWNlbnQgYnJvd3NlciBzdWNoIGFzIE1vemlsbGEgRmlyZWZveFwiKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGVja0Zvck1hdGhNTCAmJiAobXNnID0gdGhpcy5jaGVja01hdGhNTCgpKSkgd2FybmluZ3MucHVzaChtc2cpO1xuICAgICAgICBpZiAod2FybmluZ3MubGVuZ3RoID4gMCkgdGhpcy5kaXNwbGF5V2FybmluZ3Mod2FybmluZ3MpO1xuICAgICAgICBpZiAoIXRoaXMubm9NYXRoTUwpIHRoaXMuaW5pdFN5bWJvbHMoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY2hlY2tNYXRoTUwoKSB7XG4gICAgICAgIGlmIChuYXZpZ2F0b3IuYXBwTmFtZS5zbGljZSgwLCA4KSA9PSBcIk5ldHNjYXBlXCIpXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5zbGljZSgwLCAxKSA+PSBcIjVcIikgdGhpcy5ub01hdGhNTCA9IG51bGw7XG4gICAgICAgICAgICBlbHNlIHRoaXMubm9NYXRoTUwgPSB0cnVlO1xuICAgICAgICAvLyBlbHNlIGlmIChuYXZpZ2F0b3IuYXBwTmFtZS5zbGljZSgwLCA5KSA9PSBcIk1pY3Jvc29mdFwiKVxuICAgICAgICAvLyAgICAgdHJ5IHtcbiAgICAgICAgLy8gICAgICAgICB2YXIgQWN0aXZlWCA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWF0aFBsYXllci5GYWN0b3J5LjFcIik7XG4gICAgICAgIC8vICAgICAgICAgbm9NYXRoTUwgPSBudWxsO1xuICAgICAgICAvLyAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyAgICAgICAgIG5vTWF0aE1MID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmF2aWdhdG9yLmFwcE5hbWUuc2xpY2UoMCwgNSkgPT0gXCJPcGVyYVwiKVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICBpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uc2xpY2UoMCwgMykgPj0gXCI5LjVcIikgdGhpcy5ub01hdGhNTCA9IG51bGw7XG4gICAgICAgICAgICBlbHNlIHRoaXMubm9NYXRoTUwgPSB0cnVlO1xuXG4gICAgICAgIC8vbm9NYXRoTUwgPSB0cnVlOyAvL3VuY29tbWVudCB0byBjaGVja1xuICAgICAgICBpZiAodGhpcy5ub01hdGhNTCAmJiBub3RpZnlJZk5vTWF0aE1MKSB7XG4gICAgICAgICAgICB2YXIgbXNnID0gXCJUbyB2aWV3IHRoZSBBU0NJSU1hdGhNTCBub3RhdGlvbiB1c2UgSW50ZXJuZXQgRXhwbG9yZXIgKyBNYXRoUGxheWVyIG9yIE1vemlsbGEgRmlyZWZveCAyLjAgb3IgbGF0ZXIuXCI7XG4gICAgICAgICAgICBpZiAoYWxlcnRJZk5vTWF0aE1MKVxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZyk7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBtc2c7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlV2FybmluZygpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FNTUx3YXJuaW5nQm94JylcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGJvZHkucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5vbmNsaWNrID0gbnVsbDtcbiAgICB9XG5cbiAgICBkaXNwbGF5V2FybmluZ3Mod2FybmluZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIHZhciBpLCBmcmFnLCBuZCA9IHRoaXMuY3JlYXRlRWxlbWVudFhIVE1MKFwiZGl2XCIpO1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXTtcbiAgICAgICAgYm9keS5vbmNsaWNrID0gdGhpcy5oaWRlV2FybmluZztcbiAgICAgICAgbmQuaWQgPSAnQU1NTHdhcm5pbmdCb3gnO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgd2FybmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZyYWcgPSB0aGlzLmNyZWF0ZUVsZW1lbnRYSFRNTChcImRpdlwiKTtcbiAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUod2FybmluZ3NbaV0pKTtcbiAgICAgICAgICAgIGZyYWcuc3R5bGUucGFkZGluZ0JvdHRvbSA9IFwiMS4wZW1cIjtcbiAgICAgICAgICAgIG5kLmFwcGVuZENoaWxkKGZyYWcpO1xuICAgICAgICB9XG4gICAgICAgIG5kLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlRWxlbWVudFhIVE1MKFwicFwiKSk7XG4gICAgICAgIG5kLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRm9yIGluc3RydWN0aW9ucyBzZWUgdGhlIFwiKSk7XG4gICAgICAgIHZhciBhbiA9IHRoaXMuY3JlYXRlRWxlbWVudFhIVE1MKFwiYVwiKTtcbiAgICAgICAgYW4uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJBU0NJSU1hdGhNTFwiKSk7XG4gICAgICAgIGFuLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCJodHRwOi8vYXNjaWltYXRoLm9yZ1wiKTtcbiAgICAgICAgbmQuYXBwZW5kQ2hpbGQoYW4pO1xuICAgICAgICBuZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIiBob21lcGFnZVwiKSk7XG4gICAgICAgIGFuID0gdGhpcy5jcmVhdGVFbGVtZW50WEhUTUwoXCJkaXZcIik7XG4gICAgICAgIGFuLmlkID0gJ0FNTUxjbG9zZURpdic7XG4gICAgICAgIGFuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcoY2xpY2sgYW55d2hlcmUgdG8gY2xvc2UgdGhpcyB3YXJuaW5nKScpKTtcbiAgICAgICAgbmQuYXBwZW5kQ2hpbGQoYW4pO1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXTtcbiAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUobmQsIGJvZHkuY2hpbGROb2Rlc1swXSk7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlKHNwYW5jbGFzc0FNOiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyYW5zbGF0ZWQpIHsgLy8gcnVuIHRoaXMgb25seSBvbmNlXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc04gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChBTWRvY3VtZW50SWQpO1xuICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZUFTQ0lJTWF0aCkgdGhpcy5BTXByb2Nlc3NOb2RlKChwcm9jZXNzTiAhPSBudWxsID8gcHJvY2Vzc04gOiBib2R5KSwgZmFsc2UsIHNwYW5jbGFzc0FNKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUVsZW1lbnRYSFRNTCh0OiBUYWcpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiwgdCk7XG4gICAgfVxuXG5cbiAgICBBTWNyZWF0ZUVsZW1lbnRNYXRoTUwodDogVGFnKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlModGhpcy5BTW1hdGhtbCwgdCk7XG4gICAgfVxuXG4gICAgY3JlYXRlTW1sTm9kZSh0OiBzdHJpbmcsIGZyYWc/OiBhbnkpOiBhbnkgeyAgICAgICAgLy8gdG9vIG1hbnkgdGhpbmdzIGluIGZyYWcgdG8gdHlwZSBwcm9wZXJseVxuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh0aGlzLkFNbWF0aG1sLCB0KSBhcyBIVE1MRWxlbWVudFxuICAgICAgICBpZiAoZnJhZykgbm9kZS5hcHBlbmRDaGlsZChmcmFnKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgbmV3Y29tbWFuZChvbGRzdHI6IHN0cmluZywgbmV3c3RyOiBzdHJpbmcpIHtcbiAgICAgICAgQU1zeW1ib2xzLnB1c2goeyBpbnB1dDogb2xkc3RyLCB0YWc6IFwibW9cIiwgb3V0cHV0OiBuZXdzdHIsIHRleDogbnVsbCwgdHR5cGU6IERFRklOSVRJT04gfSk7XG4gICAgICAgIHRoaXMucmVmcmVzaFN5bWJvbHMoKTtcbiAgICB9XG5cbiAgICBuZXdzeW1ib2woc3ltYm9sb2JqOiBhbnkpIHtcbiAgICAgICAgQU1zeW1ib2xzLnB1c2goc3ltYm9sb2JqKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3ltYm9scygpO1xuICAgIH1cblxuXG4gICAgY29tcGFyZU5hbWVzKHMxOiBBTVN5bWJvbCwgczI6IEFNU3ltYm9sKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHMxLmlucHV0ID4gczIuaW5wdXQpIHJldHVybiAxXG4gICAgICAgIGVsc2UgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGluaXRTeW1ib2xzKCkge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIHN5bWxlbiA9IEFNc3ltYm9scy5sZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzeW1sZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKEFNc3ltYm9sc1tpXS50ZXgpIHtcbiAgICAgICAgICAgICAgICBBTXN5bWJvbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICBpbnB1dDogQU1zeW1ib2xzW2ldLnRleCxcbiAgICAgICAgICAgICAgICAgICAgdGV4OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB0YWc6IEFNc3ltYm9sc1tpXS50YWcsIG91dHB1dDogQU1zeW1ib2xzW2ldLm91dHB1dCwgdHR5cGU6IEFNc3ltYm9sc1tpXS50dHlwZSxcbiAgICAgICAgICAgICAgICAgICAgYWNjOiAoQU1zeW1ib2xzW2ldLmFjYyB8fCBmYWxzZSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZnJlc2hTeW1ib2xzKCk7XG4gICAgfVxuXG4gICAgcmVmcmVzaFN5bWJvbHMoKSB7XG4gICAgICAgIEFNc3ltYm9scy5zb3J0KHRoaXMuY29tcGFyZU5hbWVzKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQU1zeW1ib2xzLmxlbmd0aDsgaSsrKSB0aGlzLkFNbmFtZXNbaV0gPSBBTXN5bWJvbHNbaV0uaW5wdXQ7XG4gICAgfVxuXG4gICAgZGVmaW5lKG9sZHN0cjogc3RyaW5nLCBuZXdzdHI6IHN0cmluZykge1xuICAgICAgICBBTXN5bWJvbHMucHVzaCh7IGlucHV0OiBvbGRzdHIsIHRhZzogXCJtb1wiLCBvdXRwdXQ6IG5ld3N0ciwgdGV4OiBudWxsLCB0dHlwZTogREVGSU5JVElPTiB9KTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3ltYm9scygpOyAvLyB0aGlzIG1heSBiZSBhIHByb2JsZW0gaWYgbWFueSBzeW1ib2xzIGFyZSBkZWZpbmVkIVxuICAgIH1cblxuICAgIEFNcmVtb3ZlQ2hhcnNBbmRCbGFua3Moc3RyOiBzdHJpbmcsIG46IG51bWJlcikge1xuICAgICAgICAvL3JlbW92ZSBuIGNoYXJhY3RlcnMgYW5kIGFueSBmb2xsb3dpbmcgYmxhbmtzXG4gICAgICAgIHZhciBzdDtcbiAgICAgICAgaWYgKHN0ci5jaGFyQXQobikgPT0gXCJcXFxcXCIgJiYgc3RyLmNoYXJBdChuICsgMSkgIT0gXCJcXFxcXCIgJiYgc3RyLmNoYXJBdChuICsgMSkgIT0gXCIgXCIpXG4gICAgICAgICAgICBzdCA9IHN0ci5zbGljZShuICsgMSk7XG4gICAgICAgIGVsc2Ugc3QgPSBzdHIuc2xpY2Uobik7XG4gICAgICAgIHZhciBpICAgICAgIC8vIHRidGIgbXVzdCBOT1QgYmUgZGVmaW5lZCBpbiB0aGUgZm9yIGxvb3AsIGdvZXMgb3V0IG9mIHNjb3BlXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzdC5sZW5ndGggJiYgc3QuY2hhckNvZGVBdChpKSA8PSAzMjsgaSA9IGkgKyAxKSB7IH1cbiAgICAgICAgcmV0dXJuIHN0LnNsaWNlKGkpOyAgIC8vIHRidGIgID8/IHRoaXMgaXNuJ3QgdmFsaWQgVFMsIG5vdCBzdXJlIHdoYXQgaXQgbWVhbnMgaW4gSlNcbiAgICB9XG5cbiAgICBwb3NpdGlvbihhcnI6IHN0cmluZywgc3RyOiBzdHJpbmcsIG46IG51bWJlcikge1xuICAgICAgICAvLyByZXR1cm4gcG9zaXRpb24gPj1uIHdoZXJlIHN0ciBhcHBlYXJzIG9yIHdvdWxkIGJlIGluc2VydGVkXG4gICAgICAgIC8vIGFzc3VtZXMgYXJyIGlzIHNvcnRlZFxuICAgICAgICBpZiAobiA9PSAwKSB7XG4gICAgICAgICAgICB2YXIgaCwgbTtcbiAgICAgICAgICAgIG4gPSAtMTtcbiAgICAgICAgICAgIGggPSBhcnIubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKG4gKyAxIDwgaCkge1xuICAgICAgICAgICAgICAgIG0gPSAobiArIGgpID4+IDE7XG4gICAgICAgICAgICAgICAgaWYgKGFyclttXSA8IHN0cikgbiA9IG07IGVsc2UgaCA9IG07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaDtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gbjsgaSA8IGFyci5sZW5ndGggJiYgYXJyW2ldIDwgc3RyOyBpKyspO1xuICAgICAgICByZXR1cm4gaTsgLy8gaT1hcnIubGVuZ3RoIHx8IGFycltpXT49c3RyXG4gICAgfVxuXG4gICAgQU1nZXRTeW1ib2woc3RyOiBzdHJpbmcpOiBBTVN5bWJvbCB7XG4gICAgICAgIC8vcmV0dXJuIG1heGltYWwgaW5pdGlhbCBzdWJzdHJpbmcgb2Ygc3RyIHRoYXQgYXBwZWFycyBpbiBuYW1lc1xuICAgICAgICAvL3JldHVybiBudWxsIGlmIHRoZXJlIGlzIG5vbmVcbiAgICAgICAgdmFyIGsgPSAwOyAvL25ldyBwb3NcbiAgICAgICAgdmFyIGogPSAwOyAvL29sZCBwb3NcbiAgICAgICAgdmFyIG1rOyAvL21hdGNoIHBvc1xuICAgICAgICB2YXIgc3Q7XG4gICAgICAgIHZhciB0YWdzdDtcbiAgICAgICAgdmFyIG1hdGNoID0gXCJcIjtcbiAgICAgICAgdmFyIG1vcmUgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBzdHIubGVuZ3RoICYmIG1vcmU7IGkrKykge1xuICAgICAgICAgICAgc3QgPSBzdHIuc2xpY2UoMCwgaSk7IC8vaW5pdGlhbCBzdWJzdHJpbmcgb2YgbGVuZ3RoIGlcbiAgICAgICAgICAgIGogPSBrO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICBrID0gdGhpcy5wb3NpdGlvbih0aGlzLkFNbmFtZXMsIHN0LCBqKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgaWYgKGsgPCB0aGlzLkFNbmFtZXMubGVuZ3RoICYmIHN0ci5zbGljZSgwLCB0aGlzLkFNbmFtZXNba10ubGVuZ3RoKSA9PSB0aGlzLkFNbmFtZXNba10pIHtcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRoaXMuQU1uYW1lc1trXTtcbiAgICAgICAgICAgICAgICBtayA9IGs7XG4gICAgICAgICAgICAgICAgaSA9IG1hdGNoLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgbW9yZSA9IGsgPCB0aGlzLkFNbmFtZXMubGVuZ3RoICYmIHN0ci5zbGljZSgwLCB0aGlzLkFNbmFtZXNba10ubGVuZ3RoKSA+PSB0aGlzLkFNbmFtZXNba107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5BTXByZXZpb3VzU3ltYm9sID0gdGhpcy5BTWN1cnJlbnRTeW1ib2w7XG4gICAgICAgIGlmIChtYXRjaCAhPSBcIlwiKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgIHRoaXMuQU1jdXJyZW50U3ltYm9sID0gQU1zeW1ib2xzW21rXS50dHlwZTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgcmV0dXJuIEFNc3ltYm9sc1tta107XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgc3RyWzBdIGlzIGEgZGlnaXQgb3IgLSByZXR1cm4gbWF4c3Vic3RyaW5nIG9mIGRpZ2l0cy5kaWdpdHNcbiAgICAgICAgdGhpcy5BTWN1cnJlbnRTeW1ib2wgPSBDT05TVDtcbiAgICAgICAgayA9IDE7XG4gICAgICAgIHN0ID0gc3RyLnNsaWNlKDAsIDEpO1xuICAgICAgICB2YXIgaW50ZWcgPSB0cnVlO1xuICAgICAgICB3aGlsZSAoXCIwXCIgPD0gc3QgJiYgc3QgPD0gXCI5XCIgJiYgayA8PSBzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICBzdCA9IHN0ci5zbGljZShrLCBrICsgMSk7XG4gICAgICAgICAgICBrKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0ID09IGRlY2ltYWxzaWduKSB7XG4gICAgICAgICAgICBzdCA9IHN0ci5zbGljZShrLCBrICsgMSk7XG4gICAgICAgICAgICBpZiAoXCIwXCIgPD0gc3QgJiYgc3QgPD0gXCI5XCIpIHtcbiAgICAgICAgICAgICAgICBpbnRlZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGsrKztcbiAgICAgICAgICAgICAgICB3aGlsZSAoXCIwXCIgPD0gc3QgJiYgc3QgPD0gXCI5XCIgJiYgayA8PSBzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ID0gc3RyLnNsaWNlKGssIGsgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgaysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoKGludGVnICYmIGsgPiAxKSB8fCBrID4gMikge1xuICAgICAgICAgICAgc3QgPSBzdHIuc2xpY2UoMCwgayAtIDEpO1xuICAgICAgICAgICAgdGFnc3QgPSBcIm1uXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrID0gMjtcbiAgICAgICAgICAgIHN0ID0gc3RyLnNsaWNlKDAsIDEpOyAvL3Rha2UgMSBjaGFyYWN0ZXJcbiAgICAgICAgICAgIHRhZ3N0ID0gKChcIkFcIiA+IHN0IHx8IHN0ID4gXCJaXCIpICYmIChcImFcIiA+IHN0IHx8IHN0ID4gXCJ6XCIpID8gXCJtb1wiIDogXCJtaVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3QgPT0gXCItXCIgJiYgc3RyLmNoYXJBdCgxKSAhPT0gJyAnICYmIHRoaXMuQU1wcmV2aW91c1N5bWJvbCA9PSBJTkZJWCkge1xuICAgICAgICAgICAgdGhpcy5BTWN1cnJlbnRTeW1ib2wgPSBJTkZJWDsgIC8vdHJpY2sgXCIvXCIgaW50byByZWNvZ25pemluZyBcIi1cIiBvbiBzZWNvbmQgcGFyc2VcbiAgICAgICAgICAgIHJldHVybiB7IGlucHV0OiBzdCwgdGFnOiB0YWdzdCwgb3V0cHV0OiBzdCwgdGV4OiBudWxsLCB0dHlwZTogVU5BUlksIGZ1bmM6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBpbnB1dDogc3QsIHRhZzogdGFnc3QsIG91dHB1dDogc3QsIHRleDogbnVsbCwgdHR5cGU6IENPTlNUIH07XG4gICAgfVxuXG4gICAgQU1yZW1vdmVCcmFja2V0cyhub2RlOiBhbnkpIHtcbiAgICAgICAgbGV0IHN0OiBzdHJpbmcgPSAnJ1xuICAgICAgICBpZiAoIW5vZGUuaGFzQ2hpbGROb2RlcygpKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAobm9kZS5maXJzdENoaWxkLmhhc0NoaWxkTm9kZXMoKSAmJiAobm9kZS5ub2RlTmFtZSA9PSBcIm1yb3dcIiB8fCBub2RlLm5vZGVOYW1lID09IFwiTTpNUk9XXCIpKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5maXJzdENoaWxkLm5leHRTaWJsaW5nICYmIG5vZGUuZmlyc3RDaGlsZC5uZXh0U2libGluZy5ub2RlTmFtZSA9PSBcIm10YWJsZVwiKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgc3QgPSBub2RlLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5ub2RlVmFsdWU7XG4gICAgICAgICAgICBpZiAoc3QgPT0gXCIoXCIgfHwgc3QgPT0gXCJbXCIgfHwgc3QgPT0gXCJ7XCIpIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5sYXN0Q2hpbGQuaGFzQ2hpbGROb2RlcygpICYmIChub2RlLm5vZGVOYW1lID09IFwibXJvd1wiIHx8IG5vZGUubm9kZU5hbWUgPT0gXCJNOk1ST1dcIikpIHtcbiAgICAgICAgICAgIHN0ID0gbm9kZS5sYXN0Q2hpbGQuZmlyc3RDaGlsZC5ub2RlVmFsdWU7XG4gICAgICAgICAgICBpZiAoc3QgPT0gXCIpXCIgfHwgc3QgPT0gXCJdXCIgfHwgc3QgPT0gXCJ9XCIpIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5sYXN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypQYXJzaW5nIEFTQ0lJIG1hdGggZXhwcmVzc2lvbnMgd2l0aCB0aGUgZm9sbG93aW5nIGdyYW1tYXJcbiAgICB2IDo6PSBbQS1aYS16XSB8IGdyZWVrIGxldHRlcnMgfCBudW1iZXJzIHwgb3RoZXIgY29uc3RhbnQgc3ltYm9sc1xuICAgIHUgOjo9IHNxcnQgfCB0ZXh0IHwgYmIgfCBvdGhlciB1bmFyeSBzeW1ib2xzIGZvciBmb250IGNvbW1hbmRzXG4gICAgYiA6Oj0gZnJhYyB8IHJvb3QgfCBzdGFja3JlbCAgICAgICAgIGJpbmFyeSBzeW1ib2xzXG4gICAgbCA6Oj0gKCB8IFsgfCB7IHwgKDogfCB7OiAgICAgICAgICAgIGxlZnQgYnJhY2tldHNcbiAgICByIDo6PSApIHwgXSB8IH0gfCA6KSB8IDp9ICAgICAgICAgICAgcmlnaHQgYnJhY2tldHNcbiAgICBTIDo6PSB2IHwgbEVyIHwgdVMgfCBiU1MgICAgICAgICAgICAgU2ltcGxlIGV4cHJlc3Npb25cbiAgICBJIDo6PSBTX1MgfCBTXlMgfCBTX1NeUyB8IFMgICAgICAgICAgSW50ZXJtZWRpYXRlIGV4cHJlc3Npb25cbiAgICBFIDo6PSBJRSB8IEkvSSAgICAgICAgICAgICAgICAgICAgICAgRXhwcmVzc2lvblxuICAgIEVhY2ggdGVybWluYWwgc3ltYm9sIGlzIHRyYW5zbGF0ZWQgaW50byBhIGNvcnJlc3BvbmRpbmcgbWF0aG1sIG5vZGUuKi9cblxuICAgIEFNcGFyc2VTZXhwcihzdHI6IHN0cmluZyk6IFtOb2RlLCBzdHJpbmddIHsgLy9wYXJzZXMgc3RyIGFuZCByZXR1cm5zIFtub2RlLHRhaWxzdHJdXG4gICAgICAgIHZhciBzeW1ib2wsIG5vZGUsIHJlc3VsdCwgaSwgc3QsLy8gcmlnaHR2ZXJ0ID0gZmFsc2UsXG4gICAgICAgICAgICBuZXdGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBzdHIgPSB0aGlzLkFNcmVtb3ZlQ2hhcnNBbmRCbGFua3Moc3RyLCAwKTtcbiAgICAgICAgc3ltYm9sID0gdGhpcy5BTWdldFN5bWJvbChzdHIpOyAgICAgICAgICAgICAvL2VpdGhlciBhIHRva2VuIG9yIGEgYnJhY2tldCBvciBlbXB0eVxuICAgICAgICBpZiAoc3ltYm9sID09IG51bGwgfHwgc3ltYm9sLnR0eXBlID09IFJJR0hUQlJBQ0tFVCAmJiB0aGlzLkFNbmVzdGluZ0RlcHRoID4gMCkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICByZXR1cm4gW251bGwsIHN0cl07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN5bWJvbC50dHlwZSA9PSBERUZJTklUSU9OKSB7XG4gICAgICAgICAgICBzdHIgPSBzeW1ib2wub3V0cHV0ICsgdGhpcy5BTXJlbW92ZUNoYXJzQW5kQmxhbmtzKHN0ciwgc3ltYm9sLmlucHV0Lmxlbmd0aCk7XG4gICAgICAgICAgICBzeW1ib2wgPSB0aGlzLkFNZ2V0U3ltYm9sKHN0cik7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChzeW1ib2wudHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVU5ERVJPVkVSOlxuICAgICAgICAgICAgY2FzZSBDT05TVDpcbiAgICAgICAgICAgICAgICBzdHIgPSB0aGlzLkFNcmVtb3ZlQ2hhcnNBbmRCbGFua3Moc3RyLCBzeW1ib2wuaW5wdXQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3RoaXMuY3JlYXRlTW1sTm9kZShzeW1ib2wudGFnLCAgICAgICAgLy9pdHMgYSBjb25zdGFudFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzeW1ib2wub3V0cHV0KSksIHN0cl07XG4gICAgICAgICAgICBjYXNlIExFRlRCUkFDS0VUOiAgIC8vcmVhZCAoZXhwcispXG4gICAgICAgICAgICAgICAgdGhpcy5BTW5lc3RpbmdEZXB0aCsrO1xuICAgICAgICAgICAgICAgIHN0ciA9IHRoaXMuQU1yZW1vdmVDaGFyc0FuZEJsYW5rcyhzdHIsIHN5bWJvbC5pbnB1dC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuQU1wYXJzZUV4cHIoc3RyLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLkFNbmVzdGluZ0RlcHRoLS07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzeW1ib2wuaW52aXNpYmxlID09IFwiYm9vbGVhblwiICYmIHN5bWJvbC5pbnZpc2libGUpXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtcm93XCIsIHJlc3VsdFswXSk7XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtb1wiLCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzeW1ib2wub3V0cHV0KSk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtcm93XCIsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHJlc3VsdFswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgIHJldHVybiBbbm9kZSwgcmVzdWx0WzFdXTtcbiAgICAgICAgICAgIGNhc2UgVEVYVDpcbiAgICAgICAgICAgICAgICBpZiAoc3ltYm9sICE9IEFNcXVvdGUpIHN0ciA9IHRoaXMuQU1yZW1vdmVDaGFyc0FuZEJsYW5rcyhzdHIsIHN5bWJvbC5pbnB1dC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGlmIChzdHIuY2hhckF0KDApID09IFwie1wiKSBpID0gc3RyLmluZGV4T2YoXCJ9XCIpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0ci5jaGFyQXQoMCkgPT0gXCIoXCIpIGkgPSBzdHIuaW5kZXhPZihcIilcIik7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RyLmNoYXJBdCgwKSA9PSBcIltcIikgaSA9IHN0ci5pbmRleE9mKFwiXVwiKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzeW1ib2wgPT0gQU1xdW90ZSkgaSA9IHN0ci5zbGljZSgxKS5pbmRleE9mKFwiXFxcIlwiKSArIDE7XG4gICAgICAgICAgICAgICAgZWxzZSBpID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAtMSkgaSA9IHN0ci5sZW5ndGg7XG4gICAgICAgICAgICAgICAgc3QgPSBzdHIuc2xpY2UoMSwgaSk7XG4gICAgICAgICAgICAgICAgaWYgKHN0LmNoYXJBdCgwKSA9PSBcIiBcIikge1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVNbWxOb2RlKFwibXNwYWNlXCIpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiMWV4XCIpO1xuICAgICAgICAgICAgICAgICAgICBuZXdGcmFnLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdGcmFnLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1tbE5vZGUoc3ltYm9sLnRhZywgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3QpKSk7XG4gICAgICAgICAgICAgICAgaWYgKHN0LmNoYXJBdChzdC5sZW5ndGggLSAxKSA9PSBcIiBcIikge1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVNbWxOb2RlKFwibXNwYWNlXCIpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiMWV4XCIpO1xuICAgICAgICAgICAgICAgICAgICBuZXdGcmFnLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHIgPSB0aGlzLkFNcmVtb3ZlQ2hhcnNBbmRCbGFua3Moc3RyLCBpICsgMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFt0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtcm93XCIsIG5ld0ZyYWcpLCBzdHJdO1xuICAgICAgICAgICAgY2FzZSBVTkFSWVVOREVST1ZFUjpcbiAgICAgICAgICAgIGNhc2UgVU5BUlk6XG4gICAgICAgICAgICAgICAgc3RyID0gdGhpcy5BTXJlbW92ZUNoYXJzQW5kQmxhbmtzKHN0ciwgc3ltYm9sLmlucHV0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5BTXBhcnNlU2V4cHIoc3RyKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbMF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3ltYm9sLnRhZyA9PSBcIm1pXCIgfHwgc3ltYm9sLnRhZyA9PSBcIm1vXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbdGhpcy5jcmVhdGVNbWxOb2RlKHN5bWJvbC50YWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3ltYm9sLm91dHB1dCkpLCBzdHJdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzBdID0gdGhpcy5jcmVhdGVNbWxOb2RlKFwibWlcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzeW1ib2wuZnVuYyA9PSBcImJvb2xlYW5cIiAmJiBzeW1ib2wuZnVuYykgeyAvLyBmdW5jdGlvbnMgaGFja1xuICAgICAgICAgICAgICAgICAgICBzdCA9IHN0ci5jaGFyQXQoMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdCA9PSBcIl5cIiB8fCBzdCA9PSBcIl9cIiB8fCBzdCA9PSBcIi9cIiB8fCBzdCA9PSBcInxcIiB8fCBzdCA9PSBcIixcIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKHN5bWJvbC5pbnB1dC5sZW5ndGggPT0gMSAmJiBzeW1ib2wuaW5wdXQubWF0Y2goL1xcdy8pICYmIHN0ICE9IFwiKFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFt0aGlzLmNyZWF0ZU1tbE5vZGUoc3ltYm9sLnRhZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzeW1ib2wub3V0cHV0KSksIHN0cl07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVNbWxOb2RlKFwibXJvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW1sTm9kZShzeW1ib2wudGFnLCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzeW1ib2wub3V0cHV0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChyZXN1bHRbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtub2RlLCByZXN1bHRbMV1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuQU1yZW1vdmVCcmFja2V0cyhyZXN1bHRbMF0pO1xuICAgICAgICAgICAgICAgIGlmIChzeW1ib2wuaW5wdXQgPT0gXCJzcXJ0XCIpIHsgICAgICAgICAgIC8vIHNxcnRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFt0aGlzLmNyZWF0ZU1tbE5vZGUoc3ltYm9sLnRhZywgcmVzdWx0WzBdKSwgcmVzdWx0WzFdXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzeW1ib2wucmV3cml0ZWxlZnRyaWdodCAhPSBcInVuZGVmaW5lZFwiKSB7ICAgIC8vIGFicywgZmxvb3IsIGNlaWxcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlTW1sTm9kZShcIm1yb3dcIiwgdGhpcy5jcmVhdGVNbWxOb2RlKFwibW9cIiwgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3ltYm9sLnJld3JpdGVsZWZ0cmlnaHRbMF0pKSk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQocmVzdWx0WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtb1wiLCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzeW1ib2wucmV3cml0ZWxlZnRyaWdodFsxXSkpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtub2RlLCByZXN1bHRbMV1dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ltYm9sLmlucHV0ID09IFwiY2FuY2VsXCIpIHsgICAvLyBjYW5jZWxcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlTW1sTm9kZShzeW1ib2wudGFnLCByZXN1bHRbMF0pO1xuICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcIm5vdGF0aW9uXCIsIFwidXBkaWFnb25hbHN0cmlrZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtub2RlLCByZXN1bHRbMV1dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHN5bWJvbC5hY2MgPT0gXCJib29sZWFuXCIgJiYgc3ltYm9sLmFjYykgeyAgIC8vIGFjY2VudFxuICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVNbWxOb2RlKHN5bWJvbC50YWcsIHJlc3VsdFswXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY2Nub2RlID0gdGhpcy5jcmVhdGVNbWxOb2RlKFwibW9cIiwgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3ltYm9sLm91dHB1dCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3ltYm9sLmlucHV0ID09IFwidmVjXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdFswXS5ub2RlTmFtZSA9PSBcIm1yb3dcIiAmJiByZXN1bHRbMF0uY2hpbGROb2Rlcy5sZW5ndGggPT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHJlc3VsdFswXS5maXJzdENoaWxkLmZpcnN0Q2hpbGQubm9kZVZhbHVlICE9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgcmVzdWx0WzBdLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5ub2RlVmFsdWUubGVuZ3RoID09IDEpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXN1bHRbMF0uZmlyc3RDaGlsZC5ub2RlVmFsdWUgIT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiByZXN1bHRbMF0uZmlyc3RDaGlsZC5ub2RlVmFsdWUubGVuZ3RoID09IDEpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNjbm9kZS5zZXRBdHRyaWJ1dGUoXCJzdHJldGNoeVwiLCBmYWxzZSk7ICAgLy90YnRiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChhY2Nub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtub2RlLCByZXN1bHRbMV1dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9udCBjaGFuZ2UgY29tbWFuZFxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN5bWJvbC5jb2RlcyAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmVzdWx0WzBdLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFswXS5jaGlsZE5vZGVzW2ldLm5vZGVOYW1lID09IFwibWlcIiB8fCByZXN1bHRbMF0ubm9kZU5hbWUgPT0gXCJtaVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdCA9IChyZXN1bHRbMF0ubm9kZU5hbWUgPT0gXCJtaVwiID8gcmVzdWx0WzBdLmZpcnN0Q2hpbGQubm9kZVZhbHVlIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzBdLmNoaWxkTm9kZXNbaV0uZmlyc3RDaGlsZC5ub2RlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3c3QgPSAnJzsgICAvLyB0YnRiIHNob3VsZCBiZSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3QubGVuZ3RoOyBqKyspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdC5jaGFyQ29kZUF0KGopID4gNjQgJiYgc3QuY2hhckNvZGVBdChqKSA8IDkxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0ID0gbmV3c3QgKyBzeW1ib2wuY29kZXNbc3QuY2hhckNvZGVBdChqKSAtIDY1XTsgICAvLyB0YnRiIG5ld3N0IGNvZXJjZWQgdG8gc3RyaW5nIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc3QuY2hhckNvZGVBdChqKSA+IDk2ICYmIHN0LmNoYXJDb2RlQXQoaikgPCAxMjMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3QgPSBuZXdzdCArIHN5bWJvbC5jb2Rlc1tzdC5jaGFyQ29kZUF0KGopIC0gNzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIG5ld3N0ID0gbmV3c3QgKyBzdC5jaGFyQXQoaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbMF0ubm9kZU5hbWUgPT0gXCJtaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzBdID0gdGhpcy5jcmVhdGVNbWxOb2RlKFwibW9cIikuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobmV3c3QpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXN1bHRbMF0ucmVwbGFjZUNoaWxkKHRoaXMuY3JlYXRlTW1sTm9kZShcIm1vXCIpLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobmV3c3QpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFswXS5jaGlsZE5vZGVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlTW1sTm9kZShzeW1ib2wudGFnLCByZXN1bHRbMF0pO1xuICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShzeW1ib2wuYXRuYW1lLCBzeW1ib2wuYXR2YWwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW25vZGUsIHJlc3VsdFsxXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBCSU5BUlk6XG4gICAgICAgICAgICAgICAgc3RyID0gdGhpcy5BTXJlbW92ZUNoYXJzQW5kQmxhbmtzKHN0ciwgc3ltYm9sLmlucHV0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5BTXBhcnNlU2V4cHIoc3RyKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0WzBdID09IG51bGwpIHJldHVybiBbdGhpcy5jcmVhdGVNbWxOb2RlKFwibW9cIixcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3ltYm9sLmlucHV0KSksIHN0cl07XG4gICAgICAgICAgICAgICAgdGhpcy5BTXJlbW92ZUJyYWNrZXRzKHJlc3VsdFswXSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdDIgPSB0aGlzLkFNcGFyc2VTZXhwcihyZXN1bHRbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQyWzBdID09IG51bGwpIHJldHVybiBbdGhpcy5jcmVhdGVNbWxOb2RlKFwibW9cIixcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3ltYm9sLmlucHV0KSksIHN0cl07XG4gICAgICAgICAgICAgICAgdGhpcy5BTXJlbW92ZUJyYWNrZXRzKHJlc3VsdDJbMF0pO1xuICAgICAgICAgICAgICAgIGlmIChbJ2NvbG9yJywgJ2NsYXNzJywgJ2lkJ10uaW5kZXhPZihzeW1ib2wuaW5wdXQpID49IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIHNlY29uZCBhcmd1bWVudFxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyLmNoYXJBdCgwKSA9PSBcIntcIikgaSA9IHN0ci5pbmRleE9mKFwifVwiKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RyLmNoYXJBdCgwKSA9PSBcIihcIikgaSA9IHN0ci5pbmRleE9mKFwiKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RyLmNoYXJBdCgwKSA9PSBcIltcIikgaSA9IHN0ci5pbmRleE9mKFwiXVwiKTtcbiAgICAgICAgICAgICAgICAgICAgc3QgPSBzdHIuc2xpY2UoMSwgaSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBhIG1hdGhtbCBub2RlXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZU1tbE5vZGUoc3ltYm9sLnRhZywgcmVzdWx0MlswXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBjb3JyZWN0IGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ltYm9sLmlucHV0ID09PSBcImNvbG9yXCIpIG5vZGUuc2V0QXR0cmlidXRlKFwibWF0aGNvbG9yXCIsIHN0KVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzeW1ib2wuaW5wdXQgPT09IFwiY2xhc3NcIikgbm9kZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBzdClcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc3ltYm9sLmlucHV0ID09PSBcImlkXCIpIG5vZGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgc3QpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbbm9kZSwgcmVzdWx0MlsxXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzeW1ib2wuaW5wdXQgPT0gXCJyb290XCIgfHwgc3ltYm9sLm91dHB1dCA9PSBcInN0YWNrcmVsXCIpXG4gICAgICAgICAgICAgICAgICAgIG5ld0ZyYWcuYXBwZW5kQ2hpbGQocmVzdWx0MlswXSk7XG4gICAgICAgICAgICAgICAgbmV3RnJhZy5hcHBlbmRDaGlsZChyZXN1bHRbMF0pO1xuICAgICAgICAgICAgICAgIGlmIChzeW1ib2wuaW5wdXQgPT0gXCJmcmFjXCIpIG5ld0ZyYWcuYXBwZW5kQ2hpbGQocmVzdWx0MlswXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFt0aGlzLmNyZWF0ZU1tbE5vZGUoc3ltYm9sLnRhZywgbmV3RnJhZyksIHJlc3VsdDJbMV1dO1xuICAgICAgICAgICAgY2FzZSBJTkZJWDpcbiAgICAgICAgICAgICAgICBzdHIgPSB0aGlzLkFNcmVtb3ZlQ2hhcnNBbmRCbGFua3Moc3RyLCBzeW1ib2wuaW5wdXQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3RoaXMuY3JlYXRlTW1sTm9kZShcIm1vXCIsIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN5bWJvbC5vdXRwdXQpKSwgc3RyXTtcbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICAgICAgc3RyID0gdGhpcy5BTXJlbW92ZUNoYXJzQW5kQmxhbmtzKHN0ciwgc3ltYm9sLmlucHV0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlTW1sTm9kZShcIm1zcGFjZVwiKTtcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiMWV4XCIpO1xuICAgICAgICAgICAgICAgIG5ld0ZyYWcuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICAgICAgbmV3RnJhZy5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNbWxOb2RlKHN5bWJvbC50YWcsIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN5bWJvbC5vdXRwdXQpKSk7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlTW1sTm9kZShcIm1zcGFjZVwiKTtcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiMWV4XCIpO1xuICAgICAgICAgICAgICAgIG5ld0ZyYWcuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFt0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtcm93XCIsIG5ld0ZyYWcpLCBzdHJdO1xuICAgICAgICAgICAgY2FzZSBMRUZUUklHSFQ6XG4gICAgICAgICAgICAgICAgLy8gICAgaWYgKHJpZ2h0dmVydCkgcmV0dXJuIFtudWxsLHN0cl07IGVsc2UgcmlnaHR2ZXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLkFNbmVzdGluZ0RlcHRoKys7XG4gICAgICAgICAgICAgICAgc3RyID0gdGhpcy5BTXJlbW92ZUNoYXJzQW5kQmxhbmtzKHN0ciwgc3ltYm9sLmlucHV0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5BTXBhcnNlRXhwcihzdHIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLkFNbmVzdGluZ0RlcHRoLS07XG4gICAgICAgICAgICAgICAgc3QgPSBcIlwiO1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbMF0ubGFzdENoaWxkICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICBzdCA9IHJlc3VsdFswXS5sYXN0Q2hpbGQuZmlyc3RDaGlsZC5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHN0ID09IFwifFwiICYmIHN0ci5jaGFyQXQoMCkgIT09IFwiLFwiKSB7IC8vIGl0cyBhbiBhYnNvbHV0ZSB2YWx1ZSBzdWJ0ZXJtXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtb1wiLCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzeW1ib2wub3V0cHV0KSk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtcm93XCIsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHJlc3VsdFswXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW25vZGUsIHJlc3VsdFsxXV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gdGhlIFwifFwiIGlzIGEgXFxtaWQgc28gdXNlIHVuaWNvZGUgMjIyMyAoZGl2aWRlcykgZm9yIHNwYWNpbmdcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlTW1sTm9kZShcIm1vXCIsIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXFx1MjIyM1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtcm93XCIsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW25vZGUsIHN0cl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiZGVmYXVsdFwiKTtcbiAgICAgICAgICAgICAgICBzdHIgPSB0aGlzLkFNcmVtb3ZlQ2hhcnNBbmRCbGFua3Moc3RyLCBzeW1ib2wuaW5wdXQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3RoaXMuY3JlYXRlTW1sTm9kZShzeW1ib2wudGFnLCAgICAgICAgLy9pdHMgYSBjb25zdGFudFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzeW1ib2wub3V0cHV0KSksIHN0cl07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBBTXBhcnNlSWV4cHIoc3RyOiBzdHJpbmcpOiBbTm9kZSwgc3RyaW5nXSB7XG4gICAgICAgIHZhciBzeW1ib2wsIHN5bTEsIHN5bTIsIG5vZGUsIHJlc3VsdCwgdW5kZXJvdmVyO1xuICAgICAgICBzdHIgPSB0aGlzLkFNcmVtb3ZlQ2hhcnNBbmRCbGFua3Moc3RyLCAwKTtcbiAgICAgICAgc3ltMSA9IHRoaXMuQU1nZXRTeW1ib2woc3RyKTtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5BTXBhcnNlU2V4cHIoc3RyKTtcbiAgICAgICAgbm9kZSA9IHJlc3VsdFswXTtcbiAgICAgICAgc3RyID0gcmVzdWx0WzFdO1xuICAgICAgICBzeW1ib2wgPSB0aGlzLkFNZ2V0U3ltYm9sKHN0cik7XG4gICAgICAgIGlmIChzeW1ib2wudHR5cGUgPT0gSU5GSVggJiYgc3ltYm9sLmlucHV0ICE9IFwiL1wiKSB7XG4gICAgICAgICAgICBzdHIgPSB0aGlzLkFNcmVtb3ZlQ2hhcnNBbmRCbGFua3Moc3RyLCBzeW1ib2wuaW5wdXQubGVuZ3RoKTtcbiAgICAgICAgICAgIC8vICAgIGlmIChzeW1ib2wuaW5wdXQgPT0gXCIvXCIpIHJlc3VsdCA9IEFNcGFyc2VJZXhwcihzdHIpOyBlbHNlIC4uLlxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5BTXBhcnNlU2V4cHIoc3RyKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRbMF0gPT0gbnVsbCkgLy8gc2hvdyBib3ggaW4gcGxhY2Ugb2YgbWlzc2luZyBhcmd1bWVudFxuICAgICAgICAgICAgICAgIHJlc3VsdFswXSA9IHRoaXMuY3JlYXRlTW1sTm9kZShcIm1vXCIsIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXFx1MjVBMVwiKSk7XG4gICAgICAgICAgICBlbHNlIHRoaXMuQU1yZW1vdmVCcmFja2V0cyhyZXN1bHRbMF0pO1xuICAgICAgICAgICAgc3RyID0gcmVzdWx0WzFdO1xuICAgICAgICAgICAgLy8gICAgaWYgKHN5bWJvbC5pbnB1dCA9PSBcIi9cIikgQU1yZW1vdmVCcmFja2V0cyhub2RlKTtcbiAgICAgICAgICAgIHVuZGVyb3ZlciA9IChzeW0xLnR0eXBlID09IFVOREVST1ZFUiB8fCBzeW0xLnR0eXBlID09IFVOQVJZVU5ERVJPVkVSKTtcbiAgICAgICAgICAgIGlmIChzeW1ib2wuaW5wdXQgPT0gXCJfXCIpIHtcbiAgICAgICAgICAgICAgICBzeW0yID0gdGhpcy5BTWdldFN5bWJvbChzdHIpO1xuICAgICAgICAgICAgICAgIGlmIChzeW0yLmlucHV0ID09IFwiXlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IHRoaXMuQU1yZW1vdmVDaGFyc0FuZEJsYW5rcyhzdHIsIHN5bTIuaW5wdXQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlczIgPSB0aGlzLkFNcGFyc2VTZXhwcihzdHIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkFNcmVtb3ZlQnJhY2tldHMocmVzMlswXSk7XG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IHJlczJbMV07XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZU1tbE5vZGUoKHVuZGVyb3ZlciA/IFwibXVuZGVyb3ZlclwiIDogXCJtc3Vic3VwXCIpLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChyZXN1bHRbMF0pO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHJlczJbMF0pO1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVNbWxOb2RlKFwibXJvd1wiLCBub2RlKTsgLy8gc28gc3VtIGRvZXMgbm90IHN0cmV0Y2hcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVNbWxOb2RlKCh1bmRlcm92ZXIgPyBcIm11bmRlclwiIDogXCJtc3ViXCIpLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChyZXN1bHRbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ltYm9sLmlucHV0ID09IFwiXlwiICYmIHVuZGVyb3Zlcikge1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtb3ZlclwiLCBub2RlKTtcbiAgICAgICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHJlc3VsdFswXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZU1tbE5vZGUoc3ltYm9sLnRhZywgbm9kZSk7XG4gICAgICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChyZXN1bHRbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzeW0xLmZ1bmMgIT0gJ3VuZGVmaW5lZCcgJiYgc3ltMS5mdW5jKSB7XG4gICAgICAgICAgICAgICAgc3ltMiA9IHRoaXMuQU1nZXRTeW1ib2woc3RyKTtcbiAgICAgICAgICAgICAgICBpZiAoc3ltMi50dHlwZSAhPSBJTkZJWCAmJiBzeW0yLnR0eXBlICE9IFJJR0hUQlJBQ0tFVCAmJlxuICAgICAgICAgICAgICAgICAgICAoc3ltMS5pbnB1dC5sZW5ndGggPiAxIHx8IHN5bTIudHR5cGUgPT0gTEVGVEJSQUNLRVQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuQU1wYXJzZUlleHByKHN0cik7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtcm93XCIsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHJlc3VsdFswXSk7XG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IHJlc3VsdFsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtub2RlLCBzdHJdO1xuICAgIH1cblxuICAgIEFNcGFyc2VFeHByKHN0cjogc3RyaW5nLCByaWdodGJyYWNrZXQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdmFyIHN5bWJvbCwgbm9kZSwgcmVzdWx0LCBpLFxuICAgICAgICAgICAgbmV3RnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgZG8ge1xuXG4gICAgICAgICAgICBzdHIgPSB0aGlzLkFNcmVtb3ZlQ2hhcnNBbmRCbGFua3Moc3RyLCAwKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuQU1wYXJzZUlleHByKHN0cik7XG4gICAgICAgICAgICBub2RlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgc3RyID0gcmVzdWx0WzFdO1xuICAgICAgICAgICAgc3ltYm9sID0gdGhpcy5BTWdldFN5bWJvbChzdHIpO1xuICAgICAgICAgICAgaWYgKHN5bWJvbC50dHlwZSA9PSBJTkZJWCAmJiBzeW1ib2wuaW5wdXQgPT0gXCIvXCIpIHtcbiAgICAgICAgICAgICAgICBzdHIgPSB0aGlzLkFNcmVtb3ZlQ2hhcnNBbmRCbGFua3Moc3RyLCBzeW1ib2wuaW5wdXQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLkFNcGFyc2VJZXhwcihzdHIpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbMF0gPT0gbnVsbCkgLy8gc2hvdyBib3ggaW4gcGxhY2Ugb2YgbWlzc2luZyBhcmd1bWVudFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbMF0gPSB0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtb1wiLCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlxcdTI1QTFcIikpO1xuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5BTXJlbW92ZUJyYWNrZXRzKHJlc3VsdFswXSk7XG4gICAgICAgICAgICAgICAgc3RyID0gcmVzdWx0WzFdO1xuICAgICAgICAgICAgICAgIHRoaXMuQU1yZW1vdmVCcmFja2V0cyhub2RlKTtcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVNbWxOb2RlKHN5bWJvbC50YWcsIG5vZGUpO1xuICAgICAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQocmVzdWx0WzBdKTtcbiAgICAgICAgICAgICAgICBuZXdGcmFnLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgICAgIHN5bWJvbCA9IHRoaXMuQU1nZXRTeW1ib2woc3RyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUgIT0gdW5kZWZpbmVkKSBuZXdGcmFnLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICB9IHdoaWxlICgoc3ltYm9sLnR0eXBlICE9IFJJR0hUQlJBQ0tFVCAmJlxuICAgICAgICAgICAgKHN5bWJvbC50dHlwZSAhPSBMRUZUUklHSFQgfHwgcmlnaHRicmFja2V0KVxuICAgICAgICAgICAgfHwgdGhpcy5BTW5lc3RpbmdEZXB0aCA9PSAwKSAmJiBzeW1ib2wgIT0gbnVsbCAmJiBzeW1ib2wub3V0cHV0ICE9IFwiXCIpO1xuICAgICAgICBpZiAoc3ltYm9sLnR0eXBlID09IFJJR0hUQlJBQ0tFVCB8fCBzeW1ib2wudHR5cGUgPT0gTEVGVFJJR0hUKSB7XG4gICAgICAgICAgICAvLyAgICBpZiAoQU1uZXN0aW5nRGVwdGggPiAwKSBBTW5lc3RpbmdEZXB0aC0tO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICB2YXIgbGVuID0gbmV3RnJhZy5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgaWYgKGxlbiA+IDAgJiYgbmV3RnJhZy5jaGlsZE5vZGVzW2xlbiAtIDFdLm5vZGVOYW1lID09IFwibXJvd1wiXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgJiYgbmV3RnJhZy5jaGlsZE5vZGVzW2xlbiAtIDFdLmxhc3RDaGlsZFxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICYmIG5ld0ZyYWcuY2hpbGROb2Rlc1tsZW4gLSAxXS5sYXN0Q2hpbGQuZmlyc3RDaGlsZCkgeyAvL21hdHJpeFxuICAgICAgICAgICAgICAgIC8vcmVtb3ZlZCB0byBhbGxvdyByb3cgdmVjdG9yczogLy8mJiBsZW4+MSAmJlxuICAgICAgICAgICAgICAgIC8vbmV3RnJhZy5jaGlsZE5vZGVzW2xlbi0yXS5ub2RlTmFtZSA9PSBcIm1vXCIgJiZcbiAgICAgICAgICAgICAgICAvL25ld0ZyYWcuY2hpbGROb2Rlc1tsZW4tMl0uZmlyc3RDaGlsZC5ub2RlVmFsdWUgPT0gXCIsXCJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICB2YXIgcmlnaHQgPSBuZXdGcmFnLmNoaWxkTm9kZXNbbGVuIC0gMV0ubGFzdENoaWxkLmZpcnN0Q2hpbGQubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChyaWdodCA9PSBcIilcIiB8fCByaWdodCA9PSBcIl1cIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlZnQgPSBuZXdGcmFnLmNoaWxkTm9kZXNbbGVuIC0gMV0uZmlyc3RDaGlsZC5maXJzdENoaWxkLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgPT0gXCIoXCIgJiYgcmlnaHQgPT0gXCIpXCIgJiYgc3ltYm9sLm91dHB1dCAhPSBcIn1cIiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9PSBcIltcIiAmJiByaWdodCA9PSBcIl1cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IFtdOyAvLyBwb3NpdGlvbnMgb2YgY29tbWFzXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0cml4ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtID0gbmV3RnJhZy5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IG1hdHJpeCAmJiBpIDwgbTsgaSA9IGkgKyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zW2ldID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5ld0ZyYWcuY2hpbGROb2Rlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0cml4KSBtYXRyaXggPSBub2RlLm5vZGVOYW1lID09IFwibXJvd1wiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaSA9PSBtIC0gMSB8fCBub2RlLm5leHRTaWJsaW5nLm5vZGVOYW1lID09IFwibW9cIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5leHRTaWJsaW5nLmZpcnN0Q2hpbGQubm9kZVZhbHVlID09IFwiLFwiKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5maXJzdENoaWxkLmZpcnN0Q2hpbGQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZmlyc3RDaGlsZC5maXJzdENoaWxkLm5vZGVWYWx1ZSA9PSBsZWZ0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmxhc3RDaGlsZC5maXJzdENoaWxkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmxhc3RDaGlsZC5maXJzdENoaWxkLm5vZGVWYWx1ZSA9PSByaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0cml4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBub2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBqKyspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmNoaWxkTm9kZXNbal0uZmlyc3RDaGlsZC5ub2RlVmFsdWUgPT0gXCIsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zW2ldW3Bvc1tpXS5sZW5ndGhdID0gajtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0cml4ICYmIGkgPiAxKSBtYXRyaXggPSBwb3NbaV0ubGVuZ3RoID09IHBvc1tpIC0gMl0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0cml4ID0gbWF0cml4ICYmIChwb3MubGVuZ3RoID4gMSB8fCBwb3NbMF0ubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sdW1ubGluZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRyaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93LCBmcmFnLCBuLCBrLCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbTsgaSA9IGkgKyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBuZXdGcmFnLmZpcnN0Q2hpbGQ7IC8vIDxtcm93PigtLC0sLi4uLC0sLSk8L21yb3c+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gbm9kZS5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7IC8vcmVtb3ZlIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMTsgaiA8IG4gLSAxOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcG9zW2ldW2tdICE9IFwidW5kZWZpbmVkXCIgJiYgaiA9PSBwb3NbaV1ba10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7IC8vcmVtb3ZlICxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5maXJzdENoaWxkLm5vZGVOYW1lID09IFwibXJvd1wiICYmIG5vZGUuZmlyc3RDaGlsZC5jaGlsZE5vZGVzLmxlbmd0aCA9PSAxICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5maXJzdENoaWxkLm5vZGVWYWx1ZSA9PSBcIlxcdTIyMjNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lzIGNvbHVtbmxpbmUgbWFya2VyIC0gc2tpcCBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7IGNvbHVtbmxpbmVzLnB1c2goXCJzb2xpZFwiKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpOyAvL3JlbW92ZSBtcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7IC8vcmVtb3ZlICxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaiArPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IDApIHsgY29sdW1ubGluZXMucHVzaChcIm5vbmVcIik7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVNbWxOb2RlKFwibXRkXCIsIGZyYWcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgZnJhZy5hcHBlbmRDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtdGRcIiwgZnJhZykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7IGNvbHVtbmxpbmVzLnB1c2goXCJub25lXCIpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdGcmFnLmNoaWxkTm9kZXMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdGcmFnLnJlbW92ZUNoaWxkKG5ld0ZyYWcuZmlyc3RDaGlsZCk7IC8vcmVtb3ZlIDxtcm93Pik8L21yb3c+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ZyYWcucmVtb3ZlQ2hpbGQobmV3RnJhZy5maXJzdENoaWxkKTsgLy9yZW1vdmUgPG1vPiw8L21vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlTW1sTm9kZShcIm10clwiLCByb3cpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlTW1sTm9kZShcIm10YWJsZVwiLCB0YWJsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoXCJjb2x1bW5saW5lc1wiLCBjb2x1bW5saW5lcy5qb2luKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzeW1ib2wuaW52aXNpYmxlID09IFwiYm9vbGVhblwiICYmIHN5bWJvbC5pbnZpc2libGUpIG5vZGUuc2V0QXR0cmlidXRlKFwiY29sdW1uYWxpZ25cIiwgXCJsZWZ0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ZyYWcucmVwbGFjZUNoaWxkKG5vZGUsIG5ld0ZyYWcuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgPSB0aGlzLkFNcmVtb3ZlQ2hhcnNBbmRCbGFua3Moc3RyLCBzeW1ib2wuaW5wdXQubGVuZ3RoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ltYm9sLmludmlzaWJsZSAhPSBcImJvb2xlYW5cIiB8fCAhc3ltYm9sLmludmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZU1tbE5vZGUoXCJtb1wiLCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzeW1ib2wub3V0cHV0KSk7XG4gICAgICAgICAgICAgICAgbmV3RnJhZy5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW25ld0ZyYWcsIHN0cl07XG4gICAgfVxuXG4gICAgcGFyc2VNYXRoKHN0cjogc3RyaW5nLCBsYXRleDogYW55KSB7XG4gICAgICAgIHZhciBmcmFnLCBub2RlO1xuICAgICAgICB0aGlzLkFNbmVzdGluZ0RlcHRoID0gMDtcbiAgICAgICAgLy9zb21lIGJhc2ljIGNsZWFudXAgZm9yIGRlYWxpbmcgd2l0aCBzdHVmZiBlZGl0b3JzIGxpa2UgVGlueU1DRSBhZGRzXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mbmJzcDsvZywgXCJcIik7XG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKTtcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpO1xuICAgICAgICBmcmFnID0gdGhpcy5BTXBhcnNlRXhwcihzdHIucmVwbGFjZSgvXlxccysvZywgXCJcIiksIGZhbHNlKVswXTtcbiAgICAgICAgbm9kZSA9IHRoaXMuY3JlYXRlTW1sTm9kZShcIm1zdHlsZVwiLCBmcmFnKTtcbiAgICAgICAgaWYgKG1hdGhjb2xvciAhPSBcIlwiKSBub2RlLnNldEF0dHJpYnV0ZShcIm1hdGhjb2xvclwiLCBtYXRoY29sb3IpO1xuICAgICAgICBpZiAobWF0aGZvbnRzaXplICE9IFwiXCIpIHtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFwiZm9udHNpemVcIiwgbWF0aGZvbnRzaXplKTtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFwibWF0aHNpemVcIiwgbWF0aGZvbnRzaXplKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0aGZvbnRmYW1pbHkgIT0gXCJcIikge1xuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoXCJmb250ZmFtaWx5XCIsIG1hdGhmb250ZmFtaWx5KTtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFwibWF0aHZhcmlhbnRcIiwgbWF0aGZvbnRmYW1pbHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpc3BsYXlzdHlsZSkgbm9kZS5zZXRBdHRyaWJ1dGUoXCJkaXNwbGF5c3R5bGVcIiwgXCJ0cnVlXCIpO1xuICAgICAgICBub2RlID0gdGhpcy5jcmVhdGVNbWxOb2RlKFwibWF0aFwiLCBub2RlKTtcbiAgICAgICAgaWYgKHNob3dhc2NpaWZvcm11bGFvbmhvdmVyKSAgICAgICAgICAgICAgICAgICAgICAvL2ZpeGVkIGJ5IGRqaHN1IHNvIG5ld2xpbmVcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgc3RyLnJlcGxhY2UoL1xccysvZywgXCIgXCIpKTsvL2RvZXMgbm90IHNob3cgaW4gR2Vja29cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgc3RyYXJyMmRvY0ZyYWcoYXJyOiBzdHJpbmdbXSwgbGluZWJyZWFrczogYm9vbGVhbiwgbGF0ZXg6IGJvb2xlYW4pOiBEb2N1bWVudEZyYWdtZW50IHtcbiAgICAgICAgdmFyIG5ld0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHZhciBleHByID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZXhwcikgbmV3RnJhZy5hcHBlbmRDaGlsZCh0aGlzLnBhcnNlTWF0aChhcnJbaV0sIGxhdGV4KSk7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJyaSA9IChsaW5lYnJlYWtzID8gYXJyW2ldLnNwbGl0KFwiXFxuXFxuXCIpIDogW2FycltpXV0pO1xuICAgICAgICAgICAgICAgIG5ld0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVFbGVtZW50WEhUTUwoXCJzcGFuXCIpLlxuICAgICAgICAgICAgICAgICAgICBhcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShhcnJpWzBdKSkpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgYXJyaS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBuZXdGcmFnLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlRWxlbWVudFhIVE1MKFwicFwiKSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZyYWcuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVFbGVtZW50WEhUTUwoXCJzcGFuXCIpLlxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYXJyaVtqXSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHByID0gIWV4cHI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0ZyYWc7XG4gICAgfVxuXG4gICAgQU1hdXRvbWF0aHJlYyhzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIC8vZm9ybXVsYSBpcyBhIHNwYWNlIChvciBzdGFydCBvZiBzdHIpIGZvbGxvd2VkIGJ5IGEgbWF4aW1hbCBzZXF1ZW5jZSBvZiAqdHdvKiBvciBtb3JlIHRva2VucywgcG9zc2libHkgc2VwYXJhdGVkIGJ5IHJ1bnMgb2YgZGlnaXRzIGFuZC9vciBzcGFjZS5cbiAgICAgICAgLy90b2tlbnMgYXJlIHNpbmdsZSBsZXR0ZXJzIChleGNlcHQgYSwgQSwgSSkgYW5kIEFTQ0lJTWF0aE1MIHRva2Vuc1xuICAgICAgICB2YXIgdGV4Y29tbWFuZCA9IFwiXFxcXFxcXFxbYS16QS1aXSt8XFxcXFxcXFxcXFxcc3xcIjtcbiAgICAgICAgdmFyIGFtYmlnQU10b2tlbiA9IFwiXFxcXGIoPzpvb3xsaW18bG58aW50fG9pbnR8ZGVsfGdyYWR8YWxlcGh8cHJvZHxwcm9wfHNpbmh8Y29zaHx0YW5ofGNvc3xzZWN8cGl8dHR8ZnJ8c2Z8c3ViZXxzdXBlfHN1YnxzdXB8ZGV0fG1vZHxnY2R8bGNtfG1pbnxtYXh8dmVjfGRkb3R8dWx8Y2hpfGV0YXxudXxtdSkoPyFbYS16XSl8XCI7XG4gICAgICAgIHZhciBlbmdsaXNoQU10b2tlbiA9IFwiXFxcXGIoPzpzdW18b3h8bG9nfHNpbnx0YW58ZGltfGhhdHxiYXJ8ZG90KSg/IVthLXpdKXxcIjtcbiAgICAgICAgdmFyIHNlY29uZGVuZ2xpc2hBTXRva2VuID0gXCJ8XFxcXGJJXFxcXGJ8XFxcXGJpblxcXFxifFxcXFxidGV4dFxcXFxiXCI7IC8vIHRvb2sgaWYgYW5kIG9yIG5vdCBvdXRcbiAgICAgICAgdmFyIHNpbXBsZUFNdG9rZW4gPSBcIk5OfFpafFFRfFJSfENDfFRUfEFBfEVFfHNxcnR8ZHh8ZHl8ZHp8ZHR8eHh8dnZ8dXV8bm58YmJ8Y2N8Y3NjfGNvdHxhbHBoYXxiZXRhfGRlbHRhfERlbHRhfGVwc2lsb258Z2FtbWF8R2FtbWF8a2FwcGF8bGFtYmRhfExhbWJkYXxvbWVnYXxwaGl8UGhpfFBpfHBzaXxQc2l8cmhvfHNpZ21hfFNpZ21hfHRhdXx0aGV0YXxUaGV0YXx4aXxYaXx6ZXRhXCI7IC8vIHV1dSBubm4/XG4gICAgICAgIHZhciBsZXR0ZXIgPSBcIlthLXpBLUhKLVpdKD89KD86W15hLXpBLVpdfCR8XCIgKyBhbWJpZ0FNdG9rZW4gKyBlbmdsaXNoQU10b2tlbiArIHNpbXBsZUFNdG9rZW4gKyBcIikpfFwiO1xuICAgICAgICB2YXIgdG9rZW4gPSBsZXR0ZXIgKyB0ZXhjb21tYW5kICsgXCJcXFxcZCt8Wy0oKVtcXFxcXXt9Kz0qJl5fJVxcXFxcXEAvPD4sXFxcXHwhOjsnfl18XFxcXC4oPyEoPzpcXHgyMHwkKSl8XCIgKyBhbWJpZ0FNdG9rZW4gKyBlbmdsaXNoQU10b2tlbiArIHNpbXBsZUFNdG9rZW47XG4gICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAoXCIoXnxcXFxccykoKChcIiArIHRva2VuICsgXCIpXFxcXHM/KSgoXCIgKyB0b2tlbiArIHNlY29uZGVuZ2xpc2hBTXRva2VuICsgXCIpXFxcXHM/KSspKFssLj9dPyg/PVxcXFxzfCQpKVwiLCBcImdcIik7XG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHJlLCBcIiBgJDJgJDdcIik7XG4gICAgICAgIHZhciBhcnIgPSBzdHIuc3BsaXQoQU1kZWxpbWl0ZXIxKTtcbiAgICAgICAgdmFyIHJlMSA9IG5ldyBSZWdFeHAoXCIoXnxcXFxccykoW2ItekItSEotWisqPD5dfFwiICsgdGV4Y29tbWFuZCArIGFtYmlnQU10b2tlbiArIHNpbXBsZUFNdG9rZW4gKyBcIikoXFxcXHN8XFxcXG58JClcIiwgXCJnXCIpO1xuICAgICAgICB2YXIgcmUyID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKShbYS16XXxcIiArIHRleGNvbW1hbmQgKyBhbWJpZ0FNdG9rZW4gKyBzaW1wbGVBTXRva2VuICsgXCIpKFssLl0pXCIsIFwiZ1wiKTsgLy8gcmVtb3ZlZCB8XFxkKyBmb3Igbm93XG4gICAgICAgIGxldCBpXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspICAgLy9zaW5nbGUgbm9uZW5nbGlzaCB0b2tlbnNcbiAgICAgICAgICAgIGlmIChpICUgMiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgYXJyW2ldID0gYXJyW2ldLnJlcGxhY2UocmUxLCBcIiBgJDJgJDNcIik7XG4gICAgICAgICAgICAgICAgYXJyW2ldID0gYXJyW2ldLnJlcGxhY2UocmUyLCBcIiBgJDJgJDNcIik7XG4gICAgICAgICAgICAgICAgYXJyW2ldID0gYXJyW2ldLnJlcGxhY2UoLyhbe31bXFxdXSkvLCBcImAkMWBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIHN0ciA9IGFyci5qb2luKEFNZGVsaW1pdGVyMSk7XG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8oKF58XFxzKVxcKFthLXpBLVpdezIsfS4qPylcXClgL2csIFwiJDFgKVwiKTsgIC8vZml4IHBhcmVudGhlc2VzXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9gKFxcKChhXFxzfGluXFxzKSkoLio/W2EtekEtWl17Mix9XFwpKS9nLCBcIiQxYCQzXCIpOyAgLy9maXggcGFyZW50aGVzZXNcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcc2luYC9nLCBcImAgaW5cIik7XG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9gKFxcKFxcd1xcKVssLl0/KFxcc3xcXG58JCkpL2csIFwiJDFgXCIpO1xuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvYChbMC05Ll0rfGUuZ3xpLmUpYChcXC4/KS9naSwgXCIkMSQyXCIpO1xuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvYChbMC05Ll0rOilgL2csIFwiJDFcIik7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgcHJvY2Vzc05vZGVSKG46IE5vZGUsIGxpbmVicmVha3M6IGJvb2xlYW4sIGxhdGV4OiBib29sZWFuKTogbnVtYmVyIHtcbiAgICAgICAgdmFyIG10Y2gsIHN0ciwgYXJyLCBpO1xuICAgICAgICBsZXQgZnJnOiBOb2RlXG5cbiAgICAgICAgaWYgKG4uY2hpbGROb2Rlcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICBpZiAoKG4ubm9kZVR5cGUgIT0gOCB8fCBsaW5lYnJlYWtzKSAmJlxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgIG4ucGFyZW50Tm9kZS5ub2RlTmFtZSAhPSBcImZvcm1cIiAmJiBuLnBhcmVudE5vZGUubm9kZU5hbWUgIT0gXCJGT1JNXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICBuLnBhcmVudE5vZGUubm9kZU5hbWUgIT0gXCJ0ZXh0YXJlYVwiICYmIG4ucGFyZW50Tm9kZS5ub2RlTmFtZSAhPSBcIlRFWFRBUkVBXCJcbiAgICAgICAgICAgICAgICAvKiYmIG4ucGFyZW50Tm9kZS5ub2RlTmFtZSE9XCJwcmVcIiAmJiBuLnBhcmVudE5vZGUubm9kZU5hbWUhPVwiUFJFXCIqLykge1xuICAgICAgICAgICAgICAgIHN0ciA9IG4ubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICghKHN0ciA9PSBudWxsKSkge1xuICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFxyXFxuXFxyXFxuL2csIFwiXFxuXFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFx4MjArL2csIFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL1xccypcXHJcXG4vZywgXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGF0ZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERFTElNSVRFUlM6XG4gICAgICAgICAgICAgICAgICAgICAgICBtdGNoID0gKHN0ci5pbmRleE9mKFwiXFwkXCIpID09IC0xID8gZmFsc2UgOiB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8oW15cXFxcXSlcXCQvZywgXCIkMSBcXCRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXlxcJC8sIFwiIFxcJFwiKTtcdC8vIGluIGNhc2UgXFwkIGF0IHN0YXJ0IG9mIHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyID0gc3RyLnNwbGl0KFwiIFxcJFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyW2ldID0gYXJyW2ldLnJlcGxhY2UoL1xcXFxcXCQvZywgXCJcXCRcIik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShuZXcgUmVnRXhwKEFNZXNjYXBlMSwgXCJnXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyBtdGNoID0gdHJ1ZTsgcmV0dXJuIFwiQU1lc2NhcGUxXCIgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFxcXD9lbmR7P2E/bWF0aH0/L2ksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7IGF1dG9tYXRocmVjb2duaXplID0gZmFsc2U7IG10Y2ggPSB0cnVlOyByZXR1cm4gXCJcIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9hbWF0aFxcYnxcXFxcYmVnaW57YT9tYXRofS9pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyBhdXRvbWF0aHJlY29nbml6ZSA9IHRydWU7IG10Y2ggPSB0cnVlOyByZXR1cm4gXCJcIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyciA9IHN0ci5zcGxpdChBTWRlbGltaXRlcjEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1dG9tYXRocmVjb2duaXplKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICUgMiA9PSAwKSBhcnJbaV0gPSB0aGlzLkFNYXV0b21hdGhyZWMoYXJyW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IGFyci5qb2luKEFNZGVsaW1pdGVyMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIgPSBzdHIuc3BsaXQoQU1kZWxpbWl0ZXIxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIC8vIHRoaXMgaXMgYSBwcm9ibGVtICoqKioqKioqKioqKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycltpXSA9IGFycltpXS5yZXBsYWNlKC9BTWVzY2FwZTEvZywgQU1kZWxpbWl0ZXIxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA+IDEgfHwgbXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5vTWF0aE1MKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJnID0gdGhpcy5zdHJhcnIyZG9jRnJhZyhhcnIsIG4ubm9kZVR5cGUgPT0gOCwgbGF0ZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZW4gPSBmcmcuY2hpbGROb2Rlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSAgICAvLyBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChmcmcsIG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsZW4gLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHJldHVybiAwO1xuICAgICAgICB9IGVsc2UgaWYgKG4ubm9kZU5hbWUgIT0gXCJtYXRoXCIpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBuLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAgaSArPSB0aGlzLnByb2Nlc3NOb2RlUihuLmNoaWxkTm9kZXNbaV0sIGxpbmVicmVha3MsIGxhdGV4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBBTXByb2Nlc3NOb2RlKG46IEhUTUxFbGVtZW50LCBsaW5lYnJlYWtzOiBib29sZWFuLCBzcGFuY2xhc3NBTT86IGFueSkge1xuICAgICAgICB2YXIgZnJhZywgc3Q7XG4gICAgICAgIGlmIChzcGFuY2xhc3NBTSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmcmFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzcGFuXCIpXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZyYWcubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAgaWYgKGZyYWdbaV0uY2xhc3NOYW1lID09IFwiQU1cIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTm9kZVIoZnJhZ1tpXSwgbGluZWJyZWFrcywgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdCA9IG4uaW5uZXJIVE1MOyAvLyBsb29rIGZvciBBTWRlbGltaXRlciBvbiBwYWdlXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHsgfVxuICAgICAgICAgICAgLy9hbGVydChzdClcbiAgICAgICAgICAgIGlmIChzdCA9PSBudWxsIHx8IC9hbWF0aFxcYnxcXFxcYmVnaW57YT9tYXRofS9pLnRlc3Qoc3QpIHx8XG4gICAgICAgICAgICAgICAgc3QuaW5kZXhPZihBTWRlbGltaXRlcjEgKyBcIiBcIikgIT0gLTEgfHwgc3Quc2xpY2UoLTEpID09IEFNZGVsaW1pdGVyMSB8fFxuICAgICAgICAgICAgICAgIHN0LmluZGV4T2YoQU1kZWxpbWl0ZXIxICsgXCI8XCIpICE9IC0xIHx8IHN0LmluZGV4T2YoQU1kZWxpbWl0ZXIxICsgXCJcXG5cIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NOb2RlUihuLCBsaW5lYnJlYWtzLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJcbmltcG9ydCB7IHNlcnZlckZpbGVTeXN0ZW0gfSBmcm9tICcuL3J1bnRpbWUnXG5pbXBvcnQgeyBTY29ybSB9IGZyb20gJy4vU0NPUk1fTE9DQUwnXG5pbXBvcnQgeyBSdW50aW1lIH0gZnJvbSAnLi9ydW50aW1lJ1xuXG5cblxuLy8gVE9ETzogY2hhbmdlIFVSSSBhZGRyZXNzZXMgdG8gYmUgY29uZmlndXJhdGlvbnNcbmNvbnN0IGxlc3NvblVSSSA9ICdodHRwOi8vbG9jYWxob3N0L2JhYnkvYmFieS1zY29ybS9sZXNzb25zLydcbmNvbnN0IGFzc2V0c1VSSSA9ICdodHRwOi8vbG9jYWxob3N0L2JhYnkvYmFieS1zY29ybS9hc3NldHMvJ1xuXG5jb25zdCBzdHVkZW50SUQgPSAnMDAwMDEnXG5jb25zdCBmaXJzdE5hbWUgPSAnVG9tICdcbmNvbnN0IGxhc3ROYW1lID0gJ0JlcmVuZCdcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgICBoZWxwbGluZTogJ0Rpc2NvcmQnLFxuICAgIGFzc2V0VVJJOiAnaHR0cDovL2xvY2FsaG9zdC9iYWJ5L2JhYnktc2Nvcm0vYXNzZXRzLydcblxufSBcblxuXG5leHBvcnQgaW50ZXJmYWNlIElUYWcge1xuICAgIHRhZzogc3RyaW5nLCAgIC8vIGFsd2F5cyBsb3dlcmNhc2VcbiAgICBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9LFxuICAgIHJhd3ZhbHVlOiBzdHJpbmcsXG4gICAgdGV4dHZhbHVlOiBzdHJpbmcsXG4gICAgc3BlZWNodmFsdWU6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBpbm5lclRhZ3M6IHN0cmluZ1tdICAvLyBhcnJheSBvZiBpbnRlcm5hbCB0YWdzIDxzcGFuPiwgPG1sPiwgYW5kIHNvbWUgb3RoZXJzXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLyBsb2FkIHVwIHRoZSAoc3RhdGljKSBsZXNzb25zIC8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vVE9ETzogbmVlZHMgdG8gYmUgZHJpdmVuIGZyb20gbWFuaWZlc3RcblxuXG5cblxuY29uc29sZS5sb2coJ1N0YXJ0aW5nIHJ1bnRpbWUgaW4gVC50cycpXG5sZXQgdCA9IG5ldyBSdW50aW1lKClcblxuXG5cblxuIiwiLy9jb25zdCBtb25hY28gPSB3aW5kb3cubW9uYWNvXG5pbXBvcnQgeyBJVGFnIH0gZnJvbSAnLi9UJ1xuXG4vLyBpbXBvcnQgKiAgYXMgdHMgZnJvbSAndHlwZXNjcmlwdCdcbi8vIGltcG9ydCB7IGRyaWxsQnlOYW1lIH0gZnJvbSAnLi9jYW52YXMnXG5pbXBvcnQgeyBPbkNsaWNrU2F5IH0gZnJvbSAnLi9vbkNsaWNrU2F5J1xuLy8gaW1wb3J0IHsgRWRpdG9ySW5zdGFuY2UgfSBmcm9tICcuL2VkaXRvckluc3RhbmNlJ1xuLy8gaW1wb3J0IHsgTGVzc29uRmFjdG9yeSwgZHJpbGxNYXRoRGlzcGF0Y2ggfSBmcm9tICcuL2RyaWxsTWF0aCdcbmltcG9ydCAqICBhcyBQcmlzbSBmcm9tICdwcmlzbWpzJ1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9UJ1xuXG5pbXBvcnQgeyBhc2NpaU1hdGgsIHRlc3RBc2NpaU1hdGggfSBmcm9tICcuL0FTQ0lJTWF0aE1MJ1xuXG5cblxuXG50eXBlIHV0dGVyYW5jZSA9IHtcbiAgICBpZDogc3RyaW5nLCAgIC8vICd1dHRlcjAxNScgb3Igc2ltaWxhclxuICAgIHRleHQ6IHN0cmluZyxcbn1cbmxldCB1dHRlcmFuY2VzOiB1dHRlcmFuY2VbXSA9IFtdXG5cbnR5cGUgY29kZVN0cmluZyA9IHtcbiAgICBjb3B5SUQ6IHN0cmluZyAgIC8vICdjb3B5MDE5JyBvciBzaW1pbGFyXG4gICAgcnVuSUQ6IHN0cmluZyAgICAvLyAncnVuMDE5JyBvciBzaW1pbGFyXG4gICAgY29kZTogc3RyaW5nXG59XG5sZXQgY29kZVN0cmluZ3M6IGNvZGVTdHJpbmdbXSA9IFtdXG5cblxuXG5leHBvcnQgdHlwZSBtb2R1bGVJbmZvID0ge1xuICAgIG1vZHVsZTogc3RyaW5nLCAgICAgLy8gbmFtZSBvZiB0aGUgbW9kdWxlIHdlIGFyZSB3b3JraW5nIG9uXG4gICAgbGVzc29uOiBzdHJpbmcsXG4gICAgc2hvcnREZXNjOiBzdHJpbmdcbn1cbmxldCBtb2R1bGVJbmZvOiBtb2R1bGVJbmZvID0geyBtb2R1bGU6ICcnLCBsZXNzb246ICcnLCBzaG9ydERlc2M6ICcnIH1cblxuXG5cbmV4cG9ydCBjbGFzcyBMZXNzb25QYWdlIHtcblxuICAgIG9uQ2xpY2tTYXk6IE9uQ2xpY2tTYXlcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdJbiBMZXNzb25QYWdlJylcblxuICAgICAgICB0ZXN0QXNjaWlNYXRoKClcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgdm9pY2VzXG4gICAgICAgIHRoaXMub25DbGlja1NheSA9IG5ldyBPbkNsaWNrU2F5KClcblxuICAgIH1cblxuICAgIG9uQ2xpY2tDb3B5KGxpbms6IHN0cmluZykgeyBhbGVydCgnY29weSB0byBlZGl0b3IuLi4gICAnICsgbGluaykgfVxuICAgIG9uQ2xpY2tSdW4obGluazogc3RyaW5nKSB7IGFsZXJ0KCdydW4gaW4gY2FudmFzLi4uICAgJyArIGxpbmspIH1cblxuXG5cbiAgICAvKiogY2xlYXIgb3V0IGFueSBleGlzdGluZyBzdHVmZiBpbiB0aGUgZG9jdW1lbnQgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgLy8gY2xlYXIgdGhlIGV4aXN0aW5nIGxlc3NvbiBzcGFjZVxuICAgICAgICBsZXQgZXhpc3RpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVzc29uJylcbiAgICAgICAgaWYgKGV4aXN0aW5nICE9PSBudWxsKVxuICAgICAgICAgICAgZXhpc3RpbmcuaW5uZXJIVE1MID0gJydcblxuICAgICAgICB1dHRlcmFuY2VzID0gW11cbiAgICAgICAgY29kZVN0cmluZ3MgPSBbXVxuXG4gICAgfVxuICAgIGxvYWQoc2VjdGlvbnM6IElUYWdbXSwgZGVidWcgPSBmYWxzZSkge1xuXG4gICAgICAgIHRoaXMuY2xlYXIoKSAvLyBzdGFydCBieSBlcmFzaW5nXG5cblxuICAgICAgICBsZXQgcHJldmlvdXNXYXNQID0gZmFsc2UgICAgICAgIC8vIHdlIG5lZWQgdG8gYWNjdW11bGF0ZSA8cD4ncyB0b2dldGhlclxuXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHNlY3Rpb25zLmxlbmd0aCA+IDAsIFwiRGlkbid0IGdldCBhbnkgc2VjdGlvbnNcIilcbiAgICAgICAgbGV0IHMgPSBuZXcgU2VjdGlvblAoc2VjdGlvbnNbMF0pXG5cblxuXG5cbiAgICAgICAgLy8gY3ljbGUgdGhyb3VnaCB0aGUgSVRhZ3MsIGNyZWF0aW5nIGEgc2VjdGlvbiBmb3IgZWFjaCBvbmVcbiAgICAgICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuXG4gICAgICAgICAgICBpZiAoJ2gxJyBpbiBzZWN0aW9uLnBhcmFtcyB8fCAnaDInIGluIHNlY3Rpb24ucGFyYW1zIHx8ICdoMycgaW4gc2VjdGlvbi5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnRkZPVU5EJywgc2VjdGlvbi50YWcpXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzV2FzUCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnUFBST0NFU1NFRCcpXG4gICAgICAgICAgICAgICAgICAgIHMuZmluYWxBdHRhY2hUb0RpdigpXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzV2FzUCA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuXG5cblxuICAgICAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgbmV3IFNlY3Rpb25EZWJ1ZyhzZWN0aW9uKSAgIC8vIGRvbid0IHNhdmUgaW4gJ3NcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2xvc2Ugb2ZmIG11bHRpcGxlIGxpbmtlZCA8cD4gaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi50YWcgIT09ICdwJyAmJiBwcmV2aW91c1dhc1ApIHtcbiAgICAgICAgICAgICAgICBzLmZpbmFsQXR0YWNoVG9EaXYoKVxuICAgICAgICAgICAgICAgIHByZXZpb3VzV2FzUCA9IGZhbHNlXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgc3dpdGNoIChzZWN0aW9uLnRhZykge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAna2V5JzogICAgICAgICAvLyB3ZSBkb24ndCBwcm9jZXNzIHRoZXNlLCB0aGV5IGFyZSBtZXRhIGZvciB0aGUgdGFibGUgb2YgY29udGVudHNcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuXG4gICAgICAgICAgICAgICAgY2FzZSAncCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYSBiaXQgdHJpY2tpZXIgdGhhbiB0aGUgb3RoZXJzXG4gICAgICAgICAgICAgICAgICAgIC8vIDxwPiBnZXQgZ3JvdXBlZCB0b2dldGhlciBpbiBhIHNpbmdsZSA8RElWPi4gIHNvIHdlIG9mZmVyIFxuICAgICAgICAgICAgICAgICAgICAvLyBhIG1ldGhvZCB0aGF0IGFkZHMgYSBzaW5nbGUgPFA+IHBhcmFncmFwaCBhbmQgYW5vdGhlciB0aGF0IGNsb3NlcyB0aGUgPERJVj5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXByZXZpb3VzV2FzUCkgeyAgICAvLyBwcmV2aW91cyB3YXMgc29tZXRoaW5nIGVsc2UsIHNvIG9wZW5pbmcgYSBuZXcgYmxvY2sgb2YgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICBzID0gbmV3IFNlY3Rpb25QKHNlY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcy5hZGRTaW5nbGVQYXJhZ3JhcGgoc2VjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNXYXNQID0gdHJ1ZSAgICAgLy8gbmV4dCB0aW1lIHRocm91Z2ggdGhpcyB3aWxsIGJlIHRydWVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvZGUnOlxuICAgICAgICAgICAgICAgICAgICBuZXcgU2VjdGlvbkNvZGUoc2VjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlICdtb2R1bGUnOlxuICAgICAgICAgICAgICAgICAgICBuZXcgU2VjdGlvbk1vZHVsZShzZWN0aW9uKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlc3Nvbic6XG4gICAgICAgICAgICAgICAgICAgIG5ldyBTZWN0aW9uTGVzc29uKHNlY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAnc2hvcnRkZXNjJzpcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNlY3Rpb25TaG9ydERlc2Moc2VjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3lvdXR1YmUnOlxuICAgICAgICAgICAgICAgICAgICBuZXcgU2VjdGlvbllvdVR1YmUoc2VjdGlvbilcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3J1bic6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlICd0aXRsZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnc3VidGl0bGUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBuZXcgU2VjdGlvblRpdGxlKHNlY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlICdicmVhayc6ICAgICAgIC8vIG9yIGluIGNhc2Ugd2Ugd2FudCB0byBkbyBzb21ldGhpbmcgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2FzY2lpbWF0aCc6XG4gICAgICAgICAgICAgICAgICAgIG5ldyBTZWN0aW9uQXNjaWlNYXRoKHNlY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlICd5b3V0dWJlJzpcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNlY3Rpb25Zb3VUdWJlKHNlY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cblxuICAgICAgICAgICAgICAgIGNhc2UgJ2RyaWxsJzpcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNlY3Rpb25EcmlsbChzZWN0aW9uKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNlY3Rpb25NeXN0ZXJ5KHNlY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKHNlY3Rpb24udGFnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChwcmV2aW91c1dhc1AgJiYgcyAhPT0gbnVsbCkgICAgICAgIC8vIG1heSBuZWVkIHRvIGNsb3NlIG9mZiB0aGUgbGFzdCA8cD5cbiAgICAgICAgICAgIHMuZmluYWxBdHRhY2hUb0RpdigpXG5cblxuICAgICAgICAvLyBnZW5lcmF0ZSB0aGUgJ29uIGNsaWNrJyBldmVudHMgd2UgbmVlZCAgICBcbiAgICAgICAgdGhpcy5jcmVhdGVMaW5rcygpXG5cblxuICAgICAgICAvLyBzY3JvbGwgdXAgdG8gdGhlIHRvcCBvZiB0aGUgcGFnZSAtIG9ubHkgZG8gdGhpcyBpbiBwcm9kdWN0aW9uXG4gICAgICAgIC8vIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCB9KVxuICAgIH1cblxuXG4gICAgY3JlYXRlTGlua3MoKSB7XG5cbiAgICAgICAgLy8gYWxsIHNlY3Rpb25zIGxvYWRlZC4gIG5vdyBjbGVhbiB1cCBhbmQgYXR0YWNoIHRoZSBvbi1jbGljayBldmVudHNcbiAgICAgICAgLy8gdG8gdXR0ZXJhbmNlcyBhbmQgY29kZSBlZGl0b3JzXG5cblxuICAgICAgICAvLyBjbGVhbiB1cCBzb21lIG9mIHRoZSB1dHRlcmFuY2VzXG4gICAgICAgIC8vIHN1YnN0aXR1dGlvbiBsaXN0IHRvIGltcHJvdmUgdm9pY2VzXG4gICAgICAgIGxldCBzdWJzID0gW1xuICAgICAgICAgICAgLy8geyBmcm9tOiAnSmF2YVNjcmlwdCcsIHRvOiAnW0phdmFzY3JpcHR8SmF2dmFTY3JpcHRdJyB9LFxuICAgICAgICAgICAgeyBmcm9tOiAnXFxgY29uc29sZS5sb2coKVxcYCcsIHRvOiAnW1xcYGNvbnNvbGUubG9nKClcXGB8Y29uc29sZSBkb3QgbG9nXScgfSxcbiAgICAgICAgXVxuXG4gICAgICAgIHV0dGVyYW5jZXMuZm9yRWFjaCh1dHRlcmFuY2UgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgc3ViIG9mIHN1YnMpIHsgICAgIC8vIGFueXRoaW5nIGluIHRoZSBzdWJzdGl0dXRpb24gbGlzdFxuICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuID0gdXR0ZXJhbmNlLnRleHQuaW5kZXhPZihzdWIuZnJvbSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4gPT09IC0xKSB7IGJyZWFrIH0gIC8vIG1pZ2h0IGhhdmUgbXVsdGlwbGVzICh0aGlzIG1heSBiZSBzZXZlcmFsIHBhcmFncmFwaHMpXG4gICAgICAgICAgICAgICAgICAgIHV0dGVyYW5jZS50ZXh0ID0gdXR0ZXJhbmNlLnRleHQuc2xpY2UoMCwgbikgKyBzdWIudG8gKyB1dHRlcmFuY2UudGV4dC5zbGljZShuICsgc3ViLmZyb20ubGVuZ3RoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodXR0ZXJhbmNlLmlkKVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2F0dGFjaGluZyB0byAnLCB1dHRlcmFuY2UuaWQsdXR0ZXJhbmNlLnRleHQpXG4gICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiB7IHRoaXMub25DbGlja1NheS5vbkNsaWNrU2F5KHV0dGVyYW5jZS50ZXh0KSB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29kZVN0cmluZ3MuZm9yRWFjaChjb2RlU3RyID0+IHtcbiAgICAgICAgICAgIC8vIGZpcnN0IHRoZSBjb3B5IGVsZW1lbnRcbiAgICAgICAgICAgIGxldCBjb3B5RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvZGVTdHIuY29weUlEKVxuICAgICAgICAgICAgaWYgKGNvcHlFbGVtZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTm8gdGFnIFwiJHtjb2RlU3RyLmNvcHlJRH1gKVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvcHlFbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiB7IHRoaXMub25DbGlja0NvcHkoY29kZVN0ci5jb3B5SUQpIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdGhlbiB0aGUgcnVuIGVsZW1lbnRcbiAgICAgICAgICAgIGxldCBydW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29kZVN0ci5ydW5JRClcbiAgICAgICAgICAgIGlmIChydW5FbGVtZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTm8gdGFnIFwiJHtjb2RlU3RyLnJ1bklEfWApXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcnVuRWxlbWVudC5vbmNsaWNrID0gKCkgPT4geyB0aGlzLm9uQ2xpY2tDb3B5KGNvZGVTdHIuY29weUlEKSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9XG5cblxuICAgIG1vZHVsZUluZm8oKTogbW9kdWxlSW5mbyB7ICAgICAgICAvLyAgZnVuY3Rpb246IHR5cGUgcmV0dXJucyBvYmplY3QgXG4gICAgICAgIHJldHVybiBtb2R1bGVJbmZvXG4gICAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxubGV0IGhhbGZNb25hY29XaWR0aCA9IDgwMCAgIC8vIGFsd2F5cy4gIGlmIHlvdSBjaGFuZ2UsIHRoZW4gYWxzbyBjaGFuZ2UgdGhlIGNzcyBmaWxlICguaGFsZk1vbmFjbylcbmxldCBiYWtlcnlUaWNrZXQ6IG51bWJlciA9IDBcblxuaW50ZXJmYWNlIElBdHRyaWJ1dGUgeyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfVxuXG5cblxuLyoqIGFic3RyYWN0IGNsYXNzIGZvciBhZGRpbmcgbGVzc29uIHNlY3Rpb25zLiAgdXNlIGNvbmNyZXRlIGNsYXNzIGxpa2Ugc2VjdGlvblZUNTIgKi9cbmFic3RyYWN0IGNsYXNzIExlc3NvblNlY3Rpb25zIHtcbiAgICBwdWJsaWMgdGt0OiBudW1iZXIgIC8vIGJha2VyeSB0aWNrZXQgZm9yIHRoaXMgc2VjdGlvblxuICAgIHB1YmxpYyBzZWN0aW9uTmFtZTogc3RyaW5nIC8vICdzZWN0MDA0JyBvciBzaW1pbGFyXG4gICAgcHVibGljIGVkaXRvcjogYW55IC8vIHVzZWQgYnkgbW9uYWNvIGVkaXRvclxuXG4gICAgY29uc3RydWN0b3IodGFnOiBJVGFnKSB7XG4gICAgICAgIHRoaXMudGt0ID0gYmFrZXJ5VGlja2V0KysgICAgICAgLy8gdW5pcXVlIGJha2VyeSB0aWNrZXRcbiAgICAgICAgdGhpcy5zZWN0aW9uTmFtZSA9IHRoaXMuZGl2TmFtZSgnc2VjdCcsIHRoaXMudGt0KVxuICAgIH1cblxuICAgIC8qKiBmb3JtYXQgYSBjbGFzcyBvciBpZCBpbnRvIHNvbWV0aGluZyBsaWtlICdzZWN0MDA1JyAqL1xuICAgIGRpdk5hbWUocHJlZml4OiBzdHJpbmcsIHRrdDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiAocHJlZml4ICsgKFwiMDBcIiArIHRrdCkuc2xpY2UoLTMpKSAgIC8vIHByZWZpeCArIDMtZGlnaXQgdGt0XG4gICAgfVxuXG4gICAgLyoqIGNyZWF0ZSBhIG5ldyBub2RlICAqL1xuICAgIG5vZGUobmV3RWxlbWVudDogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcgfCBIVE1MRWxlbWVudCwgbmV3SWQ6IHN0cmluZyA9ICcnLCBjbGFzc05hbWU6IHN0cmluZyA9ICcnLCBhdHRyaWJ1dGVzOiBJQXR0cmlidXRlW10gPSBbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IG5vZGU6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuZXdFbGVtZW50KVxuICAgICAgICBpZiAoY2xhc3NOYW1lLmxlbmd0aCA+IDApIHsgbm9kZS5jbGFzc05hbWUgPSBjbGFzc05hbWUgfVxuICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnICYmIGNvbnRlbnQubGVuZ3RoID4gMCkgeyBub2RlLmlubmVySFRNTCA9IGNvbnRlbnQgfVxuICAgICAgICBpZiAobmV3SWQubGVuZ3RoID4gMCkgeyBub2RlLmlkID0gbmV3SWQgfVxuICAgICAgICAvLyBwYXN0ZSBpbiBhbnkgYXR0cmlidXRlcy4uLlxuICAgICAgICBhdHRyaWJ1dGVzLmZvckVhY2goKGVsZW1lbnQpID0+IHsgICAvLyBjYW4gYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXlcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd0eXBlb2YgZWxlbWVudCcsIHR5cGVvZiBlbGVtZW50KVxuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoZWxlbWVudC5uYW1lLCBlbGVtZW50LnZhbHVlKVxuICAgICAgICB9KVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnbm9kZScsIG5vZGUpXG4gICAgICAgIHJldHVybiAobm9kZSlcbiAgICB9XG5cbiAgICAvKiogYXR0YWNoIG5vZGUgdG8gZXhpc3RpbmcgSUQgKi9cbiAgICBhdHRhY2goZXhpc3RpbmdJZDogc3RyaW5nLCBwQ29udGVudDogc3RyaW5nLCBwSWQ6IHN0cmluZywgcENsYXNzTmFtZTogc3RyaW5nLCBhTm9kZTogSFRNTEVsZW1lbnRbXSkge1xuICAgICAgICBsZXQgdGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXhpc3RpbmdJZClcbiAgICAgICAgaWYgKHRhZyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTm8gdGFnIFwiJHtleGlzdGluZ0lkfWApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBhbHdheXMgd3JhcCB0aGUgbmV3IGVsZW1lbnRzIGluIGEgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgIGxldCBwRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpXG4gICAgICAgICAgICBpZiAocENsYXNzTmFtZS5sZW5ndGggPiAwKSB7IHBFbGVtZW50LmNsYXNzTmFtZSA9IHBDbGFzc05hbWUgfVxuICAgICAgICAgICAgaWYgKHBDb250ZW50Lmxlbmd0aCA+IDApIHsgcEVsZW1lbnQuaW5uZXJIVE1MID0gcENvbnRlbnQgfVxuICAgICAgICAgICAgaWYgKHBJZC5sZW5ndGggPiAwKSB7IHBFbGVtZW50LmlkID0gcElkIH1cbiAgICAgICAgICAgIGxldCBwVGFnID0gdGFnLmFwcGVuZENoaWxkKHBFbGVtZW50KVxuXG4gICAgICAgICAgICAvLyBub3cgaWYgdGhlcmUgYXJlIGFueSBlbGVtZW50cyB0byBwdXQgYmVsb3cgKHBlcmhhcHMgZGl2J3MpXG4gICAgICAgICAgICBhTm9kZS5mb3JFYWNoKChlbGVtZW50KSA9PiB7ICAgLy8gY2FuIGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3R5cGVvZiBlbGVtZW50JywgdHlwZW9mIGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgcFRhZy5hcHBlbmRDaGlsZChlbGVtZW50KSAgLy8gaW5zaWRlIHRoZSA8cD48L3A+XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKiogc2V0IHVwIGJhc2ljIHBhcmVudC9sZWZ0L3JpZ2h0IGRpdnMsIHdpdGggc3BlY2lmaWMgY2xhc3MgKi9cbiAgICBiYXNpY0xlZnRSaWdodCh0aGlzU2VjdGlvbklEOiBzdHJpbmcsIHBhcmVudENsYXNzTmFtZTogc3RyaW5nLCBsZWZ0Q2xhc3NOYW1lOiBzdHJpbmcsIHJpZ2h0Q2xhc3NOYW1lOiBzdHJpbmcpIHtcblxuICAgICAgICBsZXQgc2VjdGlvbiA9IHRoaXMuZGl2TmFtZShcInNlY3RcIiwgdGhpcy50a3QpXG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5kaXZOYW1lKFwibGVmdFwiLCB0aGlzLnRrdClcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5kaXZOYW1lKFwicmlnaHRcIiwgdGhpcy50a3QpXG5cbiAgICAgICAgdGhpcy5hdHRhY2goJ2xlc3NvbicsICcnLCBwYXJlbnRDbGFzc05hbWUsIHNlY3Rpb24sIFtcbiAgICAgICAgICAgIHRoaXMubm9kZSgnRElWJywgJycsIGxlZnQsIGxlZnRDbGFzc05hbWUpLFxuICAgICAgICAgICAgdGhpcy5ub2RlKCdESVYnLCAnJywgcmlnaHQsIHJpZ2h0Q2xhc3NOYW1lKSxcbiAgICAgICAgXSlcblxuICAgIH1cblxufVxuXG5jbGFzcyBTZWN0aW9uTW9kdWxlIGV4dGVuZHMgTGVzc29uU2VjdGlvbnMgeyAgICAgLy8gcGFpbnRzIHRoZSBtZW51YmFyIGF0IHRoZSB0b3BcblxuICAgIGNvbnN0cnVjdG9yKHNlY3Rpb246IElUYWcpIHtcbiAgICAgICAgc3VwZXIoc2VjdGlvbilcblxuICAgICAgICAvLyByZXRyaWV2ZSB0aGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHVzZXJcbiAgICAgICAgbGV0IHVzZXJJRCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2lkJylcbiAgICAgICAgbGV0IHVzZXJOYW1lID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnbmFtZScpXG4gICAgICAgIGxldCB1c2VyVXNlck5hbWUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpXG4gICAgICAgIGxldCB1c2VyTGV2ZWwgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdsZXZlbCcpXG4gICAgICAgIGxldCB1c2VyUm9sZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3JvbGUnKVxuICAgICAgICBsZXQgdXNlclRlYWNoZXJJRCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3RlYWNoZXJJRCcpXG4gICAgICAgIGxldCB1c2VyU2Nob29sSUQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzY2hvb2xJRCcpXG5cblxuICAgICAgICBsZXQgdXNlcjNkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnM2QnKVxuICAgICAgICBsZXQgdXNlcjNkRGlzdCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJzNkRGlzdCcpXG4gICAgICAgIGxldCB1c2VySm9vbWxhID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnSm9vbWxhJylcbiAgICAgICAgbGV0IHVzZXJDb2RlUGF0aCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJzNkQ29kZVBhdGgnKVxuXG4gICAgICAgIG1vZHVsZUluZm8ubW9kdWxlID0gc2VjdGlvbi50ZXh0dmFsdWUgIC8vIHNhdmVcblxuICAgICAgICAvLyB0ZW1wb3JhcnkgdW50aWwgd2UgbGluayB0byBKb29tbGFcbiAgICAgICAgdXNlcjNkID0gJ2h0dHA6Ly9sb2NhbGhvc3QvM2QnXG5cbiAgICAgICAgbGV0IEhUTUwgPSAnJ1xuXG4gICAgICAgIC8vIHB1dCB1cCBvdXIgbG9nbyAgICBcbiAgICAgICAgSFRNTCArPSBgPGRpdiBjbGFzcz0naGVhZGVyJz48Yj5HYW1lQ29kZSZuYnNwOyZuYnNwOzwvYj48YnI+PGltZyBzdHlsZT1cImhlaWdodDo3MHB4O1wiIHNyYyA9IFwiJHtjb25maWcuYXNzZXRVUkl9L2ltYWdlcy9sb2dvLnBuZ1wiPiA8L2E+PC9kaXY+YFxuXG5cbiAgICAgICAgLy8gYWx3YXlzIGhhdmUgYSBob21lIGJ1dHRvblxuICAgICAgICBIVE1MICs9IGA8ZGl2IGNsYXNzPSdoZWFkZXInPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3VzZXIzZH1cIj4gPGltZyBoZWlnaHQ9XCIyMHB4XCIgd2lkdGggPSBcIjIwcHhcIiBzcmMgPSBcIiR7Y29uZmlnLmFzc2V0VVJJfS9pbWFnZXMvaG9tZS5wbmdcIiBkYXRhIC0gdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlID0gXCJIb21lXCIgPjwvYT4gXG4gICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3VzZXIzZH1cIj48aW1nIGhlaWdodD1cXFwiMjBweFxcXCIgd2lkdGg9XFxcIjIwcHhcXFwiIHNyYz1cXFwiJHtjb25maWcuYXNzZXRVUkl9L2ltYWdlcy9zaHV0ZG93bi5wbmdcXFwiIGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIiB0aXRsZT1cXFwiTG9nb3V0XFxcIiA+PC9hPlxuICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHt1c2VyM2R9XCI+PGltZyBoZWlnaHQ9XFxcIjIwcHhcXFwiIHdpZHRoPVxcXCIyMHB4XFxcIiBzcmM9XFxcIiR7Y29uZmlnLmFzc2V0VVJJfS9pbWFnZXMvYWJvdXQucG5nXFxcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgdGl0bGU9XFxcIkFib3V0XFxcIiA+PC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcblxuXG4gICAgICAgIC8vIHNob3cgdGhlIGN1cnJlbnQgbGVzc29uXG4gICAgICAgIEhUTUwgKz0gYDxkaXYgY2xhc3M9J2hlYWRlcic+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZ3JlZW5idXR0b25cIiA+ICR7c2VjdGlvbi50ZXh0dmFsdWV9IDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzcyA9IFwiZ3JlZW5idXR0b25cIiBhY3Rpb249XCIvYWN0aW9uX3BhZ2UucGhwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IG5hbWU9XCJjYXJzXCIgaWQ9XCJjYXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInZvbHZvXCI+SW50cm9kdWNpb248L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwib3BlbFwiPkJhc2ljIEphdmFzY3JpcHQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic2FhYlwiPk11bHRpcGx5IEdhbWU8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgXG4gICAgICAgICAgICA8L2Rpdj5gXG5cblxuICAgICAgICAvLyBhZGQgYSBsaW5rIHRvIFNMQUNLIG9yIERJU0NPUkQgICAgICAgIFxuICAgICAgICBIVE1MICs9IGA8ZGl2IGNsYXNzPSdoZWFkZXInPjxiPi4uIGZvciBoZWxwPC9iPjxicj5gXG4gICAgICAgIGlmIChjb25maWcuaGVscGxpbmUgPT0gJ1NsYWNrJykge1xuICAgICAgICAgICAgSFRNTCArPSBgPGEgaHJlZiA9IFwiaHR0cHM6Ly9jb21tdW5pdHlyZWFkaW5nLnNsYWNrLmNvbVwiIHRhcmdldCA9IFwiX2JsYW5rXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT1cImhlaWdodDozMHB4XCIgc3JjID0gXCIke2NvbmZpZy5hc3NldFVSSX0vaW1hZ2VzL3NsYWNrLnBuZ1wiPiA8L2E+YFxuICAgICAgICB9IGVsc2UgeyAgICAvLyBEaXNjb3JkXG4gICAgICAgICAgICBIVE1MICs9IGA8YSBocmVmID0gXCJodHRwczovL2NvbW11bml0eXJlYWRpbmcuZGlzY29yZC5jb21cIiB0YXJnZXQgPSBcIl9ibGFua1wiID5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT1cImhlaWdodDozMHB4O1wiIHNyYyA9IFwiJHtjb25maWcuYXNzZXRVUkl9L2ltYWdlcy9kaXNjb3JkLnBuZ1wiPiA8L2E+YFxuICAgICAgICB9XG5cbiAgICAgICAgSFRNTCArPSBgPGJyPjxhIGhyZWY9XCJodHRwczovL2NvbW11bml0eXJlYWRpbmcub3JnL2JhYnlkb2NzL1wiPjxiPjxzcGFuIHN0eWxlPVwiZm9udC12YXJpYW50OiBzbWFsbC1jYXBzO1wiPmJhYnkgYXBpPC9zcGFuPjwvYj4gPC9hPmBcbiAgICAgICAgSFRNTCArPSBgPC9kaXY+YFxuXG5cblxuICAgICAgICAvL3NlY3Rpb24udGV4dHZhbHVlXG5cblxuICAgICAgICAvLyBjcmVhdGUgdGhlIHRleHR2YWx1ZSBmb3IgdGhlIGVudGlyZSBoZWFkZXIsIGFuZCBwb3AgaXQgaW50byB0aGUgcGFnZVxuXG4gICAgICAgIHRoaXMuYXR0YWNoKCdsZXNzb24nLCAnJywgJycsICcnLCBbXG4gICAgICAgICAgICB0aGlzLm5vZGUoJ2RpdicsIEhUTUwsICcnLCAnbW9kYmFyJyksXG4gICAgICAgIF0pXG5cblxuICAgICAgICAvLyAvLyB0aGUgJ2hvbWUnIGJ1dHRvbiBydW5zIHlvdSBiYWNrIHRvIEpvb21sYSdzIGhvbWUgcGFnZVxuICAgICAgICAvLyAvLyB0aGUgJ2xvZ29mZicgYnV0dG9uIHNpbWlsYXJseS4gIGlmIHlvdSBhcmUgaW4gYSBsZXNzb24sIHRoZW4gQUxXQVlTIGxvZ2dlZCBpblxuICAgICAgICAvLyAkY3VycmVudExlc3NvbiA9ICcwMSAtIExlYXJuIEphdmFzY3JpcHQnO1xuICAgICAgICAvLyAkSFRNTC49IDw8IDxFT1RcblxuXG5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgPCAhLS0gICAgPCBiciAvPlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9qb2luLnNsYWNrLmNvbS90L2NvbW11bml0eXJlYWRpbmcvc2hhcmVkX2ludml0ZS9lblF0TXpZMk1UVTROemN6T0RjeUxUSmhPREZsTURVM09HUTRZelEzTWpZeU5HTmpOMkZoTlRVM1l6Y3lORGhsTVRNMU1tWmpOekUxT1RBM1pUTXdNMlJtTlRneE5UazVZemN3TVdNeE9EWVwiID4gSm9pbiBTbGFjayA8IC9hPlxuICAgICAgICAvLyAtLT5cblxuICAgICAgICAvLyAgICAgPC90ZD5cbiAgICAgICAgLy8gICAgIDwgL3RyPjwvdGFibGUgPlxuXG5cbiAgICB9XG59XG5cblxuY2xhc3MgU2VjdGlvbkxlc3NvbiBleHRlbmRzIExlc3NvblNlY3Rpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uOiBJVGFnKSB7XG4gICAgICAgIHN1cGVyKHNlY3Rpb24pXG4gICAgICAgIG1vZHVsZUluZm8ubGVzc29uID0gc2VjdGlvbi50ZXh0dmFsdWUgICAgICAvLyBqdXN0IHNhbWUgdGhlIGxlc3NvbiBuYW1lXG4gICAgfVxufVxuXG5cbmNsYXNzIFNlY3Rpb25TaG9ydERlc2MgZXh0ZW5kcyBMZXNzb25TZWN0aW9ucyB7XG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbjogSVRhZykge1xuICAgICAgICBzdXBlcihzZWN0aW9uKVxuICAgICAgICBtb2R1bGVJbmZvLnNob3J0RGVzYyA9IHNlY3Rpb24udGV4dHZhbHVlICAgICAgLy8ganVzdCBzYW1lIHRoZSBsZXNzb24gbmFtZVxuXG4gICAgICAgIHRoaXMuYXR0YWNoKCdsZXNzb24nLCAnJywgJycsICcnLCBbXG4gICAgICAgICAgICB0aGlzLm5vZGUoJ1AnLCBgU1VNTUFSWSAtICR7c2VjdGlvbi50ZXh0dmFsdWV9YCxcbiAgICAgICAgICAgICAgICAnJywgJycsIFt7IG5hbWU6ICdzdHlsZScsIHZhbHVlOiAnYmFja2dyb3VuZC1jb2xvcjpsaWdodHNhbG1vbicgfV0pLFxuICAgICAgICBdKVxuXG4gICAgfVxufVxuXG5cblxuXG5jbGFzcyBTZWN0aW9uTXlzdGVyeSBleHRlbmRzIExlc3NvblNlY3Rpb25zIHsgICAvLyB3ZSBkb24ndCBrbm93IHdoYXQgdGhpcyBzZWN0aW9uIGlzIC0gY2VydGFpbmx5IGFuIGVycm9yXG5cbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uOiBJVGFnKSB7XG4gICAgICAgIHN1cGVyKHNlY3Rpb24pXG5cbiAgICAgICAgdGhpcy5hdHRhY2goJ2xlc3NvbicsICcnLCAnJywgJycsIFtcblxuICAgICAgICAgICAgdGhpcy5ub2RlKCdQJywgYFVua25vd24gdGFnIC0gJHtzZWN0aW9uLnRhZ30gd2l0aCByYXd2YWx1ZSAke3NlY3Rpb24ucmF3dmFsdWV9IDwvc3Bhbj5gLFxuICAgICAgICAgICAgICAgICcnLCAnJywgW3sgbmFtZTogJ3N0eWxlJywgdmFsdWU6ICdiYWNrZ3JvdW5kLWNvbG9yOnBpbmsnIH1dKSxcbiAgICAgICAgXSlcbiAgICB9XG59XG5cblxuY2xhc3MgU2VjdGlvbkNvZGUgZXh0ZW5kcyBMZXNzb25TZWN0aW9ucyB7XG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbjogSVRhZykge1xuICAgICAgICBzdXBlcihzZWN0aW9uKVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY29uZmlnIGxpbmVzJywgc2VjdGlvbi5wYXJhbXNbJ2xpbmVzJ10pXG5cbiAgICAgICAgLy9UT0RPOiA8Y29kZVxuICAgICAgICAvLyAgICAobGluZXM9NikgLy8gb25seSBzaG93IG4gbGluZXMgKGluZGljYXRlIHRoZXJlIGFyZSBtb3JlKVxuICAgICAgICAvLyAgICAobm9TaG93KSAgLy8ganVzdCBhIGNvcHkgb3IgcnVuIGJ1dHRvblxuICAgICAgICAvLyAgICAobm9SdW4pICAgLy8gbm90IHJ1bm5hYmxlIGNvZGUsIG5vIGNvcHkgb3IgcnVuIGJ1dHRvbnNcblxuXG4gICAgICAgIC8vIHRoaXMuYmFzaWNMZWZ0UmlnaHQodGhpcy5kaXZOYW1lKCdjb2RlJywgdGhpcy50a3QpLFxuICAgICAgICAvLyAgICAgdGhpcy5zZWN0aW9uTmFtZSwgdGhpcy5kaXZOYW1lKFwibW9uYWNvXCIsIHRoaXMudGt0KSwgdGhpcy5kaXZOYW1lKFwid29ybGRcIiwgdGhpcy50a3QpKSAgLy8gc3BlY2lmaWVzIHRoZSBESVYgc3R5bGVzIChub3QgdGhlIElEcylcblxuXG4gICAgICAgIC8vIGlmIG9wdGlvbiAnbm9lZGl0JywgdGhlbiBqdXN0IGRpc3BsYXkgY29kZVxuICAgICAgICAvLyBpZiAoJ25vZWRpdCcgaW4gc2VjdGlvbi5wYXJhbXMpIHtcbiAgICAgICAgLy8gICAgIGxldCB0ZXh0ID0gc2VjdGlvbi5yYXd2YWx1ZS5yZXBsYWNlKC8oPzpcXHJcXG58XFxyfFxcbikvZywgJzxicj4nKVxuICAgICAgICAvLyAgICAgaWYgKHRleHQuc3RhcnRzV2l0aCgnPGJyPicpKSB7IHRleHQgPSB0ZXh0LnNsaWNlKDQpIH0gIC8vIHN0cmlwIGxlYWRpbmcgPGJyPlxuXG4gICAgICAgIC8vICAgICB0aGlzLmF0dGFjaCh0aGlzLnNlY3Rpb25OYW1lLCAnJywgdGhpcy5kaXZOYW1lKCdub2NvZGUnLCB0aGlzLnRrdCksICcnLCBbXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ub2RlKCdQJywgYDx0M2RfY29kZWJsb2NrPiR7dGV4dH08L3QzZF9jb2RlYmxvY2s+YCwgJycsICcnKSxcbiAgICAgICAgLy8gICAgIF0pXG4gICAgICAgIC8vIH0gZWxzZSB7XG5cbiAgICAgICAgLy8gY3JlYXRlIGEgbW9uYWNvIGVkaXRvciBvbiB0aGUgbGVmdCBzaWRlXG4gICAgICAgIGxldCBpbml0aWFsQ29kZSA9IHNlY3Rpb24ucmF3dmFsdWUudHJpbVJpZ2h0KClcblxuXG4gICAgICAgIGluaXRpYWxDb2RlID0gaW5pdGlhbENvZGUucmVwbGFjZUFsbChg4oCcYCwgYFwiYCkgICAvLyByZXBsYWNlIHdlYiBxdW90ZXMgd2l0aCBwcm9wZXIgZG91YmxlLXF1b3Rlc1xuICAgICAgICBpbml0aWFsQ29kZSA9IGluaXRpYWxDb2RlLnJlcGxhY2VBbGwoYOKAnWAsIGBcImApICAgLy8gcmVwbGFjZSB3ZWIgcXVvdGVzIHdpdGggcHJvcGVyIGRvdWJsZS1xdW90ZXNcbiAgICAgICAgaW5pdGlhbENvZGUgPSBpbml0aWFsQ29kZS5yZXBsYWNlQWxsKGDigJhgLCBgJ2ApICAgLy8gcmVwbGFjZSB3ZWIgcXVvdGVzIHdpdGggcHJvcGVyIHNpbmdsZS1xdW90ZXNcbiAgICAgICAgaW5pdGlhbENvZGUgPSBpbml0aWFsQ29kZS5yZXBsYWNlQWxsKGDigJlgLCBgJ2ApICAgLy8gcmVwbGFjZSB3ZWIgcXVvdGVzIHdpdGggcHJvcGVyIHNpbmdsZS1xdW90ZXNcblxuXG4gICAgICAgIGxldCB0YWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmRpdk5hbWUoJ2xlZnQnLCB0aGlzLnRrdCkpXG4gICAgICAgIGxldCBuTGluZXMgPSBwYXJzZUZsb2F0KHNlY3Rpb24ucGFyYW1zWydsaW5lcyddKSAgLy8gd2Uga25vdyBpdCdzIGEgc3RyaW5nLCBidXQgdHlwZXNjcmlwdCBkb2Vzbid0XG5cbiAgICAgICAgaWYgKGluaXRpYWxDb2RlLmNoYXJDb2RlQXQoMCkgPT0gMTApIHsgICAvLyBsZWFkaW5nIExGP1xuICAgICAgICAgICAgaW5pdGlhbENvZGUgPSBpbml0aWFsQ29kZS5zdWJzdHIoMSlcbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnaW5pdGlhbGNvJywgaW5pdGlhbENvZGUsIGluaXRpYWxDb2RlLmNoYXJDb2RlQXQoMCkpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdhYm91dCB0byBjcmVhdGUgdGhlIGVkaXRvcicpXG4gICAgICAgIC8vIHRoaXMuZWRpdG9yID0gbmV3IEVkaXRvckluc3RhbmNlKGluaXRpYWxDb2RlLCB0YWcsIGhhbGZNb25hY29XaWR0aCwgbkxpbmVzKVxuXG4gICAgICAgIC8vIGlmIHdlIHdhbnQgbGluZSBudW1iZXJzLCB3ZSBqdXN0IGFkZCB0aGVtIG91cnNlbHZlc1xuICAgICAgICBpbml0aWFsQ29kZSA9IGluaXRpYWxDb2RlXG4gICAgICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICAubWFwKChsaW5lLCBudW0pID0+IGAkeyhudW0gKyAxKS50b1N0cmluZygpLnBhZFN0YXJ0KDMsICcgJyl9ICAgICR7bGluZX1gKSAgLy8gXG4gICAgICAgICAgICAuam9pbignXFxuJyk7XG5cblxuICAgICAgICBjb25zdCBodG1sID0gUHJpc20uaGlnaGxpZ2h0KGluaXRpYWxDb2RlLCBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdCwgJ2phdmFzY3JpcHQnKTtcbiAgICAgICAgbGV0IGNvcHlJRCA9IHRoaXMuZGl2TmFtZSgnY29weScsIHRoaXMudGt0KSAgLy8gY29kZTAxOSBvciBzaW1pbGFyXG4gICAgICAgIGxldCBydW5JRCA9IHRoaXMuZGl2TmFtZSgncnVuJywgdGhpcy50a3QpICAvLyBjb2RlMDE5IG9yIHNpbWlsYXJcblxuICAgICAgICAvLyBhbmQgc2F2ZSB0aGUgc3BlZWNoIGluIHRoZSB1dHRlcmFuY2VzIGFycmF5XG4gICAgICAgIGNvZGVTdHJpbmdzLnB1c2goeyBjb3B5SUQ6IGNvcHlJRCwgcnVuSUQ6IHJ1bklELCBjb2RlOiBpbml0aWFsQ29kZSB9KVxuICAgICAgICAvLyBjb25zb2xlLmxvZygncHVzaCBjb2RlU3RyaW5ncycsIGNvcHlJRCwgcnVuSUQsIGluaXRpYWxDb2RlKVxuXG5cbiAgICAgICAgbGV0IGV4cGFuZEh0bWw6IHN0cmluZyA9ICcnXG5cbiAgICAgICAgaWYgKCEoJ25vcnVuJyBpbiBzZWN0aW9uLnBhcmFtcykpIHsgICAgIC8vIHNvbWV0aW1lcyB3ZSBkb24ndCB3YW50IHRvIHJ1blxuICAgICAgICAgICAgZXhwYW5kSHRtbCArPSAvLyBzdGFydCB3aXRoIHRoZSBjb3B5IGEgbmQgcnVuIGljb25zXG4gICAgICAgICAgICAgICAgYDxkaXYgc3R5bGU9J2Zsb2F0OmxlZnQ7Jz5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBpZD0nJHtjb3B5SUR9JyBzdHlsZT0naGVpZ2h0OjI0cHg7cG9zaXRpb246YWJzb2x1dGU7JyBzcmM9Jy4uL2Fzc2V0cy9pbWFnZXMvY29weS5wbmcnIHRpdGxlPSdDb3B5IHRvIEVkaXRvcicgLz5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBpZD0nJHtydW5JRH0nIHN0eWxlPSdoZWlnaHQ6MjRweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6IDMycHg7bGVmdDotMnB4Oycgc3JjPScuLi9hc3NldHMvaW1hZ2VzL3J1bi5wbmcnIHRpdGxlPSdSdW4gaW4gQ2FudmFzJyAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgfVxuXG4gICAgICAgIGV4cGFuZEh0bWwgKz0gICAgLy8gYWRkIGluIHRoZSBjb2RlIGl0c2VsZlxuICAgICAgICAgICAgYDxkaXYgY2xhc3M9J2VkaXRsZWZ0Jz48Y29kZT4ke2h0bWx9PC9jb2RlPjwvZGl2PmBcblxuICAgICAgICB0aGlzLmF0dGFjaCgnbGVzc29uJywgJycsIHRoaXMuZGl2TmFtZSgnY29kZScsIHRoaXMudGt0KSwgJ2NvZGUnLCBbXG4gICAgICAgICAgICB0aGlzLm5vZGUoJ1AnLCBleHBhbmRIdG1sLCAnJywgJycpLFxuICAgICAgICBdKVxuXG5cbiAgICAgICAgLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAvLyAvLyB0dXJuIG9uIHZhbGlkYXRpb24gKHByb2JhYmx5IG9uIGJ5IGRlZmF1bHQpXG4gICAgICAgIC8vIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuc2V0RGlhZ25vc3RpY3NPcHRpb25zKHtcbiAgICAgICAgLy8gICAgIG5vU2VtYW50aWNWYWxpZGF0aW9uOiBmYWxzZSxcbiAgICAgICAgLy8gICAgIG5vU3ludGF4VmFsaWRhdGlvbjogZmFsc2UsXG4gICAgICAgIC8vIH0pXG5cblxuXG5cbiAgICAgICAgLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAvLyAvLyBhZGQgZXh0cmEgbGlicmFyaWVzXG4gICAgICAgIC8vIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC50eXBlc2NyaXB0RGVmYXVsdHMuYWRkRXh0cmFMaWIoW1xuICAgICAgICAvLyAgICAgJ2RlY2xhcmUgY2xhc3MgRmFjdHMgeycsXG4gICAgICAgIC8vICAgICAnICAgIC8qKicsXG4gICAgICAgIC8vICAgICAnICAgICAqIFJldHVybnMgdGhlIG5leHQgZmFjdCcsXG4gICAgICAgIC8vICAgICAnICAgICAqLycsXG4gICAgICAgIC8vICAgICAnICAgIHN0YXRpYyBuZXh0KCk6c3RyaW5nJyxcbiAgICAgICAgLy8gICAgICd9JyxcbiAgICAgICAgLy8gXS5qb2luKCdcXG4nKSwgJ2ZpbGVuYW1lL2ZhY3RzLmQudHMnKTtcblxuXG4gICAgICAgIC8vIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC50eXBlc2NyaXB0RGVmYXVsdHMuc2V0Q29tcGlsZXJPcHRpb25zKGRlZmF1bHRDb21waWxlck9wdGlvbnMpXG5cblxuXG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgb25EZXN0cm95KCkgeyB9XG5cbn1cblxuXG5jbGFzcyBTZWN0aW9uUCBleHRlbmRzIExlc3NvblNlY3Rpb25zIHsgICAvLyA8cD4gd2l0aCBzcGVha2VyIGFuZFxuICAgIHB1YmxpYyB1dHRlcjogc3RyaW5nID0gJydcblxuICAgIG5vZGVzOiBhbnlbXSA9IFtdICAgICAgICAgIC8vIGJ1aWxkIHVwIHRoZSBwYXJ0cyBvZiB0aGUgZGl2IHRoYXQgd2UgbmVlZFxuICAgIG9yaWdpbmFsU2VjdGlvbjogSVRhZ1xuICAgIHV0dGVySWQ6IHN0cmluZ1xuXG4gICAgLy9UT0RPOiAgcChydW4pICAvLyBpbW1lZGlhdGVseSBydW4gdGhlIGNvZGUgcGFydCBvZiB0aGUgc2VjdGlvbiBvbiBjbGlja2luZyB0aGUgdXR0ZXJhbmNlXG5cbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uOiBJVGFnKSB7XG4gICAgICAgIHN1cGVyKHNlY3Rpb24pXG5cbiAgICAgICAgLy8gdGhlIHV0dGVySWQgaXMgY29uc3RhbnQgYWNyb3NzIG11bHRpcGxlIDxwPnNcbiAgICAgICAgdGhpcy51dHRlcklkID0gdGhpcy5kaXZOYW1lKCd1dHRlcicsIHRoaXMudGt0KVxuXG4gICAgICAgIGxldCB0ZXh0ID0gc2VjdGlvbi50ZXh0dmFsdWVcblxuICAgICAgICB0aGlzLm9yaWdpbmFsU2VjdGlvbiA9IHNlY3Rpb24gLy8gd2Ugd2lsbCBuZWVkIGl0IFxuICAgICAgICAvLyB0aGlzLmFkZFNpbmdsZVBhcmFncmFwaChzZWN0aW9uKVxuICAgICAgICAvLyB0aGlzLmZpbmFsQXR0YWNoVG9EaXYoKVxuICAgIH1cblxuICAgIC8vIDxwPiBnZXQgZ3JvdXBlZCB0b2dldGhlciBpbiBhIHNpbmdsZSA8RElWPi4gIHNvIHdlIG9mZmVyIFxuICAgIC8vIGEgbWV0aG9kIHRoYXQgYWRkcyBhIHNpbmdsZSA8UD4gcGFyYWdyYXBoIGFuZCBhbm90aGVyIHRoYXQgY2xvc2VzIHRoZSA8RElWPlxuXG4gICAgYWRkU2luZ2xlUGFyYWdyYXBoKGN1cnJlbnRTZWN0aW9uOiBJVGFnKSB7XG5cblxuICAgICAgICAvLyBzcGVlY2ggaWNvblxuICAgICAgICBpZiAoJ1NwZWVjaEljb24nIGluIGN1cnJlbnRTZWN0aW9uLnBhcmFtcykgeyAgICAvLyBmaXJzdCBvciBjb250aW51YXRpb24/XG4gICAgICAgICAgICAvLyBub2Rlcy5wdXNoKHRoaXMubm9kZSgnRElWJywgJycsICcnLCAncHJlc3BlYWtlcicpKVxuICAgICAgICAgICAgdGhpcy5ub2Rlcy5wdXNoKHRoaXMubm9kZSgnSU1HJywgJycsIHRoaXMudXR0ZXJJZCwgJ3NwZWFrZXInLCBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnc3JjJywgdmFsdWU6IFwiLi4vYXNzZXRzL2ltYWdlcy9zcGVha2VyLnBuZ1wiIH1cbiAgICAgICAgICAgICAgICAvLyAsXG4gICAgICAgICAgICAgICAgLy8geyBuYW1lOiAnb25jbGljaycsIHZhbHVlOiBgY29uc29sZS5sb2coZ2xvYmFsVGhpcyk7b25DbGlja1NheShcInRoaXMgaXMgYSB0ZXN0XCIpYCB9LFxuICAgICAgICAgICAgXSkpXG5cbiAgICAgICAgICAgIC8vIGFuZCBzYXZlIHRoZSBzcGVlY2ggaW4gdGhlIHV0dGVyYW5jZXMgYXJyYXlcbiAgICAgICAgICAgIHV0dGVyYW5jZXMucHVzaCh7IGlkOiB0aGlzLnV0dGVySWQsIHRleHQ6IGN1cnJlbnRTZWN0aW9uLnNwZWVjaHZhbHVlICsgXCIgLlwiIH0pXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGp1c3QgYWRkIHRoZSB2b2ljZSB0ZXh0IHRvIHRoZSBwcmV2aW91cyB1dHRlcmFuY2VcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1V0dGVyYW5jZSA9IHV0dGVyYW5jZXMucG9wKClcbiAgICAgICAgICAgIGlmIChwcmV2aW91c1V0dGVyYW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNVdHRlcmFuY2UudGV4dCArPSAnLiAnICsgY3VycmVudFNlY3Rpb24uc3BlZWNodmFsdWVcbiAgICAgICAgICAgICAgICB1dHRlcmFuY2VzLnB1c2gocHJldmlvdXNVdHRlcmFuY2UpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLy8gcmlnaHQgc2lkZSBpbWFnZVxuICAgICAgICBpZiAoJ2ltZycgaW4gY3VycmVudFNlY3Rpb24ucGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVzLnB1c2godGhpcy5ub2RlKCdJTUcnLCAnJywgJycsICdwaW1hZ2UnLCBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnc3JjJywgdmFsdWU6IGN1cnJlbnRTZWN0aW9uLnVybCB9LFxuICAgICAgICAgICAgXSkpXG4gICAgICAgIH1cbiAgICAgICAgLy8gcmlnaHQgc2lkZSB2aWRlb1xuICAgICAgICBpZiAoJ3ZpZGVvJyBpbiBjdXJyZW50U2VjdGlvbi5wYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZXMucHVzaCh0aGlzLm5vZGUoJ3ZpZGVvJywgJycsICcnLCAndmltYWdlJywgW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogJ3NyYycsIHZhbHVlOiBjdXJyZW50U2VjdGlvbi51cmwgfSxcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICd3aWR0aCcsIHZhbHVlOiBcIjMyMFwiIH0sXG4gICAgICAgICAgICAgICAgeyBuYW1lOiAnaGVpZ2h0JywgdmFsdWU6IFwiMjQwXCIgfSxcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICd0eXBlJywgdmFsdWU6IFwidmlkZW8vd2VibVwiIH0sXG4gICAgICAgICAgICAgICAgLy8geyBuYW1lOiAnY29udHJvbHMnLCB2YWx1ZTogXCJcIiB9LFxuICAgICAgICAgICAgICAgIHsgbmFtZTogJ2xvb3AnLCB2YWx1ZTogXCJcIiB9LFxuICAgICAgICAgICAgICAgIHsgbmFtZTogJ2F1dG9wbGF5JywgdmFsdWU6IFwiXCIgfSxcbiAgICAgICAgICAgIF0pKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG8gd2UgbmVlZCB0byBhZGQgYmFja2dyb3VuZCBiZXR0eT8gIFxuICAgICAgICBpZiAoJ3NjaWVuY2UnIGluIGN1cnJlbnRTZWN0aW9uLnBhcmFtcyAmJiAnU3BlZWNoSWNvbicgaW4gY3VycmVudFNlY3Rpb24ucGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVzLnB1c2godGhpcy5ub2RlKCdJTUcnLCAnJywgJ3NjaWVuY2UnLCAnYmFja2dyb3VuZCcsIFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdzcmMnLCB2YWx1ZTogXCIuLi9hc3NldHMvaW1hZ2VzL21hZHNjaWVuY2UucG5nXCIgfSxcbiAgICAgICAgICAgIF0pKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG8gd2UgbmVlZCB0byBhZGQgcmVhbHdvcmxkP1xuICAgICAgICBpZiAoJ2hpc3RvcnknIGluIGN1cnJlbnRTZWN0aW9uLnBhcmFtcyAmJiAnU3BlZWNoSWNvbicgaW4gY3VycmVudFNlY3Rpb24ucGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVzLnB1c2godGhpcy5ub2RlKCdJTUcnLCAnJywgJycsICdiYWNrZ3JvdW5kJywgWyAgLy8gc2FtZSBjc3MgYXMgYmFja2dyb3VuZFxuICAgICAgICAgICAgICAgIHsgbmFtZTogJ3NyYycsIHZhbHVlOiBcIi4uL2Fzc2V0cy9pbWFnZXMvaGlzdG9yeS5wbmdcIiB9LFxuICAgICAgICAgICAgXSkpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBkbyB3ZSBuZWVkIHRvIGFkZCBtaW5kc2V0P1xuICAgICAgICBpZiAoJ21pbmRzZXQnIGluIGN1cnJlbnRTZWN0aW9uLnBhcmFtcyAmJiAnU3BlZWNoSWNvbicgaW4gY3VycmVudFNlY3Rpb24ucGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVzLnB1c2godGhpcy5ub2RlKCdJTUcnLCAnJywgJycsICdiYWNrZ3JvdW5kJywgWyAgLy8gc2FtZSBjc3MgYXMgYmFja2dyb3VuZFxuICAgICAgICAgICAgICAgIHsgbmFtZTogJ3NyYycsIHZhbHVlOiBcIi4uL2Fzc2V0cy9pbWFnZXMvYW5pbWUzLnBuZ1wiIH0sXG4gICAgICAgICAgICBdKSlcbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICAgICAgLy8gZmluYWxseSB0aGUgdGV4dCAgLy8gPHAoaDEpPiBpcyBlcXVpdmFsZW50IHRvIDx0aXRsZT4sIGJ1dCBnZXRzIGEgc3BlZWNoIGJ1dHRvblxuXG4gICAgICAgIC8vIGlzIHRoaXMgYSBidWxsZXQgb3IgYSByZWd1bGFyIHBhcmFncmFwaD9cbiAgICAgICAgaWYgKCdidWxsZXQnIGluIGN1cnJlbnRTZWN0aW9uLnBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5ub2Rlcy5wdXNoKHRoaXMubm9kZSgnUCcsIGN1cnJlbnRTZWN0aW9uLnRleHR2YWx1ZSwgJycsICdidWxsZXQnKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0YWcgPSAncCdcbiAgICAgICAgICAgIGlmICgnaDEnIGluIGN1cnJlbnRTZWN0aW9uLnBhcmFtcykgdGFnID0gJ2gxJ1xuICAgICAgICAgICAgaWYgKCdoMicgaW4gY3VycmVudFNlY3Rpb24ucGFyYW1zKSB0YWcgPSAnaDInXG4gICAgICAgICAgICBpZiAoJ2gzJyBpbiBjdXJyZW50U2VjdGlvbi5wYXJhbXMpIHRhZyA9ICdoMydcbiAgICAgICAgICAgIHRoaXMubm9kZXMucHVzaCh0aGlzLm5vZGUodGFnLCBjdXJyZW50U2VjdGlvbi50ZXh0dmFsdWUsICcnLCAnJykpXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZpbmFsQXR0YWNoVG9EaXYoKSB7XG4gICAgICAgIC8vIGZpbmFsbHkgYXR0YWNoLCBlaXRoZXIgZm9yIGJhY2tncm91bmQtYmV0dHkgb3IgZm9yIG5vcm1hbFxuICAgICAgICBpZiAoJ3NjaWVuY2UnIGluIHRoaXMub3JpZ2luYWxTZWN0aW9uLnBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5hdHRhY2goJ2xlc3NvbicsICcnLCB0aGlzLnNlY3Rpb25OYW1lLCAnc2NpZW5jZScsIHRoaXMubm9kZXMpXG4gICAgICAgIH0gZWxzZSBpZiAoJ2hpc3RvcnknIGluIHRoaXMub3JpZ2luYWxTZWN0aW9uLnBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5hdHRhY2goJ2xlc3NvbicsICcnLCB0aGlzLnNlY3Rpb25OYW1lLCAnaGlzdG9yeScsIHRoaXMubm9kZXMpXG4gICAgICAgIH0gZWxzZSBpZiAoJ21pbmRzZXQnIGluIHRoaXMub3JpZ2luYWxTZWN0aW9uLnBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5hdHRhY2goJ2xlc3NvbicsICcnLCB0aGlzLnNlY3Rpb25OYW1lLCAnbWluZHNldCcsIHRoaXMubm9kZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaCgnbGVzc29uJywgJycsIHRoaXMuc2VjdGlvbk5hbWUsICcnLCB0aGlzLm5vZGVzKVxuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIG9uRGVzdHJveSgpIHsgfVxufVxuXG5cbmNsYXNzIFNlY3Rpb25UaXRsZSBleHRlbmRzIExlc3NvblNlY3Rpb25zIHsgICAvLyBoYW5kbGVzIHRpdGxlcyBhbmQgc3VidGl0bGVzXG5cbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uOiBJVGFnKSB7XG4gICAgICAgIHN1cGVyKHNlY3Rpb24pXG5cbiAgICAgICAgbGV0IHRhZyA9ICdoMSdcbiAgICAgICAgaWYgKHNlY3Rpb24udGFnID09PSAnc3VidGl0bGUnKSB7XG4gICAgICAgICAgICB0YWcgPSAnaDInXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlY3Rpb24udGFnID09PSAnc2VjdGlvbicpIHtcbiAgICAgICAgICAgIHRhZyA9ICdoMydcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5hdHRhY2goJ2xlc3NvbicsICcnLCAnJywgJycsIFtcbiAgICAgICAgICAgIHRoaXMubm9kZSh0YWcsIHNlY3Rpb24udGV4dHZhbHVlKSxcbiAgICAgICAgXSlcbiAgICB9XG59XG5cblxuXG5jbGFzcyBTZWN0aW9uQXNjaWlNYXRoIGV4dGVuZHMgTGVzc29uU2VjdGlvbnMgeyAgIC8vIGNvbnZlcnRzIHRvIE1hdGhNTCAob25seSBmb3IgRmlyZWZveClcblxuICAgIGNvbnN0cnVjdG9yKHNlY3Rpb246IElUYWcpIHtcbiAgICAgICAgc3VwZXIoc2VjdGlvbilcblxuXG4gICAgICAgIGxldCBtYXRoSWQgPSB0aGlzLmRpdk5hbWUoJ21hdGgnLCB0aGlzLnRrdClcbiAgICAgICAgdGhpcy5hdHRhY2goJ2xlc3NvbicsICcnLCBtYXRoSWQsICcnLCBbXSkgIC8vIGNyZWF0ZSBhIDxkaXY+IGZvciB0aGUgbWF0aFxuXG4gICAgICAgIGxldCBwVGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobWF0aElkKSAgLy8gYW5kIHRoZW4gYXR0YWNoIHRvIHRoYXQgZGl2XG4gICAgICAgIGlmIChwVGFnICE9PSBudWxsKVxuICAgICAgICAgICAgcFRhZy5hcHBlbmRDaGlsZChhc2NpaU1hdGgoc2VjdGlvbi50ZXh0dmFsdWUpKVxuXG4gICAgfVxufVxuXG5cblxuXG5jbGFzcyBTZWN0aW9uRHJpbGwgZXh0ZW5kcyBMZXNzb25TZWN0aW9ucyB7ICAgLy8gaGFuZGxlcyBtYXRoIGRyaWxsc1xuXG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbjogSVRhZykge1xuICAgICAgICBzdXBlcihzZWN0aW9uKVxuXG4gICAgICAgIC8vIGEgZHJpbGwgaXMganVzdCBhIGNhbnZhcyBhcmVhLCB0aGUgZHJpbGwgc29mdHdhcmUgZmlndXJlcyBob3cgdG8gZmlsbCBpdFxuXG4gICAgICAgIGxldCBub2RlczogYW55W10gPSBbXVxuXG4gICAgICAgIGxldCBkcmlsbElkID0gdGhpcy5kaXZOYW1lKCdkcmlsbCcsIHRoaXMudGt0KVxuXG4gICAgICAgIC8vIDxkaXYgaWQ9XCJkcmlsbD8/P3NcIiB3aWR0aD1cIjEwMDBcIiBoZWlnaHQ9XCIzMDBcIj48L2NhbnZhcz5cbiAgICAgICAgdGhpcy5hdHRhY2goJ2xlc3NvbicsICcnLCB0aGlzLnNlY3Rpb25OYW1lLCAnJywgW1xuICAgICAgICAgICAgdGhpcy5ub2RlKCdjYW52YXMnLCAnJywgZHJpbGxJZCwgJ2RyaWxsJywgW3sgbmFtZTogJ3dpZHRoJywgdmFsdWU6IFwiMTAwMFwiIH0sIHsgbmFtZTogJ2hlaWdodCcsIHZhbHVlOiBcIjMwMFwiIH1dLFxuICAgICAgICAgICAgKV0pXG5cbiAgICAgICAgLy8gbGV0IGRyaWxsID0gZHJpbGxCeU5hbWUoJ3NpbmdsZU11bHRpcGx5JywgZHJpbGxJZCwgNilcblxuXG5cbiAgICAgICAgLy8gLy8gZXZlbnR1YWxseSBhc2sgZm9yIGhpc3RvcnksIGRlY2lkZSB3aGF0IHRvIGRvIG5leHRcbiAgICAgICAgLy8gLy8gZm9yIG5vdywgZHJpbGwgNng2IHNpbXBsZW11bHRpcGx5XG4gICAgICAgIC8vIGxldCBtb2RlbCA9IExlc3NvbkZhY3RvcnkoWzYsIDZdKVxuICAgICAgICAvLyBsZXQgZHJpbGwgPSBkcmlsbE1hdGhEaXNwYXRjaChkcmlsbElkLCBtb2RlbCwgJ1NpbXBsZU11bHRpcGx5JylcblxuICAgICAgICAvLyAvLyB0ZXN0IGZ1bmN0aW9uXG4gICAgICAgIC8vIGxldCBpID0gMFxuICAgICAgICAvLyB3aGlsZSAoaSsrIDwgMSkge1xuICAgICAgICAvLyAgICAgbGV0IHF1ZXN0aW9uID0gZHJpbGwuZ2VuZXJhdG9yKGZhbHNlKS5uZXh0XG4gICAgICAgIC8vICAgICBkcmlsbC5yZW5kZXJRdWVzdGlvbihxdWVzdGlvbilcbiAgICAgICAgLy8gfVxuICAgIH1cbn1cblxuY2xhc3MgU2VjdGlvbllvdVR1YmUgZXh0ZW5kcyBMZXNzb25TZWN0aW9ucyB7XG5cbiAgICBub2RlcyA9IFtdXG5cbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uOiBJVGFnKSB7XG4gICAgICAgIHN1cGVyKHNlY3Rpb24pXG5cbiAgICAgICAgLy8gVXNlIHRoZSBFTUJFRCB2ZXJzaW9uIG9mIHRoZSBVUkwgKGZyb20gdGhlIDw+IEVNQkVEKSwgTk9UIHRoZSBzaGFyZSBVUkwgISFcblxuICAgICAgICBjb25zb2xlLmFzc2VydChzZWN0aW9uLnRleHR2YWx1ZS5pbmNsdWRlcygnZW1iZWQnKSwgXCJVU0UgVEhFIEVNQkVEIDw+IFZFUlNJT04gT0YgVEhFIFlPVVRVQkUgVVJMXCIpXG5cbiAgICAgICAgbGV0IHlvdUlkID0gdGhpcy5kaXZOYW1lKCd5b3V0dWJlJywgdGhpcy50a3QpXG5cbiAgICAgICAgdGhpcy5hdHRhY2goJ2xlc3NvbicsICcnLCB5b3VJZCwgJycsIFtcbiAgICAgICAgICAgIHRoaXMubm9kZSgnZW1iZWQnLCAnJywgJycsICcnLCBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBcIndpZHRoXCIsIHZhbHVlOiBcIjY0MHB4XCIgfSxcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwiaGVpZ2h0XCIsIHZhbHVlOiBcIjQwMHB4XCIgfSxcbiAgICAgICAgICAgICAgICB7IG5hbWU6IFwic3JjXCIsIHZhbHVlOiBzZWN0aW9uLnRleHR2YWx1ZS50cmltUmlnaHQoKSB9LFxuICAgICAgICAgICAgICAgIHsgbmFtZTogXCJhbGxvd2Z1bGxzY3JlZW5cIiwgdmFsdWU6IFwidHJ1ZVwiIH1cbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG5cbiAgICB9XG5cbn1cblxuXG5jbGFzcyBTZWN0aW9uRGVidWcgZXh0ZW5kcyBMZXNzb25TZWN0aW9ucyB7XG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbjogSVRhZykge1xuICAgICAgICBzdXBlcihzZWN0aW9uKVxuXG4gICAgICAgIGxldCB0YWcgPSAncCdcblxuICAgICAgICB0aGlzLmF0dGFjaCgnbGVzc29uJywgJycsICcnLCAnJywgW1xuICAgICAgICAgICAgdGhpcy5ub2RlKHRhZywgSlNPTi5zdHJpbmdpZnkoc2VjdGlvbiksICcnLCAnJywgW3sgbmFtZTogJ3N0eWxlJywgdmFsdWU6ICdmb250LXNpemU6MTBweDsnIH1dKVxuICAgICAgICBdKVxuICAgIH1cblxufVxuXG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIHNwZWVjaCBzdXBwb3J0IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBjbGFzcyBPbkNsaWNrU2F5IHtcbiAgICBzeW50aCA9IHdpbmRvdy5zcGVlY2hTeW50aGVzaXNcbiAgICBzeW50aFJ1bm5pbmcgPSBmYWxzZSAvLyBkb24ndCB3YW50IHR3byBpbnN0YW5jZXNcbiAgICBzeW50aENhbmNlbGxlZCA9IGZhbHNlIC8vIGlmIGNhbmNlbGxlZCB0aGVuIGRvbid0IHJlc3RhcnRcbiAgICB2b2ljZXM6IGFueVxuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5sb2FkVm9pY2VzV2hlbkF2YWlsYWJsZSgpXG5cbiAgICB9XG5cbiAgICAvLyB3ZSBuZWVkIHRvIGxvYWQgdGhlIHZvaWNlcyBiZWZvcmUgd2UgY2FuIHVzZSB0aGVtXG4gICAgbG9hZFZvaWNlc1doZW5BdmFpbGFibGUoKSB7XG4gICAgICAgIHRoaXMudm9pY2VzID0gdGhpcy5zeW50aC5nZXRWb2ljZXMoKVxuICAgICAgICBpZiAodGhpcy52b2ljZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndm9pY2VzIGFscmVhZHkgbG9hZGVkJylcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd2b2ljZXMnLCB2b2ljZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbG9hZGluZyB2b2ljZXMnKVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkVm9pY2VzV2hlbkF2YWlsYWJsZSgpXG4gICAgICAgICAgICB9LCAxMClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2tTYXkodXR0ZXJhbmNlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Fycml2ZWQgaW4gb25DbGlja1NheScsIHV0dGVyYW5jZSlcbiAgICAgICAgaWYgKHRoaXMudm9pY2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdTcGVlY2ggbm90IHJlYWR5IHlldCwgc3RpbGwgbG9hZGluZyB2b2ljZXMuJylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIC8vIGlmICh0aGlzLnN5bnRoUnVubmluZykgeyAgICAgLy8gc29tZW9uZSBjbGlja2VkLCBsaWtlbHl3YW50cyB0byBTVE9QIHRoZSBwbGF5YmFja1xuICAgICAgICAvLyAgICAgdGhpcy5zeW50aENhbmNlbGxlZCA9IHRydWVcbiAgICAgICAgLy8gICAgIHJldHVyblxuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMuc3ludGhDYW5jZWxsZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLnNwZWFrUmVzcG9uc2UodXR0ZXJhbmNlKVxuICAgICAgICAvL1xuICAgICAgICAvLyBpZiAoc3ludGguc3BlYWtpbmcpIHsgLyogc3RvcCBuYXJyYXRpb24gKi9cbiAgICAgICAgLy8gICAgICAvKiBmb3Igc2FmYXJpICovXG4gICAgICAgIC8vICAgc3ludGhSdW5uaW5nID0gZmFsc2VcbiAgICAgICAgLy8gICBzeW50aC5jYW5jZWwoKVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGlmICghc3ludGhSdW5uaW5nKSB7XG4gICAgICAgIC8vICAgc3ludGhSdW5uaW5nID0gdHJ1ZVxuICAgICAgICAvLyAgIGxldCB1dHRlcmFuY2UgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5pbm5lckhUTUwpXG4gICAgICAgIC8vICAgY29uc29sZS5sb2codXR0ZXJhbmNlKVxuICAgICAgICAvLyAgIHV0dGVyYW5jZS52b2ljZSA9IHN5bnRoLmdldFZvaWNlcygpWzNdXG4gICAgICAgIC8vICAgdXR0ZXJhbmNlLnZvaWNlVVJJID0gJ25hdGl2ZSc7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgdXR0ZXJhbmNlLm9uZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgc3ludGhSdW5uaW5nID0gZmFsc2VcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vICAgc3ludGguc3BlYWsodXR0ZXJhbmNlKVxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gcHJvYmxlbSB3aXRoIGxvbmdlciBzcGVlY2ggY2h1bmtzLCBoZXJlJ3MgYSB3b3JrYXJvdW5kXG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjE5NDc3MzAvY2hyb21lLXNwZWVjaC1zeW50aGVzaXMtd2l0aC1sb25nZXItdGV4dHNcblxuICAgIHNheWl0KCkge1xuICAgICAgICBcblxuICAgICAgICBpZiAoIXRoaXMuc3ludGhSdW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN5bnRoQ2FuY2VsbGVkID0gdHJ1ZVxuICAgICAgICAgICAgc3BlZWNoU3ludGhlc2lzLmNhbmNlbCgpIC8vIGlmIGl0IGVycm9ycywgdGhpcyBjbGVhcnMgb3V0IHRoZSBlcnJvci5cbiAgICAgICAgfVxuICAgICAgICBsZXQgbXNnID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSgpXG5cbiAgICAgICAgLy8gMTogIFVTIGVuZ2xpc2hcbiAgICAgICAgLy8gMjogIFVLIGVuZ2xpc2ggbWFsZVxuICAgICAgICAvLyAzOiAgVUsgZW5nbGlzaCBmZW1hbGVcblxuICAgICAgICBtc2cudm9pY2UgPSB0aGlzLnN5bnRoLmdldFZvaWNlcygpWzFdIC8vIE5vdGU6IHNvbWUgdm9pY2VzIGRvbid0IHN1cHBvcnQgYWx0ZXJpbmcgcGFyYW1zXG4gICAgICAgIG1zZy5sYW5nID0gJ2VuLVVTJ1xuICAgICAgICBtc2cudm9sdW1lID0gMSAvLyAwIHRvIDFcbiAgICAgICAgbXNnLnJhdGUgPSAxLjAgLy8gMC4xIHRvIDEuMFxuICAgICAgICBtc2cucGl0Y2ggPSAxIC8vIDAgdG8gMlxuICAgICAgICBtc2cub25zdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zeW50aFJ1bm5pbmcgPSB0cnVlXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJ1NwZWVjaCBTdGFydHMgJHtldmVudH1gKVxuICAgICAgICB9XG4gICAgICAgIG1zZy5vbmVuZCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zeW50aFJ1bm5pbmcgPSBmYWxzZVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYFNwZWVjaCBFbmRzICR7ZXZlbnR9YClcbiAgICAgICAgfVxuICAgICAgICBtc2cub25lcnJvciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zeW50aFJ1bm5pbmcgPSBmYWxzZVxuICAgICAgICAgICAgLy8gY29uc29sZS5hc3NlcnQoZmFsc2UsIGBFcnJvcmVkICR7ZXZlbnR9YClcbiAgICAgICAgfVxuICAgICAgICBtc2cub25wYXVzZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zeW50aFJ1bm5pbmcgPSBmYWxzZVxuICAgICAgICAgICAgLy8gY29uc29sZS5hc3NlcnQoZmFsc2UsIGBwYXVzZWQgJHtldmVudH1gKVxuICAgICAgICB9XG4gICAgICAgIG1zZy5vbmJvdW5kYXJ5ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmFzc2VydChmYWxzZSwgYG9uYm91bmRhcnkgJHtldmVudH1gKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtc2dcbiAgICB9XG5cbiAgICBzcGVha1Jlc3BvbnNlKHRleHQ6IHN0cmluZykge1xuICAgICAgICBsZXQgd2FzUnVubmluZyA9IHRoaXMuc3ludGhSdW5uaW5nXG4gICAgICAgIHNwZWVjaFN5bnRoZXNpcy5jYW5jZWwoKSAvLyBpZiBpdCBlcnJvcnMsIHRoaXMgY2xlYXJzIG91dCB0aGUgZXJyb3IuXG4gICAgICAgIC8vIG5vdCBydW5uaW5nIG5vd1xuXG4gICAgICAgIGlmICghd2FzUnVubmluZykge1xuICAgICAgICAgICAgdGhpcy5zeW50aFJ1bm5pbmcgPSB0cnVlIC8vIHRyeSB0byBwcmV2ZW50IGEgc2Vjb25kIHNwZWFrZXIgZnJvbSBzdGFydGluZ1xuICAgICAgICAgICAgbGV0IHNlbnRlbmNlcyA9IHRleHQuc3BsaXQoJy4nKVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZW50ZW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdG9TYXkgPSB0aGlzLnNheWl0KClcbiAgICAgICAgICAgICAgICB0b1NheS50ZXh0ID0gc2VudGVuY2VzW2ldXG4gICAgICAgICAgICAgICAgc3BlZWNoU3ludGhlc2lzLnNwZWFrKHRvU2F5KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zeW50aFJ1bm5pbmcgPSBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJVGFnIH0gZnJvbSAnLi9UJ1xyXG5pbXBvcnQgeyBMZXNzb25Ub0lUYWdzIH0gZnJvbSAnLi4vY3JlYXRlU0NPUk0vbGVzc29uVG9JVGFncydcclxuaW1wb3J0IHsgTGVzc29uUGFnZSB9IGZyb20gJy4uL3J1bnRpbWUvbGVzc29ucGFnZSdcclxuXHJcblxyXG5cclxuXHJcbi8vIEJhc2ljIFJ1bi1UaW1lIENhbGxzXHJcbi8vIFRoaXMgZXhhbXBsZSBidWlsZHMgb24gdGhlIFNpbXBsZSBTaW5nbGUgU0NPIHRvIGRlbW9uc3RyYXRlIHRoZSBwcm9wZXIgdXNlIG9mIHRoZSBiYXNpYyBTQ09STSBydW4tdGltZSBkYXRhIG1vZGVsIGVsZW1lbnRzLiBJbiB0aGlzIGV4YW1wbGU6XHJcblxyXG4vLyBBIEphdmFTY3JpcHQgY29udHJvbGxlciBpcyBhZGRlZCB0byBoYW5kbGUgbmF2aWdhdGlvbiB3aXRoaW4gdGhlIFNDTy5cclxuLy8gVGhlIGNvbnRyb2xsZXIgYm9va21hcmtzIHRoZSBsZWFybmVy4oCZcyBjdXJyZW50IGxvY2F0aW9uLiAoY21pLmxvY2F0aW9uKVxyXG4vLyBUaGUgY29udHJvbGxlciByZXBvcnRzIGNvbXBsZXRpb24gYXMgdGhlIHVzZXIgcHJvZ3Jlc3NlcyB0aHJvdWdoIHRoZSBjb250ZW50LiAoY21pLmNvbXBsZXRpb25fc3RhdHVzKVxyXG4vLyBUaGUgY29udHJvbGxlciByZXBvcnRzIHN1Y2Nlc3Mgc3RhdHVzIGFuZCBzY29yZSBiYXNlZCBvbiB0aGUgbGVhcm5lcuKAmXMgcXVpeiByZXN1bHRzIFxyXG4vLyAgICAgKGNtaS5zdWNjZXNzX3N0YXR1cywgY21pLnNjb3JlLnNjYWxlZCwgY21pLnNjb3JlLnJhdywgY21pLnNjb3JlLCBtYXggYW5kIGNtaS5zY29yZS5taW4pLlxyXG4vLyBUaGUgY29udHJvbGxlciB3aWxsIHJlY29yZCB0aGUgdG90YWwgdGltZSB0aGUgbGVhcm5lciBzcGVudCBpbiB0aGUgdHJhaW5pbmcgKGNtaS5zZXNzaW9uX3RpbWUpLlxyXG4vLyBUaGUgY29udHJvbGxlciBkZW1vbnN0cmF0ZXMgb3B0aW9ucyBmb3IgZXhpdGluZyB0aGUgY291cnNlIChjbWkuZXhpdCBhbmQgYWRsLm5hdi5yZXF1ZXN0KVxyXG4vLyBUaGUgbWFuaWZlc3QgaW5jbHVkZXMgc29tZSBiYXNpYyBzZXF1ZW5jaW5nIGluZm9ybWF0aW9uIHRvIG92ZXJyaWRlIHNvbWUgY291bnRlci1pbnR1aXRpdmUgZGVmYXVsdCB2YWx1ZXMuXHJcblxyXG5cclxuXHJcblxyXG5pbnRlcmZhY2UgY291cnNlSW5mbyB7XHJcbiAgICBsZXNzb25zOiBzdHJpbmdbXVxyXG4gICAgbGVzc29uRmlsZXM6IHN0cmluZ1tdXHJcbiAgICB2ZXJzaW9uOiBzdHJpbmdcclxuICAgIGNvcHlyaWdodDogc3RyaW5nXHJcbiAgICBjb250YWN0OiBzdHJpbmdcclxuICAgIGxpY2VuY2VkVG86IHN0cmluZ1xyXG4gICAgdGl0bGU6IHN0cmluZ1xyXG4gICAgbGF1bmNoUGFnZTogc3RyaW5nXHJcbiAgICBkaXNjb3JkSW52aXRlOiBzdHJpbmdcclxuICAgIGNyZWF0ZWQ6IHN0cmluZ1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFJ1bnRpbWUge1xyXG5cclxuICAgIC8vIHNjb3JtSG9zdDogb2JqZWN0XHJcblxyXG4gICAgY291cnNlSW5mbzogY291cnNlSW5mbyB8IG51bGwgPSBudWxsICAgIC8vIGhhdmUgdG8gZmV0Y2ggaXRcclxuICAgIGxlc3NvbnMgPSBuZXcgTWFwPHN0cmluZywgSVRhZ1tdPigpXHJcblxyXG4gICAgZWRpdG9yOiBFZGl0b3JcclxuICAgIC8vIHNldHVwIHRoZSB3cml0ZXIncyBlZGl0b3JcclxuXHJcbiAgICBsZXNzb25QYWdlOiBMZXNzb25QYWdlIHwgbnVsbCA9IG51bGwgICAgIC8vIGxpbmsgdG8gdGhlIGxlc3NvblBhZ2UgYnVpbGRlclxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBsZXQgZWRpdG9yRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvbXNlZGl0b3InKSEgYXMgSFRNTFRleHRBcmVhRWxlbWVudFxyXG4gICAgICAgIHRoaXMuZWRpdG9yID0gbmV3IEVkaXRvcihlZGl0b3JEaXYpXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBjbGFzcyBSdW50aW1lJylcclxuICAgICAgICAvLyB0aGlzLnBhaW50V2VsY29tZSgpXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhc3luYyBodHRwZmV0Y2g8VD4oZmlsZVVSSTogUmVxdWVzdEluZm8pOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGZpbGVVUkkpO1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIGJvZHk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgYXN5bmMgbG9hZEFsbEZpbGVzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBsb2FkQWxsRmlsZXMnKVxyXG5cclxuICAgICAgICAvLyBmaXJzdCBzdGVwIC0gbG9hZCB0aGUgY291cnNlIGluZm9cclxuICAgICAgICB0aGlzLmNvdXJzZUluZm8gPSBhd2FpdCB0aGlzLmh0dHBmZXRjaDxjb3Vyc2VJbmZvPihcImNvdXJzZWluZm8uSlNPTlwiKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ25ldyBsZXNzb25pbmZvJywgdGhpcy5jb3Vyc2VJbmZvKVxyXG5cclxuICAgICAgICAvLyBub3cgbG9hZCBBTEwgdGhlIGNvdXJzZSBJVGFnIGZpbGVzXHJcbiAgICAgICAgbGV0IGxlc3NvbjogSVRhZ1tdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvdXJzZUluZm8ubGVzc29uRmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSB0aGlzLmNvdXJzZUluZm8ubGVzc29uRmlsZXNbaV1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZldGNoaW5nIGxlc3NvbiAnLCBuYW1lKVxyXG4gICAgICAgICAgICBjb25zdCBsZXNzb25JbmZvID0gYXdhaXQgdGhpcy5odHRwZmV0Y2g8SVRhZ1tdPihuYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5sZXNzb25zLnNldChuYW1lLCBsZXNzb25JbmZvKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxlc3NvbnMuZ2V0KG5hbWUpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYXJyZ2dnZy4uICBzcGVudCBhIGRheSB0cnlpbmcgdG8gbWFrZSB0aGlzIHdvcmssIFxyXG4gICAgICAgIC8vIGJ1dCBhbGwgcHJvbWlzZXMgZmlyZSBhdCB0aGUgc2FtZSB0aW1lIGFuZCBJIGNhbid0IGZpZ3VyZVxyXG4gICAgICAgIC8vIGhvdyB0byB1c2UgUHJvbWlzZS5BbGwgLi4uXHJcblxyXG4gICAgICAgIC8vIHRoaXMuY291cnNlSW5mby5sZXNzb25GaWxlcy5mb3JFYWNoKGFzeW5jIChuYW1lKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGxlc3NvbkluZm8gPSBhd2FpdCB0aGlzLmh0dHBmZXRjaDxJVGFnW10+KG5hbWUpO1xyXG4gICAgICAgIC8vIH0pXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyBhc3luYyBwYWludFdlbGNvbWUoKSB7XHJcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5sb2FkQWxsRmlsZXMoKVxyXG5cclxuICAgIC8vICAgICBjb25zb2xlLmxvZygnYWxsIElUYWcgZmlsZXMgbG9hZGVkJylcclxuXHJcbiAgICAvLyAgICAgbGV0IGZpcnN0TGVzc29uOiBJVGFnW10gPSB0aGlzLmxlc3NvbnMudmFsdWVzKCkubmV4dCgpLnZhbHVlICAgLy8gZmlyc3QgbGVzc29uXHJcbiAgICAvLyAgICAgIHRoaXMubGVzc29uUGFnZSA9IG5ldyBMZXNzb25QYWdlKGZpcnN0TGVzc29uKVxyXG4gICAgLy8gfVxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VydmVyRmlsZVN5c3RlbShzZXJ2ZXJVUkw6IHN0cmluZywgc2VuZERhdGE6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zb2xlLmxvZygncG9zdGluZyBpbiBwb3N0RGF0YScsIEpTT04uc3RyaW5naWZ5KHNlbmREYXRhKSlcclxuXHJcbiAgICAgICAgLy8gRGVmYXVsdCBvcHRpb25zIGFyZSBtYXJrZWQgd2l0aCAqXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChzZXJ2ZXJVUkwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXHJcbiAgICAgICAgICAgIG1vZGU6ICdjb3JzJywgLy8gbm8tY29ycywgKmNvcnMsIHNhbWUtb3JpZ2luXHJcbiAgICAgICAgICAgIGNhY2hlOiAnbm8tY2FjaGUnLCAvLyAqZGVmYXVsdCwgbm8tY2FjaGUsIHJlbG9hZCwgZm9yY2UtY2FjaGUsIG9ubHktaWYtY2FjaGVkXHJcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLCAvLyBpbmNsdWRlLCAqc2FtZS1vcmlnaW4sIG9taXRcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVkaXJlY3Q6ICdmb2xsb3cnLCAvLyBtYW51YWwsICpmb2xsb3csIGVycm9yXHJcbiAgICAgICAgICAgIHJlZmVycmVyOiAnbm8tcmVmZXJyZXInLCAvLyBuby1yZWZlcnJlciwgKmNsaWVudFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzZW5kRGF0YSksIC8vIGJvZHkgZGF0YSB0eXBlIG11c3QgbWF0Y2ggXCJDb250ZW50LVR5cGVcIiBoZWFkZXJcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCkgLy8gcGFyc2VzIEpTT04gcmVzcG9uc2UgaW50byBuYXRpdmUgSmF2YVNjcmlwdCBvYmplY3RzXHJcblxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdlcnJvciBpbiBzZXJ2ZXJGaWxlU3lzdGVtJylcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyBhIHNpbXBsZSB0ZXh0YXJlYSBlZGl0b3IsIEdyYW1tZXJseSBkb2VzIGFsbCB0aGUgd29ya1xyXG5jbGFzcyBFZGl0b3Ige1xyXG5cclxuICAgIGluaXRGaWxlOiBzdHJpbmcgPSAnJyAgIC8vIHRoZSBmaWxlIHdlIGFyZSBlZGl0aW5nXHJcbiAgICBpc0RlYnVnOiBib29sZWFuID0gZmFsc2VcclxuICAgIHRhZ0NvdW50ID0gMFxyXG4gICAgc3VnZ2VzdE5hbWUgPSAnJ1xyXG5cclxuICAgIC8vIGVkaXRvckRpdjogSFRNTERpdkVsZW1lbnRcclxuICAgIC8vIGVkaXRvcjogRWRpdG9yXHJcbiAgICBzYXZlOiBIVE1MQnV0dG9uRWxlbWVudFxyXG4gICAgbG9hZDogSFRNTEJ1dHRvbkVsZW1lbnRcclxuICAgIHJ1bjogSFRNTEJ1dHRvbkVsZW1lbnRcclxuICAgIGRlYnVnOiBIVE1MQnV0dG9uRWxlbWVudFxyXG5cclxuICAgIGVkaXRvclRhZzogSFRNTFRleHRBcmVhRWxlbWVudFxyXG5cclxuICAgIGxlc3NvblBhZ2U6IExlc3NvblBhZ2VcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlZGl0b3JUYWc6IEhUTUxUZXh0QXJlYUVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLmVkaXRvclRhZyA9IGVkaXRvclRhZ1xyXG5cclxuICAgICAgICB0aGlzLnNhdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZScpIGFzIEhUTUxCdXR0b25FbGVtZW50XHJcbiAgICAgICAgdGhpcy5sb2FkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudFxyXG4gICAgICAgIHRoaXMucnVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3J1bicpIGFzIEhUTUxCdXR0b25FbGVtZW50XHJcbiAgICAgICAgdGhpcy5kZWJ1ZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWJ1ZycpIGFzIEhUTUxCdXR0b25FbGVtZW50XHJcblxyXG4gICAgICAgIHRoaXMuc2F2ZS5vbmNsaWNrID0gKCkgPT4gdGhpcy5kb1NhdmUoKTtcclxuICAgICAgICB0aGlzLmxvYWQub25jbGljayA9ICgpID0+IHRoaXMuZG9Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5ydW4ub25jbGljayA9ICgpID0+IHRoaXMuZG9SdW4oKTtcclxuICAgICAgICB0aGlzLmRlYnVnLm9uY2xpY2sgPSAoKSA9PiB0aGlzLmRvRGVidWcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5sZXNzb25QYWdlID0gbmV3IExlc3NvblBhZ2UoKVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZG9TYXZlKCkge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnaW4gZG9TYXZlICcpXHJcbiAgICAgICAgbGV0IGFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9tc2VkaXRvcicpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnRcclxuICAgICAgICBsZXQgdGV4dCA9IGFyZWEudmFsdWVcclxuICAgICAgICBsZXQgZGF0YSA9IG5ldyBCbG9iKFt0ZXh0XSwgeyB0eXBlOiAndGV4dC9wbGFpbicgfSk7XHJcblxyXG4gICAgICAgIC8vIElmIHdlIGFyZSByZXBsYWNpbmcgYSBwcmV2aW91c2x5IGdlbmVyYXRlZCBmaWxlIHdlIG5lZWQgdG9cclxuICAgICAgICAvLyBtYW51YWxseSByZXZva2UgdGhlIG9iamVjdCBVUkwgdG8gYXZvaWQgbWVtb3J5IGxlYWtzLlxyXG4gICAgICAgIGlmICh0aGlzLmluaXRGaWxlKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHRoaXMuaW5pdEZpbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0RmlsZSA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGRhdGEpO1xyXG4gICAgICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxyXG4gICAgICAgIGEuZG93bmxvYWQgPSB0aGlzLnN1Z2dlc3ROYW1lICAvLyBjYW4gb25seSBzdWdnZXN0IHRoZSBMQVNUIHNlZ21lbnRcclxuICAgICAgICBhLmhyZWYgPSB0aGlzLmluaXRGaWxlXHJcbiAgICAgICAgYS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIikpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyB1c2UgdGhlIGZpbGVSZWFkZXIgdG8gZ3JhYiBhIGxlc3NvbiBhbmQgbG9hZCBpdCBpbnRvIHRoZSB0ZXh0YXJlYVxyXG4gICAgZG9Mb2FkKCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGlucHV0LnR5cGUgPSBcImZpbGVcIjtcclxuICAgICAgICBpbnB1dC5vbmNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHR4dCA9IGZpbGVSZWFkZXIucmVzdWx0IGFzIHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9tc2VkaXRvcicpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnRcclxuICAgICAgICAgICAgICAgIGFyZWEudmFsdWUgPSB0eHRcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b21zZWRpdG9yJykhLmZvY3VzKCkgIC8vIG1ha2UgaXQgdGhlIGVkaXRpbmcgZm9jdXNcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNEZWJ1ZyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvUnVuKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc1RleHQoaW5wdXQuZmlsZXMhWzBdKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlucHV0LmNsaWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9SdW4oKSB7XHJcbiAgICAgICAgbGV0IGFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9tc2VkaXRvcicpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnRcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnZG9SdW4nLGFyZWEudmFsdWUpXHJcbiAgICAgICAgbGV0IGlUYWdzID0gbmV3IExlc3NvblRvSVRhZ3MoKS5wYXJzZSgnLi4vYXNzZXRzJywgYXJlYS52YWx1ZSlcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnYWJvdXQgdG8gcnVuIGlUYWdzJywgaVRhZ3MpXHJcbiAgICAgICAgdGhpcy5sZXNzb25QYWdlLmxvYWQoaVRhZ3MsIHRoaXMuaXNEZWJ1ZylcclxuXHJcbiAgICAgICAgbGV0IG1vZHVsZUluZm8gPSB0aGlzLmxlc3NvblBhZ2UubW9kdWxlSW5mbygpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ21vZHVsZUluZm8nLCBtb2R1bGVJbmZvKVxyXG4gICAgICAgIHRoaXMuc3VnZ2VzdE5hbWUgPVxyXG4gICAgICAgICAgICBtb2R1bGVJbmZvLm1vZHVsZS5zdWJzdHIoMCwgMykgK1xyXG4gICAgICAgICAgICBtb2R1bGVJbmZvLmxlc3Nvbi5zdWJzdHIoMCwgMykgK1xyXG4gICAgICAgICAgICBtb2R1bGVJbmZvLm1vZHVsZS5zdWJzdHIoMykgKyAnLnR4dCdcclxuICAgICAgICBsZXQgc3VnZ2VzdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VnZ2VzdE5hbWUnKVxyXG4gICAgICAgIGlmIChzdWdnZXN0TmFtZSAhPT0gbnVsbClcclxuICAgICAgICAgICAgc3VnZ2VzdE5hbWUuaW5uZXJIVE1MID0gdGhpcy5zdWdnZXN0TmFtZVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBkb0RlYnVnKCkge1xyXG4gICAgICAgIHRoaXMuaXNEZWJ1ZyA9ICF0aGlzLmlzRGVidWdcclxuICAgICAgICB0aGlzLmRvUnVuKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgZXh0cmFjdEl0YWdJbmZvKGlUYWdzOiBJVGFnW10pIHtcclxuICAgICAgICB0aGlzLnRhZ0NvdW50ID0gaVRhZ3MubGVuZ3RoXHJcbiAgICAgICAgbGV0IHRhZ0NvdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhZ2NvdW50JylcclxuICAgICAgICBpZiAodGFnQ291bnQgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHRhZ0NvdW50LmlubmVySFRNTCA9IHRoaXMudGFnQ291bnQudG9TdHJpbmcoKVxyXG5cclxuICAgICAgICAvLyBzdWdnZXN0IGEgbmFtZVxyXG4gICAgICAgIGxldCBtb2R1bGVJbmZvID0gdGhpcy5sZXNzb25QYWdlLm1vZHVsZUluZm9cclxuICAgICAgICB0aGlzLnN1Z2dlc3ROYW1lID0gbW9kdWxlSW5mbygpLm1vZHVsZS5zdWJzdHIoMCwgMykgK1xyXG4gICAgICAgICAgICBtb2R1bGVJbmZvKCkubGVzc29uLnN1YnN0cigwLCAzKSArXHJcbiAgICAgICAgICAgIG1vZHVsZUluZm8oKS5tb2R1bGUuc3Vic3RyKDQpXHJcbiAgICAgICAgbGV0IHN1Z2dlc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VnZ2VzdE5hbWUnKVxyXG4gICAgICAgIGlmIChzdWdnZXN0ICE9PSBudWxsKVxyXG4gICAgICAgICAgICBzdWdnZXN0LmlubmVySFRNTCA9IHRoaXMuc3VnZ2VzdE5hbWVcclxuXHJcbiAgICAgICAgdGhpcy5leHRyYWN0SXRhZ0luZm8oaVRhZ3MpXHJcblxyXG5cclxuXHJcbiAgICAgICAgbGV0IHN1Z2dlc3RlZE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VnZ2VzdE5hbWUnKVxyXG4gICAgICAgIGlmIChzdWdnZXN0ZWROYW1lICE9PSBudWxsKVxyXG4gICAgICAgICAgICBzdWdnZXN0ZWROYW1lLmlubmVySFRNTCA9ICdTdWdnZXN0ZWROYW1lJ1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vIGludGVyZmFjZSBTdG9yYWdlIHtcclxuLy8gICByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgbG9uZyBsZW5ndGg7XHJcbi8vICAgRE9NU3RyaW5nPyBrZXkodW5zaWduZWQgbG9uZyBpbmRleCk7XHJcbi8vICAgZ2V0dGVyIERPTVN0cmluZz8gZ2V0SXRlbShET01TdHJpbmcga2V5KTtcclxuLy8gICBzZXR0ZXIgdm9pZCBzZXRJdGVtKERPTVN0cmluZyBrZXksIERPTVN0cmluZyB2YWx1ZSk7XHJcbi8vICAgZGVsZXRlciB2b2lkIHJlbW92ZUl0ZW0oRE9NU3RyaW5nIGtleSk7XHJcbi8vICAgdm9pZCBjbGVhcigpO1xyXG4vLyB9O1xyXG5cclxuLy8gVGhlIGdldEl0ZW0oa2V5KSBtZXRob2QgbXVzdCByZXR1cm4gdGhlIGN1cnJlbnQgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlblxyXG4vLyBrZXkuIElmIHRoZSBnaXZlbiBrZXkgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGxpc3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBvYmplY3QgdGhlblxyXG4vLyB0aGlzIG1ldGhvZCBtdXN0IHJldHVybiBudWxsLlxyXG4vL1xyXG4vLyBUaGUgc2V0SXRlbShrZXksIHZhbHVlKSBtZXRob2QgbXVzdCBmaXJzdCBjaGVjayBpZiBhIGtleS92YWx1ZSBwYWlyIHdpdGggdGhlXHJcbi8vIGdpdmVuIGtleSBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgbGlzdCBhc3NvY2lhdGVkIHdpdGggdGhlIG9iamVjdC5cclxuLy9cclxuLy8gVGhlIHJlbW92ZUl0ZW0oa2V5KSBtZXRob2QgbXVzdCBjYXVzZSB0aGUga2V5L3ZhbHVlIHBhaXIgd2l0aCB0aGUgZ2l2ZW4ga2V5IHRvXHJcbi8vIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGlzdCBhc3NvY2lhdGVkIHdpdGggdGhlIG9iamVjdCwgaWYgaXQgZXhpc3RzLiBJZiBubyBpdGVtXHJcbi8vIHdpdGggdGhhdCBrZXkgZXhpc3RzLCB0aGUgbWV0aG9kIG11c3QgZG8gbm90aGluZy5cclxuLy9cclxuLy8gVGhlIHNldEl0ZW0oKSBhbmQgcmVtb3ZlSXRlbSgpIG1ldGhvZHMgbXVzdCBiZSBhdG9taWMgd2l0aCByZXNwZWN0IHRvIGZhaWx1cmUuXHJcbi8vIEluIHRoZSBjYXNlIG9mIGZhaWx1cmUsIHRoZSBtZXRob2QgZG9lcyBub3RoaW5nLiBUaGF0IGlzLCBjaGFuZ2VzIHRvIHRoZSBkYXRhXHJcbi8vIHN0b3JhZ2UgYXJlYSBtdXN0IGVpdGhlciBiZSBzdWNjZXNzZnVsLCBvciB0aGUgZGF0YSBzdG9yYWdlIGFyZWEgbXVzdCBub3QgYmVcclxuLy8gY2hhbmdlZCBhdCBhbGwuXHJcbi8vXHJcbi8vIFRoZSBjbGVhcigpIG1ldGhvZCBtdXN0IGF0b21pY2FsbHkgY2F1c2UgdGhlIGxpc3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBvYmplY3QgdG9cclxuLy8gYmUgZW1wdGllZCBvZiBhbGwga2V5L3ZhbHVlIHBhaXJzLCBpZiB0aGVyZSBhcmUgYW55LiBJZiB0aGVyZSBhcmUgbm9uZSwgdGhlbiB0aGVcclxuLy8gbWV0aG9kIG11c3QgZG8gbm90aGluZy5cclxuXHJcbi8vIGNsYXNzIERhdGFTZXJ2ZXIge1xyXG4vLyAgICAgcHVibGljIGNtZDogc3RyaW5nXHJcbi8vICAgICBwdWJsaWMgZGF0YTogc3RyaW5nXHJcbi8vICAgICBwdWJsaWMgY2FsbGJhY2s6IENhbGxhYmxlRnVuY3Rpb25cclxuXHJcbi8vICAgICBjb25zdHJ1Y3RvcihjbWQ6IHN0cmluZywgZGF0YTogc3RyaW5nLCBjYWxsYmFjazogQ2FsbGFibGVGdW5jdGlvbikge1xyXG4vLyAgICAgICAgIHRoaXMuY21kID0gY21kXHJcbi8vICAgICAgICAgdGhpcy5kYXRhID0gZGF0YVxyXG4vLyAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xyXG4vLyAgICAgICAgICQuYWpheCh7XHJcbi8vICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4vLyAgICAgICAgICAgICB1cmw6ICdBSkFYLnBocCcsXHJcbi8vICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcclxuLy8gICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBEYXRhU2VydmVyIHN1Y2Nlc3MoJywgSlNPTi5wYXJzZShkYXRhKSlcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gZGF0YVxyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLnJlc3VsdClcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0pXHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcblxyXG5cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLyBmZXRjaCBhcGkgIC8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=