const getFileExtension = (typeOfExtension) => {
  let wordLength = typeOfExtension.length;
  let barIndex = 0;
  for (let i = 0; i < wordLength; i++) {
    if (typeOfExtension[i] === "/") {
      barIndex = i + 1;
    }
  }

  return barIndex;
};

export default getFileExtension