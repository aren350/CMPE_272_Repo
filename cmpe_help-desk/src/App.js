import logo from './logo.svg';
import './App.css';
import { Entry } from './page/entry/Entry.page';
import { DefaultLayout } from './layout/DefaultLayout';
import { Dashboard } from './page/entry/dashboard/Dashboard.page';
import { AddTicket } from './page/entry/new-ticket/AddTicket.page';
import { TicketLists } from './page/ticket-listing/TicketLists.page';
function App() {
  return (
    <div className="App">
      {/* { <Entry/> } */}
      <DefaultLayout>
        {/* <Dashboard/> */}
        {/* <AddTicket/> */}
        <TicketLists/>
      </DefaultLayout>
    </div>
  );
}

export default App;
