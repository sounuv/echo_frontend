const API_URL = "http://172.233.20.225/api/v1/users";

export async function POST(request) {
  try {
    const body = await request.json();
    const authorization = request.headers.get("Authorization");
    const token = authorization.split(" ")[1];

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return new Response(
        JSON.stringify({ error: errorResponse.error || "Erro na API externa" }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new Response(
      JSON.stringify({ message: "Usuário criado com sucesso", user: data }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno ao criar usuário" }),
      { status: 500 }
    );
  }
}
