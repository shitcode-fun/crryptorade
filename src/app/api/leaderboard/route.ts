import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const data = await db
    .collection('progress')
    .find({})
    .sort({ score: -1 })
    .limit(10)
    .toArray();
  return NextResponse.json(data);
}