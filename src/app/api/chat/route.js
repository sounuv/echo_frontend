export async function POST(req) {
  try {
    const { messages } = await req.json();
    const authorization = req.headers.get("authorization");

    if (!authorization) {
      return new Response(JSON.stringify({ message: "Autorização necessária" }), {
        status: 401,
      });
    }

    const response = await fetch("http://172.233.20.225/api/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization,
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok || !response.body) {
      return new Response(
        JSON.stringify({ message: "Erro ao comunicar com a API de chat" }),
        { status: response.status }
      );
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    return new Response(
      JSON.stringify({ message: "Erro interno do servidor" }),
      { status: 500 }
    );
  }
}
