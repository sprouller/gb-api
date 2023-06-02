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
    table.classList.add("table2_list");

    data.entries.forEach(entry => {
      var rowDiv = document.createElement("div");
      rowDiv.classList.add("table2_item");

      var horseCell = document.createElement("div");
      horseCell.classList.add("table2_column", "is-width-medium", "text-weight-semibold");
      horseCell.textContent = entry.animalName;
      rowDiv.appendChild(horseCell);

      var raceCourseCell = document.createElement("div");
      raceCourseCell.classList.add("table2_column", "is-width-large", "text-weight-light");
      raceCourseCell.textContent = entry.raceCourse;
      rowDiv.appendChild(raceCourseCell);

      var raceDetailsCell = document.createElement("div");
      raceDetailsCell.classList.add("table2_column", "is-width-xlarge", "text-weight-semibold");
      raceDetailsCell.textContent = entry.raceDetails;
      rowDiv.appendChild(raceDetailsCell);

      var raceDateCell = document.createElement("div");
      raceDateCell.classList.add("table2_column", "is-width-medium", "text-weight-light");
      raceDateCell.textContent = entry.raceDate;
      rowDiv.appendChild(raceDateCell);

      var raceTimeCell = document.createElement("div");
      raceTimeCell.classList.add("table2_column", "is-width-medium", "text-weight-light");
      raceTimeCell.textContent = entry.raceTime;
      rowDiv.appendChild(raceTimeCell);

      table.appendChild(rowDiv);
    });

    container.appendChild(table);
  })
  .catch(error => console.log('error', error));
