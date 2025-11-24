import { Header } from '@/components/Header';
import styles from './App.module.css';
import { Analytics } from '@/features/analytics';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Analytics />
      </main>
    </div>
  );
}

export default App;
