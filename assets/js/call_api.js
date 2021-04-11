export {getRandom, getCategories, getCategory, getQuery};

let getRandom = function () {
  $.ajax({
    url: "https://api.chucknorris.io/jokes/random",
    method: "get",
    dataType: "json"
  }).done(function (data) {
      console.log(data);
      $("#center").append($("<p/>").append(data.value));
    }).fail(function () {
      console.error("API Fail")
      alert("error : API Fail");
    });
};

let getCategories = function () {
  $.ajax({
    url: "https://api.chucknorris.io/jokes/categories",
    method: "get",
    dataType: "json"
  }).done(function (data) {
    console.log(data);
    for (let i in data)
      $("#categories")
          .append($("<button/>")
          .append(data[i])
              .attr({id: 'button-' + data[i], class: "btn btn-success"})
              .on("click", function() {
                getCategory(data[i])
              })
          );
  }).fail(function () {
    console.error("API Fail")
    alert("error : API Fail");
  });
};

let getCategory = function (category) {
  $.ajax({
    url: "https://api.chucknorris.io/jokes/random",
    method: "get",
    data: {category: category},
    dataType: "json"
  }).done(function (data) {
    console.log(data);
    console.log(data.value);
    $("#center")
        .empty()
        .append($("<p/>")
            .append(data.value)
        );
  }).fail(function () {
    console.error("API Fail")
    alert("error : API Fail");
  });
};

let getQuery = function (query) {
  if (query.length > 2) {
    $.ajax({
      url: "https://api.chucknorris.io/jokes/search",
      method: "get",
      data: {query: query},
      dataType: "json"
    }).done(function (data) {
      console.log(data);
      $("#center").empty();
      for (let i in data) {
        for (let j in data[i]) {
          console.log(data[i][j].value);
          $("#center").append($("<p/>").append(data[i][j].value));
        }
      }
    }).fail(function () {
      console.error("API Fail")
      alert("error : API Fail");
    });
  }
  else {
    //alert("minimum 3 char stp");
    $("#message .modal-title").html("Not like this boy !");
    $("#message .modal-body").html("Need 3 letter minimum");
    $("#message").modal("show");
  }
};