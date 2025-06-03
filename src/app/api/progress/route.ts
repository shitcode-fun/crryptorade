import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address') || '';
  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db();
  const progress = await db.collection('progress').findOne({ address });
  return NextResponse.json(progress || { address, coins: 0, score: 0 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { address, coins, score } = body;
  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db();
  await db
    .collection('progress')
    .updateOne({ address }, { $set: { coins, score } }, { upsert: true });
  return NextResponse.json({ success: true });
}