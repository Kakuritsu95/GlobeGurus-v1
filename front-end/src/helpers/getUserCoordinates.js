export const getUserCoordinates = new Promise(
  (res) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      res({ latitude, longitude });
    });
  },
  (rej) => {
    rej("Couldnt load user's coordinates");
  },
);
