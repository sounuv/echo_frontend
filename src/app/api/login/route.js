// app/api/login/route.js

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const response = await fetch("http://172.233.20.225/api/v1/login", {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Erro ao fazer login" }), { status: response.status });
    }

    const data = await response.json();
    const token = data.access_token;

    // Retorna o token para o front-end
    return new Response(JSON.stringify({ token }), { status: 200 });

  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return new Response(JSON.stringify({ message: "Erro ao fazer login" }), { status: 500 });
  }
}
