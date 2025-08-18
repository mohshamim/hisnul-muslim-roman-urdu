import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Dua, ApiResponse } from '@/types';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('hisnul-muslim-admin');
    const collection = db.collection('duas');
    
    const duas = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    const response: ApiResponse<Dua[]> = {
      success: true,
      data: duas as Dua[],
      message: 'Duas retrieved successfully'
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching duas:', error);
    const response: ApiResponse<null> = {
      success: false,
      message: 'Failed to fetch duas',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, titleArabic, content, contentArabic, reference, referenceArabic, categories } = body;
    
    if (!title || !titleArabic || !content || !contentArabic || !reference || !referenceArabic || !categories) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Missing required fields: title, titleArabic, content, contentArabic, reference, referenceArabic, categories'
      };
      return NextResponse.json(response, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('hisnul-muslim-admin');
    const collection = db.collection('duas');
    
    const newDua: Omit<Dua, '_id'> = {
      title,
      titleArabic,
      content,
      contentArabic,
      reference,
      referenceArabic,
      categories,
      isBookmarked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await collection.insertOne(newDua);
    
    const response: ApiResponse<Dua> = {
      success: true,
      data: { ...newDua, _id: result.insertedId.toString() } as Dua,
      message: 'Dua created successfully'
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating dua:', error);
    const response: ApiResponse<null> = {
      success: false,
      message: 'Failed to create dua',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
