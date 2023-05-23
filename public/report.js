  const currentDate = new Date().toISOString().split("T")[0];
  const dateInput = document.querySelector('input[type="date"]');
  dateInput.setAttribute("max", currentDate);
