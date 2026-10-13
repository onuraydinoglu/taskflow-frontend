export function validateTask(form) {
  const errors = {};

  const title = form.title.trim();
  const description = form.description.trim();
  const assignee = form.assignee.trim();

  if (!title) {
    errors.title = "Görev başlığı zorunludur.";
  } else if (title.length < 3) {
    errors.title = "Görev başlığı en az 3 karakter olmalıdır.";
  } else if (title.length > 100) {
    errors.title = "Görev başlığı en fazla 100 karakter olabilir.";
  }

  if (!description) {
    errors.description = "Açıklama zorunludur.";
  } else if (description.length < 10) {
    errors.description = "Açıklama en az 10 karakter olmalıdır.";
  } else if (description.length > 500) {
    errors.description = "Açıklama en fazla 500 karakter olabilir.";
  }

  if (!assignee) {
    errors.assignee = "Sorumlu kişi zorunludur.";
  } else if (assignee.length < 2) {
    errors.assignee = "Sorumlu kişi en az 2 karakter olmalıdır.";
  } else if (assignee.length > 50) {
    errors.assignee = "Sorumlu kişi en fazla 50 karakter olabilir.";
  }

  if (!["low", "medium", "high"].includes(form.priority)) {
    errors.priority = "Geçerli bir öncelik seçiniz.";
  }

  if (!["pending", "completed"].includes(form.status)) {
    errors.status = "Geçerli bir durum seçiniz.";
  }

  return errors;
}
