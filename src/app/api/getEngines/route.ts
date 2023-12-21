import { NextResponse } from 'next/server';
import { openai } from '@/config/openai/chatgpt';

export async function GET() {
  try {
    // Retrieves a list of models from OpenAI and returns the data.
    const models = await openai.models.list().then((res) => res.data);

    // sort received models alphabetically
    const modelOptions = models
      .map((model) => ({
        value: model.id,
        label: model.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return NextResponse.json(
      {
        modelOptions,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error querying OpenAI models:', (err as Error).message); // log the error for debugging purposes

    return NextResponse.json(
      {
        modelOptions: [{ value: 'Error', label: 'Error fetching OpenAI models' }],
        error: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}

// export async function POST(request: Request) {}
// export async function PUT(request: Request) {}
// export async function PATCH(request: Request) {}
// export async function DELETE(request: Request) {}
// export async function HEAD(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request: Request) {}
