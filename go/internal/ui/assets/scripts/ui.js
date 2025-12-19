
document.addEventListener("alpine:init", () => {
  // Product Form
  Alpine.data("ui", () => ({
    page: "getting-started",
    init() {
      this.changePage();
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

