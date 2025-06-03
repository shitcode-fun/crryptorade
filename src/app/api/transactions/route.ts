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
  const txns = await db
    .collection('transactions')
    .find({ address })
    .sort({ timestamp: -1 })
    .toArray();
  return NextResponse.json(txns);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { address, txHash, type } = body;
  if (!address || !txHash) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db();
  await db
    .collection('transactions')
    .insertOne({ address, txHash, type, timestamp: new Date() });
  return NextResponse.json({ success: true });
}