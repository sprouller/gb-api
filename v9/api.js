var myHeaders = new Headers();
myHeaders.append("Authorization", "183E3D348FF1624BBF4F6711422CF54B");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'manual'
};

var container = document.getElementById("table-container");

fetch("https://live.bloodstockreports.co.uk/4DCGI/EANDRAPI/RacesForList?entryDays=6&resultsMax=40&resultsOffset=0", requestOptions)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    var table = document.createElement("table");
    table.classList.add("table2_list");

    // Sort the entries based on raceDate
    data.entries.sort((a, b) => new Date(a.raceDate) - new Date(b.raceDate));

    // Create the header row
    var headerRow = document.createElement("tr");
    headerRow.classList.add("table2_header");

    var horseHeader = document.createElement("th");
    horseHeader.classList.add("table2_column");
    horseHeader.textContent = "Horse";
    headerRow.appendChild(horseHeader);

    var raceCourseHeader = document.createElement("th");
    raceCourseHeader.classList.add("table2_column");
    raceCourseHeader.textContent = "Race Course";
    headerRow.appendChild(raceCourseHeader);

    var raceDetailsHeader = document.createElement("th");
    raceDetailsHeader.classList.add("table2_column");
    raceDetailsHeader.textContent = "Race Details";
    headerRow.appendChild(raceDetailsHeader);

    var raceDateHeader = document.createElement("th");
    raceDateHeader.classList.add("table2_column");
    raceDateHeader.textContent = "Race Date";
    headerRow.appendChild(raceDateHeader);

    var raceTimeHeader = document.createElement("th");
    raceTimeHeader.classList.add("table2_column");
    raceTimeHeader.textContent = "Race Time";
    headerRow.appendChild(raceTimeHeader);

    table.appendChild(headerRow);

    // Create table rows
    data.entries.forEach(entry => {
      var row = document.createElement("tr");
      row.classList.add("table2_item");

      if (entry.declared === "true") {
        // Entry is declared, set background color
        row.classList.add("declared-row");
      }

      var horseCell = document.createElement("td");
      horseCell.classList.add("table2_column");
      horseCell.textContent = entry.animalName;
      row.appendChild(horseCell);

      var raceCourseCell = document.createElement("td");
      raceCourseCell.classList.add("table2_column");
      raceCourseCell.textContent = entry.raceCourse;
      row.appendChild(raceCourseCell);

      var raceDetailsCell = document.createElement("td");
      raceDetailsCell.classList.add("table2_column");
      raceDetailsCell.textContent = entry.raceDetails;
      row.appendChild(raceDetailsCell);

      var raceDateCell = document.createElement("td");
      raceDateCell.classList.add("table2_column");
      var dateParts = entry.raceDate.split("-");
      var formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
      raceDateCell.textContent = formattedDate;
      row.appendChild(raceDateCell);

      var raceTimeCell = document.createElement("td");
      raceTimeCell.classList.add("table2_column");
      raceTimeCell.textContent = entry.raceTime;
      row.appendChild(raceTimeCell);

      table.appendChild(row);
    });

    var tableBodyContainer = document.createElement("div");
    tableBodyContainer.classList.add("table2_body-container");
    tableBodyContainer.appendChild(table);

    container.appendChild(tableBodyContainer);
  })
  .catch(error => console.log('error', error));
