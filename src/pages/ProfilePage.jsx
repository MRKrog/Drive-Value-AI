import React from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Stack,
  Divider
} from '@mui/material'
import { 
  Person, 
  Favorite, 
  Search, 
  Star,
  LocationOn,
  Email,
  CalendarToday
} from '@mui/icons-material'
import { useAppSelector } from '../store/hooks'
import ProfileAvatar from '../components/ProfileAvatar'

const ProfilePage = () => {
  const user = useAppSelector(state => state.user)
  console.log('user', user)
  
  return (
    <Box sx={{ flex: 1 }}>
      <Container maxWidth="md" sx={{ py: 2 }}>

        <Typography variant="h4" sx={{ mb: 4, color: '#FFFFFF' }}>
          User Profile
        </Typography>
        
        {/* Profile Header */}
        <Card variant="info" sx={{ mb: 3 }}>
          <CardContent>
            <ProfileAvatar
              src={user.profile.avatar}
              alt={`${user.profile.firstName} ${user.profile.lastName || user.profile.name}`}
              fallbackText={`${user.profile.firstName[0]}${user.profile.lastName[0] || user.profile.name[0]}`}
              size={80}
            />
            <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 1 }}>
              {user.profile.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#A0A0A0', mb: 2 }}>
              Member since {new Date(user.profile.memberSince).toLocaleDateString()}
            </Typography>
            <Chip 
              label={`${user.subscription.plan.toUpperCase()} PLAN`}
              sx={{ 
                bgcolor: 'rgba(255, 193, 7, 0.2)', 
                color: '#FFC107',
                fontWeight: 600
              }}
            />
          </CardContent>
        </Card>

        {/* User Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Card variant="info">
              <CardContent>
                <Search sx={{ 
                  fontSize: 40, 
                  color: '#A0A0A0', 
                  mb: 2
                }} />
                <Typography variant="h2" sx={{ 
                  color: '#FFFFFF', 
                  fontWeight: 700, 
                  mb: 1,
                  fontSize: '2.5rem',
                  lineHeight: 1
                }}>
                  {user.stats.totalSearches}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#A0A0A0',
                  fontSize: '0.875rem',
                  lineHeight: 1.2
                }}>
                  Total Searches
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card variant="info">
              <CardContent>
                <Favorite sx={{ 
                  fontSize: 40, 
                  color: '#A0A0A0', 
                  mb: 2
                }} />
                <Typography variant="h2" sx={{ 
                  color: '#FFFFFF', 
                  fontWeight: 700, 
                  mb: 1,
                  fontSize: '2.5rem',
                  lineHeight: 1
                }}>
                  {user.stats.favoriteVehicles || 0}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#A0A0A0',
                  fontSize: '0.875rem',
                  lineHeight: 1.2
                }}>
                  Favorite Vehicles
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card variant="info">
              <CardContent>
                <Star sx={{ 
                  fontSize: 40, 
                  color: '#A0A0A0', 
                  mb: 2
                }} />
                <Typography variant="h2" sx={{ 
                  color: '#FFFFFF', 
                  fontWeight: 700, 
                  mb: 1,
                  fontSize: '2.5rem',
                  lineHeight: 1
                }}>
                  {user.stats.searchStreak || 0}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#A0A0A0',
                  fontSize: '0.875rem',
                  lineHeight: 1.2
                }}>
                  Day Streak
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Profile Details & Recent Activity */}
        <Grid container spacing={3}>
          {/* Profile Details */}
          <Grid item xs={12} md={6}>
            <Card variant="info" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3, display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 1 }} />
                  Profile Information
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Email sx={{ color: '#A0A0A0', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {user.profile.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocationOn sx={{ color: '#A0A0A0', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {user.profile.city && user.profile.state 
                        ? `${user.profile.city}, ${user.profile.state}` 
                        : 'Location not set'
                      }
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarToday sx={{ color: '#A0A0A0', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      Member since {new Date(user.profile.memberSince).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Star sx={{ color: '#FFC107', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {user.subscription.plan} Plan - ${user.subscription.price}/month
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#A0A0A0' }}>
                    {user.subscription.trialEnds 
                      ? `Trial ends: ${new Date(user.subscription.trialEnds).toLocaleDateString()}`
                      : user.subscription.nextBilling 
                        ? `Next billing: ${user.subscription.nextBilling}`
                        : 'No billing information'
                    }
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Recent Searches */}
          {/* <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3, display: 'flex', alignItems: 'center' }}>
                  <Search sx={{ mr: 1, color: '#4CAF50' }} />
                  Recent Searches
                </Typography>
                <Stack spacing={2}>
                  {user.recentSearches.map((search) => (
                    <Box key={search.id} sx={{ 
                      p: 2, 
                      bgcolor: 'rgba(255,255,255,0.05)', 
                      borderRadius: 2,
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <Typography variant="subtitle2" sx={{ color: '#FFFFFF', mb: 1 }}>
                        {search.year} {search.make} {search.model}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#A0A0A0', fontSize: '0.875rem' }}>
                          VIN: {search.vin}
                        </Typography>
                        <Chip 
                          label={search.date} 
                          size="small"
                          sx={{ bgcolor: 'rgba(76, 175, 80, 0.2)', color: '#4CAF50' }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid> */}

        </Grid>

        {/* Favorites Section */}
        {/* <Card sx={{ mt: 4, bgcolor: 'rgba(171, 159, 242, 0.1)', border: '1px solid rgba(171, 159, 242, 0.3)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 3, display: 'flex', alignItems: 'center' }}>
              <Favorite sx={{ mr: 1, color: 'rgb(171, 159, 242)' }} />
              Favorite Vehicles
            </Typography>
            <Grid container spacing={2}>
              {user.favorites.map((favorite) => (
                <Grid item xs={12} md={6} key={favorite.id}>
                  <Box sx={{ 
                    p: 3, 
                    bgcolor: 'rgba(255,255,255,0.05)', 
                    borderRadius: 2,
                    border: '1px solid rgba(255,255,255,0.1)',
                    height: '100%'
                  }}>
                    <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 1 }}>
                      {favorite.year} {favorite.make} {favorite.model}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#A0A0A0', mb: 2 }}>
                      {favorite.notes}
                    </Typography>
                    <Chip 
                      label={favorite.vin} 
                      size="small"
                      sx={{ bgcolor: 'rgba(171, 159, 242, 0.2)', color: 'rgb(171, 159, 242)' }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card> */}

      </Container>
    </Box>
  )
}

export default ProfilePage 