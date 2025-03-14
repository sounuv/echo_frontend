export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return new Response(JSON.stringify({ message: "Token não fornecido" }), {
        status: 401,
      });
    }

    const response = await fetch(
      "http://172.233.20.225/api/v1/users?skip=0&limit=100",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários: ${response.status}`);
    }

    const usersData = await response.json();

    return new Response(JSON.stringify(usersData), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return new Response(
      JSON.stringify({ message: "Erro ao buscar usuários" }),
      {
        status: 500,
      }
    );
  }
}
