document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const thumbnails = Array.from(document.querySelectorAll(".thumbnails img"));

  thumbnails.forEach(img => img.setAttribute("tabindex", "0"));

  function setActive(img) {
    mainImage.src = img.src;
    mainImage.alt = img.alt.replace("Thumbnail", "Image");
    thumbnails.forEach(t => {
      t.classList.remove("active-thumbnail");
      t.setAttribute("aria-current", "false");
    });
    img.classList.add("active-thumbnail");
    img.setAttribute("aria-current", "true");
  }

  thumbnails.forEach(img => {
    img.addEventListener("click", () => setActive(img));
    img.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActive(img);
      }
    });
  });

  document.addEventListener("keydown", e => {
    const i = thumbnails.findIndex(t => t.classList.contains("active-thumbnail"));
    if (e.key === "ArrowRight") {
      const next = thumbnails[(i + 1 + thumbnails.length) % thumbnails.length];
      setActive(next);
      next.focus();
    } else if (e.key === "ArrowLeft") {
      const prev = thumbnails[(i - 1 + thumbnails.length) % thumbnails.length];
      setActive(prev);
      prev.focus();
    }
  });

  if (thumbnails.length) setActive(thumbnails[0]);
});
