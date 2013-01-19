IsTyping is a Snippet that can be plugged to an html input to perform actions when the input is modified.

 - It is was designed for a chat application, allowing to send events when the user is typing, is done, press enter or delete the input content, in the fashion of most chat applications today.

 - But it could be used for other purpose, for instance to autosave a file via an ajax request when the user just modified the input.
It use jquery, and this repo include a node.js app to serv the files(for test purpose).


Here is a sample demonstrating how you can integrate it:

    $(document).ready(function() {
        var inputSelector = "#chat-bar";
        isTyping = new IsTyping(inputSelector,1000);

        isTyping.onTyping = function() {
            console.log("ON_TYPING")
        }
        isTyping.onDone = function(content) {
            console.log("ON_DONE content: ", message")
        }
        isTyping.onSubmit = function(content) {
            console.log("ON_SUBMIT  content: ", message)
        } 
        isTyping.onClear = function() {
            console.log("ON_CLEAR")
        }
    });

