$(function(){"use strict";function f(a){$(".selected").removeClass("selected"),a.children(".folder-display").addClass("selected")}function g(){$(".nofolders-message").removeClass("hidden")}function h(a){function h(a,c,d,e){var f=b.clone().data("id",c).css("margin-left",e+"px").addClass("folder-found").appendTo(d);return f.find(".folder-name").text(a||"root"),f}function i(a,b,c,e){var f=$.grep(a,function(a){return a.parent_id===b});$.each(f,function(b,f){var g=h(f.name,f.id,c,e);i(a,f.id,g,e+d)})}var c,e,b=$(".folder").detach(),d=20;c=$.grep(a.folders,function(a){return"root"===a.object_type})[0],e=h(c.name,c.id,$(".folders"),0),i(a.folders,c.id,e,d),f(e),1===a.folders.length&&g()}function i(a){$(".header-text").text(a).removeClass("hidden")}function j(a){a?$(".progress").removeClass("hidden"):$(".progress").addClass("hidden")}function k(a){j(!1),$("#error").removeClass("hidden").text(a),$(".content, .footer").addClass("hidden")}function l(a){acom_analytics.event(a)}function m(a){if(util.consoleLog("handler message: "),"set-text"===a.progress_op&&(i(a.text),j(a.busy)),"set-error"===a.progress_op&&k(a.text),"folders"===a.progress_op&&h(a),"html-blob"===a.progress_op)if(util.consoleLog(a.blob.html.length),util.consoleLog("received html blob"),j(!1),a.error)k(a.error),i("Oops!"),util.consoleLog(a.error),l(acom_analytics.e.HTML_SOURCE_SIZE_TOO_LARGE_ERROR);else{i("HTML Ready for Upload and Conversion"),e.resolve(a.blob);var b=a.blob.currentSize/1048576;acom_analytics.checkAndLogHTMLBlobSize(b)}}function n(a){return decodeURIComponent(a.replace(/\+/g," "))}function o(){a()}var b,c,d,a=function(){util.messageToMain({main_op:"file_spec_done",dest_folder:$(".selected").parent().data("id"),filename:$(".filename").val()})},e=$.Deferred();$(".translate").each(function(){util.translateElement(this)}),location.hash.length>1&&(b=location.hash.substring(1).split("&"),$.each(b,function(){c=this.split("="),"filename"===c[0]&&(d=n(c[1]),$(".fileicon").removeClass("hidden"),$(".done").removeClass("hidden"),$(".filelabel").text(d).removeClass("hidden"),$(".filename").val(d).removeClass("hidden"),$(".folders").removeClass("hidden"),j(!1)),"message"===c[0]&&i(n(c[1])),"busy"===c[0]&&j("true"===c[1]),SETTINGS.USE_ECHO_SERVICE&&"progress_op"===c[0]&&"htmlToPdf"===c[1]&&(a=function(){e.then(function(a){$.ajax("http://127.0.0.1:1234/",{type:"POST",data:JSON.stringify(a),contentType:"application/json"}).then(function(a){self.close()},function(){k("To see intermediate results, run the local echo service")})})}),"unavailable"===c[0]&&(i("Oops!"),"html_to_pdf"===c[1]&&($("#message").addClass("error").text("HTML to PDF not yet available.We know you want it.  We want it too. Please give us a few months to work on it.").removeClass("hidden"),$(".right-content, .progress").addClass("hidden")),"flickr"===c[1]&&($("#message").addClass("error").text("Flickr apps not yet available.").removeClass("hidden"),$(".right-content, .progress").addClass("hidden")))}),window.location.hash=""),$(".folders").click(function(a){$(a.target).is(".folder-display *")&&f($(a.target).parent().parent())}),$(".done").click(function(){var a=$(".filename").val();$(".fileicon").removeClass("hidden"),$(".filelabel").text(a).removeClass("hidden"),$(".done, .right-content").addClass("hidden"),j(!0),o()}),util.addMainListener(m)});