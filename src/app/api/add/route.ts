//generated with cursor

import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { Decimal } from '@prisma/client/runtime/library'

export async function POST(request: Request) {
    try {
        const { name, price } = await request.json()
        
        const newItem = await prisma.item.create({
            data: {
                name,
                price: new Decimal(price), // Convert to Decimal for Prisma
            },
        })
        
        return NextResponse.json(newItem, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create item' }, 
            { status: 500 }
        )
    }
}