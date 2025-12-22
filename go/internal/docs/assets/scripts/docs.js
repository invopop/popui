
document.addEventListener("alpine:init", () => {
  // Product Form
  Alpine.data("docs", () => ({
    page: "getting-started",
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
      console.log("Current page:", this.page);
    },
    goto(id) {
      this.page = id;
    }
  }));
});

