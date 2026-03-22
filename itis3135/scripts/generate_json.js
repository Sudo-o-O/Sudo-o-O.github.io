(function () {
  "use strict";

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getValue(name) {
    const field = document.querySelector(`[name="${name}"]`);
    if (!field) return "";
    return field.value.trim();
  }

  function getImageSrc() {
    const preview = document.getElementById("imagePreview");
    if (preview && preview.getAttribute("src")) {
      return preview.getAttribute("src");
    }
    return getValue("defaultImage") || "images/profile-landscape.jpeg";
  }

  function getCourses() {
    const courseRows = document.querySelectorAll(".course-entry");
    return Array.from(courseRows)
      .map((row) => ({
        department:
          row.querySelector('[name="courseDepartment"]')?.value.trim() || "",
        number: row.querySelector('[name="courseNumber"]')?.value.trim() || "",
        name: row.querySelector('[name="courseName"]')?.value.trim() || "",
        reason: row.querySelector('[name="courseReason"]')?.value.trim() || "",
      }))
      .filter(
        (course) =>
          course.department || course.number || course.name || course.reason,
      );
  }

  function buildHeading() {
    const first = getValue("firstName");
    const middle = getValue("middleName");
    const last = getValue("lastName");
    const divider = getValue("divider");
    const adjective = getValue("mascotAdjective");
    const animal = getValue("mascotAnimal");

    const displayName = `${first} ${middle ? `${middle} ` : ""}${last}`.trim();
    return `${displayName} ${divider} ${adjective} ${animal}`
      .replace(/\s+/g, " ")
      .trim();
  }

  function buildJsonObject() {
    return {
      full_heading: buildHeading(),
      first_name: getValue("firstName"),
      middle_initial: getValue("middleName"),
      preferred_name: getValue("nickname"),
      last_name: getValue("lastName"),
      divider: getValue("divider"),
      mascot_adjective: getValue("mascotAdjective"),
      mascot_animal: getValue("mascotAnimal"),
      acknowledgment_statement: getValue("acknowledgment"),
      acknowledgment_date: getValue("ackDate"),
      image: getImageSrc(),
      image_caption: getValue("imageCaption"),
      personal_statement: getValue("personalStatement"),
      personal_background: getValue("personalBackground"),
      academic_background: getValue("academicBackground"),
      professional_background: getValue("professionalBackground"),
      academic_career_goals: getValue("careerGoals"),
      subject_background: getValue("subjectBackground"),
      primary_work_computer: getValue("primaryComputer"),
      backup_work_computer_location_plan: getValue("backupComputer"),
      funny_thing: getValue("funnyThing"),
      share: getValue("share"),
      quote: getValue("quote"),
      quote_author: getValue("quoteAuthor"),
      courses: getCourses(),
      links: [
        {
          name: "GitHub.io",
          href: getValue("githubPages"),
        },
        {
          name: "GitHub",
          href: getValue("github"),
        },
        {
          name: "CLT Web",
          href: getValue("charlotteWeb"),
        },
        {
          name: "freeCodeCamp",
          href: getValue("freeCodeCamp"),
        },
        {
          name: "LinkedIn",
          href: getValue("linkedin"),
        },
      ],
    };
  }

  function renderCodeBlock(title, codeString, languageClass) {
    const main = document.getElementById("mainContent");

    main.innerHTML = `
      <h2>${escapeHtml(title)}</h2>
      <section class="code-output">
        <h3>Copyable JSON Output</h3>
        <pre><code class="${escapeHtml(languageClass)}">${escapeHtml(
          codeString,
        )}</code></pre>
        <p><a href="intro_form.html">Reset Form</a></p>
      </section>
    `;

    if (window.hljs) {
      document.querySelectorAll("pre code").forEach((block) => {
        window.hljs.highlightElement(block);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const jsonBtn = document.getElementById("jsonBtn");
    if (!jsonBtn) return;

    jsonBtn.addEventListener("click", function () {
      const jsonOutput = JSON.stringify(buildJsonObject(), null, 2);
      renderCodeBlock("Introduction JSON", jsonOutput, "language-json");
    });
  });
})();
