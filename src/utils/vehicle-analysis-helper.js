
// Helper function to parse the analysis data
const parseAnalysisData = (data) => {
  console.log('BEFORE parseAnalysisData', data);
  const aiValuation = data.ai_valuation || {};
  const marketValues = aiValuation.market_values || {};
  // const vehicle = data.vehicle || {};
  
  const valuationParams = data.valuation_parameters || {};
  
  return {
    // Vehicle info
    vehicle: {
      year: data.vehicle.year,
      make: data.vehicle.make,
      model: data.vehicle.model,
      trim: data.vehicle.trim,
      bodyStyle: data.vehicle.body_style,
      vin: data.vehicle.vin,
      origin: data.vehicle.origin,
      manufacturer: data.vehicle.manufacturer
    },
    
    // Mileage analysis
    mileage: {
      actual: valuationParams.mileage?.actual || 0,
      expected: valuationParams.mileage?.expected || 0,
      status: valuationParams.mileage?.status || 'average',
      variancePercentage: valuationParams.mileage?.variance_percentage || 0
    },
    
    // AI-powered market values
    retailPricing: {
      min: marketValues.retail_value?.min || 0,
      max: marketValues.retail_value?.max || 0,
      suggested: marketValues.retail_value?.suggested_ai_price || 0,
      description: marketValues.retail_value?.description || 'Dealer retail price range',
      marketAnalysis: marketValues.retail_value?.market_analysis || '',
      confidence: marketValues.retail_value?.confidence_level || 'High confidence',
    },
    privateParty: {
      min: marketValues.private_party_value?.min || 0,
      max: marketValues.private_party_value?.max || 0,
      suggested: marketValues.private_party_value?.suggested_ai_price || 0,
      description: marketValues.private_party_value?.description || 'Private seller price range',
      marketAnalysis: marketValues.private_party_value?.market_analysis || '',
      confidence: marketValues.private_party_value?.confidence_level || 'High confidence',
    },
    tradeIn: {
      min: marketValues.trade_in_value?.min || 0,
      max: marketValues.trade_in_value?.max || 0,
      suggested: marketValues.trade_in_value?.suggested_ai_price || 0,
      description: marketValues.trade_in_value?.description || 'Dealer trade-in offer range',
      marketAnalysis: marketValues.trade_in_value?.market_analysis || '',
      confidence: marketValues.trade_in_value?.confidence_level || 'High confidence',
    },
    auctionValue: {
      min: marketValues.auction_value?.min || 0,
      max: marketValues.auction_value?.max || 0,
      suggested: marketValues.auction_value?.suggested_ai_price || 0,
      description: marketValues.auction_value?.description || 'Wholesale/auction price range',
      marketAnalysis: marketValues.auction_value?.market_analysis || '',
      confidence: marketValues.auction_value?.confidence_level || 'High confidence'
    },
    
    // Analysis sections
    analysis: aiValuation.analysis || {},
    valueAdjustments: aiValuation.value_adjustments || {},
    performanceAssessment: aiValuation.performance_assessment || {},
    marketIntelligence: aiValuation.market_intelligence || {},
    riskAnalysis: aiValuation.risk_analysis || {},
    recommendations: aiValuation.recommendations || {},
    confidenceMetrics: aiValuation.confidence_metrics || {},
    keyInsights: aiValuation.key_insights || {},
    
    // Vehicle parameters
    condition: valuationParams.condition || 'good',
    
    // Summary data
    summary: data.summary || {},
    
    // Report metadata
    reportId: data.report_id,
    timestamp: data.timestamp,
    generatedBy: data.generated_by
  };
};

export { parseAnalysisData };