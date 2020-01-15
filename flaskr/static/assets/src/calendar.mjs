export const calendar = props => {
  const monthTotalDays = _ =>
    new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 0).getDate();
  const monthStartWeekDay = _ =>
    new Date(`${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-01`).getUTCDay();
  const totalRows = _ =>
    ((monthTotalDays() - (6 - monthStartWeekDay())) / 7) + 1
  const calculateRow = _ =>
    Array.from(Array(totalRows()).keys())
  const populateRow = _ =>
    calculateRow().map(row => Array.from(Array(7).keys()))

  return (
    `
      <div class='d-flex justify-content-center flex-column border rounded mb-3 mx-5 py-3'>
        <div class='d-flex flex-row justify-content-center'>
          <h4>Calendar</h4>
        </div>
        ${populateRow().map(row => `
          <div class='row d-flex justify-content-center'>
            ${row.map(day => `
              <div class="card cols-1 cols-md-7 m-1">
                <div class='card-body m-3'>
                  <h6>Date</h6>
                </div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `
  );
};
