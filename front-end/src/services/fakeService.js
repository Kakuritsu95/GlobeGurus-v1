import { nearbyMockData } from "../mockData";

export default async function fakeService(success) {
  try {
    return new Promise((res, rej) => {
      if (!success)
        throw new Error(
          "couldnt load the places, please click somewhere else...",
        );
      setTimeout(() => {
        res(nearbyMockData);
      }, 600);
    });
  } catch (err) {
    throw err;
  }
}
