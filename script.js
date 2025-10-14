function showForm(FormId) {
    document.querySelectorAll(".form-container").forEach(form => form.classList.remove("active"));
    document.getElementById(FormId).classList.add("active");
}