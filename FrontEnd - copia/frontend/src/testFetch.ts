const testLogin = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'testuser',
        document: '123456'
      }),
    });

    console.log('Status:', response.status);

    const data = await response.json();
    console.log('Response:', data);
  } catch (err) {
    console.error('Error al conectar con backend:', err);
  }
};

testLogin();
export {};
