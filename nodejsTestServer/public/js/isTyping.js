/* Copyright 2013 Rémi Bouchar aka SeekTheError
 remi.bouchar@gmail.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

/*
 * @var inputSelector: a jQuery Selector
 * @var timeoutValue : the timelapse between a keybord key
 *                     is up and the ON_DONE or ON_CLEAR event are evaluated
 */
var IsTyping = function(inputSelector, timeoutValue) {
        var TIME_OUT_VALUE = timeoutValue | 500;
        isTyping = this;

        //States
        var ON_CLEAR  = 0;
        var IS_TYPING = 1;
        var ON_DONE   = 2;
        var ON_SUBMIT = 3;

        isTyping.lastActionPerformed = ON_CLEAR;

        $(inputSelector).keyup(function(e) {
            var inputContent = $(inputSelector).val();

            setTimeout(function() {
                var new_inputContent = $(inputSelector).val();
                if(isTyping.lastActionPerformed != ON_DONE && inputContent && new_inputContent == inputContent) {
                    isTyping.lastActionPerformed = ON_DONE
                    isTyping.onDone ? isTyping.onDone(inputContent) : false;
                    return;
                }
                if(isTyping.lastActionPerformed != ON_CLEAR  && isTyping.lastActionPerformed != ON_SUBMIT && !new_inputContent) {
                    isTyping.lastActionPerformed = ON_CLEAR;
                    isTyping.onClear ? isTyping.onClear() : false;
                    return;
                }
            }, TIME_OUT_VALUE);

            if(e.keyCode == 13 && inputContent) {
                isTyping.lastActionPerformed = ON_SUBMIT;
                $(inputSelector).val("");
                isTyping.onSubmit ? isTyping.onSubmit(inputContent) : false;
                return;
            }

            if(inputContent && isTyping.lastActionPerformed != IS_TYPING) {
                isTyping.lastActionPerformed = IS_TYPING;
                isTyping.onTyping ? isTyping.onTyping(inputContent) : false;
                return;
            }
        });
        return isTyping;
    }