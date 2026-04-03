import { StockAnalysis } from './api';

export function formatResponse(data: StockAnalysis): string {
  const { stock, prediction, confidence, risk_level, final_recommendation, reasoning } = data;

  let response = `**${stock} Analysis**\n\n`;

  response += `**Prediction:** ${prediction} (Confidence: ${confidence.toFixed(2)}%)\n`;
  response += `**Risk Level:** ${risk_level}\n`;
  response += `**Final Recommendation:** ${final_recommendation}\n\n`;

  response += `**Reasoning:**\n`;
  reasoning.forEach((reason, index) => {
    response += `${index + 1}. ${reason}\n`;
  });

  // Add a summary
  const summary = getSummary(data);
  response += `\n**Summary:** ${summary}`;

  return response;
}

function getSummary(data: StockAnalysis): string {
  const { prediction, confidence, risk_level, final_recommendation } = data;

  if (final_recommendation === 'BUY') {
    return `${data.stock} shows a ${prediction === 'UP' ? 'bullish' : 'mixed'} outlook with ${confidence.toFixed(1)}% confidence. With ${risk_level.toLowerCase()} risk, it's recommended to buy.`;
  } else if (final_recommendation === 'SELL') {
    return `${data.stock} indicates a ${prediction === 'DOWN' ? 'bearish' : 'cautious'} trend with ${confidence.toFixed(1)}% confidence. Given ${risk_level.toLowerCase()} risk, consider selling.`;
  } else {
    return `${data.stock} suggests holding with ${confidence.toFixed(1)}% confidence. The ${risk_level.toLowerCase()} risk level makes it safer to wait rather than aggressively invest.`;
  }
}