export default function (name) {
  let pieces = [];

  const addPiece = (piece) => {
    pieces.push(piece);
    return pieces.slice(-1);
  };

  const removePiece = (index) => {
    let splice = pieces.splice(index, 1);
    return splice.length === 1;
  };

  const getPieces = () => pieces;

  const getPiece = (index) => pieces[index];

  const getName = () => name;

  return {
    getName,
    addPiece,
    removePiece,
    getPieces,
    getPiece,
    pieces
  }
}
