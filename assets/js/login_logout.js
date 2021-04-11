export {buildLogin, buildLogout};

const URL_LOGOUT = "assets/php/logout.php";
const URL_LOGIN = "assets/php/login.php";

let buildLogout = () => {
  return $("<button />").attr({class: "btn btn-danger"}).html("Logout").on("click",function(){
    //AJAX logout
    $.ajax({
      url: URL_LOGOUT,
      method: "get",
      dataType: "json"
    }).done(function (data) {
      window.location.reload(true);
    }).fail(function() {
      // TODO : displayCriticalError("...");
    });
  });
};

let buildLogin = () => {
  return $("<form />").attr({class: "form-login input-group mb-3"})
      .append(
          $("<input />").attr({name: "username", type: "text", placeholder: "Username", class: "form-control form-login-username"}),
          $("<input />").attr({name: "password", type: "password", placeholder: "Password", class: "form-control form-login-password"}),
          $("<div />").attr({class: "input-group-append"}).append(
              $("<button />")
                  .attr({type: "submit", class: "btn input-group-append btn-primary"})
                  .html("Login")
          ),
      ).on("submit",function() {
        $.ajax({
          url: URL_LOGIN,
          method: "post",
          dataType: "json",
          data: $(this).serialize(),
        }).done(function (data) {
          if(data.hasOwnProperty("result")) {
            if (data.result){
              // login successful!
              window.location.reload(true);
            } else {
              // error
              if (data.hasOwnProperty("message")) {
                if (data.message) {
                  $("#message .modal-title").html("Error !");
                  $("#message .modal-body").html(data.message);
                  $("#message").modal();
                } else {
                  // TODO : displayCriticalError("...");
                }
              } else {
                // TODO : displayCriticalError("...");
              }
            }
          } else {
            // TODO : displayCriticalError("...");
          }
        }).fail(function() {
          // TODO : displayCriticalError("...");
        });
        return false;// faire croire qu'il y a une erreur
      });
};