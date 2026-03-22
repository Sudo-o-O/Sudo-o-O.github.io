document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const imageInput = document.getElementById("image");
  const imagePreview = document.getElementById("imagePreview");
  const previewCaption = document.getElementById("previewCaption");
  const captionInput = document.getElementById("imageCaption");
  const defaultImage = document.getElementById("defaultImage");

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  if (imageInput && imagePreview) {
    imageInput.addEventListener("change", () => {
      const file = imageInput.files && imageInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        imagePreview.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  if (captionInput && previewCaption) {
    captionInput.addEventListener("input", () => {
      previewCaption.textContent =
        captionInput.value.trim() || "Photo of Matthew R. Gibbs";
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const first = data.get("firstName")?.trim() || "";
    const middle = data.get("middleName")?.trim() || "";
    const last = data.get("lastName")?.trim() || "";
    const divider = data.get("divider")?.trim() || "|";
    const mascotAdjective = data.get("mascotAdjective")?.trim() || "";
    const mascotAnimal = data.get("mascotAnimal")?.trim() || "";

    const displayName = `${first} ${middle ? `${middle} ` : ""}${last}`.trim();
    const fullHeading =
      `${displayName} ${divider} ${mascotAdjective} ${mascotAnimal}`
        .replace(/\s+/g, " ")
        .trim();

    const imgSrc =
      document.getElementById("imagePreview")?.src || data.get("defaultImage");
    const caption = data.get("imageCaption")?.trim() || "";

    const personalStatement = data.get("personalStatement")?.trim() || "";
    const personalBackground = data.get("personalBackground")?.trim() || "";
    const academicBackground = data.get("academicBackground")?.trim() || "";
    const professionalBackground =
      data.get("professionalBackground")?.trim() || "";
    const careerGoals = data.get("careerGoals")?.trim() || "";
    const subjectBackground = data.get("subjectBackground")?.trim() || "";
    const primary = data.get("primaryComputer")?.trim() || "";
    const backup = data.get("backupComputer")?.trim() || "";
    const funny = data.get("funnyThing")?.trim() || "";
    const share = data.get("share")?.trim() || "";
    const quote = data.get("quote")?.trim() || "";
    const quoteAuthor = data.get("quoteAuthor")?.trim() || "";
    const ack = data.get("acknowledgment")?.trim() || "";
    const ackDate = data.get("ackDate")?.trim() || "";

    const courses = document.querySelectorAll(".course-entry");
    let courseHTML = "";

    courses.forEach((course) => {
      const dept =
        course.querySelector('[name="courseDepartment"]')?.value.trim() || "";
      const num =
        course.querySelector('[name="courseNumber"]')?.value.trim() || "";
      const name =
        course.querySelector('[name="courseName"]')?.value.trim() || "";
      const reason =
        course.querySelector('[name="courseReason"]')?.value.trim() || "";

      if (dept || num || name || reason) {
        courseHTML += `<li><strong>${escapeHtml(dept)} ${escapeHtml(
          num,
        )} – ${escapeHtml(name)}:</strong> ${escapeHtml(reason)}</li>`;
      }
    });

    const output = `
      <h2>Introduction Form</h2>

      <section class="intro-profile">
        <h3>${escapeHtml(fullHeading)}</h3>
        <figure>
          <img src="${escapeHtml(imgSrc)}" alt="Portrait of ${escapeHtml(
            displayName,
          )}" width="400" />
          <figcaption><em>${escapeHtml(caption)}</em></figcaption>
        </figure>
      </section>

      <p class="acknowledgment">${escapeHtml(ack)} — ${escapeHtml(ackDate)}</p>

      <p>${escapeHtml(personalStatement)}</p>

      <ul>
        <li><strong>Personal Background:</strong> ${escapeHtml(
          personalBackground,
        )}</li>
        <li><strong>Academic Background:</strong> ${escapeHtml(
          academicBackground,
        )}</li>
        <li><strong>Professional Background:</strong> ${escapeHtml(
          professionalBackground,
        )}</li>
        <li><strong>Academic &amp; Career Goals:</strong> ${escapeHtml(
          careerGoals,
        )}</li>
        <li><strong>Background in this Subject:</strong> ${escapeHtml(
          subjectBackground,
        )}</li>
        <li><strong>Primary Work Computer:</strong> ${escapeHtml(primary)}</li>
        <li><strong>Backup Work Computer &amp; Location Plan:</strong> ${escapeHtml(
          backup,
        )}</li>
        <li>
          <strong>Courses I’m Taking &amp; Why:</strong>
          <ol>
            ${courseHTML}
          </ol>
        </li>
        ${
          funny
            ? `<li><strong>Funny / Interesting item to remember me by:</strong> ${escapeHtml(
                funny,
              )}</li>`
            : ""
        }
        ${
          share
            ? `<li><strong>I’d also like to share:</strong> ${escapeHtml(
                share,
              )}</li>`
            : ""
        }
      </ul>

      <blockquote>
        “${escapeHtml(quote)}”
        <em>— ${escapeHtml(quoteAuthor)}</em>
      </blockquote>

      <p><a href="intro_form.html">Reset Form</a></p>
    `;

    document.getElementById("mainContent").innerHTML = output;
  });

  document.getElementById("clearBtn").addEventListener("click", () => {
    document.querySelectorAll("form input, form textarea").forEach((el) => {
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

  document.getElementById("addCourseBtn").addEventListener("click", () => {
    const container = document.getElementById("courseList");
    const div = document.createElement("div");

    div.classList.add("course-entry");
    div.innerHTML = `
      <div>
        <label>Department</label>
        <input name="courseDepartment" type="text" placeholder="Department" required />
      </div>

      <div>
        <label>Number</label>
        <input name="courseNumber" type="text" placeholder="Course number" required />
      </div>

      <div>
        <label>Name</label>
        <input name="courseName" type="text" placeholder="Course name" required />
      </div>

      <div>
        <label>Reason</label>
        <input name="courseReason" type="text" placeholder="Reason for taking the course" required />
      </div>

      <div class="course-delete-wrap">
        <button type="button" class="delete-course">Delete</button>
      </div>
    `;

    container.appendChild(div);
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-course")) {
      e.target.closest(".course-entry").remove();
    }
  });
});
