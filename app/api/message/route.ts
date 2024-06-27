import { NextRequest, NextResponse } from "next/server";
import { TestimonialsSchema } from "@/data/validation";
import { TestimonialDto } from "@/data/dto";
import prisma from "@/utils/db";
/**
 * @method POST
 * @route -/api/message
 * @desc Create new message
 * @access public
 */

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TestimonialDto;
    const validation = TestimonialsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const message = await prisma.tetstimonials.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
      },
    });
    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route -/api/message
 * @desc Get All message
 * @access public
 */

export async function GET() {
  try {
    const messages = await prisma.tetstimonials.findMany({
      where: { statut: true },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
