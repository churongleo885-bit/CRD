import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Product } from '@/models/Product';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category && category !== 'All') {
      query = { category };
    }
    
    // In a real app, you would add pagination and complex filtering here.
    const products = await Product.find(query).limit(50).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // In a real app, you should validate the body here (e.g., using Zod) 
    // and ensure the user is authenticated as an admin.
    const product = await Product.create(body);
    
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
