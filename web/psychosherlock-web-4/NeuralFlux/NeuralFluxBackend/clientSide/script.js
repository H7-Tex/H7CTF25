const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const html = document.documentElement;
const terminalOutput = document.getElementById("terminalOutput");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
const contactForm = document.getElementById("contactForm");
const contactFormMessage = document.getElementById("contactFormMessage");

const terminalMessages = [
  { time: "00:00:05", status: "OK", text: "Compiling AI algorithms..." },
  { time: "00:00:06", status: "OK", text: "Optimizing data pipelines..." },
  { time: "00:00:07", status: "OK", text: "Running security protocols..." },
  { time: "00:00:08", status: "OK", text: "Connecting to neural grid..." },
  { time: "00:00:09", status: "OK", text: "Inference complete. Ready." },
];

let messageIndex = 0;

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    html.classList.add("light");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  } else {
    html.classList.remove("light");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }
}

themeToggle.addEventListener("click", () => {
  html.classList.toggle("light");

  if (html.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  } else {
    localStorage.setItem("theme", "dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }
});

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.getAttribute("href").startsWith("#")) {
      e.preventDefault();
    }
    document
      .querySelectorAll(".nav-link")
      .forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    if (navMenu) {
      navMenu.classList.remove("active");
    }
  });
});

function addTerminalMessage() {
  if (terminalOutput && messageIndex < terminalMessages.length) {
    const msg = terminalMessages[messageIndex];
    const statusClass = msg.status === "OK" ? "success" : "warning";
    const p = document.createElement("p");
    p.innerHTML = `[<span class="time-stamp">${msg.time}</span>] <span class="${statusClass}">${msg.status}</span> ${msg.text}`;
    terminalOutput.appendChild(p);
    messageIndex++;
  } else if (terminalOutput) {
    clearInterval(terminalInterval);
  }
}

if (terminalOutput) {
  var terminalInterval = setInterval(addTerminalMessage, 2000);
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    contactFormMessage.textContent =
      "Message sent successfully! We'll get back to you soon.";
    contactFormMessage.style.color = "var(--accent)";
    contactFormMessage.classList.add("show");

    contactForm.reset();

    setTimeout(() => {
      contactFormMessage.classList.remove("show");
    }, 5000);
  });
}

initTheme();
