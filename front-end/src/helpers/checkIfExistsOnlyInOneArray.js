export default function checkIfOnlyExistsInOneArray(array1, array2, id1, id2) {
  return (
    (array1.includes(id1) && !array2.includes(id2)) ||
    (array2.includes(id2) && !array1.includes(id1))
  );
}
