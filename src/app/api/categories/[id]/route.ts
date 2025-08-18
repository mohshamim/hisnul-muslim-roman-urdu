import clientPromise from '@/lib/mongodb';
import { ApiResponse, Category } from '@/types';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!ObjectId.isValid(id)) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Invalid category ID'
      };
      return NextResponse.json(response, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('hisnul-muslim-admin');
    const collection = db.collection('categories');
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Category not found'
      };
      return NextResponse.json(response, { status: 404 });
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Category deleted successfully'
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting category:', error);
    const response: ApiResponse<null> = {
      success: false,
      message: 'Failed to delete category',
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
    const { name, nameArabic, icon, description } = body;
    
    if (!ObjectId.isValid(id)) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Invalid category ID'
      };
      return NextResponse.json(response, { status: 400 });
    }
    
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
    
    const updateData = {
      name,
      nameArabic,
      icon,
      description,
      updatedAt: new Date()
    };
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Category not found'
      };
      return NextResponse.json(response, { status: 404 });
    }
    
    const response: ApiResponse<Category> = {
      success: true,
      data: { ...updateData, _id: id } as Category,
      message: 'Category updated successfully'
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating category:', error);
    const response: ApiResponse<null> = {
      success: false,
      message: 'Failed to update category',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(response, { status: 500 });
  }
}
