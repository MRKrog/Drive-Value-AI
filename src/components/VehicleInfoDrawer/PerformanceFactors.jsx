import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack
} from '@mui/material'
import { 
  TrendingUp, 
  Star 
} from '@mui/icons-material'

export const PerformanceFactors = ({ parsedAnalysis }) => {
  return (
    <>
      {/* Performance Factors */}
      {parsedAnalysis.performanceFactors && Object.keys(parsedAnalysis.performanceFactors).length > 0 && (
        <Card sx={{ mb: 3, bgcolor: 'rgba(156, 39, 176, 0.1)', border: '1px solid rgba(156, 39, 176, 0.3)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#9C27B0', display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1 }} />
              Performance Factors
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(parsedAnalysis.performanceFactors).map(([key, value], index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1, textTransform: 'capitalize' }}>
                      {key.replace(/_/g, ' ')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF', lineHeight: 1.5 }}>
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Recommendations */}
      {parsedAnalysis.recommendations && Object.keys(parsedAnalysis.recommendations).length > 0 && (
        <Card sx={{ mb: 3, bgcolor: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#4CAF50', display: 'flex', alignItems: 'center' }}>
              <Star sx={{ mr: 1 }} />
              Enhanced Recommendations
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(parsedAnalysis.recommendations).map(([key, value], index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1, textTransform: 'capitalize' }}>
                      {key.replace(/_/g, ' ')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF', lineHeight: 1.5 }}>
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Confidence Assessment */}
      {parsedAnalysis.confidenceAssessment && Object.keys(parsedAnalysis.confidenceAssessment).length > 0 && (
        <Card sx={{ mb: 3, bgcolor: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#4CAF50', display: 'flex', alignItems: 'center' }}>
              <Star sx={{ mr: 1 }} />
              Confidence Assessment
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(parsedAnalysis.confidenceAssessment).map(([key, value], index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: '#A0A0A0', mb: 1, textTransform: 'capitalize' }}>
                      {key.replace(/_/g, ' ')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF', lineHeight: 1.5 }}>
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  )
}
