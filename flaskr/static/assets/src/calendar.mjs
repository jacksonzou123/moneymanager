export const calendar = props => {
  const calculateOffset = _ => new Date(`${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-01`).getUTCDay()
  const calculateRow = _ => {

  };
  return (
    `
      <div>
        ${calculateOffset()}
        <div class='row'></div>
        <div class='row'></div>
        <div class='row'></div>
        <div class='row'></div>
        <div class='row'></div>
      </div>
    `
  );
};