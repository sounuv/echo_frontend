const API_URL = 'http://172.233.20.225/api/v1/user';

export async function OPTIONS() {

  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, PUT, POST, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-HTTP-Method-Override',
    },
  });
}

export async function PUT(request, context) {

  try {
    const { id } = context.params;

    const body = await request.json();;

    const authorization = request.headers.get('Authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Token inválido ou não fornecido' }),
        { status: 401 }
      );
    }

    const token = authorization.split(' ')[1];

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return new Response(
        JSON.stringify({ error: errorResponse.error || 'Erro na API externa' }),
        { status: response.status }
      );
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        message: 'Usuário atualizado com sucesso',
        user: data,
      }),
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS, GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-HTTP-Method-Override',
        },
      }
    );

  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno ao salvar usuário' }),
      { status: 500 }
    );
  }
}

export async function GET(request, context) {
  const { id } = context.params;

  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      'Authorization': request.headers.get('Authorization') || '',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return new Response(
      JSON.stringify({ error: error.error || 'Erro ao buscar usuário' }),
      { status: response.status }
    );
  }

  const data = await response.json();

  return new Response(
    JSON.stringify(data),
    { status: 200 }
  );
}