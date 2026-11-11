const dateInput = document.querySelector('#booking-date');
const artistSelect = document.querySelector('#artist-select');
const bookingForm = document.querySelector('#booking-form');
const successMessage = document.querySelector('#form-success');

function parseDate(value) {
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;

  const [, day, month, year] = match.map(Number);
  const date = new Date(year, month - 1, day, 12);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

dateInput.addEventListener('input', () => dateInput.setCustomValidity(''));

document.querySelectorAll('.artist-select').forEach((button) => {
  button.addEventListener('click', () => {
    artistSelect.value = button.dataset.artist;
    document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
    successMessage.hidden = true;
  });
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const selectedDate = parseDate(dateInput.value);
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  dateInput.setCustomValidity(
    !selectedDate ? 'Введите существующую дату в формате ДД.ММ.ГГГГ' :
    selectedDate < startOfToday ? 'Выберите сегодняшнюю или будущую дату' : ''
  );
  if (!bookingForm.reportValidity()) return;

  const data = new FormData(bookingForm);
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(selectedDate);

  const title = document.createElement('strong');
  title.textContent = `Спасибо, ${data.get('name')}!`;
  successMessage.replaceChildren(title, document.createTextNode(`Демо-заявка к мастеру «${data.get('artist')}» на ${formattedDate} проверена. Данные никуда не отправлены.`));
  successMessage.hidden = false;
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
