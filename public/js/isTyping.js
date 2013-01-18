$(document).ready(function() {
    isTyping = new IsTyping();
});
 
var IsTyping = function() {
 
		var TIME_OUT_VALUE = 500; // increase to reduce overhead
		isTyping = this;
		//lastActionPerformed : "ON_CLEAR","IS_TYPING","DONE_TYPING", "ON_SUBMIT"
		isTyping.lastActionPerformed = "ON_CLEAR";
		isTyping.chat_bar_val = $("#chat-bar").val();
 
		isTyping.onTyping = function() {
			console.log("ON_TYPING")
		}
		isTyping.onDone = function() {
			console.log("ON_DONE")
		}
		isTyping.onClearAction = function(message) {
			console.log("ON_SUBMIT  message: ",message)
		}
		isTyping.onClear = function() {
			console.log("ON_CLEAR")
		}
 
		$("#chat-bar").keyup(function(e) {
			//I added this for visibility in the log
			console.log("---------------");
 
			var message = $("#chat-bar").val();
			//
			//this is the ERROR we were having, the whole process was blocked because of a misplace 'if' close
			// that was englobing the whole function
			//---> if(isTyping.lastActionPerformed == "IS_TYPING") {
			setTimeout(function() {
				var new_message = $("#chat-bar").val();
				if(isTyping.lastActionPerformed != "DONE_TYPING" && new_message == message && message) {
					isTyping.lastActionPerformed = "DONE_TYPING"
					isTyping.onDone();
					return;
				}
				// I moved this block in the timeout instead because what we want to know is if there was a message and it's gone 
				// i also add a condition on ON_SUBMIT because the event ON_CLEAR was still triggered after the ON_SUBMIT
				if(!new_message && isTyping.lastActionPerformed != "ON_CLEAR" &&isTyping.lastActionPerformed != "ON_SUBMIT" ) {
					isTyping.lastActionPerformed = "ON_CLEAR";
					isTyping.onClear();
					return
				}
			}, TIME_OUT_VALUE);
 
			// 13 : enter
			var enter_key = false;
			if(e.keyCode == 13) {
				if(message != "") {
					$("#chat-bar").val("");
					enter_key = true;
				}
			}
			// 8 mean backspace
			if(e.keyCode == 13 && message) {
				isTyping.lastActionPerformed = "ON_SUBMIT";
				isTyping.onClearAction(message);
				return
			}
 
			if(message && isTyping.lastActionPerformed != "IS_TYPING") {
				isTyping.lastActionPerformed = "IS_TYPING"
				isTyping.onTyping();
				return;
			}
 
			if(message && (isTyping.lastActionPerformed == "ON_CLEAR" || isTyping.lastActionPerformed == "ON_SUBMIT")) {
				isTyping.lastActionPerformed = "IS_TYPING"
				isTyping.onTyping()
			}
			//}// the infamous misplaced bracket
			return true;
		});
		return isTyping;
	}