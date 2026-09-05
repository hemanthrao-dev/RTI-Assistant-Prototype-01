import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { generateLocalRTIDraft } from "@/lib/localRTIGenerator";
import { buildRTISystemPrompt, buildRTIUserPrompt } from "@/lib/rtiPrompt";
import type { GenerateRTIRequest } from "@/types";

export const runtime = "nodejs";

function isValidPayload(payload: Partial<GenerateRTIRequest>) {
  return Boolean(
    payload.userQuery &&
      payload.userQuery.trim().length >= 30 &&
      payload.department &&
      payload.jurisdiction,
  );
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<GenerateRTIRequest>;

    if (!isValidPayload(payload)) {
      return NextResponse.json(
        { error: "Please provide a query of at least 30 characters, department, and jurisdiction." },
        { status: 400 },
      );
    }

    const completePayload = payload as GenerateRTIRequest;

    if (
      !process.env.ANTHROPIC_API_KEY ||
      process.env.ANTHROPIC_API_KEY === "your_key_here"
    ) {
      return new Response(generateLocalRTIDraft(completePayload), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const events = await anthropic.messages.create({
            model: "claude-sonnet-4-20250514",
            max_tokens: 600,
            system: buildRTISystemPrompt(completePayload.language),
            messages: [
              {
                role: "user",
                content: buildRTIUserPrompt(completePayload),
              },
            ],
            stream: true,
          });

          for await (const event of events) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }

          controller.close();
        } catch {
          controller.enqueue(encoder.encode(generateLocalRTIDraft(completePayload)));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to generate RTI draft.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
