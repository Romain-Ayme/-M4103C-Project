import {buildLogin, buildLogout} from "./login_logout.js";
import {getRandom, getCategories, getQuery} from "./call_api.js";

const URL_IS_CONNECTED = "assets/php/is_connected.php";

$(() => {
  $("#message").on('shown.bs.modal', function () {
    $('#message-btn-close').trigger("focus");
  });

  $.ajax({
    url: URL_IS_CONNECTED,
    method: "get",
    dataType: "json"

  }).done(function (data) {
    if(data.hasOwnProperty("result")) {
      if (data.result){
        if (data.hasOwnProperty("is_connected")) {
          if (data.hasOwnProperty("message")) {
            $("#message .modal-title").html("Sucess login !");
            $("#message .modal-body").html(data.message);
            $("#message").modal();
          }
          let $loginLogout = $("#login-logout");
          if (data.is_connected){
            $loginLogout.append(buildLogout());

            // TODO : Afficher le site ici

            $(".login").fadeIn().css({display: "flex"});
            getCategories();

            $('#button-random').on("click", function() {
              $("#center").empty();
              getRandom();
            })

            $('#button-query').on("click", function() {
              getQuery($("#site-search").val());
            })

          } else {
            $loginLogout.append(buildLogin());
          }
          $loginLogout.fadeIn();
        }else{
          // TODO : displayCriticalError("...");
        }
      } else {
        // TODO : displayCriticalError("...");
      }
    }
  }).fail(function() {
    // TODO : displayCriticalError("...");
  });
});