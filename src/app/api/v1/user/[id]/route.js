import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { user_id } = params; 
    // console.log("Endpoint: PUT /api/v1/user/[id]");
    // console.log("Parâmetro id:", id);
    
    const body = await request.json();
    
    // const updatedUser = await updateUserInDatabase(user_id, body);

    return NextResponse.json(
        { message: 'Aoba' },
        { status: 200 }
      );
    } catch (error) {
      console.error('deu ruim:', error);
      return NextResponse.json(
        { error: 'deu ruim dmais' },
        { status: 500 }
      );
    }
  }