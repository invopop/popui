
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
    },
    goto(id) {
      this.page = id;
    }
  }));
});

