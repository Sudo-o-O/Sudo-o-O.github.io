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
    if (!field) {
      return "";
    }
    return field.value.trim();
  }

  function getImageSrc() {
    var preview = document.getElementById("imagePreview");
    if (preview && preview.getAttribute("src")) {
      return preview.getAttribute("src");
    }
    return getValue("defaultImage") || "images/profile-landscape.jpeg";
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

  function buildIntroductionHtml() {
    var courses = getCourses();

    var courseHtml = courses
      .map(function (course) {
        return (
          "            <li><strong>" +
          escapeHtml(course.department) +
          " " +
          escapeHtml(course.number) +
          " - " +
          escapeHtml(course.name) +
          ":</strong> " +
          escapeHtml(course.reason) +
          "</li>"
        );
      })
      .join("\n");

    return (
      "<h2>Introduction HTML</h2>\n" +
      '<section class="intro-profile">\n' +
      "    <h3>" +
      escapeHtml(buildHeading()) +
      "</h3>\n" +
      "    <figure>\n" +
      '        <img src="' +
      escapeHtml(getImageSrc()) +
      '" alt="Portrait of ' +
      escapeHtml(getValue("firstName")) +
      " " +
      escapeHtml(getValue("lastName")) +
      '" width="400" />\n' +
      "        <figcaption><em>" +
      escapeHtml(getValue("imageCaption")) +
      "</em></figcaption>\n" +
      "    </figure>\n" +
      "</section>\n\n" +
      '<p class="acknowledgment">' +
      escapeHtml(getValue("acknowledgment")) +
      " - " +
      escapeHtml(getValue("ackDate")) +
      "</p>\n\n" +
      "<p>" +
      escapeHtml(getValue("personalStatement")) +
      "</p>\n\n" +
      "<ul>\n" +
      "    <li><strong>Personal Background:</strong> " +
      escapeHtml(getValue("personalBackground")) +
      "</li>\n" +
      "    <li><strong>Academic Background:</strong> " +
      escapeHtml(getValue("academicBackground")) +
      "</li>\n" +
      "    <li><strong>Professional Background:</strong> " +
      escapeHtml(getValue("professionalBackground")) +
      "</li>\n" +
      "    <li><strong>Academic &amp; Career Goals:</strong> " +
      escapeHtml(getValue("careerGoals")) +
      "</li>\n" +
      "    <li><strong>Background in this Subject:</strong> " +
      escapeHtml(getValue("subjectBackground")) +
      "</li>\n" +
      "    <li><strong>Primary Work Computer:</strong> " +
      escapeHtml(getValue("primaryComputer")) +
      "</li>\n" +
      "    <li><strong>Backup Work Computer &amp; Location Plan:</strong> " +
      escapeHtml(getValue("backupComputer")) +
      "</li>\n" +
      "    <li>\n" +
      "        <strong>Courses I'm Taking &amp; Why:</strong>\n" +
      "        <ol>\n" +
      courseHtml +
      "\n" +
      "        </ol>\n" +
      "    </li>\n" +
      (getValue("funnyThing")
        ? "    <li><strong>Funny / Interesting item to remember me by:</strong> " +
          escapeHtml(getValue("funnyThing")) +
          "</li>\n"
        : "") +
      (getValue("share")
        ? "    <li><strong>I'd also like to share:</strong> " +
          escapeHtml(getValue("share")) +
          "</li>\n"
        : "") +
      "</ul>\n\n" +
      "<blockquote>\n" +
      '    "' +
      escapeHtml(getValue("quote")) +
      '"\n' +
      "    <em>- " +
      escapeHtml(getValue("quoteAuthor")) +
      "</em>\n" +
      "</blockquote>"
    );
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
      "<h3>Copyable HTML Output</h3>" +
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
    var htmlBtn = document.getElementById("htmlBtn");

    if (!htmlBtn) {
      return;
    }

    htmlBtn.addEventListener("click", function () {
      var htmlOutput = buildIntroductionHtml();
      renderCodeBlock("Introduction HTML", htmlOutput, "language-html");
    });
  });
})();
