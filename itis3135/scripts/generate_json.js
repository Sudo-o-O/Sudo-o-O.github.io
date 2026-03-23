(function () {
  "use strict";

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getValue(name) {
    var field = document.querySelector('[name="' + name + '"]');
    return field ? field.value.trim() : "";
  }

  function getImageSrc() {
    var preview = document.getElementById("imagePreview");
    return preview && preview.getAttribute("src")
      ? preview.getAttribute("src")
      : getValue("defaultImage") || "images/profile-landscape.jpeg";
  }

  function getCourses() {
    var courseRows = document.querySelectorAll(".course-entry");

    return Array.prototype.map
      .call(courseRows, function (row) {
        var departmentField = row.querySelector('[name="courseDepartment"]');
        var numberField = row.querySelector('[name="courseNumber"]');
        var nameField = row.querySelector('[name="courseName"]');
        var reasonField = row.querySelector('[name="courseReason"]');

        return {
          department: departmentField ? departmentField.value.trim() : "",
          number: numberField ? numberField.value.trim() : "",
          name: nameField ? nameField.value.trim() : "",
          reason: reasonField ? reasonField.value.trim() : ""
        };
      })
      .filter(function (course) {
        return (
          course.department || course.number || course.name || course.reason
        );
      });
  }

  function buildHeading() {
    var first = getValue("firstName");
    var middle = getValue("middleName");
    var last = getValue("lastName");
    var divider = getValue("divider");
    var adjective = getValue("mascotAdjective");
    var animal = getValue("mascotAnimal");

    var displayName = (
      first +
      " " +
      (middle ? middle + " " : "") +
      last
    ).trim();

    return (displayName + " " + divider + " " + adjective + " " + animal)
      .replace(/\s+/g, " ")
      .trim();
  }

  function buildJsonObject() {
    return {
      fullHeading: buildHeading(),
      firstName: getValue("firstName"),
      middleInitial: getValue("middleName"),
      preferredName: getValue("nickname"),
      lastName: getValue("lastName"),
      divider: getValue("divider"),
      mascotAdjective: getValue("mascotAdjective"),
      mascotAnimal: getValue("mascotAnimal"),
      acknowledgmentStatement: getValue("acknowledgment"),
      acknowledgmentDate: getValue("ackDate"),
      image: getImageSrc(),
      imageCaption: getValue("imageCaption"),
      personalStatement: getValue("personalStatement"),
      personalBackground: getValue("personalBackground"),
      academicBackground: getValue("academicBackground"),
      professionalBackground: getValue("professionalBackground"),
      academicCareerGoals: getValue("careerGoals"),
      subjectBackground: getValue("subjectBackground"),
      primaryWorkComputer: getValue("primaryComputer"),
      backupWorkComputerLocationPlan: getValue("backupComputer"),
      funnyThing: getValue("funnyThing"),
      share: getValue("share"),
      quote: getValue("quote"),
      quoteAuthor: getValue("quoteAuthor"),
      courses: getCourses(),
      links: [
        { name: "GitHub.io", href: getValue("githubPages") },
        { name: "GitHub", href: getValue("github") },
        { name: "CLT Web", href: getValue("charlotteWeb") },
        { name: "freeCodeCamp", href: getValue("freeCodeCamp") },
        { name: "LinkedIn", href: getValue("linkedin") }
      ]
    };
  }

  function renderCodeBlock(title, codeString, languageClass) {
    var main = document.getElementById("mainContent");

    if (!main) {
      return;
    }

    main.innerHTML =
      "<h2>" +
      escapeHtml(title) +
      "</h2>" +
      '<section class="code-output">' +
      "<h3>Copyable JSON Output</h3>" +
      '<pre><code class="' +
      escapeHtml(languageClass) +
      '">' +
      escapeHtml(codeString) +
      "</code></pre>" +
      '<p><a href="intro_form.html">Reset Form</a></p>' +
      "</section>";

    if (window.hljs) {
      var blocks = document.querySelectorAll("pre code");
      Array.prototype.forEach.call(blocks, function (block) {
        window.hljs.highlightElement(block);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var jsonBtn = document.getElementById("jsonBtn");
    if (!jsonBtn) {
      return;
    }

    jsonBtn.addEventListener("click", function () {
      var jsonOutput = JSON.stringify(buildJsonObject(), null, 2);
      renderCodeBlock("Introduction JSON", jsonOutput, "language-json");
    });
  });
})();
