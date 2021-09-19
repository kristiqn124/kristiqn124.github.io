const btn = document.querySelectorAll(".btn");
const curr_hours = document.querySelectorAll(".curr_hours");
const past_hours = document.querySelectorAll(".past_hours");
const dataTake = function (el, day, users) {
  curr_hours.forEach((element, index) => {
    element.textContent = users[index].timeframes[el].current + "hrs";
  });

  past_hours.forEach((element, index) => {
    element.textContent =
      `${day} - ` + users[index].timeframes[el].previous + "hrs";
  });
};
fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((users) => {
    console.log(users);
    dataTake("weekly", "Last week", users);
    btn.forEach((element) => {
      element.addEventListener("click", function (e) {
        e.preventDefault();
        btn.forEach((btn) => {
          btn.classList.remove("btn_active");
        });
        element.classList.add("btn_active");
        let el = element.textContent.toLocaleLowerCase();
        let day;

        switch (el) {
          case "daily":
            day = "Yesterday";
            break;
          case "weekly":
            day = "Last week";
            break;
          case "monthly":
            day = "Last month";
            break;
        }

        dataTake(el, day, users);
      });
    });
  });
