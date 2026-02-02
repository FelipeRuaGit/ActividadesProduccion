// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from '../src/features/auth/pages/LoginPages'
import ActivitiesTable from './features/actividades/components/table/ActivitiesTable'
import PrivateRoute from '../src/PrivateRouter'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/activities"
          element={
            <PrivateRoute>
              <ActivitiesTable />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
