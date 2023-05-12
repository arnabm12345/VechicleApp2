import axios from 'axios';

export function StoreMechanicData(formData) {
  axios.post(
    'https://vechicle-app-default-rtdb.firebaseio.com/MechanicData.json',
    formData
  );
}

export async function fetchMechanics() {
  const response = await axios.get('https://vechicle-app-default-rtdb.firebaseio.com/MechanicData.json');

  const mechanics = [];

  for (const key in response.data) {
    const mechanicObj = {
      id: key,
      name: response.data[key].name,
      email: response.data[key].email,
      number: response.data[key].number,
      lat:response.data[key].lat,
      lng:response.data[key].lng,

    };
    mechanics.push(mechanicObj);
  }

  return mechanics;
}