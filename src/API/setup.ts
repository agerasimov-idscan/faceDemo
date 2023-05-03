const headers: HeadersInit = {
  Authorization: `Bearer ${import.meta.env.VITE_SECRET_KEY}`,
  'content-type': 'application/json',
  'content-encoding': 'utf-8',
};

export const post = async (url: string, body: any) => {
  const response = await fetch(`${import.meta.env.VITE_DVSO_URL}${url}`, {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify(body),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`HTTP Error: ${response.status}`);
  }
};

export const get = async (url: string) => {
  const response = await fetch(`${import.meta.env.VITE_DVSO_URL}${url}`, {
    method: 'GET',
    headers,
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`HTTP Error: ${response.status}`);
  }

};
