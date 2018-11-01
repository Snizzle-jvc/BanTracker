// ==UserScript==
// @name        JV BanTracker
// @author      Snizzle
// @version     1.1
// @downloadURL https://github.com/Snizzle-jvc/BanTracker/raw/master/BanTracker.user.js
// @updateURL   https://github.com/Snizzle-jvc/BanTracker/raw/master/BanTracker.user.js
// @supportURL  http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=Snizzle;Snitchzzle
// @copyright   2018, Snizzle
// @licence     MIT
// @description Suivi de ban sur JVC
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match       *://www.jeuxvideo.com/forums/*
// @match       *://www.jeuxvideo.com/profil/*
// @run-at      document-end
// ==/UserScript==
$(function(b) {
  var d = JSON.parse(localStorage.getItem("bantracker")) || [];
  b(".bloc-option-profil").prepend('<span class="picto-msg-exclam bantracker-btn" title="Ajouter au BanTracker" style="cursor:pointer"><span>Mass MP</span></span>');
  b(".col-right").prepend('<div class="panel panel-jv-forum panel-bantracker"><div class="panel-heading panel-heading-bantracker">Ban Tracker</div><div class="panel-body panel-body-bantracker" style="text-align:center;"><div class="scrollable-content bloc-info-forum" id="liste-bantracker"></div></div></div>');
  (function() {
    for (var a = 0; a < d.length; a++) {
      b("#liste-bantracker").append("<span class='btn btn-actu-new-list-forum btn-list-bantracker' title='Supprimer ce pseudo de BanTracker' id='" + d[a].toLowerCase() + "' style='margin-right:5px;margin-top:5px'>" + d[a] + "<span class='picto-msg-croix pull-right' style='margin: 5px 5px 0 5px;'></span></span>");
      var c = "http://www.jeuxvideo.com/profil/" + d[a].toLowerCase() + "?mode=infos";
      console.log(c);
      b.get(c, function(a) {
        b(a).find(".alert-danger").length && (a = b(a).find(".infos-pseudo h1").html().trim().toLowerCase(), b(".btn-list-bantracker").attr("id"), b("#" + a).css("background", "red"));
      });
    }
  })();
  b("#liste-bantracker").after('<br><input class="user-add-bantracker" placeholder="Ajouter un pseudo" style="margin-bottom: 12px;color:black"></input><button class="btn-add-bantracker" style="margin-left: 5px;color:black">OK</button>');
  b(".btn-add-bantracker").click(function() {
    var a = b(".user-add-bantracker").val(), c = "http://www.jeuxvideo.com/profil/" + a.toLowerCase() + "?mode=infos";
    b.get(c, function(c) {
      b(c).find("li .lien-profil").length && (c = JSON.parse(localStorage.getItem("bantracker")) || [], c.push(a), localStorage.setItem("bantracker", JSON.stringify(c)), b("#liste-bantracker").append("<span class='btn btn-actu-new-list-forum btn-list-bantracker' title='Supprimer ce pseudo de BanTracker' id='" + a.toLowerCase() + "' style='margin-right:5px;margin-top:5px'>" + a + "<span class='picto-msg-croix pull-right' style='margin: 5px 5px 0 5px;'></span></span>"));
    });
  });
  b(".btn-list-bantracker").click(function() {
    var a = b(this).attr("id"), c = JSON.parse(localStorage.getItem("bantracker"));
    a = c.indexOf(a);
    0 <= a && (c.splice(a, 1), b(this).hide(), localStorage.setItem("bantracker", JSON.stringify(c)));
  });
  b(".bantracker-btn").click(function() {
    var a = b(".infos-pseudo h1").html().trim(), c = JSON.parse(localStorage.getItem("bantracker")) || [];
    c.push(a);
    localStorage.setItem("bantracker", JSON.stringify(c));
    b(this).hide();
  });
  b(".bantracker-btn").each(function() {
    var a = b(".infos-pseudo h1").html().trim(), c = b(".account-pseudo").html();
    (localStorage.getItem("bantracker").includes(a) || a == c) && b(this).hide();
  });
});
