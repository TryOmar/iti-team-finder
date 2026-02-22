import { LanguageProvider } from './contexts/LanguageContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import Header from './components/Header';
import Landing from './pages/Landing';
import IndividualForm from './pages/IndividualForm';
import TeamForm from './pages/TeamForm';
import EditPost from './pages/EditPost';

function AppContent() {
  const { currentPage } = useNavigation();

  return (
    <>
      <Header />
      {currentPage === 'landing' && <Landing />}
      {currentPage === 'individual-form' && <IndividualForm />}
      {currentPage === 'team-form' && <TeamForm />}
      {currentPage === 'edit' && <EditPost />}
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </LanguageProvider>
  );
}

export default App;
