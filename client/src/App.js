import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Apollo Server & Apollo API
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}></ApolloProvider>
    <Router>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<SearchBooks />} 
          />
          <Route 
            path='/saved' 
            element={<SavedBooks />} 
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>404: Wrong page!</h1>}
          />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
