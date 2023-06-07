var myHeaders = new Headers();
myHeaders.append("Authorization", "183E3D348FF1624BBF4F6711422CF54B");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'manual'
};

var container = document.getElementById("table");

fetch("https://live.bloodstockreports.co.uk/4DCGI/EANDRAPI/RacesForList?entryDays=6&resultsMax=40&resultsOffset=0", requestOptions)
  .then(response => response.json())
  .then(data => {
  console.log(data);

    var table = document.createElement("div");
    table.classList.add("api-table_list");

    data.entries.sort((a, b) => new Date(a.raceDate) - new Date(b.raceDate));

    data.entries.forEach(entry => {

      var rowDiv = document.createElement("div");
      rowDiv.classList.add("table2_item");

      if (entry.declared === "true") {
        // Entry is declared, set background color
        rowDiv.style.backgroundColor = "#bacee8";
      } else {
        rowDiv.style.backgroundColor = "#f4f4f4";
      }

      var raceDateCell = document.createElement("div");
      raceDateCell.classList.add("table2_column", "is-width-medium", "text-weight-light");
      var dateParts = entry.raceDate.split("-");
      var formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
      raceDateCell.textContent = formattedDate;
      rowDiv.appendChild(raceDateCell);

      var horseCell = document.createElement("div");
      horseCell.classList.add("table2_column", "is-width-large", "text-weight-semibold");
      horseCell.textContent = entry.animalName;
      rowDiv.appendChild(horseCell);

      if (entry.declared === "true") {
        // Entry is declared, show the badge
        var declaredBadge = document.createElement("div");
        declaredBadge.classList.add("table_label-declared");
        declaredBadge.textContent = "Declared";
        horseCell.appendChild(declaredBadge);
      }

      var raceCourseCell = document.createElement("div");
      raceCourseCell.classList.add("table2_column", "is-width-xlarge", "text-weight-light");
      raceCourseCell.textContent = entry.raceCourse;
      rowDiv.appendChild(raceCourseCell);

      var raceTimeCell = document.createElement("div");
      raceTimeCell.classList.add("table2_column", "is-width-medium", "text-weight-light");
      raceTimeCell.textContent = entry.raceTime;
      rowDiv.appendChild(raceTimeCell);

      var raceDetailsCell = document.createElement("div");
      raceDetailsCell.classList.add("table2_column", "is-width-large", "text-weight-semibold");
      raceDetailsCell.textContent = entry.raceDetails;
      rowDiv.appendChild(raceDetailsCell);

      table.appendChild(rowDiv);
    });

    container.appendChild(table);
  })
  .catch(error => console.log('error', error));
