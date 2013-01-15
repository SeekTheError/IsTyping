$(document).ready(function() {
	isTyping = new IsTyping();
});

var IsTyping = function() {

		var TIME_OUT_VALUE = 200; // increase to reduce overhead
		isTyping = this;
		//CHAT_STATUS : "CLEAR","IS_TYPING","DONE_TYPING" 
		isTyping.chat_status = "CLEAR";
		isTyping.chat_bar_message = $("#chat-bar").val();

		isTyping.onTyping=function(){}
		isTyping.onDone=function(){}
		isTyping.onClearAction=function(){}
		isTyping.onClear=function(){}

		$("#chat-bar").keyup(function(e) {
			console.log(e);
			var enter_key = false;
			var message = $("#chat-bar").val();
			if(e.keyCode == 13) {
				if(message != "") {
					$("#chat-bar").val("");
					enter_key = true;
				}
			}
			
			if((isTyping.chat_status == "DONE_TYPING" || isTyping.chat_status == "IS_TYPING") & enter_key) {
				isTyping.chat_status = "CLEAR";
				console.log(isTyping.chat_status, " sending ", message);
				isTyping.onClearAction();
				return;
			};
			if((isTyping.chat_status == "CLEAR" || isTyping.chat_status == "DONE_TYPING") && !enter_key && message) {
				isTyping.chat_status = "IS_TYPING";
				console.log(isTyping.chat_status);
				isTyping.onTyping();
			};
			if(isTyping.chat_status == "IS_TYPING") {
				var last_val = $("#chat-bar").val();
				setTimeout(function() {
					chat_bar_val = $("#chat-bar").val();
					if(last_val == chat_bar_val && chat_bar_val && chat_bar_val != isTyping.last_chat_bar_val) {
						isTyping.chat_status = "DONE_TYPING";
						console.log(isTyping.chat_status);
						isTyping.last_chat_bar_val = chat_bar_val;
					} else if(chat_bar_val == "" && isTyping.chat_status != "CLEAR") {
						isTyping.chat_status = "CLEAR";
						isTyping.onClear();
						console.log(isTyping.chat_status)
					}
				}, TIME_OUT_VALUE);
			}
			return true;
		});
	return isTyping;
	}