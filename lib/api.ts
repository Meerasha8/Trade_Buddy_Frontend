export interface StockAnalysis {
  stock: string;
  prediction: 'UP' | 'DOWN' | 'HOLD';
  confidence: number;
  macro_summary: any;
  sentiment_summary: any;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  final_recommendation: 'BUY' | 'SELL' | 'HOLD';
  reasoning: string[];
}

export async function fetchStockAnalysis(stock: string): Promise<StockAnalysis> {
  const apiUrl = process.env.NEXT_PUBLIC_STOCK_API_URL || 'https://stock.hub.zerve.cloud';
  const response = await fetch(`${apiUrl}/analyze?stock=${stock}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch analysis for ${stock}`);
  }

  const data: StockAnalysis = await response.json();
  return data;
}