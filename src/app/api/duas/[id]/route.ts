import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Dua, ApiResponse } from '@/types';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!ObjectId.isValid(id)) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Invalid dua ID'
      };
      return NextResponse.json(response, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('hisnul-muslim-admin');
    const collection = db.collection('duas');
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Dua not found'
      };
      return NextResponse.json(response, { status: 404 });
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Dua deleted successfully'
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting dua:', error);
    const response: ApiResponse<null> = {
      success: false,
      message: 'Failed to delete dua',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, titleArabic, content, contentArabic, reference, referenceArabic, categories, isBookmarked } = body;
    
    if (!ObjectId.isValid(id)) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Invalid dua ID'
      };
      return NextResponse.json(response, { status: 400 });
    }
    
    if (!title || !titleArabic || !content || !contentArabic || !reference || !referenceArabic || !categories) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Missing required fields'
      };
      return NextResponse.json(response, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('hisnul-muslim-admin');
    const collection = db.collection('duas');
    
    const updateData = {
      title,
      titleArabic,
      content,
      contentArabic,
      reference,
      referenceArabic,
      categories,
      isBookmarked: isBookmarked || false,
      updatedAt: new Date()
    };
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Dua not found'
      };
      return NextResponse.json(response, { status: 404 });
    }
    
    const response: ApiResponse<Dua> = {
      success: true,
      data: { ...updateData, _id: id } as Dua,
      message: 'Dua updated successfully'
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating dua:', error);
    const response: ApiResponse<null> = {
      success: false,
      message: 'Failed to update dua',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
