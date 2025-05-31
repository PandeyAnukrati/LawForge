

const login = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
 
  
    if (email === 'user@example.com' && password === 'password123') {
      // Simulate successful login
      return res.status(200).json({
        message: 'Login successful!',
        user: {
          id: 'user123',
          email: 'user@example.com',
          name: 'Mock User'
        },
        token: 'mock-jwt-token-for-user@example.com' // Replace with actual token
      });
    } else {
      // Simulate failed login
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
  };
  
  const signup = (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
  
  
  
    if (email === 'existing@example.com') {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }
  
    // Simulate successful signup
    return res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: 'newuser' + Math.random().toString(36).substring(2, 9), // Simple mock ID
        email: email,
        name: name
      },
      token: 'mock-jwt-token-for-new-user' // Replace with actual token
    });
  };
  
  // Export the controller functions
  export { login, signup };