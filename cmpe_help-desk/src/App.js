import logo from './logo.svg';
import './App.css';
import { Entry } from './page/entry/Entry.page';
import { DefaultLayout } from './layout/DefaultLayout';
import { Dashboard } from './page/entry/dashboard/Dashboard.page';
import { AddTicket } from './page/entry/new-ticket/AddTicket.page';
function App() {
  return (
    <div className="App">
      {/* { <Entry/> } */}
      <DefaultLayout>
        {/* <Dashboard/> */}
        <AddTicket/>
      </DefaultLayout>
    </div>
  );
}

export default App;
