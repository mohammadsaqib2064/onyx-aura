export const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    const headerHeight = 96; // Approximate header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

export const handleNavClick = (e, href) => {
  e.preventDefault();
  const elementId = href.replace('#', '');
  smoothScrollTo(elementId);
};
