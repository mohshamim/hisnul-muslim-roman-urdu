import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    
    const client = await clientPromise;
    console.log('MongoDB client connected successfully');
    
    const db = client.db('hisnul-muslim-admin');
    console.log('Database accessed successfully');
    
    // Test a simple operation
    const collections = await db.listCollections().toArray();
    console.log('Collections found:', collections.map(c => c.name));
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      collections: collections.map(c => c.name),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'MongoDB connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
