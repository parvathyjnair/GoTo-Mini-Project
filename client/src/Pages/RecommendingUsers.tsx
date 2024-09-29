import React from 'react';

// Define the User type
type User = {
  id: number;
  name: string;
  gender: string;
  age: number;
  interests: string[];
};

// Function to recommend companions
function recommendCompanions(users: User[], currentUser: User): { user: User; score: number }[] {
  return users
    .filter(user => user.id !== currentUser.id) // Filter out the current user
    .map(user => {
      let score = 0;

      // Gender matching (assuming it's important)
      if (user.gender === currentUser.gender) {
        score += 40;
      }

      // Age matching (within a range of 2 years)
      if (Math.abs(user.age - currentUser.age) <= 2) {
        score += 30;
      }

      // Interest matching (using a simple measure for common preferences)
      const commonInterests = user.interests.filter(interest =>
        currentUser.interests.includes(interest)
      ).length;

      score += (commonInterests / currentUser.interests.length) * 30;

      return { user, score };
    })
    .sort((a, b) => b.score - a.score); // Sort by highest score
}

const App: React.FC = () => {
  // Sample user data
  const users: User[] = [
    { id: 1, name: 'Alice', gender: 'female', age: 22, interests: ['beach', 'culture'] },
    { id: 2, name: 'Bob', gender: 'male', age: 23, interests: ['adventure', 'beach'] },
    { id: 3, name: 'Charlie', gender: 'male', age: 22, interests: ['music', 'hiking'] },
    { id: 4, name: 'David', gender: 'male', age: 24, interests: ['culture', 'beach'] },
  ];

  const currentUser: User = { id: 1, name: 'Alice', gender: 'female', age: 22, interests: ['beach', 'culture'] };

  // Get recommendations
  const recommendations = recommendCompanions(users, currentUser);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Travel Companion Recommendations for {currentUser.name}</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {recommendations.map((rec, index) => (
          <li key={rec.user.id} style={{ marginBottom: '10px' }}>
            <strong>{rec.user.name}</strong> (Score: {rec.score.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
