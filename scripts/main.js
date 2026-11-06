const ROLE_DELETE_INTERVAL_MS = 55;
const ROLE_TYPE_INTERVAL_MS = 95;
const ROLE_HOLD_INTERVAL_MS = 1300;
const ROLE_ANIMATION_START_DELAY_MS = 1600;
const ROLES = ["Web Developer", "Python Developer", "Video Editor"];

function setNavigationOpen(button, navigation, isOpen) {
  navigation.classList.toggle("open", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
  button.textContent = isOpen ? "×" : "☰";
}

function initializeNavigation() {
  const button = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#nav-links");

  if (!button || !navigation) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = navigation.classList.contains("open");
    setNavigationOpen(button, navigation, !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setNavigationOpen(button, navigation, false);
    });
  });
}

function initializeRoleAnimation() {
  const roleText = document.querySelector("#role-text");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!roleText || prefersReducedMotion) {
    return;
  }

  let roleIndex = 0;
  let characterIndex = ROLES[roleIndex].length;
  let isDeleting = true;

  function updateRoleText() {
    const currentRole = ROLES[roleIndex];
    roleText.textContent = currentRole.slice(0, characterIndex);

    if (isDeleting) {
      characterIndex -= 1;

      if (characterIndex < 0) {
        roleIndex = (roleIndex + 1) % ROLES.length;
        characterIndex = 0;
        isDeleting = false;
      }
    } else {
      characterIndex += 1;

      if (characterIndex > ROLES[roleIndex].length) {
        isDeleting = true;
        window.setTimeout(updateRoleText, ROLE_HOLD_INTERVAL_MS);
        return;
      }
    }

    const interval = isDeleting
      ? ROLE_DELETE_INTERVAL_MS
      : ROLE_TYPE_INTERVAL_MS;
    window.setTimeout(updateRoleText, interval);
  }

  window.setTimeout(updateRoleText, ROLE_ANIMATION_START_DELAY_MS);
}

initializeNavigation();
initializeRoleAnimation();
