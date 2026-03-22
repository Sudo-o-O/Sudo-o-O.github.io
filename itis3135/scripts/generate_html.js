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

  function buildIntroductionHtml() {
    const courses = getCourses();

    const courseHtml = courses
      .map(
        (course) =>
          `            <li><strong>${escapeHtml(course.department)} ${escapeHtml(
            course.number,
          )} – ${escapeHtml(course.name)}:</strong> ${escapeHtml(course.reason)}</li>`,
      )
      .join("\n");

    return `<h2>Introduction HTML</h2>
<section class="intro-profile">
    <h3>${escapeHtml(buildHeading())}</h3>
    <figure>
        <img src="${escapeHtml(getImageSrc())}" alt="Portrait of ${escapeHtml(
          getValue("firstName"),
        )} ${escapeHtml(getValue("lastName"))}" width="400" />
        <figcaption><em>${escapeHtml(getValue("imageCaption"))}</em></figcaption>
    </figure>
</section>

<p class="acknowledgment">${escapeHtml(getValue("acknowledgment"))} — ${escapeHtml(
      getValue("ackDate"),
    )}</p>

<p>${escapeHtml(getValue("personalStatement"))}</p>

<ul>
    <li><strong>Personal Background:</strong> ${escapeHtml(
      getValue("personalBackground"),
    )}</li>
    <li><strong>Academic Background:</strong> ${escapeHtml(
      getValue("academicBackground"),
    )}</li>
    <li><strong>Professional Background:</strong> ${escapeHtml(
      getValue("professionalBackground"),
    )}</li>
    <li><strong>Academic &amp; Career Goals:</strong> ${escapeHtml(
      getValue("careerGoals"),
    )}</li>
    <li><strong>Background in this Subject:</strong> ${escapeHtml(
      getValue("subjectBackground"),
    )}</li>
    <li><strong>Primary Work Computer:</strong> ${escapeHtml(
      getValue("primaryComputer"),
    )}</li>
    <li><strong>Backup Work Computer &amp; Location Plan:</strong> ${escapeHtml(
      getValue("backupComputer"),
    )}</li>
    <li>
        <strong>Courses I’m Taking &amp; Why:</strong>
        <ol>
${courseHtml}
        </ol>
    </li>
    ${
      getValue("funnyThing")
        ? `    <li><strong>Funny / Interesting item to remember me by:</strong> ${escapeHtml(
            getValue("funnyThing"),
          )}</li>`
        : ""
    }
    ${
      getValue("share")
        ? `    <li><strong>I’d also like to share:</strong> ${escapeHtml(
            getValue("share"),
          )}</li>`
        : ""
    }
</ul>

<blockquote>
    “${escapeHtml(getValue("quote"))}”
    <em>— ${escapeHtml(getValue("quoteAuthor"))}</em>
</blockquote>`;
  }

  function renderCodeBlock(title, codeString, languageClass) {
    const main = document.getElementById("mainContent");

    main.innerHTML = `
      <h2>${escapeHtml(title)}</h2>
      <section class="code-output">
        <h3>Copyable HTML Output</h3>
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
    const htmlBtn = document.getElementById("htmlBtn");
    if (!htmlBtn) return;

    htmlBtn.addEventListener("click", function () {
      const htmlOutput = buildIntroductionHtml();
      renderCodeBlock("Introduction HTML", htmlOutput, "language-html");
    });
  });
})();
