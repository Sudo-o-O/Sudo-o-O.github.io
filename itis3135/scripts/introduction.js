document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var form = document.getElementById("form");
  var imageInput = document.getElementById("image");
  var imagePreview = document.getElementById("imagePreview");
  var previewCaption = document.getElementById("previewCaption");
  var captionInput = document.getElementById("imageCaption");
  var defaultImage = document.getElementById("defaultImage");
  var clearBtn = document.getElementById("clearBtn");
  var addCourseBtn = document.getElementById("addCourseBtn");

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function hasClass(element, className) {
    if (!element || !element.className) {
      return false;
    }
    return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
  }

  function findParentByClass(element, className) {
    while (element && element !== document) {
      if (hasClass(element, className)) {
        return element;
      }
      element = element.parentNode;
    }
    return null;
  }

  if (imageInput && imagePreview) {
    imageInput.addEventListener("change", function () {
      var file = imageInput.files && imageInput.files[0];
      var reader;

      if (!file) {
        return;
      }

      reader = new FileReader();
      reader.onload = function (event) {
        imagePreview.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  if (captionInput && previewCaption) {
    captionInput.addEventListener("input", function () {
      previewCaption.textContent =
        captionInput.value.trim() || "Photo of Matthew R. Gibbs";
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      var data;
      var first;
      var middle;
      var last;
      var divider;
      var mascotAdjective;
      var mascotAnimal;
      var displayName;
      var fullHeading;
      var imgSrc;
      var caption;
      var personalStatement;
      var personalBackground;
      var academicBackground;
      var professionalBackground;
      var careerGoals;
      var subjectBackground;
      var primary;
      var backup;
      var funny;
      var share;
      var quote;
      var quoteAuthor;
      var ack;
      var ackDate;
      var courses;
      var courseHTML;
      var output;

      e.preventDefault();

      data = new FormData(form);

      first = (data.get("firstName") || "").trim();
      middle = (data.get("middleName") || "").trim();
      last = (data.get("lastName") || "").trim();
      divider = (data.get("divider") || "|").trim();
      mascotAdjective = (data.get("mascotAdjective") || "").trim();
      mascotAnimal = (data.get("mascotAnimal") || "").trim();

      displayName = (first + " " + (middle ? middle + " " : "") + last).trim();
      fullHeading = (
        displayName +
        " " +
        divider +
        " " +
        mascotAdjective +
        " " +
        mascotAnimal
      )
        .replace(/\s+/g, " ")
        .trim();

      imgSrc =
        (document.getElementById("imagePreview") &&
          document.getElementById("imagePreview").src) ||
        data.get("defaultImage");

      caption = (data.get("imageCaption") || "").trim();
      personalStatement = (data.get("personalStatement") || "").trim();
      personalBackground = (data.get("personalBackground") || "").trim();
      academicBackground = (data.get("academicBackground") || "").trim();
      professionalBackground = (
        data.get("professionalBackground") || ""
      ).trim();
      careerGoals = (data.get("careerGoals") || "").trim();
      subjectBackground = (data.get("subjectBackground") || "").trim();
      primary = (data.get("primaryComputer") || "").trim();
      backup = (data.get("backupComputer") || "").trim();
      funny = (data.get("funnyThing") || "").trim();
      share = (data.get("share") || "").trim();
      quote = (data.get("quote") || "").trim();
      quoteAuthor = (data.get("quoteAuthor") || "").trim();
      ack = (data.get("acknowledgment") || "").trim();
      ackDate = (data.get("ackDate") || "").trim();

      courses = document.querySelectorAll(".course-entry");
      courseHTML = "";

      Array.prototype.forEach.call(courses, function (course) {
        var deptField = course.querySelector('[name="courseDepartment"]');
        var numField = course.querySelector('[name="courseNumber"]');
        var nameField = course.querySelector('[name="courseName"]');
        var reasonField = course.querySelector('[name="courseReason"]');

        var dept = deptField ? deptField.value.trim() : "";
        var num = numField ? numField.value.trim() : "";
        var name = nameField ? nameField.value.trim() : "";
        var reason = reasonField ? reasonField.value.trim() : "";

        if (dept || num || name || reason) {
          courseHTML +=
            "<li><strong>" +
            escapeHtml(dept) +
            " " +
            escapeHtml(num) +
            " - " +
            escapeHtml(name) +
            ":</strong> " +
            escapeHtml(reason) +
            "</li>";
        }
      });

      output =
        "<h2>Introduction Form</h2>" +
        '<section class="intro-profile">' +
        "<h3>" +
        escapeHtml(fullHeading) +
        "</h3>" +
        "<figure>" +
        '<img src="' +
        escapeHtml(imgSrc) +
        '" alt="Portrait of ' +
        escapeHtml(displayName) +
        '" width="400" />' +
        "<figcaption><em>" +
        escapeHtml(caption) +
        "</em></figcaption>" +
        "</figure>" +
        "</section>" +
        '<p class="acknowledgment">' +
        escapeHtml(ack) +
        " - " +
        escapeHtml(ackDate) +
        "</p>" +
        "<p>" +
        escapeHtml(personalStatement) +
        "</p>" +
        "<ul>" +
        "<li><strong>Personal Background:</strong> " +
        escapeHtml(personalBackground) +
        "</li>" +
        "<li><strong>Academic Background:</strong> " +
        escapeHtml(academicBackground) +
        "</li>" +
        "<li><strong>Professional Background:</strong> " +
        escapeHtml(professionalBackground) +
        "</li>" +
        "<li><strong>Academic &amp; Career Goals:</strong> " +
        escapeHtml(careerGoals) +
        "</li>" +
        "<li><strong>Background in this Subject:</strong> " +
        escapeHtml(subjectBackground) +
        "</li>" +
        "<li><strong>Primary Work Computer:</strong> " +
        escapeHtml(primary) +
        "</li>" +
        "<li><strong>Backup Work Computer &amp; Location Plan:</strong> " +
        escapeHtml(backup) +
        "</li>" +
        "<li><strong>Courses I'm Taking &amp; Why:</strong><ol>" +
        courseHTML +
        "</ol></li>" +
        (funny
          ? "<li><strong>Funny / Interesting item to remember me by:</strong> " +
            escapeHtml(funny) +
            "</li>"
          : "") +
        (share
          ? "<li><strong>I'd also like to share:</strong> " +
            escapeHtml(share) +
            "</li>"
          : "") +
        "</ul>" +
        '<blockquote>"' +
        escapeHtml(quote) +
        '" <em>- ' +
        escapeHtml(quoteAuthor) +
        "</em></blockquote>" +
        '<p><a href="intro_form.html">Reset Form</a></p>';

      document.getElementById("mainContent").innerHTML = output;
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      var elements = document.querySelectorAll("form input, form textarea");

      Array.prototype.forEach.call(elements, function (el) {
        if (el.type !== "hidden" && el.type !== "file") {
          el.value = "";
        }
      });

      if (imagePreview && defaultImage) {
        imagePreview.src = defaultImage.value;
      }

      if (previewCaption) {
        previewCaption.textContent = "";
      }
    });
  }

  if (addCourseBtn) {
    addCourseBtn.addEventListener("click", function () {
      var container = document.getElementById("courseList");
      var div = document.createElement("div");

      if (!container) {
        return;
      }

      div.className = "course-entry";
      div.innerHTML =
        '<div><label>Department</label><input name="courseDepartment" type="text" placeholder="Department" required="required" /></div>' +
        '<div><label>Number</label><input name="courseNumber" type="text" placeholder="Course number" required="required" /></div>' +
        '<div><label>Name</label><input name="courseName" type="text" placeholder="Course name" required="required" /></div>' +
        '<div><label>Reason</label><input name="courseReason" type="text" placeholder="Reason for taking the course" required="required" /></div>' +
        '<div class="course-delete-wrap"><button type="button" class="delete-course">Delete</button></div>';

      container.appendChild(div);
    });
  }

  document.addEventListener("click", function (e) {
    var target = e.target || e.srcElement;
    var entry;

    if (hasClass(target, "delete-course")) {
      entry = findParentByClass(target, "course-entry");
      if (entry && entry.parentNode) {
        entry.parentNode.removeChild(entry);
      }
    }
  });
});
