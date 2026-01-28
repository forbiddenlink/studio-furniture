import { NextResponse } from 'next/server';
import { products } from '@/lib/data/products';
import { Product } from '@/types';
import { logger, AppError, formatErrorResponse } from '@/lib/error-handler';
import { validateSearchQuery } from '@/lib/validation';
import { AI } from '@/lib/constants';
import { rateLimiters } from '@/lib/rate-limit';

interface SearchRequest {
  query: string;
}

interface SearchResponse {
  results: Product[];
  query: string;
  count: number;
  processingTime: number;
}

export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    // Apply rate limiting
    const rateLimitHeaders = await rateLimiters.search(req);
    // Parse and validate request
    const body = await req.json() as SearchRequest;
    
    if (!body.query) {
      throw new AppError('Search query is required', 'MISSING_QUERY', 400);
    }

    // Validate search query
    validateSearchQuery(body.query);

    const query = body.query.trim();
    const lowerQuery = query.toLowerCase();

    logger.info('AI search request', { query });

    // REAL AI MODE (Placeholder for future OpenAI integration)
    if (process.env.OPENAI_API_KEY) {
      // TODO: Implement advanced semantic search with OpenAI embeddings
      // This would involve:
      // 1. Generate embedding for user query
      // 2. Compare with pre-computed product embeddings
      // 3. Return semantically similar results
      logger.info('OpenAI API key detected, but advanced search not yet implemented');
    }

    // ENHANCED SIMULATION MODE
    const words = lowerQuery
      .split(/\s+/)
      .filter((word) => word.length >= AI.SEARCH.MIN_QUERY_LENGTH);

    // Extract search intents
    const priceIntent = extractPriceIntent(lowerQuery);
    const categoryIntent = extractCategoryIntent(lowerQuery);
    const materialIntent = extractMaterialIntent(lowerQuery);

    logger.debug('Search intents extracted', {
      priceIntent,
      categoryIntent,
      materialIntent,
      keywords: words,
    });

    // Filter and score products
    const scoredResults = products
      .map((product) => {
        const score = calculateRelevanceScore(
          product,
          words,
          priceIntent,
          categoryIntent,
          materialIntent
        );
        return { product, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, AI.SEARCH.MAX_RESULTS)
      .map(({ product }) => product);

    const processingTime = Date.now() - startTime;

    logger.info('Search completed', {
      query,
      resultsCount: scoredResults.length,
      processingTime,
    });

    const response: SearchResponse = {
      results: scoredResults,
      query,
      count: scoredResults.length,
      processingTime,
    };

    return NextResponse.json(response, {
      headers: rateLimitHeaders,
    });

  } catch (error) {
    logger.error('Search API error', error as Error);

    if (error instanceof AppError) {
      return NextResponse.json(
        formatErrorResponse(error),
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      formatErrorResponse(new AppError('Internal server error', 'INTERNAL_ERROR', 500)),
      { status: 500 }
    );
  }
}

/**
 * Extract price intent from query
 */
function extractPriceIntent(query: string): number | null {
  const patterns = [
    /under\s+\$?(\d+)/i,
    /below\s+\$?(\d+)/i,
    /less\s+than\s+\$?(\d+)/i,
    /cheaper\s+than\s+\$?(\d+)/i,
    /\$?(\d+)\s+or\s+less/i,
  ];

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  return null;
}

/**
 * Extract category intent from query
 */
function extractCategoryIntent(query: string): string | null {
  const categoryKeywords: Record<string, string[]> = {
    seating: ['chair', 'sofa', 'couch', 'ottoman', 'seat', 'armchair'],
    tables: ['table', 'desk', 'dining', 'coffee table', 'side table'],
    storage: ['storage', 'shelf', 'cabinet', 'shelving', 'bookcase', 'console'],
    lighting: ['light', 'lamp', 'pendant', 'lighting', 'chandelier'],
    decor: ['decor', 'decoration', 'vase', 'pillow', 'rug', 'mirror', 'blanket'],
  };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((keyword) => query.includes(keyword))) {
      return category;
    }
  }

  return null;
}

/**
 * Extract material intent from query
 */
function extractMaterialIntent(query: string): string | null {
  const materials = ['wood', 'walnut', 'oak', 'leather', 'fabric', 'metal', 'brass', 'marble', 'glass'];
  
  for (const material of materials) {
    if (query.includes(material)) {
      return material;
    }
  }

  return null;
}

/**
 * Calculate relevance score for a product
 */
function calculateRelevanceScore(
  product: Product,
  keywords: string[],
  priceIntent: number | null,
  categoryIntent: string | null,
  materialIntent: string | null
): number {
  let score = 0;

  // Build searchable text
  const searchableText = `
    ${product.name}
    ${product.description}
    ${product.longDescription}
    ${product.category}
    ${product.tags.join(' ')}
    ${product.specifications.material}
    ${product.specifications.color}
  `.toLowerCase();

  // Price matching (highest priority if specified)
  if (priceIntent !== null) {
    if (product.price > priceIntent) {
      return 0; // Hard filter: exclude products over budget
    }
    // Boost products well within budget
    const priceRatio = product.price / priceIntent;
    score += (1 - priceRatio) * 10;
  }

  // Category matching (high priority)
  if (categoryIntent && product.category === categoryIntent) {
    score += 20;
  }

  // Material matching
  if (materialIntent && searchableText.includes(materialIntent)) {
    score += 10;
  }

  // Keyword matching
  const keywordMatches = keywords.filter((keyword) =>
    searchableText.includes(keyword)
  ).length;
  score += keywordMatches * 5;

  // Boost featured products slightly
  if (product.featured) {
    score += 2;
  }

  // Boost in-stock products
  if (product.inStock) {
    score += 1;
  }

  return score;
}
