import React, { Component } from 'react';
import styles from './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <h2>Welcome to react!</h2>
        </div>
        <p className={styles.appIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>{this.state.count}</h1>
        <div>
          <button onClick={() => this.setState({ count: this.state.count + 1})}>ADD</button>
        </div>
      </div>
    );
  }
}

export default App;
