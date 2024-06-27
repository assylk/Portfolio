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
  const body = (await req.json()) as TestimonialDto;
  const validation = TestimonialsSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues[0].message },
      { status: 400 }
    );
  }
  await prisma.tetstimonials.create({
    data: {
      name: body.name,
      email: body.email,
      message: body.message,
    },
  });
  return NextResponse.json(
    { message: "Your Message is Sent Successfully" },
    { status: 201 }
  );
}
