import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const items = await prisma.item.findMany()
        return NextResponse.json(items)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
    }
} 


