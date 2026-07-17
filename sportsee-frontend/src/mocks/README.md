# Mock Data for SportSee Dashboard

This directory contains mock data that mirrors the structure of the backend API responses. Use these during frontend development when the backend is not running or for testing purposes.

## API Structure Comparison

### Backend API Endpoints vs Mock Data

| Backend Endpoint | Mock Equivalent | Returns |
|-----------------|----------------|--------|
| `POST /api/login` | Use `{ username, password }` | `{ token, userId }` |
| `GET /api/user-info` | `mockUserProfile` | `{ profile, statistics }` |
| `GET /api/user-activity` | `mockActivityData` | `Array<Session>` |

## Available Mocks

### User Profiles
- **mockUserProfile** - Sophie Martin (user123) - Primary test user
- **mockUserProfileEmma** - Emma Leroy (user789)
- **mockUserProfileMarc** - Marc Dubois (user456)

### Activity Data
- **mockActivityData** - Array of running sessions with date, distance, duration, heartRate, caloriesBurned

### Chart-Specific Data Structures
- **mockDailyActivity** - Formatted for daily activity bar chart `{ day, kilogram, calories }`
- **mockAverageSessions** - Formatted for average sessions line chart `{ day, sessionLength }`
- **mockPerformanceData** - Formatted for performance radar chart `{ value, kind }`
- **mockTodayScore** - Score for radial progress chart (0-1)

## Usage Examples

### Basic Import
```javascript
import { mockUserProfile, mockActivityData } from './mocks';

// Use in component
const user = mockUserProfile;
const sessions = mockActivityData;
```

### With Utility Functions
```javascript
import { getMockUserById, formatDailyActivity } from './mocks';

// Get user by ID
const userData = getMockUserById('user123');

// Format running data for charts
const chartData = formatDailyActivity(mockActivityData);
```

### For Chart Components
```javascript
import {
  mockDailyActivity,
  mockAverageSessions,
  mockPerformanceData,
  mockTodayScore
} from './mocks';

// Bar Chart
<DailyActivityChart data={mockDailyActivity} />

// Line Chart
<AverageSessionsChart data={mockAverageSessions} />

// Radar Chart
<PerformanceChart data={mockPerformanceData} />

// Radial Progress
<TodayScoreChart score={mockTodayScore} />
```

## Data Structure Details

### User Profile Structure
```javascript
{
  profile: {
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    height: number,        // cm
    weight: number,        // kg
    profilePicture: string, // URL
    createdAt: string      // YYYY-MM-DD
  },
  statistics: {
    totalDistance: string, // km
    totalSessions: number,
    totalDuration: number // minutes
  }
}
```

### Running Session Structure
```javascript
{
  date: string,           // YYYY-MM-DD
  distance: number,       // km
  duration: number,       // minutes
  heartRate: {
    min: number,
    max: number,
    average: number
  },
  caloriesBurned: number
}
```

### Daily Activity Chart Structure
```javascript
{
  day: string,      // YYYY-MM-DD
  kilogram: number, // weight
  calories: number  // calories burned
}
```

### Average Sessions Chart Structure
```javascript
{
  day: number,       // 1-7 (day of week)
  sessionLength: number // minutes
}
```

### Performance Chart Structure
```javascript
{
  value: number,     // percentage (0-100)
  kind: number      // 1=Cardio, 2=Energy, 3=Endurance, 4=Strength, 5=Speed, 6=Intensity
}
```

## Authentication Mock

Since the backend uses JWT authentication, you can mock the auth state:

```javascript
// In your component or test
const mockToken = 'mock-jwt-token';
const mockUserId = 'user123';

// Store in localStorage for api.js interceptor
localStorage.setItem('token', mockToken);
localStorage.setItem('userId', mockUserId);
```

## Testing with Postman

To verify the backend API structure matches these mocks:

1. **Login**: POST `http://localhost:8000/api/login`
   ```json
   { "username": "sophiemartin", "password": "password123" }
   ```

2. **User Info**: GET `http://localhost:8000/api/user-info`
   - Header: `Authorization: Bearer <token>`

3. **User Activity**: GET `http://localhost:8000/api/user-activity?startWeek=2025-01-01&endWeek=2025-01-31`
   - Header: `Authorization: Bearer <token>`

## Best Practices

1. **Keep mocks in sync** with backend API responses
2. **Use realistic data** that matches the design mockups
3. **Add new mocks** as you implement new features
4. **Document new structures** in this README
5. **Test with both** mocks and real API to ensure compatibility
