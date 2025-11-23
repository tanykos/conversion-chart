import { Header } from '@/components/Header';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <p>Main content</p>
      </main>
    </div>
  );
}

export default App;
