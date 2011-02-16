/* ***** BEGIN LICENSE BLOCK *****
 * Version: MIT/X11 License
 * 
 * Copyright (c) 2010 Erik Vold
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Contributor(s):
 *   Erik Vold <erikvvold@gmail.com> (Original Author)
 *
 * ***** END LICENSE BLOCK ***** */

var l10n = (function(global) {
  return function(addon, filename) {
    // get selected locale
    let locale = Cc["@mozilla.org/chrome/chrome-registry;1"]
        .getService(Ci.nsIXULChromeRegistry).getSelectedLocale("global");

    let defaultBundle = Services.strings.createBundle(
        addon.getResourceURI("locale/" + locale + "/" + filename).spec);
    let engBundle = Services.strings.createBundle(
        addon.getResourceURI("locale/en-US/" + filename).spec);

    return global._ = function l10n_underscore(aKey, aLocale) {
      if (aLocale)
        var localeBundle = Services.strings.createBundle(
            addon.getResourceURI("locale/" + aLocale + "/" + filename).spec);
      try {
        return (localeBundle && localeBundle.GetStringFromName(aKey))
            || defaultBundle.GetStringFromName(aKey)
            || engBundle.GetStringFromName(aKey);
      } catch (e) {
        return engBundle.GetStringFromName(aKey);
      }
    }
  }
})(this);
