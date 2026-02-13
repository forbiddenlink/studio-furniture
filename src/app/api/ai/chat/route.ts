import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { logger, AppError, formatErrorResponse } from '@/lib/error-handler';
import { AI } from '@/lib/constants';
import { rateLimiters } from '@/lib/rate-limit';

export const maxDuration = 30;

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface ChatRequest {
    messages: Message[];
}

export async function POST(req: Request) {
    try {
        // Apply rate limiting
        await rateLimiters.aiChat(req);
        // Validate request body
        const body = await req.json() as ChatRequest;
        
        if (!body.messages || !Array.isArray(body.messages)) {
            throw new AppError('Invalid request: messages array is required', 'INVALID_REQUEST', 400);
        }

        if (body.messages.length === 0) {
            throw new AppError('Invalid request: messages array cannot be empty', 'INVALID_REQUEST', 400);
        }

        const lastMessage = body.messages[body.messages.length - 1];
        
        if (!lastMessage.content || typeof lastMessage.content !== 'string') {
            throw new AppError('Invalid request: message content is required', 'INVALID_REQUEST', 400);
        }

        // Validate message length
        if (lastMessage.content.length > AI.CHAT.MAX_MESSAGE_LENGTH) {
            throw new AppError(
                `Message is too long. Maximum ${AI.CHAT.MAX_MESSAGE_LENGTH} characters allowed`,
                'MESSAGE_TOO_LONG',
                400
            );
        }

        const content = lastMessage.content.toLowerCase();

        // REAL AI MODE
        if (process.env.OPENAI_API_KEY) {
            try {
                logger.info('Using OpenAI for chat response');
                
                const result = await streamText({
                    model: openai('gpt-4-turbo'),
                    messages: body.messages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                    system: "You are a helpful furniture shopping assistant for 'STUDIO Furniture'. You are knowledgeable about modern, minimalist design. Be concise, friendly, and helpful. Focus on guiding customers to find furniture that matches their needs and style preferences.",
                });
                
                return result.toTextStreamResponse();
            } catch (error) {
                logger.error('OpenAI API error, falling back to simulation', error as Error);
                // Fallback to simulation if error
            }
        }

        // SIMULATION MODE (Fallback or Default)
        logger.info('Using simulation mode for chat response');
        
        let responseText = "I'm here to help! Could you provide more details about what you're looking for?";

        // Intent-based responses
        if (content.includes("chair") || content.includes("seating")) {
            responseText = "I'd recommend checking out our Arne Lounge Chair - it's perfect for creating a cozy reading nook with its curved oak frame and premium leather upholstery. We also have the Cloud Ottoman which works great as extra seating. Would you like to know more about either of these pieces?";
        } else if (content.includes("table") || content.includes("dining")) {
            responseText = "For dining tables, our Linear Dining Table is a customer favorite. It's crafted from solid walnut with clean lines and seats 6-8 comfortably. Perfect for both everyday meals and entertaining guests. Would you like to see more dining options?";
        } else if (content.includes("modern") || content.includes("minimalist")) {
            responseText = "You'll love our minimalist collection! We focus on clean lines, natural materials like oak and walnut, and timeless Scandinavian-inspired design. Every piece is crafted to be both beautiful and functional. What type of furniture are you most interested in?";
        } else if (content.includes("budget") || content.includes("price") || content.includes("cost")) {
            responseText = `Our products range from $189 to $3,299, with most pieces between $500-$1,500. We offer free shipping on orders over $500! What's your budget range, and what type of furniture are you looking for?`;
        } else if (content.includes("hello") || content.includes("hi") || content.includes("hey")) {
            responseText = "Hi there! I'm your AI furniture consultant. I can help you find the perfect pieces for your space. Are you looking for something specific, or would you like some recommendations?";
        } else if (content.includes("shipping") || content.includes("delivery")) {
            responseText = "We offer free standard shipping on all orders over $500. Standard delivery typically takes 5-7 business days, and we also offer expedited shipping options. Is there a specific item you're interested in?";
        } else if (content.includes("warranty") || content.includes("return")) {
            responseText = "All our furniture pieces come with a 2-year warranty, and we offer a 30-day return policy. We stand behind the quality of our craftsmanship. Do you have questions about a specific product?";
        }

        // Construct a Data Stream Response manually for compatibility with useChat
        // The protocol is: "0:{string}\n" for text parts.
        const encoded = new TextEncoder().encode(`0:${JSON.stringify(responseText)}\n`);

        return new Response(encoded, {
            headers: { 
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Powered-By': 'STUDIO-AI-Simulation',
            },
        });

    } catch (error) {
        logger.error('Chat API error', error as Error);
        
        if (error instanceof AppError) {
            return Response.json(
                formatErrorResponse(error),
                { status: error.statusCode }
            );
        }

        return Response.json(
            formatErrorResponse(new AppError('Internal server error', 'INTERNAL_ERROR', 500)),
            { status: 500 }
        );
    }
}
