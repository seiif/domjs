'use strict';

var d              = require('es5-ext/object/descriptor')
  , extend         = require('es5-ext/object/extend')
  , extendMeta     = require('es5-ext/object/extend-properties')
  , validDocument  = require('dom-ext/document/valid-document')
  , Base           = require('./base')
  , construct      = require('./_construct-element')

  , elements = {}, HTML5;

['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio',
	'b', 'bdi', 'bdo', 'blockquote', 'br', 'button', 'canvas', 'caption', 'cite',
	'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details',
	'device', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption',
	'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header',
	'hgroup', 'hr', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen',
	'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meter', 'nav',
	'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param',
	'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section',
	'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary',
	'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time',
	'tr', 'track', 'ul', 'var', 'video', 'wbr'].forEach(function (name) {
	elements[name] = d('cew', function () {
		var el = this._current.appendChild(this.document.createElement(name))
		  , proto = this._elementProto(name);
		try {
			el.__proto__ = proto;
		} catch (e) {
			// Workaround for FF bug ->
			// https://bugzilla.mozilla.org/show_bug.cgi?id=913420
			extendMeta(el, proto);
		}
		construct(el, arguments);
		return el;
	});
});
elements._var = elements['var'];

module.exports = HTML5 = function (document) {
	if (!(this instanceof HTML5)) return new HTML5(document);
	Base.call(this, validDocument(document));
};

HTML5.prototype = Object.create(Base.prototype, extend({
	constructor: d(HTML5),
	ns: d(Object.create(Base.prototype.ns, d.binder(elements, '_domjs')))
}));

extend(require('./ext'), {
	ul:     require('./ext/html5/ul'),
	ol:     require('./ext/html5/ol'),
	tbody:  require('./ext/html5/tbody'),
	script: require('./ext/html5/script')
});
