import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Category, ApiResponse } from '@/types';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('hisnul-muslim-admin');
    const collection = db.collection('categories');
    
    const categories = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    const response: ApiResponse<Category[]> = {
      success: true,
      data: categories as Category[],
      message: 'Categories retrieved successfully'
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    const response: ApiResponse<null> = {
      success: false,
      message: 'Failed to fetch categories',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, nameArabic, icon, description } = body;
    
    if (!name || !nameArabic || !icon) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Missing required fields: name, nameArabic, icon'
      };
      return NextResponse.json(response, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('hisnul-muslim-admin');
    const collection = db.collection('categories');
    
    const newCategory: Omit<Category, '_id'> = {
      name,
      nameArabic,
      icon,
      description,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await collection.insertOne(newCategory);
    
    const response: ApiResponse<Category> = {
      success: true,
      data: { ...newCategory, _id: result.insertedId.toString() } as Category,
      message: 'Category created successfully'
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    const response: ApiResponse<null> = {
      success: false,
      message: 'Failed to create category',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
