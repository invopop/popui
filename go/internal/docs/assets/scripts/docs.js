
document.addEventListener("alpine:init", () => {
  // Product Form
  Alpine.data("docs", () => ({
    page: "getting-started",
    title: "Getting Started",
    init() {
      this.changePage();
      window.addEventListener("hashchange", () => {
        this.changePage();
      });
    },
    changePage() {
      const page = location.hash;
      if (page) {
        this.page = page.replace("#", "");
      }
      // Scroll main area to top
      const main = document.querySelector('main');
      if (main) {
        main.scrollTo({ top: 0, behavior: 'instant' });
      }
    },
    goto(id) {
      this.page = id;
    }
  }));
});

